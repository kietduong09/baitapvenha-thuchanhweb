import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProducts, type Product } from '../products/productsSlide';

export interface Cartitems extends Product {
    quantity: number;
}

interface CartState {
    items: Cartitems[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',

    initialState,

    reducers: {
        addtoCart: (
            state,
            action: PayloadAction<Product>
        ) => {
            const product = action.payload;

            const existringitems = state.items.find(
                item => item.id === product.id
            );

            if (existringitems) {
                existringitems.quantity += 1;
            } else {
                state.items.push({
                    ...product,
                    quantity: 1,
                });
            }
        },

        removeFromCart: (
            state,
            action: PayloadAction<number>
        ) => {
            const product = action.payload;
            state.items = state.items.filter(
                item => item.id === product,
            )
        },

        updateQuantity: (
            state,
            action: PayloadAction<
                {
                    id: number;
                    quantity: number;
                }>
        ) => {
            const product = action.payload;
            const item = state.items.find(
                item => item.id === product.id,
            );

            if (item) {
                item.quantity = product.quantity;
            }

        },
    },
});


export const {
    addtoCart,
    removeFromCart,
    updateQuantity
} = cartSlice.actions;

export default cartSlice.reducer;