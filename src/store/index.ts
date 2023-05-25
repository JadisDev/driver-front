import { configureStore } from '@reduxjs/toolkit';
import StockStore from './Stock/Stock.store';

const store = configureStore({
    reducer: {
        stock: StockStore
    }
})

export type RootState = ReturnType<typeof store.getState>
export default store;