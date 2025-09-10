

import  { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Toastify } from "../../../components/toastify";
import { publicRequest } from "../../../config/axios.config";
import { networkErrorHandeller } from "../../../utils/helpers";

const CheckOtp = () => {
  const [otp, setOtp] = useState("XXXX");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 4) {
      Toastify.Error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("phone", id);
    formData.append("code", otp);

    try {
      await publicRequest.post("vendor/forgot-code-check", formData);
      Toastify.Success("OTP verified successfully");
      navigate(`/setpassword?id=${id}`);
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
          Check OTP
        </span>

        <div className="w-full bg-[#DC2626] my-5 sm:w-[600px] p-6 sm:p-10 rounded-xl">
          <form onSubmit={onSubmit} className="space-y-4 text-white">
            {/* OTP Input */}
            <div className="flex justify-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderInput={(props) => (
                  <input
                   placeholder="X"
                    {...props}
                    style={{
                      width: "4rem",
                      height: "4rem",
                      margin: "0.25rem",
                      borderRadius: "0.5rem",
                      outline: "none",
                      backgroundColor: "#fff",
                      textAlign: "center",
                      fontSize: "2rem",
                      border: "1px solid #ccc",
                      color: "#000"
                    }}
                    className="placeholder-gray-400"
                  />
                )}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-primary font-bold w-full py-3 rounded-md hover:bg-gray-100 mt-4"
            >
              {loading ? "Submitting..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckOtp;

