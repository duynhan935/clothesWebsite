/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message } from "antd";
import { getUserDetails, loginUser } from "../services/api.services";
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
            if (error.errorCode === "INACTIVATED_ACCOUNT") {
                message.warning("Tài khoản chưa được xác thực. Đang gửi lại email xác thực...");
                try {
                    await resendConfirmationEmail(values.email);
                    message.success("Đã gửi lại email xác thực. Vui lòng kiểm tra hộp thư.");
                } catch (resendError) {
                    console.error("Failed to resend confirmation email:", resendError);
                    message.error("Không thể gửi lại email xác thực.");
                }
                } else {
                    console.error("Login failed:", error);
                    message.error("Đăng nhập thất bại!");
                
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
