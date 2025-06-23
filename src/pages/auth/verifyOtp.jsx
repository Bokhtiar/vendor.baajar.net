import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import { publicRequest } from "../../config/axios.config";
import { ImageUpload, TextInput } from "../../components/input";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

const VerifyOtp = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  console.log("Received ID:", id);

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    const formData = new FormData();

    formData.append("phone", data.phone_number);
    formData.append("code", data.code);

    try {
      const response = await publicRequest.post("vendor/verify-otp", formData);
      Toastify.Success("Registration successful!");
      navigate("/setpassword");
      navigate(`/setpassword?id=${id}`);
    } catch (error) {
      Toastify.Error("Registration failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-20 mx-auto py-10 flex justify-center">
      <div className="flex flex-col items-center text-gray-700">
        <span className="font-semibold text-xl sm:text-2xl text-center leading-4">
          Vendor Registration
        </span>

        <div className="w-full bg-[#8B70D1] my-5 sm:w-[600px] p-6 sm:p-10 rounded-xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-white"
          >
            {/* Phone */}
            <TextInput
              name="phone_number"
              className="rounded-lg"
              control={control}
              type="text"
              label="Phone Number"
              placeholder="Enter phone number"
              rules={{ required: "Phone number is required" }}
              trigger={trigger}
              error={errors?.phone_number?.message}
            />

            {/* Company Name */}
            <TextInput
              name="code"
              className="rounded-lg"
              control={control}
              type="text"
              label="Otp Code"
              placeholder="Enter Your Code"
              rules={{ required: "Otp Code is required" }}
              trigger={trigger}
              error={errors?.code?.message}
            />

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-primary font-bold w-full py-3 rounded-md hover:bg-gray-100 mt-4"
            >
              {loading ? "Submitting..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
