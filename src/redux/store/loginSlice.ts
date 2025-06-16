import { createSlice } from "@reduxjs/toolkit";

/* Kiểu và state ban đầu */
interface LoginState {
    isLoginOpen: boolean;
}

const initialState: LoginState = { isLoginOpen: false };

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        openLogin: (state) => {
            state.isLoginOpen = true;
        },
        closeLogin: (state) => {
            state.isLoginOpen = false;
        },
    },
});

/* Action creators & reducer */
export const { openLogin, closeLogin } = loginSlice.actions;
export default loginSlice.reducer;
