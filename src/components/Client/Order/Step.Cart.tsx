/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, List, Typography, Image, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import type { CartItem } from "../Cart";
import { removeItemFromCart } from "../../../services/api.services";
import type { AppDispatch, RootState } from "../../../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, setCart } from "../../../redux/store/cartSlice";
import { fetchAndEnrichCart } from "../../../utils/cartUtils";

const { Title, Text } = Typography;

interface StepCartProps {
    cartItems: CartItem[];
    totalPrice: number;
    onNext: () => void;
}

const StepCart = ({ cartItems, totalPrice, onNext }: StepCartProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const userId = useSelector((state: RootState) => state.account.user.id);

    const handleRemove = async (itemId: number) => {
        try {
            await removeItemFromCart(itemId, userId);
            message.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
            dispatch(removeItem(itemId));
            const enrichedItems = await fetchAndEnrichCart(userId);
            dispatch(setCart(enrichedItems));
        } catch (error) {
            console.error("Error removing item from cart:", error);
            message.error("Không thể xóa sản phẩm khỏi giỏ hàng!");
        }
    };

    return (
        <div style={{ padding: "24px" }}>
            <Title level={3}>🛒 Giỏ hàng của bạn</Title>

            <Divider />

            <List
                itemLayout="horizontal"
                dataSource={cartItems}
                renderItem={(item) => (
                    <List.Item
                        actions={[
                            <Popconfirm
                                title="Xóa sản phẩm này khỏi giỏ hàng?"
                                okText="Xóa"
                                cancelText="Hủy"
                                onConfirm={() => handleRemove(item.id)}
                            >
                                <Button danger icon={<DeleteOutlined />} />
                            </Popconfirm>,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                <Image
                                    width={64}
                                    src={item.img}
                                    alt={item.name}
                                    style={{ objectFit: "cover", borderRadius: "8px" }}
                                    fallback="https://via.placeholder.com/64"
                                />
                            }
                            title={<Text strong>{item.name}</Text>}
                            description={
                                <>
                                    <Text type="secondary">Màu: {item.color}</Text>
                                    <br />
                                    <Text type="secondary">Giá: {item.price!.toLocaleString()} đ</Text>
                                    <br />
                                    <Text type="secondary">Số lượng: {item.quantity}</Text>
                                    <br />
                                    <Text type="secondary">
                                        Tổng: {(item.quantity * item.price!).toLocaleString()} đ
                                    </Text>
                                </>
                            }
                        />
                    </List.Item>
                )}
            />

            <Divider />

            <div style={{ textAlign: "right" }}>
                <Title level={4}>Tổng cộng: {totalPrice.toLocaleString()} đ</Title>
                <Button type="primary" size="large" onClick={onNext} disabled={cartItems.length === 0}>
                    Tiếp tục
                </Button>
            </div>
        </div>
    );
};

export default StepCart;
