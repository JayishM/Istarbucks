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
                <a>Services</a>
                <a>Reviews</a>
                <a>Blog</a>
                <a>Contact</a>
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