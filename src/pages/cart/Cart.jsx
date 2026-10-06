import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Cart() {
    const navigate = useNavigate();

    const {
        cart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cartTotal
    } = useCart();

    const deliveryFee = cart.length > 0 ? 2.00 : 0;
    const tax = cartTotal * 0.08;
    const grandTotal = cartTotal + deliveryFee + tax;

    return (
        <div className="cart-page">

            {/* HERO */}
            <section className="cart-hero">
                <span>YOUR ORDER</span>

                <h1>
                    Your <strong>Coffee Cart</strong>
                </h1>

                <p>
                    Review your favourite drinks before
                    continuing to checkout.
                </p>
            </section>


            {/* CART */}
            <section className="cart-section">

                {/* LEFT */}
                <div className="cart-items">

                    <div className="cart-heading">
                        <div>
                            <span>YOUR ITEMS</span>
                            <h2>
                                Order <strong>Summary</strong>
                            </h2>
                        </div>

                        <span className="item-count">
                            {cart.length} {cart.length === 1 ? "item" : "items"}
                        </span>
                    </div>


                    {cart.length === 0 ? (

                        <div className="empty-cart">

                            <div className="empty-cart-icon">
                                <i className="bi bi-cart-x"></i>
                            </div>

                            <h3>Your cart is empty</h3>

                            <p>
                                Looks like you haven't added
                                any coffee yet.
                            </p>

                            <button
                                onClick={() => navigate("/menu")}
                            >
                                Explore Our Menu
                                <i className="bi bi-arrow-right"></i>
                            </button>

                        </div>

                    ) : (

                        cart.map((item) => (

                            <div
                                className="cart-item"
                                key={item.name}
                            >

                                <div className="cart-item-image">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />
                                </div>


                                <div className="cart-item-info">

                                    <span>
                                        {item.category}
                                    </span>

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        {item.description}
                                    </p>

                                    <strong>
                                        ${Number(item.price).toFixed(2)}
                                    </strong>

                                </div>


                                <div className="cart-item-actions">

                                    <div className="quantity">

                                        <button
                                            onClick={() =>
                                                decreaseQuantity(item.name)
                                            }
                                        >
                                            <i className="bi bi-dash"></i>
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            onClick={() =>
                                                increaseQuantity(item.name)
                                            }
                                        >
                                            <i className="bi bi-plus"></i>
                                        </button>

                                    </div>

                                    <strong className="item-total">
                                        $
                                        {(
                                            Number(item.price) *
                                            item.quantity
                                        ).toFixed(2)}
                                    </strong>

                                    <button
                                        className="remove-item"
                                        onClick={() =>
                                            removeFromCart(item.name)
                                        }
                                        title="Remove item"
                                    >
                                        <i className="bi bi-trash3"></i>
                                    </button>

                                </div>

                            </div>

                        ))

                    )}

                </div>


                {/* RIGHT - ORDER TOTAL */}
                {cart.length > 0 && (

                    <div className="order-summary">

                        <span className="summary-label">
                            ORDER TOTAL
                        </span>

                        <h2>
                            Your <strong>Summary</strong>
                        </h2>


                        <div className="summary-row">
                            <span>Subtotal</span>
                            <strong>
                                ${cartTotal.toFixed(2)}
                            </strong>
                        </div>

                        <div className="summary-row">
                            <span>Delivery</span>
                            <strong>
                                ${deliveryFee.toFixed(2)}
                            </strong>
                        </div>

                        <div className="summary-row">
                            <span>Tax</span>
                            <strong>
                                ${tax.toFixed(2)}
                            </strong>
                        </div>


                        <div className="summary-divider"></div>


                        <div className="summary-total">
                            <span>Total</span>

                            <strong>
                                ${grandTotal.toFixed(2)}
                            </strong>
                        </div>


                        <button
                            className="checkout-btn"
                            onClick={() => navigate("/checkout")}
                        >
                            Proceed to Checkout
                            <i className="bi bi-arrow-right"></i>
                        </button>


                        <button
                            className="continue-btn"
                            onClick={() => navigate("/menu")}
                        >
                            <i className="bi bi-arrow-left"></i>
                            Continue Shopping
                        </button>

                    </div>

                )}

            </section>

        </div>
    );
}

export default Cart;