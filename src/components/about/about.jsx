import "./about.css";
import coffeePour from "../../assets/coffee-pour.png";

function About() {
    return (
        <section className="about">

            <div className="about-image">
                <img src={coffeePour} alt="Pouring coffee" />
            </div>

            <div className="about-content">

                <span className="about-label">ABOUT US</span>

                <h2>
                    A Passion for
                    <span> Great Coffee</span>
                </h2>

                <p>
                    We believe coffee is more than just a beverage.
                    It's a moment of connection, comfort and inspiration.
                </p>

                <p>
                    From carefully selected beans to expertly crafted
                    drinks, we bring passion and quality into every cup.
                </p>

                <div className="about-stats">

                    <div>
                        <strong>10+</strong>
                        <span>Years Experience</span>
                    </div>

                    <div>
                        <strong>25+</strong>
                        <span>Coffee Varieties</span>
                    </div>

                    <div>
                        <strong>50K+</strong>
                        <span>Happy Customers</span>
                    </div>

                    <div>
                        <strong>4.9</strong>
                        <span>Customer Rating</span>
                    </div>

                </div>

                <button className="about-btn">
                    Learn More About Us
                    <i className="bi bi-arrow-right"></i>
                </button>

            </div>

        </section>
    );
}

export default About;