import { configureStore } from '@reduxjs/toolkit';
import { formSlice, reducer as formreducer } from './redusers/formReducer';

export const store = configureStore({
  reducer: {
    [formSlice.name]: formreducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
