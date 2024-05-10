const express = require("express");
const router = express.Router();

router.get("/dev", (req, res) => {
  return res.status(200).json("Lite-Admin Panel Application");
});

module.exports = router;
