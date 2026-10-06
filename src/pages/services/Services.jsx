import "./Services.css";
import Navbar from "../../components/navbar/navbar.jsx";
import Footer from "../../components/footer/footer.jsx";
function Services() {

    const services = [
        {
            icon: "bi-cup-hot",
            title: "Fresh Coffee",
            text: "Enjoy freshly brewed coffee made from carefully selected premium beans."
        },
        {
            icon: "bi-bag",
            title: "Takeaway",
            text: "Order your favourite coffee and have it freshly prepared for you to take away."
        },
        {
            icon: "bi-truck",
            title: "Coffee Delivery",
            text: "Get your favourite drinks and treats delivered straight to your doorstep."
        },
        {
            icon: "bi-calendar-event",
            title: "Private Events",
            text: "Make your special occasions memorable with our coffee and catering service."
        },
        {
            icon: "bi-people",
            title: "Corporate Catering",
            text: "Premium coffee and refreshments for meetings, offices and corporate events."
        },
        {
            icon: "bi-gift",
            title: "Gift Packages",
            text: "Surprise someone special with beautifully curated coffee gift packages."
        }
    ];

    return (
        <>
            <Navbar />

            <div className="services-page">

                {/* HERO */}

                <section className="services-hero">

                    <span>WHAT WE OFFER</span>

                    <h1>
                        More Than
                        <strong> Just Coffee</strong>
                    </h1>

                    <p>
                        From your morning coffee to special occasions,
                        we are here to make every moment a little better.
                    </p>

                </section>


                {/* SERVICES */}

                <section className="services-grid">

                    {services.map((service, index) => (

                        <div
                            className="service-card"
                            key={index}
                        >

                            <div className="service-icon">
                                <i className={`bi ${service.icon}`}></i>
                            </div>

                            <span className="service-number">
                                0{index + 1}
                            </span>

                            <h3>
                                {service.title}
                            </h3>

                            <p>
                                {service.text}
                            </p>

                            <button className="service-link">
                                Learn More
                                <i className="bi bi-arrow-right"></i>
                            </button>

                        </div>

                    ))}

                </section>


                {/* FEATURE */}

                <section className="services-feature">

                    <div className="feature-content">

                        <span>
                            COFFEE CATERING
                        </span>

                        <h2>
                            Bring the
                            <strong> coffee experience</strong>
                            to your event.
                        </h2>

                        <p>
                            Planning a meeting, celebration or special
                            event? Let us take care of the coffee.
                            Our team can create a customised experience
                            with premium coffee, refreshing drinks and
                            delicious treats.
                        </p>

                        <button className="service-button">
                            Book Our Service
                            <i className="bi bi-arrow-right"></i>
                        </button>

                    </div>


                    <div className="feature-coffee">

                        <div className="coffee-circle">

                            <i className="bi bi-cup-hot"></i>

                        </div>

                        <div className="floating-text">
                            Premium
                            <br />
                            Coffee
                        </div>

                    </div>

                </section>


                {/* CTA */}

                <section className="services-cta">

                    <span>READY FOR YOUR NEXT CUP?</span>

                    <h2>
                        Let's make something
                        <strong> delicious.</strong>
                    </h2>

                    <button className="service-button">
                        Explore Our Menu
                        <i className="bi bi-arrow-right"></i>
                    </button>

                </section>

            </div>
            <Footer/>   
        </>
    );
}

export default Services;