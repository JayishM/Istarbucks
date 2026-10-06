const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("../config/db");


// =========================
// REGISTER
// =========================

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        // Check input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }


        // Check if user already exists
        const [existingUsers] = await pool.execute(
            "SELECT id FROM users WHERE email = ?",
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }


        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );


        // Insert user
        const [result] = await pool.execute(
            `INSERT INTO users
            (name, email, password)
            VALUES (?, ?, ?)`,
            [
                name,
                email,
                hashedPassword
            ]
        );


        res.status(201).json({
            message: "Registration successful",
            user: {
                id: result.insertId,
                name,
                email
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// =========================
// LOGIN
// =========================

const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }


        // Find user
        const [users] = await pool.execute(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );


        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        const user = users[0];


        // Check password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }


        // Create JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d"
            }
        );


        res.json({
            message: "Login successful",

            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    register,
    login
};