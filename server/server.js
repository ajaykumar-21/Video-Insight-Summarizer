const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const videoRoutes = require("./routes/videoRoutes");

const app = express();

// Define which frontend domains are allowed to make requests to your backend
const allowedOrigins = [
  "http://localhost:3000",
  "https://video-insight-summarizer-silk.vercel.app",
];

// Use CORS middleware to apply the allowed origins
app.use(
  cors({
    origin: allowedOrigins, // only allow requests from these origins
    credentials: true, // allow cookies and authorization headers to be sent
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
