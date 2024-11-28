import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICart {
    products: Product[]
}

const initialState: ICart = {
    products: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<Product>) {
            state.products.push(action.payload);
        },

        removeFromCart(state, action: PayloadAction<number>) {
            state.products = state.products.filter(product => product.id !== action.payload);
        }

    }
})

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;