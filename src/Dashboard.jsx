import { useState } from "react";
import { FaHome, FaUser, FaCog, FaBars ,FaTimes } from "react-icons/fa";

const Sidebar = ({ collapsed, toggleSidebar}) => {

        const userEmail=localStorage.getItem("user");
  return (

    <div
      className={`bg-blue-800 text-white h-screen flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div>
        <div className="flex items-center justify-between p-4">
          <h1 className={`text-xl font-bold ${collapsed ? "hidden" : "block"}`}>Dashboard</h1>
        {collapsed ? (
  <FaTimes
    onClick={toggleSidebar}
    className="cursor-pointer text-white text-lg"
  />
) : (
  <FaBars
    onClick={toggleSidebar}
    className="cursor-pointer text-white text-lg"
  />
)}
        </div>
        <nav className="mt-10 space-y-4 px-4">
          <a href="#" className="flex items-center gap-4 text-white hover:text-gray-300">
            <FaHome />
            {!collapsed && <span>Home</span>}
          </a>
          <a href="#" className="flex items-center gap-4 text-white hover:text-gray-300">
            <FaUser />
            {!collapsed && <span>Profile</span>}
          </a>
          <a href="#" className="flex items-center gap-4 text-white hover:text-gray-300">
            <FaCog />
            {!collapsed && <span>Settings</span>}
          </a>
        </nav>
      </div>

      <div className="p-4 border-t border-blue-700 flex items-center gap-3">
        <FaUser className="text-white text-lg" />
        {!collapsed && <span className="text-sm">{userEmail}</span>}
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="flex">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold">Welcome to the Dashboard</h2>
        <p className="mt-4">Here is your main content area.</p>
      </div>
    </div>
  );
};

export default Dashboard;
