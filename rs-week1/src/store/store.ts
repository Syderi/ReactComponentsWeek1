import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { productApi } from './Api/Api';
import { formSlice, reducer as formReducer } from './redusers/formSlice';
import { stateSlice, reducer as searchReducer } from './redusers/searchSlice';

const rootReducer = combineReducers({
  [productApi.reducerPath]: productApi.reducer,
  [formSlice.name]: formReducer,
  [stateSlice.name]: searchReducer,
});

export type InitialState = PreloadedState<ReturnType<typeof rootReducer>>;

export const setupStore = (preloadedState: InitialState = {}) =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat(productApi.middleware),
    preloadedState,
  });

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
