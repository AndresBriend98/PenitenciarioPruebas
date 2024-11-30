import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CargaConsejo = () => {
    const navigate = useNavigate();
    const [archivo, setArchivo] = useState(null);
    const [historialArchivos, setHistorialArchivos] = useState([]);

    const handleAgregarArchivo = () => {
        if (archivo) {
            const fechaActual = new Date().toLocaleString();
            setHistorialArchivos([...historialArchivos, { archivo: archivo.name, fecha: fechaActual, url: URL.createObjectURL(archivo) }]);
            setArchivo(null);
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
                <h1 className="text-xl font-bold mb-4">Carga Consejo</h1>
                <div className="grid grid-cols-1 gap-4">

                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <div className="flex justify-center items-center gap-4 border-dashed border-2 p-6 rounded-lg border-gray-300 bg-gray-50">
                            <strong className='text-sm'>Subir archivos: </strong>
                            <input
                                type="file"
                                accept='.pdf'
                                onChange={(e) => setArchivo(e.target.files[0])}
                                className="p-2 rounded text-xs border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                onClick={handleAgregarArchivo}
                                className="bg-blue-600 text-white p-2 rounded text-xs hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                Cargar
                            </button>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4 mt-5">
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
                                                    className="bg-blue-400 text-white p-1 rounded text-xs mt-2 hover:bg-blue-500"
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
