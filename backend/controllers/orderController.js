const pool = require("../config/db");


// ==========================================
// INVENTORY CALCULATION
// ==========================================

const calculateRequiredIngredients = async (connection, items) => {

    const required = new Map();

    // Size multiplier
    const sizeMultiplier = {
        Small: 0.8,
        Medium: 1,
        Large: 1.2
    };

    // Sugar quantities
    const sugarQuantity = {
        "No Sugar": 0,
        Low: 2.5,
        Medium: 5,
        High: 7.5
    };

    for (const item of items) {

        const productId = item.product_id || item.id;

        if (!productId) {
            throw new Error(
                `Product ID missing for ${item.name}`
            );
        }

        // ------------------------------------------
        // Get base recipe
        // ------------------------------------------

        const [recipe] = await connection.execute(
            `
            SELECT
                pi.ingredient_id,
                pi.quantity AS recipe_quantity,
                i.name AS ingredient_name,
                i.unit
            FROM product_ingredients pi
            JOIN ingredients i
                ON pi.ingredient_id = i.id
            WHERE pi.product_id = ?
            `,
            [productId]
        );

        if (recipe.length === 0) {
            throw new Error(
                `No recipe found for ${item.name}`
            );
        }

        const multiplier =
            sizeMultiplier[item.size] || 1;

        const itemQuantity =
            Number(item.quantity) || 1;


        // ------------------------------------------
        // Add BASE ingredients
        // ------------------------------------------

        for (const ingredient of recipe) {

            let quantity =
                Number(ingredient.recipe_quantity) *
                multiplier *
                itemQuantity;

            let ingredientId =
                ingredient.ingredient_id;

            let ingredientName =
                ingredient.ingredient_name;


            // --------------------------------------
            // MILK CUSTOMIZATION
            // --------------------------------------

            if (
                ingredientName === "Milk" &&
                item.milk &&
                item.milk !== "Regular"
            ) {

                const milkMap = {
                    Oat: "Oat Milk",
                    Almond: "Almond Milk",
                    Soy: "Soy Milk"
                };

                const selectedMilk =
                    milkMap[item.milk];

                if (selectedMilk) {

                    const [milkRows] =
                        await connection.execute(
                            `
                            SELECT id, name, unit
                            FROM ingredients
                            WHERE name = ?
                            `,
                            [selectedMilk]
                        );

                    if (milkRows.length === 0) {
                        throw new Error(
                            `${selectedMilk} ingredient not found`
                        );
                    }

                    ingredientId =
                        milkRows[0].id;

                    ingredientName =
                        milkRows[0].name;
                }
            }


            // --------------------------------------
            // SUGAR CUSTOMIZATION
            // --------------------------------------

            if (ingredientName === "Sugar") {

                quantity =
                    (sugarQuantity[item.sugar] ?? 5) *
                    itemQuantity;
            }


            // --------------------------------------
            // ADD TO REQUIRED MAP
            // --------------------------------------

            if (required.has(ingredientId)) {

                required.get(ingredientId).quantity +=
                    quantity;

            } else {

                required.set(ingredientId, {
                    ingredientId,
                    name: ingredientName,
                    unit: ingredient.unit,
                    quantity
                });
            }
        }


        // ------------------------------------------
        // EXTRA SHOT
        // ------------------------------------------

        if (item.extras?.extraShot) {

            const [coffeeRows] =
                await connection.execute(
                    `
                    SELECT id, name, unit
                    FROM ingredients
                    WHERE name = 'Coffee Beans'
                    `
                );

            if (coffeeRows.length === 0) {
                throw new Error(
                    "Coffee Beans ingredient not found"
                );
            }

            const coffeeId =
                coffeeRows[0].id;

            const extraCoffee =
                9 * itemQuantity;

            if (required.has(coffeeId)) {

                required.get(coffeeId).quantity +=
                    extraCoffee;

            } else {

                required.set(coffeeId, {
                    ingredientId: coffeeId,
                    name: "Coffee Beans",
                    unit: coffeeRows[0].unit,
                    quantity: extraCoffee
                });
            }
        }


        // ------------------------------------------
        // EXTRA OAT MILK
        // ------------------------------------------

        if (item.extras?.oatMilk) {

            const [oatRows] =
                await connection.execute(
                    `
                    SELECT id, name, unit
                    FROM ingredients
                    WHERE name = 'Oat Milk'
                    `
                );

            if (oatRows.length === 0) {
                throw new Error(
                    "Oat Milk ingredient not found"
                );
            }

            const oatId =
                oatRows[0].id;

            const extraOatMilk =
                50 * itemQuantity;

            if (required.has(oatId)) {

                required.get(oatId).quantity +=
                    extraOatMilk;

            } else {

                required.set(oatId, {
                    ingredientId: oatId,
                    name: "Oat Milk",
                    unit: oatRows[0].unit,
                    quantity: extraOatMilk
                });
            }
        }


        // ------------------------------------------
        // CARAMEL
        // ------------------------------------------

        if (item.extras?.caramel) {

            const [caramelRows] =
                await connection.execute(
                    `
                    SELECT id, name, unit
                    FROM ingredients
                    WHERE name = 'Caramel Syrup'
                    `
                );

            if (caramelRows.length === 0) {
                throw new Error(
                    "Caramel Syrup ingredient not found"
                );
            }

            const caramelId =
                caramelRows[0].id;

            const caramelQuantity =
                15 * itemQuantity;

            if (required.has(caramelId)) {

                required.get(caramelId).quantity +=
                    caramelQuantity;

            } else {

                required.set(caramelId, {
                    ingredientId: caramelId,
                    name: "Caramel Syrup",
                    unit: caramelRows[0].unit,
                    quantity: caramelQuantity
                });
            }
        }
    }

    return Array.from(required.values());
};


// ==========================================
// CREATE ORDER
// ==========================================

const createOrder = async (req, res) => {

    const connection =
        await pool.getConnection();

    try {

        const {
            items,
            total
        } = req.body;


        // ------------------------------------------
        // CART VALIDATION
        // ------------------------------------------

        if (!items || items.length === 0) {

            return res.status(400).json({
                message: "Cart is empty"
            });
        }


        await connection.beginTransaction();


        // ------------------------------------------
        // CALCULATE ALL INGREDIENTS
        // ------------------------------------------

        const requiredIngredients =
            await calculateRequiredIngredients(
                connection,
                items
            );


        // ------------------------------------------
        // CHECK STOCK
        // ------------------------------------------

        for (const ingredient of requiredIngredients) {

            const [rows] =
                await connection.execute(
                    `
                    SELECT
                        id,
                        name,
                        unit,
                        quantity
                    FROM ingredients
                    WHERE id = ?
                    FOR UPDATE
                    `,
                    [ingredient.ingredientId]
                );

            if (rows.length === 0) {

                throw new Error(
                    `${ingredient.name} not found`
                );
            }

            const available =
                Number(rows[0].quantity);

            const required =
                Number(ingredient.quantity);


            if (available < required) {

                await connection.rollback();

                return res.status(400).json({

                    message:
                        "Insufficient ingredients",

                    ingredient:
                        ingredient.name,

                    required:
                        Number(required.toFixed(2)),

                    available:
                        Number(available.toFixed(2)),

                    unit:
                        ingredient.unit
                });
            }
        }


        // ------------------------------------------
        // CREATE ORDER
        // ------------------------------------------

        const [orderResult] =
            await connection.execute(
                `
                INSERT INTO orders
                (
                    user_id,
                    total,
                    status
                )
                VALUES (?, ?, ?)
                `,
                [
                    req.user.id,
                    total,
                    "Preparing"
                ]
            );


        const orderId =
            orderResult.insertId;


        // ------------------------------------------
        // INSERT ORDER ITEMS
        // ------------------------------------------

        for (const item of items) {

            const productId =
                item.product_id || item.id;

            await connection.execute(
                `
                INSERT INTO order_items
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
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                `,
                [
                    orderId,

                    productId,

                    item.quantity,

                    item.price,

                    item.size || null,

                    item.temperature || null,

                    item.sugar || null,

                    item.milk || null,

                    item.extras?.extraShot
                        ? 1
                        : 0,

                    item.extras?.oatMilk
                        ? 1
                        : 0,

                    item.extras?.caramel
                        ? 1
                        : 0
                ]
            );
        }


        // ------------------------------------------
        // DEDUCT INGREDIENTS
        // ------------------------------------------

        for (const ingredient of requiredIngredients) {

            const [result] =
                await connection.execute(
                    `
                    UPDATE ingredients
                    SET quantity = quantity - ?
                    WHERE id = ?
                    AND quantity >= ?
                    `,
                    [
                        ingredient.quantity,

                        ingredient.ingredientId,

                        ingredient.quantity
                    ]
                );


            if (result.affectedRows !== 1) {

                throw new Error(
                    `Inventory changed while placing order for ${ingredient.name}`
                );
            }
        }


        // ------------------------------------------
        // COMMIT
        // ------------------------------------------

        await connection.commit();


        res.status(201).json({

            message:
                "Order placed successfully",

            orderId
        });


    } catch (error) {

        await connection.rollback();

        console.error(
            "Create order error:",
            error
        );


        res.status(500).json({

            message:
                error.message ||
                "Failed to create order"
        });


    } finally {

        connection.release();
    }
};


// ==========================================
// GET USER ORDERS
// ==========================================

const getOrders = async (req, res) => {

    try {

        const [orders] =
            await pool.execute(
                `
                SELECT
                    id,
                    total,
                    status,
                    created_at
                FROM orders
                WHERE user_id = ?
                ORDER BY created_at DESC
                `,
                [req.user.id]
            );


        for (const order of orders) {

            const [items] =
                await pool.execute(
                    `
                    SELECT
                        oi.id,
                        oi.product_id,
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
                    WHERE oi.order_id = ?
                    `,
                    [order.id]
                );


            order.items = items;
        }


        res.json({
            orders
        });


    } catch (error) {

        console.error(
            "Get orders error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to fetch orders"
        });
    }
};


module.exports = {
    createOrder,
    getOrders
};