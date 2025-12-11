// backend/routes/employeeRoutes.js
import express from "express";
import Employee from "../models/employee.js";

const router = express.Router();

// Add new employee
router.post("/add", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json({ success: true, message: "Employee added", data: newEmployee });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
