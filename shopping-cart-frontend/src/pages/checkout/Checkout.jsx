import {
    ArrowLeft,
    CheckCircle2,
    CreditCard,
    MapPin,
    Package,
    ShieldCheck,
    Truck
} from "lucide-react";

import {
    Link,
    useNavigate
} from "react-router-dom";

import {
    useState
} from "react";

import {
    useCart
} from "../../context/CartContext";

import {
    useToast
} from "../../context/ToastContext";

import CardPaymentForm
    from "../checkout/CardPaymentForm";

import orderService
    from "../../services/orderService";

import "./Checkout.css";


function Checkout() {


    const navigate = useNavigate();


    const {

        cartItems,

        totalItems,

        totalAmount,

        clearCart

    } = useCart();


    const {

        success,

        error

    } = useToast();


    const [

        isSubmitting,

        setIsSubmitting

    ] = useState(false);


    const [

        formData,

        setFormData

    ] = useState({

        fullName: "",

        email: "",

        phoneNumber: "",

        addressLine: "",

        city: "",

        state: "",

        postalCode: ""

    });


    const [

        paymentMethod,

        setPaymentMethod

    ] = useState("COD");


    const [

        formErrors,

        setFormErrors

    ] = useState({});


    const deliveryCharge =

        totalAmount >= 1000

            ? 0

            : 99;


    const grandTotal =

        totalAmount +

        deliveryCharge;


    const formatPrice = (

        price

    ) => {

        return Number(

            price

        ).toLocaleString(

            "en-IN"

        );

    };


    const handleChange = (

        event

    ) => {

        const {

            name,

            value

        } = event.target;


        setFormData(

            previousData => ({

                ...previousData,

                [name]: value

            })

        );


        setFormErrors(

            previousErrors => ({

                ...previousErrors,

                [name]: ""

            })

        );

    };


    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
    };


    const validateForm = () => {

        const errors = {};


        if (

            !formData.fullName.trim()

        ) {

            errors.fullName =

                "Full name is required";

        }


        if (

            !formData.email.trim()

        ) {

            errors.email =

                "Email is required";

        }

        else if (

            !/^\S+@\S+\.\S+$/.test(

                formData.email

            )

        ) {

            errors.email =

                "Enter a valid email address";

        }


        if (

            !formData.phoneNumber.trim()

        ) {

            errors.phoneNumber =

                "Phone number is required";

        }

        else if (

            !/^[0-9]{10}$/.test(

                formData.phoneNumber

            )

        ) {

            errors.phoneNumber =

                "Phone number must contain exactly 10 digits";

        }


        if (

            !formData.addressLine.trim()

        ) {

            errors.addressLine =

                "Address is required";

        }


        if (

            !formData.city.trim()

        ) {

            errors.city =

                "City is required";

        }


        if (

            !formData.state.trim()

        ) {

            errors.state =

                "State is required";

        }


        if (

            !formData.postalCode.trim()

        ) {

            errors.postalCode =

                "Postal code is required";

        }

        else if (

            !/^[0-9]{6}$/.test(

                formData.postalCode

            )

        ) {

            errors.postalCode =

                "Enter a valid 6-digit postal code";

        }


        setFormErrors(errors);


        return (

            Object.keys(errors).length === 0

        );

    };


    const buildOrderPayload = () => ({

        fullName: formData.fullName.trim(),

        email: formData.email.trim(),

        phoneNumber: formData.phoneNumber.trim(),

        addressLine: formData.addressLine.trim(),

        city: formData.city.trim(),

        state: formData.state.trim(),

        postalCode: formData.postalCode.trim(),

        paymentMethod: paymentMethod

    });


    const placeOrder = async () => {

        const orderPayload = buildOrderPayload();


        console.log(

            "Order Payload:",

            orderPayload

        );


        const createdOrder =

            await orderService.createOrder(

                orderPayload

            );


        success(

            "Order placed successfully"

        );


        clearCart();


        navigate(

            `/orders/${createdOrder.orderId}`

        );

    };


    const handlePaymentSuccess = async () => {

        try {

            setIsSubmitting(true);

            await placeOrder();

        }

        catch (submitError) {

            console.error(
                "Order creation failed after payment:",
                submitError
            );

            const backendMessage =
                submitError.response?.data?.message;

            error(

                backendMessage ||

                "Payment completed, but order placement failed. Please contact support or try again."

            );

        }

        finally {

            setIsSubmitting(false);

        }

    };


    const handleSubmit = async (

        event

    ) => {

        event.preventDefault();


        if (

            cartItems.length === 0

        ) {

            error(

                "Your cart is empty"

            );


            navigate(

                "/products"

            );


            return;

        }


        const isDeliveryFormValid =

            validateForm();


        if (

            !isDeliveryFormValid

        ) {

            error(

                "Please correct the highlighted delivery details"

            );


            return;

        }


        /*
         * COD:
         * Place order directly.
         *
         * ONLINE:
         * Order is placed after the card payment is completed
         * in CardPaymentForm.
         */
        if (paymentMethod === "ONLINE") {
            error(
                "Please complete the card payment below to place your order."
            );
            return;
        }


        try {

            setIsSubmitting(true);

            await placeOrder();

        }

        catch (

            submitError

        ) {

            console.error(

                "Order creation failed:",

                submitError

            );


            const backendMessage =

                submitError.response?.data?.message;


            error(

                backendMessage ||

                "Unable to place your order. Please try again."

            );


        }

        finally {

            setIsSubmitting(false);

        }

    };


    if (

        cartItems.length === 0

    ) {

        return (

            <main

                className="checkout-page page"

            >

                <div

                    className="container"

                >

                    <section

                        className="checkout-empty"

                    >

                        <Package

                            size={64}

                        />


                        <h1>

                            Your Cart Is Empty

                        </h1>


                        <p>

                            Add products to your cart

                            before proceeding to checkout.

                        </p>


                        <Link

                            to="/products"

                            className="primary-button"

                        >

                            Browse Products

                        </Link>

                    </section>

                </div>

            </main>

        );

    }


    return (

        <main

            className="checkout-page page"

        >

            <div

                className="container"

            >

                <header

                    className="checkout-header"

                >

                    <div>

                        <Link

                            to="/cart"

                            className="back-to-cart"

                        >

                            <ArrowLeft

                                size={18}

                            />

                            Back to Cart

                        </Link>


                        <span

                            className="section-label"

                        >

                            Secure Checkout

                        </span>


                        <h1>

                            Complete Your Order

                        </h1>


                        <p>

                            Enter your delivery details

                            and choose your payment method.

                        </p>

                    </div>


                    <div

                        className="checkout-security"

                    >

                        <ShieldCheck

                            size={22}

                        />


                        <span>

                            Secure Checkout

                        </span>

                    </div>

                </header>


                <form

                    className="checkout-layout"

                    onSubmit={

                        handleSubmit

                    }

                >

                    <div

                        className="checkout-main"

                    >

                        <section

                            className="checkout-card"

                        >

                            <div

                                className="checkout-card-header"

                            >

                                <div

                                    className="checkout-step-icon"

                                >

                                    <MapPin

                                        size={22}

                                    />

                                </div>


                                <div>

                                    <h2>

                                        Delivery Address

                                    </h2>


                                    <p>

                                        Where should we deliver

                                        your order?

                                    </p>

                                </div>

                            </div>


                            <div

                                className="checkout-form-grid"

                            >

                                <div

                                    className="form-field full-width"

                                >

                                    <label

                                        htmlFor="fullName"

                                    >

                                        Full Name

                                    </label>


                                    <input

                                        id="fullName"

                                        type="text"

                                        name="fullName"

                                        value={

                                            formData.fullName

                                        }

                                        onChange={

                                            handleChange

                                        }

                                        placeholder="Enter your full name"

                                    />


                                    {

                                        formErrors.fullName &&

                                        <span

                                            className="field-error"

                                        >

                                            {

                                                formErrors.fullName

                                            }

                                        </span>

                                    }

                                </div>


                                <div

                                    className="form-field"

                                >

                                    <label

                                        htmlFor="email"

                                    >

                                        Email Address

                                    </label>


                                    <input

                                        id="email"

                                        type="email"

                                        name="email"

                                        value={

                                            formData.email

                                        }

                                        onChange={

                                            handleChange

                                        }

                                        placeholder="you@example.com"

                                    />


                                    {

                                        formErrors.email &&

                                        <span

                                            className="field-error"

                                        >

                                            {

                                                formErrors.email

                                            }

                                        </span>

                                    }

                                </div>


                                <div

                                    className="form-field"

                                >

                                    <label

                                        htmlFor="phoneNumber"

                                    >

                                        Phone Number

                                    </label>


                                    <input

                                        id="phoneNumber"

                                        type="tel"

                                        name="phoneNumber"

                                        value={

                                            formData.phoneNumber

                                        }

                                        onChange={

                                            handleChange

                                        }

                                        placeholder="9876543210"

                                        maxLength={10}

                                    />


                                    {

                                        formErrors.phoneNumber &&

                                        <span

                                            className="field-error"

                                        >

                                            {

                                                formErrors.phoneNumber

                                            }

                                        </span>

                                    }

                                </div>


                                <div

                                    className="form-field full-width"

                                >

                                    <label

                                        htmlFor="addressLine"

                                    >

                                        Address

                                    </label>


                                    <textarea

                                        id="addressLine"

                                        name="addressLine"

                                        value={

                                            formData.addressLine

                                        }

                                        onChange={

                                            handleChange

                                        }

                                        placeholder="House number, street, area"

                                        rows={4}

                                    />


                                    {

                                        formErrors.addressLine &&

                                        <span

                                            className="field-error"

                                        >

                                            {

                                                formErrors.addressLine

                                            }

                                        </span>

                                    }

                                </div>


                                <div

                                    className="form-field"

                                >

                                    <label

                                        htmlFor="city"

                                    >

                                        City

                                    </label>


                                    <input

                                        id="city"

                                        type="text"

                                        name="city"

                                        value={

                                            formData.city

                                        }

                                        onChange={

                                            handleChange

                                        }

                                        placeholder="Enter city"

                                    />


                                    {

                                        formErrors.city &&

                                        <span

                                            className="field-error"

                                        >

                                            {

                                                formErrors.city

                                            }

                                        </span>

                                    }

                                </div>


                                <div

                                    className="form-field"

                                >

                                    <label

                                        htmlFor="state"

                                    >

                                        State

                                    </label>


                                    <input

                                        id="state"

                                        type="text"

                                        name="state"

                                        value={

                                            formData.state

                                        }

                                        onChange={

                                            handleChange

                                        }

                                        placeholder="Enter state"

                                    />


                                    {

                                        formErrors.state &&

                                        <span

                                            className="field-error"

                                        >

                                            {

                                                formErrors.state

                                            }

                                        </span>

                                    }

                                </div>


                                <div

                                    className="form-field"

                                >

                                    <label

                                        htmlFor="postalCode"

                                    >

                                        Postal Code

                                    </label>


                                    <input

                                        id="postalCode"

                                        type="text"

                                        name="postalCode"

                                        value={

                                            formData.postalCode

                                        }

                                        onChange={

                                            handleChange

                                        }

                                        placeholder="682001"

                                        maxLength={6}

                                    />


                                    {

                                        formErrors.postalCode &&

                                        <span

                                            className="field-error"

                                        >

                                            {

                                                formErrors.postalCode

                                            }

                                        </span>

                                    }

                                </div>

                            </div>

                        </section>


                        <section

                            className="checkout-card"

                        >

                            <div

                                className="checkout-card-header"

                            >

                                <div

                                    className="checkout-step-icon"

                                >

                                    <CreditCard

                                        size={22}

                                    />

                                </div>


                                <div>

                                    <h2>

                                        Payment Method

                                    </h2>


                                    <p>

                                        Choose how you want to pay.

                                    </p>

                                </div>

                            </div>


                            <div

                                className="payment-options"

                            >

                                <label

                                    className={

                                        `payment-option ${

                                            paymentMethod === "COD"

                                                ? "selected"

                                                : ""

                                        }`

                                    }

                                >

                                    <input

                                        type="radio"

                                        name="paymentMethod"

                                        value="COD"

                                        checked={

                                            paymentMethod === "COD"

                                        }

                                        onChange={

                                            event =>

                                                handlePaymentMethodChange(

                                                    event.target.value

                                                )

                                        }

                                    />


                                    <Truck

                                        size={22}

                                    />


                                    <span>

                                        <strong>

                                            Cash on Delivery

                                        </strong>


                                        <small>

                                            Pay when your order arrives

                                        </small>

                                    </span>


                                    <CheckCircle2

                                        className="payment-check"

                                        size={20}

                                    />

                                </label>


                                <label

                                    className={

                                        `payment-option ${

                                            paymentMethod === "ONLINE"

                                                ? "selected"

                                                : ""

                                        }`

                                    }

                                >

                                    <input

                                        type="radio"

                                        name="paymentMethod"

                                        value="ONLINE"

                                        checked={

                                            paymentMethod === "ONLINE"

                                        }

                                        onChange={

                                            event =>

                                                handlePaymentMethodChange(

                                                    event.target.value

                                                )

                                        }

                                    />


                                    <CreditCard

                                        size={22}

                                    />


                                    <span>

                                        <strong>

                                            Online Payment

                                        </strong>


                                        <small>

                                            Secure payment gateway

                                        </small>

                                    </span>


                                    <CheckCircle2

                                        className="payment-check"

                                        size={20}

                                    />

                                </label>

                            </div>


                            {

                                paymentMethod === "ONLINE" &&

                                <CardPaymentForm

                                    amount={grandTotal}

                                    onPaymentSuccess={

                                        handlePaymentSuccess

                                    }

                                    onCancel={() =>

                                        handlePaymentMethodChange(

                                            "COD"

                                        )

                                    }

                                />

                            }

                        </section>

                    </div>


                    <aside

                        className="checkout-summary"

                    >

                        <div

                            className="summary-card"

                        >

                            <h2>

                                Order Summary

                            </h2>


                            <div

                                className="summary-items"

                            >

                                {

                                    cartItems.map(

                                        item => (

                                            <div

                                                key={

                                                    item.productId

                                                }

                                                className="summary-item"

                                            >

                                                <div

                                                    className="summary-item-image"

                                                >

                                                    {

                                                        item.imageUrl

                                                            ?

                                                            <img

                                                                src={

                                                                    item.imageUrl

                                                                }

                                                                alt={

                                                                    item.name

                                                                }

                                                            />

                                                            :

                                                            <Package

                                                                size={24}

                                                            />

                                                    }

                                                </div>


                                                <div

                                                    className="summary-item-details"

                                                >

                                                    <strong>

                                                        {

                                                            item.name

                                                        }

                                                    </strong>


                                                    <span>

                                                        Qty: {

                                                            item.quantity

                                                        }

                                                    </span>

                                                </div>


                                                <strong>

                                                    ₹

                                                    {

                                                        formatPrice(

                                                            item.price *

                                                            item.quantity

                                                        )

                                                    }

                                                </strong>

                                            </div>

                                        )

                                    )

                                }

                            </div>


                            <div

                                className="summary-divider"

                            />


                            <div

                                className="summary-row"

                            >

                                <span>

                                    Items

                                </span>


                                <strong>

                                    {totalItems}

                                </strong>

                            </div>


                            <div

                                className="summary-row"

                            >

                                <span>

                                    Subtotal

                                </span>


                                <strong>

                                    ₹

                                    {

                                        formatPrice(

                                            totalAmount

                                        )

                                    }

                                </strong>

                            </div>


                            <div

                                className="summary-row"

                            >

                                <span>

                                    Delivery

                                </span>


                                <strong

                                    className={

                                        deliveryCharge === 0

                                            ? "free-delivery"

                                            : ""

                                    }

                                >

                                    {

                                        deliveryCharge === 0

                                            ? "FREE"

                                            : `₹${formatPrice(

                                                deliveryCharge

                                            )}`

                                    }

                                </strong>

                            </div>


                            <div

                                className="summary-divider"

                            />


                            <div

                                className="summary-total"

                            >

                                <span>

                                    Total

                                </span>


                                <strong>

                                    ₹

                                    {

                                        formatPrice(

                                            grandTotal

                                        )

                                    }

                                </strong>

                            </div>


                            <button

                                type="submit"

                                className="place-order-button"

                                disabled={

                                    isSubmitting

                                }

                            >

                                {

                                    isSubmitting

                                        ? "Processing..."
                                        : paymentMethod === "ONLINE"
                                            ? "Complete Card Payment"
                                            : "Place Order"

                                }


                                {

                                    !isSubmitting &&

                                    <CheckCircle2

                                        size={18}

                                    />

                                }

                            </button>


                            <div

                                className="checkout-trust"

                            >

                                <ShieldCheck

                                    size={18}

                                />


                                <span>

                                    Your information is protected

                                </span>

                            </div>

                        </div>

                    </aside>

                </form>

            </div>

        </main>

    );

}


export default Checkout;