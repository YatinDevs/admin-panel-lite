const Customer = require("../models/customerModel");

exports.createCustomer = async (req, res) => {
  try {
    const { enquiry_id, customer_type, role, contact, name, user_id } =
      req.body;

    // Check if there is any existing customer with the same enquiry_id
    const existingCustomer = await Customer.findOne({
      where: { enquiry_id },
    });

    if (existingCustomer) {
      // If an existing customer is found, check if its customer_type is different
      if (existingCustomer.customer_type === customer_type) {
        console.log(customer_type, existingCustomer.customer_type);
        return res.status(400).json({
          error:
            "Customer already exists with the same enquiry ID and customer type.",
        });
      } else {
        // Create a new customer with the different customer_type
        const newCustomer = await Customer.create({
          enquiry_id,
          customer_type,
          role,
          contact,
          name,
          user_id,
        });
        return res.status(201).json(newCustomer);
      }
    } else {
      // Create a new customer since no existing customer with the same enquiry_id is found
      const newCustomer = await Customer.create({
        enquiry_id,
        customer_type,
        role,
        contact,
        name,
        user_id,
      });
      return res.status(201).json(newCustomer);
    }
  } catch (error) {
    console.error("Error creating customer:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.createArrayUser = async (req, res) => {
  try {
    const userData = req.body; // Assuming req.body contains an array of user data
    const createdUsers = [];

    for (const user of userData) {
      const { name, contact, user_id } = user;

      const newUser = await Customer.create({
        name,
        contact,
        user_id,
      });
      createdUsers.push(newUser);
    }

    return res.status(201).json({ success: true, data: createdUsers });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to get all customers
exports.getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    return res.status(200).json({ success: true, data: customers });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to get customer by ID
exports.getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    return res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to update customer by ID
exports.updateCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    await customer.update(req.body);
    return res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

// Controller function to delete customer by ID
exports.deleteCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, error: "Customer not found" });
    }
    await customer.destroy();
    return res
      .status(204)
      .json({ success: true, message: "Customer deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
