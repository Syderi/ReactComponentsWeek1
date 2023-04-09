import { configureStore } from '@reduxjs/toolkit';
import { formSlice, reducer as formReducer } from './redusers/formSlice';
import { stateSlice, reducer as searchReducer } from './redusers/searchSlice';

export const store = configureStore({
  reducer: {
    [formSlice.name]: formReducer,
    [stateSlice.name]: searchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
