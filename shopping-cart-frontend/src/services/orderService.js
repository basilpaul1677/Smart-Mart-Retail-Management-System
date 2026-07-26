import apiClient from "./apiClient";

const orderService = {

    createOrder: async (

        orderData

    ) => {

        const response =

            await apiClient.post(

                "/orders/checkout",

                orderData

            );


        return response.data;

    },


    getMyOrders: async () => {

        const response =

            await apiClient.get(

                "/orders"

            );


        return response.data;

    },


    getOrderById: async (

        orderId

    ) => {

        const response =

            await apiClient.get(

                `/orders/${orderId}`

            );


        return response.data;

    }

};


export default orderService;