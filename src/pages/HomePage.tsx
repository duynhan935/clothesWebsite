import { useState } from "react";
import { Button, Select } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../redux/store/store";
import { closeCart } from "../redux/store/cartSlice";
import Cart from "../components/Cart";

import ProductCard from "../components/ProductCard";

import ao1 from "../assets/ao1.svg?url";

const products = [
    {
        id: 1,
        name: "Mid Century Modern T-Shirt",
        category: "Men's Clothes",
        rating: 5,
        price: 110,
        image: ao1,
    },
    {
        id: 2,
        name: "Modern T-Shirt",
        category: "Men's Clothes",
        rating: 5,
        price: 139,
        image: ao1,
    },
    {
        id: 1,
        name: "Mid Century Modern T-Shirt",
        category: "Men's Clothes",
        rating: 5,
        price: 110,
        image: ao1,
    },
    {
        id: 2,
        name: "Modern T-Shirt",
        category: "Men's Clothes",
        rating: 5,
        price: 139,
        image: ao1,
    },
];

const HomePage = () => {
    const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
    const dispatch = useDispatch<AppDispatch>();

    const [visibleCount, setVisibleCount] = useState(16); // số sản phẩm hiển thị tối đa ban đầu

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 4); // mỗi lần bấm loadmore thì sẽ thêm 4 sản phẩm
    };

    const hasMore = visibleCount < products.length; // cờ để xem trong kho còn

    return (
        <div className="min-h-screen px-8 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-0">Find Your Products</h1>

                <div className="flex gap-4 mt-4 md:mt-0">
                    <Button icon={<FilterOutlined />}>All Filters</Button>

                    <Select
                        defaultValue="relevancy"
                        options={[
                            { value: "relevancy", label: "Relevancy" },
                            { value: "price_low_high", label: "Price: Low to High" },
                            { value: "price_high_low", label: "Price: High to Low" },
                        ]}
                    />
                </div>
            </div>

            {/* Lưới sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.slice(0, visibleCount).map((product) => (
                    <ProductCard key={`${product.id}-${product.name}`} product={product} />
                ))}
            </div>

            {hasMore && (
                <div className="flex justify-center mt-10">
                    <Button size="large" onClick={handleLoadMore} className="!bg-[#018294] !text-[#fff]">
                        Load More
                    </Button>
                </div>
            )}

            <Modal open={isCartOpen} onCancel={() => dispatch(closeCart())} footer={null} width={800}>
                <Cart />
            </Modal>
        </div>
    );
};

export default HomePage;
