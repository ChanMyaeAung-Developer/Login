

 import React, { useState } from 'react'
import { useForm,Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosPrivate } from '../../../api/axiosPrivate';
import { z } from "zod";
import { ToastContainer, toast } from 'react-toastify';
import { RiLockPasswordFill } from "react-icons/ri";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaBuilding, FaBriefcase } from "react-icons/fa";
const emailRegex = new RegExp(

 /^\S+@\S+$/i

)

const formSchema = z.object({
 password: z.string().optional(),
 email: z.string().min(1, {
message: "Email is required.",
 }).regex(emailRegex, 'Invlaid email'),
 name: z.string().min(1, {
message: "Name is required",

 }),

 team: z.string(),
 position: z.string(),
 phone: z.string(),
 disabled: z.boolean()

});

const CreateUser = ({ data }) => {

 const navigate = useNavigate()
 const [showPassword, setShowPassword] = useState(false);
 const { register, handleSubmit, reset,control, formState: { errors } } = useForm(
{
 resolver: zodResolver(formSchema),
 defaultValues: {
 _id: data?._id || '',
 password: '',
 email: data?.email || '',
 name: data?.name || '',
 phone: data?.phone || '',
 position: data?.position || '',
 team: data?.team || '',
 disabled: data?.disabled || false
 },
}
 );
 const onSubmit = async (formData) => {
console.log('data::', formData)
if (data) {
 await axiosPrivate
 .put(`https://backend-test-gilt-eta.vercel.app/api/users`, {...formData,_id:data?._id})

 .then((response) => {
toast.success(response.data?.message || "Successfully updated");
navigate(-1);
 })
 .catch((error) => toast.error(error?.response.data?.message || "Something went wrong"))
} else {
 await axiosPrivate
 .post(`https://backend-test-gilt-eta.vercel.app/api/users`, formData)
 .then((response) => {
toast.success(response.data?.message || "Successfully created");
reset();
 })
 .catch((error) => toast.error(error?.response.data?.message || "Something went wrong")) 
}
 };
 return (
<div>
  <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
<div className="bg-white px-4 py-1 rounded-lg shadow-xl w-full max-w-4xl border border-gray-200">
   <h2 className="text-xl font-bold text-center text-gray-700 mb-2">
          {data ? 'Edit User' : 'Create New User'}
      </h2>
 <form className="space-y-2" onSubmit={handleSubmit(onSubmit, (formErrors) => {
 console.error('Validation Errors:', formErrors);
 })}>
  {/* Name Field */}
          <div className="w-full">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                placeholder="Enter user's name"
                className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                {...register("name")}
              />
            </div>
            {errors.name && (
              <span className="text-red-600 text-sm mt-1 block">
                {errors.name.message}
              </span>
            )}
          </div>

 {/* Email Field */}
         <div className="w-full">
           <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
           <div className="relative">
             <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input
               type="text"
               id="email"
               placeholder="Enter user's email"
               className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
               {...register("email")}
             />
           </div>
           {errors.email && (
             <span className="text-red-600 text-sm mt-1 block">
               {errors.email.message}
             </span>
           )}
         </div>

  {/* Password Field (only for new user creation or if data is not present) */}
         
            <div className="w-full">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <RiLockPasswordFill className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Enter password"
                  className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
                  {...register("password")}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer hover:text-gray-700 transition"
                >
                  {showPassword ? <IoEyeOutline size={20} /> : <IoEyeOffOutline size={20} />}
                </span>
              </div>
              {errors.password && (
                <span className="text-red-600 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>
         

  {/* Phone Field */}
         <div className="w-full">
           <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
           <div className="relative">
             <FaPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input
               type="text"
               id="phone"
               placeholder="Enter phone number"
               className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
               {...register("phone")}
             />
           </div>
           {errors.phone && (
             <span className="text-red-600 text-sm mt-1 block">
               {errors.phone.message}
             </span>
           )}
         </div>

 
         {/* Team Field */}
         <div className="w-full">
           <label htmlFor="team" className="block text-sm font-medium text-gray-700 mb-1">Team</label>
           <div className="relative">
             <FaBuilding className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input
               type="text"
               id="team"
               placeholder="Enter team name"
               className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
               {...register("team")}
             />
           </div>
           {errors.team && (
             <span className="text-red-600 text-sm mt-1 block">
               {errors.team.message}
             </span>
           )}
         </div>

         {/* Position Field */}
         <div className="w-full">
           <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">Position</label>
           <div className="relative">
             <FaBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
             <input
               type="text"
               id="position"
               placeholder="Enter position"
               className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
               {...register("position")}
             />
           </div>
           {errors.position && (
             <span className="text-red-600 text-sm mt-1 block">
               {errors.position.message}
             </span>
           )}
         </div>
 {/* Disabled Status Toggle */}
         <div className="flex items-center justify-between py-2">
           <label className="text-sm font-medium text-gray-700 cursor-pointer" htmlFor="disabled-toggle">
             User Status: <span className={`font-semibold ${control._formValues.disabled ? 'text-gray-500' : 'text-green-600'}`}>
               {control._formValues.disabled ? 'Disabled' : 'Active'}
             </span>
           </label>
           <Controller
             name="disabled"
             control={control}
             render={({ field }) => (
               <button
                 type="button"
                 id="disabled-toggle"
                 role="switch"
                 aria-checked={field.value}
                 onClick={() => field.onChange(!field.value)}
                 className={`w-14 h-7 rounded-full flex items-center px-1 transition-all duration-300 ease-in-out
                   ${field.value ? 'bg-gray-300' : 'bg-green-500'} focus:outline-none focus:ring-2 focus:ring-offset-2
                   ${field.value ? 'focus:ring-gray-400' : 'focus:ring-green-600'}`}
               >
                 <div
                   className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out
                     ${field.value ? 'translate-x-0' : 'translate-x-7'}`}
                 />
               </button>
             )}
           />
         </div>


<div className="flex justify-center">
  <button
    className="bg-blue-400 hover:bg-blue-600 py-1 px-30 rounded-md text-gray-700 font-semibold transition-all duration-300 ease-in-out cursor-pointer"
  >
    {data ? 'Update' : 'Add'}
  </button>
</div>


 </form>

 <ToastContainer position="top-center" autoClose={3000} />

</div>

</div>
</div>

 )

}



export default CreateUser