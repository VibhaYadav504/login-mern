
import express from "express";
import User from "../models/User.js";

const router = express.Router();

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN HIT", req.body);

  const user = await User.findOne({ email});
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: "Invalid password" });
  }

  res.json({
    token: "dummy-token",
    user: user
  });
});

export default router;
