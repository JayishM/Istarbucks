import "./OrderSuccess.css";
import { useLocation, useNavigate } from "react-router-dom";

function OrderSuccess() {
    const navigate = useNavigate();
    const location = useLocation();

    const order = location.state?.order;

    // If no order information was passed
    if (!order) {
        return (
            <div className="success-page">
                <div className="success-card">

                    <div className="success-icon">
                        <i className="bi bi-receipt"></i>
                    </div>

                    <h1>
                        No Order <strong>Found</strong>
                    </h1>

                    <p className="success-message">
                        We couldn't find your order details.
                    </p>

                    <button
                        className="primary-success-btn"
                        onClick={() => navigate("/menu")}
                    >
                        Go to Menu
                        <i className="bi bi-arrow-right"></i>
                    </button>

                </div>
            </div>
        );
    }

    const {
        id,
        items = [],
        subtotal = 0,
        delivery = 0,
        tax = 0,
        total = 0
    } = order;

    // Total number of items
    const itemCount = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

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

                    <strong>
                        #{id}
                    </strong>
                </div>


                {/* ITEMS */}

                {items.length > 0 && (
                    <div className="success-items">

                        <div className="success-items-heading">
                            <span>YOUR ITEMS</span>

                            <span>
                                {itemCount}{" "}
                                {itemCount === 1 ? "item" : "items"}
                            </span>
                        </div>


                        {items.map((item) => (

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

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        {item.category}
                                    </p>

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
                            ${Number(subtotal).toFixed(2)}
                        </strong>
                    </div>


                    <div>
                        <span>Delivery</span>

                        <strong>
                            ${Number(delivery).toFixed(2)}
                        </strong>
                    </div>


                    <div>
                        <span>Tax</span>

                        <strong>
                            ${Number(tax).toFixed(2)}
                        </strong>
                    </div>


                    <div className="total-line"></div>


                    <div className="final-total">

                        <span>Total</span>

                        <strong>
                            ${Number(total).toFixed(2)}
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