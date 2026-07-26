import axios from "axios";

import {getToken,removeToken} from "../utils/tokenUtils";

const axiosInstance = axios.create({
                        baseURL: "http://localhost:8080/api",
                        headers:{
                                    "Content-Type": "application/json"
                                } 
                            });

axiosInstance.interceptors.request.use((config) => 
                                            {
                                                const token = getToken();
                                                if (token) 
                                                {
                                                    config.headers.Authorization =`Bearer ${token}`;
                                                }
                                                return config;
                                            },
                                            (error) => 
                                            {
                                                return Promise.reject(error);
                                            });

axiosInstance.interceptors.response.use((response) => 
                                                {
                                                    return response;
                                                },
                                                (error) => 
                                                {
                                                    if (error.response?.status === 401) 
                                                    {
                                                        removeToken();
                                                        window.location.href ="/login";
                                                    }
                                                    return Promise.reject(error);
                                                });

export default axiosInstance;