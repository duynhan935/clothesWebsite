/* eslint-disable no-irregular-whitespace */
import { useState, useEffect } from "react";
import { Button } from "antd";
import ProductCard from "./ProductCard";

import { getAllProducts } from "../../services/api.services";

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    releaseDate: string;
    productDetailsList: Array<{
        id: number;
        image?: string;
        color: string;
        quantity: number;
    }>;
}

interface ProductsProps {
    initialVisible?: number;
    increment?: number;
    excludedId?: string;
}

export default function Products({ initialVisible = 16, increment = 4, excludedId }: ProductsProps) {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [visibleCount, setVisibleCount] = useState(initialVisible);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                let fetchedProducts = res.data;

                if (excludedId) {
                    fetchedProducts = fetchedProducts.filter((p: Product) => p.id !== excludedId);
                }

                setAllProducts(fetchedProducts);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, [excludedId]);

    const handleLoadMore = () => setVisibleCount((v) => v + increment);
    const handleLoadLess = () => setVisibleCount((v) => Math.max(initialVisible, v - increment));

    const hasMore = visibleCount < allProducts.length;
    const hasLess = visibleCount > initialVisible;

    return (
        <>
            {/* Grid lưới sản phẩm */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {allProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Các nút điều khiển */}
            <div className="flex justify-center gap-4 mt-10">
                {hasMore && (
                    <Button size="large" onClick={handleLoadMore} className="!bg-[#018294] !text-[#fff]">
                        Load More
                    </Button>
                )}
                {hasLess && (
                    <Button size="large" onClick={handleLoadLess} className="!bg-gray-400 !text-white">
                        Load Less
                    </Button>
                )}
            </div>
        </>
    );
}
