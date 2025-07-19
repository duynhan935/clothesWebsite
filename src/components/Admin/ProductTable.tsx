// components/ProductTable.tsx
import { Table, Button, Space, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";

interface Product {
    id: string | null;
    name: string;
    description: string;
    price: string;
    category: string;
    releaseDate?: string;
}

interface Props {
    data: Product[];
    loading?: boolean;
    onEdit: (product: Product) => void;
    onDelete: (id: string) => void;
    onViewDetail: (id: string) => void;
    fallbackId?: string | null;
}

const ProductTable = ({ data, loading = false, onEdit, onDelete, onViewDetail, fallbackId }: Props) => {
    const columns: ColumnsType<Product> = [
        { title: "Name", dataIndex: "name" },
        { title: "Description", dataIndex: "description" },
        { title: "Price", dataIndex: "price" },
        { title: "Category", dataIndex: "category" },
        {
            title: "Release Date",
            dataIndex: "releaseDate",
            render: (text: string | undefined) => (text ? dayjs(text).format("DD/MM/YYYY") : ""),
        },
        {
            title: "Actions",
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => onEdit(record)}>
                        Edit
                    </Button>
                    <Button
                        danger
                        onClick={() =>
                            Modal.confirm({
                                title: "Confirm Delete",
                                content: "Are you sure you want to delete this product?",
                                okText: "Yes",
                                cancelText: "No",
                                onOk: () => onDelete(record.id as string),
                            })
                        }
                    >
                        Delete
                    </Button>
                    <Button onClick={() => onViewDetail(record.id === null ? (fallbackId as string) : record.id)}>
                        View Details
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <Table
            rowKey={(record) => record.id ?? Math.random().toString()}
            columns={columns}
            dataSource={data}
            loading={loading}
            pagination={{ position: ["bottomCenter"] }}
        />
    );
};

export default ProductTable;
