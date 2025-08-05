import { useEffect, useState } from "react";
import { getOrderByUserId, getAllProductDetailsById } from "../../services/api.services";
import moment from "moment";
import { Spin, Empty, Modal } from "antd";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { closeCart } from "../../redux/store/cartSlice";
import Cart from "../../components/Client/Cart";
import { closeLogin } from "../../redux/store/loginSlice";
import { closeRegister } from "../../redux/store/registerSlice";
import RegisterPage from "../../auth/register";
import Login from "../../auth/login";

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
    products: ProductWithDetail[];
}

const HistoryPage = () => {
    const userId = useSelector((state: RootState) => state.account.user.id);
    const isAuthenticated = useSelector((state: RootState) => state.account.isAuthenticated);
    const [orders, setOrders] = useState<EnrichedOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
    const isLoginOpen = useSelector((state: RootState) => state.login.isLoginOpen);
    const isRegisterOpen = useSelector((state: RootState) => state.register.isRegisterOpen);

    const dispatch = useDispatch<AppDispatch>();

    // Fetch orders
    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await getOrderByUserId(userId);
                const rawOrders: Order[] = res.data;

                const enrichedOrders: EnrichedOrder[] = await Promise.all(
                    rawOrders.map(async (order) => {
                        const enrichedProducts: ProductWithDetail[] = await Promise.all(
                            order.products.map(async (p) => {
                                const detailRes = await getAllProductDetailsById(p.productDetailsId);
                                const detail = detailRes.data;

                                return {
                                    ...p,
                                    ...detail,
                                    quantity: p.quantity, 
                                };
                            })
                        );
                        return {
                            id: order.id,
                            createdAt: order.createdAt,
                            products: enrichedProducts,
                        };
                    })
                );

                setOrders(enrichedOrders);
            } catch (error) {
                console.error("Failed to load orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [userId, isAuthenticated]);

    // Reset on logout
    useEffect(() => {
        if (!isAuthenticated) {
            setOrders([]);
        }
    }, [isAuthenticated]);

    if (loading) return <Spin tip="Loading order history..." style={{ marginTop: 50 }} />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Your Purchase History</h1>

            {orders.length === 0 ? (
                <Empty description="You haven't placed any orders yet." style={{ marginTop: 60 }} />
            ) : (
                orders.map((order, index) => (
                    <div key={order.id} className="border rounded-lg p-4 bg-white mb-6 shadow-sm">
                        <div className="text-gray-500 text-sm mb-2">
                            Order #{index + 1} - {moment(order.createdAt).format("YYYY-MM-DD")}
                        </div>

                        {order.products.map((product) => {
                            const image = product.images?.[0];
                            const imageUrl = image
                                ? `data:${image.imageType};base64,${image.imageData}`
                                : "https://via.placeholder.com/64";

                            return (
                                <Link
                                    key={product.id}
                                    to={`/product/${product.productId}`}
                                    className="flex gap-4 items-center border-t pt-3 mt-3 hover:bg-gray-50 transition-colors rounded p-2 -m-2"
                                >
                                    <img src={imageUrl} alt={product.name} className="w-16 h-16 object-cover rounded" />
                                    <div className="flex flex-col">
                                        <span className="font-medium text-blue-600 hover:text-blue-800">
                                            {product.name}
                                        </span>
                                        <span className="text-sm text-gray-600">
                                            Color: {product.color.toUpperCase()} | Size: {product.size}
                                        </span>
                                        <span className="text-sm text-gray-600">Quantity: {product.quantity}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ))
            )}

            <Modal open={isCartOpen} onCancel={() => dispatch(closeCart())} footer={null} width={800}>
                <Cart />
            </Modal>
            <Modal
                open={isLoginOpen}
                onCancel={() => dispatch(closeLogin())}
                footer={null}
                width={400}
                centered
                styles={{ body: { padding: 0 } }}
            >
                <Login />
            </Modal>
            <Modal
                open={isRegisterOpen}
                onCancel={() => dispatch(closeRegister())}
                footer={null}
                width={400}
                centered
                styles={{ body: { padding: 0 } }}
            >
                <RegisterPage />
            </Modal>
        </div>
    );
};

export default HistoryPage;
