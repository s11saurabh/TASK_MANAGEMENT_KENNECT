import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
    
      <header className="bg-gradient-to-r from-purple-500 to-teal-500 py-6 bg-black">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome to To-do App
        </h1>
      </header>

  
      <main className="flex-grow flex">
  
        <div
          className="hidden lg:flex w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1584697964154-3baf49a8c0d6?auto=format&fit=crop&w=800&q=80)'
          }}
        >
   
          <div className=" bg-gradient-to-r from-purple-500 to-teal-500 w-full h-full flex items-center justify-center">
            <h2 className="text-4xl text-white font-semibold">
              Organize Your Tasks Efficiently
            </h2>
          </div>
        </div>

        <div className=" bg-gradient-to-r from-teal-500 to-purple-500 flex flex-col justify-center items-center w-full lg:w-1/2 px-4 py-8">
          <div className=" bg-gradient-to-r from-purple-500 to-teal-500 max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-md">
    
            <h2 className="text-2xl font-semibold text-center text-white mb-6">
              Create a New Account
            </h2>
       
            <RegisterForm onSubmit={handleRegister} error={error} />
         
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-300">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="font-medium text-black hover:text-indigo-300"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

 
      <footer className="bg-gradient-to-r from-purple-500 to-teal-500 py-4 bg-black">
        <p className="text-center text-sm text-white">
        © SAURABH 2025
        </p>
      </footer>
    </div>
  );
};

export default Register;
