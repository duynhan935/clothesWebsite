/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";

export default function RegisterPage() {
    const onFinish = (values: any) => {
        console.log("Register:", values);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký</h2>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Họ và tên" name="name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Mật khẩu" name="password" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Đăng ký
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}
