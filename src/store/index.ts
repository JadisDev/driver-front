import { configureStore } from '@reduxjs/toolkit';
import stockStoreLoading from './Loading/Loading.store';

const store = configureStore({
    reducer: {
        loading: stockStoreLoading
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store;