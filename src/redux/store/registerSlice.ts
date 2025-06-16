// src/features/register/registerSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface RegisterState {
    isRegisterOpen: boolean;
}

const initialState: RegisterState = {
    isRegisterOpen: false,
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        openRegister(state) {
            state.isRegisterOpen = true;
        },
        closeRegister(state) {
            state.isRegisterOpen = false;
        },
    },
});

export const { openRegister, closeRegister } = registerSlice.actions;
export default registerSlice.reducer;
