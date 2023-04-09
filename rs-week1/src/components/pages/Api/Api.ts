import { IProduct } from '../../types/interface';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { IResponseProductApi } from '../../types/interface';

const BASE_URL = 'https://dummyjson.com/products/';

// async function getProducts(search: string): Promise<IProduct[]> {
//   const res = await fetch(`https://dummyjson.com/products/search?q=${search}`);
//   const data = await res.json();
//   return data.products;
// }

async function getProductDetails(productId: number): Promise<IProduct> {
  const res = await fetch(`https://dummyjson.com/products/${productId}`);
  const data = await res.json();
  return data;
}

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
      // `search?q=${search}`,
    }),
  }),
});

// export const profileService = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     getProfile: builder.query<GenericProfile, string | void>({
//       query(id) {
//         return {
//           url: '/profile',
//           params: { id }
//         };
//       },
//       transformResponse: (res: { profile: GenericProfile }) => res.profile,
//       providesTags: (result, error, arg) =>
//         arg ? [{ type: 'Profile', id: arg }, 'Profile'] : ['Profile']
//     }),

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery } = productApi;

export { getProductDetails };
