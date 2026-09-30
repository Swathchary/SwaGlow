import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();


const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);

        console.log("MongoDB connected");

        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;

        const existingAdmin = await User.findOne({
            email: adminEmail,
        });

        if (existingAdmin) {
            console.log("Admin already exists");
            process.exit(0);
        }

        const hashedPassword = await bcrypt.hash(
            adminPassword,
            10
        );

        const admin = await User.create({
            name: "SwaGlow Admin",
            email: adminEmail,
            password: hashedPassword,
            role: "admin",
        });

        console.log("================================");
        console.log("ADMIN CREATED SUCCESSFULLY");
        console.log("================================");
        console.log("Name:", admin.name);
        console.log("Email:", admin.email);
        console.log("Password:", adminPassword);
        console.log("Role:", admin.role);
        console.log("================================");

        process.exit(0);

    } catch (error) {

        console.error(
            "CREATE ADMIN ERROR:",
            error.message
        );

        process.exit(1);
    }
};

createAdmin();