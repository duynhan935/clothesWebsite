import { useState } from "react";
import { Button, Input, Rate, Modal } from "antd";
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
import ReviewsGrid from "../../components/Client/Reviews";

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
                    <div
                        className="w-[300px] h-[350px] rounded border border-gray-200"
                        style={{ backgroundColor: selectedImage }}
                    />

                    <div className="flex items-center gap-2 mt-4">
                        <ArrowLeftOutlined className="cursor-pointer" />
                        {thumbnails.map((color, idx) => (
                            <div
                                key={idx}
                                onClick={() => setSelectedImage(color)}
                                className={`w-14 h-14 border ${selectedImage === color ? "border-black" : "border-transparent"} cursor-pointer`}
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

                    <div className="flex items-center gap-2 text-yellow-500">
                        <span className="text-lg">★</span>
                        <span className="text-sm text-black">5.0 (37)</span>
                    </div>

                    {/* Color picker */}
                    <div>
                        <div className="mb-1 text-sm font-medium">Color:</div>
                        <div className="flex gap-2">
                            {colors.map((color) => (
                                <div
                                    key={color}
                                    onClick={() => setSelectedColor(color)}
                                    className={`w-6 h-6 rounded cursor-pointer border-2 ${selectedColor === color ? "border-black" : "border-transparent"}`}
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
                                    className={`w-10 h-8 rounded border text-sm font-medium ${selectedSize === size ? "bg-black text-white" : "bg-gray-100"} ${size === "S" ? "opacity-40 cursor-not-allowed" : "hover:border-black"}`}
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
                        labore et dolore magna aliqua. Ut enim ad minim veniam,
                    </p>

                    <div className="flex gap-3">
                        <Button type="primary" className="bg-teal-800 w-full" onClick={() => {}}>
                            Add to Cart
                        </Button>
                        <Button className="bg-yellow-400 w-full text-black font-semibold">Check Out</Button>
                    </div>
                </div>
            </div>

            {/* ================= Bottom section ================= */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-6 py-8">
                {/* About & rating summary */}
                <div className="md:col-span-2 space-y-4">
                    <h2 className="text-lg font-semibold">About this product</h2>
                    <p className="text-sm text-gray-700">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam.
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                        <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit</li>
                    </ul>
                    <p className="text-sm text-gray-600">
                        <strong>Note:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    {/* Rating distribution */}
                    <h2 className="text-lg font-semibold mt-8">Customer Reviews</h2>
                    <div className="text-sm text-yellow-500 flex items-center gap-2">
                        <Rate disabled defaultValue={5} />
                        <span className="text-black">77 Reviews</span>
                    </div>
                    <div className="space-y-2 mt-4">
                        {[5, 4, 3, 2, 1].map((star, index) => {
                            const counts = [37, 20, 12, 8, 0];
                            return (
                                <div key={star} className="flex items-center gap-2 text-sm">
                                    <span>{star} Stars</span>
                                    <div className="flex-1 bg-gray-300 h-2 rounded overflow-hidden">
                                        <div
                                            className="bg-gray-700 h-full"
                                            style={{ width: `${(counts[index] / 77) * 100}%` }}
                                        />
                                    </div>
                                    <span>{counts[index]}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Submit review */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold">How would you rate this?</h2>

                    <div>
                        <Rate defaultValue={5} />
                    </div>

                    <div>
                        <Input placeholder="Write a summary of your review" />
                    </div>

                    <div>
                        <Input.TextArea placeholder="Tell us what do you think" rows={4} />
                    </div>

                    <div>
                        <Button type="primary" className="bg-green-700 text-white">
                            Submit Review
                        </Button>
                    </div>
                </div>
            </div>

            {/* ================= Similar products & reviews grid ================= */}
            <section className="mt-16 px-6">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                <ReviewsGrid />
            </section>

            <div className="mt-20 px-6 py-10 rounded-lg bg-[#f6f3ee]">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2">Similar products</h2>
                        <p className="text-sm text-gray-600">
                            Browse our most popular products and make your day
                            <br />
                            more beautiful and glorious.
                        </p>
                    </div>

                    <button className="mt-4 md:mt-0 border border-[#134e4a] text-[#134e4a] px-5 py-2 rounded hover:bg-[#134e4a] hover:text-white transition">
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
