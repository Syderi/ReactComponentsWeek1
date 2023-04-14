import { IProduct } from '../../types/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IResponseProductApi } from '../../types/interface';

export const BASE_URL = 'https://dummyjson.com/';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string>({
      query: (search) => ({
        url: 'products/search',
        params: { q: search },
      }),
      transformResponse: (response: IResponseProductApi) => response.products ?? [],
    }),
    getProductDetails: builder.query<IProduct, number>({
      query: (id) => ({
        url: `products/${id}`,
      }),
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;
