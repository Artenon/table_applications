import { configureStore } from '@reduxjs/toolkit';
import { modalSlice } from './slice';

export const store = configureStore({
  reducer: {
    [modalSlice.name]: modalSlice.reducer,
  },
  middleware: (gDM) => gDM({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
