import Airtable from "airtable";
import { useDispatch } from "react-redux";

import { setClasses, setUser, setIsLoggedIn } from "features";

const base = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY }).base("app8ZbcPx7dkpOnP0");
const App: React.FC = () => {
  const dispatch = useDispatch();

  function logout() {
    dispatch(setUser(""));
    dispatch(setIsLoggedIn(false));
    dispatch(setClasses(undefined));
  }

  async function login(user: string) {
    dispatch(setUser(user));
    dispatch(setIsLoggedIn(false));

    const [student] = await base("Students")
      .select({ filterByFormula: `({Name}="${user}")` })
      .all();

    if (student == undefined) return;

    const classes = await base("Classes")
      .select({ filterByFormula: `OR(${(student.get("Classes") as string[])?.map((id) => `RECORD_ID()="${id}"`)})` })
      .all();

    const mates = await base("Students")
      .select({ filterByFormula: `OR(${classes.map((cl) => `SEARCH("${cl.get("Name")}", {Classes})`)})` })
      .all();

    dispatch(setIsLoggedIn(true));
    dispatch(
      setClasses(
        classes.map((item) => ({
          name: item.get("Name") as string,
          students: (item.get("Students") as string[]).map((student) =>
            mates.find((mate) => mate.id === student)?.get("Name")
          ) as string[],
        }))
      )
    );
  }

  return <></>;
};

export default App;
