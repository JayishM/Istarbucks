import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

import cappuccino from "../../assets/capuchino.png";
import float from "../../assets/float.png";
import espresso from "../../assets/espresso.png";

function Search({ onClose }) {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const products = [
        {
            name: "Cappuccino",
            image: cappuccino,
            category: "Hot Coffee",
            price: "4.50"
        },
        {
            name: "Latte",
            image: float,
            category: "Hot Coffee",
            price: "4.90"
        },
        {
            name: "Espresso",
            image: espresso,
            category: "Hot Coffee",
            price: "3.50"
        },
        {
            name: "Mocha",
            image: cappuccino,
            category: "Hot Coffee",
            price: "5.20"
        }
    ];

    const results = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );

    const openProduct = () => {
        onClose();
        navigate("/menu");
    };

    return (
        <div className="search-overlay" onClick={onClose}>
            <div
                className="search-box"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="search-input-wrapper">

                    <i className="bi bi-search"></i>

                    <input
                        type="text"
                        placeholder="Search coffee..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />

                    <button onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>

                </div>

                {query && (
                    <div className="search-results">

                        {results.length > 0 ? (
                            results.map(product => (
                                <div
                                    className="search-result"
                                    key={product.name}
                                    onClick={openProduct}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                    />

                                    <div>
                                        <h4>{product.name}</h4>
                                        <span>{product.category}</span>
                                    </div>

                                    <strong>
                                        ${product.price}
                                    </strong>
                                </div>
                            ))
                        ) : (
                            <div className="no-results">
                                No coffee found
                            </div>
                        )}

                    </div>
                )}

            </div>
        </div>
    );
}

export default Search;