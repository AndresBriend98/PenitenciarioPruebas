import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import logoPenitenciaria from '../assets/images/logoPenitenciaria.png';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [unit, setUnit] = useState('');
    const [area, setArea] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        // Mapeo de id_departamento a id_tipo_usuario
        const departmentToUserType = {
            1: 5,  // Dep. Super Administrativo -> id_tipo_usuario 5
            2: 5,  // Dep. Administrativo -> id_tipo_usuario 5
            3: 5,  // Dep. Revision (Tecnica) -> id_tipo_usuario 5
            4: 5,  // Dep. Jefatura -> id_tipo_usuario 5
            5: 5,  // Dep. Judicial -> id_tipo_usuario 5
            6: 5,  // Dep. Social -> id_tipo_usuario 5
            7: 5,  // Dep. Salida -> id_tipo_usuario 5
            8: 5,  // Dep. Sanidad -> id_tipo_usuario 5
            9: 5,  // Dep. Educación -> id_tipo_usuario 5
            10: 5, // Dep. Criminologico -> id_tipo_usuario 5
            11: 5, // Dep. Psicológico -> id_tipo_usuario 5
            12: 5, // Dep. Trabajo -> id_tipo_usuario 5
            13: 5  // Dep. Consejo -> id_tipo_usuario 5
        };
    
        // Asignamos el id_tipo_usuario según el id_departamento seleccionado
        const tipoUsuario = departmentToUserType[parseInt(area)] || 5;  // Default to 5 if not found
    
        const requestBody = {
            nombre_usuario: username,
            contra: password,
            id_unidad: parseInt(unit) || 0,
            dni: dni,
            nombre_apellido: name,
            is_registered: false,
            id_departamento: parseInt(area) || 0,
            id_tipo_usuario: tipoUsuario
        };
    
        console.log("Datos a enviar al backend:", requestBody);
    
        try {
            const response = await fetch("http://179.0.180.134:10000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });
    
            // Verificar si la respuesta es exitosa
            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error del servidor:", errorText);
                throw new Error("Error al registrar el usuario. Respuesta del servidor: " + errorText);
            }
    
            // Obtener la respuesta del servidor
            const data = await response.json();
    
            console.log("Respuesta del servidor:", data);
    
            // Si el registro es exitoso, cambiamos el estado de is_registered a true
            const updatedRequestBody = {
                ...requestBody,
                is_registered: true
            };
    
            console.log("Datos después de la actualización (is_registered a true):", updatedRequestBody);
    
            // Mostrar el modal de éxito
            setShowSuccessModal(true);
    
            // Redirigir a la página de login después de 2 segundos
            setTimeout(() => {
                navigate("/login"); // Redirige a /login
            }, 2000); // Espera 2 segundos antes de redirigir
    
        } catch (error) {
            console.error("Error en el proceso de registro:", error);
            alert("Error al registrar el usuario. Detalles: " + error.message);
        }
    };
    
    
    const handleDniChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]{0,8}$/.test(value)) {
            setDni(value);
        }
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z\s]*$/.test(value)) {
            setName(value);
        }
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z0-9]*$/.test(value)) {
            setUsername(value);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (/^[A-Za-z0-9]*$/.test(value)) {
            setPassword(value);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    return (
        <div className="bg-general relative min-h-screen bg-cover bg-center">
            <div className="absolute top-2 left-2">
                <img src={logoPenitenciaria} alt="Logo" className="w-60 h-auto" />
            </div>
            <div className="flex items-center justify-center min-h-screen p-2">
                <div className="max-w-sm w-full bg-white p-4 shadow-md rounded-lg z-10">
                    <h2 className="text-xl font-bold mb-4 text-center">Registro</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="block text-gray-700 text-sm">Nombre/s y Apellido/s:</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                required
                                className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dni" className="block text-gray-700 text-sm">DNI:</label>
                            <input
                                type="text"
                                id="dni"
                                value={dni}
                                onChange={handleDniChange}
                                required
                                className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unit" className="block text-gray-700 text-sm">Unidad:</label>
                            <select
                                id="unit"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}  // No cambian aquí, pero al enviar los datos se hace la conversión
                                required
                                className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
                            >
                                <option value="" disabled>Seleccione su unidad</option>
                                {Array.from({ length: 11 }, (_, i) => (
                                    <option key={i} value={i + 1}>Unidad {i + 1}</option>
                                ))}
                            </select>
                        </div>


                        <div className="mb-3">
                            <label htmlFor="area" className="block text-gray-700 text-sm">Área:</label>
                            <select
                                id="area"
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
                            >
                                <option value="" disabled>Seleccione su área</option>
                                <option value="1">Dep. Super Administrativo</option>
                                <option value="2">Dep. Administrativo</option>
                                <option value="3">Dep. Revision (Tecnica)</option>
                                <option value="4">Dep. Jefatura</option>
                                <option value="5">Dep. Judicial</option>
                                <option value="6">Dep. Social</option>
                                <option value="7">Dep. Salida</option>
                                <option value="8">Dep. Sanidad</option>
                                <option value="9">Dep. Educación</option>
                                <option value="10">Dep. Criminologico</option>
                                <option value="11">Dep. Psicológico</option>
                                <option value="12">Dep. Trabajo</option>
                                <option value="13">Dep. Consejo</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="username" className="block text-gray-700 text-sm">Usuario:</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                required
                                className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="block text-gray-700 text-sm">Contraseña:</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirm-password" className="block text-gray-700 text-sm">Confirmar Contraseña:</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirm-password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                    required
                                    className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                                >
                                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                </button>
                            </div>
                        </div>
                    </form>
                    <form onSubmit={handleSubmit}>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-sm"
                        >
                            Registrarse
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <Link to="/login" className="text-blue-500 hover:underline text-sm">Volver al login</Link>
                    </div>
                </div>

                {showSuccessModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="bg-white p-4 rounded-lg shadow-lg text-center">
                            <h3 className="text-lg font-semibold">Registro exitoso</h3>
                            <p className="mt-2 text-sm">Será redirigido al inicio de sesión...</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Register;
