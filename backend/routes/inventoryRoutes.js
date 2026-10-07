const express = require("express");

const {
    getInventory,
    updateInventory,
    restockIngredient,
    getTransactions
} = require("../controllers/inventoryController");

const router = express.Router();

router.get("/", getInventory);

router.get("/transactions", getTransactions);

router.put("/:id", updateInventory);

router.post("/:id/restock", restockIngredient);

module.exports = router;