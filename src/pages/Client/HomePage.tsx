import { useState, useEffect } from "react";
import { Select, Input, Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../redux/store/store";
import { closeCart } from "../../redux/store/cartSlice";
import { closeLogin } from "../../redux/store/loginSlice";
import { closeRegister } from "../../redux/store/registerSlice";

import Cart from "../../components/Client/Cart";
import Login from "../../auth/login";
import RegisterPage from "../../auth/register";
import Products from "../../components/Client/Products";
import { getAllCategories } from "../../services/api.services";

const HomePage = () => {
    const dispatch = useDispatch<AppDispatch>();

    const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
    const isLoginOpen = useSelector((state: RootState) => state.login.isLoginOpen);
    const isRegisterOpen = useSelector((state: RootState) => state.register.isRegisterOpen);

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("relevancy");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [categories, setCategories] = useState<{ label: string; value: string | null }[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();

                const categoryData = res.data.data.map((cat: string) => ({
                    label: cat,
                    value: cat,
                }));
                setCategories([{ label: "All", value: null }, ...categoryData]);
            } catch (err) {
                console.error("Failed to load categories:", err);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="min-h-screen px-8 py-6">
            {/* Header + Filters */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-0">Find Your Products</h1>

                <div className="flex gap-4 mt-4 md:mt-0 flex-wrap">
                    <Input.Search
                        placeholder="Search by name"
                        allowClear
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{ width: 200 }}
                    />

                    <Select
                        defaultValue="relevancy"
                        style={{ width: 180 }}
                        onChange={setSortOption}
                        options={[
                            { value: "relevancy", label: "Relevancy" },
                            { value: "price_low_high", label: "Price: Low to High" },
                            { value: "price_high_low", label: "Price: High to Low" },
                        ]}
                    />

                    <Select
                        allowClear
                        placeholder="Select Category"
                        style={{ width: 180 }}
                        value={selectedCategory}
                        onChange={(value) => setSelectedCategory(value)}
                        options={categories}
                    />
                </div>
            </div>

            <Products searchTerm={searchTerm} sortOption={sortOption} selectedCategory={selectedCategory} />

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

export default HomePage;
