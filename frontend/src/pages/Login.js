import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import { useAuth } from '../hooks/useAuth';

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token, data.user);
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header  className=" bg-gradient-to-r from-purple-500 to-teal-500 py-6 bg-black">
        <h1 className="text-3xl font-bold text-center text-white">
          Welcome to To-do App
        </h1>
      </header>


      <main className="flex-grow flex">

        <div className="hidden lg:flex w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1584697964154-3baf49a8c0d6?auto=format&fit=crop&w=800&q=80)' }}>
   
          <div className=" bg-gradient-to-r from-purple-500 to-teal-500 bg-opacity-50 w-full h-full flex items-center justify-center">
            <h2 className="text-4xl text-white font-semibold">Organize Your Tasks Efficiently</h2>
          </div>
        </div>

      
        <div className="  bg-gradient-to-r from-teal-500 to-purple-500 flex flex-col justify-center items-center w-full lg:w-1/2 px-4 py-8">
          <div className=" bg-gradient-to-r from-purple-500 to-teal-500 max-w-md w-full bg-white p-8 rounded-lg shadow-md">
          
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign In to Your Account</h2>
            <LoginForm onSubmit={handleLogin} error={error} />
          </div>
        </div>
      </main>

   
      <footer className=" bg-gradient-to-r from-purple-500 to-teal-500 py-4 bg-black">
        <p className="text-center text-sm text-white">
        © SAURABH 2025
        </p>
      </footer>
    </div>
  );
};

export default Login;
