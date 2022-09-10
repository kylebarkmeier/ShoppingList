import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ListItemType,
  AddListItemParameters,
  EditListItemParameters,
  DeleteListItemParameters,
} from './types';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['Item'],
  endpoints: (builder) => ({
    items: builder.query<ListItemType[], void>({
      query: () => 'items',
      transformResponse: (response: { data: ListItemType[] }) => response.data,
      providesTags: (result = []) => [
        { type: 'Item', id: 'LIST' },
        ...result.map(({ _id }) => ({
          type: 'Item' as const,
          id: `ListItem-${_id}`,
        })),
      ],
    }),
    addItem: builder.mutation<ListItemType, AddListItemParameters>({
      query: ({ name, description, quantity }) => ({
        url: `items/`,
        method: 'POST',
        body: { name, description, quantity },
      }),
      transformResponse: (response: { data: ListItemType }) => response.data,
      invalidatesTags: () => [{ type: 'Item', id: 'LIST' }],
    }),
    editItem: builder.mutation<ListItemType, EditListItemParameters>({
      query: ({ _id, ...rest }) => ({
        url: `items/${_id}`,
        method: 'PATCH',
        body: rest,
      }),
      transformResponse: (response: { data: ListItemType }) => response.data,
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Item', id: 'LIST' },
        { type: 'Item', id: `ListItem-${_id}` },
      ],
    }),
    deleteItem: builder.mutation<ListItemType, DeleteListItemParameters>({
      query: ({ _id }) => ({
        url: `items/${_id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { _id }) => [
        { type: 'Item', id: 'LIST' },
        { type: 'Item', id: `ListItem-${_id}` },
      ],
    }),
  }),
});

export const {
  useItemsQuery,
  useAddItemMutation,
  useEditItemMutation,
  useDeleteItemMutation,
} = api;
