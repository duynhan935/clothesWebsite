import { Button, Input, Select, Space, Table } from "antd";

const { Option } = Select;

function OrderManagement() {
    // local state tạm, mock data
    return (
        <Space direction="vertical" size="large" className="w-full">
            {/* Filter panel */}
            <div className="bg-white p-4 rounded shadow">
                <Space wrap>
                    <Space>
                        <span>Order ID:</span>
                        <Input placeholder="Order ID" />
                    </Space>
                    <Space>
                        <span>Customer:</span>
                        <Input placeholder="Customer name" />
                    </Space>
                    <Space>
                        <span>Status:</span>
                        <Select placeholder="All" style={{ width: 120 }}>
                            <Option value="pending">Pending</Option>
                            <Option value="processing">Processing</Option>
                            <Option value="completed">Completed</Option>
                            <Option value="cancelled">Cancelled</Option>
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
                </Space>

                <Table
                    rowKey="id"
                    columns={[
                        { title: "Order ID", dataIndex: "id" },
                        { title: "Customer", dataIndex: "customer" },
                        { title: "Date", dataIndex: "date" },
                        { title: "Total", dataIndex: "total" },
                        { title: "Status", dataIndex: "status" },
                    ]}
                    dataSource={[]} // mock rỗng
                    pagination={{ position: ["bottomCenter"] }}
                />
            </div>
        </Space>
    );
}

export default OrderManagement;
