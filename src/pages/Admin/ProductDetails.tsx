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

    const [files, setFiles] = useState<File[]>([]);
    const [editFiles, setEditFiles] = useState<File[]>([]);
    const [oldImages, setOldImages] = useState<any[]>([]);
    const [editingDetail, setEditingDetail] = useState<any | null>(null);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const fetchProduct = async () => {
        try {
            const res = await getProductById(id!);
            setProductDetails(res.data.productDetailsList || []);
        } catch (err) {
            message.error("Failed to fetch product");
        }
    };

    useEffect(() => {
        fetchProduct();
    }, [id]);

    const onAddFinish = async (values: any) => {
        if (files.length === 0) {
            message.error("Please upload at least one image");
            return;
        }

        try {
            await createProductDetail({
                product: {
                    productId: id!,
                    color: values.color,
                    quantity: values.quantity,
                },
                images: files,
            });
            message.success("Added detail successfully!");
            addForm.resetFields();
            setFiles([]);
            fetchProduct();
        } catch (err) {
            message.error("Failed to submit detail");
            console.log("Error submitting detail:", err);
        }
    };

    const handleEdit = async (record: any) => {
        try {
            const res = await getProductDetailsById(record.id);
            const detail = res.data;
            setOldImages(detail.images || []);
            setEditingDetail(detail);
            setEditFiles([]);
            editForm.setFieldsValue({
                color: detail.color,
                quantity: detail.quantity,
            });
            setIsEditModalVisible(true);
        } catch (err) {
            message.error("Failed to fetch detail for editing");
        }
    };

    const onEditFinish = async (values: any) => {
        try {
            if (!editingDetail) return;

            const oldColor = editingDetail.color;
            const oldQuantity = editingDetail.quantity;

            const updatedProduct = {
                productId: id!,
                color: values.color,
                quantity: values.quantity,
            };

            const isColorChanged = values.color !== oldColor;
            const isQuantityChanged = values.quantity !== oldQuantity;
            const isImageChanged = editFiles.length > 0;

            if (!isColorChanged && !isQuantityChanged && !isImageChanged) {
                message.info("No changes detected");
                return;
            }

            let imagesToSend: File[] = [];

            if (isImageChanged) {
                imagesToSend = editFiles;
            } else if (oldImages.length > 0) {
                for (const img of oldImages) {
                    if (img.imageData && img.imageType) {
                        const base64 = img.imageData.includes(",") ? img.imageData.split(",")[1] : img.imageData;
                        const byteString = atob(base64);
                        const ab = new ArrayBuffer(byteString.length);
                        const ia = new Uint8Array(ab);
                        for (let i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                        }
                        const blob = new Blob([ab], { type: img.imageType });
                        const file = new File([blob], img.imageName || "old-image", {
                            type: img.imageType,
                        });
                        imagesToSend.push(file);
                    }
                }
            }

            if (imagesToSend.length === 0) {
                message.error("No images to send");
                return;
            }

            await updateProductDetail(editingDetail.id, {
                product: updatedProduct,
                images: imagesToSend,
            });

            message.success("Updated detail successfully!");
            setEditingDetail(null);
            setEditFiles([]);
            setOldImages([]);
            setIsEditModalVisible(false);
            editForm.resetFields();
            fetchProduct();
        } catch (err) {
            message.error("Failed to update detail");
            console.error("Error updating detail:", err);
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
            key: "image",
            render: (_: any, record: any) =>
                record.images && record.images.length > 0 ? (
                    <Space>
                        {record.images.map((img: any, index: number) => (
                            <img
                                key={index}
                                src={`data:${img.imageType};base64,${img.imageData}`}
                                alt={img.imageName}
                                style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
                            />
                        ))}
                    </Space>
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

                <Form.Item label="Images">
                    <Upload
                        beforeUpload={(file) => {
                            setFiles((prev) => [...prev, file]);
                            return false;
                        }}
                        onRemove={(file) => {
                            setFiles((prev) => prev.filter((f) => f.name !== file.name));
                        }}
                        fileList={files.map((file, index) => ({
                            uid: file.name + index,
                            name: file.name,
                            status: "done",
                        }))}
                        multiple
                    >
                        <Button icon={<UploadOutlined />}>Select Files</Button>
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
                    setEditFiles([]);
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

                    <Form.Item label="Images">
                        <Upload
                            beforeUpload={(file) => {
                                setEditFiles((prev) => [...prev, file]);
                                return false;
                            }}
                            onRemove={(file) => {
                                setEditFiles((prev) => prev.filter((f) => f.name !== file.name));
                            }}
                            fileList={editFiles.map((file, index) => ({
                                uid: file.name + index,
                                name: file.name,
                                status: "done",
                            }))}
                            multiple
                        >
                            <Button icon={<UploadOutlined />}>Select Files</Button>
                        </Upload>
                    </Form.Item>

                    <div className="flex gap-2 justify-end">
                        <Button
                            onClick={() => {
                                setIsEditModalVisible(false);
                                setEditFiles([]);
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
