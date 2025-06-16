/* eslint-disable no-irregular-whitespace */
import { useState } from "react";
import { Button } from "antd";
import ProductCard from "../components/ProductCard";

// 🗂️ Mock data & type
import { products as defaultProducts, type Product } from "../data/products";

interface ProductsProps {
    /** Danh sách sản phẩm – mặc định dùng mock */
    products?: Product[];
    /** Số sản phẩm hiển thị ban đầu */
    initialVisible?: number;
    /** Số sản phẩm mỗi lần bấm “Load More” */
    increment?: number;
}

/**
 // eslint-disable-next-line no-irregular-whitespace
 * Hiển thị lưới sản phẩm + nút Load More.
 * Có thể tái sử dụng ở nhiều trang bằng cách truyền props.
 */
export default function Products({ products = defaultProducts, initialVisible = 16, increment = 4 }: ProductsProps) {
    const [visibleCount, setVisibleCount] = useState(initialVisible);

    const handleLoadMore = () => setVisibleCount((v) => v + increment);
    const hasMore = visibleCount < products.length;

    return (
        <>
            {/* Grid lưới sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.slice(0, visibleCount).map((product) => (
                    <ProductCard key={`${product.id}-${product.name}`} product={product} />
                ))}
            </div>

            {/* Nút Load More */}
            {hasMore && (
                <div className="flex justify-center mt-10">
                    <Button size="large" onClick={handleLoadMore} className="!bg-[#018294] !text-[#fff]">
                        Load More
                    </Button>
                </div>
            )}
        </>
    );
}
