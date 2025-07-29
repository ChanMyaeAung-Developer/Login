import React from 'react';
import { NavLink } from 'react-router-dom';

const PageHeader = () => {
  return (
    <div>
      <NavLink
        to="/List/create-user"
        className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        +
        <span className="hidden lg:inline">Add New</span>
      </NavLink>
    </div>
  );
};

export default PageHeader;
