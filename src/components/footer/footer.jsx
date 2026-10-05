import "./footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-main">

                {/* BRAND */}

                <div className="footer-brand">

                    <h3>
                        I<span>starbucks</span>
                    </h3>

                    <p>
                        Crafting exceptional coffee experiences,
                        one perfect cup at a time.
                    </p>

                    <div className="social-icons">

                        <a>
                            <i className="bi bi-instagram"></i>
                        </a>

                        <a>
                            <i className="bi bi-facebook"></i>
                        </a>

                        <a>
                            <i className="bi bi-twitter-x"></i>
                        </a>

                        <a>
                            <i className="bi bi-youtube"></i>
                        </a>

                    </div>

                </div>


                {/* QUICK LINKS */}

                <div className="footer-column">

                    <h5>Quick Links</h5>

                    <a>Home</a>
                    <a>Menu</a>
                    <a>About Us</a>
                    <a>Services</a>
                    <a>Reviews</a>

                </div>


                {/* SERVICES */}

                <div className="footer-column">

                    <h5>Our Services</h5>

                    <a>Coffee & Drinks</a>
                    <a>Food & Snacks</a>
                    <a>Takeaway</a>
                    <a>Online Ordering</a>
                    <a>Catering</a>

                </div>


                {/* CONTACT */}

                <div className="footer-column contact">

                    <h5>Contact Us</h5>

                    <p>
                        <i className="bi bi-geo-alt"></i>
                        Jaipur, Rajasthan
                    </p>

                    <p>
                        <i className="bi bi-telephone"></i>
                        +91 98765 43210
                    </p>

                    <p>
                        <i className="bi bi-envelope"></i>
                        hello@istarbucks.com
                    </p>

                    <p>
                        <i className="bi bi-clock"></i>
                        Mon - Sun: 8:00 AM - 10:00 PM
                    </p>

                </div>

            </div>


            {/* BOTTOM */}

            <div className="footer-bottom">

                <p>
                    © 2026 Istarbucks. All rights reserved.
                </p>

                <div>
                    <a>Privacy Policy</a>
                    <a>Terms & Conditions</a>
                </div>

            </div>

        </footer>
    );
}

export default Footer;