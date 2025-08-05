/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getOrderById, getAllProductDetailsById } from "../../services/api.services";
import { Spin, Button, Tag } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import moment from "moment";

interface ProductDetail {
    id: number;
    name: string;
    price: number;
    color: string;
    size: string;
    images: { imageData: string; imageType: string }[];
    quantity: number;
    productId: string;
}

interface ProductInOrder {
    id: number;
    quantity: number;
    productDetailsId: number;
}

interface Order {
    id: string;
    createdAt: string;
    status: string;
    userId: string;
    products: ProductInOrder[];
}

interface ProductWithDetail extends ProductInOrder, ProductDetail {}

interface EnrichedOrder {
    id: string;
    createdAt: string;
    status: string;
    userId: string;
    products: ProductWithDetail[];
}

const OrderDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<EnrichedOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!id) return;

            try {
                setError(null);
                const res = await getOrderById(id);
                console.log(res.data);

                const rawOrder: Order = res.data;

                const enrichedProducts: ProductWithDetail[] = await Promise.all(
                    rawOrder.products.map(async (p) => {
                        try {
                            const detailRes = await getAllProductDetailsById(p.productDetailsId);
                            const detail = detailRes.data;
                            console.log("Order product:", p);
                            console.log("Product detail:", detail);

                            return {
                                ...p,
                                ...detail,
                                quantity: p.quantity, // Preserve the ordered quantity
                            };
                        } catch (err) {
                            console.error("Failed to fetch product details:", err);
                            return {
                                ...p,
                                id: p.productDetailsId,
                                name: "Error loading product",
                                price: 0,
                                color: "N/A",
                                size: "N/A",
                                images: [],
                                quantity: 0,
                                productId: "",
                            };
                        }
                    })
                );

                const enrichedOrder: EnrichedOrder = {
                    id: rawOrder.id,
                    createdAt: rawOrder.createdAt,
                    status: rawOrder.status,
                    userId: rawOrder.userId,
                    products: enrichedProducts,
                };

                setOrder(enrichedOrder);
            } catch (error) {
                setError("Failed to load order details. Please try again later.");
                console.error("Failed to load order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Spin tip="Loading order details..." size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6">
                <div className="mb-4">
                    <Link to="/admin/orders">
                        <Button icon={<ArrowLeftOutlined />}>Back to Orders</Button>
                    </Link>
                </div>
                <div className="text-red-500 text-center mt-10">{error}</div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="p-6">
                <div className="mb-4">
                    <Link to="/admin/orders">
                        <Button icon={<ArrowLeftOutlined />}>Back to Orders</Button>
                    </Link>
                </div>
                <div className="text-center text-gray-500 mt-10">Order not found</div>
            </div>
        );
    }

    const total = order.products.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "PENDING":
                return "orange";
            case "PROCESSING":
                return "blue";
            case "COMPLETED":
                return "green";
            case "CANCELLED":
                return "red";
            default:
                return "default";
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="mb-6">
                <Link to="/admin/orders">
                    <Button icon={<ArrowLeftOutlined />} className="mb-4">
                        Back to Orders
                    </Button>
                </Link>
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-2xl font-semibold mb-2">Order Details</h1>
                            <p className="text-gray-600">Order ID: {order.id}</p>
                        </div>
                        <Tag color={getStatusColor(order.status)} className="text-sm px-3 py-1">
                            {order.status}
                        </Tag>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div>
                            <p className="text-sm text-gray-500">Customer ID</p>
                            <p className="font-medium">{order.userId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Order Date</p>
                            <p className="font-medium">{moment(order.createdAt).format("YYYY-MM-DD HH:mm")}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total Amount</p>
                            <p className="font-medium text-lg text-blue-600">{total.toLocaleString()} VND</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Products */}
            <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Products ({order.products.length})</h2>
                </div>
                <div className="p-6">
                    {order.products.map((product, index) => {
                        const image = product.images?.[0];
                        const imageUrl = image
                            ? `data:${image.imageType};base64,${image.imageData}`
                            : "https://via.placeholder.com/80";

                        return (
                            <div
                                key={product.id}
                                className="flex gap-4 items-center border-b pb-4 mb-4 last:border-b-0 last:mb-0"
                            >
                                <div className="text-sm text-gray-500 w-16">#{index + 1}</div>
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="w-20 h-20 object-cover rounded border"
                                />
                                <div className="flex-1">
                                    <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600">
                                        <div>
                                            <span className="font-medium">Color:</span> {product.color?.toUpperCase()}
                                        </div>
                                        <div>
                                            <span className="font-medium">Size:</span> {product.size}
                                        </div>
                                        <div>
                                            <span className="font-medium">Unit Price:</span>{" "}
                                            {(product.price || 0).toLocaleString()} VND
                                        </div>
                                        <div>
                                            <span className="font-medium">Quantity:</span> {product.quantity}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <span className="font-medium text-blue-600">
                                            Total Paid: {((product.price || 0) * product.quantity).toLocaleString()} VND
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Link
                                        to={`/admin/product/${product.productId}`}
                                        className="text-blue-600 hover:underline text-sm"
                                    >
                                        View Product
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Total */}
                <div className="p-6 border-t bg-gray-50">
                    <div className="flex justify-end">
                        <div className="text-right">
                            <p className="text-lg">
                                <span className="font-medium">Total: </span>
                                <span className="text-2xl font-bold text-blue-600">{total.toLocaleString()} VND</span>
                            </p>
                            <p className="text-sm text-gray-500 mt-1">
                                {order.products.length} item(s) •{" "}
                                {order.products.reduce((sum, item) => sum + item.quantity, 0)} total quantity
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
