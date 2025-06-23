import { permittedRoutes } from "./routes";
import { Navigate, useRoutes } from "react-router-dom";  
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Footer from "./components/footer/footer";
import VerifyOtp from "./pages/auth/verifyOtp";
import PasswordSetup from "./pages/auth/passwordSetup";

function App() {
  const mainRoutes = {
    path: "/",
    element:  "",
    children: [
      { path: "*", element: <Navigate to="/404" /> },
      { path: "/", element: <Login/> },
      // { path: "/otp", element: <OTP /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/verify-otp", element: <VerifyOtp /> },
      { path: "/setpassword", element: <PasswordSetup /> },
    ],
  };

  const routing = useRoutes([mainRoutes, ...permittedRoutes()]);

  return (
    <div className=" ">
      {routing} 
      <ToastContainer />
      <Footer/>
    </div>
  );
}

export default App;
