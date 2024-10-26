import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({ setAdminLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const defaultAdmin = {
    username: 'shriyash',
    password: '123'
  };

  const handleLogin = () => {
    console.log(`Attempting login with username: ${username} and password: ${password}`); // Debug line
    if (username === defaultAdmin.username && password === defaultAdmin.password) {
      setAdminLoggedIn(true);
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input 
          type="text" 
          placeholder="Username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="mb-2 p-2 border border-gray-300 rounded w-full"
        />
        <button 
          onClick={handleLogin} 
          className="bg-blue-500 text-white p-2 rounded w-full"
        >
          Login
        </button>
        {error && <p className="mt-2 text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default AdminLogin;
