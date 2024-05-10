const Employee = require("../models/employeeModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtKey = require("../config/authConfig");

exports.employeeSignUp = async (req, res) => {
  try {
    const { name, contact, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmployee = await Employee.create({
      name,
      contact,
      password: hashedPassword,
      role,
    });
    const token = jwt.sign({ employee_id: newEmployee.emp_id }, jwtKey.secret, {
      expiresIn: "8h",
    });
    return res.status(201).json({ success: true, token, data: newEmployee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.employeeLogin = async (req, res) => {
  try {
    const { contact, password } = req.body;
    const employee = await Employee.findOne({ where: { contact } });
    if (employee) {
      const isPasswordMatch = await bcrypt.compare(password, employee.password);
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ success: false, error: "Incorrect password" });
      }
      const token = jwt.sign({ employee_id: employee.emp_id }, jwtKey.secret, {
        expiresIn: "8h",
      });
      return res
        .status(200)
        .json({ success: true, token, employeeDetails: employee });
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();
    return res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
    return res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const { name, contact, password, role } = req.body;
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
    employee.name = name;
    employee.contact = contact;
    employee.password = await bcrypt.hash(password, 10);
    employee.role = role;
    await employee.save();
    return res.status(200).json({ success: true, data: employee });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
    const employee = await Employee.findByPk(employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "Employee not found" });
    }
    await employee.destroy();
    return res.status(204).send();
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
