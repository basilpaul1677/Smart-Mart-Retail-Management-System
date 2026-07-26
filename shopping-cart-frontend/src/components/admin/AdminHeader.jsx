import {
    useAuth
} from "../../context/AuthContext";

import {
    useNavigate
} from "react-router-dom";


const AdminHeader = () => {

    const {

        user,

        logout

    } = useAuth();


    const navigate = useNavigate();


    const handleLogout = () => {


        logout();


        navigate(

            "/login",

            {

                replace: true

            }

        );

    };


    const handleMyProfile = () => {

        navigate(
            "/admin/profile"
        );

    };


    const adminName =

        user?.firstName

            ? `${user.firstName} ${user.lastName || ""}`

            : "Administrator";


    const adminEmail =

        user?.sub || "admin@shoppingcart.com";


    const firstLetter =

        adminName

            .charAt(0)

            .toUpperCase();


    return (

        <header className="admin-header">


            {/* =========================
                PAGE TITLE
            ========================== */}


            <div className="admin-header-title">


                <span className="admin-eyebrow">

                    MANAGEMENT CONSOLE

                </span>


                <h1>

                    Admin Panel

                </h1>


            </div>


            {/* =========================
                ADMIN PROFILE
            ========================== */}


            <div className="admin-profile">


                <div className="admin-avatar">


                    {firstLetter}


                </div>


                <div className="admin-user-info">


                    <strong>

                        {adminEmail}

                    </strong>


                    <span>

                        {user?.role || "Administrator"}

                    </span>


                </div>


                <button

                    type="button"

                    className="admin-logout-button"

                    onClick={handleMyProfile}

                >

                    <span>

                        👤

                    </span>


                    My Profile

                </button>


                <button

                    type="button"

                    className="admin-logout-button"

                    onClick={handleLogout}

                >

                    <span>

                        ⇥

                    </span>


                    Logout

                </button>


            </div>


        </header>

    );

};

export default AdminHeader;