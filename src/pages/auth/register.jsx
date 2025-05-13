import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaRegUser } from "react-icons/fa"; // Import Icons
import { MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [focusField, setFocusField] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputValues, setInputValues] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  }); // Error state
  const passwordRef = useRef(null); // Create ref for password input
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    passwordRef.current.focus(); // Focus the input when clicking the button
  };

  // Validate fields
  const validateFields = () => {
    const newErrors = { username: "", email: "", password: "" };
    if (!inputValues.username) {
      newErrors.username = "Username is required.";
    }
    if (!inputValues.email) {
      newErrors.email = "email is required.";
    }

    if (!inputValues.password) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      // Proceed with the login logic
      navigate("/");
      alert("registration successful");
      console.log("inputValues", inputValues);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-600">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/image/bg/starry-night.webp')" }}
      ></div>
      <div className="relative w-96 p-8 bg-white/30 rounded-lg  text-white border border-white">
        <h2 className="text-center text-2xl font-bold mb-4">Registration</h2>
        <div className="space-y-6">
          {/* Username Input */}
          <div className="relative">
            <label
              htmlFor="username"
              className={`absolute left-3 text-sm text-white transition-all cursor-pointer  ${
                focusField === "username" || inputValues.username
                  ? "-top-3 left-3  text-white"
                  : "top-6"
              }`}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={inputValues.username}
              className="w-full p-3 pr-10 text-white outline-none border-b-2  bg-transparent"
              onFocus={() => setFocusField("username")}
              onBlur={() => setFocusField("")}
              onChange={(e) => {
                setInputValues({ ...inputValues, username: e.target.value });
                if (errors.username) {
                  setErrors({ ...errors, username: "" });
                }
              }}
            />
            <span className="absolute right-3 top-6 text-white">
              <FaRegUser />
            </span>
            {errors.username && (
              <label className="text-red-500 text-xs mt-1">
                {errors.username}
              </label>
            )}
          </div>
          {/* Username Input */}
          <div className="relative">
            <label
              htmlFor="email"
              className={`absolute left-3 text-sm text-white transition-all cursor-pointer ${
                focusField === "email" || inputValues.email
                  ? "-top-3 left-3  text-white"
                  : "top-6"
              }`}
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              value={inputValues.email}
              className="w-full p-3 pr-10 text-white outline-none border-b-2 bg-transparent"
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField("")}
              onChange={(e) => {
                setInputValues({ ...inputValues, email: e.target.value });
                if (errors.email) {
                  setErrors({ ...errors, email: "" });
                }
              }}
            />
            <span className="absolute right-3 top-6 text-white">
              <MdOutlineEmail />
            </span>
            {errors.email && (
              <label className="text-red-500 text-xs mt-1">
                {errors.email}
              </label>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <label
              htmlFor="pass"
              className={`absolute left-3 text-sm text-white transition-all cursor-pointer ${
                focusField === "password" || inputValues.password
                  ? "-top-3 left-3  text-white"
                  : "top-6"
              }`}
            >
              Password
            </label>
            <input
              id="pass"
              ref={passwordRef} // Assign ref to password input
              type={showPassword ? "text" : "password"}
              value={inputValues.password}
              className="w-full p-3 pr-10 text-white outline-none border-b-2 bg-transparent"
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField("")}
              onChange={(e) => {
                setInputValues({ ...inputValues, password: e.target.value });
                if (errors.password) {
                  setErrors({ ...errors, password: "" });
                }
              }}
            />
            {/* Show/Hide Password Button */}
            <button
              type="button"
              className="absolute right-3 top-6 text-white focus:outline-none cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && (
              <label className="text-red-500 text-xs mt-1">
                {errors.password}
              </label>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button
            className="w-full bg-white text-gray-600 py-2 rounded-lg font-bold transition cursor-pointer"
            onClick={handleSubmit} // Trigger validation and login
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
