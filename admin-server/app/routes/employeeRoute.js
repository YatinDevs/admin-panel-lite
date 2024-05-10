const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/employees/signup", employeeController.employeeSignUp);
router.post("/employees/login", employeeController.employeeLogin);
router.get("/employees", verifyToken, employeeController.getAllEmployees);
router.get("/employees/:id", verifyToken, employeeController.getEmployeeById);
router.put("/employees/:id", verifyToken, employeeController.updateEmployee);
router.delete("/employees/:id", verifyToken, employeeController.deleteEmployee);

module.exports = router;
