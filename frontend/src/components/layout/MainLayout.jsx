import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="flex-1 relative">
       
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        </div>

   
        <div className="relative z-10 container mx-auto py-8 px-4">
          <div className="glass-container">
            {children}
          </div>
        </div>
      </div>

      <footer className="mt-auto bg-gradient-to-r from-gray-800 to-gray-900 text-white py-6 text-center border-t border-gray-700">
        <p className="text-lg font-medium tracking-wide">DEVELOPED BY SAURABH KUMAR</p>
      </footer>
    </div>
  );
};

export default MainLayout;