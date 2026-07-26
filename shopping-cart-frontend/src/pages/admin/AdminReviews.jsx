import { useEffect, useMemo, useState } from "react";
import {
    ArrowLeft,
    Filter,
    MessageSquare,
    Package,
    RefreshCw,
    Search,
    Star,
    Trash2
} from "lucide-react";
import { Link } from "react-router-dom";

import adminReviewService from "../../services/adminReviewService";
import { useToast } from "../../context/ToastContext";

import "../../styles/admin.css";

function AdminReviews() {
    const { success, error } = useToast();

    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [ratingFilter, setRatingFilter] = useState("ALL");

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [deletingId, setDeletingId] = useState(null);

    useEffect(() => {
        loadReviews();
    }, []);

    const loadReviews = async () => {
        try {
            setLoading(true);
            setPageError("");

            const data = await adminReviewService.getAllReviews();
            setReviews(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to load reviews:", err);
            setPageError(
                err?.response?.data?.message || "Unable to load reviews."
            );
        } finally {
            setLoading(false);
        }
    };

    const openDeleteModal = (review) => {
        setSelectedReview(review);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setSelectedReview(null);
        setShowDeleteModal(false);
    };

    const confirmDelete = async () => {
        if (!selectedReview) return;

        try {
            setDeletingId(selectedReview.id);
            await adminReviewService.deleteReview(selectedReview.id);

            setReviews((current) =>
                current.filter((review) => review.id !== selectedReview.id)
            );

            success("Review deleted successfully");
        } catch (err) {
            console.error("Failed to delete review:", err);
            error(err?.response?.data?.message || "Unable to delete review");
        } finally {
            setDeletingId(null);
            closeDeleteModal();
        }
    };

    const filteredReviews = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();

        return reviews.filter((review) => {
            const matchesSearch =
                !term ||
                [
                    review.productName,
                    review.userName,
                    review.comment
                ]
                    .filter(Boolean)
                    .some((field) =>
                        String(field).toLowerCase().includes(term)
                    );

            const matchesRating =
                ratingFilter === "ALL" ||
                String(review.rating) === ratingFilter;

            return matchesSearch && matchesRating;
        });
    }, [reviews, searchTerm, ratingFilter]);

    const stats = useMemo(() => {
        const totalReviews = reviews.length;
        const averageRating = totalReviews
            ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) / totalReviews
            : 0;
        const fiveStar = reviews.filter((review) => Number(review.rating) === 5).length;
        const lowRated = reviews.filter((review) => Number(review.rating) <= 2).length;

        return {
            totalReviews,
            averageRating,
            fiveStar,
            lowRated
        };
    }, [reviews]);

    const renderStars = (rating) =>
        Array.from({ length: 5 }).map((_, index) => {
            const starValue = index + 1;
            const filled = starValue <= Number(rating || 0);

            return (
                <Star
                    key={starValue}
                    size={14}
                    fill={filled ? "currentColor" : "none"}
                    className={filled ? "admin-star filled" : "admin-star"}
                />
            );
        });

    if (loading) {
        return (
            <div className="dashboard-state">
                <div className="dashboard-loader" />
                <p>Loading reviews...</p>
            </div>
        );
    }

    if (pageError) {
        return (
            <div className="dashboard-error">
                <MessageSquare size={20} />
                <div>
                    <p>{pageError}</p>
                    <button
                        type="button"
                        className="admin-refresh-button"
                        onClick={loadReviews}
                    >
                        <RefreshCw size={16} />
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-reviews-page">
            <div className="admin-page-topbar">
                <div>
                    <Link to="/admin/dashboard" className="profile-back-link">
                        <ArrowLeft size={17} />
                        Back to Dashboard
                    </Link>

                    <p className="dashboard-eyebrow">REVIEW MANAGEMENT</p>
                    <h1>Admin Reviews</h1>
                    <p className="dashboard-subtitle">
                        Monitor customer feedback and moderate product reviews.
                    </p>
                </div>
            </div>

            <div className="admin-stats-row">
                <div className="admin-mini-stat">
                    <span>
                        <MessageSquare size={16} />
                    </span>
                    <div>
                        <strong>{stats.totalReviews}</strong>
                        <small>Total Reviews</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <Star size={16} />
                    </span>
                    <div>
                        <strong>{stats.averageRating.toFixed(1)}</strong>
                        <small>Average Rating</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <Star size={16} />
                    </span>
                    <div>
                        <strong>{stats.fiveStar}</strong>
                        <small>5-Star Reviews</small>
                    </div>
                </div>

                <div className="admin-mini-stat">
                    <span>
                        <Package size={16} />
                    </span>
                    <div>
                        <strong>{stats.lowRated}</strong>
                        <small>Low Ratings</small>
                    </div>
                </div>
            </div>

            <div className="admin-toolbar">
                <div className="admin-search-box">
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder="Search by product, reviewer or comment"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="admin-filter-box">
                    <Filter size={16} />
                    <select
                        value={ratingFilter}
                        onChange={(e) => setRatingFilter(e.target.value)}
                    >
                        <option value="ALL">All Ratings</option>
                        <option value="5">5 Stars</option>
                        <option value="4">4 Stars</option>
                        <option value="3">3 Stars</option>
                        <option value="2">2 Stars</option>
                        <option value="1">1 Star</option>
                    </select>
                </div>
            </div>

            {filteredReviews.length === 0 ? (
                <div className="admin-empty-state">
                    <MessageSquare size={42} />
                    <h3>No reviews found</h3>
                    <p>Try changing the search or rating filter.</p>
                </div>
            ) : (
                <div className="admin-reviews-table-wrap">
                    <table className="admin-reviews-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Reviewer</th>
                                <th>Rating</th>
                                <th>Comment</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredReviews.map((review) => (
                                <tr key={review.id}>
                                    <td>
                                        <div className="admin-review-product">
                                            <strong>{review.productName || `#${review.productId}`}</strong>
                                            <small>Product ID: {review.productId}</small>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="admin-reviewer-cell">
                                            <div className="admin-review-avatar">
                                                {String(review.userName || "U")
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>
                                            <div>
                                                <strong>{review.userName}</strong>
                                                <small>User ID: {review.userId}</small>
                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="admin-review-rating">
                                            {renderStars(review.rating)}
                                            <span>{review.rating}/5</span>
                                        </div>
                                    </td>

                                    <td>
                                        <p className="admin-review-comment">
                                            {review.comment}
                                        </p>
                                    </td>

                                    <td>
                                        {review.createdAt
                                            ? new Date(review.createdAt).toLocaleString("en-IN", {
                                                  dateStyle: "medium",
                                                  timeStyle: "short"
                                              })
                                            : "-"}
                                    </td>

                                    <td>
                                        <button
                                            type="button"
                                            className="admin-action-button delete"
                                            onClick={() => openDeleteModal(review)}
                                        >
                                            <Trash2 size={15} />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {showDeleteModal && selectedReview && (
                <div className="admin-modal-overlay" onClick={closeDeleteModal}>
                    <div
                        className="admin-modal"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="admin-modal-header">
                            <div className="admin-modal-icon">
                                <Trash2 size={20} />
                            </div>

                            <div>
                                <h3>Delete Review</h3>
                                <p>This action cannot be undone.</p>
                            </div>
                        </div>

                        <div className="admin-modal-body">
                            <p>
                                Are you sure you want to delete the review for{" "}
                                <strong>{selectedReview.productName}</strong>?
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
                                disabled={deletingId === selectedReview.id}
                            >
                                {deletingId === selectedReview.id
                                    ? "Deleting..."
                                    : "Delete Review"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminReviews;