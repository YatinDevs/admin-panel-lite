const Load = require("../models/loadModel");

// Controller function to add new load data
exports.addLoad = async (req, res) => {
  try {
    const newLoad = await Load.create(req.body);
    return res.status(201).json({ success: true, data: newLoad });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to get all load data
exports.getAllLoads = async (req, res) => {
  try {
    const loads = await Load.findAll();
    return res.status(200).json({ success: true, data: loads });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to get load by ID
exports.getLoadById = async (req, res) => {
  try {
    const load = await Load.findByPk(req.params.id);
    if (!load) {
      return res.status(404).json({ success: false, error: "Load not found" });
    }
    return res.status(200).json({ success: true, data: load });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to update load by ID
exports.updateLoadById = async (req, res) => {
  try {
    const load = await Load.findByPk(req.params.id);
    if (!load) {
      return res.status(404).json({ success: false, error: "Load not found" });
    }
    await load.update(req.body);
    return res.status(200).json({ success: true, data: load });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to delete load by ID
exports.deleteLoadById = async (req, res) => {
  try {
    const load = await Load.findByPk(req.params.id);
    if (!load) {
      return res.status(404).json({ success: false, error: "Load not found" });
    }
    await load.destroy();
    return res
      .status(204)
      .json({ success: true, message: "Load deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
