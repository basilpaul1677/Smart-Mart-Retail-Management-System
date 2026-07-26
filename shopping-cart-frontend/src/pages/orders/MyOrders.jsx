import {
    ArrowRight,
    Package,
    ShoppingBag
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import {
    Link
} from "react-router-dom";

import orderService from "../../services/orderService";

import {
    useToast
} from "../../context/ToastContext";

import "./MyOrders.css";


function MyOrders() {


    const [

        orders,

        setOrders

    ] = useState([]);


    const [

        isLoading,

        setIsLoading

    ] = useState(true);


    const {

        error

    } = useToast();


    useEffect(

        () => {

            loadOrders();

        },

        []

    );


    const loadOrders = async () => {

        try {

            setIsLoading(true);


            const response =

                await orderService.getMyOrders();


            setOrders(response);


        }

        catch (orderError) {

            console.error(

                "Failed to load orders:",

                orderError

            );


            error(

                orderError.response?.data?.message ||

                "Unable to load your orders"

            );

        }

        finally {

            setIsLoading(false);

        }

    };


    const formatPrice = (

        price

    ) => {

        return Number(

            price

        ).toLocaleString(

            "en-IN"

        );

    };


    const formatDate = (

        date

    ) => {

        return new Date(

            date

        ).toLocaleDateString(

            "en-IN",

            {

                day: "2-digit",

                month: "short",

                year: "numeric"

            }

        );

    };


    const formatStatus = (

        status

    ) => {

        return status

            ?.toLowerCase()

            .replace(

                "_",

                " "

            )

            .replace(

                /\b\w/g,

                character =>

                    character.toUpperCase()

            );

    };


    if (

        isLoading

    ) {

        return (

            <main

                className="orders-page page"

            >

                <div

                    className="container"

                >

                    <div

                        className="orders-loading"

                    >

                        <Package

                            size={40}

                        />

                        <p>

                            Loading your orders...

                        </p>

                    </div>

                </div>

            </main>

        );

    }


    return (

        <main

            className="orders-page page"

        >

            <div

                className="container"

            >

                <header

                    className="orders-header"

                >

                    <div>

                        <span

                            className="section-label"

                        >

                            Order History

                        </span>

                        <h1>

                            My Orders

                        </h1>

                        <p>

                            View and track all your orders.

                        </p>

                    </div>

                </header>


                {

                    orders.length === 0

                        ?


                        <section

                            className="orders-empty"

                        >

                            <div

                                className="orders-empty-icon"

                            >

                                <ShoppingBag

                                    size={56}

                                />

                            </div>


                            <h2>

                                No Orders Yet

                            </h2>


                            <p>

                                You haven't placed any orders yet.

                            </p>


                            <Link

                                to="/products"

                                className="primary-button"

                            >

                                Start Shopping

                                <ArrowRight

                                    size={18}

                                />

                            </Link>

                        </section>


                        :


                        <section

                            className="orders-list"

                        >

                            {

                                orders.map(

                                    order => (

                                        <article

                                            key={

                                                order.orderId

                                            }

                                            className="order-card"

                                        >

                                            <div

                                                className="order-card-main"

                                            >

                                                <div

                                                    className="order-icon"

                                                >

                                                    <Package

                                                        size={24}

                                                    />

                                                </div>


                                                <div

                                                    className="order-info"

                                                >

                                                    <h2>

                                                        Order #

                                                        {

                                                            order.orderId

                                                        }

                                                    </h2>


                                                    <p>

                                                        Placed on{" "}

                                                        {

                                                            formatDate(

                                                                order.createdAt

                                                            )

                                                        }

                                                    </p>

                                                </div>

                                            </div>


                                            <div

                                                className="order-card-meta"

                                            >

                                                <span

                                                    className={

                                                        `order-status status-${

                                                            order.status

                                                                ?.toLowerCase()

                                                        }`

                                                    }

                                                >

                                                    {

                                                        formatStatus(

                                                            order.status

                                                        )

                                                    }

                                                </span>


                                                <strong>

                                                    ₹

                                                    {

                                                        formatPrice(

                                                            order.totalAmount

                                                        )

                                                    }

                                                </strong>

                                            </div>


                                            <Link

                                                to={

                                                    `/orders/${

                                                        order.orderId

                                                    }`

                                                }

                                                className="view-order-button"

                                            >

                                                View Details

                                                <ArrowRight

                                                    size={17}

                                                />

                                            </Link>

                                        </article>

                                    )

                                )

                            }

                        </section>

                }

            </div>

        </main>

    );

}


export default MyOrders;