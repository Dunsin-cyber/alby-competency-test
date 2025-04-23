'use client';
import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { InvoiceDetails } from "../types";

// Define the initial state using that type
const initialState: InvoiceDetails | null = null;

export const InvoiceSlice = createSlice({
    name: "invoice",
    initialState,
    reducers: {

        clearInvoice: () => {
            return initialState;
        },
        addInvoice: (state, action) => {
            return action.payload;
        },
    },
});

export const { addInvoice, clearInvoice } = InvoiceSlice.actions;

export default InvoiceSlice.reducer;
