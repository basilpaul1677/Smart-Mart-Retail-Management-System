import {
    useCallback,
    useEffect,
    useState
} from "react";

import productService
from "../services/productService";


function useProducts() {


    const [

        products,

        setProducts

    ] = useState([]);


    const [

        loading,

        setLoading

    ] = useState(true);


    const [

        error,

        setError

    ] = useState(null);


    const [

        pagination,

        setPagination

    ] = useState({

        page: 0,

        size: 12,

        totalPages: 0,

        totalElements: 0

    });


    const [

        filters,

        setFilters

    ] = useState({

        name: "",

        category: "",

        brand: "",

        minPrice: "",

        maxPrice: "",

        sortBy: "createdAt",

        direction: "desc"

    });


    const fetchProducts = useCallback(

        async (

            customFilters = filters,

            page = pagination.page

        ) => {


            try {


                setLoading(true);


                setError(null);


                const params = {


                    ...customFilters,


                    page,


                    size: pagination.size

                };


                Object.keys(params).forEach(

                    (key) => {


                        if (

                            params[key] === "" ||

                            params[key] === null ||

                            params[key] === undefined

                        ) {


                            delete params[key];


                        }

                    }

                );


                const data =

                    await productService

                        .getProducts(params);


                setProducts(

                    data.content || []

                );


                setPagination({

                    page: data.number,

                    size: data.size,

                    totalPages:

                        data.totalPages,

                    totalElements:

                        data.totalElements

                });


            }

            catch (err) {


                console.error(

                    "Failed to fetch products:",

                    err

                );


                setError(

                    err.response?.data?.message ||

                    "Unable to load products. Please try again."

                );

            }

            finally {


                setLoading(false);


            }


        },

        [

            filters,

            pagination.page,

            pagination.size

        ]

    );


    useEffect(

        () => {


            fetchProducts();


        },

        [

            fetchProducts

        ]

    );


    const searchProducts = (

        newFilters

    ) => {


        setFilters(

            newFilters

        );


        fetchProducts(

            newFilters,

            0

        );


    };


    const changePage = (

        page

    ) => {


        fetchProducts(

            filters,

            page

        );


    };


    return {


        products,

        loading,

        error,

        filters,

        pagination,

        searchProducts,

        changePage,

        fetchProducts

    };


}


export default useProducts;