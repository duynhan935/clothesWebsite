/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { addProductToCart, getAllProductDetailsById, getCartItems, getProductById } from "../../services/api.services";
import { Button, InputNumber, message, Modal, Spin } from "antd";
import Products from "../../components/Client/Products";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { addItemToCart, closeCart, setCart } from "../../redux/store/cartSlice";
import { closeLogin } from "../../redux/store/loginSlice";
import { closeRegister } from "../../redux/store/registerSlice";
import RegisterPage from "../../auth/register";
import Cart from "../../components/Client/Cart";
import Login from "../../auth/login";

// Interfaces
export interface ProductImage {
    imageName: string;
    imageType: string;
    imageData: string;
}

export interface ProductDetail {
    id: number;
    color: string;
    size?: string;
    quantity: number;
    images?: ProductImage[];
}

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    releaseDate: string;
    productDetailsList: ProductDetail[];
}

export interface ProductDetailInput {
    productId: string;
    color: string;
    size?: string;
    quantity: number;
}

export interface CreateProductDetailPayload {
    product: ProductDetailInput;
    images?: File[];
}

const ProductDetailPage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
    const isLoginOpen = useSelector((state: RootState) => state.login.isLoginOpen);
    const isRegisterOpen = useSelector((state: RootState) => state.register.isRegisterOpen);
    const userId = useSelector((state: RootState) => state.account.user.id);

    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string>("");
    const [quantityAvailable, setQuantityAvailable] = useState<number>(0);
    const [quantityToBuy, setQuantityToBuy] = useState<number>(1);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                if (!id) return;
                const res = await getProductById(id);
                const data: Product = res.data;
                setProduct(data);
                dispatch(closeCart());

                if (data.productDetailsList?.length > 0) {
                    const firstDetail = data.productDetailsList[0];
                    setSelectedColor(firstDetail.color);
                    setQuantityAvailable(firstDetail.quantity);

                    const firstImg = firstDetail.images?.[0];
                    if (firstImg) {
                        setSelectedImage(`data:${firstImg.imageType};base64,${firstImg.imageData}`);
                    }
                }
            } catch (err) {
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        if (product && selectedColor) {
            const detail = product.productDetailsList.find((d) => d.color === selectedColor);

            if (detail) {
                setQuantityAvailable(detail.quantity);
                const firstImg = detail.images?.[0];
                if (firstImg) {
                    setSelectedImage(`data:${firstImg.imageType};base64,${firstImg.imageData}`);
                }
            }
        }
    }, [selectedColor, product]);

    if (loading || !product) return <Spin fullscreen />;

    const selectedDetail = product.productDetailsList.find((d) => d.color === selectedColor);
    const imagesForColor = selectedDetail?.images || [];
    const availableColors = Array.from(new Set(product.productDetailsList.map((detail) => detail.color)));

    const handleAddToCart = async () => {
        if (!selectedDetail) {
            console.log("Please select a color and quantity before adding to cart.");
            return;
        }
        try {
            await addProductToCart(userId, {
                quantity: quantityToBuy,
                productDetailsId: selectedDetail.id.toString(),
            });

            const newItem = await getAllProductDetailsById(selectedDetail.id);
            dispatch(
                addItemToCart({
                    id: newItem.data.id,
                    quantity: quantityToBuy,
                    img: selectedImage,
                    name: product.name,
                    price: product.price,
                    color: newItem.data.color,
                    stockQuantity: quantityAvailable,
                })
            );

            const response = await getCartItems(userId);
            const cartRaw = response.data;

            const fullItems = await Promise.all(
                cartRaw.map(async (item: any) => {
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
                        cartId: productDetails.id,
                        productId: productDetails.productId,
                    };
                })
            );

            dispatch(setCart(fullItems));
            message.success("Product added to cart successfully!");
        } catch (error) {
            console.error("Error adding product to cart:", error);
            message.error("Failed to add product to cart.");
        }
    };

    return (
        <>
            <div className="p-10 flex flex-col md:flex-row gap-10">
                {/* Left: Images */}
                <div className="w-full md:w-1/2">
                    <div className="w-full h-[400px] mb-4">
                        <img src={selectedImage} alt="Main" className="w-full h-full object-cover rounded" />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <ArrowLeftOutlined className="cursor-pointer" />
                        {imagesForColor.map((img, idx) => {
                            const fullUrl = `data:${img.imageType};base64,${img.imageData}`;
                            return (
                                <div
                                    key={idx}
                                    onClick={() => setSelectedImage(fullUrl)}
                                    className={`w-14 h-14 border-2 rounded cursor-pointer overflow-hidden ${
                                        selectedImage === fullUrl ? "border-black" : "border-transparent"
                                    }`}
                                >
                                    <img src={fullUrl} alt={img.imageName} className="w-full h-full object-cover" />
                                </div>
                            );
                        })}
                        <ArrowRightOutlined className="cursor-pointer" />
                    </div>
                </div>

                {/* Right: Info */}
                <div className="w-full md:w-1/2 space-y-6">
                    <div>
                        <h1 className="text-2xl font-bold">{product.name}</h1>
                        <p className="text-gray-600">{product.description}</p>
                        <p className="text-lg font-medium text-red-600">{product.price.toLocaleString()} VND</p>
                    </div>

                    <div>
                        <div className="mb-1 text-sm font-medium">Category:</div>
                        <div>{product.category}</div>
                    </div>

                    <div>
                        <div className="mb-1 text-sm font-medium">Release Date:</div>
                        <div>{new Date(product.releaseDate).toLocaleDateString()}</div>
                    </div>

                    <div>
                        <div className="mb-1 text-sm font-medium">Color:</div>
                        <div className="flex gap-2 flex-wrap">
                            {availableColors.map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`px-3 py-1 border rounded cursor-pointer text-sm ${
                                        selectedColor === color ? "bg-black text-white" : "bg-white"
                                    }`}
                                >
                                    {color}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Size Display */}
                    {selectedDetail?.size && (
                        <div>
                            <div className="mb-1 text-sm font-medium">Size:</div>
                            <div>{selectedDetail.size}</div>
                        </div>
                    )}

                    <div>
                        <div className="mb-1 text-sm font-medium">Quantity:</div>
                        <InputNumber
                            min={1}
                            max={quantityAvailable}
                            value={quantityToBuy}
                            onChange={(val) => setQuantityToBuy(val || 1)}
                        />
                        <span className="ml-2 text-gray-500">(Available: {quantityAvailable})</span>
                    </div>

                    <div>
                        <Button type="primary" size="large" onClick={handleAddToCart} disabled={quantityAvailable <= 0}>
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            {/* Similar Products */}
            <div className="flex justify-between items-center px-6">
                <h2 className="text-xl font-bold mb-4">Similar products</h2>
            </div>
            <Products initialVisible={4} excludedId={product.id} />

            {/* Modals */}
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
        </>
    );
};

export default ProductDetailPage;
