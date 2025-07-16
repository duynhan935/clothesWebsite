import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import profileSliceReducer from "./profileSlice";
import productSliceReducer from "./productsSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        login: loginReducer,
        register: registerReducer,
        account: profileSliceReducer,
        product: productSliceReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
