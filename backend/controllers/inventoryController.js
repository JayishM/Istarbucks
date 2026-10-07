const pool = require("../config/db");


// ==========================================
// GET INVENTORY
// ==========================================

const getInventory = async (req, res) => {
    try {

        const [ingredients] = await pool.execute(`
            SELECT
                id,
                name,
                quantity,
                unit,
                low_stock_threshold
            FROM ingredients
            ORDER BY name ASC
        `);

        res.json({
            ingredients
        });

    } catch (error) {

        console.error("Get inventory error:", error);

        res.status(500).json({
            message: "Failed to fetch inventory"
        });
    }
};


// ==========================================
// RESTOCK INGREDIENT
// ==========================================

const restockIngredient = async (req, res) => {

    const ingredientId = Number(req.params.id);
    const amount = Number(req.body.quantity);

    if (!ingredientId) {
        return res.status(400).json({
            message: "Invalid ingredient ID"
        });
    }

    if (!amount || amount <= 0) {
        return res.status(400).json({
            message: "Restock quantity must be greater than 0"
        });
    }

    const connection = await pool.getConnection();

    try {

        await connection.beginTransaction();


        // ------------------------------------------
        // CHECK INGREDIENT
        // ------------------------------------------

        const [ingredients] = await connection.execute(
            `
            SELECT
                id,
                name,
                quantity,
                unit
            FROM ingredients
            WHERE id = ?
            FOR UPDATE
            `,
            [ingredientId]
        );


        if (ingredients.length === 0) {

            await connection.rollback();

            return res.status(404).json({
                message: "Ingredient not found"
            });
        }


        const ingredient = ingredients[0];


        // ------------------------------------------
        // ADD STOCK
        // ------------------------------------------

        await connection.execute(
            `
            UPDATE ingredients
            SET quantity = quantity + ?
            WHERE id = ?
            `,
            [
                amount,
                ingredientId
            ]
        );


        // ------------------------------------------
        // RECORD TRANSACTION
        // ------------------------------------------

        await connection.execute(
            `
            INSERT INTO inventory_transactions
            (
                ingredient_id,
                type,
                quantity,
                reference_id,
                note
            )
            VALUES (?, 'RESTOCK', ?, NULL, ?)
            `,
            [
                ingredientId,
                amount,
                `Restocked ${amount} ${ingredient.unit} of ${ingredient.name}`
            ]
        );


        // ------------------------------------------
        // GET UPDATED STOCK
        // ------------------------------------------

        const [updated] = await connection.execute(
            `
            SELECT
                id,
                name,
                quantity,
                unit,
                low_stock_threshold
            FROM ingredients
            WHERE id = ?
            `,
            [ingredientId]
        );


        await connection.commit();


        res.json({
            message: "Inventory restocked successfully",
            ingredient: updated[0]
        });


    } catch (error) {

        await connection.rollback();

        console.error("Restock error:", error);

        res.status(500).json({
            message: error.message || "Failed to restock inventory"
        });

    } finally {

        connection.release();
    }
};


// ==========================================
// UPDATE INGREDIENT DETAILS
// ==========================================

const updateIngredient = async (req, res) => {

    const ingredientId = Number(req.params.id);

    if (!ingredientId) {
        return res.status(400).json({
            message: "Invalid ingredient ID"
        });
    }


    const {
        name,
        unit,
        low_stock_threshold
    } = req.body;


    if (
        name === undefined &&
        unit === undefined &&
        low_stock_threshold === undefined
    ) {
        return res.status(400).json({
            message: "Nothing to update"
        });
    }


    try {

        const fields = [];
        const values = [];


        if (name !== undefined) {
            fields.push("name = ?");
            values.push(name);
        }


        if (unit !== undefined) {
            fields.push("unit = ?");
            values.push(unit);
        }


        if (low_stock_threshold !== undefined) {

            const threshold = Number(low_stock_threshold);

            if (threshold < 0) {
                return res.status(400).json({
                    message: "Threshold cannot be negative"
                });
            }

            fields.push("low_stock_threshold = ?");
            values.push(threshold);
        }


        values.push(ingredientId);


        const [result] = await pool.execute(
            `
            UPDATE ingredients
            SET ${fields.join(", ")}
            WHERE id = ?
            `,
            values
        );


        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "Ingredient not found"
            });
        }


        const [updated] = await pool.execute(
            `
            SELECT
                id,
                name,
                quantity,
                unit,
                low_stock_threshold
            FROM ingredients
            WHERE id = ?
            `,
            [ingredientId]
        );


        res.json({
            message: "Ingredient updated successfully",
            ingredient: updated[0]
        });


    } catch (error) {

        console.error("Update inventory error:", error);

        res.status(500).json({
            message: "Failed to update ingredient"
        });
    }
};


// ==========================================
// GET INVENTORY TRANSACTIONS
// ==========================================

const getTransactions = async (req, res) => {

    try {

        const [transactions] = await pool.execute(`
            SELECT
                it.id,
                it.ingredient_id,
                i.name AS ingredient_name,
                i.unit,
                it.type,
                it.quantity,
                it.reference_id,
                it.note,
                it.created_at
            FROM inventory_transactions it
            JOIN ingredients i
                ON it.ingredient_id = i.id
            ORDER BY it.created_at DESC
        `);


        res.json({
            transactions
        });


    } catch (error) {

        console.error(
            "Get inventory transactions error:",
            error
        );

        res.status(500).json({
            message: "Failed to fetch inventory history"
        });
    }
};


module.exports = {
    getInventory,
    restockIngredient,
    updateIngredient,
    getTransactions
};