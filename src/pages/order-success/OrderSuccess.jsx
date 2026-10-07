import "./OrderSuccess.css";

import {
    useEffect,
    useState
} from "react";

import {
    useLocation,
    useNavigate
} from "react-router-dom";


function OrderSuccess() {

    const location = useLocation();
    const navigate = useNavigate();

    const order = location.state?.order;


    const [remaining, setRemaining] =
        useState(0);


    useEffect(() => {

        if (!order?.ready_at) {
            return;
        }


        const calculateRemaining = () => {

            const readyTime =
                new Date(order.ready_at).getTime();

            const now =
                Date.now();

            const difference =
                Math.max(
                    0,
                    readyTime - now
                );

            setRemaining(
                Math.floor(difference / 1000)
            );
        };


        calculateRemaining();


        const timer =
            setInterval(
                calculateRemaining,
                1000
            );


        return () => {
            clearInterval(timer);
        };

    }, [order]);


    if (!order) {

        return (
            <div className="order-success-page">

                <div className="order-success-card">

                    <i className="bi bi-receipt"></i>

                    <h1>
                        Order Not Found
                    </h1>

                    <p>
                        We couldn't find your order details.
                    </p>

                    <button
                        onClick={() => navigate("/menu")}
                    >
                        Back to Menu
                    </button>

                </div>

            </div>
        );
    }


    const minutes =
        Math.floor(remaining / 60);

    const seconds =
        remaining % 60;


    const formattedTime =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;


    const completed =
        remaining <= 0;


    return (

        <div className="order-success-page">

            <div className="order-success-card">

                <div className="success-icon">

                    <i
                        className={
                            completed
                                ? "bi bi-check-circle-fill"
                                : "bi bi-cup-hot-fill"
                        }
                    ></i>

                </div>


                <span className="success-label">
                    ORDER #{order.id}
                </span>


                <h1>

                    {completed
                        ? "Your Order Is Ready!"
                        : "Order Confirmed!"
                    }

                </h1>


                <p>

                    {completed
                        ? "Your coffee has been prepared. Enjoy!"
                        : "We're preparing your coffee right now."
                    }

                </p>


                {!completed && (

                    <div className="order-timer">

                        <span>
                            ESTIMATED WAIT
                        </span>

                        <strong>
                            {formattedTime}
                        </strong>

                        <small>
                            Your order will be ready soon
                        </small>

                    </div>

                )}


                {completed && (

                    <div className="order-ready">

                        <i className="bi bi-check2"></i>

                        <span>
                            Order completed
                        </span>

                    </div>

                )}


                <div className="order-success-details">

                    <div>

                        <span>
                            ORDER NUMBER
                        </span>

                        <strong>
                            #{order.id}
                        </strong>

                    </div>


                    <div>

                        <span>
                            TOTAL
                        </span>

                        <strong>
                            ${Number(order.total).toFixed(2)}
                        </strong>

                    </div>


                    <div>

                        <span>
                            ESTIMATED TIME
                        </span>

                        <strong>
                            {order.estimated_minutes} min
                        </strong>

                    </div>

                </div>


                <div className="order-success-buttons">

                    <button
                        onClick={() =>
                            navigate("/orders")
                        }
                    >
                        View My Orders

                        <i className="bi bi-arrow-right"></i>

                    </button>


                    <button
                        className="secondary"
                        onClick={() =>
                            navigate("/menu")
                        }
                    >
                        Order More Coffee
                    </button>

                </div>

            </div>

        </div>

    );
}


export default OrderSuccess;