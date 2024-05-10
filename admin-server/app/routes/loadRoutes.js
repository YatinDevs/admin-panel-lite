const express = require("express");
const router = express.Router();
const loadController = require("../controllers/loadController");

// Create a new load entry
router.post("/loads", loadController.addLoad);

// Get all loads
router.get("/loads", loadController.getAllLoads);

// Get load by ID
router.get("/loads/:id", loadController.getLoadById);

// Update load by ID
router.put("/loads/:id", loadController.updateLoadById);

// Delete load by ID
router.delete("/loads/:id", loadController.deleteLoadById);

module.exports = router;
