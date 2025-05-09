import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Login = () => {

 const [showPassword, setShowPassword] = useState(false);
 const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const showUserData = (e) => {
    e.preventDefault(); 
        alert(`Username: ${username}\nPassword: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 ">

      <div className="w-full max-w-md bg-white p-5 rounded-2xl shadow-lg">

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          LOGIN
        </h2>

        <form className="space-y-6" onSubmit={showUserData}> 

        <div className="relative w-full">
          <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
                type="text"
                placeholder="Email"
                className=" w-full border border-gray-300 pl-10 px-4 py-3 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setUsername(e.target.value)}
            />
           
        </div>

        
        <div className="relative w-full">
                <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>
            
            <input
                 type={showPassword ? "text" : "password"}
                placeholder="password"
                className=" w-full border border-gray-300 pl-10 px-4 py-3 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
            />
            
            <span
        onClick={() => setShowPassword(!showPassword)}

        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
      >
        {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
      </span>
        </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:cursor-pointer text-white py-3 rounded-lg font-semibold transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
