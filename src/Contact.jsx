// import { useState } from "react";
// import Sidebar from "./Sidebar.jsx";
// import {FaHome} from "react-icons/fa";

// const Contact = () => {
//   const [collapsed, setCollapsed] = useState(false);
 
//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className="flex">
//       <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
//      <div className="flex-1 bg-white min-h-screen grid grid-cols-2 ">
//      <div className="flex items-center justify-center">   <img
//           src="/contact.png"
//           alt="Contact"
//           className="min-w-xl h-auto object-contain mr-5"
//         /></div>
//      <div className="flex flex-col justify-center">
//         <div className=" m-4">
//             <div className=" inline-block text-md rounded-2xl border-1 p-3 bg-blue-900 text-white hover:text-lg">
//                     <div className="flex items-center  ">
//                           <FaHome className=" "/>
//                         <span className="pl-2.5 uppercase">Office Address:</span>
//                         </div>
//                         <span>19th Floor, Office Tower 3, Times City,<br/> Kamayut Township, Yangon</span>
//             </div>
//              <div className=" inline-block text-md rounded-2xl border-1 p-3 bg-blue-900 text-white hover:text-lg">
//                     <div className="flex items-center  ">
//                           <FaHome className=" "/>
//                         <span className="pl-2.5 uppercase">Office Address:</span>
//                         </div>
//                         <span>19th Floor, Office Tower 3, Times City,<br/> Kamayut Township, Yangon</span>
//             </div>
//             <div className=" inline-block text-md rounded-2xl border-1 p-3 bg-blue-900 text-white hover:text-lg">
//                     <div className="flex items-center  ">
//                           <FaHome className=" "/>
//                         <span className="pl-2.5 uppercase">Office Address:</span>
//                         </div>
//                         <span>19th Floor, Office Tower 3, Times City,<br/> Kamayut Township, Yangon</span>
//             </div>
//         </div>
   
//      </div>
//      </div>
//     </div>
//   );
// };

// export default Contact;


import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";
import {FaHome,FaPhoneSquareAlt} from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import useAuth from "./utils/hooks/useAuth.js";
import { Navigate } from "react-router-dom";
const Contact = () => {
  const [collapsed, setCollapsed] = useState(false);
 
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const {status} = useAuth();
 
  if(status === 'unauthenticated'){
	return <Navigate to="/login" replace/>
}
  return (
    <div className="relative">
    {/* <div className="flex ">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} /> */}
   <div className="flex-1 grid grid-rows-2 h-screen pl-0.5 ">
  <div className="bg-blue-900 text-white flex items-center  justify-around">

        <h1 className="text-2xl uppercase">Contact_us</h1>
       
        <h1 className="text-2xl uppercase "> Didn’t Find Your Answer, Ask Us</h1>

    <img
          src="/contact.png"
          alt="Contact"
          className="h-auto object-contain mr-5"
        />
    </div>
  

   <div className="bg-gray-200 flex justify-center overflow-hidden">
    
    <div className="grid grid-cols-4 gap-10  max-w-5xl absolute bottom-5 h-7/13">

    {/* each card with align text Left*/}
      {/* <div className="bg-white shadow-md rounded-xl hover:rotate-5 transition duration-500">
         
          <div className="text-md p-3 text-blue-900 items-center justify-center">

            <img
          src="/office.png"
          alt="Office"
          className="h-1/2 object-contain pt-4"
        />
                    <div className="flex items-center pt-4 font-medium  ">
                          <FaHome className=" "/>
                        <span className="pl-2.5 uppercase ">Office Address:</span>
                       </div>
                      <div className="pt-4">19th Floor, Office Tower 3, Times City, Kamayut Township, Yangon</div>
           </div>
      </div> */}

{/* each card */}
<div className="bg-white shadow-md rounded-xl hover:rotate-5 transition duration-500 p-6 flex flex-col items-center text-center">
  
  <img
    src="/office.png"
    alt="Office"
    className="h-32 object-contain mb-4"
  />

  <div className="text-md text-blue-900 w-full">
    <div className="flex items-center justify-center font-medium">
      <FaHome />
      <span className="pl-2.5 uppercase">office address :</span>
    </div>
    
    <div className="pt-4">
      19th Floor, Office Tower 3, Times City, Kamayut Township, Yangon
    </div>
  </div>
</div>

{/* each card */}
      <div className="bg-white shadow-md rounded-xl hover:rotate-5 transition duration-500 p-6 flex flex-col items-center text-center">
  
  <img
    src="/email.png"
    alt="Email"
    className="h-32 object-contain mb-4"
  />

  <div className="text-md text-blue-900 w-full">
    <div className="flex items-center justify-center font-medium">
      <MdMarkEmailRead />
      <span className="pl-2.5 uppercase">Email:</span>
    </div>
    
      <div className="pt-4">ispsale@agb<br/><span>communication.com</span></div>
  </div>
</div>

       {/* each card */}
<div className="bg-white shadow-md rounded-xl hover:rotate-5 transition duration-500 p-6 flex flex-col items-center text-center">
  
  <img
    src="/phone.png"
    alt="Phone"
    className="h-32 object-contain mb-4"
  />

  <div className="text-md text-blue-900 w-full">
    <div className="flex items-center justify-center font-medium">
      <FaPhoneSquareAlt />
      <span className="pl-2.5 uppercase">CONTACT NUMBER:</span>
    </div>
    
    <div className="pt-4">
    (+95) 9 97 787 8889 <br/>
(+95) 9 79 717 8889
    </div>
  </div>
</div>

       {/* each card */}

           <div className="bg-white shadow-md rounded-xl hover:rotate-5 transition duration-500 p-6 flex flex-col items-center text-center">
  
  <img
    src="/email.png"
    alt="Email"
    className="h-32 object-contain mb-4"
  />

  <div className="text-md text-blue-900 w-full">
    <div className="flex items-center justify-center font-medium">
      <MdMarkEmailRead />
      <span className="pl-2.5 uppercase">WebSite:</span>
    </div>
    
       <div className="pt-4">https.//www.
        <br/>agbcommunication.com/</div>
  </div>
</div>
 {/* <div className="bg-white shadow-md rounded-xl hover:rotate-5 transition duration-500">
         
          <div className="text-md p-3 text-blue-900 items-center justify-center">

            <img
          src="/web.webp"
          alt="Web"
          className=" h-auto pt-1"
        />
                    <div className="flex items-center pt-4 font-medium  ">
                          <TbWorld className=" "/>
                        <span className="pl-2.5 uppercase ">Website:</span>
                       </div>
                      <div className="pt-4">https.//www.agbcommunication.com/</div>
           </div>
      </div> */}
    


    </div>


  </div>
</div>
</div>
    // </div>
  );
};

export default Contact;