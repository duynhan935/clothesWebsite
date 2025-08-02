/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message } from "antd";
import { getUserDetails, loginUser, resendConfirmationEmail } from "../services/api.services";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../redux/store/store";
import { closeLogin } from "../redux/store/loginSlice";
import { doGetProfileAction } from "../redux/store/profileSlice";

export default function LoginPage() {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();

    const onFinish = async (values: any) => {
        try {
            const res = await loginUser(values);

            if (res) {
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
            }

            message.success("Đăng nhập thành công!");
            const userData = getUserDetails(res.data.accessToken);
            dispatch(doGetProfileAction((await userData).data));

            dispatch(closeLogin());
            form.resetFields();
        } catch (error: any) {
            const code = error?.errorCode;

            switch (code) {
                case "INACTIVATED_ACCOUNT":
                    message.warning("Tài khoản chưa được xác thực. Đang gửi lại email xác thực...");
                    try {
                        await resendConfirmationEmail(values.email);
                        message.success("Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư.");
                    } catch (resendError) {
                        console.error("Failed to resend confirmation email:", resendError);
                        message.error("Không thể gửi lại email xác thực.");
                    }
                    break;

                case "BAD_CREDENTIALS":
                    message.error("Tên đăng nhập hoặc mật khẩu không đúng.");
                    break;

                case "AUTHENTICATION_ERROR":
                    message.error("Lỗi xác thực. Vui lòng thử lại.");
                    break;

                case "RESOURCE_NOT_FOUND":
                    message.error("Không tìm thấy tài nguyên liên quan. Vui lòng kiểm tra lại thông tin.");
                    break;

                case "VALIDATION_ERROR":
                    message.error("Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra lại biểu mẫu.");
                    break;

                case "Vi phạm ràng buộc trong sql (duplicate value, foreign key,...)":
                    message.error("Tài khoản đã tồn tại hoặc dữ liệu bị trùng lặp.");
                    break;

                case "SQL_INTEGRITY_CONSTRAINT_VIOLATION":
                    message.error("Dữ liệu không hợp lệ. Có thể đã vi phạm ràng buộc cơ sở dữ liệu.");
                    break;

                case "BAD_PAYMENT_REQUEST":
                    message.error("Yêu cầu thanh toán không hợp lệ.");
                    break;

                case "INTERNAL_SERVER_ERROR":
                    message.error("Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.");
                    break;

                default:
                    console.error("Lỗi không xác định:", error);
                    message.error(error?.message || "Đăng nhập thất bại! Vui lòng thử lại.");
                    break;
            }
        }
    };

    return (
        <div className="w-full rounded-lg bg-white p-6">
            <h2 className="mb-6 text-center text-2xl font-semibold">Sign In</h2>

            {/* Form Login */}
            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
                    <Input placeholder="Email" type="email" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>

                <div className="flex justify-end mb-2">
                    <button type="button" className="text-xs text-violet-600 hover:underline">
                        Forgot password?
                    </button>
                </div>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="bg-violet-600 hover:bg-violet-700">
                        Sign In
                    </Button>
                </Form.Item>
            </Form>

            <p className="mt-4 text-center text-sm">
                Don’t have an account?{" "}
                <button className="font-semibold text-violet-600 hover:underline">Sign Up</button>
            </p>
        </div>
    );
}
