import {
    ArrowLeft,
    CheckCircle2,
    CreditCard,
    MapPin,
    Package,
    Truck
} from "lucide-react";

import {
    useEffect,
    useState
} from "react";

import {
    Link,
    useParams
} from "react-router-dom";

import orderService from "../../services/orderService";

import {
    useToast
} from "../../context/ToastContext";

import "./OrderDetails.css";


function OrderDetails() {


    const {

        orderId

    } = useParams();


    const [

        order,

        setOrder

    ] = useState(null);


    const [

        isLoading,

        setIsLoading

    ] = useState(true);


    const {

        error

    } = useToast();


    useEffect(

        () => {

            loadOrder();

        },

        [

            orderId

        ]

    );


    const loadOrder = async () => {

        try {

            setIsLoading(true);


            const response =

                await orderService.getOrderById(

                    orderId

                );


            setOrder(response);

        }

        catch (orderError) {

            console.error(

                "Failed to load order:",

                orderError

            );


            error(

                orderError.response?.data?.message ||

                "Unable to load order details"

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

        ).toLocaleString(

            "en-IN",

            {

                day: "2-digit",

                month: "short",

                year: "numeric",

                hour: "2-digit",

                minute: "2-digit"

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


    const formatPaymentMethod = (

        paymentMethod

    ) => {

        if (

            paymentMethod === "COD"

        ) {

            return "Cash on Delivery";

        }


        if (

            paymentMethod === "ONLINE"

        ) {

            return "Online Payment";

        }


        return paymentMethod;

    };


    if (

        isLoading

    ) {

        return (

            <main

                className="order-details-page page"

            >

                <div

                    className="container"

                >

                    <div

                        className="order-details-loading"

                    >

                        <Package

                            size={40}

                        />

                        <p>

                            Loading order details...

                        </p>

                    </div>

                </div>

            </main>

        );

    }


    if (

        !order

    ) {

        return (

            <main

                className="order-details-page page"

            >

                <div

                    className="container"

                >

                    <section

                        className="order-not-found"

                    >

                        <Package

                            size={56}

                        />

                        <h1>

                            Order Not Found

                        </h1>

                        <Link

                            to="/orders"

                            className="primary-button"

                        >

                            Back to Orders

                        </Link>

                    </section>

                </div>

            </main>

        );

    }


    return (

        <main

            className="order-details-page page"

        >

            <div

                className="container"

            >

                <Link

                    to="/orders"

                    className="back-to-orders"

                >

                    <ArrowLeft

                        size={18}

                    />

                    Back to Orders

                </Link>


                <header

                    className="order-details-header"

                >

                    <div>

                        <span

                            className="section-label"

                        >

                            Order Details

                        </span>


                        <h1>

                            Order #

                            {

                                order.orderId

                            }

                        </h1>


                        <p>

                            Placed on{" "}

                            {

                                formatDate(

                                    order.createdAt

                                )

                            }

                        </p>

                    </div>


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

                </header>


                <section

                    className="order-details-layout"

                >

                    <div

                        className="order-details-main"

                    >

                        <section

                            className="details-card"

                        >

                            <div

                                className="details-card-header"

                            >

                                <MapPin

                                    size={22}

                                />

                                <h2>

                                    Delivery Address

                                </h2>

                            </div>


                            <div

                                className="address-details"

                            >

                                <strong>

                                    {

                                        order.fullName

                                    }

                                </strong>


                                <span>

                                    {

                                        order.addressLine

                                    }

                                </span>


                                <span>

                                    {

                                        order.city

                                    },{" "}

                                    {

                                        order.state

                                    }{" "}

                                    -{" "}

                                    {

                                        order.postalCode

                                    }

                                </span>


                                <span>

                                    {

                                        order.phoneNumber

                                    }

                                </span>


                                <span>

                                    {

                                        order.email

                                    }

                                </span>

                            </div>

                        </section>


                        <section

                            className="details-card"

                        >

                            <div

                                className="details-card-header"

                            >

                                <Package

                                    size={22}

                                />

                                <h2>

                                    Ordered Products

                                </h2>

                            </div>


                            <div

                                className="ordered-items"

                            >

                                {

                                    order.items?.map(

                                        item => (

                                            <div

                                                key={

                                                    item.productId

                                                }

                                                className="ordered-item"

                                            >

                                                <div

                                                    className="ordered-item-icon"

                                                >

                                                    <Package

                                                        size={22}

                                                    />

                                                </div>


                                                <div

                                                    className="ordered-item-info"

                                                >

                                                    <strong>

                                                        {

                                                            item.productName

                                                        }

                                                    </strong>


                                                    <span>

                                                        Quantity:{" "}

                                                        {

                                                            item.quantity

                                                        }

                                                    </span>

                                                </div>


                                                <div

                                                    className="ordered-item-price"

                                                >

                                                    <span>

                                                        ₹

                                                        {

                                                            formatPrice(

                                                                item.price

                                                            )

                                                        }{" "}

                                                        each

                                                    </span>


                                                    <strong>

                                                        ₹

                                                        {

                                                            formatPrice(

                                                                item.subTotal

                                                            )

                                                        }

                                                    </strong>

                                                </div>

                                            </div>

                                        )

                                    )

                                }

                            </div>

                        </section>

                    </div>


                    <aside

                        className="order-details-sidebar"

                    >

                        <section

                            className="details-card"

                        >

                            <h2>

                                Order Summary

                            </h2>


                            <div

                                className="order-summary-row"

                            >

                                <span>

                                    Payment Method

                                </span>


                                <strong>

                                    {

                                        formatPaymentMethod(

                                            order.paymentMethod

                                        )

                                    }

                                </strong>

                            </div>


                            <div

                                className="order-summary-divider"

                            />


                            <div

                                className="order-summary-total"

                            >

                                <span>

                                    Total

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

                        </section>


                        <section

                            className="details-card order-status-card"

                        >

                            <h2>

                                Order Status

                            </h2>


                            <div

                                className="status-timeline"

                            >

                                <div

                                    className={

                                        `timeline-item ${

                                            order.status !==

                                                "CANCELLED"

                                                ? "active"

                                                : ""

                                        }`

                                    }

                                >

                                    <CheckCircle2

                                        size={20}

                                    />

                                    <span>

                                        Order Placed

                                    </span>

                                </div>


                                <div

                                    className={

                                        `timeline-item ${

                                            [

                                                "CONFIRMED",

                                                "SHIPPED",

                                                "DELIVERED"

                                            ].includes(

                                                order.status

                                            )

                                                ? "active"

                                                : ""

                                        }`

                                    }

                                >

                                    <CheckCircle2

                                        size={20}

                                    />

                                    <span>

                                        Confirmed

                                    </span>

                                </div>


                                <div

                                    className={

                                        `timeline-item ${

                                            [

                                                "SHIPPED",

                                                "DELIVERED"

                                            ].includes(

                                                order.status

                                            )

                                                ? "active"

                                                : ""

                                        }`

                                    }

                                >

                                    <Truck

                                        size={20}

                                    />

                                    <span>

                                        Shipped

                                    </span>

                                </div>


                                <div

                                    className={

                                        `timeline-item ${

                                            order.status ===

                                                "DELIVERED"

                                                ? "active"

                                                : ""

                                        }`

                                    }

                                >

                                    <CheckCircle2

                                        size={20}

                                    />

                                    <span>

                                        Delivered

                                    </span>

                                </div>

                            </div>

                        </section>

                    </aside>

                </section>

            </div>

        </main>

    );

}


export default OrderDetails;