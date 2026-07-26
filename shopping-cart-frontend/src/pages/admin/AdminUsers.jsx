import { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    Ban,
    CheckCircle2,
    Filter,
    Mail,
    Phone,
    RefreshCw,
    Search,
    Shield,
    User,
    Users
} from "lucide-react";
import { Link } from "react-router-dom";

import adminUserService from "../../services/adminUserService";
import { useToast } from "../../context/ToastContext";

import "../../styles/admin.css";

function AdminUsers() {
    const { success, error } = useToast();

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [processingUserId, setProcessingUserId] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setPageError("");

            const data = await adminUserService.getAllUsers();
            setUsers(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load users:", err);
            setPageError(
                err?.response?.data?.message || "Unable to load users."
            );
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return users.filter((user) => {
            const matchesSearch =
                !term ||
                [
                    user.firstName,
                    user.lastName,
                    user.email,
                    user.phoneNumber,
                    user.role
                ]
                    .filter(Boolean)
                    .some((field) =>
                        String(field).toLowerCase().includes(term)
                    );

            const matchesStatus =
                statusFilter === "ALL" ||
                (statusFilter === "ACTIVE" && user.active) ||
                (statusFilter === "INACTIVE" && !user.active);

            return matchesSearch && matchesStatus;
        });
    }, [users, searchTerm, statusFilter]);

    const stats = useMemo(() => {
        const totalUsers = users.length;
        const activeUsers = users.filter((user) => user.active).length;
        const inactiveUsers = users.filter((user) => !user.active).length;
        const admins = users.filter(
            (user) => String(user.role) === "ROLE_ADMIN"
        ).length;

        return {
            totalUsers,
            activeUsers,
            inactiveUsers,
            admins
        };
    }, [users]);

    const handleActivate = async (userId) => {
        try {
            setProcessingUserId(userId);
            await adminUserService.activateUser(userId);

            setUsers((current) =>
                current.map((user) =>
                    user.id === userId ? { ...user, active: true } : user
                )
            );

            success("User activated successfully");
        } catch (err) {
            console.error("Failed to activate user:", err);
            error(
                err?.response?.data?.message || "Unable to activate user"
            );
        } finally {
            setProcessingUserId(null);
        }
    };

    const handleDeactivate = async (userId) => {
        const confirmAction = window.confirm(
            "Are you sure you want to deactivate this user?"
        );

        if (!confirmAction) return;

        try {
            setProcessingUserId(userId);
            await adminUserService.deactivateUser(userId);

            setUsers((current) =>
                current.map((user) =>
                    user.id === userId ? { ...user, active: false } : user
                )
            );

            success("User deactivated successfully");
        } catch (err) {
            console.error("Failed to deactivate user:", err);
            error(
                err?.response?.data?.message || "Unable to deactivate user"
            );
        } finally {
            setProcessingUserId(null);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-state">
                <div className="dashboard-loader" />
                <p>Loading users...</p>
            </div>
        );
    }

    if (pageError) {
        return (
            <div className="dashboard-error">
                <Users size={20} />
                <div>
                    <p>{pageError}</p>
                    <button
                        type="button"
                        className="admin-refresh-button"
                        onClick={loadUsers}
                    >
                        <RefreshCw size={16} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-users-page">
            <div className="admin-page-topbar">
                <div>
                    <Link to="/admin/dashboard" className="profile-back-link">
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>

                    <p className="dashboard-eyebrow">USER MANAGEMENT</p>
                    <h1>Admin Users</h1>
                    <p className="dashboard-subtitle">
                        View users and manage account access.
                    </p>
                </div>
            </div>

            <div className="admin-stats-row">
                <div className="admin-mini-stat">
                    <span>
                        <Users size={16} />
                    </span>
                    <div>
                        <strong>{stats.totalUsers}</strong>
                        <small>Total Users</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <CheckCircle2 size={16} />
                    </span>
                    <div>
                        <strong>{stats.activeUsers}</strong>
                        <small>Active Users</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <Ban size={16} />
                    </span>
                    <div>
                        <strong>{stats.inactiveUsers}</strong>
                        <small>Inactive Users</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <Shield size={16} />
                    </span>
                    <div>
                        <strong>{stats.admins}</strong>
                        <small>Admins</small>
                    </div>
                </div>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by name, email, phone or role"
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
                        <option value="ALL">All Users</option>
                        <option value="ACTIVE">Active</option>
                        <option value="INACTIVE">Inactive</option>
                    </select>
                </div>
            </div>

            {filteredUsers.length === 0 ? (
                <div className="admin-empty-state">
                    <User size={42} />
                    <h3>No users found</h3>
                    <p>Try changing your search or filter criteria.</p>
                </div>
            ) : (
                <div className="admin-users-table-wrap">
                    <table className="admin-users-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="admin-user-cell">
                                            <div className="admin-user-avatar">
                                                {String(
                                                    user.firstName || "U"
                                                )
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <strong>
                                                    {user.firstName} {user.lastName}
                                                </strong>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="admin-user-info-cell">
                                            <Mail size={14} />
                                            <span>{user.email}</span>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="admin-user-info-cell">
                                            <Phone size={14} />
                                            <span>
                                                {user.phoneNumber || "-"}
                                            </span>
                                        </div>
                                    </td>

                                    <td>
                                        <span className="admin-role-pill">
                                            {user.role || "N/A"}
                                        </span>
                                    </td>

                                    <td>
                                        <span
                                            className={
                                                user.active
                                                    ? "admin-user-status active"
                                                    : "admin-user-status inactive"
                                            }
                                        >
                                            {user.active ? "Active" : "Inactive"}
                                        </span>
                                    </td>

                                    <td>
                                        {user.active ? (
                                            <button
                                                type="button"
                                                className="admin-action-button delete"
                                                onClick={() =>
                                                    handleDeactivate(user.id)
                                                }
                                                disabled={
                                                    processingUserId === user.id
                                                }
                                            >
                                                <Ban size={15} />
                                                {processingUserId === user.id
                                                    ? "Updating..."
                                                    : "Deactivate"}
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="admin-action-button edit"
                                                onClick={() =>
                                                    handleActivate(user.id)
                                                }
                                                disabled={
                                                    processingUserId === user.id
                                                }
                                            >
                                                <CheckCircle2 size={15} />
                                                {processingUserId === user.id
                                                    ? "Updating..."
                                                    : "Activate"}
                                            </button>
                                        )}
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

export default AdminUsers;