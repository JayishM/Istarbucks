import { useState } from "react";
import "./Menu.css";

import Navbar from "../../components/navbar/navbar.jsx";

import cappuccino from "../../assets/capuchino.png";
import float from "../../assets/float.png";
import espresso from "../../assets/espresso.png";

function Menu() {

    const [category, setCategory] = useState("All");

    const products = [
        {
            name: "Cappuccino",
            category: "Hot Coffee",
            price: "4.50",
            rating: "4.9",
            image: cappuccino,
            description: "Rich espresso with steamed milk and creamy foam."
        },
        {
            name: "Latte",
            category: "Hot Coffee",
            price: "4.90",
            rating: "5.0",
            image: float,
            description: "Smooth espresso blended with creamy steamed milk."
        },
        {
            name: "Espresso",
            category: "Hot Coffee",
            price: "3.50",
            rating: "4.7",
            image: espresso,
            description: "Bold and intense espresso with a rich aroma."
        },
        {
            name: "Mocha",
            category: "Hot Coffee",
            price: "5.20",
            rating: "4.8",
            image: cappuccino,
            description: "Espresso combined with chocolate and steamed milk."
        },
        {
            name: "Americano",
            category: "Hot Coffee",
            price: "3.90",
            rating: "4.6",
            image: espresso,
            description: "Espresso diluted with hot water for a smooth finish."
        },
        {
            name: "Iced Coffee",
            category: "Cold Coffee",
            price: "5.00",
            rating: "4.9",
            image: float,
            description: "Refreshing cold coffee with a smooth creamy finish."
        }
    ];

    const filteredProducts =
        category === "All"
            ? products
            : products.filter(
                product => product.category === category
            );

    return (
        <>
            <Navbar />

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
                    ].map(item => (

                        <button
                            key={item}
                            className={
                                category === item
                                    ? "active"
                                    : ""
                            }
                            onClick={() => setCategory(item)}
                        >
                            {item}
                        </button>

                    ))}

                </div>


                {/* PRODUCTS */}

                <section className="menu-products">

                    {filteredProducts.map((product, index) => (

                        <div
                            className="menu-card"
                            key={index}
                        >

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

                                <div className="menu-card-bottom">

                                    <strong>
                                        ${product.price}
                                    </strong>

                                    <button>
                                        <i className="bi bi-plus"></i>
                                    </button>

                                </div>

                            </div>

                        </div>

                    ))}

                </section>

            </div>
        </>
    );
}

export default Menu;