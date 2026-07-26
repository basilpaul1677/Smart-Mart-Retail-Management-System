export const buildOrderPayload = ({

    cartItems,

    formData,

    paymentMethod

}) => {


    return {


        items:

            cartItems.map(

                item => ({

                    productId:

                        item.productId,

                    quantity:

                        item.quantity

                })

            ),


        shippingAddress: {


            fullName:

                formData.fullName,


            email:

                formData.email,


            phoneNumber:

                formData.phoneNumber,


            addressLine:

                formData.addressLine,


            city:

                formData.city,


            state:

                formData.state,


            postalCode:

                formData.postalCode

        },


        paymentMethod

    };

};