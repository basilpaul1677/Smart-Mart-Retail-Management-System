import {
    PackageOpen,
    RefreshCw
} from "lucide-react";

import useProducts
from "../../hooks/useProducts";

import ProductFilters
from "../../components/products/ProductFilters";

import ProductCard
from "../../components/products/ProductCard";

import ProductSkeleton
from "../../components/products/ProductSkeleton";

import ProductPagination
from "../../components/products/ProductPagination";

import "./Products.css";


function Products() {


    const {

        products,

        loading,

        error,

        filters,

        pagination,

        searchProducts,

        changePage,

        fetchProducts

    } = useProducts();


    const handleReset = () => {

        const resetFilters = {

            name: "",

            category: "",

            brand: "",

            minPrice: "",

            maxPrice: "",

            sortBy: "createdAt",

            direction: "desc"

        };


        searchProducts(
            resetFilters
        );

    };


    const handleRetry = () => {

        fetchProducts();

    };


    return (

        <main
            className="products-page page"
        >


            <div
                className="container"
            >


                {/* =========================
                    Page Header
                ========================== */}

                <header
                    className="products-page-header"
                >

                    <div>

                        <span
                            className="section-label"
                        >

                            Explore our collection

                        </span>


                        <h1>

                            Find Your Next Favorite Product

                        </h1>


                        <p>

                            Discover quality products
                            selected for your everyday needs.

                        </p>

                    </div>


                    {

                        !loading &&

                        <div
                            className="products-count"
                        >

                            <strong>

                                {
                                    pagination.totalElements
                                }

                            </strong>


                            <span>

                                Products Available

                            </span>

                        </div>

                    }

                </header>


                {/* =========================
                    Filters
                ========================== */}

                <ProductFilters

                    filters={
                        filters
                    }

                    onSearch={
                        searchProducts
                    }

                    onReset={
                        handleReset
                    }

                />


                {/* =========================
                    Error State
                ========================== */}

                {

                    error &&

                    <section
                        className="products-error"
                    >

                        <div>

                            <h3>

                                Unable to load products

                            </h3>


                            <p>

                                {
                                    error
                                }

                            </p>

                        </div>


                        <button

                            type="button"

                            onClick={
                                handleRetry
                            }

                        >

                            <RefreshCw
                                size={18}
                            />

                            Try Again

                        </button>

                    </section>

                }


                {/* =========================
                    Loading State
                ========================== */}

                {

                    loading &&

                    <section
                        className="products-grid"
                    >

                        {

                            Array
                                .from(
                                    {
                                        length: 8
                                    }
                                )
                                .map(

                                    (_, index) => (

                                        <ProductSkeleton
                                            key={
                                                index
                                            }
                                        />

                                    )

                                )

                        }

                    </section>

                }


                {/* =========================
                    Empty State
                ========================== */}

                {

                    !loading &&

                    !error &&

                    products.length === 0 &&

                    <section
                        className="products-empty"
                    >

                        <PackageOpen
                            size={58}
                        />


                        <h3>

                            No Products Found

                        </h3>


                        <p>

                            Try changing your search
                            or filter criteria.

                        </p>


                        <button

                            type="button"

                            onClick={
                                handleReset
                            }

                        >

                            Clear Filters

                        </button>

                    </section>

                }


                {/* =========================
                    Product Grid
                ========================== */}

                {

                    !loading &&

                    !error &&

                    products.length > 0 &&

                    <section
                        className="products-grid"
                    >

                        {

                            products.map(

                                (product) => (

                                    <ProductCard

                                        key={
                                            product.id
                                        }

                                        product={
                                            product
                                        }

                                    />

                                )

                            )

                        }

                    </section>

                }


                {/* =========================
                    Pagination
                ========================== */}

                {

                    !loading &&

                    !error &&

                    products.length > 0 &&

                    <ProductPagination

                        pagination={
                            pagination
                        }

                        onPageChange={
                            changePage
                        }

                    />

                }

            </div>

        </main>

    );

}


export default Products;