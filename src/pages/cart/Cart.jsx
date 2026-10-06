import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function Cart() {
    const navigate = useNavigate();

    const {
        cart,
        cartTotal,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    const deliveryFee = cart.length > 0 ? 2 : 0;
    const tax = cartTotal * 0.08;
    const grandTotal = cartTotal + deliveryFee + tax;

    const editItem = (item) => {
        navigate("/product", {
            state: {
                product: item,
                editMode: true
            }
        });
    };

    return (
        <div className="cart-page">

            <section className="cart-hero">
                <span>YOUR ORDER</span>

                <h1>
                    Shopping <strong>Cart</strong>
                </h1>

                <p>
                    Review your coffee and customize your order before checkout.
                </p>
            </section>

            <section className="cart-container">

                {cart.length === 0 ? (

                    /* EMPTY CART */

                    <div className="empty-cart">

                        <div className="empty-cart-icon">
                            <i className="bi bi-cart-x"></i>
                        </div>

                        <h2>
                            Your Cart Is <strong>Empty</strong>
                        </h2>

                        <p>
                            Looks like you haven't added any coffee yet.
                            Explore our menu and find your perfect drink.
                        </p>

                        <button
                            onClick={() => navigate("/menu")}
                        >
                            Explore Menu
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>

                ) : (

                    <div className="cart-layout">

                        {/* LEFT */}

                        <div className="cart-items-section">

                            <div className="cart-section-header">

                                <div>
                                    <span>YOUR ITEMS</span>

                                    <h2>
                                        Cart <strong>Items</strong>
                                    </h2>
                                </div>

                                <span className="cart-item-count">
                                    {cart.reduce(
                                        (total, item) =>
                                            total + item.quantity,
                                        0
                                    )} items
                                </span>

                            </div>

                            <div className="cart-items">

                                {cart.map((item) => (

                                    <div
                                        className="cart-item"
                                        key={item.customizationId || item.name}
                                    >

                                        {/* IMAGE */}

                                        <div className="cart-item-image">

                                            <img
                                                src={item.image}
                                                alt={item.name}
                                            />

                                        </div>

                                        {/* DETAILS */}

                                        <div className="cart-item-details">

                                            <span className="cart-item-category">
                                                {item.category}
                                            </span>

                                            <h3>{item.name}</h3>

                                            {/* CUSTOMIZATIONS */}

                                            <div className="cart-customization">

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

                                                {item.sugar && (
                                                    <span>
                                                        {item.sugar} Sugar
                                                    </span>
                                                )}

                                                {item.milk && (
                                                    <span>
                                                        {item.milk} Milk
                                                    </span>
                                                )}

                                                {item.extras?.extraShot && (
                                                    <span>
                                                        Extra Shot
                                                    </span>
                                                )}

                                                {item.extras?.oatMilk && (
                                                    <span>
                                                        Oat Milk
                                                    </span>
                                                )}

                                                {item.extras?.caramel && (
                                                    <span>
                                                        Caramel
                                                    </span>
                                                )}

                                            </div>

                                            {/* EDIT */}

                                            <button
                                                className="edit-item-btn"
                                                onClick={() =>
                                                    editItem(item)
                                                }
                                            >
                                                <i className="bi bi-pencil"></i>
                                                Edit
                                            </button>

                                        </div>

                                        {/* RIGHT */}

                                        <div className="cart-item-right">

                                            <strong className="cart-item-price">
                                                $
                                                {(
                                                    Number(item.price) *
                                                    item.quantity
                                                ).toFixed(2)}
                                            </strong>

                                            {/* QUANTITY */}

                                            <div className="cart-quantity">

                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item.customizationId ||
                                                            item.name
                                                        )
                                                    }
                                                >
                                                    −
                                                </button>

                                                <strong>
                                                    {item.quantity}
                                                </strong>

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item.customizationId ||
                                                            item.name
                                                        )
                                                    }
                                                >
                                                    +
                                                </button>

                                            </div>

                                            {/* REMOVE */}

                                            <button
                                                className="remove-item"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.customizationId ||
                                                        item.name
                                                    )
                                                }
                                            >
                                                <i className="bi bi-trash3"></i>
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* RIGHT SUMMARY */}

                        <aside className="cart-summary">

                            <span>ORDER SUMMARY</span>

                            <h2>
                                Your <strong>Total</strong>
                            </h2>

                            <div className="summary-line">
                                <span>Subtotal</span>

                                <strong>
                                    ${cartTotal.toFixed(2)}
                                </strong>
                            </div>

                            <div className="summary-line">
                                <span>Delivery</span>

                                <strong>
                                    ${deliveryFee.toFixed(2)}
                                </strong>
                            </div>

                            <div className="summary-line">
                                <span>Tax (8%)</span>

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
                                onClick={() =>
                                    navigate("/checkout")
                                }
                            >
                                Proceed to Checkout
                                <i className="bi bi-arrow-right"></i>
                            </button>

                            <button
                                className="continue-shopping"
                                onClick={() =>
                                    navigate("/menu")
                                }
                            >
                                <i className="bi bi-arrow-left"></i>
                                Continue Shopping
                            </button>

                        </aside>

                    </div>

                )}

            </section>

        </div>
    );
}

export default Cart;