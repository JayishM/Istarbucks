import "./hero.css";
import cappuccino from "../../assets/clear.jpeg";

function Hero() {
    return (
        <section className="hero container-fluid">

            {/* LEFT */}

            <div className="hero-content">

                <p className="premium">
                    <span>✦</span> PREMIUM COFFEE
                </p>

                <h1>
                    Unlock a
                    <br />

                    <span>Superior Taste</span>

                    <br />

                    in Every Sip!
                </h1>

                <p className="hero-description">
                    Coffee is not just a drink, it's an art.
                    <br />
                    We invite you on a unique coffee journey,
                    <br />
                    where every sip is a moment of perfection.
                </p>

                <button className="explore-btn">
                    Explore Our Coffee
                    <i className="bi bi-arrow-right"></i>
                </button>

            </div>


            {/* RIGHT */}

            <div className="hero-image">

                <div className="coffee-glow"></div>

                <img
                    src={cappuccino}
                    alt="Coffee"
                />

                <div className="coffee-badge">
                    <i className="bi bi-cup-hot"></i>
                    <div>
                        <small>100%</small>
                        <span>Premium Beans</span>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default Hero;