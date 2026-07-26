import {
    Link
} from "react-router-dom";

import {
    ShoppingCart
} from "lucide-react";

import "./ProductCard.css";


function ProductCard({

    product

}) {


    const isInStock =

        product.quantity > 0;


    return (


        <article

            className="product-card"

        >


            {/* =========================
                Product Image
            ========================== */}

            <Link

                to={`/products/${product.id}`}

                className="product-image-wrapper"

                aria-label={

                    `View details for ${product.name}`

                }

            >


                {


                    product.imageUrl

                    ?


                    <img

                        src={

                            product.imageUrl

                        }

                        alt={

                            product.name

                        }

                        className="product-image"

                        loading="lazy"

                    />


                    :


                    <div

                        className=

                            "product-image-placeholder"

                    >


                        <ShoppingCart

                            size={40}

                        />


                        <span>

                            No Image Available

                        </span>


                    </div>


                }


            </Link>


            {/* =========================
                Product Content
            ========================== */}

            <div

                className=

                    "product-card-content"

            >


                {/* =========================
                    Category & Brand
                ========================== */}

                <div

                    className=

                        "product-meta"

                >


                    {


                        product.category &&


                        <span

                            className=

                                "product-category"

                        >


                            {

                                product.category

                            }


                        </span>


                    }


                    {


                        product.brand &&


                        <span

                            className=

                                "product-brand"

                        >


                            {

                                product.brand

                            }


                        </span>


                    }


                </div>


                {/* =========================
                    Product Name
                ========================== */}

                <Link

                    to={`/products/${product.id}`}

                    className=

                        "product-name-link"

                >


                    <h3

                        className=

                            "product-name"

                    >


                        {

                            product.name

                        }


                    </h3>


                </Link>


                {/* =========================
                    Description
                ========================== */}

                {


                    product.description &&


                    <p

                        className=

                            "product-description"

                    >


                        {

                            product.description

                        }


                    </p>


                }


                {/* =========================
                    Price & Stock
                ========================== */}

                <div

                    className=

                        "product-card-footer"

                >


                    <strong

                        className=

                            "product-price"

                    >


                        ₹

                        {


                            Number(

                                product.price

                            ).toLocaleString(

                                "en-IN"

                            )


                        }


                    </strong>


                    <span

                        className={

                            isInStock

                            ?


                            "stock-status in-stock"


                            :


                            "stock-status out-of-stock"

                        }

                    >


                        {


                            isInStock

                            ?


                            "In Stock"


                            :


                            "Out of Stock"


                        }


                    </span>


                </div>


            </div>


        </article>


    );


}


export default ProductCard;