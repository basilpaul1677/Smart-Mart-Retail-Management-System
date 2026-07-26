import axios from "axios";

import {
    getToken,
    removeToken
} from "../utils/tokenUtils";


const apiClient = axios.create({

    baseURL:
        "http://localhost:8080/api",

    headers: {

        "Content-Type":
            "application/json"

    }

});


/*
 * Add JWT token to every request
 */
apiClient.interceptors.request.use(

    (config) => {

        const token =
            getToken();


        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;

        }


        return config;

    },

    (error) => {

        return Promise.reject(
            error
        );

    }

);


/*
 * Handle common API responses
 */
apiClient.interceptors.response.use(

    (response) => {

        return response;

    },

    (error) => {

        if (

            error.response?.status ===
            401

        ) {

            removeToken();

            localStorage.removeItem(
                "user"
            );

        }


        return Promise.reject(
            error
        );

    }

);


export default apiClient;