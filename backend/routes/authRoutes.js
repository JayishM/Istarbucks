const express = require("express");

const {
    register,
    login
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const pool = require("../config/db");

const router = express.Router();


// REGISTER
router.post("/register", register);


// LOGIN
router.post("/login", login);


// GET CURRENT LOGGED-IN USER
router.get("/me", authMiddleware, async (req, res) => {

    try {

        const [users] = await pool.execute(
            `SELECT id, name, email, created_at
             FROM users
             WHERE id = ?`,
            [req.user.id]
        );

        if (users.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json({
            user: users[0]
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

});


module.exports = router;