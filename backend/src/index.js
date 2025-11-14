import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/db.js";
import cors from "cors";
import { app, server } from "./db/socket.js";
import path from "path";

dotenv.config();

const PORT = process.env.PORT || 5001;
const _dirname = path.resolve();

app.use(cookieParser());

app.use(cors({
 origin: process.env.CLIENT_URL,
  credentials: true,
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


const frontendPath = path.join(_dirname, "frontend/dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}


server.listen(PORT, () => {
  console.log("✅ Server is running on PORT: " + PORT);
  connectDB();
});
