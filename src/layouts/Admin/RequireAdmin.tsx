import { Navigate, Outlet } from "react-router-dom";

const fakeRole = "admin";

function RequireAdmin() {
    if (fakeRole !== "admin") return <Navigate to="/" replace />;
    return <Outlet />;
}

export default RequireAdmin;
