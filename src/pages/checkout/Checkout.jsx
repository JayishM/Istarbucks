import "./Checkout.css";

import { useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext";

import { useAuth } from "../../context/AuthContext";

import { useState } from "react";


function Checkout() {

    const navigate = useNavigate();


    const {
        cart,
        cartTotal,
        clearCart
    } = useCart();


    const [placingOrder, setPlacingOrder] = useState(false);

    const { token, isLoggedIn } = useAuth();

    const [paymentMethod, setPaymentMethod] = useState("cod");

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    /*
        =========================
        TOTAL CALCULATION
        =========================
    */

    const subtotal = Number(cartTotal) || 0;

    const deliveryFee = cart.length > 0 ? 2.00 : 0;

    const tax = Number((subtotal * 0.08).toFixed(2));

    const grandTotal = Number(
        (subtotal + deliveryFee + tax).toFixed(2)
    );


    /*
        =========================
        PLACE ORDER
        =========================
    */

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (cart.length === 0) {

            navigate("/menu");

            return;
        }


        if (!token) {

            navigate("/login");

            return;
        }


        try {

            setPlacingOrder(true);

            setLoading(true);


            const deliveryFee = cart.length > 0 ? 2.00 : 0;

            const tax = cartTotal * 0.08;

            const grandTotal =
                cartTotal +
                deliveryFee +
                tax;


            /*
                Send order to backend
            */

            const response = await fetch(
                "http://localhost:3000/api/orders",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",

                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        items: cart,
                        total: grandTotal
                    })
                }
            );


            const data = await response.json();


            if (!response.ok) {

                throw new Error(
                    data.message || "Failed to place order"
                );

            }


            /*
                =========================
                BACKEND ORDER
                =========================

                Backend should return:

                id
                total
                status
                estimated_minutes
                ready_at
            */

            const order = {

                ...data.order,

                subtotal: cartTotal,

                delivery: deliveryFee,

                tax: tax,

                paymentMethod: paymentMethod,

                /*
                    These come from MySQL/backend.
                    Do NOT calculate the timer here.
                */

                estimated_minutes:
                    data.order?.estimated_minutes ?? null,

                ready_at:
                    data.order?.ready_at ?? null
            };


            /*
                Clear cart only after
                successful order creation
            */

            clearCart();


            /*
                Go to order success page

                The OrderSuccess page will use
                ready_at to display the countdown.
            */

            navigate("/order-success", {

                state: {
                    order
                }

            });


        } catch (error) {

            console.error(
                "Order placement error:",
                error
            );

            setError(
                error.message ||
                "Something went wrong while placing your order."
            );

            alert(error.message);

        } finally {

            setPlacingOrder(false);

            setLoading(false);

        }

    };


    /*
        =========================
        EMPTY CART
        =========================
    */

    if (cart.length === 0) {

        return (

            <div className="checkout-empty">

                <div className="checkout-empty-icon">

                    <i className="bi bi-cart-x"></i>

                </div>


                <h2>
                    Your cart is empty
                </h2>


                <p>
                    Add some delicious coffee before
                    checking out.
                </p>


                <button
                    onClick={() => navigate("/menu")}
                >

                    Explore Menu

                    <i className="bi bi-arrow-right"></i>

                </button>

            </div>

        );

    }


    /*
        =========================
        CHECKOUT PAGE
        =========================
    */

    return (

        <div className="checkout-page">


            {/* HERO */}

            <section className="checkout-hero">

                <span>
                    CHECKOUT
                </span>


                <h1>
                    Complete Your <strong>Order</strong>
                </h1>


                <p>
                    Almost there! Enter your details
                    and choose your preferred payment method.
                </p>

            </section>


            {/* ERROR */}

            {error && (

                <div
                    className="checkout-error"

                    style={{
                        maxWidth: "1200px",
                        margin: "20px auto",
                        padding: "14px 20px",
                        borderRadius: "8px",
                        background: "#4a1f1f",
                        color: "#ffb3b3"
                    }}
                >

                    {error}

                </div>

            )}


            {/* CHECKOUT CONTENT */}

            <section className="checkout-section">


                {/* LEFT */}

                <form
                    className="checkout-form"
                    onSubmit={handleSubmit}
                >


                    <div className="checkout-heading">

                        <span>
                            DELIVERY DETAILS
                        </span>

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

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    required
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label>
                                Email Address
                            </label>

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

                            <label>
                                Address
                            </label>

                            <input
                                type="text"
                                placeholder="House no., street, area"
                                required
                            />

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    placeholder="Jaipur"
                                    required
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    PIN Code
                                </label>

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


                            {/* COD */}

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

                                    checked={
                                        paymentMethod === "cod"
                                    }

                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }

                                />


                                <div className="payment-icon">

                                    <i className="bi bi-cash-stack"></i>

                                </div>


                                <div>

                                    <strong>
                                        Cash on Delivery
                                    </strong>

                                    <span>
                                        Pay when your order arrives
                                    </span>

                                </div>


                                <i className="bi bi-check-circle-fill payment-check"></i>

                            </label>


                            {/* UPI */}

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

                                    checked={
                                        paymentMethod === "upi"
                                    }

                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }

                                />


                                <div className="payment-icon">

                                    <i className="bi bi-phone"></i>

                                </div>


                                <div>

                                    <strong>
                                        UPI
                                    </strong>

                                    <span>
                                        Google Pay, PhonePe, Paytm
                                    </span>

                                </div>


                                <i className="bi bi-check-circle-fill payment-check"></i>

                            </label>


                            {/* CARD */}

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

                                    checked={
                                        paymentMethod === "card"
                                    }

                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }

                                />


                                <div className="payment-icon">

                                    <i className="bi bi-credit-card"></i>

                                </div>


                                <div>

                                    <strong>
                                        Credit / Debit Card
                                    </strong>

                                    <span>
                                        Visa, Mastercard and more
                                    </span>

                                </div>


                                <i className="bi bi-check-circle-fill payment-check"></i>

                            </label>


                        </div>

                    </div>


                    {/* PLACE ORDER */}

                    <button
                        type="submit"
                        className="place-order-btn"
                        disabled={loading || placingOrder}
                    >

                        {loading || placingOrder
                            ? "Placing Order..."
                            : "Place Order"
                        }


                        {!loading && !placingOrder && (

                            <i className="bi bi-arrow-right"></i>

                        )}

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


                    {/* ITEMS */}

                    <div className="checkout-items">

                        {cart.map((item, index) => (

                            <div
                                className="checkout-item"

                                key={
                                    item.customizationId ||
                                    `${item.name}-${index}`
                                }
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

                                    <h4>
                                        {item.name}
                                    </h4>


                                    <span>
                                        {item.category}
                                    </span>


                                    {/* Customization */}

                                    <small
                                        style={{
                                            display: "block",
                                            marginTop: "5px",
                                            opacity: 0.7
                                        }}
                                    >

                                        {item.size &&
                                            `${item.size} • `
                                        }


                                        {item.temperature &&
                                            `${item.temperature} • `
                                        }


                                        {item.milk &&
                                            `${item.milk} Milk`
                                        }

                                    </small>

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


                    {/* SUBTOTAL */}

                    <div className="checkout-total-row">

                        <span>
                            Subtotal
                        </span>

                        <strong>
                            ${subtotal.toFixed(2)}
                        </strong>

                    </div>


                    {/* DELIVERY */}

                    <div className="checkout-total-row">

                        <span>
                            Delivery
                        </span>

                        <strong>
                            ${deliveryFee.toFixed(2)}
                        </strong>

                    </div>


                    {/* TAX */}

                    <div className="checkout-total-row">

                        <span>
                            Tax (8%)
                        </span>

                        <strong>
                            ${tax.toFixed(2)}
                        </strong>

                    </div>


                    <div className="checkout-divider"></div>


                    {/* GRAND TOTAL */}

                    <div className="checkout-grand-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ${grandTotal.toFixed(2)}
                        </strong>

                    </div>


                    {/* WAITING TIME INFO */}

                    <div
                        style={{
                            marginTop: "20px",
                            padding: "14px 16px",
                            borderRadius: "10px",
                            background: "rgba(198, 138, 82, 0.10)",
                            border: "1px solid rgba(198, 138, 82, 0.25)",
                            display: "flex",
                            alignItems: "center",
                            gap: "12px"
                        }}
                    >

                        <i
                            className="bi bi-clock"
                            style={{
                                fontSize: "20px",
                                color: "#C68A52"
                            }}
                        ></i>


                        <div>

                            <strong
                                style={{
                                    display: "block"
                                }}
                            >
                                Estimated preparation time
                            </strong>

                            <span
                                style={{
                                    fontSize: "13px",
                                    opacity: 0.7
                                }}
                            >
                                Your exact waiting time will be shown
                                after placing the order.
                            </span>

                        </div>

                    </div>


                    {/* SECURE CHECKOUT */}

                    <div className="secure-checkout">

                        <i className="bi bi-shield-check"></i>


                        <div>

                            <strong>
                                Secure Checkout
                            </strong>

                            <span>
                                Your information is protected
                            </span>

                        </div>

                    </div>


                    {/* BACK TO CART */}

                    <button
                        type="button"
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