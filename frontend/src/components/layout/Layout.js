import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
     
      <Navbar />


      <main className="flex-grow w-full px-4 py-8">
        {children}
      </main>

    
    </div>
  );
};

export default Layout;
