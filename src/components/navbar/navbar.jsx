import "./navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Search from "../search/Search";

function Navbar() {

    const [searchOpen, setSearchOpen] = useState(false);

    const { user, isLoggedIn, logout } = useAuth();
    const { cartCount } = useCart();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <>
            <nav className="navbar-custom container-fluid">

                {/* LOGO */}
                <div className="logo">
                    BODR<span>É</span>N
                </div>


                {/* NAVIGATION */}
                <div className="nav-links">

                    <Link to="/" className="active">
                        Home
                    </Link>

                    <Link to="/menu">
                        Menu
                    </Link>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/services">
                        Services
                    </Link>

                    <Link to="/reviews">
                        Reviews
                    </Link>

                    <Link to="/blog">
                        Blog
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                </div>


                {/* ACTIONS */}
                <div className="nav-actions">


                    {/* PROFILE */}

                    {isLoggedIn ? (

                        <div className="dropdown">

                            <button
                                className="profile-icon"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                title={user?.name || "Profile"}
                            >

                                <i className="bi bi-person-circle"></i>

                            </button>


                            <ul className="dropdown-menu dropdown-menu-end">

                                <li>
                                    <h6 className="dropdown-header">
                                        Hello, {user?.name}
                                    </h6>
                                </li>


                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() =>
                                            navigate("/profile")
                                        }
                                    >
                                        <i className="bi bi-person me-2"></i>
                                        Profile
                                    </button>
                                </li>


                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() =>
                                            navigate("/orders")
                                        }
                                    >
                                        <i className="bi bi-bag me-2"></i>
                                        My Orders
                                    </button>
                                </li>


                                <li>
                                    <hr className="dropdown-divider" />
                                </li>


                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={handleLogout}
                                    >
                                        <i className="bi bi-box-arrow-right me-2"></i>
                                        Logout
                                    </button>
                                </li>

                            </ul>

                        </div>

                    ) : (

                        <button
                            className="login-nav-btn"
                            onClick={() => navigate("/login")}
                            title="Login"
                        >
                            <i className="bi bi-person-circle"></i>
                        </button>

                    )}


                    {/* SEARCH */}

                    <div
                        className="search-icon"
                        onClick={() => setSearchOpen(true)}
                        title="Search"
                    >
                        <i className="bi bi-search"></i>
                    </div>


                    {/* CART */}

                    <div
                        className="cart-icon"
                        onClick={() => navigate("/cart")}
                        title="Cart"
                    >

                        <i className="bi bi-cart"></i>

                        {cartCount > 0 && (
                            <span className="cart-count">
                                {cartCount}
                            </span>
                        )}

                    </div>


                    {/* ORDER NOW */}

                    <button
                        onClick={() => navigate("/menu")}
                    >
                        Order Now
                    </button>

                </div>

            </nav>


            {/* SEARCH OVERLAY */}

            {searchOpen && (
                <Search
                    onClose={() => setSearchOpen(false)}
                />
            )}

        </>
    );
}

export default Navbar;