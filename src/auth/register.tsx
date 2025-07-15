/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input, message } from "antd";
import { registerUser } from "../services/api.services";
import type { AppDispatch } from "../redux/store/store";
import { useDispatch } from "react-redux";
import { closeRegister } from "../redux/store/registerSlice";
import { openLogin } from "../redux/store/loginSlice";

export default function RegisterPage() {
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();

    const onFinish = async (values: any) => {
        const payload = {
            username: values.username,
            password: values.password,
            email: values.email,
            phone: values.phone,
            address: values.address,
        };

        try {
            await registerUser(payload);
            message.success("Đăng ký thành công!");
            dispatch(closeRegister());
            dispatch(openLogin());
            form.resetFields();
        } catch (err: any) {
            console.error("Lỗi khi đăng ký:", err);
            message.error("Đăng ký thất bại!");
        }
    };

    return (
        <div className="w-full rounded-lg bg-white p-6">
            <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>

            <Form layout="vertical" form={form} onFinish={onFinish}>
                <Form.Item name="username" rules={[{ required: true, message: "Vui lòng nhập tên người dùng!" }]}>
                    <Input placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                    <Input.Password placeholder="Password" />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email!" },
                        { type: "email", message: "Email không hợp lệ!" },
                    ]}
                >
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
                    <Input placeholder="Phone Number" />
                </Form.Item>
                <Form.Item name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
                    <Input placeholder="Address" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block className="bg-violet-600 hover:bg-violet-700">
                        Sign Up
                    </Button>
                </Form.Item>
            </Form>

            <p className="mt-4 text-center text-sm">
                Have an account? <button className="font-semibold text-violet-600 hover:underline">Sign In</button>
            </p>
        </div>
    );
}
