import {


createContext,

useContext,

useState


} from "react";

import authService


from "../services/authService";


import {


getToken,

setToken,

removeToken


} from "../utils/tokenUtils";

const AuthContext =


createContext(null);


const decodeToken = (


token


) => {


try {

    if (!token) {

        return null;

    }


    const payload =

        token.split(".")[1];


    const decodedPayload =

        atob(

            payload

                .replace(/-/g, "+")

                .replace(/_/g, "/")

        );


    return JSON.parse(

        decodedPayload

    );

}

catch (error) {

    console.error(

        "Failed to decode JWT token:",

        error

    );


    return null;

}

};

export const AuthProvider = ({

children


}) => {

const [

    token,

    setAuthToken

] =

    useState(

        getToken()

    );


const [

    user,

    setUser

] =

    useState(

        () =>

            decodeToken(

                getToken()

            )

    );


const login = async (

    credentials

) => {


    const response =

        await authService.login(

            credentials

        );


    setToken(

        response.token

    );


    setAuthToken(

        response.token

    );


    setUser(

        decodeToken(

            response.token

        )

    );


    return response;

};


const register = async (

    userData

) => {

    return await authService.register(

        userData

    );

};


const logout = () => {


    removeToken();


    setAuthToken(

        null

    );


    setUser(

        null

    );

};


/*
 * =========================================
 * ROLE CHECK
 * =========================================
 */

const hasRole = (

    role

) => {


    if (!user) {

        return false;

    }


    /*
     * Case 1:
     *
     * JWT:
     *
     * {
     *     "role": "ROLE_ADMIN"
     * }
     */

    if (

        user.role === role

    ) {

        return true;

    }


    /*
     * Case 2:
     *
     * JWT:
     *
     * {
     *     "roles": [
     *         "ROLE_ADMIN"
     *     ]
     * }
     */

    if (

        Array.isArray(

            user.roles

        )

    ) {

        return user.roles.includes(

            role

        );

    }


    return false;

};


const isAuthenticated =

    Boolean(

        token

    );


return (

    <AuthContext.Provider

        value={{

            token,

            user,

            isAuthenticated,

            login,

            register,

            logout,

            hasRole

        }}

    >

        {

            children

        }

    </AuthContext.Provider>

);

};

export const useAuth = () => {

return useContext(

    AuthContext

);

};
