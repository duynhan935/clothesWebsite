/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Input, Space, Table, message, Select } from "antd";
import { getAllUsers } from "../../services/api.services";

const { Option } = Select;

function UserManagement() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getAllUsers();
            setUsers(res.data);
        } catch (err) {
            message.error("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

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

            <div className="bg-white p-4 rounded shadow">
                <Space className="mb-4">
                    <Button>Export</Button>
                    <Button>Import</Button>
                </Space>

                <Table
                    locale={{ emptyText: "No data" }}
                    rowKey="id"
                    columns={[
                        { title: "Username", dataIndex: "username" },
                        { title: "Email", dataIndex: "email" },
                        { title: "Phone", dataIndex: "phone" },
                        { title: "Address", dataIndex: "address" },
                        { title: "Role", dataIndex: "role" },
                    ]}
                    dataSource={users}
                    loading={loading}
                    pagination={{ position: ["bottomCenter"] }}
                />
            </div>
        </Space>
    );
}

export default UserManagement;
