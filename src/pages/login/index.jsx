import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router";
import axios from "axios";
import setTokenInCookie from "../../utils/helpers/setTokenInCookie";

const emailRegex = new RegExp(
  /^\S+@\S+$/i
)
const formSchema = z.object({
  password: z.string().min(1, {
    message: "Password is required",
  }),
  email: z.string().min(1, {
    message: "Email is required.",
  }).regex(emailRegex, 'Invlaid email'),


});
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm(
    {
      resolver: zodResolver(formSchema),
      defaultValues: {
        password: '',
        email: ''
      },
    }
  );

  const onSubmit = async (data) => {
  
    setIsLoading(true);
    await axios
      .post("https://backend-test-gilt-eta.vercel.app/api/users/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
    
      //  .post("http://localhost:3000/api/users/login", data, {
      //   headers: { "Content-Type": "application/json" },
      //   withCredentials: true,
      // })
      .then((res) => {
        console.log(res);
        
        const accessToken = res?.data?.accessToken;

        setTokenInCookie("accessToken", accessToken);
      


        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log("login error => ", err);
        toast.error(
          err?.response?.data?.message ||
          `Error with status ${err?.response?.status}`
        );
      })
      .finally(() => setIsLoading(false));


  };

  return (
    <div className="min-h-screen flex  bg-blue-50 ">
      {/* Left Column: Login Form  */}
      <div className="w-full flex items-center justify-center">
        <div className="w-full max-w-md p-5 rounded-2xl shadow-md bg-white">
          <div className="text-center mb-6">
            <div className="flex justify-center mb-4">
              <img
                src="/logo.png"
                alt="Logo"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit, (formErrors) => {
            console.error('Validation Errors:', formErrors);
          })}>

            {/* Email Field */}
            <div className="w-full">
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Email"
                  className="w-full border border-gray-300 pl-10 px-4 py-3 rounded-lg outline-none focus:border-blue-900 "
                  {...register("email")}
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
                  className="w-full border border-gray-300 pl-10 px-4 py-3 rounded-lg outline-none focus:border-blue-900"
                  {...register("password")}
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
              className="w-full cursor-pointer bg-blue-900 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
              disabled={isLoading}
            >
              {isLoading ? "Wait..." : "Log In"}
            </button>
          </form>

          <ToastContainer position="top-center" autoClose={3000} />
        </div>
      </div>
      {/* Right Column: Login Form Photo */}
      <div className="md:w-1/2 hidden md:flex items-center justify-center">
        <img
          src="/Rlogo.png"
          alt="Login Visual"
          className="w-4/4 h-auto object-contain mr-5"
        />
      </div>
    </div>
    
  );
};

export default Login;
