import { useEffect, useState } from "react";

import adminDashboardApi
    from "../../api/adminDashboardApi";


/*
 * =========================================
 * ANIMATED COUNTER
 * =========================================
 */

const AnimatedNumber = ({

    value,

    duration = 1200

}) => {

    const [count, setCount] = useState(0);


    useEffect(() => {

        const target = Number(value) || 0;

        let startTime = null;


        const animate = (currentTime) => {

            if (!startTime) {

                startTime = currentTime;

            }


            const progress = Math.min(

                (currentTime - startTime) / duration,

                1

            );


            /*
             * Ease-out animation.
             * Starts fast and slows down near final value.
             */

            const easeOut =

                1 - Math.pow(

                    1 - progress,

                    3

                );


            setCount(

                Math.floor(

                    easeOut * target

                )

            );


            if (progress < 1) {

                requestAnimationFrame(

                    animate

                );

            }

            else {

                setCount(

                    target

                );

            }

        };


        requestAnimationFrame(

            animate

        );


    }, [

        value,

        duration

    ]);


    return (

        <>

            {count.toLocaleString("en-IN")}

        </>

    );

};


const AdminDashboard = () => {

    const [

        statistics,

        setStatistics

    ] = useState(null);


    const [

        loading,

        setLoading

    ] = useState(true);


    const [

        error,

        setError

    ] = useState("");


    useEffect(() => {

        const loadDashboardStatistics = async () => {

            try {

                const data =

                    await adminDashboardApi

                        .getDashboardStatistics();


                setStatistics(data);

            }

            catch (error) {

                console.error(

                    "Failed to load dashboard statistics",

                    error

                );


                setError(

                    "Unable to load dashboard statistics"

                );

            }

            finally {

                setLoading(false);

            }

        };


        loadDashboardStatistics();

    }, []);


    if (loading) {

        return (

            <div className="dashboard-state">

                <div className="dashboard-loader"></div>

                <p>

                    Loading dashboard...

                </p>

            </div>

        );

    }


    if (error) {

        return (

            <div className="dashboard-error">

                <span>

                    ⚠️

                </span>

                <p>

                    {error}

                </p>

            </div>

        );

    }


    const statisticsCards = [

        {

            title: "Total Users",

            value: statistics.totalUsers,

            icon: "👥",

            className: "users"

        },

        {

            title: "Total Products",

            value: statistics.totalProducts,

            icon: "📦",

            className: "products"

        },

        {

            title: "Total Orders",

            value: statistics.totalOrders,

            icon: "🧾",

            className: "orders"

        },

        {

            title: "Total Revenue",

            value: statistics.totalRevenue,

            icon: "₹",

            className: "revenue",

            isCurrency: true

        },

        {

            title: "Low Stock Products",

            value: statistics.lowStockProducts,

            icon: "⚠️",

            className: "low-stock"

        },

        {

            title: "Out of Stock Products",

            value: statistics.outOfStockProducts,

            icon: "🚫",

            className: "out-stock"

        }

    ];


    return (

        <div className="admin-dashboard">


            <div className="dashboard-heading">

                <div>

                    <p className="dashboard-eyebrow">

                        OVERVIEW

                    </p>


                    <h1>

                        Dashboard

                    </h1>


                    <p className="dashboard-subtitle">

                        Monitor your shopping cart business performance.

                    </p>

                </div>

            </div>


            <div className="statistics-grid">

                {

                    statisticsCards.map(

                        (stat) => (

                            <div

                                className={`stat-card ${stat.className}`}

                                key={stat.title}

                            >

                                <div className="stat-card-top">

                                    <div className="stat-icon">

                                        {stat.icon}

                                    </div>


                                    <span className="stat-card-menu">

                                        ⋮

                                    </span>

                                </div>


                                <div className="stat-card-content">

                                    <span className="stat-title">

                                        {stat.title}

                                    </span>


                                    <strong className="stat-value">

                                        {stat.isCurrency && "₹"}


                                        <AnimatedNumber

                                            value={stat.value}

                                        />

                                    </strong>

                                </div>

                            </div>

                        )

                    )

                }

            </div>


            <div className="dashboard-bottom-section">


                <div className="dashboard-info-card">

                    <div>

                        <span className="dashboard-info-icon">

                            📈

                        </span>

                    </div>


                    <div>

                        <h3>

                            Business Overview

                        </h3>


                        <p>

                            Keep track of your users, products, orders,

                            revenue and inventory health from one place.

                        </p>

                    </div>

                </div>


                <div className="dashboard-info-card">

                    <div>

                        <span className="dashboard-info-icon">

                            🛒

                        </span>

                    </div>


                    <div>

                        <h3>

                            Inventory Health

                        </h3>


                        <p>

                            Monitor low-stock and out-of-stock products

                            to maintain a healthy product catalog.

                        </p>

                    </div>

                </div>


            </div>


        </div>

    );

};


export default AdminDashboard;