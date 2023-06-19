import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from '../reducer';
import logger from 'redux-logger';
export const store = configureStore({
  reducer: rootReducer,
  middleware: defaultMiddleware => {
    if (process.env.NODE_ENV === 'development') {
      return [...defaultMiddleware(), logger]; //redux-logger
    }
    return defaultMiddleware();
  },
});
