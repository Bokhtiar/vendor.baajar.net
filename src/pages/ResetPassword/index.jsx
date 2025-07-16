import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { privateRequest, publicRequest } from '../../config/axios.config';
import { Toastify } from '../../components/toastify';
import { networkErrorHandeller } from '../../utils/helpers';
import { PassworInput } from '../../components/input';
import { LuLockKeyhole } from 'react-icons/lu';

const ResetPassword = () => {

    const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("current_password", data.current_password);
    formData.append("new_password", data.new_password);

    try {
      const response = await privateRequest.post(
        "vendor/reset-password",
        formData
      );
      Toastify.Success(" password Reset successful!");
      navigate("/login");
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
           Reset Password
        </span>

        <div className="w-full bg-[#8B70D1] my-5 sm:w-[600px] p-6 sm:p-10 rounded-xl">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 text-white"
          >
            {/* Phone */}
            <div className="relative mt-5">
              <PassworInput
                className="rounded-lg"
                name="current_password"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <LuLockKeyhole className="h-5 w-5" />
                    current Password
                  </div>
                }
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                error={errors?.current_password?.message}
                placeholder="Enter your password"
                trigger={trigger}
              />
            </div>

            <div className="relative mt-5">
              <PassworInput
                className="rounded-lg"
                name="new_password"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <LuLockKeyhole className="h-5 w-5" />
                    New Password
                  </div>
                }
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                error={errors?.new_password?.message}
                placeholder="Enter your password"
                trigger={trigger}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-primary font-bold w-full py-3 rounded-md hover:bg-gray-100 mt-4"
            >
              {loading ? "Submitting..." : "Save changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;