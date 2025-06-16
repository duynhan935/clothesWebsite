import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        login: loginReducer,
        register: registerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
