import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import {
  PipeableStream,
  renderToPipeableStream,
  RenderToPipeableStreamOptions,
} from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { productApi } from './store/Api/Api';
import { formSlice, reducer as formReducer } from './store/redusers/formSlice';
import { stateSlice, reducer as searchReducer } from './store/redusers/searchSlice';
import { Provider } from 'react-redux';
import React from 'react';

function renderApp(url: string, options: RenderToPipeableStreamOptions): PipeableStream {
  const store = configureStore({
    reducer: {
      [productApi.reducerPath]: productApi.reducer,
      [formSlice.name]: formReducer,
      [stateSlice.name]: searchReducer,
    },
    middleware: [],
  });

  const stream = renderToPipeableStream(
    <Provider store={store}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </Provider>,
    options
  );
  return stream;
}

export default renderApp;
