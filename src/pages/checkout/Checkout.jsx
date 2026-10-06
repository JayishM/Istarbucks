import "./Checkout.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useState } from "react";

function Checkout() {
    const navigate = useNavigate();

    const {
        cart,
        cartTotal,
        clearCart,
        saveOrder
    } = useCart();

    const [paymentMethod, setPaymentMethod] = useState("cod");

    const deliveryFee = cart.length > 0 ? 2.00 : 0;
    const tax = cartTotal * 0.08;
    const grandTotal = cartTotal + deliveryFee + tax;

    const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
        navigate("/menu");
        return;
    }

    const order = {
        id: "IST" + Math.floor(1000 + Math.random() * 9000),

        items: cart,

        subtotal: cartTotal,
        delivery: deliveryFee,
        tax: tax,
        total: grandTotal,

        paymentMethod: paymentMethod,

        date: new Date().toISOString(),

        status: "Preparing"
    };

    saveOrder(order);

    clearCart();

    navigate("/order-success", {
        state: {
            order
        }
    });
};

    if (cart.length === 0) {
        return (
            <div className="checkout-empty">
                <div className="checkout-empty-icon">
                    <i className="bi bi-cart-x"></i>
                </div>

                <h2>Your cart is empty</h2>

                <p>
                    Add some delicious coffee before checking out.
                </p>

                <button onClick={() => navigate("/menu")}>
                    Explore Menu
                    <i className="bi bi-arrow-right"></i>
                </button>
            </div>
        );
    }

    return (
        <div className="checkout-page">

            {/* HERO */}

            <section className="checkout-hero">
                <span>CHECKOUT</span>

                <h1>
                    Complete Your <strong>Order</strong>
                </h1>

                <p>
                    Almost there! Enter your details and choose your
                    preferred payment method.
                </p>
            </section>


            {/* CHECKOUT CONTENT */}

            <section className="checkout-section">

                {/* LEFT */}

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >

                    <div className="checkout-heading">
                        <span>DELIVERY DETAILS</span>

                        <h2>
                            Your <strong>Information</strong>
                        </h2>
                    </div>


                    {/* PERSONAL INFORMATION */}

                    <div className="form-section">

                        <h3>
                            <i className="bi bi-person"></i>
                            Contact Information
                        </h3>

                        <div className="form-row">

                            <div className="form-group">
                                <label>Full Name</label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number</label>

                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>Email Address</label>

                            <input
                                type="email"
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                    </div>


                    {/* ADDRESS */}

                    <div className="form-section">

                        <h3>
                            <i className="bi bi-geo-alt"></i>
                            Delivery Address
                        </h3>

                        <div className="form-group">
                            <label>Address</label>

                            <input
                                type="text"
                                placeholder="House no., street, area"
                                required
                            />
                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label>City</label>

                                <input
                                    type="text"
                                    placeholder="Jaipur"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>PIN Code</label>

                                <input
                                    type="text"
                                    placeholder="302001"
                                    required
                                />
                            </div>

                        </div>

                    </div>


                    {/* PAYMENT */}

                    <div className="form-section">

                        <h3>
                            <i className="bi bi-credit-card"></i>
                            Payment Method
                        </h3>


                        <div className="payment-options">

                            <label
                                className={
                                    paymentMethod === "cod"
                                        ? "payment-option selected"
                                        : "payment-option"
                                }
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <div className="payment-icon">
                                    <i className="bi bi-cash-stack"></i>
                                </div>

                                <div>
                                    <strong>Cash on Delivery</strong>
                                    <span>Pay when your order arrives</span>
                                </div>

                                <i className="bi bi-check-circle-fill payment-check"></i>
                            </label>


                            <label
                                className={
                                    paymentMethod === "upi"
                                        ? "payment-option selected"
                                        : "payment-option"
                                }
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="upi"
                                    checked={paymentMethod === "upi"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <div className="payment-icon">
                                    <i className="bi bi-phone"></i>
                                </div>

                                <div>
                                    <strong>UPI</strong>
                                    <span>Google Pay, PhonePe, Paytm</span>
                                </div>

                                <i className="bi bi-check-circle-fill payment-check"></i>
                            </label>


                            <label
                                className={
                                    paymentMethod === "card"
                                        ? "payment-option selected"
                                        : "payment-option"
                                }
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value="card"
                                    checked={paymentMethod === "card"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <div className="payment-icon">
                                    <i className="bi bi-credit-card"></i>
                                </div>

                                <div>
                                    <strong>Credit / Debit Card</strong>
                                    <span>Visa, Mastercard and more</span>
                                </div>

                                <i className="bi bi-check-circle-fill payment-check"></i>
                            </label>

                        </div>

                    </div>


                    <button
                        type="submit"
                        className="place-order-btn"
                    >
                        Place Order
                        <i className="bi bi-arrow-right"></i>
                    </button>

                </form>


                {/* RIGHT - ORDER SUMMARY */}

                <aside className="checkout-summary">

                    <span className="summary-label">
                        YOUR ORDER
                    </span>

                    <h2>
                        Order <strong>Summary</strong>
                    </h2>


                    <div className="checkout-items">

                        {cart.map(item => (

                            <div
                                className="checkout-item"
                                key={item.name}
                            >

                                <div className="checkout-item-image">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <span>
                                        {item.quantity}
                                    </span>
                                </div>

                                <div className="checkout-item-info">

                                    <h4>{item.name}</h4>

                                    <span>
                                        {item.category}
                                    </span>

                                </div>

                                <strong>
                                    $
                                    {(
                                        Number(item.price) *
                                        item.quantity
                                    ).toFixed(2)}
                                </strong>

                            </div>

                        ))}

                    </div>


                    <div className="checkout-divider"></div>


                    <div className="checkout-total-row">
                        <span>Subtotal</span>
                        <strong>
                            ${cartTotal.toFixed(2)}
                        </strong>
                    </div>

                    <div className="checkout-total-row">
                        <span>Delivery</span>
                        <strong>
                            ${deliveryFee.toFixed(2)}
                        </strong>
                    </div>

                    <div className="checkout-total-row">
                        <span>Tax</span>
                        <strong>
                            ${tax.toFixed(2)}
                        </strong>
                    </div>


                    <div className="checkout-divider"></div>


                    <div className="checkout-grand-total">
                        <span>Total</span>

                        <strong>
                            ${grandTotal.toFixed(2)}
                        </strong>
                    </div>


                    <div className="secure-checkout">
                        <i className="bi bi-shield-check"></i>

                        <div>
                            <strong>Secure Checkout</strong>
                            <span>Your information is protected</span>
                        </div>
                    </div>


                    <button
                        className="back-cart-btn"
                        onClick={() => navigate("/cart")}
                    >
                        <i className="bi bi-arrow-left"></i>
                        Back to Cart
                    </button>

                </aside>

            </section>

        </div>
    );
}

export default Checkout;