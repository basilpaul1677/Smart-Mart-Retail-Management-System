import {
    ArrowLeft,
    ShoppingBag,
    MapPin,
    Mail,
    Phone,
    Star
} from "lucide-react";

import {
    Link
} from "react-router-dom";

import {
    useEffect,
    useState
} from "react";

import productService
    from "../../services/productService";

import "./Cartopia.css";


function Cartopia() {


    /*
     * =========================
     * Trending Products State
     * =========================
     */

    const [
        trendingProducts,
        setTrendingProducts
    ] = useState([]);


    const [
        loading,
        setLoading
    ] = useState(true);


    const [
        error,
        setError
    ] = useState(null);


    /*
     * =========================
     * Load Trending Products
     * =========================
     *
     * This API is public.
     *
     * No authentication is required
     * to view trending products.
     *
     * Exactly 3 products are selected
     * randomly from the database.
     *
     * Only name and image are displayed.
     */

    useEffect(

        () => {


            const fetchTrendingProducts =

                async () => {


                    try {


                        setLoading(true);

                        setError(null);


                        /*
                         * Fetch products from database.
                         *
                         * This must call:
                         *
                         * GET /api/products
                         *
                         * which is publicly accessible.
                         */

                        const response =

                            await productService
                                .getAllProducts();


                        /*
                         * ProductController returns:
                         *
                         * List<ProductResponse>
                         *
                         * Therefore response should
                         * directly be an array.
                         */

                        const products =

                            Array.isArray(response)

                                ? response

                                : [];


                        /*
                         * Select exactly 3 random
                         * products from database.
                         *
                         * If database has fewer than
                         * 3 products, show available products.
                         */

                        const randomProducts =

                            [...products]

                                .sort(

                                    () =>

                                        Math.random() -

                                        0.5

                                )

                                .slice(

                                    0,

                                    3

                                );


                        setTrendingProducts(

                            randomProducts

                        );


                    }


                    catch (productError) {


                        console.error(

                            "Failed to load trending products:",

                            productError

                        );


                        setError(

                            "Unable to load trending products."

                        );


                    }


                    finally {


                        setLoading(false);


                    }

                };


            fetchTrendingProducts();


        },

        []

    );


    return (


        <main className="cartopia-page">


            {/* =========================
                Hero Section
            ========================== */}

            <section className="cartopia-hero">


                <div className="cartopia-hero-overlay" />


                <div className="container cartopia-hero-content">


                    <span className="cartopia-eyebrow">


                        <ShoppingBag
                            size={17}
                        />


                        Welcome to Cartopia


                    </span>


                    <h1>


                        Your world of shopping,


                        <span>


                            beautifully curated.


                        </span>


                    </h1>


                    <p>


                        Discover products people are loving

                        and enjoy a simple, seamless shopping

                        experience.


                    </p>


                    <Link

                        to="/products"

                        className="cartopia-hero-button"

                    >


                        Explore Products


                        <ShoppingBag
                            size={18}
                        />


                    </Link>


                </div>


            </section>


            {/* =========================
                Trending Products
            ========================== */}

            <section className="cartopia-trending">


                <div className="container">


                    <div className="cartopia-section-heading">


                        <span>


                            Trending Now


                        </span>


                        <h2>


                            Products people are loving


                        </h2>


                        <p>


                            A glimpse of what's currently

                            trending in our store.


                        </p>


                    </div>


                    {/* =========================
                        Loading State
                    ========================== */}

                    {


                        loading &&


                        <div

                            className=

                                "cartopia-products-grid"

                        >


                            {


                                Array

                                    .from({

                                        length: 3

                                    })

                                    .map(

                                        (

                                            _,

                                            index

                                        ) => (


                                            <div

                                                className=

                                                    "cartopia-product-skeleton"

                                                key={

                                                    index

                                                }

                                            />


                                        )

                                    )


                            }


                        </div>


                    }


                    {/* =========================
                        Error State
                    ========================== */}

                    {


                        !loading &&

                        error &&


                        <div

                            className="cartopia-error"

                        >


                            <p>


                                {error}


                            </p>


                        </div>


                    }


                    {/* =========================
                        Empty State
                    ========================== */}

                    {


                        !loading &&

                        !error &&

                        trendingProducts.length === 0 &&


                        <div

                            className="cartopia-empty"

                        >


                            <p>


                                No products available

                                at the moment.


                            </p>


                        </div>


                    }


                    {/* =========================
                        Trending Product Cards
                    ========================== */}

                    {


                        !loading &&

                        !error &&

                        trendingProducts.length > 0 &&


                        <div

                            className=

                                "cartopia-products-grid"

                        >


                            {


                                trendingProducts.map(

                                    (

                                        product

                                    ) => (


                                        <article

                                            className=

                                                "cartopia-product-card"

                                            key={

                                                product.id

                                            }

                                        >


                                            {/* =========================
                                                Product Image
                                            ========================== */}

                                            <div

                                                className=

                                                    "cartopia-product-image-wrapper"

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

                                                                "cartopia-product-image"

                                                        />


                                                        :


                                                        <div

                                                            className=

                                                                "cartopia-image-placeholder"

                                                        >


                                                            <ShoppingBag

                                                                size={42}

                                                            />


                                                        </div>


                                                }


                                            </div>


                                            {/* =========================
                                                Product Name
                                            ========================== */}

                                            <div

                                                className=

                                                    "cartopia-product-info"

                                            >


                                                <h3>


                                                    {

                                                        product.name

                                                    }


                                                </h3>


                                            </div>


                                        </article>


                                    )

                                )

                            }


                        </div>


                    }


                </div>


            </section>


            {/* =========================
                Reviews
            ========================== */}

            <section className="cartopia-reviews">


                <div className="container">


                    <div className="cartopia-section-heading">


                        <span>


                            Customer Love


                        </span>


                        <h2>


                            Loved by shoppers


                        </h2>


                        <p>


                            A great shopping experience

                            is built around happy customers.


                        </p>


                    </div>


                    <div className="cartopia-review-grid">


                        <article

                            className=

                                "cartopia-review-card"

                        >


                            <div

                                className=

                                    "review-stars"

                            >


                                <Star size={17} />

                                <Star size={17} />

                                <Star size={17} />

                                <Star size={17} />

                                <Star size={17} />


                            </div>


                            <p>


                                "The shopping experience is simple,

                                smooth, and easy to use."


                            </p>


                            <strong>


                                Happy Shopper


                            </strong>


                        </article>


                        <article

                            className=

                                "cartopia-review-card"

                        >


                            <div

                                className=

                                    "review-stars"

                            >


                                <Star size={17} />

                                <Star size={17} />

                                <Star size={17} />

                                <Star size={17} />

                                <Star size={17} />


                            </div>


                            <p>


                                "I found exactly what I was looking

                                for without any hassle."


                            </p>


                            <strong>


                                Verified Customer


                            </strong>


                        </article>


                        <article

                            className=

                                "cartopia-review-card"

                        >


                            <div

                                className=

                                    "review-stars"

                            >


                                <Star size={17} />

                                <Star size={17} />

                                <Star size={17} />

                                <Star size={17} />

                                <Star size={17} />


                            </div>


                            <p>


                                "A clean, modern, and enjoyable

                                shopping experience."


                            </p>


                            <strong>


                                Cartopia Shopper


                            </strong>


                        </article>


                    </div>


                </div>


            </section>


            {/* =========================
                About Cartopia
            ========================== */}

            <section className="cartopia-about">


                <div className="container">


                    <div

                        className=

                            "cartopia-about-card"

                    >


                        <div>


                            <span

                                className=

                                    "cartopia-about-label"

                            >


                                About Cartopia


                            </span>


                            <h2>


                                Shopping should feel simple.


                            </h2>


                            <p>


                                Cartopia is designed to make online

                                shopping simple, convenient, and

                                enjoyable.


                            </p>


                            <p>


                                From discovering products to placing

                                an order, every part of the experience

                                is designed with simplicity in mind.


                            </p>


                        </div>


                        <div

                            className=

                                "cartopia-about-visual"

                        >


                            <ShoppingBag

                                size={70}

                            />


                            <strong>


                                Shop.

                                Discover.

                                Enjoy.


                            </strong>


                        </div>


                    </div>


                </div>


            </section>


            {/* =========================
                Contact
            ========================== */}

            <section className="cartopia-contact">


                <div className="container">


                    <div

                        className=

                            "cartopia-contact-heading"

                    >


                        <span>


                            Get In Touch


                        </span>


                        <h2>


                            We're here to help.


                        </h2>


                    </div>


                    <div

                        className=

                            "cartopia-contact-grid"

                    >


                        <div

                            className=

                                "cartopia-contact-item"

                        >


                            <MapPin

                                size={22}

                            />


                            <div>


                                <strong>


                                    Address


                                </strong>


                                <p>


                                    Cartopia Shopping Center


                                </p>


                            </div>


                        </div>


                        <div

                            className=

                                "cartopia-contact-item"

                        >


                            <Mail

                                size={22}

                            />


                            <div>


                                <strong>


                                    Email


                                </strong>


                                <p>


                                    support@cartopia.com


                                </p>


                            </div>


                        </div>


                        <div

                            className=

                                "cartopia-contact-item"

                        >


                            <Phone

                                size={22}

                            />


                            <div>


                                <strong>


                                    Phone


                                </strong>


                                <p>


                                    +91 98765 43210


                                </p>


                            </div>


                        </div>


                    </div>


                </div>


            </section>


            {/* =========================
                Bottom CTA
            ========================== */}

            <section

                className=

                    "cartopia-bottom-cta"

            >


                <Link

                    to="/products"

                    className=

                        "cartopia-bottom-button"

                >


                    <ShoppingBag

                        size={18}

                    />


                    Continue Shopping


                </Link>


                <Link

                    to="/"

                    className=

                        "cartopia-back-link"

                >


                    <ArrowLeft

                        size={17}

                    />


                    Back to Home


                </Link>


            </section>


        </main>


    );

}


export default Cartopia;