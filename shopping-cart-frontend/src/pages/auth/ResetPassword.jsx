import { useState } from "react";
import {
    Link,
    useNavigate,
    useSearchParams
} from "react-router-dom";

import apiClient from "../../services/apiClient";

import "./Login.css";

const ResetPassword = () => {

    const navigate =
        useNavigate();

    const [
        searchParams
    ] = useSearchParams();

    const token =
        searchParams.get(
            "token"
        );


    const [
        newPassword,
        setNewPassword
    ] = useState("");

    const [
        confirmPassword,
        setConfirmPassword
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

        setError("");

        if (
            newPassword !==
            confirmPassword
        ) {

            setError(
                "Passwords do not match."
            );

            return;

        }

        setIsLoading(true);

        try {

            await apiClient.post(
                "/auth/reset-password",
                {
                    token,
                    newPassword
                }
            );

            navigate(
                "/login",
                {
                    replace: true,
                    state: {
                        message:
                            "Password reset successfully. Please login."
                    }
                }
            );

        }

        catch (error) {

            setError(
                error?.response?.data?.message ||
                "Unable to reset password."
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

                            Create New Password

                        </span>

                        <h1>

                            Reset your password

                        </h1>

                        <p>

                            Choose a strong password
                            for your Cartopia account.

                        </p>

                    </div>


                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label>

                                New Password

                            </label>

                            <input
                                type="password"
                                placeholder="Enter new password"
                                value={newPassword}
                                onChange={(event) =>
                                    setNewPassword(
                                        event.target.value
                                    )
                                }
                                minLength={8}
                                required
                            />

                        </div>


                        <div className="form-group">

                            <label>

                                Confirm Password

                            </label>

                            <input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                                minLength={8}
                                required
                            />

                        </div>


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
                                ? "Resetting..."
                                : "Reset Password"
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

export default ResetPassword;