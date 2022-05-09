import { useSelector } from "react-redux";

export const Data: React.FC<{ logout(): void }> = ({ logout }) => {
  const user = useSelector((state: Types.State) => state.app.user);
  const classes = useSelector((state: Types.State) => state.app.classes);

  return (
    <div>
      <div>
        <span>Logged in as {user}</span>
        <button onClick={logout}>Logout</button>
      </div>
      {classes?.map((item) => (
        <div key={item.name}>
          <h5>Name</h5>
          <span>{item.name}</span>
          <h5>Students</h5>
          <span>{item.students.join(",")}</span>
        </div>
      ))}
    </div>
  );
};
