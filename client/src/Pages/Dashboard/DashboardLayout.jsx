import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { HiViewGridAdd } from "react-icons/hi";
import { MdOutlineManageHistory } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { IoIosCall } from "react-icons/io";

const DashboardLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg hidden md:flex flex-col">
        <div className="flex items-center justify-center h-20 border-b">
          <img src="/src/Images/LOGO-Model.png" alt="Logo" className="h-12" />
        </div>
        <nav className="flex-grow px-4 py-6 space-y-2">
          <SidebarLink to="/dashboard/contacts" icon={<IoIosCall />} text="Contact Messages" />
          <SidebarLink to="/dashboard/consultants" icon={<IoIosCall />} text="Consultant Messages" />
          <SidebarLink to="/dashboard/add-new-project" icon={<HiViewGridAdd />} text="Add Project" />
          <SidebarLink to="/dashboard/manage-project" icon={<MdOutlineManageHistory />} text="Manage Projects" />
          <SidebarLink to="/dashboard/add-new-design" icon={<HiViewGridAdd />} text="Add Design" />
          <SidebarLink to="/dashboard/manage-design" icon={<MdOutlineManageHistory />} text="Manage Designs" />
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-4 py-2 text-red-600 hover:text-white border border-red-600 hover:bg-red-600 rounded-md transition"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Top Header */}
        <header className="h-20 bg-white px-6 flex items-center border-b shadow-sm">
          <h1 className="text-2xl font-semibold text-gray-700">Project Dashboard</h1>
        </header>

        {/* Content Area */}
        <main className="p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
            <Link
              to="/dashboard/manage-project"
              className="inline-flex items-center justify-center px-5 py-2 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-100 transition"
            >
              Manage Projects
            </Link>
              <Link
              to="/dashboard/manage-design"
              className="inline-flex items-center justify-center px-5 py-2 text-purple-600 border border-purple-600 rounded-md hover:bg-purple-100 transition"
            >
              Manage Designs
            </Link>
            <Link
              to="/dashboard/add-new-project"
              className="inline-flex items-center justify-center px-5 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
            >
              Add New Project
            </Link>
               <Link
              to="/dashboard/add-new-design"
              className="inline-flex items-center justify-center px-5 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
            >
              Add New Design
            </Link>
             <Link
              to="/dashboard/create-admin"
              className="inline-flex items-center justify-center px-5 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition"
            >
              Add New Admin
            </Link>



          






          </div>
          <Outlet />
        </main>
      </div>  
    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ to, icon, text }) => (
  <Link
    to={to}
    className="flex items-center px-4 py-2 text-gray-700 rounded-lg hover:bg-gray-200 transition"
  >
    <span className="text-xl mr-3">{icon}</span>
    <span>{text}</span>
  </Link>
);

export default DashboardLayout;
