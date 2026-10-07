import "./ProductDetails.css";

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCart } from "../../context/CartContext";


function ProductDetails() {

    const location = useLocation();
    const navigate = useNavigate();

    const { addToCart, updateCartItem } = useCart();


    const product = location.state?.product;
    const editItem = location.state?.editItem;


    // ==========================================
    // NO PRODUCT
    // ==========================================

    if (!product && !editItem) {

        return (

            <div className="product-details-page">

                <div className="product-not-found">

                    <h2>
                        Product not found
                    </h2>

                    <button
                        onClick={() => navigate("/menu")}
                    >
                        Back to Menu
                    </button>

                </div>

            </div>

        );

    }


    // ==========================================
    // PRODUCT DATA
    // ==========================================

    const currentProduct =
        product || editItem;


    const productId =
        currentProduct.product_id ||
        currentProduct.id;


    // ==========================================
    // STATE
    // ==========================================

    const [size, setSize] = useState(
        editItem?.size || "Medium"
    );

    const [temperature, setTemperature] = useState(
        editItem?.temperature || "Hot"
    );

    const [sugar, setSugar] = useState(
        editItem?.sugar || "Medium"
    );

    const [milk, setMilk] = useState(
        editItem?.milk || "Regular"
    );


    const [extras, setExtras] = useState({

        shot:
            editItem?.extras?.extraShot ||
            editItem?.extra_shot ||
            false,

        oatMilk:
            editItem?.extras?.oatMilk ||
            editItem?.oat_milk ||
            false,

        caramel:
            editItem?.extras?.caramel ||
            editItem?.caramel ||
            false

    });


    const [quantity, setQuantity] = useState(
        editItem?.quantity || 1
    );


    // ==========================================
    // PRICE
    // ==========================================

    const basePrice =
        Number(currentProduct.price) || 0;


    const sizePrice = {

        Small: 0,

        Medium: 0.70,

        Large: 1.40

    };


    const extraPrice = {

        shot: 0.80,

        oatMilk: 0.70,

        caramel: 0.60

    };


    let unitPrice =
        basePrice +
        (sizePrice[size] || 0);


    if (extras.shot) {

        unitPrice += extraPrice.shot;

    }


    if (extras.oatMilk) {

        unitPrice += extraPrice.oatMilk;

    }


    if (extras.caramel) {

        unitPrice += extraPrice.caramel;

    }


    const totalPrice =
        unitPrice * quantity;


    // ==========================================
    // EXTRA TOGGLE
    // ==========================================

    const toggleExtra = (extra) => {

        setExtras((current) => ({

            ...current,

            [extra]:
                !current[extra]

        }));

    };


    // ==========================================
    // ADD / UPDATE CART
    // ==========================================

    const handleAddToCart = () => {

        /*
            IMPORTANT:
            Always make sure the cart item
            has product_id.
        */

        const finalProductId =
            currentProduct.product_id ||
            currentProduct.id;


        if (!finalProductId) {

            alert(
                `Product ID missing for ${currentProduct.name}`
            );

            console.error(
                "Product without ID:",
                currentProduct
            );

            return;

        }


        // ======================================
        // CREATE CUSTOMIZED PRODUCT
        // ======================================

        const customizedProduct = {

            ...currentProduct,

            // IMPORTANT
            product_id: finalProductId,

            size,

            temperature,

            sugar,

            milk,

            extras: {

                extraShot:
                    Boolean(extras.shot),

                oatMilk:
                    Boolean(extras.oatMilk),

                caramel:
                    Boolean(extras.caramel)

            },

            price:
                unitPrice.toFixed(2),

            quantity

        };


        // ======================================
        // EDIT EXISTING CART ITEM
        // ======================================

        if (editItem) {

            const oldId =
                editItem.customizationId ||
                editItem.name;


            const customizationId = [

                finalProductId,

                currentProduct.name,

                size,

                temperature,

                sugar,

                milk,

                extras.shot,

                extras.oatMilk,

                extras.caramel

            ].join("-");


            updateCartItem(

                oldId,

                {

                    ...customizedProduct,

                    customizationId

                }

            );


            navigate("/cart");

            return;

        }


        // ======================================
        // ADD NEW ITEM
        // ======================================

        addToCart(customizedProduct);


        navigate("/cart");

    };


    // ==========================================
    // JSX
    // ==========================================

    return (

        <div className="product-details-page">


            {/* BACK */}

            <button
                className="product-back"
                onClick={() => navigate(-1)}
            >

                <i className="bi bi-arrow-left"></i>

                Back

            </button>


            <div className="product-details-container">


                {/* IMAGE */}

                <div className="product-details-image">

                    <img
                        src={currentProduct.image}
                        alt={currentProduct.name}
                    />

                </div>


                {/* DETAILS */}

                <div className="product-details-content">


                    <span className="product-category">

                        {currentProduct.category}

                    </span>


                    <h1>

                        {currentProduct.name}

                    </h1>


                    <div className="product-rating">

                        <i className="bi bi-star-fill"></i>

                        {currentProduct.rating || "4.8"}

                    </div>


                    <p className="product-description">

                        {currentProduct.description}

                    </p>


                    {/* SIZE */}

                    <div className="customization-section">

                        <h3>
                            Size
                        </h3>


                        <div className="option-group">

                            {["Small", "Medium", "Large"].map(
                                (option) => (

                                    <button
                                        key={option}
                                        className={
                                            size === option
                                                ? "option active"
                                                : "option"
                                        }
                                        onClick={() =>
                                            setSize(option)
                                        }
                                    >

                                        {option}

                                        {sizePrice[option] > 0 && (
                                            <small>
                                                +$
                                                {sizePrice[
                                                    option
                                                ].toFixed(2)}
                                            </small>
                                        )}

                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* TEMPERATURE */}

                    <div className="customization-section">

                        <h3>
                            Temperature
                        </h3>


                        <div className="option-group">

                            {["Hot", "Iced"].map(
                                (option) => (

                                    <button
                                        key={option}
                                        className={
                                            temperature === option
                                                ? "option active"
                                                : "option"
                                        }
                                        onClick={() =>
                                            setTemperature(option)
                                        }
                                    >

                                        {option}

                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* SUGAR */}

                    <div className="customization-section">

                        <h3>
                            Sugar
                        </h3>


                        <div className="option-group">

                            {[
                                "No Sugar",
                                "Low",
                                "Medium",
                                "High"
                            ].map(
                                (option) => (

                                    <button
                                        key={option}
                                        className={
                                            sugar === option
                                                ? "option active"
                                                : "option"
                                        }
                                        onClick={() =>
                                            setSugar(option)
                                        }
                                    >

                                        {option}

                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* MILK */}

                    <div className="customization-section">

                        <h3>
                            Milk
                        </h3>


                        <div className="option-group">

                            {[
                                "Regular",
                                "Oat",
                                "Almond",
                                "Soy"
                            ].map(
                                (option) => (

                                    <button
                                        key={option}
                                        className={
                                            milk === option
                                                ? "option active"
                                                : "option"
                                        }
                                        onClick={() =>
                                            setMilk(option)
                                        }
                                    >

                                        {option}

                                    </button>

                                )
                            )}

                        </div>

                    </div>


                    {/* EXTRAS */}

                    <div className="customization-section">

                        <h3>
                            Extras
                        </h3>


                        <div className="extras-group">


                            <label>

                                <input
                                    type="checkbox"
                                    checked={extras.shot}
                                    onChange={() =>
                                        toggleExtra("shot")
                                    }
                                />

                                <span>
                                    Extra Shot
                                </span>

                                <strong>
                                    +$0.80
                                </strong>

                            </label>


                            <label>

                                <input
                                    type="checkbox"
                                    checked={extras.oatMilk}
                                    onChange={() =>
                                        toggleExtra("oatMilk")
                                    }
                                />

                                <span>
                                    Extra Oat Milk
                                </span>

                                <strong>
                                    +$0.70
                                </strong>

                            </label>


                            <label>

                                <input
                                    type="checkbox"
                                    checked={extras.caramel}
                                    onChange={() =>
                                        toggleExtra("caramel")
                                    }
                                />

                                <span>
                                    Caramel
                                </span>

                                <strong>
                                    +$0.60
                                </strong>

                            </label>


                        </div>

                    </div>


                    {/* QUANTITY */}

                    <div className="quantity-section">

                        <h3>
                            Quantity
                        </h3>


                        <div className="quantity-control">

                            <button
                                onClick={() =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            quantity - 1
                                        )
                                    )
                                }
                            >
                                −
                            </button>


                            <span>
                                {quantity}
                            </span>


                            <button
                                onClick={() =>
                                    setQuantity(
                                        quantity + 1
                                    )
                                }
                            >
                                +
                            </button>

                        </div>

                    </div>


                    {/* ADD BUTTON */}

                    <button
                        className="add-to-cart-btn"
                        onClick={handleAddToCart}
                    >

                        <span>

                            {editItem
                                ? "Update Cart"
                                : "Add to Cart"
                            }

                        </span>


                        <strong>

                            $
                            {totalPrice.toFixed(2)}

                        </strong>

                    </button>


                </div>

            </div>

        </div>

    );

}


export default ProductDetails;