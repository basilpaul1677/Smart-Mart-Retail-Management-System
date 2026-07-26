import {
    useState
} from "react";


import {
    Link,
    NavLink,
    useNavigate
} from "react-router-dom";


import {
    Menu,
    X,
    ShoppingCart,
    User,
    LogOut
} from "lucide-react";


import {
    useAuth
} from "../../context/AuthContext";


import {
    useCart
} from "../../context/CartContext";


import "./Navbar.css";


function Navbar() {


    const navigate =
        useNavigate();


    const {

        isAuthenticated,

        user,

        logout

    } =
        useAuth();


    const {

        totalItems

    } =
        useCart();


    const [

        isMenuOpen,

        setIsMenuOpen

    ] =
        useState(
            false
        );


    const handleLogout =
        () => {


            logout();


            setIsMenuOpen(
                false
            );


            navigate(
                "/login"
            );

        };


    const closeMenu =
        () => {

            setIsMenuOpen(
                false
            );

        };


    return (


        <header
            className="navbar"
        >


            <div
                className="navbar-container"
            >


                {/* Brand */}


                <Link

                    to="/"

                    className="navbar-brand"

                    onClick={
                        closeMenu
                    }

                >


                    <span
                        className="brand-icon"
                    >

                        <ShoppingCart
                            size={22}
                        />

                    </span>


                    <span
                        className="brand-name"
                    >

                        Cartopia Shopping

                    </span>


                </Link>


                {/* Desktop Navigation */}


                <nav
                    className="navbar-links"
                >


                    <NavLink

                        to="/products"

                        className={

                            ({
                                isActive
                            }) =>

                                isActive

                                    ?

                                    "nav-link active"

                                    :

                                    "nav-link"

                        }

                    >

                        Products

                    </NavLink>


                    {
                        isAuthenticated
                        &&

                        <>


                            {/* Cart */}


                            <NavLink

                                to="/cart"

                                className={

                                    ({
                                        isActive
                                    }) =>

                                        isActive

                                            ?

                                            "nav-link active cart-nav-link"

                                            :

                                            "nav-link cart-nav-link"

                                }

                            >

                                <span
                                    className="cart-nav-content"
                                >

                                    <ShoppingCart
                                        size={18}
                                    />

                                    <span>

                                        Cart

                                    </span>


                                    {

                                        totalItems > 0

                                        &&

                                        <span
                                            className="cart-count-badge"
                                        >

                                            {
                                                totalItems
                                            }

                                        </span>

                                    }

                                </span>


                            </NavLink>


                            {/* My Orders */}


                            <NavLink

                                to="/orders"

                                className={

                                    ({
                                        isActive
                                    }) =>

                                        isActive

                                            ?

                                            "nav-link active"

                                            :

                                            "nav-link"

                                }

                            >

                                My Orders

                            </NavLink>


                            {/* My Profile */}


                            <NavLink

                                to="/profile"

                                className={

                                    ({
                                        isActive
                                    }) =>

                                        isActive

                                            ?

                                            "nav-link active"

                                            :

                                            "nav-link"

                                }

                            >

                                My Profile

                            </NavLink>


                        </>

                    }


                </nav>


                {/* Desktop Actions */}


                <div
                    className="navbar-actions"
                >


                    {

                        isAuthenticated

                        ?

                        <>


                            <div
                                className="user-info"
                            >

                                <User
                                    size={18}
                                />


                                <span>

                                    {
                                        user?.firstName

                                        ||

                                        "Account"
                                    }

                                </span>


                            </div>


                            <button

                                type="button"

                                className="logout-button"

                                onClick={
                                    handleLogout
                                }

                            >


                                <LogOut
                                    size={17}
                                />


                                <span>

                                    Logout

                                </span>


                            </button>


                        </>


                        :


                        <>


                            <Link

                                to="/login"

                                className="login-link"

                            >

                                Login

                            </Link>


                            <Link

                                to="/register"

                                className="register-button"

                            >

                                Get Started

                            </Link>


                        </>

                    }


                </div>


                {/* Mobile Menu Button */}


                <button

                    type="button"

                    className="mobile-menu-button"

                    onClick={

                        () =>

                            setIsMenuOpen(

                                previousState =>

                                    !previousState

                            )

                    }

                    aria-label="Toggle navigation menu"

                >


                    {

                        isMenuOpen

                        ?

                        <X
                            size={24}
                        />

                        :

                        <Menu
                            size={24}
                        />

                    }


                </button>


            </div>


            {/* Mobile Navigation */}


            {

                isMenuOpen

                &&

                <div
                    className="mobile-menu"
                >


                    <NavLink

                        to="/products"

                        className="mobile-nav-link"

                        onClick={
                            closeMenu
                        }

                    >

                        Products

                    </NavLink>


                    {

                        isAuthenticated

                        &&

                        <>


                            {/* Mobile Cart */}


                            <NavLink

                                to="/cart"

                                className="mobile-nav-link"

                                onClick={
                                    closeMenu
                                }

                            >

                                <span
                                    className="mobile-cart-link"
                                >

                                    <ShoppingCart
                                        size={18}
                                    />

                                    <span>

                                        Cart

                                    </span>


                                    {

                                        totalItems > 0

                                        &&

                                        <span
                                            className="cart-count-badge"
                                        >

                                            {
                                                totalItems
                                            }

                                        </span>

                                    }

                                </span>


                            </NavLink>


                            <NavLink

                                to="/orders"

                                className="mobile-nav-link"

                                onClick={
                                    closeMenu
                                }

                            >

                                My Orders

                            </NavLink>


                            <NavLink

                                to="/profile"

                                className="mobile-nav-link"

                                onClick={
                                    closeMenu
                                }

                            >

                                My Profile

                            </NavLink>


                            <button

                                type="button"

                                className="mobile-logout-button"

                                onClick={
                                    handleLogout
                                }

                            >

                                <LogOut
                                    size={17}
                                />


                                Logout

                            </button>


                        </>

                    }


                    {

                        !isAuthenticated

                        &&

                        <>


                            <NavLink

                                to="/login"

                                className="mobile-nav-link"

                                onClick={
                                    closeMenu
                                }

                            >

                                Login

                            </NavLink>


                            <NavLink

                                to="/register"

                                className="mobile-register-button"

                                onClick={
                                    closeMenu
                                }

                            >

                                Get Started

                            </NavLink>


                        </>

                    }


                </div>

            }


        </header>

    );

}


export default Navbar;