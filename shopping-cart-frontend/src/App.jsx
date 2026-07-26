import AppRoutes
from "./routes/AppRoutes";


import {

    AuthProvider

} from "./context/AuthContext";


import {

    ToastProvider

} from "./context/ToastContext";


import ToastContainer

from "./components/notifications/ToastContainer";




import {

    CartProvider

} from "./context/CartContext";


function App() {


    return (

        <ToastProvider>

            <AuthProvider>

                <CartProvider>


                    {/* Navbar must be inside BrowserRouter */}

                    <AppRoutes />


                    <ToastContainer />


                </CartProvider>

            </AuthProvider>

        </ToastProvider>

    );

}


export default App;