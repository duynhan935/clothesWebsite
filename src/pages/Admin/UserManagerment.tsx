/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Input, Modal, Space, Table, Form, message, Select } from "antd";
import { getAllUsers, updateUser, deleteUser } from "../../services/api.services";

const { Option } = Select;

function UserManagement() {
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [form] = Form.useForm();

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

    const handleUpdate = async (id: string, data: any) => {
        try {
            await updateUser(id, data);
            message.success("User updated successfully!");
            setModalOpen(false);
            form.resetFields();
            setEditingUser(null);
            fetchUsers();
        } catch (err) {
            message.error("Update failed!");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteUser(id);
            message.success("User deleted!");
            fetchUsers();
        } catch (err) {
            message.error("Delete failed!");
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
                        {
                            title: "Actions",
                            render: (_, record) => (
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setEditingUser(record);
                                            form.setFieldsValue(record);
                                            setModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button type="primary" danger onClick={() => handleDelete(record.id)}>
                                        Delete
                                    </Button>
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={users}
                    loading={loading}
                    pagination={{ position: ["bottomCenter"] }}
                />
            </div>

            <Modal
                title="Edit User"
                open={modalOpen}
                onCancel={() => {
                    setModalOpen(false);
                    form.resetFields();
                    setEditingUser(null);
                }}
                onOk={() => form.submit()}
                okText="Update"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        if (editingUser) {
                            handleUpdate(editingUser.id, values);
                        }
                    }}
                >
                    <Form.Item name="username" label="Username" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="address" label="Address" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="role" label="Role" rules={[{ required: true }]}>
                        <Select placeholder="Select role">
                            <Select.Option value="USER">USER</Select.Option>
                            <Select.Option value="ADMIN">ADMIN</Select.Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Space>
    );
}

export default UserManagement;
