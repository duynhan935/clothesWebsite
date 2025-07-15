import { Button, Input, Select, Space, Table } from "antd";

const { Option } = Select;

function ProductManagement() {
    /* local state tạm, mock data */
    return (
        <Space direction="vertical" size="large" className="w-full">
            {/* Filter panel */}
            <div className="bg-white p-4 rounded shadow">
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
            </div>

            {/* Action bar + table placeholder */}
            <div className="bg-white p-4 rounded shadow">
                <Space className="mb-4">
                    <Button>Export</Button>
                    <Button>Import</Button>
                    <Button type="primary">Add new</Button>
                </Space>

                <Table
                    rowKey="id"
                    columns={[
                        { title: "ID", dataIndex: "id" },
                        { title: "Name", dataIndex: "name" },
                        { title: "Brand", dataIndex: "brand" },
                        { title: "Size", dataIndex: "size" },
                    ]}
                    dataSource={[]} // mock rỗng
                    pagination={{ position: ["bottomCenter"] }}
                />
            </div>
        </Space>
    );
};

export default ProductManagement;
