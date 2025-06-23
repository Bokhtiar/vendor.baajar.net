import React, {  useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { Toastify } from "../../components/toastify";
import { publicRequest } from "../../config/axios.config";
import { ImageUpload, PassworInput, SingleSelect, TextInput } from "../../components/input";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import { NetworkServices } from "../../network";
import { LuLockKeyhole } from "react-icons/lu";

const PasswordSetup = () => {
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    trigger,
  } = useForm({ mode: "onChange" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  console.log("Received :", id);
  //   const [categories, setCategories] = useState([]);

  //   const [btnloading, setBtnLoading] = useState(false);

  //     const fetchCategory = useCallback(async () => {
  //     setLoading(true);
  //     try {
  //       const response = await NetworkServices.Category.index();

  //       if (response && response.status === 200) {
  //         const result = response.data.data.map((item) => {
  //           return {
  //             label: item.category_name,
  //             value: item.category_name,
  //             ...item,
  //           };
  //         });
  //         setCategories(result);
  //       }
  //     } catch (error) {
  //       console.error("Fetch Category Error:", error);
  //     }
  //     setLoading(false);
  //   }, []);

  //   useEffect(() => {
  //     fetchCategory();
  //   }, [fetchCategory]);

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    const formData = new FormData();

    formData.append("vendor_id", id);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);

    try {
      const response = await publicRequest.post("vendor/password-setup", formData);
      Toastify.Success("Registration successful!");
      navigate("/login");
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
            <div className="mb-4">
              <SingleSelect
                name="singleSelect"
                control={control}
                // options={categories}
                // rules={{ required: "Category selection is required" }}
                onSelected={(selected) =>
                  setValue("vendor_id", selected?.vendor_id)
                }
                placeholder="Select a Vendor "
                error={errors.singleSelect?.message}
                label="Choose Vendor "
                isClearable={true}
                // error={errors} // Pass an error message if validation fails
              />
            </div>
            {/* Phone */}
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

            <div className="relative mt-5">
              <PassworInput
                className="rounded-lg"
                name="password_confirmation"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <LuLockKeyhole className="h-5 w-5" />
                   Confirm Password
                  </div>
                }
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                error={errors?.password_confirmation?.message}
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
              {loading ? "Submitting..." : "Verify"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordSetup;
