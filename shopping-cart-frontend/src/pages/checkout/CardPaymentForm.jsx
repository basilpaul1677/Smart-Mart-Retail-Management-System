import {
    CreditCard,
    LockKeyhole,
    ShieldCheck,
    LoaderCircle
} from "lucide-react";

import {
    useState
} from "react";

import {
    useToast
} from "../../context/ToastContext";

import "./CardPaymentForm.css";


function CardPaymentForm({

    amount,

    onPaymentSuccess,

    onCancel

}) {


    const {

        error

    } = useToast();


    const [

        cardNumber,

        setCardNumber

    ] = useState("");


    const [

        cardHolderName,

        setCardHolderName

    ] = useState("");


    const [

        expiryDate,

        setExpiryDate

    ] = useState("");


    const [

        cvv,

        setCvv

    ] = useState("");


    const [

        isProcessing,

        setIsProcessing

    ] = useState(false);


    const [

        showCvv,

        setShowCvv

    ] = useState(false);


    const [

        paymentCompleted,

        setPaymentCompleted

    ] = useState(false);


    const formatCardNumber = (

        value

    ) => {


        const numbersOnly = value

            .replace(

                /\D/g,

                ""

            )

            .slice(

                0,

                16

            );


        return numbersOnly

            .replace(

                /(.{4})/g,

                "$1 "

            )

            .trim();

    };


    const formatExpiryDate = (

        value

    ) => {


        const numbersOnly = value

            .replace(

                /\D/g,

                ""

            )

            .slice(

                0,

                4

            );


        if (

            numbersOnly.length >= 3

        ) {

            return (

                numbersOnly.slice(

                    0,

                    2

                )

                +

                "/"

                +

                numbersOnly.slice(

                    2

                )

            );

        }


        return numbersOnly;

    };


    const handleCardNumberChange = (

        event

    ) => {


        setCardNumber(

            formatCardNumber(

                event.target.value

            )

        );

    };


    const handleExpiryChange = (

        event

    ) => {


        setExpiryDate(

            formatExpiryDate(

                event.target.value

            )

        );

    };


    const handleCvvChange = (

        event

    ) => {


        const value = event.target.value

            .replace(

                /\D/g,

                ""

            )

            .slice(

                0,

                3

            );


        setCvv(

            value

        );

    };


    const validateForm = () => {


        const cleanCardNumber = cardNumber

            .replace(

                /\s/g,

                ""

            );


        if (

            cleanCardNumber.length !== 16

        ) {

            error(

                "Please enter a valid 16-digit card number."

            );

            return false;

        }


        if (

            cardHolderName.trim().length < 3

        ) {

            error(

                "Please enter the cardholder name."

            );

            return false;

        }


        if (

            expiryDate.length !== 5

        ) {

            error(

                "Please enter a valid expiry date."

            );

            return false;

        }


        if (

            cvv.length !== 3

        ) {

            error(

                "Please enter a valid 3-digit CVV."

            );

            return false;

        }


        return true;

    };


    const handlePayNow = () => {


        if (paymentCompleted) {
            return;
        }


        if (

            !validateForm()

        ) {

            return;

        }


        setIsProcessing(

            true

        );


        setTimeout(

            () => {


                setIsProcessing(

                    false

                );


                setPaymentCompleted(true);


                if (typeof onPaymentSuccess === "function") {
                    onPaymentSuccess({
                        cardHolderName,
                        cardNumber:
                            cardNumber.slice(
                                -4
                            ),
                        amount: Number(amount || 0)
                    });
                }

            },

            2200

        );

    };


    const formattedAmount =
        Number(
            amount || 0
        ).toLocaleString(
            "en-IN"
        );


    const maskedCardNumber = cardNumber

        ? cardNumber

        : "•••• •••• •••• ••••";


    return (

        <section

            className="card-payment-container"

        >


            <div

                className="card-payment-header"

            >


                <div>


                    <span

                        className="section-label"

                    >

                        Secure Payment

                    </span>


                    <h2>

                        Pay With Card

                    </h2>


                    <p>

                        Enter your card details
                        to complete your order.

                    </p>


                </div>


                <div

                    className="payment-security-badge"

                >

                    <LockKeyhole

                        size={16}

                    />

                    Secure

                </div>


            </div>


            <div

                className="card-payment-layout"

            >


                <div

                    className={

                        showCvv

                            ? "bank-card card-flipped"
                            : "bank-card"

                    }

                    onClick={() =>

                        setShowCvv(

                            !showCvv

                        )

                    }

                >


                    {

                        !showCvv
                            ? (

                                <div

                                    className="card-front"

                                >


                                    <div

                                        className="card-top-row"

                                    >

                                        <CreditCard

                                            size={36}

                                        />


                                        <span>

                                            CARD

                                        </span>

                                    </div>


                                    <div

                                        className="card-number-preview"

                                    >

                                        {

                                            maskedCardNumber

                                        }

                                    </div>


                                    <div

                                        className="card-bottom-row"

                                    >


                                        <div>

                                            <small>

                                                CARD HOLDER

                                            </small>


                                            <strong>

                                                {

                                                    cardHolderName
                                                        .toUpperCase()

                                                        ||
                                                        "YOUR NAME"

                                                }

                                            </strong>

                                        </div>


                                        <div>

                                            <small>

                                                EXPIRES

                                            </small>


                                            <strong>

                                                {

                                                    expiryDate
                                                    ||
                                                    "MM/YY"

                                                }

                                            </strong>

                                        </div>


                                    </div>


                                </div>

                            )

                            : (

                                <div

                                    className="card-back"

                                >


                                    <div

                                        className="card-magnetic-strip"

                                    />


                                    <div

                                        className="card-cvv-section"

                                    >

                                        <span>

                                            CVV

                                        </span>


                                        <div

                                            className="card-cvv-value"

                                        >

                                            {

                                                cvv
                                                    ?
                                                    cvv
                                                    :
                                                    "•••"

                                            }

                                        </div>

                                    </div>


                                    <small>

                                        Click card to return

                                    </small>


                                </div>

                            )

                    }


                </div>


                <div

                    className="card-payment-form"

                >


                    <div

                        className="form-field"

                    >

                        <label>

                            Card Number

                        </label>


                        <div

                            className="card-input-wrapper"

                        >

                            <CreditCard

                                size={18}

                            />


                            <input

                                type="text"

                                value={

                                    cardNumber

                                }

                                onChange={

                                    handleCardNumberChange

                                }

                                placeholder="1234 5678 9012 3456"

                                inputMode="numeric"

                                autoComplete="cc-number"

                            />

                        </div>

                    </div>


                    <div

                        className="form-field"

                    >

                        <label>

                            Cardholder Name

                        </label>


                        <input

                            type="text"

                            value={

                                cardHolderName

                            }

                            onChange={(event) =>

                                setCardHolderName(

                                    event.target.value

                                )

                            }

                            placeholder="Basil Paul"

                            autoComplete="cc-name"

                        />

                    </div>


                    <div

                        className="card-form-row"

                    >


                        <div

                            className="form-field"

                        >

                            <label>

                                Expiry Date

                            </label>


                            <input

                                type="text"

                                value={

                                    expiryDate

                                }

                                onChange={

                                    handleExpiryChange

                                }

                                placeholder="MM/YY"

                                inputMode="numeric"

                                autoComplete="cc-exp"

                            />

                        </div>


                        <div

                            className="form-field"

                        >

                            <label>

                                CVV

                            </label>


                            <input

                                type="password"

                                value={

                                    cvv

                                }

                                onChange={

                                    handleCvvChange

                                }

                                onFocus={() =>

                                    setShowCvv(

                                        true

                                    )

                                }

                                placeholder="123"

                                inputMode="numeric"

                                autoComplete="cc-csc"

                            />

                        </div>

                    </div>


                    <div

                        className="payment-security-info"

                    >

                        <ShieldCheck

                            size={20}

                        />


                        <span>

                            Your payment information
                            is encrypted and secure.

                        </span>

                    </div>


                    <button

                        type="button"

                        className="pay-now-button"

                        onClick={

                            handlePayNow

                        }

                        disabled={

                            isProcessing ||
                            paymentCompleted

                        }

                    >


                        {

                            isProcessing
                                ? (

                                    <>

                                        <LoaderCircle

                                            size={20}

                                            className="payment-spinner"

                                        />

                                        Processing Payment...

                                    </>

                                )
                                : paymentCompleted
                                    ? (

                                        <>

                                            <ShieldCheck
                                                size={18}
                                            />

                                            Payment Completed
                                        </>

                                    )
                                    : (

                                        <>

                                            <LockKeyhole

                                                size={18}

                                            />

                                            Pay ₹

                                            {

                                                formattedAmount

                                            }

                                        </>

                                    )

                        }

                    </button>


                    <button

                        type="button"

                        className="cancel-payment-button"

                        onClick={

                            onCancel

                        }

                        disabled={

                            isProcessing

                        }

                    >

                        Back to Checkout

                    </button>


                </div>


            </div>


        </section>

    );

}


export default CardPaymentForm;