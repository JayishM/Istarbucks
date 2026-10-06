const pool = require("../config/db");

// ==========================================
// GET ALL INVENTORY
// ==========================================

const getInventory = async (req, res) => {
    try {

        const [ingredients] = await pool.execute(
            `
            SELECT
                id,
                name,
                unit,
                quantity,
                low_stock_threshold
            FROM ingredients
            ORDER BY id ASC
            `
        );

        res.json({
            ingredients
        });

    } catch (error) {

        console.error(
            "Get inventory error:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch inventory"
        });
    }
};


// ==========================================
// UPDATE INVENTORY
// ==========================================

const updateInventory = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            quantity,
            low_stock_threshold
        } = req.body;


        if (
            quantity === undefined ||
            low_stock_threshold === undefined
        ) {
            return res.status(400).json({
                message:
                    "Quantity and low stock threshold are required"
            });
        }


        const [result] = await pool.execute(
            `
            UPDATE ingredients
            SET
                quantity = ?,
                low_stock_threshold = ?
            WHERE id = ?
            `,
            [
                quantity,
                low_stock_threshold,
                id
            ]
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Ingredient not found"
            });
        }


        res.json({
            message:
                "Inventory updated successfully"
        });

    } catch (error) {

        console.error(
            "Update inventory error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to update inventory"
        });
    }
};


// ==========================================
// RESTOCK INGREDIENT
// ==========================================

const restockIngredient = async (req, res) => {

    try {

        const { id } = req.params;

        const { quantity } = req.body;


        if (
            quantity === undefined ||
            Number(quantity) <= 0
        ) {

            return res.status(400).json({
                message:
                    "Restock quantity must be greater than 0"
            });
        }


        const [result] = await pool.execute(
            `
            UPDATE ingredients
            SET quantity = quantity + ?
            WHERE id = ?
            `,
            [
                quantity,
                id
            ]
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Ingredient not found"
            });
        }


        res.json({
            message:
                "Ingredient restocked successfully"
        });

    } catch (error) {

        console.error(
            "Restock error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to restock ingredient"
        });
    }
};


module.exports = {
    getInventory,
    updateInventory,
    restockIngredient
};