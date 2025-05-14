import React, { useEffect, useState } from "react";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
// import { getToken, networkErrorHandeller, setToken } from "@/utils/helpers";
// import { useProduct } from "@/hooks/useProducts";
// import Spinner from "@/components/spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PassworInput, TextInput } from "../../components/input";
import { LuLockKeyhole } from "react-icons/lu";
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
          Welcome vendor.Login Hare
        </span>

        <div className=" w-full bg-[#8B70D1] my-5 sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center justify-center">
          <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full bg-white overflow-hidden">
            <img
              src="/image/login-profile.svg"
              height={80}
              width={80}
              alt="Logo"
              className=" w-full h-full bg-[#8B70D1] object-contain"
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            {/* Email Field */}
            <div className="mt-5">

              <TextInput className="rounded-lg"
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
              />
            </div>

            {/* Password Field */}
            <div className="relative mt-5">
              <PassworInput className="rounded-lg"
                name='Password'
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <LuLockKeyhole className="h-5 w-5" />
                    password
                  </div>
                }
                rules={{
                  required: "Password Require",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{10}$/,
                    message: "Invalid Password",
                  },
                }}
                error={errors?.contactInfo?.message}
                placeholder="Enter your email"
                trigger={trigger}
              />

            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={!isValid}
                className={`mt-2 sm:mt-4 gap-2  text-primary flex justify-center items-center bg-white rounded-lg text-xs font-bold sm:py-3.5 px-16 sm:px-20 hover:bg-gray-100 ${!isValid ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? 'Running' : "Login"}
              </button>
            </div>
          </form>

          {/* Divider */}
          {/* <div className="flex mt-4 items-center gap-4 w-full">
            <hr className="block w-full" />
            <span className="text-white">or</span>
            <hr className="w-full block" />
          </div> */}

          {/* <div className="flex items-center justify-center mt-4 w-full bg-white text-gray-700 font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-200">
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
          </div> */}

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