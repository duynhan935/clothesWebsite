import { Space, Input, Select, Button } from "antd";

const { Option } = Select;

const ProductFilter = () => {
  return (
    <Space wrap>
      <Space>
        <span>Brand:</span>
        <Input placeholder="Brand" />
      </Space>
      <Space>
        <span>Product name:</span>
        <Input placeholder="Name" />
      </Space>
      <Space>
        <span>Size:</span>
        <Select placeholder="All" style={{ width: 120 }}>
          <Option value="S">S</Option>
          <Option value="M">M</Option>
          <Option value="L">L</Option>
        </Select>
      </Space>
      <Button type="primary">Query</Button>
      <Button>Reset</Button>
    </Space>
  );
};

export default ProductFilter;
