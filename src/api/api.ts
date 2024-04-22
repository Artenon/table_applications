import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IApplication } from '../types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  endpoints: (builder) => ({
    getAllApplications: builder.query<IApplication[], string>({
      query: () => '/',
    }),
    createApplication: builder.mutation<IApplication, IApplication>({
      query: (body) => ({ url: '/', body, method: 'POST' }),
    }),
    updateApplication: builder.mutation<IApplication, IApplication>({
      query: (body) => ({ url: `/${body.id}`, body, method: 'PUT' }),
    }),
    deleteApplication: builder.mutation<unknown, { id: number }>({
      query: ({ id }) => ({ url: `/${id}`, method: 'DELETE' }),
    }),
  }),
});

export const {
  useGetAllApplicationsQuery,
  useCreateApplicationMutation,
  useUpdateApplicationMutation,
  useDeleteApplicationMutation,
} = api;
