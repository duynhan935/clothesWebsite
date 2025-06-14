import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layouts/appLayouts";

import HomePage from "../pages/HomePage";
import LoginPage from "../auth/login";
import RegisterPage from "../auth/register";

export const router = createBrowserRouter([
    {
        element: <AppLayout />, 
        children: [
            { index: true, element: <HomePage /> }, 
            { path: "login", element: <LoginPage /> }, 
            { path: "register", element: <RegisterPage /> }, 
        ],
    },
]);
