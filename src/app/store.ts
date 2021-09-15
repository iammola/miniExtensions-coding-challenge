import { configureStore } from '@reduxjs/toolkit';

import formReducer from '../features/form/formSlice';
import appReducer from '../features/app/appSlice';

const store =  configureStore({
  reducer: {
    form: formReducer,
    app: appReducer
  }
});

export default store;

