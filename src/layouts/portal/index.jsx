import React, {useState} from 'react';
import Sidebar from '../../components/Sidebar';
import { Navigate, Outlet } from 'react-router';
import useAuth from '../../utils/hooks/useAuth';


export default function PortalLayout() {
    const [collapsed, setCollapsed] = useState(false);
     const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

//   const {status, data} = useAuth();
//   console.log('data', data)

	return (
		<div className="flex">
			<Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar}/>
			<div className=" w-full bg-white h-screen overflow-hidden overflow-y-auto">
				<Outlet />
			</div>
		</div>
	);
}
