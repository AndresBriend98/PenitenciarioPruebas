import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoPenitenciaria from '../assets/images/logoPenitenciaria.png';
import { jwtDecode } from "jwt-decode"; // Importamos jwt-decode

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowLoadingModal(true);

    try {
      const response = await fetch(`http://179.0.180.134:10000/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre_usuario: username,
          contra: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Credenciales incorrectas");
      }

      const token = await response.text();  // Obtener el token desde la respuesta
      console.log("Token recibido:", token);

      const decoded = jwtDecode(token);  // Decodificar el JWT
      console.log("Datos decodificados del token:", decoded);

      localStorage.setItem('token', token);

      const { id_tipo_usuario } = decoded;

      const userRoutes = {
        1: "/superadministrador",
        2: "/administrador",
        3: "/tecnica",
        4: "/jefatura",
        5: "/judicial",
        6: "/general",
      };

      if (userRoutes[id_tipo_usuario]) {
        navigate(userRoutes[id_tipo_usuario]);
      } else {
        setShowErrorModal(true);
      }

    } catch (error) {
      console.error("Error en el proceso de inicio de sesión:", error);
      setShowErrorModal(true);
    } finally {
      setShowLoadingModal(false);
    }
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
            <label htmlFor="username" className="block text-gray-700 text-sm">Usuario:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

      {/* Modal de carga */}
      {showLoadingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold">Iniciando sesión...</h3>
            <p className="mt-2 text-sm">Por favor, espere un momento.</p>
          </div>
        </div>
      )}

      {/* Modal de error */}
      {showErrorModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-semibold text-red-600">Usuario o contraseña incorrectos</h3>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
