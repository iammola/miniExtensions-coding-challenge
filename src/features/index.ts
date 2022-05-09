import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    user: "",
    isLoggedIn: false,
    classes: undefined as Types.State["app"]["classes"],
  },
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setClasses(state, action: PayloadAction<Types.State["app"]["classes"]>) {
      state.classes = action.payload;
    },
  },
});

export const { setClasses, setIsLoggedIn, setUser } = slice.actions;

export const appReducer = slice.reducer;

export { Data } from "./Data";
export { Form, formReducer } from "./Form";
