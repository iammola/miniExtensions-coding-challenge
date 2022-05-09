import { configureStore } from "@reduxjs/toolkit";

import { appReducer, formReducer } from "features";

export const store = configureStore({
  reducer: {
    app: appReducer,
    form: formReducer,
  },
});
