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
        },
    });
};

export const refreshToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");

    return axios.get("/api/auth/accesstoken", {
        headers: {
            "Refresh-Token": refreshToken || "",
        },
    });
};

export const getAllCategories = () => {
    return axios.get("api/product/categories");
};

export const getAllProducts = () => {
    return axios.get("api/product");
};

export const getProductById = (id: string) => {
    return axios.get(`api/product/${id}`);
};

export const createProduct = (data: {
    name: string;
    description: string;
    price: number;
    category: string;
    releaseDate: string;
}) => {
    return axios.post("api/product", data);
};

export const updateProduct = (
    id: string,
    data: {
        name: string;
        description: string;
        price: number;
        category: string;
        releaseDate: string;
    }
) => {
    return axios.put(`api/product/${id}`, data);
};

export const deleteProduct = (id: string) => {
    return axios.delete(`api/product/${id}`);
};

export const createProductDetail = ({
    product,
    image,
}: {
    product: {
        productId: string;
        color: string;
        quantity: number;
    };
    image: File;
}) => {
    const formData = new FormData();
    formData.append("product", JSON.stringify(product));
    formData.append("image", image);
    return axios.post("api/product/detail", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const getAllUsers = () => {
    return axios.get("api/users");
};

export const getUserById = (id: string) => {
    return axios.get(`api/users/${id}`);
};

export const updateUser = (
    id: string,
    data: {
        username: string;
        email: string;
        phone: string;
        address: string;
    }
) => {
    return axios.put(`api/users/${id}`, data);
};

export const deleteUser = (id: string) => {
    return axios.delete(`api/users/${id}`);
};
