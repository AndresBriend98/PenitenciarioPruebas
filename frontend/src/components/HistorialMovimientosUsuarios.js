import React from 'react';
import { useNavigate } from 'react-router-dom';

const HistorialMovimientosUsuarios = () => {
    const navigate = useNavigate();

    const historial = [
        { date: '03/09/2024', time: '13:00', event: 'Se logueó' },
        { date: '03/09/2024', time: '15:30', event: 'Registró al interno “Juan Pérez”, legajo: “12345”' },
        { date: '03/09/2024', time: '20:00', event: 'Se deslogueó' },
    ];

    return (
        <div className="bg-general bg-cover bg-center min-h-screen flex flex-col p-4">
            <div className="bg-white-300 flex-1 p-4 rounded-md flex flex-col">
            <h1 className="text-2xl font-bold mb-4">Historial de movimientos</h1>
                <div className="text-left text-base mb-4 md:mb-0">
                    <p><strong>Usuario: Hugo Sand</strong></p>
                </div>
                <div className="flex-1 overflow-x-auto mt-5">
                    <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
                        <table className="w-full text-left bg-white rounded-md shadow-md text-sm">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="p-2 border">#</th>
                                    <th className="p-2 border">Fecha</th>
                                    <th className="p-2 border">Hora</th>
                                    <th className="p-2 border">Evento</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historial.map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="p-2 border">{index + 1}</td>
                                        <td className="p-2 border">{item.date}</td>
                                        <td className="p-2 border">{item.time}</td>
                                        <td className="p-2 border">{item.event}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => navigate('/administrarusuarios')}
                        className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm"
                    >
                        Volver
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HistorialMovimientosUsuarios;
