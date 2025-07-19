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
import ProductDetailForm from "../../components/Admin/ProductDetailsForm";

interface ImageData {
    id: number;
    imageName: string;
    imageType: string;
    imageData: string;
}

interface ProductDetail {
    id: number;
    color: string;
    quantity: number;
    images?: ImageData[];
}

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState<ProductDetail[]>([]);
    const [addForm] = Form.useForm();
    const [editForm] = Form.useForm();

    const [files, setFiles] = useState<File[]>([]);
    const [editFiles, setEditFiles] = useState<File[]>([]);
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
        }
    };

    const handleEdit = async (record: any) => {
        try {
            const res = await getProductDetailsById(record.id);
            const detail = res.data;
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

            const payload: {
                product: typeof updatedProduct;
                images?: File[];
            } = { product: updatedProduct };

            if (isImageChanged) {
                payload.images = editFiles;
            }

            await updateProductDetail(editingDetail.id, payload);

            message.success("Updated detail successfully!");
            setEditingDetail(null);
            setEditFiles([]);
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

            <ProductDetailForm
                form={addForm}
                fileList={files}
                setFileList={setFiles}
                onFinish={onAddFinish}
                submitText="Add Detail"
            />

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
                <ProductDetailForm
                    form={editForm}
                    fileList={editFiles}
                    setFileList={setEditFiles}
                    onFinish={onEditFinish}
                    submitText="Update Detail"
                />
            </Modal>
        </div>
    );
};

export default ProductDetailPage;
