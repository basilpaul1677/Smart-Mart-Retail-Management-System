import { createContext, useContext, useState } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {

    const [toasts, setToasts] = useState([]);

    const showToast = ({
        message,
        type = "info",
        duration = 4000
    }) => {

        const id = Date.now();

        setToasts((previousToasts) => [
            ...previousToasts,
            {
                id,
                message,
                type
            }
        ]);

        setTimeout(() => {

            setToasts((previousToasts) =>
                previousToasts.filter(
                    (toast) => toast.id !== id
                )
            );

        }, duration);
    };

    const removeToast = (id) => {

        setToasts((previousToasts) =>
            previousToasts.filter(
                (toast) => toast.id !== id
            )
        );
    };

    const success = (message) => {

        showToast({
            message,
            type: "success"
        });
    };

    const error = (message) => {

        showToast({
            message,
            type: "error"
        });
    };

    const warning = (message) => {

        showToast({
            message,
            type: "warning"
        });
    };

    const info = (message) => {

        showToast({
            message,
            type: "info"
        });
    };

    return (

        <ToastContext.Provider
            value={{
                showToast,
                success,
                error,
                warning,
                info,
                toasts,
                removeToast
            }}
        >

            {children}

        </ToastContext.Provider>
    );
};

export const useToast = () => {

    const context = useContext(ToastContext);

    if (!context) {

        throw new Error(
            "useToast must be used inside ToastProvider"
        );
    }

    return context;
};