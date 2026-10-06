import "./trending.css";
import { useCart } from "../../context/CartContext";

import cappuccino from "../../assets/capuchino.png";
import float from "../../assets/float.png";
import espresso from "../../assets/espresso.png";

function DrinkCard({ image, rating, name, description, price }) {
    const { addToCart } = useCart();

    const product = {
        name,
        category: "Hot Coffee",
        price,
        rating,
        image,
        description
    };

    return (
        <div className="drink-card">

            <div className="drink-image">

                <img src={image} alt={name} />

                <span className="rating">
                    {rating}
                    <i className="bi bi-star-fill"></i>
                </span>

            </div>

            <div className="drink-info">

                <h5>{name}</h5>

                <p>{description}</p>

                <div className="drink-bottom">

                    <strong>${price}</strong>

                    <i
                        className="bi bi-plus-circle-fill add-icon"
                        onClick={() => addToCart(product)}
                    ></i>

                </div>

            </div>

        </div>
    );
}


function Trending() {
    return (
        <div className="trending">

            <DrinkCard
                image={cappuccino}
                rating="4.9"
                name="Cappuccino"
                description="Rich espresso, steamed milk and smooth foam."
                price="4.50"
            />

            <DrinkCard
                image={float}
                rating="5.0"
                name="Latte"
                description="Smooth espresso with creamy steamed milk."
                price="4.90"
            />

            <DrinkCard
                image={espresso}
                rating="4.7"
                name="Espresso"
                description="Strong coffee with a rich, bold flavour."
                price="3.50"
            />

        </div>
    );
}

export default Trending;