/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Button, Input, Select, Space, Table, Tag, DatePicker } from "antd";
import { Link } from "react-router-dom";
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
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Filter states
    const [orderIdFilter, setOrderIdFilter] = useState<string>("");
    const [customerFilter, setCustomerFilter] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [dateFilter, setDateFilter] = useState<moment.Moment | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await getAllOrders();
                setOrders(res.data);
                setFilteredOrders(res.data);
            } catch (err) {
                console.error("Failed to fetch orders", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Filter logic
    useEffect(() => {
        let filtered = [...orders];

        // Filter by Order ID
        if (orderIdFilter) {
            filtered = filtered.filter((order) => order.id.toLowerCase().includes(orderIdFilter.toLowerCase()));
        }

        // Filter by Customer ID
        if (customerFilter) {
            filtered = filtered.filter((order) => order.userId.toLowerCase().includes(customerFilter.toLowerCase()));
        }

        // Filter by Status
        if (statusFilter) {
            filtered = filtered.filter((order) => order.status === statusFilter);
        }

        // Filter by Date
        if (dateFilter) {
            const targetDate = dateFilter.format("YYYY-MM-DD");
            filtered = filtered.filter((order) => {
                const orderDate = moment(order.createdAt).format("YYYY-MM-DD");
                return orderDate === targetDate;
            });
        }

        setFilteredOrders(filtered);
    }, [orders, orderIdFilter, customerFilter, statusFilter, dateFilter]);

    const handleQuery = () => {
        // Filter is handled automatically by useEffect
    };

    const handleReset = () => {
        setOrderIdFilter("");
        setCustomerFilter("");
        setStatusFilter("");
        setDateFilter(null);
    };

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
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: Order) => (
                <Link to={`/admin/order/${record.id}`}>
                    <Button type="primary" size="small">
                        View Details
                    </Button>
                </Link>
            ),
        },
    ];

    return (
        <Space direction="vertical" size="large" className="w-full">
            {/* Filter panel */}
            <div className="bg-white p-4 rounded shadow">
                <Space wrap>
                    <Space>
                        <span>Order ID:</span>
                        <Input
                            placeholder="Order ID"
                            value={orderIdFilter}
                            onChange={(e) => setOrderIdFilter(e.target.value)}
                        />
                    </Space>
                    <Space>
                        <span>Customer:</span>
                        <Input
                            placeholder="Customer ID"
                            value={customerFilter}
                            onChange={(e) => setCustomerFilter(e.target.value)}
                        />
                    </Space>
                    <Space>
                        <span>Status:</span>
                        <Select
                            placeholder="All"
                            style={{ width: 120 }}
                            value={statusFilter || undefined}
                            onChange={(value) => setStatusFilter(value || "")}
                            allowClear
                        >
                            <Option value="PENDING">Pending</Option>
                            <Option value="PROCESSING">Processing</Option>
                            <Option value="COMPLETED">Completed</Option>
                            <Option value="CANCELLED">Cancelled</Option>
                        </Select>
                    </Space>
                    <Space>
                        <span>Date:</span>
                        <DatePicker
                            placeholder="Select date"
                            value={dateFilter}
                            onChange={(date) => setDateFilter(date)}
                            format="YYYY-MM-DD"
                        />
                    </Space>
                    <Button type="primary" onClick={handleQuery}>
                        Query
                    </Button>
                    <Button onClick={handleReset}>Reset</Button>
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
                    dataSource={filteredOrders}
                    pagination={{ position: ["bottomCenter"] }}
                />
            </div>
        </Space>
    );
}

export default OrderManagement;
