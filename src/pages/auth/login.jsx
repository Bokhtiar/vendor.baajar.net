import React, { useEffect, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PassworInput, TextInput } from "../../components/input";
import { LuLockKeyhole } from "react-icons/lu";
import { publicRequest } from "../../config/axios.config";
import { setToken } from "../../utils/helpers";
import { Toastify } from "../../components/toastify";
import { FaPhone } from "react-icons/fa";

const Login = () => {
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
    // navigate('/dashboard')
    // console.log("Form Data:", data);
    setLoading(true);
    const newData = {
      phone_number: data.phone_number,
      password: data.password,
    };
    console.log("Submitted Data:", newData);
    try {
      const response = await publicRequest.post("vendor/login", newData);
      console.log("response",response)
      if (response?.data?.data?.vendor?.role=="vendor") {
        setToken(response?.data?.data?.token);
        Toastify.Success("Login successfully done");
        console.log("Login successful:", response.data);
         navigate(redirect ? redirect : "/dashboard");
      }
    } catch (error) {
      Toastify.Error("Invalid user ",);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-36 mx-auto py-10 flex justify-center">
      <div className="flex flex-col items-center text-gray-700">
        <span className="font-semibold text-xl sm:text-2xl text-center leading-4">
          Welcome vendor. Login Here
        </span>

        <div className="w-full bg-[#8B70D1] my-5 sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center justify-center">
          <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full bg-white overflow-hidden">
            <img
              src="/image/login-profile.svg"
              height={80}
              width={80}
              alt="Logo"
              className="w-full h-full bg-[#8B70D1] object-contain"
            />
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            {/* Phone Field */}
            <div className="mt-5">
              <TextInput
                className="rounded-lg"
                name="phone_number"
                type="tel"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <FaPhone className="h-5 w-5" />
                    Phone
                  </div>
                }
                rules={{
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{11}$/,
                    message: "Invalid phone number",
                  },
                }}
                error={errors?.contactInfo?.message}
                placeholder="Enter your phone number"
                trigger={trigger}
              />
            </div>

            {/* Password Field */}
            <div className="relative mt-5">
              <PassworInput
                className="rounded-lg"
                name="password"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <LuLockKeyhole className="h-5 w-5" />
                    Password
                  </div>
                }
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                error={errors?.password?.message}
                placeholder="Enter your password"
                trigger={trigger}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                className={`mt-2 sm:mt-4 gap-2 text-primary flex justify-center items-center bg-white rounded-lg text-xs font-bold sm:py-3.5 px-16 sm:px-20 py-3 hover:bg-gray-100 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={!isValid || loading}
              >
                {loading ? "Running..." : "Login"}
              </button>
            </div>
          </form>

          {/* Forgot Password & Register */}
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
                    : "/register"
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






