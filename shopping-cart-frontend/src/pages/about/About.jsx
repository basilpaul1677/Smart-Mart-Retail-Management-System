import {

    ArrowRight,

    ShoppingBag,

    Star,

    MapPin,

    Mail,

    Phone,

    Clock,

    ShieldCheck,

    Truck,

    RotateCcw,

    Sparkles

} from "lucide-react";


import {

    Link

} from "react-router-dom";


import "./About.css";


function About() {


    const featuredProducts = [


        {

            id: 1,

            name: "Premium Running Shoes",

            category: "Sports & Fitness",

            image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",

            badge: "Best Seller"

        },


        {

            id: 2,

            name: "Smart Fitness Watch",

            category: "Electronics",

            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",

            badge: "Trending"

        },


        {

            id: 3,

            name: "Travel Backpack",

            category: "Travel",

            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",

            badge: "Popular"

        }

    ];


    const reviews = [


        {

            name: "Aarav Menon",

            role: "Verified Customer",

            rating: 5,

            review:

                "Cartopia has completely changed the way I shop online. The experience is simple, fast, and beautifully designed."

        },


        {

            name: "Ananya Sharma",

            role: "Verified Customer",

            rating: 5,

            review:

                "The product experience is smooth from browsing to checkout. I especially love the clean and modern shopping interface."

        },


        {

            name: "Rahul Nair",

            role: "Verified Customer",

            rating: 4,

            review:

                "Great collection of products and a very reliable shopping experience. Cartopia is definitely becoming my preferred store."

        }

    ];


    return (


        <main className="about-page">


            {/* =========================
                Hero Section
            ========================== */}


            <section className="about-hero">


                <div className="about-hero-background">


                    <div className="about-glow about-glow-one" />


                    <div className="about-glow about-glow-two" />


                </div>


                <div className="container about-hero-content">


                    <div className="about-hero-text">


                        <span className="about-eyebrow">


                            <Sparkles size={16} />


                            Welcome to Cartopia


                        </span>


                        <h1>


                            More than a store.


                            <span>

                                A better way to shop.

                            </span>


                        </h1>


                        <p>


                            Cartopia brings together quality products,

                            seamless technology, and a delightful shopping

                            experience designed for modern customers.


                        </p>


                        <div className="about-hero-actions">


                            <Link


                                to="/products"


                                className="about-primary-button"


                            >


                                Start Shopping


                                <ArrowRight size={18} />


                            </Link>


                            <a


                                href="#contact"


                                className="about-secondary-button"


                            >


                                Contact Us


                            </a>


                        </div>


                    </div>


                    <div className="about-hero-visual">


                        <div className="floating-product-card card-one">


                            <ShoppingBag size={22} />


                            <div>


                                <strong>

                                    10K+

                                </strong>


                                <span>

                                    Happy Shoppers

                                </span>


                            </div>


                        </div>


                        <div className="about-main-orb">


                            <ShoppingBag size={88} />


                            <span>

                                CARTOPIA

                            </span>


                        </div>


                        <div className="floating-product-card card-two">


                            <Star size={22} />


                            <div>


                                <strong>

                                    4.9/5

                                </strong>


                                <span>

                                    Customer Rating

                                </span>


                            </div>


                        </div>


                    </div>


                </div>


            </section>


            {/* =========================
                About Section
            ========================== */}


            <section className="about-story">


                <div className="container about-story-grid">


                    <div className="story-content">


                        <span className="section-label">

                            Our Story

                        </span>


                        <h2>


                            Shopping should feel


                            <span>

                                effortless.

                            </span>


                        </h2>


                        <p>


                            Cartopia was created with a simple idea:

                            online shopping should be easy, transparent,

                            and enjoyable.


                        </p>


                        <p>


                            From discovering the right product to

                            completing your purchase, every part of the

                            Cartopia experience is designed with the

                            customer in mind.


                        </p>


                        <div className="story-highlights">


                            <div>


                                <ShieldCheck size={22} />


                                <span>

                                    Secure Shopping

                                </span>


                            </div>


                            <div>


                                <Truck size={22} />


                                <span>

                                    Reliable Delivery

                                </span>


                            </div>


                            <div>


                                <RotateCcw size={22} />


                                <span>

                                    Easy Returns

                                </span>


                            </div>


                        </div>


                    </div>


                    <div className="story-visual">


                        <div className="story-card">


                            <span>

                                CARTOPIA

                            </span>


                            <strong>

                                Discover.

                                <br />

                                Choose.

                                <br />

                                Enjoy.

                            </strong>


                            <ShoppingBag size={54} />


                        </div>


                    </div>


                </div>


            </section>


            {/* =========================
                Advertisement Section
            ========================== */}


            <section className="featured-section">


                <div className="container">


                    <div className="section-heading">


                        <span className="section-label">

                            Featured Collection

                        </span>


                        <h2>

                            Trending in Cartopia

                        </h2>


                        <p>

                            Explore some of the products currently

                            attracting attention from our shoppers.

                        </p>


                    </div>


                    <div className="featured-grid">


                        {featuredProducts.map(


                            (product) => (


                                <article


                                    className="featured-product-card"


                                    key={product.id}


                                >


                                    <div className="featured-image-wrapper">


                                        <img


                                            src={product.image}


                                            alt={product.name}


                                        />


                                        <span className="featured-badge">


                                            {product.badge}


                                        </span>


                                    </div>


                                    <div className="featured-product-content">


                                        <span>


                                            {product.category}

                                        </span>


                                        <h3>


                                            {product.name}

                                        </h3>


                                        <Link


                                            to="/products"


                                            className="featured-link"


                                        >


                                            Explore Products


                                            <ArrowRight size={16} />


                                        </Link>


                                    </div>


                                </article>


                            )

                        )}


                    </div>


                </div>


            </section>


            {/* =========================
                Reviews Section
            ========================== */}


            <section className="reviews-section">


                <div className="container">


                    <div className="section-heading">


                        <span className="section-label">

                            Customer Love

                        </span>


                        <h2>

                            Loved by shoppers

                        </h2>


                        <p>

                            Real experiences from the Cartopia community.

                        </p>


                    </div>


                    <div className="reviews-grid">


                        {reviews.map(


                            (review, index) => (


                                <article


                                    className="review-card"


                                    key={index}


                                >


                                    <div className="review-stars">


                                        {Array.from(

                                            {

                                                length: review.rating

                                            }

                                        ).map(


                                            (_, starIndex) => (


                                                <Star


                                                    key={starIndex}


                                                    size={17}


                                                    fill="currentColor"


                                                />


                                            )

                                        )}


                                    </div>


                                    <p>


                                        "{review.review}"


                                    </p>


                                    <div className="review-author">


                                        <div className="review-avatar">


                                            {review.name.charAt(0)}

                                        </div>


                                        <div>


                                            <strong>

                                                {review.name}

                                            </strong>


                                            <span>

                                                {review.role}

                                            </span>


                                        </div>


                                    </div>


                                </article>


                            )

                        )}


                    </div>


                </div>


            </section>


            {/* =========================
                Contact Section
            ========================== */}


            <section


                className="contact-section"

                id="contact" >

                <div className="container">
                    <div className="contact-card">
                        <div className="contact-content">
                            <span className="section-label">
                                Get in Touch
                            </span>
                            <h2>
                                We're here to help.
                            </h2>
                            <p>
                                Have a question about Cartopia,

                                your order, or our products?

                                Our team is always happy to help.
                            </p>
                            <div className="contact-details">
                                <div>
                                    <MapPin size={20} />
                                    <span>
                                        Cartopia Business Center,

                                        Kochi, Kerala, India
                                    </span>
                                </div>
                                <div>
                                    <Mail size={20} />
                                    <span>
                                        support@cartopia.com
                                    </span>
                                </div>
                                <div>
                                    <Phone size={20} />
                                    <span>
                                        +91 98765 43210
                                    </span>
                                </div>
                                <div>
                                    <Clock size={20} />
                                    <span>

                                        Monday - Saturday,

                                        9:00 AM - 6:00 PM
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="contact-visual">
                            <div className="contact-icon">
                                <ShoppingBag size={52} />
                            </div>
                            <h3>
                                Cartopia
                            </h3>
                            <p>
                                Your world of better shopping.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    );

}


export default About;