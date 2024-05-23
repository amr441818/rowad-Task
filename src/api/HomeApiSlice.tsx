import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const homeApi = createApi({
  reducerPath: "homeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com",
  }),

  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
    }),

    deleteProduct: builder.mutation<any, any>({
      query: (id) => ({
        url: `/products/${id}`,
        method: "Delete",
      }),
    }),
    updateProduct: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/products/${formData?.id}`,
        method: "PUT",
        body: formData,
      }),
    }),
  }),
});
export const {
  useGetProductsQuery,

  useDeleteProductMutation,
  useUpdateProductMutation,
} = homeApi;
