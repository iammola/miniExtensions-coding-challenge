import { configureStore } from "@reduxjs/toolkit";

import { formReducer, appReducer } from "features";

export const store = configureStore({
  reducer: {
    app: appReducer,
    form: formReducer,
  },
});
