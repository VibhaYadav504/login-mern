import express from "express";
import Lead from "../models/Lead.js";

const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    console.log("Lead received:", req.body);

    const newLead = new Lead(req.body);
    await newLead.save(); 

    return res.json({
      success: true,
      message: "Lead saved successfully",
      data: newLead
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
