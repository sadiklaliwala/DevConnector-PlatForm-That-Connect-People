// store.js (modernized using Redux Toolkit)

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // This can still be your combined reducer

const store = configureStore({
  reducer: rootReducer,
  // Redux Thunk is included by default
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
