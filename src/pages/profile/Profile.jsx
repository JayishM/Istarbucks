import "./Profile.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Profile() {

    const navigate = useNavigate();

    const { token, logout } = useAuth();

    const [user, setUser] = useState(null);

    const [editing, setEditing] = useState(false);

    const [loading, setLoading] = useState(true);

    const [message, setMessage] = useState("");


    // Get logged-in user from backend
    useEffect(() => {

        const fetchUser = async () => {

            try {

                const response = await fetch(
                    "http://localhost:3000/api/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await response.json();

                if (!response.ok) {

                    if (response.status === 401) {
                        logout();
                        navigate("/login");
                        return;
                    }

                    throw new Error(data.message);
                }

                setUser(data.user);

            } catch (error) {

                console.error(error);
                setMessage("Unable to load profile");

            } finally {

                setLoading(false);

            }
        };


        if (token) {
            fetchUser();
        } else {
            navigate("/login");
        }

    }, [token, logout, navigate]);


    // Still using localStorage orders for now
    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const totalOrders = orders.length;

    const totalSpent = orders.reduce(
        (total, order) =>
            total + Number(order.total || 0),
        0
    );


    const handleSave = () => {

        // We will connect this to MySQL later
        setEditing(false);

        setMessage("Profile editing will be connected to the database soon.");

        setTimeout(() => {
            setMessage("");
        }, 2500);

    };


    const handleLogout = () => {

        logout();

        navigate("/");

    };


    if (loading) {

        return (
            <div className="profile-page">

                <section className="profile-content">

                    <div className="profile-card">

                        <h2>Loading profile...</h2>

                    </div>

                </section>

            </div>
        );

    }


    if (!user) {
        return null;
    }


    return (

        <div className="profile-page">


            {/* HERO */}

            <section className="profile-hero">

                <span>MY ACCOUNT</span>

                <h1>
                    Welcome <strong>Back!</strong>
                </h1>

                <p>
                    Manage your profile, orders and account details.
                </p>

            </section>



            {/* PROFILE CONTENT */}

            <section className="profile-content">


                {/* PROFILE CARD */}

                <div className="profile-card">


                    <div className="profile-top">


                        <div className="profile-avatar">

                            <i className="bi bi-person-fill"></i>

                        </div>


                        <div className="profile-heading">

                            <h2>
                                {user.name}
                            </h2>

                            <p>
                                Coffee Lover
                            </p>

                        </div>


                        <button
                            className="edit-profile-btn"
                            onClick={() =>
                                setEditing(!editing)
                            }
                        >

                            <i className="bi bi-pencil"></i>

                            {editing
                                ? "Cancel"
                                : "Edit Profile"
                            }

                        </button>

                    </div>



                    {/* PROFILE DETAILS */}

                    <div className="profile-details">


                        {/* NAME */}

                        <div className="profile-field">

                            <span>

                                <i className="bi bi-person"></i>

                                Full Name

                            </span>


                            {editing ? (

                                <input
                                    type="text"
                                    value={user.name}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            name: e.target.value
                                        })
                                    }
                                />

                            ) : (

                                <strong>
                                    {user.name}
                                </strong>

                            )}

                        </div>



                        {/* EMAIL */}

                        <div className="profile-field">

                            <span>

                                <i className="bi bi-envelope"></i>

                                Email

                            </span>


                            <strong>
                                {user.email}
                            </strong>

                        </div>



                        {/* ACCOUNT CREATED */}

                        <div className="profile-field">

                            <span>

                                <i className="bi bi-calendar"></i>

                                Member Since

                            </span>


                            <strong>

                                {user.created_at
                                    ? new Date(
                                        user.created_at
                                    ).toLocaleDateString()
                                    : "Recently"
                                }

                            </strong>

                        </div>


                    </div>



                    {editing && (

                        <button
                            className="save-profile-btn"
                            onClick={handleSave}
                        >
                            Save Changes
                        </button>

                    )}


                    {message && (

                        <p className="profile-message">
                            {message}
                        </p>

                    )}


                </div>



                {/* STATISTICS */}

                <div className="profile-stats">


                    {/* ORDERS */}

                    <div
                        className="profile-stat clickable-stat"
                        onClick={() =>
                            navigate("/orders")
                        }
                    >

                        <div className="stat-icon">

                            <i className="bi bi-bag-check"></i>

                        </div>


                        <div>

                            <strong>
                                {totalOrders}
                            </strong>

                            <span>
                                Total Orders
                            </span>

                        </div>


                        <i className="bi bi-arrow-right stat-arrow"></i>

                    </div>



                    {/* CUPS */}

                    <div className="profile-stat">

                        <div className="stat-icon">

                            <i className="bi bi-cup-hot"></i>

                        </div>


                        <div>

                            <strong>
                                {totalOrders * 2}
                            </strong>

                            <span>
                                Cups Enjoyed
                            </span>

                        </div>

                    </div>



                    {/* SPENDING */}

                    <div className="profile-stat">

                        <div className="stat-icon">

                            <i className="bi bi-currency-dollar"></i>

                        </div>


                        <div>

                            <strong>
                                ${totalSpent.toFixed(2)}
                            </strong>

                            <span>
                                Total Spent
                            </span>

                        </div>

                    </div>


                </div>



                {/* ACCOUNT OPTIONS */}

                <div className="account-section">


                    <div className="section-heading">

                        <div>

                            <span>
                                ACCOUNT
                            </span>

                            <h2>
                                Manage Your <strong>Account</strong>
                            </h2>

                        </div>

                    </div>



                    <div className="account-options">


                        {/* ORDERS */}

                        <button
                            onClick={() =>
                                navigate("/orders")
                            }
                        >

                            <div className="account-option-icon">

                                <i className="bi bi-receipt"></i>

                            </div>


                            <div>

                                <strong>
                                    Order History
                                </strong>

                                <span>
                                    View your previous orders
                                </span>

                            </div>


                            <i className="bi bi-chevron-right"></i>

                        </button>



                        {/* FAVORITES */}

                        <button>

                            <div className="account-option-icon">

                                <i className="bi bi-heart"></i>

                            </div>


                            <div>

                                <strong>
                                    Favorites
                                </strong>

                                <span>
                                    Your favorite coffee and drinks
                                </span>

                            </div>


                            <i className="bi bi-chevron-right"></i>

                        </button>



                        {/* ADDRESSES */}

                        <button>

                            <div className="account-option-icon">

                                <i className="bi bi-geo-alt"></i>

                            </div>


                            <div>

                                <strong>
                                    Saved Addresses
                                </strong>

                                <span>
                                    Manage your delivery addresses
                                </span>

                            </div>


                            <i className="bi bi-chevron-right"></i>

                        </button>


                    </div>

                </div>



                {/* LOGOUT */}

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <i className="bi bi-box-arrow-right"></i>

                    Logout

                </button>


            </section>

        </div>

    );
}

export default Profile;