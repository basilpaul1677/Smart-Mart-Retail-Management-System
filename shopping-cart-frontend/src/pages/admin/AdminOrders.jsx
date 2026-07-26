import { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    Clock3,
    Eye,
    Filter,
    Package,
    RefreshCw,
    Search,
    ShoppingBag,
    TrendingUp,
    Wallet
} from "lucide-react";
import { Link } from "react-router-dom";

import adminOrderService from "../../services/adminOrderService";
import { useToast } from "../../context/ToastContext";

import "../../styles/admin.css";

function AdminOrders() {
    const { error } = useToast();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            setPageError("");

            const data = await adminOrderService.getAllOrders();
            setOrders(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load orders:", err);
            setPageError(
                err?.response?.data?.message || "Unable to load orders."
            );
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return orders.filter((order) => {
            const matchesSearch =
                !term ||
                [
                    order.orderId,
                    order.fullName,
                    order.email,
                    order.phoneNumber,
                    order.city,
                    order.state,
                    order.status
                ]
                    .filter(Boolean)
                    .some((field) =>
                        String(field).toLowerCase().includes(term)
                    );

            const matchesStatus =
                statusFilter === "ALL" ||
                String(order.status) === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    const stats = useMemo(() => {
        const totalRevenue = orders.reduce(
            (sum, order) => sum + Number(order.totalAmount || 0),
            0
        );

        const pending = orders.filter(
            (order) => String(order.status) === "PENDING"
        ).length;

        return {
            totalOrders: orders.length,
            totalRevenue,
            pending
        };
    }, [orders]);

    const formatCurrency = (value) =>
        Number(value || 0).toLocaleString("en-IN");

    const formatDate = (dateValue) => {
        if (!dateValue) return "-";
        return new Date(dateValue).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    const getStatusClass = (status) =>
        `admin-order-status ${String(status || "").toLowerCase()}`;

    if (loading) {
        return (
            <div className="dashboard-state">
                <div className="dashboard-loader" />
                <p>Loading orders...</p>
            </div>
        );
    }

    if (pageError) {
        return (
            <div className="dashboard-error">
                <ShoppingBag size={20} />
                <div>
                    <p>{pageError}</p>
                    <button
                        type="button"
                        className="admin-refresh-button"
                        onClick={loadOrders}
                    >
                        <RefreshCw size={16} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-orders-page">
            <div className="admin-page-topbar">
                <div>
                    <Link to="/admin/dashboard" className="profile-back-link">
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>

                    <p className="dashboard-eyebrow">ORDER MANAGEMENT</p>
                    <h1>Admin Orders</h1>
                    <p className="dashboard-subtitle">
                        Review all customer orders and track status updates.
                    </p>
                </div>
            </div>

            <div className="admin-stats-row">
                <div className="admin-mini-stat">
                    <span>
                        <Package size={16} />
                    </span>
                    <div>
                        <strong>{stats.totalOrders}</strong>
                        <small>Total Orders</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <Wallet size={16} />
                    </span>
                    <div>
                        <strong>
                            ₹{formatCurrency(stats.totalRevenue)}
                        </strong>
                        <small>Total Revenue</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <Clock3 size={16} />
                    </span>
                    <div>
                        <strong>{stats.pending}</strong>
                        <small>Pending Orders</small>
                    </div>
                </div>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by order id, customer or city"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="admin-filter-box">
                    <Filter size={16} />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All Status</option>
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                    </select>
                </div>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="admin-empty-state">
                    <ShoppingBag size={42} />
                    <h3>No orders found</h3>
                    <p>Try changing your search or filter criteria.</p>
                </div>
            ) : (
                <div className="admin-orders-table-wrap">
                    <table className="admin-orders-table">
                        <thead>
                            <tr>
                                <th>Order</th>
                                <th>Customer</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order.orderId}>
                                    <td>
                                        <strong>#{order.orderId}</strong>
                                    </td>

                                    <td>
                                        <div className="admin-order-customer">
                                            <strong>{order.fullName}</strong>
                                            <small>{order.email}</small>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="admin-order-location">
                                            <span>{order.city}</span>
                                            <small>{order.state}</small>
                                        </div>
                                    </td>

                                    <td>
                                        <span className={getStatusClass(order.status)}>
                                            {order.status}
                                        </span>
                                    </td>

                                    <td>
                                        <strong>
                                            ₹{formatCurrency(order.totalAmount)}
                                        </strong>
                                    </td>

                                    <td>{formatDate(order.createdAt)}</td>

                                    <td>
                                        <Link
                                            to={`/admin/orders/${order.orderId}`}
                                            className="admin-view-link"
                                        >
                                            <Eye size={15} />
                                            View
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default AdminOrders;