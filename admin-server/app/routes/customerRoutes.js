const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customerController");

// Create a new customer
router.post("/customers", customerController.createCustomer);
router.post("/Users", customerController.createArrayUser);

// Get all customers
router.get("/customers", customerController.getAllCustomers);

// Get customer by ID
router.get("/customers/:id", customerController.getCustomerById);

// Update customer by ID
router.put("/customers/:id", customerController.updateCustomerById);

// Delete customer by ID
router.delete("/customers/:id", customerController.deleteCustomerById);

module.exports = router;
