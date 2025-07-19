import { createBrowserRouter } from "react-router-dom";

/* ----- Layouts ----- */
import AppLayout from "../layouts/Client/appLayouts";
import AdminLayout from "../layouts/Admin/AdminLayout";
import RequireAdmin from "../layouts/Admin/RequireAdmin";

/* ----- Pages (Client) ----- */
import HomePage from "../pages/Client/HomePage";
import ProductDetailsPage from "../pages/Client/ProductDetailsPage";

/* ----- Pages (Admin) ----- */
import ProductManagement from "../pages/Admin/ProductManagement";
import UserManagement from "../pages/Admin/UserManagerment";
import OrderManagement from "../pages/Admin/OrderManagerment";
import Dashboard from "../pages/Admin/Dashboard";
import ProductDetailPage from "../pages/Admin/ProductDetails";
import NotFoundPage from "../pages/Error/ErrorPage";

export const router = createBrowserRouter([
    // ---------- Client ----------
    {
        element: <AppLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/product/:id", element: <ProductDetailsPage /> },
        ],
    },

    // ---------- Admin ----------
    {
        path: "/admin",
        element: <RequireAdmin />,
        children: [
            {
                element: <AdminLayout />,
                children: [
                    { index: true, element: <ProductManagement /> },
                    { path: "products", element: <ProductManagement /> },
                    { path: "users", element: <UserManagement /> },
                    { path: "orders", element: <OrderManagement /> },
                    { path: "dashboard", element: <Dashboard /> },
                    { path: "product/:id", element: <ProductDetailPage /> },
                ],
            },
        ],
    },

    // 404
    { path: "*", element: <NotFoundPage /> },
]);
