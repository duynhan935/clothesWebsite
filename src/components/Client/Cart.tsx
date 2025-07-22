/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Spin } from "antd";
import { useEffect, useState } from "react";
import { getAllProductDetailsById, getCartItems, removeItemFromCart } from "../../services/api.services";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { setCart, removeItem } from "../../redux/store/cartSlice";
import { Link } from "react-router-dom";

export interface ProductImage {
    imageName: string;
    imageType: string;
    imageData: string;
}

export interface CartItem {
    id: number;
    quantity: number;
    img?: string;
    name?: string;
    price?: number;
    color?: string;
    stockQuantity?: number;
    cartId?: number;
}

const Cart = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const token = localStorage.getItem("accessToken");
                if (!token) {
                    console.error("No token found in local storage.");
                    return;
                }

                const response = await getCartItems();
                const cartRaw = response.data;

                const fullItems: CartItem[] = await Promise.all(
                    cartRaw.map(async (item: any) => {
                        try {
                            const productRes = await getAllProductDetailsById(item.productDetailsId);
                            const productDetails = productRes.data;
                            const firstImage = productDetails.images?.[0];
                            const imageUrl = firstImage
                                ? `data:${firstImage.imageType};base64,${firstImage.imageData}`
                                : "https://via.placeholder.com/64";

                            return {
                                id: productDetails.id,
                                quantity: item.quantity,
                                img: imageUrl,
                                name: productDetails.name || "Unnamed Product",
                                price: productDetails.price || 0,
                                color: productDetails.color || "N/A",
                                stockQuantity: productDetails.quantity || 0,
                                cartId: item.cartId || productDetails.id,
                            };
                        } catch (err) {
                            console.error("Failed to fetch product details:", err);
                            return {
                                id: -1,
                                quantity: item.quantity,
                                name: "Error loading product",
                                price: 0,
                                img: "https://via.placeholder.com/64",
                                cartId: item.cartId || -1,
                            };
                        }
                    })
                );

                dispatch(setCart(fullItems));
            } catch (error) {
                console.error("Error loading cart:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, [dispatch]);

    const handleRemoveItem = async (cartId: number) => {
        try {
            await removeItemFromCart(cartId);
            dispatch(removeItem(cartId));
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    const total = cartItems!.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

    if (loading) return <Spin fullscreen />;

    return (
        <div className="flex flex-col md:flex-row gap-10 p-6 bg-gray-50 min-h-screen">
            <div className="flex-1 max-h-screen overflow-y-auto pr-4">
                {cartItems!.length === 0 ? (
                    <div className="text-center text-gray-500 mt-20 text-lg">Your cart is empty.</div>
                ) : (
                    cartItems!.map((item, index) => (
                        <div key={item.cartId ?? item.id} className="cartItem mb-4">
                            <div className="flex justify-between text-sm text-gray-500 mb-2">
                                <span>Item {index + 1}</span>
                                <div className="flex gap-3 items-center">
                                    <Link to={`/product/${item.id}`} className="text-blue-600 hover:underline text-sm">
                                        View
                                    </Link>
                                    <span
                                        title="Remove item"
                                        onClick={() => handleRemoveItem(item.cartId!)}
                                        className="removeBtn cursor-pointer"
                                    >
                                        🗑️
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-4 items-center">
                                <img src={item.img} alt={item.name} className="productImage" />
                                <div>
                                    <div className="font-medium text-base">{item.name}</div>
                                    <div className="itemMeta">Color: {item.color}</div>
                                    <div className="itemMeta">In stock: {item.stockQuantity}</div>
                                    <div className="text-base font-semibold mt-2">
                                        {(item.price || 0).toLocaleString()} VND x {item.quantity}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="w-full md:w-1/3 cartSummary">
                <div className="bg-white p-6 rounded-lg shadow-md sticky top-6">
                    <div className="flex justify-between items-center text-base font-semibold mb-4  ">
                        <span className="text-gray-800">Cart order total ({cartItems!.length})</span>
                        <span className="text-right text-blue-600 text-lg font-bold ml-4">
                            {total.toLocaleString()} VND
                        </span>
                    </div>

                    <div className="text-sm text-gray-600 mb-6">
                        🎉 You get <span className="text-green-600 font-medium">Free Shipping</span>!
                        <br />
                        <span className="text-xs text-gray-400">
                            Excludes furniture, mattresses & other exclusions apply.
                        </span>
                    </div>
                    <Button type="primary" block size="large" className="rounded-md">
                        Proceed to Checkout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
