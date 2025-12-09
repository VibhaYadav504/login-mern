import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import leadRoutes from "./routes/leadRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Backend Running Successfully!");
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
