import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaConsejo = () => {
    const navigate = useNavigate();
    const [archivo, setArchivo] = useState(null);
    const [historialArchivos, setHistorialArchivos] = useState([]);

    const handleAgregarArchivo = () => {
        if (archivo) {
            const fechaActual = new Date().toLocaleString(); // Fecha actual
            setHistorialArchivos([...historialArchivos, { archivo: archivo.name, fecha: fechaActual, url: URL.createObjectURL(archivo) }]);
            setArchivo(null); // Limpiar el archivo después de agregar
        }
    };

    const handleVolver = () => {
        navigate('/general');
    };

    const handleDescargarArchivo = (url, nombre) => {
        const a = document.createElement('a');
        a.href = url;
        a.download = nombre;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };
    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga Consejo (Esta en desarrollo)</h1>
                <div className="grid grid-cols-1 gap-4">

                    {/* Cargar Archivo */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <div className="flex justify-center mt-2">
                            <input
                                type="file"
                                onChange={(e) => setArchivo(e.target.files[0])}
                                className="p-2 rounded text-xs"
                            />
                            <button
                                onClick={handleAgregarArchivo}
                                className="bg-blue-500 text-white p-2 rounded ml-2 hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                            <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {historialArchivos.length > 0 ? (
                                    <ul className="space-y-2">
                                        {historialArchivos.map((entrada, index) => (
                                            <li key={index} className="border-b border-gray-300 pb-2">
                                                <p className="text-sm"><strong>Archivo:</strong> {entrada.archivo}</p>
                                                <p className="text-sm text-gray-500"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                                <button
                                                    onClick={() => handleDescargarArchivo(entrada.url, entrada.archivo)}
                                                    className="bg-green-500 text-white p-1 rounded text-xs mt-2 hover:bg-green-600"
                                                >
                                                    Descargar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay archivos cargados aún.
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
        </div>
    );
};

export default CargaConsejo;
