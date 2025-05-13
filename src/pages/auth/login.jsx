import React, { useEffect, useState } from "react";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
// import { getToken, networkErrorHandeller, setToken } from "@/utils/helpers";
// import { useProduct } from "@/hooks/useProducts";
// import { PasswordInput, TextInput } from "@/components/input";
// import Spinner from "@/components/spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { publicRequest } from "@/config/axios.config";

const Login = () => {
  // const userInfo = useProduct();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect");

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    trigger,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setLoading(true);
    // const newData = {
    //   email: data.contactInfo,
    //   password: data.password,
    // };
    try {
      // const response = await publicRequest.post("login", newData);
      // if (response.data.data.token) {
      //   userInfo.setToken(response.data.data.token);
      //   setToken(response.data.data.token);
      //   navigate(redirect ? redirect : "/");
      // }
      console.log("Submitted Data:", data); // Simulate login
      navigate(redirect ? redirect : "/");
    } catch (error) {
      // networkErrorHandeller(error);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // if (getToken()) navigate("/");
  }, [navigate]);

  return (
    <div className="container mt-36 mx-auto py-10 flex justify-center">
      <div className="flex flex-col items-center text-gray-700">
        <span className="font-semibold text-xl sm:text-2xl text-center leading-4">
          Welcome to ZANmart
        </span>
        <span className="font-semibold text-xl sm:text-2xl text-center pb-6 sm:pb-10 leading-4">
          Sign into your account
        </span>
        <div className="bg-primary w-full sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center justify-center">
          <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full bg-white overflow-hidden">
            <img
              src="/logo.png"
              height={80}
              width={80}
              alt="Logo"
              className="p-5 w-full h-full object-contain"
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            {/* Email Field */}
            <div className="mt-5">
              <input type="text" />
              {/* <TextInput
                name="contactInfo"
                type="email"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <MdOutlineMailOutline className="h-5 w-5" />
                    E-mail
                  </div>
                }
                rules={{
                  required: "Email required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{10}$/,
                    message: "Invalid phone number or email",
                  },
                }}
                error={errors?.contactInfo?.message}
                placeholder="Enter your email"
                trigger={trigger}
              /> */}
            </div>

            {/* Password Field */}
            <div className="relative mt-5">
              {/* <PasswordInput
                name="password"
                placeholder="Enter your Password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <MdOutlineLock className="h-5 w-5" />
                    Password
                  </div>
                }
                error={errors?.password?.message}
                trigger={trigger}
              /> */}
              <input type="text" />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={!isValid}
                className={`mt-2 sm:mt-4 gap-2 w-full text-primary flex justify-center items-center bg-white rounded-lg text-xs font-bold sm:py-3.5 px-16 sm:px-20 hover:bg-gray-100 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? 'Running' : "Login"}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex mt-4 items-center gap-4 w-full">
            <hr className="block w-full" />
            <span className="text-white">or</span>
            <hr className="w-full block" />
          </div>

          {/* Google Sign-In */}
          <div className="flex items-center justify-center mt-4 w-full bg-white text-gray-700 font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-200">
            <button
              onClick={() => {
                // Commented out since API is not available
                // window.location.href = `${process.env.REACT_APP_API_SERVER}api/auth/google?route=${redirect ? redirect : "/"}`;
                alert("Google Sign-In Redirect (placeholder)");
              }}
              className="w-full flex items-center justify-center gap-3"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-7 h-7"
                alt="Google logo"
              />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="mt-5 text-center">
            <Link
              to="/auth/forget-pass"
              className="text-white font-semibold text-sm sm:p-4 leading-6 hover:underline"
            >
              Forgot password?
            </Link>
            <p className="text-white font-light text-sm leading-6 pt-2">
              Don&apos;t have an account?{" "}
              <Link
                to={
                  redirect
                    ? `/auth/register?redirect=${redirect}`
                    : "/auth/register"
                }
                className="hover:underline"
              >
                <strong className="text-sm font-semibold">Sign Up Now</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;