import { useEffect, useState } from "react";
import {
    ArrowLeft,
    BadgeCheck,
    Calendar,
    Clock3,
    MapPin,
    Package,
    RefreshCw,
    Save,
    ShoppingBag,
    Truck
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import adminOrderService from "../../services/adminOrderService";
import { useToast } from "../../context/ToastContext";

import "../../styles/admin.css";

function AdminOrderDetails() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { success, error } = useToast();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [pageError, setPageError] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        loadOrder();
    }, [orderId]);

    const loadOrder = async () => {
        try {
            setLoading(true);
            setPageError("");

            const data = await adminOrderService.getOrderById(orderId);
            setOrder(data);
            setStatus(data?.status || "");
        } catch (err) {
            console.error("Failed to load order:", err);
            setPageError(
                err?.response?.data?.message || "Unable to load order details."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = (event) => {
        setStatus(event.target.value);
    };

    const handleUpdateStatus = async (event) => {
        event.preventDefault();

        try {
            setSaving(true);

            const updated = await adminOrderService.updateOrderStatus(
                orderId,
                status
            );

            setOrder(updated);
            setStatus(updated?.status || status);

            success("Order status updated successfully");
        } catch (err) {
            console.error("Failed to update order status:", err);
            error(
                err?.response?.data?.message ||
                    "Unable to update order status"
            );
        } finally {
            setSaving(false);
        }
    };

    const formatCurrency = (value) =>
        Number(value || 0).toLocaleString("en-IN");

    const formatDate = (dateValue) => {
        if (!dateValue) return "-";
        return new Date(dateValue).toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short"
        });
    };

    if (loading) {
        return (
            <div className="dashboard-state">
                <div className="dashboard-loader" />
                <p>Loading order details...</p>
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
                        onClick={loadOrder}
                    >
                        <RefreshCw size={16} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-order-details-page">
            <div className="admin-page-topbar">
                <div>
                    <Link to="/admin/orders" className="profile-back-link">
                        <ArrowLeft size={17} />
                        Back to Orders
                    </Link>

                    <p className="dashboard-eyebrow">ORDER DETAILS</p>
                    <h1>Order #{order.orderId}</h1>
                    <p className="dashboard-subtitle">
                        Update status and review customer order information.
                    </p>
                </div>
            </div>

            <div className="admin-order-details-grid">
                <section className="admin-order-card">
                    <div className="admin-order-card-header">
                        <div className="admin-order-icon">
                            <Package size={22} />
                        </div>

                        <div>
                            <h2>Order Summary</h2>
                            <p>Placed on {formatDate(order.createdAt)}</p>
                        </div>
                    </div>

                    <div className="admin-order-summary-grid">
                        <div>
                            <span>Customer</span>
                            <strong>{order.fullName}</strong>
                        </div>

                        <div>
                            <span>Email</span>
                            <strong>{order.email}</strong>
                        </div>

                        <div>
                            <span>Phone</span>
                            <strong>{order.phoneNumber}</strong>
                        </div>

                        <div>
                            <span>Payment Method</span>
                            <strong>{order.paymentMethod}</strong>
                        </div>

                        <div>
                            <span>Total Amount</span>
                            <strong>₹{formatCurrency(order.totalAmount)}</strong>
                        </div>

                        <div>
                            <span>Status</span>
                            <strong className="admin-order-status-badge">
                                {order.status}
                            </strong>
                        </div>
                    </div>
                </section>

                <section className="admin-order-card">
                    <div className="admin-order-card-header">
                        <div className="admin-order-icon">
                            <MapPin size={22} />
                        </div>

                        <div>
                            <h2>Delivery Address</h2>
                            <p>Shipping destination details</p>
                        </div>
                    </div>

                    <div className="admin-address-block">
                        <strong>{order.fullName}</strong>
                        <p>{order.addressLine}</p>
                        <p>
                            {order.city}, {order.state} - {order.postalCode}
                        </p>
                        <p>{order.phoneNumber}</p>
                    </div>
                </section>

                <section className="admin-order-card">
                    <div className="admin-order-card-header">
                        <div className="admin-order-icon">
                            <Truck size={22} />
                        </div>

                        <div>
                            <h2>Update Status</h2>
                            <p>Change order progress</p>
                        </div>
                    </div>

                    <form onSubmit={handleUpdateStatus} className="admin-status-form">
                        <div className="admin-field">
                            <label htmlFor="status">Order Status</label>
                            <select
                                id="status"
                                value={status}
                                onChange={handleStatusChange}
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="CONFIRMED">CONFIRMED</option>
                                <option value="SHIPPED">SHIPPED</option>
                                <option value="DELIVERED">DELIVERED</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="admin-primary-button"
                            disabled={saving}
                        >
                            <Save size={16} />
                            {saving ? "Saving..." : "Update Status"}
                        </button>
                    </form>
                </section>

                <section className="admin-order-card admin-order-items-card">
                    <div className="admin-order-card-header">
                        <div className="admin-order-icon">
                            <ShoppingBag size={22} />
                        </div>

                        <div>
                            <h2>Ordered Items</h2>
                            <p>Products included in this order</p>
                        </div>
                    </div>

                    {order.items?.length > 0 ? (
                        <div className="admin-order-items-list">
                            {order.items.map((item, index) => (
                                <article key={`${item.productId}-${index}`} className="admin-order-item">
                                    <div>
                                        <strong>{item.productName}</strong>
                                        <p>Qty: {item.quantity}</p>
                                    </div>

                                    <div className="admin-order-item-right">
                                        <span>₹{formatCurrency(item.price)}</span>
                                        <small>
                                            Subtotal: ₹{formatCurrency(item.subTotal)}
                                        </small>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="admin-empty-state">
                            <Package size={36} />
                            <h3>No items available</h3>
                            <p>This order currently has no item details loaded.</p>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
}

export default AdminOrderDetails;