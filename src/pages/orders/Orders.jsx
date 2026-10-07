import "./Orders.css";
import { useEffect, useRef, useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import cappuccino from "../../assets/capuchino.png";
import float from "../../assets/float.png";
import espresso from "../../assets/espresso.png";
import ReadyModal from "../../components/ReadyModal/ReadyModal";


// ==========================================
// COUNTDOWN
// ==========================================

function OrderCountdown({ readyAt, estimatedMinutes }) {
    const [remaining, setRemaining] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const calculateRemaining = () => {
            const readyTime = new Date(readyAt).getTime();

            const difference = Math.max(
                0,
                readyTime - Date.now()
            );

            const seconds = Math.floor(difference / 1000);

            setRemaining(seconds);

            if (seconds <= 0) {
                setReady(true);
            }
        };

        calculateRemaining();

        const timer = setInterval(
            calculateRemaining,
            1000
        );

        return () => {
            clearInterval(timer);
        };
    }, [readyAt]);

    // ======================================
    // READY
    // ======================================

    if (ready) {
        return (
            <div className="order-ready-box">
                <div className="order-ready-icon">
                    <i className="bi bi-check-circle-fill"></i>
                </div>

                <div>
                    <strong>
                        Your order is ready!
                    </strong>

                    <span>
                        Please collect your order from the counter.
                    </span>
                </div>
            </div>
        );
    }

    // ======================================
    // TIME
    // ======================================

    const minutes = Math.floor(remaining / 60);
    const seconds = remaining % 60;

    return (
        <div className="order-preparation-box">
            <div className="preparation-icon">
                <i className="bi bi-clock-history"></i>
            </div>

            <div className="preparation-content">
                <span className="preparation-label">
                    Estimated preparation time
                </span>

                <strong>
                    Your order will be ready in{" "}
                    <b>
                        {minutes}:
                        {String(seconds).padStart(2, "0")}
                    </b>
                </strong>

                {estimatedMinutes && (
                    <small>
                        Estimated wait:{" "}
                        {estimatedMinutes} minutes
                    </small>
                )}
            </div>
        </div>
    );
}


// ==========================================
// ORDERS
// ==========================================

function Orders() {
    const { reorderItems } = useCart();
    const { token, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Prevent the same popup from appearing repeatedly
    const alertedOrders = useRef(new Set());

    // Currently ready order shown in modal
    const [readyOrder, setReadyOrder] = useState(null);


    // ==========================================
    // PRODUCT IMAGES
    // ==========================================

    const productImages = {
        1: cappuccino,
        2: float,
        3: espresso,
        4: cappuccino,
        5: espresso
    };


    // ==========================================
    // FETCH ORDERS
    // ==========================================

    const fetchOrders = async () => {
        try {
            setLoading(true);
            setError("");

            if (!token) {
                navigate("/login");
                return;
            }

            const response = await fetch(
                "http://localhost:3000/api/orders",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message ||
                    "Failed to fetch orders"
                );
            }

            setOrders(data.orders || []);

        } catch (error) {
            console.error(
                "Orders error:",
                error
            );

            setError(
                error.message ||
                "Failed to fetch orders"
            );

        } finally {
            setLoading(false);
        }
    };


    // ==========================================
    // INITIAL FETCH
    // ==========================================

    useEffect(() => {
        if (!isLoggedIn || !token) {
            navigate("/login");
            return;
        }

        fetchOrders();
    }, [
        token,
        isLoggedIn,
        navigate
    ]);


    // ==========================================
    // READY ALERT
    // ==========================================

    useEffect(() => {
        if (!orders.length) {
            return;
        }

        const checkOrders = () => {
            const now = Date.now();

            orders.forEach((order) => {

                if (
                    !order.ready_at ||
                    order.status !== "Preparing"
                ) {
                    return;
                }

                const readyTime =
                    new Date(
                        order.ready_at
                    ).getTime();

                if (
                    now >= readyTime &&
                    !alertedOrders.current.has(
                        order.id
                    )
                ) {

                    // Prevent this order from
                    // showing the popup again
                    alertedOrders.current.add(
                        order.id
                    );

                    // ==================================
                    // CUSTOM READY MODAL
                    // ==================================

                    setReadyOrder(order.id);


                    // ==================================
                    // UPDATE STATUS IMMEDIATELY
                    // ==================================

                    setOrders(
                        (currentOrders) =>
                            currentOrders.map(
                                (currentOrder) =>
                                    currentOrder.id ===
                                    order.id
                                        ? {
                                            ...currentOrder,
                                            status:
                                                "Completed"
                                        }
                                        : currentOrder
                            )
                    );
                }
            });
        };

        checkOrders();

        const timer = setInterval(
            checkOrders,
            1000
        );

        return () => {
            clearInterval(timer);
        };

    }, [orders]);


    // ==========================================
    // DATE
    // ==========================================

    const formatDate = (date) => {
        if (!date) {
            return "Unknown date";
        }

        return new Date(date)
            .toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric"
                }
            );
    };


    // ==========================================
    // ORDER AGAIN
    // ==========================================

    const handleOrderAgain = (order) => {
        if (
            !order.items ||
            order.items.length === 0
        ) {
            return;
        }

        const items = order.items.map(
            (item) => ({
                product_id:
                    item.product_id,

                name:
                    item.name ||
                    "Coffee",

                category:
                    item.category ||
                    "Coffee",

                image:
                    productImages[
                        item.product_id
                    ] ||
                    cappuccino,

                price:
                    Number(item.price),

                quantity:
                    Number(item.quantity),

                size:
                    item.size,

                temperature:
                    item.temperature,

                sugar:
                    item.sugar,

                milk:
                    item.milk,

                extras: {
                    extraShot:
                        Boolean(
                            item.extra_shot
                        ),

                    oatMilk:
                        Boolean(
                            item.oat_milk
                        ),

                    caramel:
                        Boolean(
                            item.caramel
                        )
                }
            })
        );

        reorderItems(items);

        navigate("/checkout");
    };


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {
        return (
            <div className="orders-page">

                <section className="orders-hero">
                    <span>
                        MY ACCOUNT
                    </span>

                    <h1>
                        Order
                        <strong>
                            History
                        </strong>
                    </h1>

                    <p>
                        Keep track of all your
                        previous coffee orders.
                    </p>
                </section>


                <section className="orders-container">
                    <div className="orders-empty">

                        <div className="empty-order-icon">
                            <i className="bi bi-arrow-repeat"></i>
                        </div>

                        <h2>
                            Loading
                            <strong>
                                Orders
                            </strong>
                        </h2>

                        <p>
                            Fetching your orders...
                        </p>

                    </div>
                </section>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (error) {
        return (
            <div className="orders-page">

                <section className="orders-hero">
                    <span>
                        MY ACCOUNT
                    </span>

                    <h1>
                        Order
                        <strong>
                            History
                        </strong>
                    </h1>

                    <p>
                        Keep track of all your
                        previous coffee orders.
                    </p>
                </section>


                <section className="orders-container">
                    <div className="orders-empty">

                        <div className="empty-order-icon">
                            <i className="bi bi-exclamation-circle"></i>
                        </div>

                        <h2>
                            Couldn't Load
                            <strong>
                                Orders
                            </strong>
                        </h2>

                        <p>
                            {error}
                        </p>

                        <button
                            onClick={fetchOrders}
                        >
                            Try Again
                            <i className="bi bi-arrow-repeat"></i>
                        </button>

                    </div>
                </section>

            </div>
        );
    }


    // ==========================================
    // MAIN
    // ==========================================

    return (
        <div className="orders-page">

            {/* =================================
                READY ORDER MODAL
            ================================= */}

            {readyOrder && (
                <ReadyModal
                    orderId={readyOrder}
                    onClose={() =>
                        setReadyOrder(null)
                    }
                />
            )}


            {/* =================================
                HERO
            ================================= */}

            <section className="orders-hero">

                <span>
                    MY ACCOUNT
                </span>

                <h1>
                    Order
                    <strong>
                        History
                    </strong>
                </h1>

                <p>
                    Keep track of all your
                    previous coffee orders.
                </p>

            </section>


            {/* =================================
                ORDERS
            ================================= */}

            <section className="orders-container">

                {/* HEADER */}

                <div className="orders-header">

                    <div>
                        <span>
                            YOUR ORDERS
                        </span>

                        <h2>
                            Previous
                            <strong>
                                Orders
                            </strong>
                        </h2>
                    </div>


                    <button
                        onClick={() =>
                            navigate("/menu")
                        }
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
                            No Orders
                            <strong>
                                Yet
                            </strong>
                        </h2>

                        <p>
                            You haven't placed
                            any orders yet.
                        </p>

                        <button
                            onClick={() =>
                                navigate("/menu")
                            }
                        >
                            Explore Menu

                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>

                ) : (

                    /* =================================
                       ORDER LIST
                    ================================= */

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order.id}
                            >

                                {/* ORDER HEADER */}

                                <div className="order-card-header">

                                    <div className="order-number">

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


                                    <div className="order-status-area">

                                        <div
                                            className={
                                                `order-status-badge ${
                                                    order.status ===
                                                    "Preparing"
                                                        ? "preparing"
                                                        : "completed"
                                                }`
                                            }
                                        >

                                            <i
                                                className={
                                                    order.status ===
                                                    "Preparing"
                                                        ? "bi bi-hourglass-split"
                                                        : "bi bi-check-circle"
                                                }
                                            ></i>

                                            {order.status ||
                                                "Preparing"}

                                        </div>


                                        {/* COUNTDOWN */}

                                        {order.status ===
                                            "Preparing" &&
                                            order.ready_at && (

                                                <OrderCountdown
                                                    readyAt={
                                                        order.ready_at
                                                    }

                                                    estimatedMinutes={
                                                        order.estimated_minutes
                                                    }
                                                />

                                            )}

                                    </div>

                                </div>


                                {/* ITEMS */}

                                <div className="order-items">

                                    {order.items?.map(
                                        (item, index) => (

                                            <div
                                                className="order-item"
                                                key={
                                                    item.id ||
                                                    index
                                                }
                                            >

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

                                                    <span>
                                                        {item.quantity}
                                                    </span>

                                                </div>


                                                <div className="order-item-details">

                                                    <h3>
                                                        {item.name ||
                                                            "Coffee"}
                                                    </h3>

                                                    <span className="order-item-category">
                                                        {item.category ||
                                                            "Coffee"}
                                                    </span>


                                                    <div className="order-item-customization">

                                                        {item.size && (
                                                            <span>
                                                                {item.size}
                                                            </span>
                                                        )}

                                                        {item.temperature && (
                                                            <span>
                                                                {item.temperature}
                                                            </span>
                                                        )}

                                                        {item.milk && (
                                                            <span>
                                                                {item.milk} Milk
                                                            </span>
                                                        )}

                                                        {item.sugar && (
                                                            <span>
                                                                {item.sugar} Sugar
                                                            </span>
                                                        )}

                                                    </div>

                                                </div>


                                                <strong className="order-item-price">
                                                    $
                                                    {(
                                                        Number(
                                                            item.price
                                                        ) *
                                                        Number(
                                                            item.quantity
                                                        )
                                                    ).toFixed(2)}
                                                </strong>

                                            </div>

                                        )
                                    )}

                                </div>


                                {/* FOOTER */}

                                <div className="order-card-footer">

                                    <div>

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
                                        className="reorder-btn"
                                        onClick={() =>
                                            handleOrderAgain(
                                                order
                                            )
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

            </section>


            {/* =================================
                BACK
            ================================= */}

            <button
                className="orders-back"
                onClick={() =>
                    navigate("/profile")
                }
            >
                <i className="bi bi-arrow-left"></i>

                Back to Profile
            </button>

        </div>
    );
}

export default Orders;