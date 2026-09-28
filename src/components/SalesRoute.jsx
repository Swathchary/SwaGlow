import { Navigate, Outlet } from "react-router-dom";

const SalesRoute = () => {
    const token = localStorage.getItem("token");

    let user = null;

    try {
        user = JSON.parse(localStorage.getItem("user"));
    } catch {
        return <Navigate to="/login" replace />;
    }

    if (!token || user?.role !== "salesperson") {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default SalesRoute;