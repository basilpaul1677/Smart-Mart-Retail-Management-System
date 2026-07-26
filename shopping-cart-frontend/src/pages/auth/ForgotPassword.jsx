import { useState } from "react";
import { Link } from "react-router-dom";

import apiClient from "../../services/apiClient";

import "./Login.css";

const ForgotPassword = () => {

    const [
        email,
        setEmail
    ] = useState("");

    const [
        message,
        setMessage
    ] = useState("");

    const [
        error,
        setError
    ] = useState("");

    const [
        isLoading,
        setIsLoading
    ] = useState(false);


    const handleSubmit = async (
        event
    ) => {

        event.preventDefault();

        setMessage("");

        setError("");

        setIsLoading(true);

        try {

            const response =
                await apiClient.post(
                    "/auth/forgot-password",
                    {
                        email
                    }
                );

            setMessage(
                response.data
            );

        }

        catch (error) {

            setError(
                error?.response?.data?.message ||
                "Unable to process password reset request."
            );

        }

        finally {

            setIsLoading(false);

        }
    };


    return (

        <main className="auth-page">

            <div className="auth-container">

                <section className="auth-card">

                    <div className="auth-header">

                        <span className="auth-badge">

                            Password Recovery

                        </span>

                        <h1>

                            Forgot your password?

                        </h1>

                        <p>

                            Enter your email and we will send
                            you a password reset link.

                        </p>

                    </div>


                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label htmlFor="email">

                                Email Address

                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(
                                        event.target.value
                                    )
                                }
                                required
                            />

                        </div>


                        {message && (

                            <div className="success-message">

                                {message}

                            </div>

                        )}


                        {error && (

                            <div className="field-error">

                                {error}

                            </div>

                        )}


                        <button
                            type="submit"
                            className="auth-submit-button"
                            disabled={isLoading}
                        >

                            {isLoading
                                ? "Sending..."
                                : "Send Reset Link"
                            }

                        </button>

                    </form>


                    <div className="auth-footer">

                        <Link to="/login">

                            Back to Login

                        </Link>

                    </div>

                </section>

            </div>

        </main>

    );
};

export default ForgotPassword;