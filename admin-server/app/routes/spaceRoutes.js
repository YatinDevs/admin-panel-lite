const express = require("express");
const router = express.Router();
const spaceController = require("../controllers/spaceController");

// Create a new space entry
router.post("/spaces", spaceController.addSpace);

// Get all spaces
router.get("/spaces", spaceController.getAllSpaces);

// Get space by ID
router.get("/spaces/:id", spaceController.getSpaceById);

// Update space by ID
router.put("/spaces/:id", spaceController.updateSpaceById);

// Delete space by ID
router.delete("/spaces/:id", spaceController.deleteSpaceById);

module.exports = router;
