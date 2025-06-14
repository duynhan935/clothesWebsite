import { ConfigProvider } from "antd";
import viVN from "antd/locale/vi_VN";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/routes";

export default function App() {
    return (
        <ConfigProvider locale={viVN} theme={{ token: { colorPrimary: "#1677ff" } }}>
            {/* TODO: Thêm AuthProvider, CartProvider, QueryClientProvider … nếu cần */}
            <RouterProvider router={router} />
        </ConfigProvider>
    );
}
