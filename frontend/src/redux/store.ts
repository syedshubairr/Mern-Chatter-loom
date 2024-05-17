import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: { chat: chatSlice, user: userSlice },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
