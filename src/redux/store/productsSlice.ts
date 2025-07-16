import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [
            {
                id: "",
                name: "",
                description: "",
                price: "",
                category: "",
                releaseDate: "",
            },
        ],
    },
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        },
        createProduct: (state, action) => {
            state.products = [...state.products, action.payload];
        },
    },
});

export const { createProduct, setProducts } = productSlice.actions;

export default productSlice.reducer;
