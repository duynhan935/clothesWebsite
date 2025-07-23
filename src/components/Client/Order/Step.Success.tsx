/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Result } from "antd";

interface StepSuccessProps {
    orderData: {
        id: string;
        status: string;
        [key: string]: any;
    };
}

const StepSuccess = ({ orderData }: StepSuccessProps) => {
    return (
        <Result
            status="success"
            title="Đặt hàng & thanh toán thành công!"
            subTitle={`Mã đơn hàng: ${orderData?.id} | Trạng thái: ${orderData?.status}`}
            extra={[
                <Button type="primary" href="/" key="home">
                    Về trang chủ
                </Button>
            ]}
        />
    );
};

export default StepSuccess;
