import axios from "./axios.customise";

export const registerUser = (data: {
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
}) => {
    return axios.post("/api/auth/register", data);
};

export const loginUser = (data: { username: string; password: string }) => {
    return axios.post("/api/auth/login", data);
};

export const getUserDetails = (token: string) => {
    return axios.get("/api/auth/user", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}
