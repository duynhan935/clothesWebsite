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
    images,
}: {
    product: {
        productId: string;
        color: string;
        quantity: number;
    };
    images?: File[];
}) => {
    const formData = new FormData();

    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));

    if (images && images.length > 0) {
        images.forEach((file) => {
            formData.append("image", file);
        });
    }

    return axios.post("/api/product/product-details", formData);
};

export const updateProductDetail = (
    id: number,
    {
        product,
        images,
    }: {
        product: {
            productId: string;
            color: string;
            quantity: number;
        };
        images?: File[];
    }
) => {
    const formData = new FormData();

    formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));

    if (images && images.length > 0) {
        images.forEach((file) => {
            formData.append("image", file);
        });
    }

    return axios.put(`/api/product/product-details/${id}`, formData);
};

export const deleteProductDetail = (id: number) => {
    return axios.delete(`api/product/product-details/${id}`);
};

export const getProductDetailsById = (id: number) => {
    return axios.get(`api/product/product-details/${id}`);
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

export const addProductToCart = (data: { quantity: number; productDetailsId: string }) => {
    return axios.post(`api/order`, data);
};

export const removeItemFromCart = (cartId: number) => {
    return axios.delete(`api/order/${cartId}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

export const getCartItems = () => {
    return axios.get(`api/order`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
};

export const getAllProductDetailsById = (id: number) => {
    return axios.get(`api/product/product-details/infor/${id}`);
};

export const createOrder = () => {
    return axios.post(`api/order/checkout`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
    });
}