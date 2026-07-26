import { useEffect, useState } from "react";
import {
    ArrowLeft,
    Package,
    Save,
    Image as ImageIcon,
    Tag,
    Layers3,
    IndianRupee,
    Hash,
    FileText,
    ToggleLeft,
    ToggleRight
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import productService from "../../services/productService";
import { useToast } from "../../context/ToastContext";

import "../../styles/admin.css";

function AdminEditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { success, error } = useToast();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pageError, setPageError] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        imageUrl: "",
        brand: "",
        category: "",
        active: true
    });

    const [formErrors, setFormErrors] = useState({});

    useEffect(() => {
        loadProduct();
    }, [id]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            setPageError("");

            const product = await productService.getProductById(id);

            setFormData({
                name: product.name || "",
                description: product.description || "",
                price: product.price ?? "",
                quantity: product.quantity ?? "",
                imageUrl: product.imageUrl || "",
                brand: product.brand || "",
                category: product.category || "",
                active: product.active ?? true
            });
        } catch (err) {
            console.error("Failed to load product:", err);
            setPageError(
                err?.response?.data?.message || "Unable to load product"
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        setFormErrors((prev) => ({
            ...prev,
            [name]: ""
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = "Product name is required";
        }

        if (!formData.price || Number(formData.price) <= 0) {
            errors.price = "Price must be greater than 0";
        }

        if (
            formData.quantity === "" ||
            Number(formData.quantity) < 0 ||
            Number.isNaN(Number(formData.quantity))
        ) {
            errors.quantity = "Quantity cannot be negative";
        }

        if (formData.imageUrl && formData.imageUrl.length > 500) {
            errors.imageUrl = "Image URL must not exceed 500 characters";
        }

        if (formData.brand && formData.brand.length > 100) {
            errors.brand = "Brand must not exceed 100 characters";
        }

        if (formData.category && formData.category.length > 100) {
            errors.category = "Category must not exceed 100 characters";
        }

        if (formData.description && formData.description.length > 1000) {
            errors.description = "Description must not exceed 1000 characters";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            error("Please correct the highlighted fields");
            return;
        }

        try {
            setSaving(true);

            const payload = {
                ...formData,
                price: Number(formData.price),
                quantity: Number(formData.quantity)
            };

            await productService.updateProduct(id, payload);

            success("Product updated successfully");
            navigate("/admin/products");
        } catch (err) {
            console.error("Failed to update product:", err);
            error(
                err?.response?.data?.message || "Unable to update product"
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-state">
                <div className="dashboard-loader" />
                <p>Loading product...</p>
            </div>
        );
    }

    if (pageError) {
        return (
            <div className="dashboard-error">
                <Package size={20} />
                <p>{pageError}</p>
                <button
                    type="button"
                    className="admin-refresh-button"
                    onClick={loadProduct}
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="admin-products-page">
            <div className="admin-page-topbar">
                <div>
                    <Link to="/admin/products" className="profile-back-link">
                        <ArrowLeft size={17} />
                        Back to Products
                    </Link>

                    <p className="dashboard-eyebrow">PRODUCT MANAGEMENT</p>
                    <h1>Edit Product</h1>
                    <p className="dashboard-subtitle">
                        Update product details, stock, and visibility.
                    </p>
                </div>
            </div>

            <section className="admin-edit-card">
                <div className="admin-edit-card-header">
                    <div className="admin-edit-icon">
                        <Package size={22} />
                    </div>
                    <div>
                        <h2>{formData.name || "Product Details"}</h2>
                        <p>Modify the product information below.</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="admin-edit-form">
                    <div className="admin-edit-grid">
                        <div className="admin-field">
                            <label htmlFor="name">Product Name</label>
                            <div className="admin-input">
                                <Tag size={16} />
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                />
                            </div>
                            {formErrors.name && (
                                <span className="field-error">
                                    {formErrors.name}
                                </span>
                            )}
                        </div>

                        <div className="admin-field">
                            <label htmlFor="brand">Brand</label>
                            <div className="admin-input">
                                <Layers3 size={16} />
                                <input
                                    id="brand"
                                    name="brand"
                                    type="text"
                                    value={formData.brand}
                                    onChange={handleChange}
                                    placeholder="Enter brand"
                                />
                            </div>
                            {formErrors.brand && (
                                <span className="field-error">
                                    {formErrors.brand}
                                </span>
                            )}
                        </div>

                        <div className="admin-field">
                            <label htmlFor="category">Category</label>
                            <div className="admin-input">
                                <Layers3 size={16} />
                                <input
                                    id="category"
                                    name="category"
                                    type="text"
                                    value={formData.category}
                                    onChange={handleChange}
                                    placeholder="Enter category"
                                />
                            </div>
                            {formErrors.category && (
                                <span className="field-error">
                                    {formErrors.category}
                                </span>
                            )}
                        </div>

                        <div className="admin-field">
                            <label htmlFor="price">Price</label>
                            <div className="admin-input">
                                <IndianRupee size={16} />
                                <input
                                    id="price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                />
                            </div>
                            {formErrors.price && (
                                <span className="field-error">
                                    {formErrors.price}
                                </span>
                            )}
                        </div>

                        <div className="admin-field">
                            <label htmlFor="quantity">Quantity</label>
                            <div className="admin-input">
                                <Hash size={16} />
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    min="0"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    placeholder="Enter quantity"
                                />
                            </div>
                            {formErrors.quantity && (
                                <span className="field-error">
                                    {formErrors.quantity}
                                </span>
                            )}
                        </div>

                        <div className="admin-field">
                            <label htmlFor="imageUrl">Image URL</label>
                            <div className="admin-input">
                                <ImageIcon size={16} />
                                <input
                                    id="imageUrl"
                                    name="imageUrl"
                                    type="text"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="Enter image URL"
                                />
                            </div>
                            {formErrors.imageUrl && (
                                <span className="field-error">
                                    {formErrors.imageUrl}
                                </span>
                            )}
                        </div>

                        <div className="admin-field admin-field-full">
                            <label htmlFor="description">Description</label>
                            <div className="admin-input admin-textarea">
                                <FileText size={16} />
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="5"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter product description"
                                />
                            </div>
                            {formErrors.description && (
                                <span className="field-error">
                                    {formErrors.description}
                                </span>
                            )}
                        </div>

                        <div className="admin-field admin-field-toggle">
                            <label className="admin-toggle-label">
                                <span>Product Status</span>
                            </label>

                            <button
                                type="button"
                                className="admin-toggle-button"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        active: !prev.active
                                    }))
                                }
                            >
                                {formData.active ? (
                                    <>
                                        <ToggleRight size={18} />
                                        Active
                                    </>
                                ) : (
                                    <>
                                        <ToggleLeft size={18} />
                                        Inactive
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="admin-edit-actions">
                        <Link
                            to="/admin/products"
                            className="admin-secondary-button"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="admin-primary-button"
                            disabled={saving}
                        >
                            <Save size={16} />
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default AdminEditProduct;