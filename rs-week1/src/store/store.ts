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

export type RootState = ReturnType<typeof store.getState>;
