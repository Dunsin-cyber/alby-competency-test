'use client';
import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { WalletDetails } from "../types";

// Define the initial state using that type
const initialState: WalletDetails | null = null;

export const WalletSlice = createSlice({
    name: "wallet",
    initialState,
    reducers: {

        clearWallet: () => {
            return initialState;
        },
        addWallet: (state, action) => {
            return action.payload;
        },
    },
});

export const { clearWallet, addWallet } = WalletSlice.actions;

export default WalletSlice.reducer;
