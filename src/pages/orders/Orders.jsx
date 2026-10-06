import "./Orders.css";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
const handleOrderAgain = (order) => {
    localStorage.setItem(
        "reorderItems",
        JSON.stringify(order.items)
    );

    navigate("/checkout");
};

function Orders() {
    const { reorderItems } = useCart();
    const handleOrderAgain = (order) => {
        reorderItems(order.items);
        navigate("/checkout");
    };
    
    const navigate = useNavigate();

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <div className="orders-page">

            {/* HERO */}

            <section className="orders-hero">
                <span>MY ACCOUNT</span>

                <h1>
                    Order <strong>History</strong>
                </h1>

                <p>
                    Keep track of all your previous coffee orders.
                </p>
            </section>


            {/* ORDERS */}

            <section className="orders-container">

                <div className="orders-header">

                    <div>
                        <span>YOUR ORDERS</span>

                        <h2>
                            Previous <strong>Orders</strong>
                        </h2>
                    </div>

                    <button
                        onClick={() => navigate("/menu")}
                    >
                        Order Coffee
                        <i className="bi bi-arrow-right"></i>
                    </button>

                </div>


                {orders.length === 0 ? (

                    /* EMPTY STATE */

                    <div className="orders-empty">

                        <div className="empty-order-icon">
                            <i className="bi bi-receipt"></i>
                        </div>

                        <h2>
                            No Orders <strong>Yet</strong>
                        </h2>

                        <p>
                            You haven't placed any orders yet.
                            Your completed orders will appear here.
                        </p>

                        <button
                            onClick={() => navigate("/menu")}
                        >
                            Explore Menu
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>

                ) : (

                    /* ORDER LIST */

                    <div className="orders-list">

                        {orders
                            .slice()
                            .reverse()
                            .map((order) => (

                                <div
                                    className="order-card"
                                    key={order.id}
                                >

                                    {/* ORDER HEADER */}

                                    <div className="order-card-header">

                                        <div>

                                            <span>ORDER NUMBER</span>

                                            <h3>
                                                #{order.id}
                                            </h3>

                                        </div>


                                        <div className="order-date">

                                            <span>ORDERED ON</span>

                                            <strong>
                                                {formatDate(order.date)}
                                            </strong>

                                        </div>


                                        <div className="order-status-badge">
                                            {order.status || "Preparing"}
                                        </div>

                                    </div>


                                    {/* ITEMS */}

                                    <div className="order-items">

                                        {order.items.map((item) => (

                                            <div
                                                className="order-history-item"
                                                key={item.name}
                                            >

                                                <div className="history-item-image">

                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                    />

                                                    <span>
                                                        {item.quantity}
                                                    </span>

                                                </div>


                                                <div className="history-item-info">

                                                    <strong>
                                                        {item.name}
                                                    </strong>

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


                                    {/* ORDER FOOTER */}

                                    <div className="order-card-footer">

                                        <div className="order-total">

                                            <span>
                                                Total
                                            </span>

                                            <strong>
                                                $
                                                {Number(order.total).toFixed(2)}
                                            </strong>

                                        </div>


                                        <button
                                            onClick={() => handleOrderAgain(order)}
                                        >
                                            Order Again
                                            <i className="bi bi-arrow-right"></i>
                                        </button>
                                    </div>

                                </div>

                            ))}

                    </div>

                )}


                {/* BACK TO PROFILE */}

                <button
                    className="back-profile-btn"
                    onClick={() => navigate("/profile")}
                >
                    <i className="bi bi-arrow-left"></i>
                    Back to Profile
                </button>

            </section>

        </div>
    );
}

export default Orders;