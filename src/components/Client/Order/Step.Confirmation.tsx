/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createOrder, getUserDetails, payment } from "../../../services/api.services";
import type { CartItem } from "../Cart";
import { clearCart } from "../../../redux/store/cartSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store/store";
import { Button, message, Card, Typography, Divider, Space } from "antd";
const { Title, Text } = Typography;

interface StepConfirmationProps {
    cartItems: CartItem[];
    totalPrice: number;
    onPrev: () => void;
    onNext: () => void;
    setOrderData: (data: any) => void;
}

const StepConfirmation = ({ totalPrice, onNext, onPrev, setOrderData }: StepConfirmationProps) => {
    const [orderId, setOrderId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const handleCreateOrder = async () => {
        try {
            setLoading(true);
            const res = await createOrder();

            setOrderId(res.data.id);
            setOrderData(res.data);
            message.success("Tạo đơn hàng thành công");
        } catch (err) {
            message.error("Lỗi khi tạo đơn hàng");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async () => {
        try {
            const user = await getUserDetails(localStorage.getItem("accessToken")!);
            const userEmail = user.data.email;

            const res = await payment({
                amount: totalPrice,
                orderId: orderId!,
                orderInfo: `${userEmail}`,
            });
            console.log("Payment response:", res.data);

            dispatch(clearCart());
            message.success("Thanh toán thành công!");
            onNext();
        } catch (err) {
            message.error("Thanh toán thất bại");
            console.error(err);
        }
    };

    return (
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <Title level={3} style={{ textAlign: "center" }}>
                Xác nhận đơn hàng
            </Title>

            <Card bordered style={{ marginTop: 24 }}>
                {!orderId ? (
                    <>
                        <Divider />
                        <div style={{ textAlign: "center" }}>
                            <Button type="primary" size="large" onClick={handleCreateOrder} loading={loading}>
                                Tạo đơn hàng
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <Text strong>Mã đơn hàng:</Text>
                        <Text> {orderId}</Text>
                        <br />
                        <Text strong>Tổng tiền:</Text>
                        <Text type="danger" style={{ fontSize: 16 }}>
                            {" "}
                            {totalPrice.toLocaleString()} đ
                        </Text>
                        <Divider />
                        <Space style={{ justifyContent: "end", display: "flex" }}>
                            <Button onClick={onPrev}>Quay lại</Button>
                            <Button type="primary" onClick={handlePayment}>
                                Thanh toán
                            </Button>
                        </Space>
                    </>
                )}
            </Card>
        </div>
    );
};

export default StepConfirmation;
