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
        })
    })
})

export const { useCreateLoginMutation } = usersApi;