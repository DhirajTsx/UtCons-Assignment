import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import articleRoutes from "./routes/articleRoutes.js";
import logRoutes from "./routes/logRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Base Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the UTCons API!" });
});
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/logs", logRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));