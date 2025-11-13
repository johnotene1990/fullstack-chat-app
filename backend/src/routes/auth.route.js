import express from "express"
import { checkAuth, login, logout, signup, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", protectRoute, updateProfile);

//router.get("/check", protectRoute, checkAuth)




router.get("/check",  protectRoute, checkAuth, (req, res) => {
  res.json(req.user);
});


export default router;