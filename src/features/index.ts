import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "app",
  initialState: {
    user: "",
    isLoggedIn: false,
  },
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const { setIsLoggedIn, setUser } = slice.actions;

export const appReducer = slice.reducer;
export { Form, formReducer } from "./Form";
