import { useDispatch, useSelector } from "react-redux";

import { setValue } from "./slice";

export const Form: React.FC<{ login(user: string, cb: () => void): void }> = ({ login }) => {
  const dispatch = useDispatch();
  const value = useSelector((state: Types.State) => state.form.value);
  const message = useSelector((state: Types.State) => state.app.message);
  const loading = useSelector((state: Types.State) => !message && state.app.user && !state.app.isLoggedIn);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login(value, () => dispatch(setValue("")));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex h-screen w-screen flex-col content-start items-center justify-center gap-4"
    >
      <h1 className="text-xl font-bold tracking-wider text-gray-800">miniExtensions</h1>
      <div className="w-[218px] space-y-6">
        <input
          type="text"
          value={value}
          disabled={!!loading}
          placeholder="Username"
          onChange={(e) => dispatch(setValue(e.target.value))}
          className="w-full rounded p-2.5 text-sm text-gray-800 ring-2 ring-gray-500 focus:outline-none focus:ring-gray-600"
        />
        <button
          type="submit"
          disabled={!!loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-600 py-2 text-white hover:bg-gray-700 focus:outline-none"
        >
          Log In
        </button>
      </div>
      {(message || loading) && (
        <span className="my-1 text-sm font-semibold tracking-wide text-gray-700">{message || "Loading..."}</span>
      )}
    </form>
  );
};

export { default as formReducer } from "./slice";
