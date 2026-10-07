const express = require("express");

const {
    getInventory,
    restockIngredient,
    updateIngredient,
    getTransactions
} = require("../controllers/inventoryController");


const router = express.Router();


// GET /api/inventory
router.get("/", getInventory);


// GET /api/inventory/transactions
router.get("/transactions", getTransactions);


// POST /api/inventory/:id/restock
router.post("/:id/restock", restockIngredient);


// PUT /api/inventory/:id
router.put("/:id", updateIngredient);


module.exports = router;