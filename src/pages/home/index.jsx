import Sidebar from "../../components/Sidebar.jsx";
import { useState } from "react";
import useAuth from "../../utils/hooks/useAuth.js";
import { Navigate } from "react-router";
const Home = () => {

  const [collapsed, setCollapsed] = useState(false);
 
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const {status} = useAuth();
 
  if(status === 'unauthenticated'){
	return <Navigate to="/login" replace/>
}
 return (
  //  <div className="flex">
  //     <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar}/>
      <div className="flex-1 bg-white min-h-screen">
        
  <section class="relative w-full h-screen flex items-center justify-between px-[100px]  overflow-hidden">
    

    <div class="relative max-w-[700px] z-10 -top-20">
      <h1 class="text-2xl font-bold mb-4">AGB-COMMUNICATION CO.,LTD.</h1>
      <p class="text-xl mb-4">
        Where Your Connection Begin
      </p>
      <button className="mb-4 border-2 bg-blue-900 p-2 text-white rounded-full shadow-md">Learn</button>
    </div>

   
    <img src="/public/home.png" alt="Home" className="pr-30 -top-30 max-w-[500px] relative z-10" />

  
    <svg class="absolute bottom-0 left-0 w-full h-auto z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
      <path fill="#1e3a8a" fill-opacity="1" d="M0,96L48,133.3C96,171,192,245,288,245.3C384,245,480,171,576,133.3C672,96,768,96,864,117.3C960,139,1056,181,1152,176C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
    </svg>

  </section>
      </div>
    
    // </div>
    
  );
};

export default Home;