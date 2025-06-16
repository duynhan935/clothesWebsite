import { Navigate, Outlet } from "react-router-dom";

const fakeRole = "admin"; 

const RequireAdmin: React.FC = () => {
    if (fakeRole !== "admin") return <Navigate to="/" replace />;
    return <Outlet />;
};

export default RequireAdmin;
