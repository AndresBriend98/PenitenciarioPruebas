import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoPenitenciaria from '../assets/images/logoPenitenciaria.png';

const Register = () => {
    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [unit, setUnit] = useState('');
    const [area, setArea] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert('No coinciden las contraseñas');
            return;
        }

        console.log({
            name,
            dni,
            unit,
            area,
            username,
            password,
        });

        setShowSuccessModal(true);

        setTimeout(() => {
            setShowSuccessModal(false);
            navigate('/login');
        }, 2500);
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
                                onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setDni(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="unit" className="block text-gray-700 text-sm">Unidad:</label>
                            <select
                                id="unit"
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
                            >
                                <option value="">Seleccione su unidad</option>
                                {Array.from({ length: 12 }, (_, i) => (
                                    <option key={i} value={`Unit ${i + 1}`}>Unidad {i + 1}</option>
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
                                <option value="">Seleccione su área</option>
                                <option value="Health">Salud</option>
                                <option value="Work">Trabajo</option>
                                <option value="Judicial">Judicial</option>
                                <option value="Social">Social</option>
                                <option value="Criminology">Criminología</option>
                                <option value="Psychology">Psicología</option>
                            </select>
                        </div>
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
                        <div className="mb-3">
                            <label htmlFor="confirm-password" className="block text-gray-700 text-sm">Confirmar Contraseña:</label>
                            <input
                                type="password"
                                id="confirm-password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="mt-1 block w-full border border-gray-300 p-1.5 text-sm rounded-md"
                            />
                        </div>
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
