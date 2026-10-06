import { useEffect, useState } from "react";
import "./Orders.css";

import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import cappuccino from "../../assets/capuchino.png";
import float from "../../assets/float.png";
import espresso from "../../assets/espresso.png";


function Orders() {

    const { reorderItems } = useCart();
    const { token } = useAuth();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    /* PRODUCT IMAGES */

    const productImages = {
        1: cappuccino,
        2: float,
        3: espresso,
        4: cappuccino,
        5: espresso
    };


    /* GET ORDERS FROM MYSQL */

    useEffect(() => {

        const fetchOrders = async () => {

            if (!token) {
                navigate("/login");
                return;
            }

            try {

                setLoading(true);
                setError("");

                const response = await fetch(
                    "http://localhost:3000/api/orders",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (response.status === 401) {
                    navigate("/login");
                    return;
                }

                if (!response.ok) {
                    throw new Error(
                        data.message || "Failed to fetch orders"
                    );
                }

                setOrders(data.orders || []);

            } catch (error) {

                console.error("Orders error:", error);

                setError(
                    error.message ||
                    "Unable to load your orders."
                );

            } finally {

                setLoading(false);

            }
        };

        fetchOrders();

    }, [token, navigate]);


    /* FORMAT DATE */

    const formatDate = (date) => {

        if (!date) {
            return "Unknown date";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );
    };


    /* ORDER AGAIN */

    const handleOrderAgain = (order) => {

        const items = order.items.map((item) => ({

            product_id: item.product_id,

            name: item.name || "Coffee",

            category: item.category || "Coffee",

            image:
                productImages[item.product_id] ||
                cappuccino,

            price: Number(item.price),

            quantity: Number(item.quantity),

            size: item.size,

            temperature: item.temperature,

            sugar: item.sugar,

            milk: item.milk,

            extras: {
                extraShot: Boolean(item.extra_shot),
                oatMilk: Boolean(item.oat_milk),
                caramel: Boolean(item.caramel)
            }

        }));

        reorderItems(items);

        navigate("/checkout");
    };


    /* LOADING */

    if (loading) {

        return (
            <div className="orders-page">

                <section className="orders-hero">

                    <span>MY ACCOUNT</span>

                    <h1>
                        Order <strong>History</strong>
                    </h1>

                    <p>
                        Keep track of all your previous coffee orders.
                    </p>

                </section>

                <section className="orders-container">

                    <div className="orders-empty">

                        <div className="empty-order-icon">
                            <i className="bi bi-arrow-repeat"></i>
                        </div>

                        <h2>
                            Loading <strong>Orders</strong>
                        </h2>

                        <p>
                            Please wait while we load your order history.
                        </p>

                    </div>

                </section>

            </div>
        );
    }


    /* ERROR */

    if (error) {

        return (
            <div className="orders-page">

                <section className="orders-hero">

                    <span>MY ACCOUNT</span>

                    <h1>
                        Order <strong>History</strong>
                    </h1>

                    <p>
                        Keep track of all your previous coffee orders.
                    </p>

                </section>

                <section className="orders-container">

                    <div className="orders-empty">

                        <div className="empty-order-icon">
                            <i className="bi bi-exclamation-circle"></i>
                        </div>

                        <h2>
                            Couldn't Load <strong>Orders</strong>
                        </h2>

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                            <i className="bi bi-arrow-repeat"></i>
                        </button>

                    </div>

                </section>

            </div>
        );
    }


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


                {/* HEADER */}

                <div className="orders-header">

                    <div>

                        <span>
                            YOUR ORDERS
                        </span>

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


                {/* EMPTY */}

                {orders.length === 0 ? (

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

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order.id}
                            >


                                {/* ORDER HEADER */}

                                <div className="order-card-header">

                                    <div>

                                        <span>
                                            ORDER NUMBER
                                        </span>

                                        <h3>
                                            #{order.id}
                                        </h3>

                                    </div>


                                    <div className="order-date">

                                        <span>
                                            ORDERED ON
                                        </span>

                                        <strong>
                                            {formatDate(
                                                order.created_at
                                            )}
                                        </strong>

                                    </div>


                                    <div className="order-status-badge">

                                        {order.status || "Preparing"}

                                    </div>

                                </div>


                                {/* ITEMS */}

                                <div className="order-items">

                                    {order.items &&
                                        order.items.map(
                                            (item, index) => (

                                                <div
                                                    className="order-item"
                                                    key={item.id || index}
                                                >


                                                    {/* IMAGE */}

                                                    <div className="order-item-image">

                                                        <img
                                                            src={
                                                                productImages[
                                                                    item.product_id
                                                                ] ||
                                                                cappuccino
                                                            }
                                                            alt={
                                                                item.name ||
                                                                "Coffee"
                                                            }
                                                        />

                                                        <span className="order-item-quantity">
                                                            {item.quantity}
                                                        </span>

                                                    </div>


                                                    {/* DETAILS */}

                                                    <div className="order-item-details">

                                                        <h3>
                                                            {item.name ||
                                                                "Coffee"}
                                                        </h3>


                                                        <span className="order-item-category">
                                                            {item.category ||
                                                                "Coffee"}
                                                        </span>


                                                        {/* CUSTOMIZATION */}

                                                        <div className="order-item-customization">


                                                            {item.size && (

                                                                <span>

                                                                    <i className="bi bi-cup"></i>

                                                                    {item.size}

                                                                </span>

                                                            )}


                                                            {item.temperature && (

                                                                <span>

                                                                    <i
                                                                        className={
                                                                            item.temperature ===
                                                                                "Hot"
                                                                                ? "bi bi-cup-hot"
                                                                                : "bi bi-snow"
                                                                        }
                                                                    ></i>

                                                                    {item.temperature}

                                                                </span>

                                                            )}


                                                            {item.sugar && (

                                                                <span>

                                                                    {item.sugar}
                                                                    {" "}
                                                                    Sugar

                                                                </span>

                                                            )}


                                                            {item.milk && (

                                                                <span>

                                                                    {item.milk}
                                                                    {" "}
                                                                    Milk

                                                                </span>

                                                            )}


                                                            {Boolean(
                                                                item.extra_shot
                                                            ) && (

                                                                    <span>
                                                                        + Extra Shot
                                                                    </span>

                                                                )}


                                                            {Boolean(
                                                                item.oat_milk
                                                            ) && (

                                                                    <span>
                                                                        + Oat Milk
                                                                    </span>

                                                                )}


                                                            {Boolean(
                                                                item.caramel
                                                            ) && (

                                                                    <span>
                                                                        + Caramel
                                                                    </span>

                                                                )}

                                                        </div>

                                                    </div>


                                                    {/* PRICE */}

                                                    <div className="order-item-price">

                                                        $
                                                        {(
                                                            Number(item.price) *
                                                            Number(item.quantity)
                                                        ).toFixed(2)}

                                                    </div>

                                                </div>

                                            )
                                        )}

                                </div>


                                {/* FOOTER */}

                                <div className="order-card-footer">


                                    <div className="order-total">

                                        <span>
                                            Total
                                        </span>

                                        <strong>
                                            $
                                            {Number(
                                                order.total
                                            ).toFixed(2)}
                                        </strong>

                                    </div>


                                    <button
                                        onClick={() =>
                                            handleOrderAgain(order)
                                        }
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