import "./orderCTA.css";

function OrderCTA() {
    return (
        <section className="order-cta">

            <div className="cta-content">

                <span>YOUR PERFECT CUP AWAITS</span>

                <h2>
                    Ready for Your
                    <strong> Perfect Coffee?</strong>
                </h2>

                <p>
                    Experience the rich aroma, smooth taste and
                    passion that goes into every cup.
                </p>

                <div className="cta-buttons">

                    <button className="cta-primary">
                        Order Now
                        <i className="bi bi-arrow-right"></i>
                    </button>

                    <button className="cta-secondary">
                        View Menu
                    </button>

                </div>

            </div>

        </section>
    );
}

export default OrderCTA;