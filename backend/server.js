import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";


dotenv.config();

const app = express();


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(
    cors({
        origin: "https://glow-mchc.onrender.com"  ,       //"http://localhost:5173",
        credentials: true,
    })
);

app.use(express.json());


// =====================================================
// DATABASE
// =====================================================

connectDB();


// =====================================================
// ROUTES
// =====================================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/products",
    productRoutes
);

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
    res.status(200).json({
        status: true,
        message: "SwaGlow API is running",
    });
});

// SERVER

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server running on port ${PORT}`
    );
});