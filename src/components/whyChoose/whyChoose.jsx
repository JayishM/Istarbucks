import "./whyChoose.css";

function WhyChoose() {
    return (
        <section className="whyChoose">

            <div className="why-title">
                <span>WHY CHOOSE US</span>
                <h2>More Than Just Coffee</h2>
                <p>
                    We create an experience that makes every cup special.
                </p>
            </div>

            <div className="why-cards">

                <div className="why-card">
                    <i className="bi bi-cup-hot"></i>
                    <h5>Premium Quality Beans</h5>
                    <p>
                        Carefully selected coffee beans roasted
                        to deliver rich and exceptional flavour.
                    </p>
                </div>

                <div className="why-card">
                    <i className="bi bi-house-heart"></i>
                    <h5>Cozy Atmosphere</h5>
                    <p>
                        A warm and comfortable place to relax,
                        work and enjoy your coffee.
                    </p>
                </div>

                <div className="why-card">
                    <i className="bi bi-person-heart"></i>
                    <h5>Personalized Experience</h5>
                    <p>
                        Every cup is prepared with attention
                        to your individual preferences.
                    </p>
                </div>

                <div className="why-card">
                    <i className="bi bi-award"></i>
                    <h5>Professional Baristas</h5>
                    <p>
                        Our skilled baristas make sure every
                        drink is crafted perfectly.
                    </p>
                </div>

            </div>

        </section>
    );
}

export default WhyChoose;