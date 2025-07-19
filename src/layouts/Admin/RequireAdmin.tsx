import { Navigate, Outlet } from "react-router-dom";
import { getUserDetails } from "../../services/api.services";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading/loading";

function RequireAdmin() {
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const accessToken = localStorage.getItem("accessToken");
            if (!accessToken) {
                setLoading(false);
                return;
            }

            try {
                const res = await getUserDetails(accessToken);
                if (res.data.role === "ADMIN") {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Failed to fetch user details", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) return <Loading />;

    if (!isAdmin) return <Navigate to="/" replace />;

    return <Outlet />;
}

export default RequireAdmin;
