const pool = require("../config/db");

// GET ALL INVENTORY
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

        res.json({ ingredients });

    } catch (error) {
        console.error("Get inventory error:", error);

        res.status(500).json({
            message: "Failed to fetch inventory"
        });
    }
};


// UPDATE INVENTORY
const updateInventory = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const { id } = req.params;
        const { quantity, low_stock_threshold } = req.body;

        if (
            quantity === undefined ||
            low_stock_threshold === undefined
        ) {
            return res.status(400).json({
                message:
                    "Quantity and low stock threshold are required"
            });
        }

        await connection.beginTransaction();

        // Get old quantity
        const [rows] = await connection.execute(
            `
            SELECT quantity
            FROM ingredients
            WHERE id = ?
            FOR UPDATE
            `,
            [id]
        );

        if (rows.length === 0) {
            await connection.rollback();

            return res.status(404).json({
                message: "Ingredient not found"
            });
        }

        const oldQuantity = Number(rows[0].quantity);
        const newQuantity = Number(quantity);

        // Update inventory
        await connection.execute(
            `
            UPDATE ingredients
            SET
                quantity = ?,
                low_stock_threshold = ?
            WHERE id = ?
            `,
            [newQuantity, low_stock_threshold, id]
        );

        // Record adjustment only if quantity changed
        if (oldQuantity !== newQuantity) {

            const difference = newQuantity - oldQuantity;

            await connection.execute(
                `
                INSERT INTO inventory_transactions
                (
                    ingredient_id,
                    type,
                    quantity,
                    note
                )
                VALUES (?, 'ADJUSTMENT', ?, ?)
                `,
                [
                    id,
                    difference,
                    `Manual stock adjustment: ${oldQuantity} → ${newQuantity}`
                ]
            );
        }

        await connection.commit();

        res.json({
            message: "Inventory updated successfully"
        });

    } catch (error) {

        await connection.rollback();

        console.error("Update inventory error:", error);

        res.status(500).json({
            message: "Failed to update inventory"
        });

    } finally {
        connection.release();
    }
};


// RESTOCK INGREDIENT
const restockIngredient = async (req, res) => {

    const connection = await pool.getConnection();

    try {

        const { id } = req.params;
        const { quantity } = req.body;

        const amount = Number(quantity);

        if (!amount || amount <= 0) {
            return res.status(400).json({
                message:
                    "Restock quantity must be greater than 0"
            });
        }

        await connection.beginTransaction();

        // Check ingredient exists
        const [rows] = await connection.execute(
            `
            SELECT id
            FROM ingredients
            WHERE id = ?
            FOR UPDATE
            `,
            [id]
        );

        if (rows.length === 0) {

            await connection.rollback();

            return res.status(404).json({
                message: "Ingredient not found"
            });
        }

        // Add stock
        await connection.execute(
            `
            UPDATE ingredients
            SET quantity = quantity + ?
            WHERE id = ?
            `,
            [amount, id]
        );

        // Record transaction
        await connection.execute(
            `
            INSERT INTO inventory_transactions
            (
                ingredient_id,
                type,
                quantity,
                note
            )
            VALUES (?, 'RESTOCK', ?, ?)
            `,
            [
                id,
                amount,
                `Restocked ${amount} units`
            ]
        );

        await connection.commit();

        res.json({
            message: "Ingredient restocked successfully"
        });

    } catch (error) {

        await connection.rollback();

        console.error("Restock error:", error);

        res.status(500).json({
            message:
                "Failed to restock ingredient"
        });

    } finally {
        connection.release();
    }
};


// GET TRANSACTION HISTORY
const getTransactions = async (req, res) => {

    try {

        const [transactions] = await pool.execute(
            `
            SELECT
                t.id,
                t.ingredient_id,
                i.name AS ingredient_name,
                i.unit,
                t.type,
                t.quantity,
                t.reference_id,
                t.note,
                t.created_at
            FROM inventory_transactions t

            JOIN ingredients i
                ON t.ingredient_id = i.id

            ORDER BY t.created_at DESC, t.id DESC
            `
        );

        res.json({
            transactions
        });

    } catch (error) {

        console.error(
            "Get inventory transactions error:",
            error
        );

        res.status(500).json({
            message:
                "Failed to fetch transaction history"
        });
    }
};


module.exports = {
    getInventory,
    updateInventory,
    restockIngredient,
    getTransactions
};