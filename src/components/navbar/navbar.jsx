import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar-custom container-fluid">

            <div className="logo">
                BODR<span>É</span>N
            </div>

            <div className="nav-links">
                <Link to="/" className="active">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/about">About</Link>
                <Link to="/services">Services</Link>
                <Link to="/reviews">Reviews</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
            </div>

            <div className="nav-actions">

                <i className="bi bi-search"></i>

                <i className="bi bi-cart"></i>

                <button>
                    Order Now
                </button>

            </div>

        </nav>
    );
}

export default Navbar;