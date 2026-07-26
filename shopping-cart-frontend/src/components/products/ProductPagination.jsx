import {
    ChevronLeft,
    ChevronRight
} from "lucide-react";

import "./ProductPagination.css";


function ProductPagination({

    pagination,

    onPageChange

}) {


    const {

        page,

        totalPages

    } = pagination;


    if (

        totalPages <= 1

    ) {

        return null;

    }


    const handlePrevious = () => {


        if (

            page > 0

        ) {


            onPageChange(

                page - 1

            );

        }


    };


    const handleNext = () => {


        if (

            page < totalPages - 1

        ) {


            onPageChange(

                page + 1

            );

        }


    };


    return (


        <nav

            className="product-pagination"

            aria-label="Product pagination"

        >


            <button


                type="button"


                className="pagination-button"


                onClick={

                    handlePrevious

                }


                disabled={

                    page === 0

                }


                aria-label="Previous page"


            >


                <ChevronLeft

                    size={18}

                />


                Previous


            </button>


            <div

                className="pagination-info"

            >


                <span>

                    Page

                </span>


                <strong>

                    {

                        page + 1

                    }

                </strong>


                <span>

                    of

                </span>


                <strong>

                    {

                        totalPages

                    }

                </strong>


            </div>


            <button


                type="button"


                className="pagination-button"


                onClick={

                    handleNext

                }


                disabled={

                    page >= totalPages - 1

                }


                aria-label="Next page"


            >


                Next


                <ChevronRight

                    size={18}

                />


            </button>


        </nav>


    );


}


export default ProductPagination;