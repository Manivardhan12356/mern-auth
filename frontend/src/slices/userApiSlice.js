import { apiSlice } from './apiSlice';

const USERS_URL = '/api/users';

export const userApiSlice = apiSlice.injectEndpoints({
   endpoints: (builder) => ({
      login: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/auth`,
            method: 'POST',
            body: data,
         }),
      }),
      register: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}`,
            method: 'POST',
            body: data,
         }),
      }),
      logout: builder.mutation({
         query: () => ({
            url: `${USERS_URL}/logout`,
            method: 'POST',
         })
      }),
      updateUser: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/profile`,
            method: 'PUT',
            body: data,
         }),
      }),
      productsData: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/products`,
            method: 'GET',
            body: data,
         })
      }),
      cartsData: builder.mutation({
         query: (data) => ({
            url: `${USERS_URL}/carts`,
            method: 'GET',
            body: data,
         })
      })
      
      
   
   }),
});

export const { useLoginMutation ,useLogoutMutation, useRegisterMutation,useUpdateUserMutation,useProductsDataMutation,useCartsDataMutation} = userApiSlice;