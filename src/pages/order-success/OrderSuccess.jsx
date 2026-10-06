import "./OrderSuccess.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function OrderSuccess() {
    const navigate = useNavigate();

    const {
        cart,
        cartTotal
    } = useCart();

    const deliveryFee = cart.length > 0 ? 2.00 : 0;
    const tax = cartTotal * 0.08;
    const grandTotal = cartTotal + deliveryFee + tax;

    const orderNumber =
        "IST" + Math.floor(1000 + Math.random() * 9000);

    return (
        <div className="success-page">

            <div className="success-card">

                {/* SUCCESS ICON */}

                <div className="success-icon">
                    <i className="bi bi-check-lg"></i>
                </div>

                <span className="success-label">
                    ORDER CONFIRMED
                </span>

                <h1>
                    Thank You for <strong>Your Order!</strong>
                </h1>

                <p className="success-message">
                    Your coffee is being prepared with care.
                    We can't wait to serve you!
                </p>


                {/* ORDER NUMBER */}

                <div className="order-number">
                    <span>ORDER NUMBER</span>
                    <strong>#{orderNumber}</strong>
                </div>


                {/* ITEMS */}

                {cart.length > 0 && (
                    <div className="success-items">

                        <div className="success-items-heading">
                            <span>YOUR ITEMS</span>
                            <span>
                                {cart.reduce(
                                    (total, item) =>
                                        total + item.quantity,
                                    0
                                )} items
                            </span>
                        </div>

                        {cart.map(item => (

                            <div
                                className="success-item"
                                key={item.name}
                            >

                                <div className="success-item-image">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                    <span>
                                        {item.quantity}
                                    </span>
                                </div>

                                <div className="success-item-info">
                                    <h3>{item.name}</h3>
                                    <p>{item.category}</p>
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
                )}


                {/* TOTAL */}

                <div className="success-total">

                    <div>
                        <span>Subtotal</span>
                        <strong>
                            ${cartTotal.toFixed(2)}
                        </strong>
                    </div>

                    <div>
                        <span>Delivery</span>
                        <strong>
                            ${deliveryFee.toFixed(2)}
                        </strong>
                    </div>

                    <div>
                        <span>Tax</span>
                        <strong>
                            ${tax.toFixed(2)}
                        </strong>
                    </div>

                    <div className="total-line"></div>

                    <div className="final-total">
                        <span>Total</span>
                        <strong>
                            ${grandTotal.toFixed(2)}
                        </strong>
                    </div>

                </div>


                {/* DELIVERY STATUS */}

                <div className="order-status">

                    <div className="status-icon">
                        <i className="bi bi-cup-hot"></i>
                    </div>

                    <div>
                        <strong>
                            Your order is being prepared
                        </strong>

                        <p>
                            Estimated delivery: 25–35 minutes
                        </p>
                    </div>

                </div>


                {/* BUTTONS */}

                <div className="success-actions">

                    <button
                        className="primary-success-btn"
                        onClick={() => navigate("/menu")}
                    >
                        Continue Shopping
                        <i className="bi bi-arrow-right"></i>
                    </button>

                    <button
                        className="secondary-success-btn"
                        onClick={() => navigate("/")}
                    >
                        Back to Home
                    </button>

                </div>

            </div>

        </div>
    );
}

export default OrderSuccess;