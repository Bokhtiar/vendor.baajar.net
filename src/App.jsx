import { permittedRoutes } from "./routes";
import { Navigate, useRoutes } from "react-router-dom";  
import { ToastContainer } from "react-toastify";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Footer from "./components/footer/footer";

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
