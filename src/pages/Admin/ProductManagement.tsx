/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Button, Input, Modal, Select, Space, Table, Form, InputNumber, DatePicker, message } from "antd";
import {
    getAllProducts,
    createProduct,
    getAllCategories,
    updateProduct,
    deleteProduct,
} from "../../services/api.services";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { createProduct as addProductToStore, setProducts } from "../../redux/store/productsSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

function ProductManagement() {
    const products = useSelector((state: RootState) => state.product.products);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await getAllProducts();
                dispatch(setProducts(res.data));
            } catch (err) {
                message.error("Failed to fetch products");
            }
        };

        const fetchCategories = async () => {
            try {
                const res = await getAllCategories();
                setCategories(res.data.data);
            } catch (err) {
                message.error("Failed to fetch categories");
            }
        };

        fetchProducts();
        fetchCategories();
    }, [dispatch]);

    const handleCreate = async (values: any) => {
        try {
            const payload = {
                ...values,
                releaseDate:
                    values.releaseDate instanceof dayjs ? values.releaseDate.format("YYYY-MM-DD") : values.releaseDate,
            };

            await createProduct(payload);
            dispatch(addProductToStore(payload));
            message.success("Created successfully!");
            setModalOpen(false);
            form.resetFields();
        } catch (err) {
            message.error("Create failed!");
            console.error("Error creating product:", err);
        }
    };

    const handleUpdate = async (id: string, data: any) => {
        try {
            await updateProduct(id, data);
            message.success("Product updated successfully!");
            setModalOpen(false);
            form.resetFields();
            setEditingProduct(null);
            const res = await getAllProducts();
            dispatch(setProducts(res.data));
        } catch (err) {
            message.error("Update failed!");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteProduct(id);
            message.success("Product deleted!");
            const res = await getAllProducts();
            dispatch(setProducts(res.data));
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

            {/* Action bar + table */}
            <div className="bg-white p-4 rounded shadow">
                <Space className="mb-4">
                    <Button>Export</Button>
                    <Button>Import</Button>
                    <Button type="primary" onClick={() => setModalOpen(true)}>
                        Add new
                    </Button>
                </Space>

                <Table
                    rowKey="id"
                    columns={[
                        { title: "Name", dataIndex: "name" },
                        { title: "Description", dataIndex: "description" },
                        { title: "Price", dataIndex: "price" },
                        { title: "Category", dataIndex: "category" },
                        {
                            title: "Release Date",
                            dataIndex: "releaseDate",
                            render: (text: string) => {
                                return text ? dayjs(text).format("DD/MM/YYYY") : "";
                            },
                        },
                        {
                            title: "Actions",
                            render: (_, record) => (
                                <Space>
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            setEditingProduct(record);
                                            form.setFieldsValue({
                                                ...record,
                                                releaseDate: dayjs(record.releaseDate),
                                            });
                                            setModalOpen(true);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button type="primary" danger onClick={() => handleDelete(record.id)}>
                                        Delete
                                    </Button>
                                    <Button onClick={() => navigate(`/admin/product/${record.id}`)}>
                                        View Details
                                    </Button>
                                </Space>
                            ),
                        },
                    ]}
                    dataSource={products}
                    loading={loading}
                    pagination={{ position: ["bottomCenter"] }}
                />
            </div>

            {/* Modal add/edit product */}
            <Modal
                title={editingProduct ? "Edit Product" : "Add Product"}
                open={modalOpen}
                onCancel={() => {
                    setModalOpen(false);
                    form.resetFields();
                    setEditingProduct(null);
                }}
                onOk={() => form.submit()}
                okText={editingProduct ? "Update" : "Create"}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={(values) => {
                        const payload = {
                            ...values,
                            releaseDate:
                                values.releaseDate && dayjs.isDayjs(values.releaseDate)
                                    ? values.releaseDate.format("YYYY-MM-DD")
                                    : values.releaseDate,
                        };

                        if (editingProduct) {
                            handleUpdate(editingProduct.id, payload);
                        } else {
                            handleCreate(payload);
                        }
                    }}
                    initialValues={
                        editingProduct
                            ? {
                                  ...editingProduct,
                                  releaseDate: dayjs(editingProduct.releaseDate),
                              }
                            : {}
                    }
                >
                    <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
                        {" "}
                        <Input />{" "}
                    </Form.Item>
                    <Form.Item name="description" label="Description" rules={[{ required: true }]}>
                        {" "}
                        <Input />{" "}
                    </Form.Item>
                    <Form.Item name="price" label="Price" rules={[{ required: true }]}>
                        {" "}
                        <InputNumber min={0} className="w-full" />{" "}
                    </Form.Item>
                    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
                        {" "}
                        <Select placeholder="Select category">
                            {" "}
                            {categories.map((cat) => (
                                <Select.Option key={cat} value={cat}>
                                    {cat}
                                </Select.Option>
                            ))}{" "}
                        </Select>{" "}
                    </Form.Item>
                    <Form.Item name="releaseDate" label="Release Date" rules={[{ required: true }]}>
                        {" "}
                        <DatePicker className="w-full" />{" "}
                    </Form.Item>
                </Form>
            </Modal>
        </Space>
    );
}

export default ProductManagement;
