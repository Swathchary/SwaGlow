import Product from "../models/Product.js";


// =====================================================
// GET APPROVED PRODUCTS
// Customer can see only approved products
// =====================================================

export const getApprovedProducts = async (req, res) => {
    try {
        const products = await Product.find({
            status: "approved",
        })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            message: "Products fetched successfully",
            products,
        });

    } catch (error) {
        console.error("GET PRODUCTS ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch products",
        });
    }
};


// =====================================================
// GET SINGLE APPROVED PRODUCT
// =====================================================

export const getApprovedProductById = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findOne({
            _id: id,
            status: "approved",
        }).populate("createdBy", "name email");

        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Product fetched successfully",
            product,
        });

    } catch (error) {
        console.error("GET PRODUCT ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch product",
        });
    }
};


// =====================================================
// GET CATEGORIES
// =====================================================

export const getProductCategories = async (req, res) => {
    try {
        const categories = await Product.distinct(
            "category",
            {
                status: "approved",
            }
        );

        return res.status(200).json({
            status: true,
            message: "Categories fetched successfully",
            categories,
        });

    } catch (error) {
        console.error("GET CATEGORIES ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch categories",
        });
    }
};


// =====================================================
// GET PRODUCTS BY CATEGORY
// =====================================================

export const getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const products = await Product.find({
            category: category,
            status: "approved",
        })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            message: "Category products fetched successfully",
            products,
        });

    } catch (error) {
        console.error(
            "GET CATEGORY PRODUCTS ERROR:",
            error
        );

        return res.status(500).json({
            status: false,
            message: "Failed to fetch category products",
        });
    }
};


// =====================================================
// SALESPERSON ADD PRODUCT
// Product starts as PENDING
// =====================================================

export const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            image,
            stock,
        } = req.body;

        if (
            !name ||
            !description ||
            price === undefined ||
            !category ||
            !image
        ) {
            return res.status(400).json({
                status: false,
                message: "Please provide all required product details",
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock: stock || 0,

            // IMPORTANT
            status: "pending",

            // Comes from JWT
            createdBy: req.user.id,
        });

        return res.status(201).json({
            status: true,
            message: "Product submitted for admin approval",
            product,
        });

    } catch (error) {
        console.error("ADD PRODUCT ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to add product",
        });
    }
};


// =====================================================
// ADMIN GET PENDING PRODUCTS
// =====================================================

export const getPendingProducts = async (req, res) => {
    try {
        const products = await Product.find({
            status: "pending",
        })
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            message: "Pending products fetched successfully",
            products,
        });

    } catch (error) {
        console.error("GET PENDING PRODUCTS ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch pending products",
        });
    }
};


// =====================================================
// ADMIN APPROVE PRODUCT
// =====================================================

export const approveProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            {
                status: "approved",
            },
            {
                new: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Product approved successfully",
            product,
        });

    } catch (error) {
        console.error("APPROVE PRODUCT ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to approve product",
        });
    }
};


// =====================================================
// ADMIN REJECT PRODUCT
// =====================================================

export const rejectProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            {
                status: "rejected",
            },
            {
                new: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                status: false,
                message: "Product not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Product rejected successfully",
            product,
        });

    } catch (error) {
        console.error("REJECT PRODUCT ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to reject product",
        });
    }
};


export const getMyProducts = async (req, res) => {
    try {
        const products = await Product.find({
            createdBy: req.user.id,
        })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: true,
            message: "My products fetched successfully",
            products,
        });

    } catch (error) {
        console.error("GET MY PRODUCTS ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch your products",
        });
    }
};


export const getAdminProductStats = async (req, res) => {
    try {
        const total = await Product.countDocuments();

        const pending = await Product.countDocuments({
            status: "pending",
        });

        const approved = await Product.countDocuments({
            status: "approved",
        });

        const rejected = await Product.countDocuments({
            status: "rejected",
        });

        console.log("ADMIN PRODUCT STATS:", {
            total,
            pending,
            approved,
            rejected,
        });

        return res.status(200).json({
            status: true,
            message: "Product statistics fetched successfully",
            stats: {
                total,
                pending,
                approved,
                rejected,
            },
        });
    } catch (error) {
        console.error("GET ADMIN PRODUCT STATS ERROR:", error);

        return res.status(500).json({
            status: false,
            message: "Failed to fetch product statistics",
        });
    }
};