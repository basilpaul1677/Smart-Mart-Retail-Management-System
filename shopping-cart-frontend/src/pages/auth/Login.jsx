import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import "./Login.css";

function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const { success, error } = useToast();

    const [
        formData,
        setFormData
    ] = useState({
        email: "",
        password: ""
    });

    const [
        errors,
        setErrors
    ] = useState({});

    const [
        isLoading,
        setIsLoading
    ] = useState(false);

    const handleChange = (event) => {
        const {
            name,
            value
        } = event.target;

        setFormData(previousData => ({
            ...previousData,
            [name]: value
        }));

        setErrors(previousErrors => ({
            ...previousErrors,
            [name]: ""
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            setIsLoading(true);

            const response = await login(formData);

            success("Login successful!");

            if (response?.role === "ROLE_ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/products");
            }
        } catch (err) {
            error(
                err?.response?.data?.message || "Invalid email or password"
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">
                <section className="auth-card">
                    <div className="auth-header">
                        <span className="auth-badge">
                            Welcome Back
                        </span>

                        <h1>
                            Sign in to your account
                        </h1>

                        <p>
                            Continue shopping with us.
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
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                className={
                                    errors.email ? "input-error" : ""
                                }
                            />

                            {errors.email && (
                                <span className="field-error">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                className={
                                    errors.password ? "input-error" : ""
                                }
                            />

                            {errors.password && (
                                <span className="field-error">
                                    {errors.password}
                                </span>
                            )}
                        </div>

                        <div className="forgot-password-wrapper">
                            <Link
                                to="/forgot-password"
                                className="forgot-password-link"
                            >
                                Forgot Password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="auth-submit-button"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="button-loading">
                                    <span className="spinner"></span>
                                    Signing in...
                                </span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/register">
                            Create an account
                        </Link>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default Login;