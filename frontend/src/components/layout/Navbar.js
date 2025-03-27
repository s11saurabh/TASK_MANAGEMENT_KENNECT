import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };


  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? 'bg-gray-600 text-white px-2 py-1 rounded-md hover:bg-gray-700'
      : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 px-2 py-1 rounded-md text-sm font-medium';

  return (
    <nav className="bg-gradient-to-r from-purple-500 to-teal-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
     
          <div className="flex">
       
            <div className="flex-shrink-0 flex items-center">
              <NavLink to="/dashboard" className="text-xl font-bold text-white">
                Task Manager
              </NavLink>
            </div>




            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              <NavLink to="/dashboard"  style={{ color: 'white' }} className={getNavLinkClass}>
                Dashboard
              </NavLink>
              <NavLink to="/tasks"  style={{ color: 'white' }} className={getNavLinkClass}>
                Tasks
              </NavLink>
            </div>
          </div>





          

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            <button
              onClick={handleLogout}
              className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
            >
              Sign Out
            </button>
          </div>
    
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
