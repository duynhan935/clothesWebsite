/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Button, Card } from "antd";

const ProductCard = ({ product }: { product: any }) => {
    const [liked, setLiked] = useState(false);

    return (
        <Card
            className="overflow-hidden rounded-lg transition-all group"
            cover={
                <div className="relative">
                    {/* Hình ảnh sản phẩm */}
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />

                    <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                            type="text"
                            className="w-full !bg-teal-700 !text-white py-2 text-center text-sm font-medium rounded-none hover:bg-teal-800 transition"
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
            }
        >
            <div className="relative">
                <div className="text-xs text-gray-500 mb-3">{product.category}</div>

                <div
                    className="absolute -top-1 right-1 text-xl text-gray-600 hover:text-black cursor-pointer"
                    onClick={() => setLiked(!liked)}
                >
                    {liked ? <HeartFilled /> : <HeartOutlined />}
                </div>

                <div className="text-base font-semibold text-gray-800 mb-3">{product.name}</div>

                <div className="flex items-center justify-between mt-0.5">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <span className="text-yellow-500">★</span>
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-gray-400 text-xs">(18)</span>
                    </div>
                    <span className="font-semibold text-gray-900">${product.price}</span>
                </div>
            </div>
        </Card>
    );
};

export default ProductCard;
