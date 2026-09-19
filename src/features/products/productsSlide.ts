import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

interface ProductsState {
    items: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    items: [],
    loading: false,
    error: null,
}

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await fetch(
            'https://fakestoreapi.com/products'

        );

        if (!response.ok) {
            throw new Error('No list')
        }

        const data: Product[] = await response.json();

        return data;

    }
)

const productsSlide = createSlice({
    name: 'products',

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Errol'
            });
    },
})

export default productsSlide.reducer;