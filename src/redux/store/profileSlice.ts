import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: {
        id: "",
        username: "",
        email: "",
        phone: "",
        address: "",
        role: "",
    },
};

const profileSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        doGetProfileAction: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;
            state.isLoading = false;
        },
        doNoGetProfileAction: (state) => {
            state.isLoading = false;
        },
        doLogoutAction: (state) => {
            state.isAuthenticated = false;
            state.user = initialState.user;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        },
        // doUpdateUserAction: (state, action) => {
        //     state.user.name = action.payload.name;
        //     state.user.phone_number = action.payload.phone_number;
        // },
    },
});

export const { doGetProfileAction, doLogoutAction, doNoGetProfileAction } = profileSlice.actions;

export default profileSlice.reducer;
