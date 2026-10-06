import { useState } from "react";
import "./Menu.css";
import { useCart } from "../../context/CartContext";

import cappuccino from "../../assets/capuchino.png";
import float from "../../assets/float.png";
import espresso from "../../assets/espresso.png";

import { useNavigate } from "react-router-dom";

function Menu() {
    const [category, setCategory] = useState("All");

    const { addToCart } = useCart();
    const navigate = useNavigate();

    const products = [
        {
            id: 1,
            name: "Cappuccino",
            category: "Hot Coffee",
            price: "4.50",
            rating: "4.9",
            image: cappuccino,
            description:
                "Rich espresso with steamed milk and creamy foam.",

            milkPrices: {
                Oat: 0.80,
                Almond: 0.90,
                Soy: 0.70
            },

            extraPrices: {
                shot: 1.00,
                oatMilk: 0.80,
                caramel: 0.60
            }
        },

        {
            id: 2,
            name: "Latte",
            category: "Hot Coffee",
            price: "4.90",
            rating: "5.0",
            image: float,
            description:
                "Smooth espresso blended with creamy steamed milk.",

            milkPrices: {
                Oat: 0.90,
                Almond: 1.00,
                Soy: 0.80
            },

            extraPrices: {
                shot: 1.20,
                oatMilk: 0.90,
                caramel: 0.70
            }
        },

        {
            id: 3,
            name: "Espresso",
            category: "Hot Coffee",
            price: "3.50",
            rating: "4.7",
            image: espresso,
            description:
                "Bold and intense espresso with a rich aroma.",

            milkPrices: {
                Oat: 0.70,
                Almond: 0.80,
                Soy: 0.60
            },

            extraPrices: {
                shot: 1.20,
                oatMilk: 0.70,
                caramel: 0.50
            }
        },

        {
            id: 4,
            name: "Mocha",
            category: "Hot Coffee",
            price: "5.20",
            rating: "4.8",
            image: cappuccino,
            description:
                "Espresso combined with chocolate and steamed milk.",

            milkPrices: {
                Oat: 1.00,
                Almond: 1.10,
                Soy: 0.90
            },

            extraPrices: {
                shot: 1.30,
                oatMilk: 1.00,
                caramel: 0.70
            }
        },

        {
            id: 5,
            name: "Americano",
            category: "Hot Coffee",
            price: "3.90",
            rating: "4.6",
            image: espresso,
            description:
                "Espresso diluted with hot water for a smooth finish.",

            milkPrices: {
                Oat: 0.80,
                Almond: 0.90,
                Soy: 0.70
            },

            extraPrices: {
                shot: 1.00,
                oatMilk: 0.80,
                caramel: 0.60
            }
        }
    ];

    const filteredProducts =
        category === "All"
            ? products
            : products.filter(
                (product) => product.category === category
            );

    return (
        <div className="menu-page">

            {/* HERO */}

            <section className="menu-hero">

                <span>OUR MENU</span>

                <h1>
                    Discover Your
                    <strong> Perfect Coffee</strong>
                </h1>

                <p>
                    Explore our carefully crafted selection of
                    coffee, refreshing drinks and delicious treats.
                </p>

            </section>


            {/* CATEGORIES */}

            <div className="menu-categories">

                {[
                    "All",
                    "Hot Coffee",
                    "Cold Coffee",
                    "Tea",
                    "Desserts"
                ].map((item) => (

                    <button
                        key={item}
                        className={
                            category === item ? "active" : ""
                        }
                        onClick={() => setCategory(item)}
                    >
                        {item}
                    </button>

                ))}

            </div>


            {/* PRODUCTS */}

            <section className="menu-products">

                {filteredProducts.map((product) => (

                    <div
                        className="menu-card"
                        key={product.id}
                        onClick={() =>
                            navigate("/product", {
                                state: { product }
                            })
                        }
                    >

                        {/* IMAGE */}

                        <div className="menu-card-image">

                            <img
                                src={product.image}
                                alt={product.name}
                            />

                            <span className="menu-rating">
                                {product.rating}
                                <i className="bi bi-star-fill"></i>
                            </span>

                        </div>


                        {/* CONTENT */}

                        <div className="menu-card-content">

                            <span className="menu-category">
                                {product.category}
                            </span>

                            <h3>
                                {product.name}
                            </h3>

                            <p>
                                {product.description}
                            </p>


                            {/* PRICE + CART */}

                            <div className="menu-card-bottom">

                                <strong>
                                    ${product.price}
                                </strong>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(product);
                                    }}
                                    title="Add to cart"
                                >
                                    <i className="bi bi-plus"></i>
                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </section>

        </div>
    );
}

export default Menu;