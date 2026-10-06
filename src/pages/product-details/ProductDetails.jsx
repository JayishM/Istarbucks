import "./ProductDetails.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ProductDetails() {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        addToCart,
        updateCartItem
    } = useCart();

    const product = location.state?.product;
    const editMode = location.state?.editMode;

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product not found</h2>

                <button onClick={() => navigate("/menu")}>
                    Back to Menu
                </button>
            </div>
        );
    }

    // -------------------------
    // INITIAL VALUES
    // -------------------------

    const [size, setSize] = useState(
        editMode ? product.size || "Medium" : "Medium"
    );

    const [temperature, setTemperature] = useState(
        editMode ? product.temperature || "Hot" : "Hot"
    );

    const [sugar, setSugar] = useState(
        editMode ? product.sugar || "Medium" : "Medium"
    );

    const [milk, setMilk] = useState(
        editMode ? product.milk || "Regular" : "Regular"
    );

    const [quantity, setQuantity] = useState(
        editMode ? product.quantity || 1 : 1
    );

    const [extras, setExtras] = useState({
        shot: editMode
            ? product.extras?.extraShot || false
            : false,

        oatMilk: editMode
            ? product.extras?.oatMilk || false
            : false,

        caramel: editMode
            ? product.extras?.caramel || false
            : false
    });

    // -------------------------
    // SIZE PRICES
    // -------------------------

    const sizePrices = {
        Small: 0,
        Medium: 0.70,
        Large: 1.40
    };

    // -------------------------
    // MILK PRICES
    // -------------------------

    const milkPrices = {
        Regular: 0,
        Oat: product.milkPrices?.Oat ?? 0.80,
        Almond: product.milkPrices?.Almond ?? 0.90,
        Soy: product.milkPrices?.Soy ?? 0.70
    };

    // -------------------------
    // EXTRA PRICES
    // -------------------------

    const extraPrices = {
        shot: product.extraPrices?.shot ?? 1.00,
        oatMilk: product.extraPrices?.oatMilk ?? 0.80,
        caramel: product.extraPrices?.caramel ?? 0.60
    };

    // -------------------------
    // TOGGLE EXTRA
    // -------------------------

    const toggleExtra = (extra) => {
        setExtras(prev => ({
            ...prev,
            [extra]: !prev[extra]
        }));
    };

    // -------------------------
    // PRICE CALCULATION
    // -------------------------

    let unitPrice = Number(product.price);

    unitPrice += sizePrices[size];
    unitPrice += milkPrices[milk];

    if (extras.shot) {
        unitPrice += extraPrices.shot;
    }

    if (extras.oatMilk) {
        unitPrice += extraPrices.oatMilk;
    }

    if (extras.caramel) {
        unitPrice += extraPrices.caramel;
    }

    const totalPrice = unitPrice * quantity;

    // -------------------------
    // ADD / UPDATE CART
    // -------------------------

    const handleAddToCart = () => {

        const customizedProduct = {
            ...product,

            size,
            temperature,
            sugar,
            milk,

            extras: {
                extraShot: extras.shot,
                oatMilk: extras.oatMilk,
                caramel: extras.caramel
            },

            // Price is PER ITEM
            price: unitPrice.toFixed(2),

            quantity
        };

        // Create unique ID for this exact customization
        const customizationId = [
            customizedProduct.name,
            customizedProduct.size || "default",
            customizedProduct.temperature || "default",
            customizedProduct.sugar || "default",
            customizedProduct.milk || "default",
            customizedProduct.extras.extraShot,
            customizedProduct.extras.oatMilk,
            customizedProduct.extras.caramel
        ].join("-");

        customizedProduct.customizationId = customizationId;

        // EDIT EXISTING CART ITEM
        if (editMode) {

            updateCartItem(
                product.customizationId,
                customizedProduct
            );

        } else {

            // ADD NEW ITEM
            addToCart(customizedProduct);
        }

        navigate("/cart");
    };

    return (
        <div className="product-details-page">

            <div className="product-details-container">

                {/* IMAGE */}

                <div className="product-details-image">
                    <img
                        src={product.image}
                        alt={product.name}
                    />
                </div>

                {/* DETAILS */}

                <div className="product-details-content">

                    <span className="product-details-category">
                        {product.category}
                    </span>

                    <h1>{product.name}</h1>

                    <div className="product-rating">
                        <span>★★★★★</span>
                        <strong>{product.rating}</strong>
                    </div>

                    <p className="product-description">
                        {product.description}
                    </p>

                    {/* PRICE */}

                    <div className="product-price">
                        ${unitPrice.toFixed(2)}
                        <span> / item</span>
                    </div>

                    {/* SIZE */}

                    <div className="customization-section">

                        <h3>Size</h3>

                        <div className="choice-row">

                            {["Small", "Medium", "Large"].map(option => (

                                <button
                                    key={option}
                                    className={
                                        size === option
                                            ? "choice-btn active"
                                            : "choice-btn"
                                    }
                                    onClick={() => setSize(option)}
                                >
                                    <span>{option}</span>

                                    <small>
                                        {sizePrices[option] === 0
                                            ? "Included"
                                            : `+$${sizePrices[option].toFixed(2)}`
                                        }
                                    </small>

                                </button>

                            ))}

                        </div>

                    </div>

                    {/* TEMPERATURE */}

                    <div className="customization-section">

                        <h3>Temperature</h3>

                        <div className="choice-row">

                            {["Hot", "Iced"].map(option => (

                                <button
                                    key={option}
                                    className={
                                        temperature === option
                                            ? "choice-btn active"
                                            : "choice-btn"
                                    }
                                    onClick={() => setTemperature(option)}
                                >

                                    <i
                                        className={
                                            option === "Hot"
                                                ? "bi bi-cup-hot"
                                                : "bi bi-snow"
                                        }
                                    ></i>

                                    {option}

                                </button>

                            ))}

                        </div>

                    </div>

                    {/* SUGAR */}

                    <div className="customization-section">

                        <h3>Sugar Level</h3>

                        <div className="choice-row">

                            {["Low", "Medium", "High", "No Sugar"].map(option => (

                                <button
                                    key={option}
                                    className={
                                        sugar === option
                                            ? "choice-btn active"
                                            : "choice-btn"
                                    }
                                    onClick={() => setSugar(option)}
                                >
                                    {option}
                                </button>

                            ))}

                        </div>

                    </div>

                    {/* MILK */}

                    <div className="customization-section">

                        <h3>Milk</h3>

                        <div className="choice-row">

                            {Object.keys(milkPrices).map(option => (

                                <button
                                    key={option}
                                    className={
                                        milk === option
                                            ? "choice-btn active"
                                            : "choice-btn"
                                    }
                                    onClick={() => setMilk(option)}
                                >

                                    <span>{option}</span>

                                    <small>
                                        {milkPrices[option] === 0
                                            ? "Included"
                                            : `+$${milkPrices[option].toFixed(2)}`
                                        }
                                    </small>

                                </button>

                            ))}

                        </div>

                    </div>

                    {/* EXTRAS */}

                    <div className="customization-section">

                        <h3>Extras</h3>

                        <div className="extras-list">

                            <label className="extra-option">

                                <input
                                    type="checkbox"
                                    checked={extras.shot}
                                    onChange={() => toggleExtra("shot")}
                                />

                                <span>Extra Shot</span>

                                <strong>
                                    +${extraPrices.shot.toFixed(2)}
                                </strong>

                            </label>

                            <label className="extra-option">

                                <input
                                    type="checkbox"
                                    checked={extras.oatMilk}
                                    onChange={() => toggleExtra("oatMilk")}
                                />

                                <span>Oat Milk</span>

                                <strong>
                                    +${extraPrices.oatMilk.toFixed(2)}
                                </strong>

                            </label>

                            <label className="extra-option">

                                <input
                                    type="checkbox"
                                    checked={extras.caramel}
                                    onChange={() => toggleExtra("caramel")}
                                />

                                <span>Caramel</span>

                                <strong>
                                    +${extraPrices.caramel.toFixed(2)}
                                </strong>

                            </label>

                        </div>

                    </div>

                    {/* QUANTITY */}

                    <div className="quantity-section">

                        <h3>Quantity</h3>

                        <div className="quantity-control">

                            <button
                                onClick={() =>
                                    setQuantity(q => Math.max(1, q - 1))
                                }
                            >
                                −
                            </button>

                            <strong>{quantity}</strong>

                            <button
                                onClick={() =>
                                    setQuantity(q => q + 1)
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>

                    {/* TOTAL */}

                    <div className="product-total">

                        <span>Total</span>

                        <strong>
                            ${totalPrice.toFixed(2)}
                        </strong>

                    </div>

                    {/* ADD / UPDATE */}

                    <button
                        className="add-product-btn"
                        onClick={handleAddToCart}
                    >
                        {editMode ? "Update Cart" : "Add to Cart"}

                        <i
                            className={
                                editMode
                                    ? "bi bi-check-lg"
                                    : "bi bi-cart-plus"
                            }
                        ></i>
                    </button>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;