/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Select, Button, Upload, message, Table, InputNumber, Modal, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
    createProductDetail,
    getProductById,
    deleteProductDetail,
    updateProductDetail,
    getProductDetailsById,
} from "../../services/api.services";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState<any[]>([]);
    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();
    const [file, setFile] = useState<File | null>(null);
    const [editFile, setEditFile] = useState<File | null>(null);
    const [editingDetail, setEditingDetail] = useState<any | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const fetchProduct = async () => {
        try {
            const res = await getProductById(id!);
            console.log(res.data.productDetailsList);

            setProductDetails(res.data.productDetailsList || []);
        } catch (err) {
            message.error("Failed to fetch product");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    // Add new detail
    const onAddFinish = async (values: any) => {
        if (!file) {
            message.error("Please upload an image");
            return;
        }

        try {
            await createProductDetail({
                product: {
                    productId: id!,
                    color: values.color,
                    quantity: values.quantity,
                },
                image: file,
            });
            message.success("Added detail successfully!");
            addForm.resetFields();
            setFile(null);
            fetchProduct();
        } catch (err) {
            message.error("Failed to submit detail");
        }
    };

    // Handle edit
    const handleEdit = async (record: any) => {
        try {
            const res = await getProductDetailsById(record.id);
            const detail = res.data;
            setEditingDetail(detail);
            setEditFile(null);

            editForm.setFieldsValue({
                color: detail.color,
                quantity: detail.quantity,
            });

            setIsEditModalVisible(true);
        } catch (err) {
            message.error("Failed to fetch detail for editing");
        }
    };

    // Submit edit
    const onEditFinish = async (values: any) => {
        try {
            if (!editingDetail) return;

            const updatedProduct = {
                productId: id!,
                color: values.color !== editingDetail.color ? values.color : editingDetail.color,
                quantity: values.quantity !== editingDetail.quantity ? values.quantity : editingDetail.quantity,
            };

            let imageToSend: File;

            if (editFile) {
                imageToSend = editFile;
            } else {
                const byteString = atob(editingDetail.imageData);
                const mimeType = editingDetail.imageType;
                const ab = new ArrayBuffer(byteString.length);
                const ia = new Uint8Array(ab);
                for (let i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }
                const blob = new Blob([ab], { type: mimeType });
                imageToSend = new File([blob], editingDetail.imageName || "old-image", { type: mimeType });
            }

            // Gửi dữ liệu
            await updateProductDetail(editingDetail.id, {
                product: updatedProduct,
                image: imageToSend,
            });

            message.success("Updated detail successfully!");
            setEditingDetail(null);
            setEditFile(null);
            setIsEditModalVisible(false);
            editForm.resetFields();
            fetchProduct();
        } catch (err) {
            message.error("Failed to update detail");
        }
    };

    const handleDelete = (id: number) => {
        Modal.confirm({
            title: "Are you sure you want to delete this detail?",
            onOk: async () => {
                try {
                    await deleteProductDetail(id);
                    message.success("Deleted successfully");
                    fetchProduct();
                } catch (err) {
                    message.error("Failed to delete");
                }
            },
        });
    };

    const columns = [
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Image",
            dataIndex: "imageName",
            key: "imageName",
            render: (_: any, record: any) =>
                record.imageData ? (
                    <img
                        src={`data:${record.imageType};base64,${record.imageData}`}
                        alt={record.imageName}
                        style={{ width: 80, height: 80, objectFit: "cover" }}
                    />
                ) : (
                    <span>No image</span>
                ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (_: any, record: any) => (
                <Space>
                    <Button type="link" onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Button danger type="link" onClick={() => handleDelete(record.id)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white rounded shadow">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Product Details for ID: {id}</h2>
                <Button onClick={() => navigate("/admin/products")}>Back to Product List</Button>
            </div>

            <Form form={addForm} layout="vertical" onFinish={onAddFinish}>
                <Form.Item name="color" label="Color" rules={[{ required: true }]}>
                    <Select placeholder="Select color">
                        {["Black", "White", "Red", "Blue", "Silver"].map((color) => (
                            <Select.Option key={color} value={color}>
                                {color}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                    <InputNumber min={1} max={1000} style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item label="Image">
                    <Upload
                        beforeUpload={(file) => {
                            setFile(file);
                            return false;
                        }}
                        showUploadList={{ showRemoveIcon: true }}
                        maxCount={1}
                    >
                        <Button icon={<UploadOutlined />}>Select File</Button>
                    </Upload>
                </Form.Item>

                <Button type="primary" htmlType="submit">
                    Add Detail
                </Button>
            </Form>

            <Table
                dataSource={productDetails}
                columns={columns}
                rowKey="id"
                pagination={false}
                className="mb-6 mt-6"
                locale={{ emptyText: "No data" }}
            />

            <Modal
                open={isEditModalVisible}
                title="Edit Product Detail"
                onCancel={() => {
                    setIsEditModalVisible(false);
                    setEditFile(null);
                    editForm.resetFields();
                }}
                footer={null}
            >
                <Form form={editForm} layout="vertical" onFinish={onEditFinish}>
                    <Form.Item name="color" label="Color" rules={[{ required: true }]}>
                        <Select placeholder="Select color">
                            {["Black", "White", "Red", "Blue", "Silver"].map((color) => (
                                <Select.Option key={color} value={color}>
                                    {color}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
                        <InputNumber min={1} max={1000} style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item label="Image">
                        <Upload
                            beforeUpload={(file) => {
                                setEditFile(file);
                                return false;
                            }}
                            showUploadList={{ showRemoveIcon: true }}
                            maxCount={1}
                        >
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                    </Form.Item>

                    <div className="flex gap-2 justify-end">
                        <Button
                            onClick={() => {
                                setIsEditModalVisible(false);
                                setEditFile(null);
                                editForm.resetFields();
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default ProductDetailPage;
