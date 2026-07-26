import {
Navigate,
Outlet
} from "react-router-dom";

import {
useAuth
} from "../context/AuthContext";

function ProtectedRoute({


allowedRoles


}) {


const {

    isAuthenticated,

    user,

    hasRole

} = useAuth();


/*
 * =========================================
 * AUTHENTICATION CHECK
 * =========================================
 */

if (!isAuthenticated) {

    return (

        <Navigate

            to="/login"

            replace

        />

    );

}


/*
 * =========================================
 * ROLE AUTHORIZATION CHECK
 * =========================================
 */

if (

    allowedRoles &&

    allowedRoles.length > 0 &&

    !allowedRoles.some(

        (role) =>

            hasRole(role)

    )

) {

    return (

        <Navigate

            to="/"

            replace

        />

    );

}


return (

    <Outlet />

);


}

export default ProtectedRoute;
