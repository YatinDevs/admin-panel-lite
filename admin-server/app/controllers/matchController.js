const Match = require("../models/matchModel");

// Controller function to create a new match
exports.createMatch = async (req, res) => {
  try {
    const newMatch = await Match.create(req.body);
    return res.status(201).json({ success: true, data: newMatch });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.findAll();
    return res.status(200).json({ success: true, data: matches });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to get match by ID
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, error: "Match not found" });
    }
    return res.status(200).json({ success: true, data: match });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to update match by ID
exports.updateMatchById = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, error: "Match not found" });
    }
    await match.update(req.body);
    return res.status(200).json({ success: true, data: match });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to delete match by ID
exports.deleteMatchById = async (req, res) => {
  try {
    const match = await Match.findByPk(req.params.id);
    if (!match) {
      return res.status(404).json({ success: false, error: "Match not found" });
    }
    await match.destroy();
    return res
      .status(204)
      .json({ success: true, message: "Match deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
