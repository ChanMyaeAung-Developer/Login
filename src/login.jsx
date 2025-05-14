import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
// import Rlogo from './Rlogo.png';
// import Logo from './logo.png';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `http://localhost:3001/users?email=${data.email}&password=${data.password}`
      );
      const users = await response.json();
      if (users.length > 0) {
        toast.success("✅ Login successful!", { position: "top-center" });
        localStorage.setItem('user', data.email);
        setTimeout(() => navigate("/Dashboard"), 1000);
      } else {
        toast.error("❌ Invalid email or password", { position: "top-center" });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("⚠️ Something went wrong!", { position: "top-center" });
    }
  };

  return (
    <div className="min-h-screen flex  bg-blue-50 ">
      
  
   

      {/* Left Column: Login Form */}
      <div className="w-full w-1/2  flex items-center justify-center">
        <div className="w-full max-w-md p-6 rounded-2xl shadow-lg bg-white">
          <div className="text-center mb-6">
           <div className="flex justify-center mb-4">
             <img
            src="/logo.png"
            alt="Logo"
            className="w-32 h-32 rounded-full object-cover"
          />
          </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

            {/* Email Field */}
            <div className="w-full">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full border border-gray-300 pl-10 px-4 py-3 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email format"
                    }
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div className="w-full">
              <div className="relative">
                <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full border border-gray-300 pl-10 px-4 py-3 rounded-lg outline-none focus:border-blue-500"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold transition"
            >
              Login
            </button>
          </form>

          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </div>
 {/* Left Column: Login Form */}
         <div className="md:w-1/2 hidden md:flex items-center justify-center ">
        <img
          src="/Rlogo.png"
          alt="Login Visual"
          className="w-4/4 h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default Login;
