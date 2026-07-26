import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    loading = false,
    disabled = false,
    ...props
}) {

    return (
        <button
            type={type}
            className={`button button-${variant}`}
            disabled={disabled || loading}
            {...props}
        >

            {loading ? (
                <span className="button-loading">

                    <span className="button-spinner"></span>

                    Processing...

                </span>
            ) : (
                children
            )}

        </button>
    );
}

export default Button;