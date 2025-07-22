import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
    id: number;
    quantity: number;
    img?: string;
    name?: string;
    price?: number;
    color?: string;
    stockQuantity?: number;
    cartId?: number;
    productId?: number;
}

interface CartState {
    isCartOpen: boolean;
    items?: CartItem[];
}

const initialState: CartState = {
    isCartOpen: false,
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        openCart: (state) => {
            state.isCartOpen = true;
        },
        closeCart: (state) => {
            state.isCartOpen = false;
        },
        setCart: (state,action:PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            state.items?.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            if (state.items) {
                state.items = state.items.filter(item => item.cartId !== action.payload);
            }
        },
        clearCart: (state) => {
            state.items = [];
        }
    },
});

export const { openCart, closeCart, setCart, addItemToCart, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
