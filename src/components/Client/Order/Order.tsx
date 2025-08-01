/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Steps, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../../../redux/store/cartSlice";
import StepCart from "./Step.Cart";
import StepConfirmation from "./Step.Confirmation";
import type { RootState } from "../../../redux/store/store";
import type { AppDispatch } from "../../../redux/store/store";

import { closeCart } from "../../../redux/store/cartSlice";
import Login from "../../../auth/login";
import RegisterPage from "../../../auth/register";
import { Modal } from "antd";
import { closeLogin } from "../../../redux/store/loginSlice";
import { closeRegister } from "../../../redux/store/registerSlice";
import Cart from "../Cart";
import { fetchAndEnrichCart } from "../../../utils/cartUtils";

const { Step } = Steps;

const Order = () => {
    const dispatch = useDispatch<AppDispatch>();
    const cartItems = useSelector((state: RootState) => state.cart.items) || [];
    const isCartOpen = useSelector((state: RootState) => state.cart.isCartOpen);
    const isLoginOpen = useSelector((state: RootState) => state.login.isLoginOpen);
    const isRegisterOpen = useSelector((state: RootState) => state.register.isRegisterOpen);
    const userId = useSelector((state: RootState) => state.account.user.id);

    const [current, setCurrent] = useState(0);

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const enrichedItems = await fetchAndEnrichCart(userId);

                dispatch(setCart(enrichedItems));
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
                message.error("Không thể tải giỏ hàng từ máy chủ.");
            }
        };

        fetchCart();
    }, [dispatch]);

    const next = () => setCurrent((prev) => prev + 1);
    const prev = () => setCurrent((prev) => prev - 1);

    const steps = [
        {
            title: "Giỏ hàng",
            content: <StepCart cartItems={cartItems} totalPrice={totalPrice} onNext={next} />,
        },
        {
            title: "Xác nhận",
            content: <StepConfirmation cartItems={cartItems} totalPrice={totalPrice} onNext={next} onPrev={prev} />,
        },
    ];

    return (
        <>
            <div className="container mx-auto px-4 py-8">
                <Steps current={current} responsive size="small">
                    {steps.map((item) => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content mt-6 bg-white p-6 rounded-md shadow-sm">{steps[current].content}</div>
            </div>
            <Modal open={isCartOpen} onCancel={() => dispatch(closeCart())} footer={null} width={800}>
                <Cart />
            </Modal>
            <Modal
                open={isLoginOpen}
                onCancel={() => dispatch(closeLogin())}
                footer={null}
                width={400}
                centered
                styles={{ body: { padding: 0 } }}
            >
                <Login />
            </Modal>
            <Modal
                open={isRegisterOpen}
                onCancel={() => dispatch(closeRegister())}
                footer={null}
                width={400}
                centered
                styles={{ body: { padding: 0 } }}
            >
                <RegisterPage />
            </Modal>
        </>
    );
};

export default Order;
