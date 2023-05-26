import { configureStore } from '@reduxjs/toolkit';
import StockStoreLogin from './Login/Login.store';
import stockStoreLoading from './Loading/Loading.store';

const store = configureStore({
    reducer: {
        login: StockStoreLogin,
        loading: stockStoreLoading
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store;