import { useState } from "react";
import { Button, Modal } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

// Redux hooks & slices for modals
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { closeCart } from "../../redux/store/cartSlice";
import { closeLogin } from "../../redux/store/loginSlice";
import { closeRegister } from "../../redux/store/registerSlice";

// Components
import Cart from "../../components/Client/Cart";
import Login from "../../auth/login";
import RegisterPage from "../../auth/register";
import Products from "../../components/Client/Products";

import ao1 from "../../assets/ao1.svg?url";

// Mock constants
const colors = ["#3b945e", "#f87171", "#f3f4f6", "#cbd5e1"];
const sizes = ["XL", "L", "M", "S"];
const thumbnails = ["#fefce8", "#fae8ff", "#e0f2fe"];

export default function ProductDetails() {
    const dispatch = useDispatch<AppDispatch>();
    const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
    const isLoginOpen = useSelector((state: RootState) => state.login.isLoginOpen);
    const isRegisterOpen = useSelector((state: RootState) => state.register.isRegisterOpen);

    const [selectedColor, setSelectedColor] = useState("#3b945e");
    const [selectedSize, setSelectedSize] = useState("XL");
    const [quantity, setQuantity] = useState(1);
    const [selectedImage, setSelectedImage] = useState(thumbnails[0]);

    const handleQtyChange = (type: "inc" | "dec") => {
        setQuantity((q) => (type === "inc" ? q + 1 : q > 1 ? q - 1 : 1));
    };

    return (
        <div className="bg-[#f4efe9]">
            {/* ================= Top section ================= */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                {/* Image section */}
                <div className="flex flex-col items-center">
                    <img src={ao1} alt="Product" className="w-[450px] object-contain rounded border border-gray-200" />

                    <div className="flex items-center gap-2 mt-4">
                        <ArrowLeftOutlined className="cursor-pointer" />
                        {thumbnails.map((color, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedImage(color)}
                                className={`w-14 h-14 border ${
                                    selectedImage === color ? "border-black" : "border-transparent"
                                } cursor-pointer`}
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <ArrowRightOutlined className="cursor-pointer" />
                    </div>
                </div>

                {/* Details section */}
                <div className="space-y-4">
                    <div className="text-sm text-gray-500">Women-Cloths</div>
                    <h1 className="text-xl font-semibold">Modern Green Sweater</h1>

                    <div className="space-x-3 text-lg">
                        <span className="line-through text-gray-400">$120</span>
                        <span className="text-red-500 font-semibold">$60</span>
                    </div>

                    {/* Color picker */}
                    <div>
                        <div className="mb-1 text-sm font-medium">Color:</div>
                        <div className="flex gap-2">
                            {colors.map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-6 h-6 rounded cursor-pointer border-2 ${
                                        selectedColor === color ? "border-black" : "border-transparent"
                                    }`}
                                    style={{ backgroundColor: color }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Size picker */}
                    <div>
                        <div className="mb-1 text-sm font-medium">Size:</div>
                        <div className="flex gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    disabled={size === "S"}
                                    className={`w-10 h-8 rounded border text-sm font-medium ${
                                        selectedSize === size ? "bg-black text-white" : "bg-gray-100"
                                    } ${size === "S" ? "opacity-40 cursor-not-allowed" : "hover:border-black"}`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quantity */}
                    <div>
                        <div className="mb-1 text-sm font-medium">Qty:</div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleQtyChange("dec")} className="border px-2">
                                -
                            </button>
                            <span>{quantity}</span>
                            <button onClick={() => handleQtyChange("inc")} className="border px-2">
                                +
                            </button>
                        </div>
                    </div>

                    <p className="text-sm text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.
                    </p>

                    <div className="flex gap-3">
                        <Button type="primary" className="bg-teal-800 w-full" onClick={() => {}}>
                            Add to Cart
                        </Button>
                        <Button className="bg-yellow-400 w-full text-black font-semibold">Check Out</Button>
                    </div>
                </div>
            </div>

            {/* ================= Bottom section (About only) ================= */}
            <div className="px-6 py-8">
                <h2 className="text-lg font-semibold mb-2">About this product</h2>
                <p className="text-sm text-gray-700 mb-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                </p>
                <ul className="list-disc list-inside text-sm text-gray-700">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                </ul>
            </div>

            {/* ================= Similar products ================= */}
            <div className="px-6 py-10 rounded-lg bg-[#f6f3ee]">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Similar products</h2>
                        <p className="text-sm text-gray-600">
                            Browse our most popular products and make your day
                            <br />
                            more beautiful and glorious.
                        </p>
                    </div>

                    <button className="mt-4 mb-4  md:mt-0 border border-[#134e4a] text-[#134e4a] px-5 py-2 rounded hover:bg-[#134e4a] hover:text-white transition">
                        Browse All
                    </button>
                </div>
                <Products initialVisible={4} />
            </div>

            {/* ================= Modals ================= */}
            <Modal
                open={isCartOpen}
                onCancel={() => dispatch(closeCart())}
                footer={null}
                width={800}
                centered
                closable={false}
                styles={{ body: { padding: 0 } }}
            >
                <Cart />
            </Modal>

            <Modal
                open={isLoginOpen}
                onCancel={() => dispatch(closeLogin())}
                footer={null}
                width={320}
                centered
                closable={false}
                styles={{ body: { padding: 0 } }}
            >
                <Login />
            </Modal>

            <Modal
                open={isRegisterOpen}
                onCancel={() => dispatch(closeRegister())}
                footer={null}
                width={420}
                centered
                closable={false}
                styles={{ body: { padding: 0 } }}
            >
                <RegisterPage />
            </Modal>
        </div>
    );
}
