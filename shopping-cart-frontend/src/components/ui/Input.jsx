import { forwardRef } from "react";

import "./Input.css";

const Input = forwardRef(
    (
        {
            label,
            error,
            type = "text",
            name,
            placeholder,
            ...props
        },
        ref
    ) => {

        return (
            <div className="input-wrapper">

                {label && (
                    <label
                        htmlFor={name}
                        className="input-label"
                    >
                        {label}
                    </label>
                )}

                <input
                    ref={ref}
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    className={`form-input ${
                        error ? "input-error" : ""
                    }`}
                    {...props}
                />

                {error && (
                    <span className="input-error-message">
                        {error}
                    </span>
                )}

            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;