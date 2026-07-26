import {
    ArrowRight,
    ShoppingBag,
    ShieldCheck,
    Truck,
    RotateCcw
} from "lucide-react";

import {
    Link
} from "react-router-dom";

import "./Home.css";


function Home() {

    return (

        <main className="home-page">


            {/* =========================
                Hero Section
            ========================== */}

            <section className="home-hero">

                <div className="container home-hero-container">


                    <div className="hero-content">

                        <span className="hero-badge">

                            <ShoppingBag size={16} />

                            Everything you need, in one place

                        </span>


                        <h1 className="hero-title">

                            Shop smarter.

                            <span>
                                Live better.
                            </span>

                        </h1>


                        <p className="hero-description">

                            Discover quality products, effortless shopping,
                            and a seamless experience designed around you.

                        </p>

                    <div className="hero-actions">
                        <Link to="/products" className="primary-button">
                            Explore Products
                            <ArrowRight size={18}/>
                        </Link>
                        <Link to="/register" className="secondary-button">
                            Create Account
                        </Link>
                    </div>

                    </div>


                    <div className="hero-visual">

                        <div className="hero-card hero-card-main">

                            <div className="hero-card-icon">

                                <ShoppingBag
                                    size={34}
                                />

                            </div>


                            <div>

                                <span>
                                    Your shopping journey
                                </span>

                                <strong>
                                    Starts here
                                </strong>

                            </div>

                        </div>


                        <div className="hero-floating-card">

                            <span className="floating-card-label">

                                Fast & Secure

                            </span>


                            <strong>

                                Shopping Experience

                            </strong>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                Features Section
            ========================== */}

            <section className="features-section">

                <div className="container">

                    <div className="section-heading">

                        <span className="section-label">
                            Why choose us
                        </span>


                        <h2>
                            Shopping made simple
                        </h2>


                        <p>
                            Everything you need for a smooth,
                            reliable, and enjoyable shopping experience.
                        </p>

                    </div>


                    <div className="features-grid">


                        <article className="feature-card">

                            <div className="feature-icon">

                                <Truck
                                    size={24}
                                />

                            </div>


                            <h3>
                                Fast Delivery
                            </h3>


                            <p>
                                Get your orders delivered quickly
                                and reliably.
                            </p>

                        </article>


                        <article className="feature-card">

                            <div className="feature-icon">

                                <ShieldCheck
                                    size={24}
                                />

                            </div>


                            <h3>
                                Secure Shopping
                            </h3>


                            <p>
                                Your account and shopping experience
                                are protected.
                            </p>

                        </article>


                        <article className="feature-card">

                            <div className="feature-icon">

                                <RotateCcw
                                    size={24}
                                />

                            </div>


                            <h3>
                                Easy Returns
                            </h3>


                            <p>
                                Shop confidently with a simple
                                return experience.
                            </p>

                        </article>

                    </div>

                </div>

            </section>


            {/* =========================
                CTA Section
            ========================== */}

            <section className="home-cta">

                <div className="container">

                    <div className="cta-card">


                        <div>

                            <span className="section-label">
                                Ready to explore?
                            </span>


                            <h2>
                                Find something you'll love.
                            </h2>


                            <p>
                                Browse our products and start
                                your shopping experience today.
                            </p>

                        </div>


                    <Link to="/about" className="primary-button cta-button">
                            Explore Cartopia
                        <ArrowRight size={18}/>
                    </Link>

                    </div>

                </div>

            </section>


        </main>

    );

}


export default Home;