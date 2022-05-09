import { useDispatch, useSelector } from "react-redux";

import { setValue } from "./slice";

export const Form: React.FC<{ login(user: string): void }> = ({ login }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: Types.State) => state.form.value);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={(e) => dispatch(setValue(e.target.value))} />
      <button type="submit">Log In</button>
    </form>
  );
};

export { default as formReducer } from "./slice";
