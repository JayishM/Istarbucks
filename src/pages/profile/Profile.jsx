import "./Profile.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "Jayish Mundra",
        email: "jayish@example.com",
        phone: "+91 98765 43210"
    });

    const [editing, setEditing] = useState(false);

    const orders =
        JSON.parse(localStorage.getItem("orders")) || [];

    const totalOrders = orders.length;

    const totalSpent = orders.reduce(
        (total, order) => total + Number(order.total || 0),
        0
    );

    const handleSave = () => {
        setEditing(false);
    };

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

                            <h2>{user.name}</h2>

                            <p>
                                Coffee Lover
                            </p>

                        </div>

                        <button
                            className="edit-profile-btn"
                            onClick={() => setEditing(!editing)}
                        >
                            <i className="bi bi-pencil"></i>
                            {editing ? "Cancel" : "Edit Profile"}
                        </button>

                    </div>


                    {/* PROFILE DETAILS */}

                    <div className="profile-details">

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
                                <strong>{user.name}</strong>
                            )}

                        </div>


                        <div className="profile-field">

                            <span>
                                <i className="bi bi-envelope"></i>
                                Email
                            </span>

                            {editing ? (
                                <input
                                    type="email"
                                    value={user.email}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            email: e.target.value
                                        })
                                    }
                                />
                            ) : (
                                <strong>{user.email}</strong>
                            )}

                        </div>


                        <div className="profile-field">

                            <span>
                                <i className="bi bi-telephone"></i>
                                Phone
                            </span>

                            {editing ? (
                                <input
                                    type="text"
                                    value={user.phone}
                                    onChange={(e) =>
                                        setUser({
                                            ...user,
                                            phone: e.target.value
                                        })
                                    }
                                />
                            ) : (
                                <strong>{user.phone}</strong>
                            )}

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

                </div>


                {/* STATISTICS */}

                <div className="profile-stats">

                    <div
                        className="profile-stat clickable-stat"
                        onClick={() => navigate("/orders")}
                    >

                        <div className="stat-icon">
                            <i className="bi bi-bag-check"></i>
                        </div>

                        <div>
                            <strong>{totalOrders}</strong>
                            <span>Total Orders</span>
                        </div>

                        <i className="bi bi-arrow-right stat-arrow"></i>

                    </div>


                    <div className="profile-stat">

                        <div className="stat-icon">
                            <i className="bi bi-cup-hot"></i>
                        </div>

                        <div>
                            <strong>{totalOrders * 2}</strong>
                            <span>Cups Enjoyed</span>
                        </div>

                    </div>


                    <div className="profile-stat">

                        <div className="stat-icon">
                            <i className="bi bi-currency-dollar"></i>
                        </div>

                        <div>
                            <strong>
                                ${totalSpent.toFixed(2)}
                            </strong>

                            <span>Total Spent</span>
                        </div>

                    </div>

                </div>


                {/* ACCOUNT OPTIONS */}

                <div className="account-section">

                    <div className="section-heading">

                        <div>
                            <span>ACCOUNT</span>

                            <h2>
                                Manage Your <strong>Account</strong>
                            </h2>
                        </div>

                    </div>


                    <div className="account-options">

                        <button
                            onClick={() => navigate("/orders")}
                        >
                            <div className="account-option-icon">
                                <i className="bi bi-receipt"></i>
                            </div>

                            <div>
                                <strong>Order History</strong>
                                <span>
                                    View your previous orders
                                </span>
                            </div>

                            <i className="bi bi-chevron-right"></i>
                        </button>


                        <button>

                            <div className="account-option-icon">
                                <i className="bi bi-heart"></i>
                            </div>

                            <div>
                                <strong>Favorites</strong>
                                <span>
                                    Your favorite coffee and drinks
                                </span>
                            </div>

                            <i className="bi bi-chevron-right"></i>

                        </button>


                        <button>

                            <div className="account-option-icon">
                                <i className="bi bi-geo-alt"></i>
                            </div>

                            <div>
                                <strong>Saved Addresses</strong>
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
                    onClick={() => navigate("/")}
                >
                    <i className="bi bi-box-arrow-right"></i>
                    Back to Home
                </button>

            </section>

        </div>
    );
}

export default Profile;