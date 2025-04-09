'use client';
import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import { UserDetails } from "../types";

// Define the initial state using that type
const initialState: UserDetails | null = null;

export const ProfileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {

        clearProfile: () => {
            return initialState;
        },
    },
});

export const { clearProfile, } = ProfileSlice.actions;

export default ProfileSlice.reducer;
