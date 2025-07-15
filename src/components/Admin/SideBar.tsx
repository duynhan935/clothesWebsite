// src/components/Admin/Sidebar.tsx
import { Menu } from "antd";
import type { MenuProps } from "antd";
import {
    DashboardOutlined,
    AppstoreOutlined,
    UserOutlined,
    ShoppingCartOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarProps {
    collapsed: boolean;
}

function Sidebar({ collapsed }: SidebarProps) {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    // Xây mảng items tuỳ theo collapsed
    const menuItems: MenuProps["items"] = [
        {
            key: "/admin/dashboard",
            icon: <DashboardOutlined />,
            label: collapsed ? null : "Dashboard",
        },
        {
            key: "/admin/products",
            icon: <AppstoreOutlined />,
            label: collapsed ? null : "Product Management",
        },
        {
            key: "/admin/users",
            icon: <UserOutlined />,
            label: collapsed ? null : "User Management",
        },
        {
            key: "/admin/orders",
            icon: <ShoppingCartOutlined />,
            label: collapsed ? null : "Order Management",
        },
    ];

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            className="min-h-screen"
        />
    );
}

export default Sidebar;
