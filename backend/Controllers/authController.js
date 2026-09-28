import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";


// REGISTER

export const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "Name, email and password are required"
            });
        }

        // Check existing user
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                status: false,
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create customer
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "customer"
        });

        res.status(201).json({
            status: true,
            message: "Registration successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message
        });
    }
};


// LOGIN

export const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Email and password are required"
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password"
            });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                status: false,
                message: "Invalid email or password"
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            status: true,
            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            status: false,
            message: "Server error",
            error: error.message
        });
    }
};


// Admin creates salesperson
export const createSalesperson = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "Name, email and password are required",
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase().trim(),
        });

        if (existingUser) {
            return res.status(400).json({
                status: false,
                message: "Email already registered",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const salesperson = await User.create({
            name,
            email: email.toLowerCase().trim(),
            password: hashedPassword,
            role: "salesperson",
        });

        return res.status(201).json({
            status: true,
            message: "Salesperson account created successfully",
            salesperson: {
                id: salesperson._id,
                name: salesperson.name,
                email: salesperson.email,
                role: salesperson.role,
            },
        });

    } catch (error) {
        console.error("CREATE SALESPERSON ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to create salesperson account",
        });
    }
};