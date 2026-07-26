import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";


// =========================
// Authentication Pages
// =========================

import Login
    from "../pages/auth/Login";

import Register
    from "../pages/auth/Register";

import ForgotPassword
    from "../pages/auth/ForgotPassword";

import ResetPassword
    from "../pages/auth/ResetPassword";


// =========================
// Route Protection
// =========================

import ProtectedRoute
    from "./ProtectedRoute";


// =========================
// Customer Pages
// =========================

import Home
    from "../pages/home/Home";

import Products
    from "../pages/products/Products";

import ProductDetails
    from "../pages/products/ProductDetails";

import Cart
    from "../pages/cart/Cart";

import Checkout
    from "../pages/checkout/Checkout";

import MyOrders
    from "../pages/orders/MyOrders";

import OrderDetails
    from "../pages/orders/OrderDetails";

import Profile
    from "../pages/profile/Profile";

import About
    from "../pages/about/About";

import Cartopia
    from "../pages/cartopia/Cartopia";


// =========================
// Customer Layout
// =========================

import Navbar
    from "../components/layout/Navbar";


// =========================
// Admin Layout
// =========================

import AdminLayout
    from "../components/admin/AdminLayout";


// =========================
// Admin Pages
// =========================

import AdminDashboard
    from "../pages/admin/AdminDashboard";

import AdminProfile 
    from "../pages/admin/AdminProfile";

import AdminProducts 
    from "../pages/admin/AdminProducts";

import AdminEditProduct 
    from "../pages/admin/AdminEditProduct";

import AdminOrders 
    from "../pages/admin/AdminOrders";

import AdminOrderDetails 
    from "../pages/admin/AdminOrderDetails";

import AdminUsers 
    from "../pages/admin/AdminUsers";

import AdminAddProduct
    from "../pages/admin/AdminAddProduct";

import AdminInventory 
    from "../pages/admin/AdminInventory";

import AdminReviews 
    from "../pages/admin/AdminReviews";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>


                {/* =====================================================
                    PUBLIC CUSTOMER ROUTES
                ====================================================== */}


                <Route

                    path="/"

                    element={

                        <>

                            <Navbar />

                            <Home />

                        </>

                    }

                />


                <Route

                    path="/products"

                    element={

                        <>

                            <Navbar />

                            <Products />

                        </>

                    }

                />


                <Route

                    path="/products/:id"

                    element={

                        <>

                            <Navbar />

                            <ProductDetails />

                        </>

                    }

                />


                <Route

                    path="/cartopia"

                    element={

                        <>

                            <Navbar />

                            <Cartopia />

                        </>

                    }

                />


                <Route

                    path="/about"

                    element={

                        <>

                            <Navbar />

                            <About />

                        </>

                    }

                />


                {/* =====================================================
                    AUTHENTICATION ROUTES
                ====================================================== */}


                <Route

                    path="/login"

                    element={

                        <Login />

                    }

                />


                <Route

                    path="/register"

                    element={

                        <Register />

                    }

                />

                <Route
                    path="/forgot-password"
                    element={
                        <ForgotPassword />
                    }
                />

                <Route
                    path="/reset-password"
                    element={
                        <ResetPassword />
                    }
                />


                {/* =====================================================
                    PROTECTED CUSTOMER ROUTES
                ====================================================== */}


                <Route

                    element={

                        <ProtectedRoute />

                    }

                >


                    <Route

                        path="/cart"

                        element={

                            <>

                                <Navbar />

                                <Cart />

                            </>

                        }

                    />


                    <Route

                        path="/checkout"

                        element={

                            <>

                                <Navbar />

                                <Checkout />

                            </>

                        }

                    />


                    <Route

                        path="/orders"

                        element={

                            <>

                                <Navbar />

                                <MyOrders />

                            </>

                        }

                    />


                    <Route

                        path="/orders/:orderId"

                        element={

                            <>

                                <Navbar />

                                <OrderDetails />

                            </>

                        }

                    />


                    <Route

                        path="/profile"

                        element={

                            <>

                                <Navbar />

                                <Profile />

                            </>

                        }

                    />


                </Route>


                {/* =====================================================
                    ADMIN ROUTES
                ====================================================== */}


                <Route

                    element={

                        <ProtectedRoute />

                    }

                >


                    <Route

                        path="/admin"

                        element={

                            <AdminLayout />

                        }

                    >
                    
                    <Route path="reviews" element={<AdminReviews />} />

                        {/* =================================================
                            ADMIN DASHBOARD

                            /admin automatically redirects to dashboard
                        ================================================== */}


                        <Route

                            index

                            element={

                                <AdminDashboard />

                            }

                        />


                        <Route

                            path="dashboard"

                            element={

                                <AdminDashboard />

                            }

                        />

                        <Route 
                            path="profile" 
                            element={<AdminProfile />} 
                        />
                        

                        {/* =================================================
                            ADMIN PRODUCTS

                            Add component when ready
                        ================================================== */}


                        {

                        <Route

                            path="products"

                            element={

                                <AdminProducts />

                            }

                        />

                        }

                        <Route 
                            path="products/:id/edit" 
                            element={<AdminEditProduct />} 
                        />

                        {
                            <Route 
                                path="products/new" 
                                element={<AdminAddProduct />} 
                            />
                        }

                        {/* =================================================
                            ADMIN INVENTORY
                        ================================================== */}


                        {

                        <Route

                            path="inventory"

                            element={

                                <AdminInventory />

                            }

                        />

                        }


                        {/* =================================================
                            ADMIN ORDERS
                        ================================================== */}

                        {
                            <Route 
                                path="orders" 
                                element={<AdminOrders />} 
                            />
                        }

                        {
                            <Route 
                                path="orders/:orderId" 
                                element={<AdminOrderDetails />} 
                            />
                        }


                        {/* =================================================
                            ADMIN USERS
                        ================================================== */}


                        {

                        <Route

                            path="users"

                            element={

                                <AdminUsers />

                            }

                        />

                        }


                    </Route>


                </Route>


            </Routes>


        </BrowserRouter>

    );

}


export default AppRoutes;