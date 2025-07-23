/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { createOrder, getUserDetails, payment } from "../../../services/api.services";
import type { CartItem } from "../Cart";
import { Button, message } from "antd";
import { clearCart } from "../../../redux/store/cartSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store/store";

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
        <div>
            <h3>Xác nhận đơn hàng</h3>
            {!orderId ? (
                <Button type="primary" onClick={handleCreateOrder} loading={loading}>
                    Tạo đơn hàng
                </Button>
            ) : (
                <>
                    <p>Mã đơn hàng: {orderId}</p>
                    <p>Tổng tiền: ${totalPrice}</p>
                    <Button onClick={onPrev}>Quay lại</Button>
                    <Button type="primary" onClick={handlePayment}>
                        Thanh toán
                    </Button>
                </>
            )}
        </div>
    );
};

export default StepConfirmation;
