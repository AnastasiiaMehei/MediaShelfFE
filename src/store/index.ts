import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import booksReducer from "./booksSlice";
import videosReducer from "./videosSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    books: booksReducer,
    videos: videosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
