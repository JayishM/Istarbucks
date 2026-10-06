const pool = require("../config/db");

const createOrder = async (req, res) => {
    const connection = await pool.getConnection();

    try {
        const {
            items,
            subtotal,
            delivery,
            tax,
            total,
            paymentMethod
        } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        await connection.beginTransaction();

        // Create order
        const [orderResult] = await connection.execute(
            `INSERT INTO orders
            (user_id, total, status)
            VALUES (?, ?, ?)`,
            [
                req.user.id,
                total,
                "Preparing"
            ]
        );

        const orderId = orderResult.insertId;

        // Add each cart item
        for (const item of items) {

            await connection.execute(
                `INSERT INTO order_items
                (
                    order_id,
                    product_id,
                    quantity,
                    price,
                    size,
                    temperature,
                    sugar,
                    milk,
                    extra_shot,
                    oat_milk,
                    caramel
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    orderId,
                    item.product_id || null,
                    item.quantity,
                    item.price,
                    item.size || null,
                    item.temperature || null,
                    item.sugar || null,
                    item.milk || null,
                    item.extras?.extraShot ? 1 : 0,
                    item.extras?.oatMilk ? 1 : 0,
                    item.extras?.caramel ? 1 : 0
                ]
            );
        }

        await connection.commit();

        res.status(201).json({
            message: "Order placed successfully",
            orderId
        });

    } catch (error) {

        await connection.rollback();

        console.error("Create order error:", error);

        res.status(500).json({
            message: "Failed to create order"
        });

    } finally {
        connection.release();
    }
};


const getOrders = async (req, res) => {

    try {

        const [orders] = await pool.execute(
            `SELECT
                id,
                total,
                status,
                created_at
             FROM orders
             WHERE user_id = ?
             ORDER BY created_at DESC`,
            [req.user.id]
        );

        for (const order of orders) {

            const [items] = await pool.execute(
                `SELECT
                    oi.id,
                    oi.quantity,
                    oi.price,
                    oi.size,
                    oi.temperature,
                    oi.sugar,
                    oi.milk,
                    oi.extra_shot,
                    oi.oat_milk,
                    oi.caramel,

                    p.name,
                    p.category,
                    p.image

                 FROM order_items oi

                 LEFT JOIN products p
                 ON oi.product_id = p.id

                 WHERE oi.order_id = ?`,
                [order.id]
            );

            order.items = items;
        }

        res.json({
            orders
        });

    } catch (error) {

        console.error("Get orders error:", error);

        res.status(500).json({
            message: "Failed to fetch orders"
        });
    }
};


module.exports = {
    createOrder,
    getOrders
};