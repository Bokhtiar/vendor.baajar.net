import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import { publicRequest } from "../../config/axios.config";
import { ImageUpload, TextInput } from "../../components/input";
import { networkErrorHandeller } from "../../utils/helpers";

const Register = () => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    
    setLoading(true);
    const formData = new FormData();

    formData.append("phone_number", data.phone_number);
    formData.append("company_name", data.company_name);
    formData.append("email", data.email);
    formData.append("date_of_birth", data.date_of_birth);
    formData.append("nid", data.nid);
    formData.append("company_location", data.company_location);
    formData.append("logo", data.logo);
    formData.append("tread_licence", data.tread_licence);

    try {
      const response = await publicRequest.post("vendor/register", formData);
      
      Toastify.Success("Registration successful!");
      navigate(`/verify-otp?id=${response?.data?.data?.phone_number}`);
    } catch (error) {
      networkErrorHandeller(error);
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
              name="company_name"
              className="rounded-lg"
              control={control}
              type="text"
              label="Company Name"
              placeholder="Enter company name"
              rules={{ required: "Company name is required" }}
              trigger={trigger}
              error={errors?.company_name?.message}
            />

            {/* Email */}
            <TextInput
              name="email"
              className="rounded-lg"
              control={control}
              type="email"
              label="Email"
              placeholder="Enter email"
              rules={{ required: "Email is required" }}
              trigger={trigger}
              error={errors?.email?.message}
            />

            {/* DOB */}
            <TextInput
              name="date_of_birth"
              className="rounded-lg"
              control={control}
              type="date"
              label="Date of Birth"
              rules={{ required: "Date of birth is required" }}
              trigger={trigger}
              error={errors?.date_of_birth?.message}
            />

            {/* NID */}
            <TextInput
              name="nid"
              className="rounded-lg"
              control={control}
              type="text"
              label="NID"
              placeholder="Enter NID"
              rules={{ required: "NID is required" }}
              trigger={trigger}
              error={errors?.nid?.message}
            />

            {/* Company Location */}
            <TextInput
              name="company_location"
              className="rounded-lg"
              control={control}
              type="text"
              label="Company Location"
              placeholder="Enter location"
              rules={{ required: "Location is required" }}
              trigger={trigger}
              error={errors?.company_location?.message}
            />
            {/* logo */}
            <div className="mt-4 cursor-pointer">
              <ImageUpload
                name="logo"
                control={control}
                  label="Logo"
                // required
                onUpload={(file) => setValue("logo", file)}
                error={errors.logo?.message}
              />
            </div>
            {/* licence */}
            <div className="mt-4 cursor-pointer">
              <ImageUpload
                name="tread_licence"
                control={control}
                label="Tread Licence"
                // required
                onUpload={(file) => setValue("tread_licence", file)}
                error={errors.logo?.message}
              />
            </div>


            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-primary font-bold w-full py-3 rounded-md hover:bg-gray-100 mt-4"
            >
              {loading ? "Submitting..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
