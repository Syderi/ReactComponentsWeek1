import { configureStore } from '@reduxjs/toolkit';
import { productApi } from '../components/pages/Api/Api';
import { formSlice, reducer as formReducer } from './redusers/formSlice';
import { stateSlice, reducer as searchReducer } from './redusers/searchSlice';

export const store = configureStore({
  reducer: {
    [formSlice.name]: formReducer,
    [stateSlice.name]: searchReducer,
    [productApi.reducerPath]: productApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;
