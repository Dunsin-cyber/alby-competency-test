'use client';
import { configureStore } from "@reduxjs/toolkit";
import wallet from "./slice/WalletSlice";
import invoice from "./slice/InvoiceSlice";


export const store = configureStore({
    reducer: {
        wallet,
        invoice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
