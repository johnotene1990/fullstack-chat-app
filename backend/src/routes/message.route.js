// import express from "express"
// import { protectRoute } from "../middleware/auth.middleware.js";
// import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";

// const router = express.Router();


// router.get("/users", protectRoute, getUsersForSidebar)
// router.get("/:id", protectRoute, getMessages)

// router.post("/send/:id", protectRoute, sendMessage)

// export default router;



import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getMessages,
  getUsersForSidebar,
  sendMessage
} from "../controllers/message.controller.js";

const router = express.Router();

// get sidebar users
router.get("/users", protectRoute, getUsersForSidebar);

// get all messages between two users
router.get("/:id", protectRoute, getMessages);

// send a new message
router.post("/send/:id", protectRoute, sendMessage);

export default router;
