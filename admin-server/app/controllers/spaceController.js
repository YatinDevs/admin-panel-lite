const Space = require("../models/spaceModel");

// Controller function to add new space data
exports.addSpace = async (req, res) => {
  try {
    const newSpace = await Space.create(req.body);
    return res.status(201).json({ success: true, data: newSpace });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to get all space data
exports.getAllSpaces = async (req, res) => {
  try {
    const spaces = await Space.findAll();
    return res.status(200).json({ success: true, data: spaces });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to get space by ID
exports.getSpaceById = async (req, res) => {
  try {
    const space = await Space.findByPk(req.params.id);
    if (!space) {
      return res.status(404).json({ success: false, error: "Space not found" });
    }
    return res.status(200).json({ success: true, data: space });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to update space by ID
exports.updateSpaceById = async (req, res) => {
  try {
    const space = await Space.findByPk(req.params.id);
    if (!space) {
      return res.status(404).json({ success: false, error: "Space not found" });
    }
    await space.update(req.body);
    return res.status(200).json({ success: true, data: space });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to delete space by ID
exports.deleteSpaceById = async (req, res) => {
  try {
    const space = await Space.findByPk(req.params.id);
    if (!space) {
      return res.status(404).json({ success: false, error: "Space not found" });
    }
    await space.destroy();
    return res
      .status(204)
      .json({ success: true, message: "Space deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
