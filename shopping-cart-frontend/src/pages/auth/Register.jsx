import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const { register } = useAuth();

    const { showToast } = useToast();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phoneNumber: ""
    });

    const [errors, setErrors] = useState({});

    const [isLoading, setIsLoading] = useState(false);


    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: ""
        }));
    };


    const validateForm = () => {

        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName =
                "First name is required";
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName =
                "Last name is required";
        }

        if (!formData.email.trim()) {

            newErrors.email =
                "Email is required";

        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                .test(formData.email)
        ) {

            newErrors.email =
                "Please enter a valid email address";
        }

        if (!formData.password) {

            newErrors.password =
                "Password is required";

        } else if (formData.password.length < 8) {

            newErrors.password =
                "Password must contain at least 8 characters";

        } else if (
            !/[A-Za-z]/.test(formData.password) ||
            !/\d/.test(formData.password)
        ) {

            newErrors.password =
                "Password must contain at least one letter and one number";
        }

        if (!formData.phoneNumber.trim()) {

            newErrors.phoneNumber =
                "Phone number is required";

        } else if (
            !/^[0-9]{10}$/
                .test(formData.phoneNumber)
        ) {

            newErrors.phoneNumber =
                "Phone number must contain exactly 10 digits";
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

            await register(formData);

            showToast(
                "Registration successful! Please login.",
                "success"
            );

            navigate("/login");

        } catch (error) {

            showToast(
                error?.response?.data?.message ||
                "Registration failed. Please try again.",
                "error"
            );

        } finally {

            setIsLoading(false);
        }
    };


    return (

        <main className="auth-page">

            <div className="auth-container register-container">

                <section className="auth-card">

                    <div className="auth-header">

                        <span className="auth-badge">
                            Join Us
                        </span>

                        <h1>
                            Create your account
                        </h1>

                        <p>
                            Start your shopping journey with us.
                        </p>

                    </div>


                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-row">

                            <div className="form-group">

                                <label htmlFor="firstName">
                                    First Name
                                </label>

                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className={
                                        errors.firstName
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.firstName && (

                                    <span className="field-error">
                                        {errors.firstName}
                                    </span>

                                )}

                            </div>


                            <div className="form-group">

                                <label htmlFor="lastName">
                                    Last Name
                                </label>

                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className={
                                        errors.lastName
                                            ? "input-error"
                                            : ""
                                    }
                                />

                                {errors.lastName && (

                                    <span className="field-error">
                                        {errors.lastName}
                                    </span>

                                )}

                            </div>

                        </div>


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
                                    errors.email
                                        ? "input-error"
                                        : ""
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
                                placeholder="Create a password"
                                value={formData.password}
                                onChange={handleChange}
                                className={
                                    errors.password
                                        ? "input-error"
                                        : ""
                                }
                            />

                            {errors.password && (

                                <span className="field-error">
                                    {errors.password}
                                </span>

                            )}

                            <small className="input-hint">
                                Minimum 8 characters with at least
                                one letter and one number.
                            </small>

                        </div>


                        <div className="form-group">

                            <label htmlFor="phoneNumber">
                                Phone Number
                            </label>

                            <input
                                id="phoneNumber"
                                name="phoneNumber"
                                type="tel"
                                placeholder="Enter 10-digit phone number"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                maxLength={10}
                                className={
                                    errors.phoneNumber
                                        ? "input-error"
                                        : ""
                                }
                            />

                            {errors.phoneNumber && (

                                <span className="field-error">
                                    {errors.phoneNumber}
                                </span>

                            )}

                        </div>


                        <button
                            type="submit"
                            className="auth-submit-button"
                            disabled={isLoading}
                        >

                            {isLoading ? (

                                <span className="button-loading">

                                    <span className="spinner"></span>

                                    Creating account...

                                </span>

                            ) : (

                                "Create Account"

                            )}

                        </button>

                    </form>


                    <div className="auth-footer">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/login">
                            Sign in
                        </Link>

                    </div>

                </section>

            </div>

        </main>

    );
}

export default Register;