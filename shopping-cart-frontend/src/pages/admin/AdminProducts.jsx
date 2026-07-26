import { useEffect, useMemo, useState } from "react";
import {
    AlertTriangle,
    ArrowLeft,
    Edit3,
    Package,
    Plus,
    RefreshCw,
    Search,
    Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

import productService from "../../services/productService";
import { useToast } from "../../context/ToastContext";

import "../../styles/admin.css";

function AdminProducts() {
    const { success, error } = useToast();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        try {
            setLoading(true);
            setPageError("");

            const data = await productService.getAllProducts();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load products:", err);
            setPageError(
                err?.response?.data?.message || "Unable to load products."
            );
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedProduct(null);
        setShowDeleteModal(false);
    };

    const confirmDelete = async () => {
        if (!selectedProduct) return;

        try {
            setDeletingId(selectedProduct.id);

            await productService.deleteProduct(selectedProduct.id);

            setProducts((current) =>
                current.filter(
                    (product) => product.id !== selectedProduct.id
                )
            );

            success("Product deleted successfully");
        } catch (err) {
            console.error("Failed to delete product:", err);
            error(
                err?.response?.data?.message ||
                    "Unable to delete product"
            );
        } finally {
            setDeletingId(null);
            closeDeleteModal();
        }
    };

    const filteredProducts = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        if (!term) return products;

        return products.filter((product) =>
            [
                product.name,
                product.brand,
                product.category,
                product.description
            ]
                .filter(Boolean)
                .some((field) =>
                    field.toLowerCase().includes(term)
                )
        );
    }, [products, searchTerm]);

    const formatPrice = (value) =>
        Number(value || 0).toLocaleString("en-IN");

    if (loading) {
        return (
            <div className="admin-products-state">
                <div className="dashboard-loader" />
                <p>Loading products...</p>
            </div>
        );
    }

    if (pageError) {
        return (
            <div className="dashboard-error">
                <AlertTriangle size={20} />
                <p>{pageError}</p>
                <button
                    type="button"
                    className="admin-refresh-button"
                    onClick={loadProducts}
                >
                    <RefreshCw size={16} />
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="admin-products-page">
            <div className="admin-page-topbar">
                <div>
                    <Link to="/admin/dashboard" className="profile-back-link">
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>

                    <p className="dashboard-eyebrow">PRODUCT MANAGEMENT</p>
                    <h1>Admin Products</h1>
                    <p className="dashboard-subtitle">
                        View all products available in your store.
                    </p>
                </div>

                <Link to="/admin/products/new" className="admin-primary-link">
                    <Plus size={16} />
                    Add Product
                </Link>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, brand or category"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="admin-summary-pill">
                    {filteredProducts.length} Products
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="admin-empty-state">
                    <Package size={42} />
                    <h3>No products found</h3>
                    <p>Try a different search term.</p>
                </div>
            ) : (
                <div className="admin-product-grid">
                    {filteredProducts.map((product) => (
                        <article
                            key={product.id}
                            className="admin-product-card"
                        >
                            <div className="admin-product-image-wrap">
                                {product.imageUrl ? (
                                    <img
                                        src={product.imageUrl}
                                        alt={product.name}
                                        className="admin-product-image"
                                    />
                                ) : (
                                    <div className="admin-product-placeholder">
                                        <Package size={36} />
                                    </div>
                                )}
                            </div>

                            <div className="admin-product-body">
                                <div className="admin-product-meta">
                                    <span>
                                        {product.category || "Uncategorized"}
                                    </span>

                                    <span
                                        className={
                                            product.active
                                                ? "admin-status active"
                                                : "admin-status inactive"
                                        }
                                    >
                                        {product.active
                                            ? "Active"
                                            : "Inactive"}
                                    </span>
                                </div>

                                <h3>{product.name}</h3>

                                <p className="admin-product-brand">
                                    {product.brand || "No brand"}
                                </p>

                                <p className="admin-product-description">
                                    {product.description ||
                                        "No description available"}
                                </p>

                                <div className="admin-product-footer">
                                    <strong>
                                        ₹{formatPrice(product.price)}
                                    </strong>

                                    <span className="admin-stock">
                                        Stock: {product.quantity}
                                    </span>
                                </div>

                                <div className="admin-product-actions">
                                    <Link
                                        to={`/admin/products/${product.id}/edit`}
                                        className="admin-action-button edit"
                                    >
                                        <Edit3 size={15} />
                                        Edit
                                    </Link>

                                    <button
                                        type="button"
                                        className="admin-action-button delete"
                                        onClick={() =>
                                            openDeleteModal(product)
                                        }
                                        disabled={
                                            deletingId === product.id
                                        }
                                    >
                                        <Trash2 size={15} />
                                        {deletingId === product.id
                                            ? "Deleting..."
                                            : "Delete"}
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            {showDeleteModal && selectedProduct && (
                <div
                    className="admin-modal-overlay"
                    onClick={closeDeleteModal}
                >
                    <div
                        className="admin-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="admin-modal-header">
                            <div className="admin-modal-icon">
                                <Trash2 size={20} />
                            </div>

                            <div>
                                <h3>Delete Product</h3>
                                <p>This action cannot be undone.</p>
                            </div>
                        </div>

                        <div className="admin-modal-body">
                            <p>
                                Are you sure you want to delete{" "}
                                <strong>{selectedProduct.name}</strong>?
                            </p>
                        </div>

                        <div className="admin-modal-actions">
                            <button
                                type="button"
                                className="admin-modal-cancel"
                                onClick={closeDeleteModal}
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                className="admin-modal-delete"
                                onClick={confirmDelete}
                                disabled={deletingId === selectedProduct.id}
                            >
                                {deletingId === selectedProduct.id
                                    ? "Deleting..."
                                    : "Delete Product"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminProducts;