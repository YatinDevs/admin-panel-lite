const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matchController");

// Create a new match
router.post("/matches", matchController.createMatch);

// Get all matches
router.get("/matches", matchController.getAllMatches);

// Get match by ID
router.get("/matches/:id", matchController.getMatchById);

// Update match by ID
router.put("/matches/:id", matchController.updateMatchById);

// Delete match by ID
router.delete("/matches/:id", matchController.deleteMatchById);

module.exports = router;
