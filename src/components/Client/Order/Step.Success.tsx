/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Button, Result } from "antd";

interface StepSuccessProps {
    orderData: {
        id: string;
        status: string;
        redirectUrl?: string;
        [key: string]: any;
    };
}

const StepSuccess = ({ orderData }: StepSuccessProps) => {
    useEffect(() => {
        if (orderData?.redirectUrl) {
            const timer = setTimeout(() => {
                const url = orderData.redirectUrl ?? "/";
                window.location.href = url;
            }, 3000); 

            return () => clearTimeout(timer);
        }
    }, [orderData?.redirectUrl]);

    return (
        <Result
            status="success"
            title="Đặt hàng & thanh toán thành công!"
            subTitle={`Mã đơn hàng: ${orderData?.id} | Trạng thái: ${orderData?.status}`}
            extra={[
                <Button type="primary" href="/" key="home">
                    Về trang chủ
                </Button>,
            ]}
        />
    );
};

export default StepSuccess;
