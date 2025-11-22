// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// //import http from "http";
// import cors from "cors";
// import { fileURLToPath } from "url";

// import path from "path";
// //import { Server } from "socket.io";

// import { connectDB } from "./db/db.js";

// import authRoutes from "./routes/auth.route.js";
// import messageRoutes from "./routes/message.route.js";
// import { app, server } from "./db/socket.js";

// dotenv.config();

// const PORT = process.env.PORT;
// //const __dirname = path.resolve();
// //const server = http.createServer(app);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// const frontendPath = path.join(__dirname, "../../frontend/dist");

// app.use(express.json());
// app.use(cookieParser());


// // const io = new Server(server, {
// //   cors: {
// //     origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
// //     credentials: true,
// //     methods: ["GET", "POST", "PUT", "DELETE"],
// //      allowedHeaders: ["Content-Type", "Authorization"],
// //   },
// // });

// //registerSocket(io);
// app.use(
//   cors({
//     origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );


// app.use(cors());
// app.use(express.json({ limit: "40mb" }));
// app.use(express.urlencoded({ limit: "40mb", extended: true }));


// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// if (process.env.NODE_ENV === "production") {
//   //app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.use(express.static(frontendPath));

//   app.get("/*", (req, res) => {
//      res.sendFile(path.join(frontendPath, "index.html"));
//     //res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

// server.listen(PORT, () => {
//   console.log("server is running on PORT:" + PORT);
//   connectDB();
// });


import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { fileURLToPath } from "url";
import path from "path";

import { connectDB } from "./db/db.js";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { app, server } from "./db/socket.js";

dotenv.config();

const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, "../../frontend/dist");

// ---- CORS SETTINGS ---- //
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      process.env.FRONTEND_URL,   // <-- For Render
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "40mb" }));
app.use(express.urlencoded({ limit: "40mb", extended: true }));
app.use(cookieParser());

// ---- API ROUTES ---- //
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// ---- SERVE FRONTEND IN PRODUCTION ---- //
if (process.env.NODE_ENV === "production") {
  app.use(express.static(frontendPath));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ---- START SERVER ---- //
server.listen(PORT, () => {
  console.log("Server running on PORT:", PORT);
  connectDB();
});
