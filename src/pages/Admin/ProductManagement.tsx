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
import ProductForm from "../../components/Admin/ProductForm";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store/store";
import { createProduct as addProductToStore, setProducts } from "../../redux/store/productsSlice";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../components/Admin/ProductTable";
import ProductFilter from "../../components/Admin/ProductFilter";

const { Option } = Select;

function ProductManagement() {
    const products = useSelector((state: RootState) => state.product.products);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [categories, setCategories] = useState<string[]>([]);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const [productId, setProductId] = useState<string | null>(null);
    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            try {
                const [productRes, categoryRes] = await Promise.all([getAllProducts(), getAllCategories()]);
                dispatch(setProducts(productRes.data));
                setCategories(categoryRes.data.data);
            } catch (err) {
                message.error("Failed to fetch product/category data");
            }
        };
        fetch();
    }, [dispatch]);

    useEffect(() => {
        if (editingProduct) {
            form.setFieldsValue({
                ...editingProduct,
                releaseDate: editingProduct.releaseDate ? dayjs(editingProduct.releaseDate) : null,
            });
            setModalOpen(true);
        }
    }, [editingProduct, form]);

    const handleCreate = async (values: any) => {
        try {
            const payload = {
                ...values,
                releaseDate:
                    values.releaseDate instanceof dayjs ? values.releaseDate.format("YYYY-MM-DD") : values.releaseDate,
            };

            const res = await createProduct(payload);

            setProductId(res.data.id);
            dispatch(addProductToStore(res.data));
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
                <ProductFilter />
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

                <ProductTable
                    data={products}
                    loading={loading}
                    onEdit={setEditingProduct}
                    onDelete={handleDelete}
                    onViewDetail={(id) => navigate(`/admin/product/${id}`)}
                    fallbackId={productId}
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
                <ProductForm
                    form={form}
                    categories={categories}
                    onFinish={editingProduct ? (values) => handleUpdate(editingProduct.id, values) : handleCreate}
                    initialValues={editingProduct || {}}
                />
            </Modal>
        </Space>
    );
}

export default ProductManagement;
