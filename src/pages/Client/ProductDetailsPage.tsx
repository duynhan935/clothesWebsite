/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { getProductById } from "../../services/api.services";
import { Button, InputNumber, Spin } from "antd";
import Products from "../../components/Client/Products";

const ProductDetailPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<any>(null);
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
                const data = res.data;
                setProduct(data);

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
            const detail = product.productDetailsList.find((d: any) => d.color === selectedColor);

            if (detail) {
                setQuantityAvailable(detail.quantity);

                const firstImg = detail.images?.[0];
                if (firstImg) {
                    setSelectedImage(`data:${firstImg.imageType};base64,${firstImg.imageData}`);
                }
            }
        }
    }, [selectedColor]);

    if (loading || !product) return <Spin fullscreen />;

    const selectedDetail = product.productDetailsList.find((d: any) => d.color === selectedColor);
    const imagesForColor = selectedDetail?.images || [];
    const availableColors = product.productDetailsList.map((detail: any) => detail.color);

    return (
        <>
            <div className="p-10 flex flex-col md:flex-row gap-10">
                {/* Left side: Images */}
                <div className="w-full md:w-1/2">
                    <div className="w-full h-[400px] mb-4">
                        <img src={selectedImage} alt="Main" className="w-full h-full object-cover rounded" />
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                        <ArrowLeftOutlined className="cursor-pointer" />
                        {imagesForColor.map((img: any, idx: number) => {
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

                {/* Right side: Info */}
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
                            {availableColors.map((color: string) => (
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

                    <div>
                        <div className="mb-1 text-sm font-medium">Quantity:</div>
                        <InputNumber
                            min={1}
                            max={quantityAvailable}
                            value={quantityToBuy}
                            onChange={(val) => setQuantityToBuy(val || 1)}
                        />
                        <span className="ml-2 text-gray-500"> (Available: {quantityAvailable})</span>
                    </div>

                    <div>
                        <Button type="primary" size="large">
                            Add to Cart
                        </Button>
                    </div>
                </div>
            </div>

            {/* Similar products */}
            <div className="flex justify-between items-center px-6">
                <h2 className="text-xl font-bold mb-4">Similar products</h2>
            </div>
            <Products initialVisible={4} excludedId={product.id} />
        </>
    );
};

export default ProductDetailPage;
