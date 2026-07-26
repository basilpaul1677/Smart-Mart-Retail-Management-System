import apiClient from "./apiClient";

const cartService = {

    addToCart: async (

        productId,

        quantity

    ) => {

        const response = await apiClient.post(

            "/cart/add",

            {

                productId,

                quantity

            }

        );

        return response.data;

    },


    getCart: async () => {

        const response = await apiClient.get(

            "/cart"

        );

        return response.data;

    },


    updateCartItem: async (

        cartItemId,

        quantity

    ) => {

        const response = await apiClient.put(

            `/cart/items/${cartItemId}`,

            {

                quantity

            }

        );

        return response.data;

    },


    removeCartItem: async (

        cartItemId

    ) => {

        await apiClient.delete(

            `/cart/items/${cartItemId}`

        );

    },


    clearCart: async () => {

        await apiClient.delete(

            "/cart"

        );

    }

};


export default cartService;