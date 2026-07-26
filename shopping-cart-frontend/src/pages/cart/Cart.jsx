import {
    Minus,
    Plus,
    ShoppingBag,
    Trash2,
    ArrowRight
} from "lucide-react";


import {
    Link
} from "react-router-dom";


import {
    useCart
} from "../../context/CartContext";


import "./Cart.css";


function Cart() {


    const {

        cartItems,

        totalItems,

        totalAmount,

        removeFromCart,

        updateQuantity,

        isLoading

    } = useCart();


    const formatPrice = (

        price

    ) => {

        return Number(

            price || 0

        ).toLocaleString(

            "en-IN"

        );

    };


    /*
     * =========================
     * Decrease Quantity
     * =========================
     */

    const handleDecreaseQuantity = (

        item

    ) => {


        if (

            item.quantity <= 1

        ) {

            return;

        }


        updateQuantity(

            item.cartItemId,

            item.quantity - 1

        );

    };


    /*
     * =========================
     * Increase Quantity
     * =========================
     */

    const handleIncreaseQuantity = (

        item

    ) => {


        updateQuantity(

            item.cartItemId,

            item.quantity + 1

        );

    };


    /*
     * =========================
     * Remove Item
     * =========================
     */

    const handleRemoveItem = (

        item

    ) => {


        removeFromCart(

            item.cartItemId

        );

    };


    /*
     * =========================
     * Loading
     * =========================
     */

    if (

        isLoading

    ) {

        return (

            <main

                className="cart-page page"

            >

                <div

                    className="container"

                >

                    <section

                        className="cart-empty"

                    >

                        <ShoppingBag

                            size={64}

                        />


                        <h1>

                            Loading Your Cart...

                        </h1>

                    </section>

                </div>

            </main>

        );

    }


    /*
     * =========================
     * Empty Cart
     * =========================
     */

    if (

        cartItems.length === 0

    ) {


        return (

            <main

                className="cart-page page"

            >

                <div

                    className="container"

                >

                    <section

                        className="cart-empty"

                    >

                        <div

                            className="cart-empty-icon"

                        >

                            <ShoppingBag

                                size={64}

                            />

                        </div>


                        <h1>

                            Your Cart Is Empty

                        </h1>


                        <p>

                            Looks like you haven't added

                            anything to your cart yet.

                        </p>


                        <Link

                            to="/products"

                            className="primary-button"

                        >

                            Explore Products


                            <ArrowRight

                                size={18}

                            />

                        </Link>

                    </section>

                </div>

            </main>

        );

    }


    return (

        <main

            className="cart-page page"

        >

            <div

                className="container"

            >


                <header

                    className="cart-page-header"

                >

                    <div>

                        <span

                            className="section-label"

                        >

                            Shopping Cart

                        </span>


                        <h1>

                            Your Cart

                        </h1>


                        <p>

                            Review your selected products

                            before proceeding to checkout.

                        </p>

                    </div>


                    <div

                        className="cart-item-count"

                    >

                        {totalItems}


                        {

                            totalItems === 1

                                ? " Item"

                                : " Items"

                        }

                    </div>

                </header>


                <section

                    className="cart-layout"

                >


                    <div

                        className="cart-items"

                    >

                        {

                            cartItems.map(

                                (

                                    item

                                ) => (

                                    <article

                                        key={

                                            item.cartItemId

                                        }

                                        className="cart-item"

                                    >


                                        <div

                                            className="cart-item-image"

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

                                                    <ShoppingBag

                                                        size={40}

                                                    />

                                            }

                                        </div>


                                        <div

                                            className="cart-item-details"

                                        >

                                            <h2>

                                                {

                                                    item.name

                                                }

                                            </h2>


                                            <strong

                                                className="cart-item-price"

                                            >

                                                ₹

                                                {

                                                    formatPrice(

                                                        item.price

                                                    )

                                                }

                                            </strong>


                                            <div

                                                className="cart-item-actions"

                                            >


                                                <div

                                                    className="quantity-control"

                                                >

                                                    <button

                                                        type="button"

                                                        onClick={() =>

                                                            handleDecreaseQuantity(

                                                                item

                                                            )

                                                        }

                                                        disabled={

                                                            item.quantity <= 1

                                                        }

                                                        aria-label="Decrease quantity"

                                                    >

                                                        <Minus

                                                            size={16}

                                                        />

                                                    </button>


                                                    <span>

                                                        {

                                                            item.quantity

                                                        }

                                                    </span>


                                                    <button

                                                        type="button"

                                                        onClick={() =>

                                                            handleIncreaseQuantity(

                                                                item

                                                            )

                                                        }

                                                        aria-label="Increase quantity"

                                                    >

                                                        <Plus

                                                            size={16}

                                                        />

                                                    </button>

                                                </div>


                                                <button

                                                    type="button"

                                                    className="remove-item-button"

                                                    onClick={() =>

                                                        handleRemoveItem(

                                                            item

                                                        )

                                                    }

                                                >

                                                    <Trash2

                                                        size={17}

                                                    />

                                                    Remove

                                                </button>

                                            </div>

                                        </div>


                                        <strong

                                            className="cart-item-total"

                                        >

                                            ₹

                                            {

                                                formatPrice(

                                                    Number(

                                                        item.price

                                                    ) *

                                                    item.quantity

                                                )

                                            }

                                        </strong>

                                    </article>

                                )

                            )

                        }

                    </div>


                    <aside

                        className="cart-summary"

                    >

                        <h2>

                            Order Summary

                        </h2>


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

                                className="free-delivery"

                            >

                                FREE

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

                                        totalAmount

                                    )

                                }

                            </strong>

                        </div>


                        <Link

                            to="/checkout"

                            className="checkout-button"

                        >

                            Proceed to Checkout


                            <ArrowRight

                                size={18}

                            />

                        </Link>


                        <Link

                            to="/products"

                            className="continue-shopping-link"

                        >

                            Continue Shopping

                        </Link>

                    </aside>

                </section>

            </div>

        </main>

    );

}


export default Cart;