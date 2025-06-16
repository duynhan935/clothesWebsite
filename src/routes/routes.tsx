import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/appLayouts";

import HomePage from "../pages/HomePage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import AdminPage from "../pages/Admin/AdminPage";

export const router = createBrowserRouter([
    // --- Nhánh sử dụng AppLayout ---
    {
        element: <AppLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "/product", element: <ProductDetailsPage /> },
        ],
    },

    // --- Nhánh không dùng AppLayout (Admin) ---
    {
        path: "/admin",
        element: <AdminPage />,
    },
]);
