import express from "express";
const router = express.Router();


router.post("/add", async (req, res) => {
  try {
    console.log("Lead received:", req.body);

    return res.json({
      success: true,
      message: "Lead saved successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
