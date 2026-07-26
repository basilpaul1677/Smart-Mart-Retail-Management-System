import { useEffect, useState } from "react";
import {
    User,
    Mail,
    Phone,
    ShieldCheck,
    Save,
    ArrowLeft,
    Sparkles,
    LockKeyhole,
    ShoppingBag,
    CheckCircle2
} from "lucide-react";

import { Link } from "react-router-dom";

import { useToast } from "../../context/ToastContext";
import userService from "../../services/userService";

import "../profile/Profile.css";

function AdminProfile() {
    const { success, error } = useToast();

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    });

    const [formErrors, setFormErrors] = useState({});

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [passwordErrors, setPasswordErrors] = useState({});

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            setIsLoading(true);

            const profile = await userService.getMyProfile();

            setFormData({
                firstName: profile.firstName || "",
                lastName: profile.lastName || "",
                email: profile.email || "",
                phoneNumber: profile.phoneNumber || ""
            });
        } catch (profileError) {
            console.error("Failed to load profile:", profileError);
            error(
                profileError?.response?.data?.message ||
                    "Unable to load profile"
            );
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

        setFormErrors((previousErrors) => ({
            ...previousErrors,
            [name]: ""
        }));
    };

    const validateForm = () => {
        const errors = {};

        if (!formData.firstName.trim()) {
            errors.firstName = "First name is required";
        }

        if (!formData.lastName.trim()) {
            errors.lastName = "Last name is required";
        }

        if (!formData.email.trim()) {
            errors.email = "Email is required";
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            errors.email = "Enter a valid email address";
        }

        if (!formData.phoneNumber.trim()) {
            errors.phoneNumber = "Phone number is required";
        } else if (!/^[0-9]{10}$/.test(formData.phoneNumber)) {
            errors.phoneNumber =
                "Phone number must contain exactly 10 digits";
        }

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!validateForm()) {
            error("Please correct the highlighted fields");
            return;
        }

        try {
            setIsSaving(true);

            const updatedProfile = await userService.updateMyProfile(
                formData
            );

            setFormData({
                firstName: updatedProfile.firstName || "",
                lastName: updatedProfile.lastName || "",
                email: updatedProfile.email || "",
                phoneNumber: updatedProfile.phoneNumber || ""
            });

            success("Profile updated successfully");
        } catch (updateError) {
            console.error("Profile update failed:", updateError);
            error(
                updateError?.response?.data?.message ||
                    "Unable to update profile"
            );
        } finally {
            setIsSaving(false);
        }
    };

    const handlePasswordChange = (event) => {
        const { name, value } = event.target;

        setPasswordData((previousData) => ({
            ...previousData,
            [name]: value
        }));

        setPasswordErrors((previousErrors) => ({
            ...previousErrors,
            [name]: ""
        }));
    };

    const validatePasswordForm = () => {
        const errors = {};

        if (!passwordData.currentPassword.trim()) {
            errors.currentPassword = "Current password is required";
        }

        if (!passwordData.newPassword.trim()) {
            errors.newPassword = "New password is required";
        } else if (passwordData.newPassword.length < 8) {
            errors.newPassword = "Password must contain at least 8 characters";
        }

        if (!passwordData.confirmPassword.trim()) {
            errors.confirmPassword = "Please confirm your new password";
        }

        if (
            passwordData.newPassword &&
            passwordData.confirmPassword &&
            passwordData.newPassword !== passwordData.confirmPassword
        ) {
            errors.confirmPassword = "Passwords do not match";
        }

        setPasswordErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handlePasswordSubmit = async (event) => {
        event.preventDefault();

        if (!validatePasswordForm()) {
            error("Please correct the highlighted password fields");
            return;
        }

        try {
            setIsSaving(true);

            await userService.changeMyPassword(passwordData);

            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: ""
            });

            success("Password updated successfully");
        } catch (passwordError) {
            console.error("Password update failed:", passwordError);
            error(
                passwordError?.response?.data?.message ||
                    "Unable to update password"
            );
        } finally {
            setIsSaving(false);
        }
    };

    const getInitials = () => {
        const firstInitial =
            formData.firstName?.charAt(0)?.toUpperCase() || "";
        const lastInitial =
            formData.lastName?.charAt(0)?.toUpperCase() || "";

        return firstInitial + lastInitial;
    };

    if (isLoading) {
        return (
            <main className="profile-page page">
                <div className="container">
                    <div className="profile-loading">
                        <div className="profile-loading-spinner" />
                        <p>Loading your profile...</p>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="profile-page page admin-profile-page">
            <div className="container">
                <Link to="/admin/dashboard" className="profile-back-link">
                    <ArrowLeft size={17} />
                    Back to Dashboard
                </Link>

                <section className="profile-hero">
                    <div className="profile-hero-background" />

                    <div className="profile-hero-content">
                        <div className="profile-avatar-wrapper">
                            <div className="profile-avatar">
                                {getInitials() || "A"}
                            </div>

                            <div className="profile-avatar-status">
                                <ShieldCheck size={14} />
                            </div>
                        </div>

                        <div className="profile-identity">
                            <span className="profile-eyebrow">
                                <Sparkles size={14} />
                                Admin Member
                            </span>

                            <h1>
                                {formData.firstName} {formData.lastName}
                            </h1>

                            <p>
                                Manage your admin contact details and account security.
                            </p>
                        </div>

                        <div className="profile-member-badge">
                            <ShieldCheck size={18} />
                            <span>Verified Admin</span>
                        </div>
                    </div>
                </section>

                <div className="profile-content">
                    <section className="profile-card">
                        <div className="profile-card-header">
                            <div className="profile-card-icon">
                                <User size={21} />
                            </div>

                            <div>
                                <span className="profile-card-label">
                                    Account Details
                                </span>

                                <h2>Personal Information</h2>

                                <p>
                                    Update your email and phone number.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="profile-form-grid">
                                <div className="form-field">
                                    <label htmlFor="firstName">
                                        First Name
                                    </label>

                                    <div className="profile-input-wrapper">
                                        <User size={17} />
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter first name"
                                        />
                                    </div>

                                    {formErrors.firstName && (
                                        <span className="field-error">
                                            {formErrors.firstName}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label htmlFor="lastName">
                                        Last Name
                                    </label>

                                    <div className="profile-input-wrapper">
                                        <User size={17} />
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
                                        />
                                    </div>

                                    {formErrors.lastName && (
                                        <span className="field-error">
                                            {formErrors.lastName}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label htmlFor="email">
                                        Email Address
                                    </label>

                                    <div className="profile-input-wrapper">
                                        <Mail size={17} />
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email address"
                                        />
                                    </div>

                                    {formErrors.email && (
                                        <span className="field-error">
                                            {formErrors.email}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label htmlFor="phoneNumber">
                                        Phone Number
                                    </label>

                                    <div className="profile-input-wrapper">
                                        <Phone size={17} />
                                        <input
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            type="tel"
                                            value={formData.phoneNumber}
                                            onChange={handleChange}
                                            placeholder="Enter 10 digit phone number"
                                        />
                                    </div>

                                    {formErrors.phoneNumber && (
                                        <span className="field-error">
                                            {formErrors.phoneNumber}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="profile-form-footer">
                                <p>
                                    <CheckCircle2 size={15} />
                                    Your profile information is securely stored.
                                </p>

                                <button
                                    type="submit"
                                    className="profile-save-button"
                                    disabled={isSaving}
                                >
                                    <Save size={17} />
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </section>

                    <section className="profile-card profile-password-card">
                        <div className="profile-card-header">
                            <div className="profile-card-icon">
                                <LockKeyhole size={21} />
                            </div>

                            <div>
                                <span className="profile-card-label">
                                    Account Security
                                </span>

                                <h2>Change Password</h2>

                                <p>
                                    Update your password to keep your account secure.
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handlePasswordSubmit} className="profile-form">
                            <div className="profile-form-grid">
                                <div className="form-field">
                                    <label htmlFor="currentPassword">
                                        Current Password
                                    </label>

                                    <div className="profile-input-wrapper">
                                        <LockKeyhole size={17} />
                                        <input
                                            id="currentPassword"
                                            type="password"
                                            name="currentPassword"
                                            value={passwordData.currentPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Enter current password"
                                        />
                                    </div>

                                    {passwordErrors.currentPassword && (
                                        <span className="field-error">
                                            {passwordErrors.currentPassword}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label htmlFor="newPassword">
                                        New Password
                                    </label>

                                    <div className="profile-input-wrapper">
                                        <LockKeyhole size={17} />
                                        <input
                                            id="newPassword"
                                            type="password"
                                            name="newPassword"
                                            value={passwordData.newPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Enter new password"
                                        />
                                    </div>

                                    {passwordErrors.newPassword && (
                                        <span className="field-error">
                                            {passwordErrors.newPassword}
                                        </span>
                                    )}
                                </div>

                                <div className="form-field">
                                    <label htmlFor="confirmPassword">
                                        Confirm New Password
                                    </label>

                                    <div className="profile-input-wrapper">
                                        <LockKeyhole size={17} />
                                        <input
                                            id="confirmPassword"
                                            type="password"
                                            name="confirmPassword"
                                            value={passwordData.confirmPassword}
                                            onChange={handlePasswordChange}
                                            placeholder="Confirm new password"
                                        />
                                    </div>

                                    {passwordErrors.confirmPassword && (
                                        <span className="field-error">
                                            {passwordErrors.confirmPassword}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="profile-form-footer">
                                <p>
                                    <ShieldCheck size={15} />
                                    Use a strong password with at least 8 characters.
                                </p>

                                <button
                                    type="submit"
                                    className="profile-save-button"
                                    disabled={isSaving}
                                >
                                    <LockKeyhole size={17} />
                                    {isSaving
                                        ? "Updating Password..."
                                        : "Update Password"}
                                </button>
                            </div>
                        </form>
                    </section>

                    <aside className="profile-sidebar">
                        <div className="profile-sidebar-card">
                            <div className="sidebar-card-icon">
                                <ShoppingBag size={22} />
                            </div>

                            <h3>Admin Overview</h3>

                            <p>
                                Manage your admin contact details and password
                                from this secure admin profile page.
                            </p>

                            <div className="profile-security-card">
                                <ShieldCheck size={17} />
                                <div>
                                    <strong>Admin Security Active</strong>
                                    <p>
                                        Only authenticated admin users can access this page.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}

export default AdminProfile;