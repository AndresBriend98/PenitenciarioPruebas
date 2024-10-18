import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaAntecendentesPenales = () => {
    const navigate = useNavigate();
    
    const [errors, setErrors] = useState({
        antecedentes: '',
    });

    const [antecedentesPenales, setAntecedentesPenales] = useState('');
    const [historialAntecedentes, setHistorialAntecedentes] = useState([]);

    const handleAgregarAntecedente = () => {
        if (antecedentesPenales.trim()) {
            const fechaActual = new Date().toLocaleString(); // Fecha actual
            setHistorialAntecedentes([...historialAntecedentes, { informe: antecedentesPenales, fecha: fechaActual }]);
            setAntecedentesPenales(''); // Limpiar el campo después de agregar
            setErrors({ antecedentes: '' }); // Limpiar el error si la entrada es válida
        } else {
            setErrors({ antecedentes: 'El campo de antecedentes es requerido.' }); // Mostrar error si está vacío
        }
    };

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header/>
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga de Antecedentes Penales</h1>
                <div className="grid grid-cols-1 gap-4">

                    {/* Antecedentes Penales */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="block text-sm font-medium mb-1">Antecedentes Penales</h2>
                        <textarea
                            value={antecedentesPenales}
                            onChange={(e) => setAntecedentesPenales(e.target.value)}
                            rows="6"
                            className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                            placeholder="Ingresar todos los antecedentes penales del interno aquí"
                        />

                        {/* Mostrar el error si existe */}
                        {errors.antecedentes && (
                            <p className="text-red-500 text-sm">{errors.antecedentes}</p>
                        )}

                        <div className="flex justify-center mt-2">
                            <button
                                onClick={handleAgregarAntecedente}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                            <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {historialAntecedentes.length > 0 ? (
                                    <ul className="space-y-2">
                                        {historialAntecedentes.map((entrada, index) => (
                                            <li key={index} className="border-b border-gray-300 pb-2">
                                                <p className="text-sm"><strong>Informe:</strong> {entrada.informe}</p>
                                                <p className="text-sm text-gray-500"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay antecedentes penales registrados aún.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={handleVolver}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menú Principal
                    </button>
                </div>
            </div>
        </div >
    );
};

export default CargaAntecendentesPenales;
