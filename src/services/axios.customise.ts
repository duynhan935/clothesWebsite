import axios from "axios";
import { refreshToken } from "./api.services";
import { logoutUser } from "./auth.services";
import { store } from "../redux/store/store";

// Tạo instance Axios
const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_URL_BACKEND,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * Gọi API để refresh access token từ refresh token
 */
const handleRefreshToken = async () => {
    try {
        const res = await refreshToken();
        if (res && res.data) {
            return res.data.accessToken;
        }
        return null;
    } catch (error) {
        console.error("Refresh token failed:", error);
        return null;
    }
};

// Thêm access token vào mỗi request nếu có
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token && config.headers) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Xử lý response và tự động refresh token nếu bị 401
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;

        // Nếu lỗi là 401 và request chưa được retry
        if (
            error.response?.status === 401 &&
            !originalConfig._retry // ✅ dùng biến thường, không gây lỗi CORS
        ) {
            originalConfig._retry = true;
            console.log("🔁 Access token expired, trying to refresh...");

            const newAccessToken = await handleRefreshToken();
            if (newAccessToken) {
                localStorage.setItem("accessToken", newAccessToken);
                originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosClient(originalConfig); // Retry request cũ
            }
        }

        // Nếu refresh token bị lỗi (400) thì logout
        if (error.config?.url === "/auth/refresh-token" && error.response?.status === 400) {
            logoutUser(store.dispatch);
        }

        return Promise.reject(error.response?.data ?? error);
    }
);

export default axiosClient;
