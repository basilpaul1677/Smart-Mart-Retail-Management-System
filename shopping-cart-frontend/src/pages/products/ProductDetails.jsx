import {
    ArrowLeft,
    Minus,
    Plus,
    ShoppingCart,
    Package,
    ShieldCheck,
    Eye,
    Star,
    MessageSquare,
    Send
} from "lucide-react";

import {
    Link,
    useNavigate,
    useParams
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import productService from "../../services/productService";
import reviewService from "../../services/reviewService";

import "./ProductDetails.css";

import {
    useCart
} from "../../context/CartContext";

import {
    useAuth
} from "../../context/AuthContext";

import {
    useToast
} from "../../context/ToastContext";


function ProductDetails() {


    const {
        id
    } = useParams();


    const navigate =
        useNavigate();


    const {
        success,
        error: showToastError
    } = useToast();


    const [
        product,
        setProduct
    ] = useState(null);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState(null);


    const [
        quantity,
        setQuantity
    ] = useState(1);


    const [
        addedToCart,
        setAddedToCart
    ] = useState(false);


    const [
        reviews,
        setReviews
    ] = useState([]);


    const [
        reviewSummary,
        setReviewSummary
    ] = useState({
        averageRating: 0,
        totalReviews: 0
    });


    const [
        reviewsLoading,
        setReviewsLoading
    ] = useState(true);


    const [
        reviewsError,
        setReviewsError
    ] = useState(null);


    const [
        reviewForm,
        setReviewForm
    ] = useState({
        rating: 5,
        comment: ""
    });


    const [
        reviewFormErrors,
        setReviewFormErrors
    ] = useState({});


    const [
        submittingReview,
        setSubmittingReview
    ] = useState(false);


    const {
        addToCart
    } = useCart();


    const {
        isAuthenticated
    } = useAuth();


    const loadProduct = async () => {

        try {

            setLoading(true);

            setError(null);


            const data =
                await productService
                    .getProductById(id);


            setProduct(data);

        }

        catch (err) {

            console.error(
                "Failed to load product:",
                err
            );


            setError(
                err.response?.data?.message ||
                "Unable to load product details."
            );

        }

        finally {

            setLoading(false);

        }

    };


    const loadReviews = async () => {

        try {

            setReviewsLoading(true);

            setReviewsError(null);


            const [
                reviewsResult,
                summaryResult
            ] = await Promise.allSettled([

                reviewService.getProductReviews(id),

                reviewService.getReviewSummary(id)

            ]);


            if (
                reviewsResult.status === "fulfilled"
            ) {
                setReviews(reviewsResult.value || []);
            } else {
                setReviews([]);
                console.error(
                    "Failed to load reviews:",
                    reviewsResult.reason
                );
            }


            if (
                summaryResult.status === "fulfilled"
            ) {
                setReviewSummary(
                    summaryResult.value || {
                        averageRating: 0,
                        totalReviews: 0
                    }
                );
            } else {
                setReviewSummary({
                    averageRating: 0,
                    totalReviews: 0
                });
                console.error(
                    "Failed to load review summary:",
                    summaryResult.reason
                );
            }


            if (
                reviewsResult.status === "rejected" &&
                summaryResult.status === "rejected"
            ) {
                setReviewsError(
                    "Unable to load reviews right now."
                );
            }

        }

        catch (reviewErr) {

            console.error(
                "Unexpected review load error:",
                reviewErr
            );

            setReviewsError(
                "Unable to load reviews right now."
            );

        }

        finally {

            setReviewsLoading(false);

        }

    };


    useEffect(
        () => {
            loadProduct();
        },
        [
            id
        ]
    );


    useEffect(
        () => {
            if (id) {
                loadReviews();
            }
        },
        [
            id
        ]
    );


    const increaseQuantity = () => {


        if (
            product &&
            quantity < product.quantity
        ) {
            setQuantity(
                previousQuantity =>
                    previousQuantity + 1
            );
        }

    };


    const decreaseQuantity = () => {


        if (
            quantity > 1
        ) {
            setQuantity(
                previousQuantity =>
                    previousQuantity - 1
            );
        }

    };


    const handleAddToCart = async () => {


        /*
         * Guest user protection
         */

        if (!isAuthenticated) {

            navigate(
                "/login",
                {
                    state: {
                        from:
                            `/products/${id}`,
                        message:
                            "Please login to add products to your cart."
                    }
                }
            );

            return;

        }


        const successResult =
            await addToCart(
                product,
                quantity
            );


        if (successResult) {
            setAddedToCart(true);
        }

    };


    const validateReviewForm = () => {


        const errors = {};


        if (
            !reviewForm.rating ||
            reviewForm.rating < 1 ||
            reviewForm.rating > 5
        ) {
            errors.rating =
                "Please select a rating from 1 to 5";
        }


        if (
            !reviewForm.comment.trim()
        ) {
            errors.comment =
                "Comment is required";
        } else if (
            reviewForm.comment.trim().length < 5
        ) {
            errors.comment =
                "Comment must contain at least 5 characters";
        }


        setReviewFormErrors(errors);


        return (
            Object.keys(errors).length === 0
        );

    };


    const handleReviewSubmit = async (
        event
    ) => {

        event.preventDefault();


        if (
            !isAuthenticated
        ) {

            navigate(
                "/login",
                {
                    state: {
                        from:
                            `/products/${id}`,
                        message:
                            "Please login to review this product."
                    }
                }
            );

            return;

        }


        if (
            !validateReviewForm()
        ) {
            return;
        }


        try {

            setSubmittingReview(true);


            await reviewService.createReview(
                id,
                {
                    rating: Number(reviewForm.rating),
                    comment: reviewForm.comment.trim()
                }
            );


            success(
                "Review submitted successfully"
            );


            setReviewForm({
                rating: 5,
                comment: ""
            });


            setReviewFormErrors({});


            await loadReviews();

        }

        catch (reviewError) {

            console.error(
                "Failed to submit review:",
                reviewError
            );


            showToastError(
                reviewError?.response?.data?.message ||
                "Unable to submit review"
            );

        }

        finally {

            setSubmittingReview(false);

        }

    };


    const renderStars = (
        rating,
        size = 16
    ) => {

        const roundedRating =
            Math.round(Number(rating || 0));


        return (
            <div className="review-stars">
                {
                    Array.from(
                        { length: 5 }
                    ).map(
                        (
                            _,
                            index
                        ) => {

                            const starValue =
                                index + 1;

                            const isFilled =
                                starValue <=
                                roundedRating;

                            return (
                                <Star
                                    key={
                                        starValue
                                    }
                                    size={
                                        size
                                    }
                                    fill={
                                        isFilled
                                            ? "currentColor"
                                            : "none"
                                    }
                                    className={
                                        isFilled
                                            ? "star-filled"
                                            : "star-empty"
                                    }
                                />
                            );

                        }
                    )
                }
            </div>
        );

    };


    if (loading) {

        return (

            <main
                className=
                    "product-details-page page"
            >

                <div
                    className=
                        "container"
                >

                    <div
                        className=
                            "product-details-loading"
                    >

                        <div
                            className=
                                "details-skeleton-image"
                        />


                        <div
                            className=
                                "details-skeleton-content"
                        >

                            <div
                                className=
                                    "skeleton-line"
                            />


                            <div
                                className=
                                    "skeleton-line skeleton-title"
                            />


                            <div
                                className=
                                    "skeleton-line skeleton-price"
                            />


                            <div
                                className=
                                    "skeleton-line"
                            />


                            <div
                                className=
                                    "skeleton-line"
                            />

                        </div>

                    </div>

                </div>

            </main>

        );

    }


    if (error || !product) {

        return (

            <main
                className=
                    "product-details-page page"
            >

                <div
                    className=
                        "container"
                >

                    <div
                        className=
                            "product-details-error"
                    >

                        <Package
                            size={56}
                        />


                        <h2>

                            Product Not Found

                        </h2>


                        <p>

                            {
                                error ||
                                "This product is no longer available."
                            }

                        </p>


                        <Link
                            to="/products"
                            className=
                                "primary-button"
                        >

                            <ArrowLeft
                                size={18}
                            />

                            Back to Products

                        </Link>

                    </div>

                </div>

            </main>

        );

    }


    const isInStock =
        product.quantity > 0;


    return (

        <main
            className=
                "product-details-page page"
        >

            <div
                className=
                    "container"
            >


                <Link
                    to="/products"
                    className=
                        "back-to-products"
                >

                    <ArrowLeft
                        size={18}
                    />

                    Back to Products

                </Link>


                <section
                    className=
                        "product-details-layout"
                >


                    <div
                        className=
                            "product-details-image-section"
                    >

                        <div
                            className=
                                "product-details-image-wrapper"
                        >

                            {
                                product.imageUrl
                                    ?

                                    <img
                                        src={
                                            product.imageUrl
                                        }
                                        alt={
                                            product.name
                                        }
                                        className=
                                            "product-details-image"
                                    />

                                    :

                                    <div
                                        className=
                                            "product-details-image-placeholder"
                                    >

                                        <Package
                                            size={100}
                                        />

                                    </div>
                            }

                        </div>

                    </div>


                    <div
                        className=
                            "product-details-content"
                    >


                        {
                            product.category &&
                            <span
                                className=
                                    "product-details-category"
                            >
                                {
                                    product.category
                                }
                            </span>
                        }


                        <h1>
                            {
                                product.name
                            }
                        </h1>


                        {
                            product.brand &&
                            <p
                                className=
                                    "product-details-brand"
                            >
                                Brand:
                                <strong>
                                    {
                                        product.brand
                                    }
                                </strong>
                            </p>
                        }


                        <p
                            className=
                                "product-details-description"
                        >
                            {
                                product.description ||
                                "No description available for this product."
                            }
                        </p>


                        <div className="product-rating-summary">
                            <div className="product-rating-score">
                                <strong>
                                    {
                                        Number(
                                            reviewSummary.averageRating || 0
                                        ).toFixed(1)
                                    }
                                </strong>
                                <span>/ 5</span>
                            </div>

                            <div className="product-rating-meta">
                                {
                                    renderStars(
                                        reviewSummary.averageRating,
                                        18
                                    )
                                }

                                <p>
                                    {
                                        Number(
                                            reviewSummary.totalReviews || 0
                                        )
                                    }{" "}
                                    Reviews
                                </p>
                            </div>
                        </div>


                        <div
                            className=
                                "product-details-price"
                        >
                            ₹
                            {
                                Number(
                                    product.price
                                ).toLocaleString(
                                    "en-IN"
                                )
                            }
                        </div>


                        <div
                            className={
                                isInStock
                                    ?
                                    "product-stock in-stock"
                                    :
                                    "product-stock out-of-stock"
                            }
                        >

                            <span
                                className=
                                    "stock-indicator"
                            />


                            {
                                isInStock
                                    ?
                                    `${product.quantity} units available`
                                    :
                                    "Out of Stock"
                            }

                        </div>


                        {
                            isInStock &&
                            <>


                                <div
                                    className=
                                        "quantity-section"
                                >

                                    <span>

                                        Quantity

                                    </span>


                                    <div
                                        className=
                                            "quantity-control"
                                    >

                                        <button
                                            type="button"
                                            onClick={
                                                decreaseQuantity
                                            }
                                            disabled={
                                                quantity === 1
                                            }
                                        >

                                            <Minus
                                                size={16}
                                            />

                                        </button>


                                        <span>
                                            {
                                                quantity
                                            }
                                        </span>


                                        <button
                                            type="button"
                                            onClick={
                                                increaseQuantity
                                            }
                                            disabled={
                                                quantity >=
                                                product.quantity
                                            }
                                        >

                                            <Plus
                                                size={16}
                                            />

                                        </button>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    className=
                                        "add-to-cart-button"
                                    onClick={
                                        handleAddToCart
                                    }
                                >

                                    <ShoppingCart
                                        size={20}
                                    />

                                    {
                                        isAuthenticated
                                            ?
                                            "Add to Cart"
                                            :
                                            "Login to Add to Cart"
                                    }

                                </button>


                                {
                                    addedToCart &&
                                    <button
                                        type="button"
                                        className=
                                            "view-cart-button"
                                        onClick={() =>
                                            navigate(
                                                "/cart"
                                            )
                                        }
                                    >

                                        <Eye
                                            size={20}
                                        />

                                        View Cart

                                    </button>
                                }

                            </>
                        }


                        <div
                            className=
                                "product-trust-features"
                        >

                            <div>

                                <ShieldCheck
                                    size={20}
                                />

                                <span>

                                    Secure Shopping

                                </span>

                            </div>


                            <div>

                                <Package
                                    size={20}
                                />

                                <span>

                                    Quality Products

                                </span>

                            </div>

                        </div>


                        <section className="product-reviews-section">
                            <div className="product-reviews-header">
                                <div>
                                    <span className="product-section-label">
                                        <MessageSquare size={14} />
                                        Customer Reviews
                                    </span>
                                    <h2>Ratings & Reviews</h2>
                                    <p>
                                        Only customers who purchased this product can submit a review.
                                    </p>
                                </div>

                                <div className="product-reviews-summary-card">
                                    <strong>
                                        {
                                            Number(
                                                reviewSummary.averageRating || 0
                                            ).toFixed(1)
                                        }/5
                                    </strong>
                                    <div>
                                        {renderStars(reviewSummary.averageRating, 15)}
                                        <span>
                                            {
                                                Number(
                                                    reviewSummary.totalReviews || 0
                                                )
                                            }{" "}
                                            total reviews
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="product-reviews-body">
                                {reviewsLoading ? (
                                    <div className="product-reviews-loading">
                                        Loading reviews...
                                    </div>
                                ) : reviewsError ? (
                                    <div className="product-reviews-error">
                                        {reviewsError}
                                    </div>
                                ) : reviews.length === 0 ? (
                                    <div className="product-reviews-empty">
                                        No reviews yet. Be the first to review this product after purchase.
                                    </div>
                                ) : (
                                    <div className="product-reviews-list">
                                        {reviews.map((review) => (
                                            <article
                                                key={review.id}
                                                className="product-review-card"
                                            >
                                                <div className="product-review-top">
                                                    <div>
                                                        <strong>{review.userName}</strong>
                                                        <p>
                                                            {new Date(
                                                                review.createdAt
                                                            ).toLocaleString("en-IN", {
                                                                dateStyle: "medium",
                                                                timeStyle: "short"
                                                            })}
                                                        </p>
                                                    </div>

                                                    {renderStars(review.rating, 14)}
                                                </div>

                                                <p className="product-review-comment">
                                                    {review.comment}
                                                </p>
                                            </article>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="product-review-form-card">
                                <div className="product-review-form-header">
                                    <h3>Write a Review</h3>
                                    <p>
                                        Share your experience with this product.
                                    </p>
                                </div>

                                {isAuthenticated ? (
                                    <form onSubmit={handleReviewSubmit} className="product-review-form">
                                        <div className="form-group">
                                            <label>Rating</label>
                                            <div className="review-rating-picker">
                                                {Array.from({ length: 5 }).map((_, index) => {
                                                    const starValue = index + 1;
                                                    const isActive =
                                                        starValue <=
                                                        Number(reviewForm.rating || 0);

                                                    return (
                                                        <button
                                                            key={starValue}
                                                            type="button"
                                                            className={
                                                                isActive
                                                                    ? "review-rating-button active"
                                                                    : "review-rating-button"
                                                            }
                                                            onClick={() =>
                                                                setReviewForm(
                                                                    previous => ({
                                                                        ...previous,
                                                                        rating: starValue
                                                                    })
                                                                )
                                                            }
                                                            aria-label={`Rate ${starValue} star${starValue > 1 ? "s" : ""}`}
                                                        >
                                                            <Star
                                                                size={20}
                                                                fill={
                                                                    isActive
                                                                        ? "currentColor"
                                                                        : "none"
                                                                }
                                                            />
                                                        </button>
                                                    );
                                                })}
                                                <span className="review-rating-value">
                                                    {reviewForm.rating}/5
                                                </span>
                                            </div>
                                            {reviewFormErrors.rating && (
                                                <span className="field-error">
                                                    {reviewFormErrors.rating}
                                                </span>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="reviewComment">
                                                Comment
                                            </label>
                                            <textarea
                                                id="reviewComment"
                                                rows="4"
                                                placeholder="Write your review here..."
                                                value={reviewForm.comment}
                                                onChange={(event) =>
                                                    setReviewForm(previous => ({
                                                        ...previous,
                                                        comment: event.target.value
                                                    }))
                                                }
                                            />
                                            {reviewFormErrors.comment && (
                                                <span className="field-error">
                                                    {reviewFormErrors.comment}
                                                </span>
                                            )}
                                        </div>

                                        <div className="review-form-note">
                                            You can review this product only if you have purchased and received it.
                                        </div>

                                        <button
                                            type="submit"
                                            className="add-to-cart-button review-submit-button"
                                            disabled={submittingReview}
                                        >
                                            <Send size={18} />
                                            {submittingReview ? "Submitting..." : "Submit Review"}
                                        </button>
                                    </form>
                                ) : (
                                    <div className="review-login-box">
                                        <p>
                                            Please login to write a review.
                                        </p>
                                        <button
                                            type="button"
                                            className="add-to-cart-button"
                                            onClick={() =>
                                                navigate(
                                                    "/login",
                                                    {
                                                        state: {
                                                            from: `/products/${id}`,
                                                            message: "Please login to review this product."
                                                        }
                                                    }
                                                )
                                            }
                                        >
                                            Login to Review
                                        </button>
                                    </div>
                                )}
                            </div>
                        </section>

                    </div>

                </section>

            </div>

        </main>

    );

}


export default ProductDetails;