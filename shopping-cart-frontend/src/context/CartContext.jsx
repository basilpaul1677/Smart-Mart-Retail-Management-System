import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from "react";

import cartService from "../services/cartService";

import {
    useToast
} from "./ToastContext";

import {
    useAuth
} from "./AuthContext";

const CartContext =
    createContext(null);

export const CartProvider = ({
    children
}) => {

    const {
        isAuthenticated,
        hasRole
    } = useAuth();


    const [
        cartItems,
        setCartItems
    ] = useState([]);


    const [
        isLoading,
        setIsLoading
    ] = useState(false);


    const [
        updatingItemId,
        setUpdatingItemId
    ] = useState(null);


    const {
        success,
        error
    } = useToast();


    /*
     * =========================
     * Customer Access
     * =========================
     *
     * Admin users should not
     * load or manage a cart.
     */

    const isAdmin =
        hasRole("ROLE_ADMIN");


    const canUseCart =
        isAuthenticated &&
        !isAdmin;


    /*
     * =========================
     * Load Cart
     * =========================
     */

    const loadCart = async () => {

        if (!canUseCart) {

            setCartItems([]);

            setIsLoading(false);

            return;

        }


        try {

            setIsLoading(true);


            const cart =
                await cartService.getCart();


            setCartItems(

                cart?.items || []

            );

        }

        catch (cartError) {


            if (

                cartError.response?.status === 404

            ) {

                setCartItems([]);

            }

            else if (

                cartError.response?.status === 401

            ) {

                setCartItems([]);

            }

            else {

                console.error(

                    "Failed to load cart:",

                    cartError

                );

            }

        }

        finally {

            setIsLoading(false);

        }

    };


    /*
     * =========================
     * Load Cart On Auth Change
     * =========================
     */

    useEffect(

        () => {

            if (

                canUseCart

            ) {

                loadCart();

            }

            else {

                setCartItems([]);

                setIsLoading(false);

            }

        },

        [

            isAuthenticated,

            isAdmin

        ]

    );


    /*
     * =========================
     * Add Product To Cart
     * =========================
     */

    const addToCart = async (

        product,

        quantity = 1

    ) => {


        if (!canUseCart) {

            error(

                "Please login as a customer to add products to your cart."

            );

            return false;

        }


        try {


            const cart =

                await cartService.addToCart(

                    product.id,

                    quantity

                );


            setCartItems(

                cart?.items || []

            );


            success(

                "Product added to cart"

            );


            return true;

        }

        catch (cartError) {


            console.error(

                "Failed to add product to cart:",

                cartError

            );


            error(

                cartError.response?.data?.message ||

                "Unable to add product to cart"

            );


            return false;

        }

    };


    /*
     * =========================
     * Update Quantity
     * =========================
     */

    const updateQuantity = async (

        cartItemId,

        quantity

    ) => {


        if (!canUseCart) {

            error(

                "Please login as a customer to manage your cart."

            );

            return;

        }


        if (

            quantity <= 0

        ) {

            await removeFromCart(

                cartItemId

            );

            return;

        }


        try {


            setUpdatingItemId(

                cartItemId

            );


            const cart =

                await cartService.updateCartItem(

                    cartItemId,

                    quantity

                );


            setCartItems(

                cart?.items || []

            );


        }

        catch (cartError) {


            console.error(

                "Failed to update cart item:",

                cartError

            );


            error(

                cartError.response?.data?.message ||

                "Unable to update cart"

            );

        }

        finally {


            setUpdatingItemId(

                null

            );

        }

    };


    /*
     * =========================
     * Remove Item
     * =========================
     */

    const removeFromCart = async (

        cartItemId

    ) => {


        if (!canUseCart) {

            error(

                "Please login as a customer to manage your cart."

            );

            return;

        }


        try {


            setUpdatingItemId(

                cartItemId

            );


            await cartService.removeCartItem(

                cartItemId

            );


            setCartItems(

                currentItems =>

                    currentItems.filter(

                        item =>

                            item.cartItemId !==

                            cartItemId

                    )

            );


            success(

                "Item removed from cart"

            );

        }

        catch (cartError) {


            console.error(

                "Failed to remove cart item:",

                cartError

            );


            error(

                cartError.response?.data?.message ||

                "Unable to remove item"

            );

        }

        finally {


            setUpdatingItemId(

                null

            );

        }

    };


    /*
     * =========================
     * Clear Cart
     * =========================
     */

    const clearCart = async () => {


        if (!canUseCart) {

            return;

        }


        try {


            await cartService.clearCart();


            setCartItems([]);


            success(

                "Cart cleared successfully"

            );

        }

        catch (cartError) {


            console.error(

                "Failed to clear cart:",

                cartError

            );


            error(

                cartError.response?.data?.message ||

                "Unable to clear cart"

            );

        }

    };


    /*
     * =========================
     * Total Items
     * =========================
     */

    const totalItems = useMemo(

        () =>

            cartItems.reduce(

                (

                    total,

                    item

                ) =>

                    total +

                    (

                        item.quantity ||

                        0

                    ),

                0

            ),

        [

            cartItems

        ]

    );


    /*
     * =========================
     * Total Amount
     * =========================
     */

    const totalAmount = useMemo(

        () =>

            cartItems.reduce(

                (

                    total,

                    item

                ) =>

                    total +

                    (

                        Number(

                            item.price

                        ) *

                        (

                            item.quantity ||

                            0

                        )

                    ),

                0

            ),

        [

            cartItems

        ]

    );


    return (

        <CartContext.Provider

            value={{

                cartItems,

                totalItems,

                totalAmount,

                isLoading,

                updatingItemId,

                loadCart,

                addToCart,

                removeFromCart,

                updateQuantity,

                clearCart

            }}

        >

            {

                children

            }

        </CartContext.Provider>

    );

};


export const useCart = () => {

    const context =

        useContext(

            CartContext

        );


    if (!context) {

        throw new Error(

            "useCart must be used inside CartProvider"

        );

    }


    return context;

};