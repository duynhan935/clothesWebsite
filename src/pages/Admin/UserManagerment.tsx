import { Button, Input, Select, Space, Table } from "antd";

const { Option } = Select;

function UserManagement() {
    /* local state tạm, mock data */
    return (
        <Space direction="vertical" size="large" className="w-full">
            {/* Filter panel */}
            <div className="bg-white p-4 rounded shadow">
                <Space wrap>
                    <Space>
                        <span>Username:</span>
                        <Input placeholder="Username" />
                    </Space>
                    <Space>
                        <span>Email:</span>
                        <Input placeholder="Email" />
                    </Space>
                    <Space>
                        <span>Role:</span>
                        <Select placeholder="All" style={{ width: 120 }}>
                            <Option value="admin">Admin</Option>
                            <Option value="user">User</Option>
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
                        { title: "Username", dataIndex: "username" },
                        { title: "Email", dataIndex: "email" },
                        { title: "Role", dataIndex: "role" },
                    ]}
                    dataSource={[]} // mock rỗng
                    pagination={{ position: ["bottomCenter"] }}
                />
            </div>
        </Space>
    );
}

export default UserManagement;
