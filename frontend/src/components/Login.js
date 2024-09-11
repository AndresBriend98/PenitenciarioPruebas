import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoPenitenciaria from '../assets/images/logoPenitenciaria.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showLoadingModal, setShowLoadingModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setShowLoadingModal(true);

    setTimeout(() => {
      console.log('Usuario:', email, 'Contraseña:', password);
      navigate('/general');
    }, 1000);
  };

  return (
    <div className="bg-general bg-cover bg-center relative flex items-center justify-center min-h-screen">
      <div className="absolute top-2 left-2">
        <img src={logoPenitenciaria} alt="Logo" className="w-60 h-auto" />
      </div>
      <div className="relative w-full max-w-sm bg-white p-4 shadow-md rounded-lg z-10 mx-4 sm:mx-6 lg:mx-8">
        <h2 className="text-xl font-bold mb-4 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="block text-gray-700 text-sm">Usuario:</label>
            <input 
              type="email" 
              id="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="block text-gray-700 text-sm">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-sm"
          >
            Ingresar
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-blue-500 hover:underline text-sm">Crear nuevo usuario</Link>
        </div>
      </div>

      {showLoadingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold">Iniciando sesión...</h3>
            <p className="mt-2 text-sm">Por favor, espere un momento.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
