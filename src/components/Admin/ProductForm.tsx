/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ProductForm.tsx
import { Form, Input, InputNumber, Select, DatePicker } from "antd";

interface Props {
  form: any;
  categories: string[];
  onFinish: (values: any) => void;
  initialValues?: any;
}

const ProductForm = ({ form, categories, onFinish }: Props) => (
  <Form form={form} layout="vertical" onFinish={onFinish}>
    <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
      <InputNumber min={0} className="w-full" />
    </Form.Item>
    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
      <Select placeholder="Select category">
        {categories.map((cat) => (
          <Select.Option key={cat} value={cat}>
            {cat}
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item name="releaseDate" label="Release Date" rules={[{ required: true }]}>
      <DatePicker className="w-full" />
    </Form.Item>
  </Form>
);

export default ProductForm;
