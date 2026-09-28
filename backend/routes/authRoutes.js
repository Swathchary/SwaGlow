import express from "express";

import {
    registerUser,
    loginUser,
    createSalesperson,
} from "../controllers/authController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();


// Customer registration
router.post("/register", registerUser);


// Login for all users
router.post("/login", loginUser);


// Admin creates salesperson
router.post(
    "/create-salesperson",
    protect,
    authorizeRoles("admin"),
    createSalesperson
);


export default router;