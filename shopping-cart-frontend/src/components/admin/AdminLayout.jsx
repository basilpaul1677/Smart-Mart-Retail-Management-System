import {
    Outlet
} from "react-router-dom";

import AdminSidebar
    from "./AdminSidebar";

import AdminHeader
    from "./AdminHeader";

import "../../styles/admin.css";


const AdminLayout = () => {

    return (

        <div className="admin-layout">


            {/* =========================
                ADMIN SIDEBAR
            ========================== */}


            <AdminSidebar />


            {/* =========================
                ADMIN MAIN CONTENT
            ========================== */}


            <div className="admin-main">


                {/* =========================
                    ADMIN HEADER
                ========================== */}


                <AdminHeader />


                {/* =========================
                    ADMIN PAGE CONTENT
                ========================== */}


                <main className="admin-content">

                    <Outlet />

                </main>


            </div>


        </div>

    );

};


export default AdminLayout;