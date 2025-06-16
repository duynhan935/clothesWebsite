/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import SocialButton from "../components/Client/SocialButton";

export default function RegisterPage() {
    const onFinish = (values: any) => {
        console.log("Register:", values);
    };

    return (
        <div className="w-full rounded-lg bg-white p-6">
            <h2 className="mb-6 text-center text-2xl font-semibold">Sign Up</h2>

            {/* Social Buttons */}
            <div className="space-y-3 mb-6">
                <SocialButton
                    icon={<FontAwesomeIcon icon={faFacebookF} className="text-blue-600" />}
                    label="Continue with Facebook"
                />
                <SocialButton
                    icon={<FontAwesomeIcon icon={faGoogle} className="text-red-500" />}
                    label="Continue with Google"
                />
                <SocialButton
                    icon={<FontAwesomeIcon icon={faApple} className="text-black" />}
                    label="Continue with Apple"
                />
            </div>

            {/* OR Divider */}
            <div className="my-4 flex items-center gap-4">
                <span className="h-px flex-1 bg-gray-300" />
                <span className="text-xs font-medium text-gray-400">OR</span>
                <span className="h-px flex-1 bg-gray-300" />
            </div>

            {/* Form Login */}
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="firstName" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
                    <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item name="lastName" rules={[{ required: true, message: "Vui lòng nhập họ!" }]}>
                    <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, message: "Vui lòng nhập email!" }]}>
                    <Input placeholder="Email" />
                </Form.Item>
                <Form.Item name="password" rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}>
                    <Input.Password placeholder="Password" />
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
