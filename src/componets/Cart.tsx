import {
    removeFromCart,
    updateQuantity
} from '../features/cart/cartSlice';

import {
    useAppDispatch,
    useAppSelector
} from '../app/hooks';

export default function Cart() {
    const dispatch = useAppDispatch();

    const { items } = useAppSelector(
        state => state.cart
    );

    const total = items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (items.length === 0) {
        return <p>Cart is empty</p>
    }

    return (
        <div>
            <h2>Cart</h2>

            {items.map(item => (
                <div key={item.id}>
                    <img src={item.image} width={50} />
                    <h3>{item.title}</h3>
                    <p>${item.price}</p>

                    <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => dispatch(updateQuantity({
                            id: item.id,
                            quantity: Number(e.target.value),
                        }))}
                    />

                    <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                </div>
            ))}

            <h3>Total: ${total.toFixed(2)}</h3>
        </div>
    )
}
