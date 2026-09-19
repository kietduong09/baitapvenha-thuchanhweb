import { useEffect } from "react";


import { fetchProducts } from '../features/products/productsSlide'

import { addtoCart } from '../features/cart/cartSlice';

import {
    useAppDispatch,
    useAppSelector
} from '../app/hooks';

export default function ProductList() {
    const dispatch = useAppDispatch();

    const {
        items,
        loading,
        error,
    } = useAppSelector(
        state => state.products
    );

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return <p> Loading</p>
    }

    if (error) {
        return <p>Error</p>
    }

    return (
        <div>
            {items.map(product => (
                <div key={product.id}>
                    <img src={product.image} width={100} />
                    <h1>{product.title}</h1>
                    <p>${product.price}</p>

                    <button onClick={() => dispatch(addtoCart(product))}>Add To Cart</button>
                </div>
            ))}
        </div>
    )
}