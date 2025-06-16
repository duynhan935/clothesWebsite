import { MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, LogoutOutlined, DownOutlined } from "@ant-design/icons";
import { Avatar, Button, Dropdown, Layout, Space, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/Admin/SideBar";

const { Sider, Header, Content } = Layout;

const AdminLayout: React.FC = () => {
    /* ---------- state & hooks ---------- */
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();

    // TODO: sau này lấy user từ Redux / Context
    const user = { name: "I'm Admin", avatar_url: "" };

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    /* ---------- dropdown menu ---------- */
    const accountMenu = {
        items: [
            {
                key: "homepage",
                label: (
                    <div onClick={() => navigate("/")} style={{ width: "100%" }}>
                        <HomeOutlined className="mr-2" />
                        Homepage
                    </div>
                ),
            },
            { type: "divider" as const },
            {
                key: "logout",
                label: (
                    <div
                        onClick={() => {
                            /* TODO: gọi dispatch(doLogoutAction()) sau khi viết Redux */
                            console.log("Logout clicked"); // tạm thời
                            navigate("/");
                        }}
                        style={{ color: "red", width: "100%" }}
                    >
                        <LogoutOutlined className="mr-2" />
                        Logout
                    </div>
                ),
            },
        ],
    };

    /* ---------- render ---------- */
    return (
        <Layout className="min-h-screen">
            {/* Sider */}
            <Sider trigger={null} collapsible collapsed={collapsed} width={230} breakpoint="lg">
                <div
                    className="cursor-pointer text-center font-bold my-4"
                    style={{ color: "#61dafb", fontSize: collapsed ? 18 : 32 }}
                    onClick={() => navigate("/admin")}
                >
                    ADMIN
                </div>

                <Sidebar collapsed={collapsed} />
            </Sider>

            {/* Phần còn lại */}
            <Layout>
                <Header
                    style={{ padding: 0, background: colorBgContainer }}
                    className="flex items-center justify-between"
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{ fontSize: 16, width: 64, height: 64 }}
                    />

                    <Dropdown menu={accountMenu} trigger={["hover"]} placement="bottomRight">
                        <a onClick={(e) => e.preventDefault()}>
                            <Space className="mr-4">
                                <Avatar size="large" src={user.avatar_url} />
                                {user.name}
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </Header>

                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;
