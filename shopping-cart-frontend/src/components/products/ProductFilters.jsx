import {
    Search,
    SlidersHorizontal,
    RotateCcw
} from "lucide-react";

import "./ProductFilters.css";


function ProductFilters({

    filters,

    onSearch,

    onReset

}) {


    const handleChange = (

        event

    ) => {


        const {

            name,

            value

        } = event.target;


        onSearch({

            ...filters,

            [name]: value

        });


    };


    const handleSubmit = (

        event

    ) => {


        event.preventDefault();


        onSearch(

            filters

        );


    };


    return (


        <section

            className="product-filters"

        >


            {/* =========================
                Filter Header
            ========================== */}

            <div

                className="filters-header"

            >


                <div>


                    <span

                        className="section-label"

                    >

                        Find your products


                    </span>


                    <h2>


                        Browse Products


                    </h2>


                </div>


                <SlidersHorizontal

                    size={24}

                />


            </div>


            {/* =========================
                Filter Form
            ========================== */}

            <form

                className="filters-form"

                onSubmit={

                    handleSubmit

                }

            >


                {/* =========================
                    Product Search
                ========================== */}

                <div

                    className="filter-search"

                >


                    <Search

                        size={20}

                    />


                    <input


                        type="text"


                        name="name"


                        value={

                            filters.name

                        }


                        onChange={

                            handleChange

                        }


                        placeholder=

                            "Search products..."


                        aria-label=

                            "Search products"


                    />


                </div>


                {/* =========================
                    Filter Fields
                ========================== */}

                <div

                    className="filter-grid"

                >


                    <input


                        type="text"


                        name="category"


                        value={

                            filters.category

                        }


                        onChange={

                            handleChange

                        }


                        placeholder=

                            "Category"


                        aria-label=

                            "Filter by category"


                    />


                    <input


                        type="text"


                        name="brand"


                        value={

                            filters.brand

                        }


                        onChange={

                            handleChange

                        }


                        placeholder=

                            "Brand"


                        aria-label=

                            "Filter by brand"


                    />


                    <input


                        type="number"


                        name="minPrice"


                        value={

                            filters.minPrice

                        }


                        onChange={

                            handleChange

                        }


                        placeholder=

                            "Min Price"


                        min="0"


                        step="0.01"


                        aria-label=

                            "Minimum price"


                    />


                    <input


                        type="number"


                        name="maxPrice"


                        value={

                            filters.maxPrice

                        }


                        onChange={

                            handleChange

                        }


                        placeholder=

                            "Max Price"


                        min="0"


                        step="0.01"


                        aria-label=

                            "Maximum price"


                    />


                </div>


                {/* =========================
                    Sorting
                ========================== */}

                <div

                    className="filter-sorting"

                >


                    <select


                        name="sortBy"


                        value={

                            filters.sortBy

                        }


                        onChange={

                            handleChange

                        }


                        aria-label=

                            "Sort products by"


                    >


                        <option

                            value="createdAt"

                        >

                            Newest Products


                        </option>


                        <option

                            value="name"

                        >

                            Product Name


                        </option>


                        <option

                            value="price"

                        >

                            Price


                        </option>


                        <option

                            value="quantity"

                        >

                            Stock Quantity


                        </option>


                    </select>


                    <select


                        name="direction"


                        value={

                            filters.direction

                        }


                        onChange={

                            handleChange

                        }


                        aria-label=

                            "Sort direction"


                    >


                        <option

                            value="desc"

                        >

                            Descending


                        </option>


                        <option

                            value="asc"

                        >

                            Ascending


                        </option>


                    </select>


                </div>


                {/* =========================
                    Actions
                ========================== */}

                <div

                    className="filter-actions"

                >


                    <button

                        type="submit"

                        className="primary-button"

                    >


                        <Search

                            size={18}

                        />


                        Search Products


                    </button>


                    <button


                        type="button"


                        className=

                            "filter-reset-button"


                        onClick={

                            onReset

                        }


                    >


                        <RotateCcw

                            size={17}

                        />


                        Reset Filters


                    </button>


                </div>


            </form>


        </section>


    );


}


export default ProductFilters;