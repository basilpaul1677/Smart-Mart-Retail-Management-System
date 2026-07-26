import {
    NavLink
} from "react-router-dom";


const AdminSidebar = () => {


    return (

        <aside className="admin-sidebar">


            {/* =========================
                BRAND
            ========================== */}


            <div className="admin-brand">


                <div className="admin-brand-icon">

                    🛍️

                </div>


                <div className="admin-brand-text">


                    <strong>

                        Shopping Cart

                    </strong>


                    <span>

                        Admin Console

                    </span>


                </div>


            </div>


            {/* =========================
                DIVIDER
            ========================== */}


            <div className="admin-divider" />


            {/* =========================
                OVERVIEW
            ========================== */}


            <div className="admin-menu-section">


                <span className="admin-menu-label">

                    OVERVIEW

                </span>


                <nav className="admin-navigation">


                    <NavLink

                        to="/admin/dashboard"

                        className={

                            ({ isActive }) =>

                                isActive

                                    ? "active"

                                    : ""

                        }

                    >

                        <span className="admin-menu-icon">

                            📊

                        </span>


                        Dashboard

                    </NavLink>


                </nav>


            </div>


            {/* =========================
                MANAGEMENT
            ========================== */}


            <div className="admin-menu-section">


                <span className="admin-menu-label">

                    MANAGEMENT

                </span>


                <nav className="admin-navigation">


                    <NavLink

                        to="/admin/products"

                        className={

                            ({ isActive }) =>

                                isActive

                                    ? "active"

                                    : ""

                        }

                    >

                        <span className="admin-menu-icon">

                            📦

                        </span>


                        Products

                    </NavLink>


                    <NavLink

                        to="/admin/inventory"

                        className={

                            ({ isActive }) =>

                                isActive

                                    ? "active"

                                    : ""

                        }

                    >

                        <span className="admin-menu-icon">

                            🏷️

                        </span>


                        Inventory

                    </NavLink>


                    <NavLink

                        to="/admin/orders"

                        className={

                            ({ isActive }) =>

                                isActive

                                    ? "active"

                                    : ""

                        }

                    >

                        <span className="admin-menu-icon">

                            📋

                        </span>


                        Orders

                    </NavLink>


                    <NavLink

                        to="/admin/users"

                        className={

                            ({ isActive }) =>

                                isActive

                                    ? "active"

                                    : ""

                        }

                    >

                        <span className="admin-menu-icon">

                            👥

                        </span>


                        Users

                    </NavLink>


                    <NavLink to="/admin/reviews">
                        <span className="admin-menu-icon">
                                📋
                        </span>
                            Reviews
                    </NavLink>


                </nav>


            </div>


        </aside>

    );

};


export default AdminSidebar;