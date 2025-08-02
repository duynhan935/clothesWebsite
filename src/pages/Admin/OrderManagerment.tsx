/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Input, Select, Space, Table, Tag } from "antd";
import { getAllOrders } from "../../services/api.services";
import moment from "moment";

const { Option } = Select;

interface ProductInOrder {
    id: number;
    quantity: number;
    productDetailsId: number;
}

interface Order {
    id: string;
    status: string;
    createdAt: string;
    userId: string;
    products: ProductInOrder[];
}

function OrderManagement() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getAllOrders();
                setOrders(res.data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const columns = [
        {
            title: "Order ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Customer",
            dataIndex: "userId",
            key: "userId",
        },
        {
            title: "Date",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (date: string) => moment(date).format("YYYY-MM-DD"),
        },
        {
            title: "Total Quantity",
            key: "total",
            render: (_: any, record: Order) => record.products.reduce((acc, cur) => acc + cur.quantity, 0),
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => {
                let color = "default";
                switch (status) {
                    case "PENDING":
                        color = "orange";
                        break;
                    case "PROCESSING":
                        color = "blue";
                        break;
                    case "COMPLETED":
                        color = "green";
                        break;
                    case "CANCELLED":
                        color = "red";
                        break;
                    default:
                        break;
                }
                return <Tag color={color}>{status}</Tag>;
            },
        },
    ];

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
                            <Option value="PENDING">Pending</Option>
                            <Option value="PROCESSING">Processing</Option>
                            <Option value="COMPLETED">Completed</Option>
                            <Option value="CANCELLED">Cancelled</Option>
                        </Select>
                    </Space>
                    <Button type="primary">Query</Button>
                    <Button>Reset</Button>
                </Space>
            </div>

            {/* Action bar + table */}
            <div className="bg-white p-4 rounded shadow">
                <Space className="mb-4">
                    <Button>Export</Button>
                    <Button>Import</Button>
                </Space>

                <Table
                    loading={loading}
                    rowKey="id"
                    columns={columns}
                    dataSource={orders}
                    pagination={{ position: ["bottomCenter"] }}
                />
            </div>
        </Space>
    );
}

export default OrderManagement;
