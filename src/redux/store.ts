import { configureStore } from '@reduxjs/toolkit';
import { modalSlice } from './slice';
import { api } from '../api/api';

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM({ serializableCheck: false }).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
