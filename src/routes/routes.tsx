import { createBrowserRouter } from "react-router-dom";

/* ----- Layouts ----- */
import AppLayout from "../layouts/Client/appLayouts";
import AdminLayout from "../layouts/Admin/adminLayout";
import RequireAdmin from "../layouts/Admin/RequireAdmin";

/* ----- Pages (Client) ----- */
import HomePage from "../pages/Client/HomePage";
import ProductDetailsPage from "../pages/Client/ProductDetailsPage";

/* ----- Pages (Admin) ----- */
import ProductManagement from "../pages/Admin/ProductManagement";
import UserManagement from "../pages/Admin/UserManagerment";
import OrderManagement from "../pages/Admin/OrderManagerment";
import Dashboard from "../pages/Admin/Dashboard";

export const router = createBrowserRouter([
    // ---------- Client ----------
    {
        element: <AppLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/product", element: <ProductDetailsPage /> },
        ],
    },

    // ---------- Admin ----------
    {
        path: "/admin",
        element: <RequireAdmin />, // bảo vệ
        children: [
            {
                element: <AdminLayout />, // layout chung
                children: [
                    { index: true, element: <ProductManagement /> },
                    { path: "products", element: <ProductManagement /> },
                    { path: "users", element: <UserManagement /> },
                    { path: "orders", element: <OrderManagement /> },
                    { path: "dashboard", element: <Dashboard /> },
                ],
            },
        ],
    },

    // 404
    { path: "*", element: <h1>Not Found</h1> },
]);
