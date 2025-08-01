/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, InputNumber, Select, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React from "react";

interface Props {
    form: any;
    fileList: any[];
    setFileList: React.Dispatch<React.SetStateAction<any[]>>;
    onFinish: (values: any) => void;
    submitText: string;
}

const ProductDetailForm = ({ form, fileList, setFileList, onFinish, submitText }: Props) => {
    return (
        <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="color" label="Color" rules={[{ required: true }]}>
                <Select placeholder="Select color">
                    {["Black", "White", "Red", "Blue", "Silver"].map((color) => (
                        <Select.Option key={color} value={color}>
                            {color}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="size" label="Size" rules={[{ required: true }]}>
                <Select placeholder="Select size">
                    {["S", "M", "L", "XL", "XXL"].map((size) => (
                        <Select.Option key={size} value={size}>
                            {size}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                <InputNumber min={1} max={1000} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item label="Images">
                <Upload
                    beforeUpload={(file) => {
                        setFileList((prev) => [...prev, file]);
                        return false;
                    }}
                    onRemove={(file) => {
                        setFileList((prev) => prev.filter((f) => f.name !== file.name));
                    }}
                    fileList={fileList.map((file, index) => ({
                        uid: file.name + index,
                        name: file.name,
                        status: "done",
                    }))}
                    multiple
                >
                    <Button icon={<UploadOutlined />}>Select Files</Button>
                </Upload>
            </Form.Item>

            <Button type="primary" htmlType="submit">
                {submitText}
            </Button>
        </Form>
    );
};

export default ProductDetailForm;
