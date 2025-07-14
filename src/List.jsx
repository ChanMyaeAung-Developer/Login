import { useState } from "react";
import Sidebar from "./components/Sidebar.jsx";

import List_2 from "./components/List_2.jsx";
const List = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    // <div className="flex h-screen">
    //   <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <List_2 />
    // </div>
  );
};

export default List;