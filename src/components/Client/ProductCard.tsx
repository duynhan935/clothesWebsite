/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useState } from "react";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Card } from "antd";

const ProductCard = ({ product }: { product: any }) => {
    const [liked, setLiked] = useState(false);

    const img = product?.productDetailsList?.[0]?.images?.[0];
    const imageUrl = img ? `data:${img.imageType};base64,${img.imageData}` : "";

    return (
        <Link to={`/product/${product.id}`} className="block">
            <Card
                className="overflow-hidden rounded-lg transition-all group"
                cover={
                    <div className="relative">
                        <img
                            src={imageUrl}
                            alt={img?.imageName || "Default Image"}
                            style={{ width: 300, height: 300, objectFit: "cover", borderRadius: 8 }}
                        />
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
                        <span className="font-semibold text-gray-900">{product.price.toLocaleString()} ₫</span>
                    </div>
                </div>
            </Card>
        </Link>
    );
};

export default ProductCard;
