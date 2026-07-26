import { useEffect, useMemo, useState } from "react";
import {
    AlertTriangle,
    ArrowLeft,
    Filter,
    Package,
    RefreshCw,
    Search,
    ShoppingBag,
    TrendingDown,
    TrendingUp,
    Warehouse
} from "lucide-react";
import { Link } from "react-router-dom";

import productService from "../../services/productService";
import { useToast } from "../../context/ToastContext";

import "../../styles/admin.css";

function AdminInventory() {
    const { error } = useToast();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [stockFilter, setStockFilter] = useState("ALL");

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
            console.error("Failed to load inventory:", err);
            setPageError(
                err?.response?.data?.message || "Unable to load inventory."
            );
        } finally {
            setLoading(false);
        }
    };

    const getStockStatus = (quantity) => {
        const qty = Number(quantity || 0);

        if (qty <= 0) return "OUT_OF_STOCK";
        if (qty <= 10) return "LOW_STOCK";
        return "IN_STOCK";
    };

    const filteredProducts = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return products.filter((product) => {
            const qtyStatus = getStockStatus(product.quantity);

            const matchesSearch =
                !term ||
                [
                    product.name,
                    product.brand,
                    product.category
                ]
                    .filter(Boolean)
                    .some((field) =>
                        String(field).toLowerCase().includes(term)
                    );

            const matchesFilter =
                stockFilter === "ALL" || qtyStatus === stockFilter;

            return matchesSearch && matchesFilter;
        });
    }, [products, searchTerm, stockFilter]);

    const stats = useMemo(() => {
        const inStock = products.filter(
            (p) => getStockStatus(p.quantity) === "IN_STOCK"
        ).length;

        const lowStock = products.filter(
            (p) => getStockStatus(p.quantity) === "LOW_STOCK"
        ).length;

        const outOfStock = products.filter(
            (p) => getStockStatus(p.quantity) === "OUT_OF_STOCK"
        ).length;

        return {
            total: products.length,
            inStock,
            lowStock,
            outOfStock
        };
    }, [products]);

    const formatPrice = (value) =>
        Number(value || 0).toLocaleString("en-IN");

    if (loading) {
        return (
            <div className="dashboard-state">
                <div className="dashboard-loader" />
                <p>Loading inventory...</p>
            </div>
        );
    }

    if (pageError) {
        return (
            <div className="dashboard-error">
                <AlertTriangle size={20} />
                <div>
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
            </div>
        );
    }

    return (
        <div className="admin-inventory-page">
            <div className="admin-page-topbar">
                <div>
                    <Link to="/admin/dashboard" className="profile-back-link">
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>

                    <p className="dashboard-eyebrow">INVENTORY MANAGEMENT</p>
                    <h1>Admin Inventory</h1>
                    <p className="dashboard-subtitle">
                        Track stock levels, identify low inventory, and monitor
                        out-of-stock products.
                    </p>
                </div>

                <Link to="/admin/products" className="admin-primary-link">
                    <ShoppingBag size={16} />
                    Manage Products
                </Link>
            </div>

            <div className="admin-stats-row">
                <div className="admin-mini-stat">
                    <span>
                        <Warehouse size={16} />
                    </span>
                    <div>
                        <strong>{stats.total}</strong>
                        <small>Total Products</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <TrendingUp size={16} />
                    </span>
                    <div>
                        <strong>{stats.inStock}</strong>
                        <small>In Stock</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <TrendingDown size={16} />
                    </span>
                    <div>
                        <strong>{stats.lowStock}</strong>
                        <small>Low Stock</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <Package size={16} />
                    </span>
                    <div>
                        <strong>{stats.outOfStock}</strong>
                        <small>Out of Stock</small>
                    </div>
                </div>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by product name, brand or category"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="admin-filter-box">
                    <Filter size={16} />
                    <select
                        value={stockFilter}
                        onChange={(e) => setStockFilter(e.target.value)}
                    >
                        <option value="ALL">All Stock</option>
                        <option value="IN_STOCK">In Stock</option>
                        <option value="LOW_STOCK">Low Stock</option>
                        <option value="OUT_OF_STOCK">Out of Stock</option>
                    </select>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="admin-empty-state">
                    <Package size={42} />
                    <h3>No inventory items found</h3>
                    <p>Try changing your search or stock filter.</p>
                </div>
            ) : (
                <div className="admin-inventory-table-wrap">
                    <table className="admin-inventory-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Brand</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredProducts.map((product) => {
                                const status = getStockStatus(product.quantity);

                                return (
                                    <tr key={product.id}>
                                        <td>
                                            <div className="admin-inventory-product">
                                                <div className="admin-inventory-thumb">
                                                    {product.imageUrl ? (
                                                        <img
                                                            src={product.imageUrl}
                                                            alt={product.name}
                                                        />
                                                    ) : (
                                                        <Package size={20} />
                                                    )}
                                                </div>
                                                <div>
                                                    <strong>{product.name}</strong>
                                                    <small>
                                                        {product.active
                                                            ? "Active product"
                                                            : "Inactive product"}
                                                    </small>
                                                </div>
                                            </div>
                                        </td>

                                        <td>{product.category || "-"}</td>
                                        <td>{product.brand || "-"}</td>
                                        <td>₹{formatPrice(product.price)}</td>
                                        <td>
                                            <strong>{product.quantity ?? 0}</strong>
                                        </td>
                                        <td>
                                            <span
                                                className={`admin-inventory-status ${status.toLowerCase()}`}
                                            >
                                                {status === "IN_STOCK"
                                                    ? "In Stock"
                                                    : status === "LOW_STOCK"
                                                    ? "Low Stock"
                                                    : "Out of Stock"}
                                            </span>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminInventory;