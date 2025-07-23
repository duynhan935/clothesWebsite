/* eslint-disable @typescript-eslint/no-explicit-any */
interface StepSuccessProps {
    orderData: {
        id: string;
        status: string;
        [key: string]: any;
    };
}

const StepSuccess = ({ orderData }: StepSuccessProps) => {
    return (
        <div>
            <h3>✅ Đặt hàng & thanh toán thành công!</h3>
            <p>Mã đơn hàng: {orderData?.id}</p>
            <p>Trạng thái: {orderData?.status}</p>
        </div>
    );
};

export default StepSuccess;
