import "./About.css";
import Navbar from "../../components/navbar/navbar.jsx";

import coffee from "../../assets/capuchino.png";
import Footer from "../../components/footer/footer.jsx";
function About() {

    return (
        <>
            <Navbar />

            <div className="about-page">

                {/* HERO */}

                <section className="about-hero">

                    <span>ABOUT US</span>

                    <h1>
                        More Than Just
                        <strong> Coffee</strong>
                    </h1>

                    <p>
                        We believe every cup of coffee should be
                        an experience worth remembering.
                    </p>

                </section>


                {/* OUR STORY */}

                <section className="about-story">

                    <div className="about-image">

                        <img
                            src={coffee}
                            alt="Coffee"
                        />

                        <div className="image-badge">

                            <i className="bi bi-cup-hot"></i>

                            <div>
                                <strong>100%</strong>
                                <span>Premium Beans</span>
                            </div>

                        </div>

                    </div>


                    <div className="about-content">

                        <span className="about-label">
                            OUR STORY
                        </span>

                        <h2>
                            Crafted with
                            <strong> passion.</strong>
                        </h2>

                        <p>
                            At BODRÉN, coffee is more than just
                            a beverage. It is a moment to slow down,
                            connect and enjoy something special.
                        </p>

                        <p>
                            We carefully select premium coffee beans
                            and combine them with traditional brewing
                            techniques to create a rich and memorable
                            experience in every cup.
                        </p>


                        {/* STATS */}

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

                        </div>


                        <button className="about-button">
                            Discover Our Story
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>

                </section>


                {/* VALUES */}

                <section className="about-values">

                    <div className="values-heading">

                        <span>WHAT WE BELIEVE</span>

                        <h2>
                            Made with care.
                        </h2>

                        <p>
                            Every detail matters when creating
                            the perfect coffee experience.
                        </p>

                    </div>


                    <div className="values-grid">

                        <div className="value-card">

                            <div className="value-icon">
                                <i className="bi bi-cup-hot"></i>
                            </div>

                            <h3>
                                Premium Quality
                            </h3>

                            <p>
                                We use carefully selected beans
                                to deliver rich and consistent
                                flavour.
                            </p>

                        </div>


                        <div className="value-card">

                            <div className="value-icon">
                                <i className="bi bi-heart"></i>
                            </div>

                            <h3>
                                Made with Passion
                            </h3>

                            <p>
                                Every drink is prepared with
                                attention, passion and care.
                            </p>

                        </div>


                        <div className="value-card">

                            <div className="value-icon">
                                <i className="bi bi-people"></i>
                            </div>

                            <h3>
                                Community
                            </h3>

                            <p>
                                We create a warm space where
                                everyone feels welcome.
                            </p>

                        </div>

                    </div>

                </section>

            </div>
            <Footer/>
        </>
    );
}

export default About;