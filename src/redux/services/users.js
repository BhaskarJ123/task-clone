import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const usersApi = createApi({
    reducerPath: 'usersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://43.206.242.55:5000/'}),
    endpoints: (builder) => ({
        createLogin: builder.mutation({
            query: ({email,password}) => ({
                url: 'login',
                method: 'POST',
                body: {email:email,password:password}
            })
        }),
        createTokens: builder.mutation({
            query: (id) => ({
                url: `activate/token/${id}`,
                method: 'PUT',
            })
        }),
        suspendTokens: builder.mutation({
            query: (id) => ({
                url: `suspend/token/${id}`,
                method: 'PUT',
            })
        }),
        deleteTokens: builder.mutation({
            query: (id) => ({
                url: `delete/token/${id}`,
                method: 'PUT',
            })
        }),
        getTokens: builder.query({
            query: (userID,cardID) => `user/${userID}/card/${cardID}/tokens`
        })
    })
})

export const { useCreateLoginMutation, useCreateTokensMutation, useSuspendTokensMutation,useDeleteTokensMutation,useGetTokensQuery } = usersApi;