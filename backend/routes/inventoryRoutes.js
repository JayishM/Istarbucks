const express = require("express");

const {
    getInventory,
    updateInventory,
    restockIngredient
} = require("../controllers/inventoryController");

const router = express.Router();


// GET /api/inventory
router.get("/", getInventory);


// PUT /api/inventory/:id
router.put("/:id", updateInventory);


// POST /api/inventory/:id/restock
router.post("/:id/restock", restockIngredient);


module.exports = router;