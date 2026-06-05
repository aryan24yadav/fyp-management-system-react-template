import express from "express";
import {register,login,logout,getUser,forgotPassword,resetPassword,updatePassword} from "../controllers/authController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.get("/logout",isAuthenticated,logout);
router.get("/getUser",isAuthenticated,getUser);
router.post("/Password/forgot",forgotPassword);
router.put("/Password/reset/:token",resetPassword);
// router.post("/Password/update",updatePassword);

export default router;