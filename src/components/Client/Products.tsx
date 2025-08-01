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
    searchTerm?: string;
    sortOption?: string;
    selectedCategory?: string | null;
}

export default function Products({
    initialVisible = 16,
    increment = 4,
    excludedId,
    searchTerm = "",
    sortOption = "relevancy",
    selectedCategory = null,
}: ProductsProps) {
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

    const filteredProducts = allProducts
        .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter((product) => (selectedCategory ? product.category === selectedCategory : true))
        .sort((a, b) => {
            if (sortOption === "price_low_high") return a.price - b.price;
            if (sortOption === "price_high_low") return b.price - a.price;
            return 0;
        });

    const hasMore = visibleCount < filteredProducts.length;
    const hasLess = visibleCount > initialVisible;

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

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
