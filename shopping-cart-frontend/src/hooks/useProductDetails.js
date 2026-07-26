import {
    useCallback,
    useEffect,
    useState
} from "react";

import productService
    from "../services/productService";


function useProductDetails(

    productId

) {


    const [

        product,

        setProduct

    ] = useState(null);


    const [

        loading,

        setLoading

    ] = useState(true);


    const [

        error,

        setError

    ] = useState(null);


    const fetchProduct = useCallback(

        async () => {


            if (

                !productId

            ) {

                return;

            }


            try {


                setLoading(true);

                setError(null);


                const data =

                    await productService

                        .getProductById(

                            productId

                        );


                setProduct(

                    data

                );


            }

            catch (

                err

            ) {


                console.error(

                    "Failed to fetch product:",

                    err

                );


                setError(

                    err.response?.data?.message ||

                    "Unable to load product details. Please try again."

                );


            }

            finally {


                setLoading(false);

            }


        },

        [

            productId

        ]

    );


    useEffect(

        () => {


            fetchProduct();


        },

        [

            fetchProduct

        ]

    );


    return {


        product,

        loading,

        error,

        fetchProduct

    };


}


export default useProductDetails;