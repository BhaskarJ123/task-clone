// import {createStore} from 'redux';
// import rootReducer from './redux/reducers';

// const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// export default store;

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { productApi } from './services/post';
import {usersApi} from './services/users';
import usersReducer from './slices/users';

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
        user: usersReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(usersApi.middleware)
});