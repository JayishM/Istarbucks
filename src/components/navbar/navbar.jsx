import "./navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Search from "../search/Search";

function Navbar() {
    const [searchOpen, setSearchOpen] = useState(false);

    const navigate = useNavigate();
    const { cartCount } = useCart();

    return (
        <>
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

                    <div
                        className="profile-icon"
                        onClick={() => navigate("/profile")}
                    >
                        <i className="bi bi-person-circle"></i>
                    </div>

                    <div
                        className="search-icon"
                        onClick={() => setSearchOpen(true)}
                    >
                        <i className="bi bi-search"></i>
                    </div>

                    <div
                        className="cart-icon"
                        onClick={() => navigate("/cart")}
                    >
                        <i className="bi bi-cart"></i>

                        {cartCount > 0 && (
                            <span className="cart-count">
                                {cartCount}
                            </span>
                        )}
                    </div>

                    <button>
                        Order Now
                    </button>

                </div>

            </nav>

            {searchOpen && (
                <Search
                    onClose={() => setSearchOpen(false)}
                />
            )}
        </>
    );
}

export default Navbar;