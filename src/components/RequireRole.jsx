import { Navigate, Outlet } from "react-router-dom";

const RequireRole = ({ role }) => {

    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser) {
        return <Navigate to="/login" replace />;
    }

    try {

        const user = JSON.parse(savedUser);

        if (user.role !== role) {

            if (user.role === "admin") {
                return <Navigate to="/admin" replace />;
            }

            if (user.role === "salesperson") {
                return <Navigate to="/sales" replace />;
            }

            return <Navigate to="/customer" replace />;
        }

        return <Outlet />;

    } catch (error) {

        console.error(
            "REQUIRE ROLE ERROR:",
            error
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        return <Navigate to="/login" replace />;
    }
};

export default RequireRole;