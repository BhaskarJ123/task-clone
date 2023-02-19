import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {usersApi} from './redux/services/users';
import usersReducer from './redux/slices/users';

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        user: usersReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(usersApi.middleware)
});