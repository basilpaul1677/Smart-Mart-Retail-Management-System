import { motion } from "framer-motion";

import "./AuthLayout.css";

function AuthLayout({ children }) {

    return (
        <main className="auth-page">

            <div className="auth-background-shape shape-one"></div>

            <div className="auth-background-shape shape-two"></div>

            <motion.div
                className="auth-container"

                initial={{
                    opacity: 0,
                    y: 25
                }}

                animate={{
                    opacity: 1,
                    y: 0
                }}

                transition={{
                    duration: 0.5
                }}
            >

                {children}

            </motion.div>

        </main>
    );
}

export default AuthLayout;