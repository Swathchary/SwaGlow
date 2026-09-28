import express from "express";

import {
    getApprovedProducts,
    getApprovedProductById,
    getProductCategories,
    getProductsByCategory,
    addProduct,
    getPendingProducts,
    approveProduct,
    rejectProduct,
    getMyProducts,
        getAdminProductStats,

} from "../Controllers/productController.js";

import protect from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/", protect, authorizeRoles("customer"), getApprovedProducts);

router.get(
    "/categories",
    protect,
    authorizeRoles("customer"),
    getProductCategories
);

router.get(
    "/category/:category",
    protect,
    authorizeRoles("customer"),
    getProductsByCategory
);


// SALESPERSON
router.get(
    "/my-products",
    protect,
    authorizeRoles("salesperson"),
    getMyProducts
);

router.post(
    "/",
    protect,
    authorizeRoles("salesperson"),
    addProduct
);


// ADMIN
router.get(
    "/admin/pending",
    protect,
    authorizeRoles("admin"),
    getPendingProducts
);

router.put(
    "/admin/:id/approve",
    protect,
    authorizeRoles("admin"),
    approveProduct
);

router.put(
    "/admin/:id/reject",
    protect,
    authorizeRoles("admin"),
    rejectProduct
);
router.get(
    "/admin/stats",
    protect,
    authorizeRoles("admin"),
    getAdminProductStats
);


// CUSTOMER - keep this LAST
router.get(
    "/:id",
    protect,
    authorizeRoles("customer"),
    getApprovedProductById
);

export default router;