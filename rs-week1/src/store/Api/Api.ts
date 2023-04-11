import { IProduct } from '../../components/types/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IResponseProductApi } from '../../components/types/interface';

const BASE_URL = 'https://dummyjson.com/products/';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], string>({
      query: (search) => ({
        url: '/search',
        params: { q: search },
      }),
      transformResponse: (response: IResponseProductApi) => response.products ?? [],
    }),
    getProductDetails: builder.query<IProduct, number>({
      query: (id) => `${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductDetailsQuery } = productApi;
