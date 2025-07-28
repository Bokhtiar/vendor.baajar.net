import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network";
import { Toastify } from "../../components/toastify";
import { networkErrorHandeller } from "../../utils/helpers";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCamera } from "react-icons/ci";

export default function WithdrowModal({ onClose,fetchColor }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const modalRef = useRef();

  const [btnloading, setBtnLoading] = useState(false);

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const onFormSubmit = async (data) => {
    console.log("formData", data);
    try {
      setBtnLoading(true); // Loader চালু

      const formData = new FormData();
      formData.append("amount", data.amount);
      formData.append("account_number", data.account_number);
     


      const response = await NetworkServices.Earning.store(formData);
      console.log("response", response);

      if (response && response.status === 200) {
        Toastify.Success("Withdraw successfully!");
        
        reset();
        onClose();
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setBtnLoading(false);
    }
  };

  



  return (
    <div className="fixed inset-0 bg-gradient-to-b from-black/85 to-black  flex items-center justify-center z-50 px-4">
      <div
        ref={modalRef}
        className="bg-white p-6 rounded-2xl shadow-md w-[400px] "
      >
        <h2 className="text-center text-xl font-semibold mb-6">
          Available Withdraw
        </h2>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Category Name */}
          <div>
            <input
              type="text"
              placeholder="Enter Amount"
              {...register("amount", { required: "Amount name is required" })}
              className={`w-full px-4 py-2 border rounded-full focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm ">{errors.amount.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Account Number"
              {...register("account_number", { required: "Account Number is required" })}
              className={`w-full px-4 py-2 border rounded-full focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm ">{errors.account_number.message}</p>
            )}
          </div>



          {/* Submit Button */}
          <div className="w-full flex justify-center">
            <button
              type="submit"
              className="w-[50%] bg-[#13BF00] hover:bg-green-600 text-white py-2 rounded-full mt-4 flex items-center justify-center gap-2 cursor-pointer"
            >
              {btnloading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              )}
              {btnloading ? "loading..." : "Withdraw"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
