import {
    CheckCircle,
    XCircle,
    AlertTriangle,
    Info,
    X
} from "lucide-react";

import { useToast } from "../../context/ToastContext";

import "./ToastContainer.css";

const ToastContainer = () => {

    const {
        toasts,
        removeToast
    } = useToast();

    const getToastIcon = (type) => {

        switch (type) {

            case "success":
                return <CheckCircle size={22} />;

            case "error":
                return <XCircle size={22} />;

            case "warning":
                return <AlertTriangle size={22} />;

            default:
                return <Info size={22} />;
        }
    };

    return (

        <div className="toast-container">

            {toasts.map((toast) => (

                <div
                    key={toast.id}
                    className={`toast toast-${toast.type} toast-enter`}
                >

                    <div className="toast-icon">

                        {getToastIcon(toast.type)}

                    </div>

                    <div className="toast-message">

                        {toast.message}

                    </div>

                    <button
                        className="toast-close"
                        onClick={() =>
                            removeToast(toast.id)
                        }
                    >

                        <X size={18} />

                    </button>

                </div>

            ))}

        </div>
    );
};

export default ToastContainer;