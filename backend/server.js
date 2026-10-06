require("dotenv").config();

const express = require("express");
const cors = require("cors");
const inventoryRoutes = require("./routes/inventoryRoutes");

const authRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/inventory", inventoryRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Istarbucks backend is running!"
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});