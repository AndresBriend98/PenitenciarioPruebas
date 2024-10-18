import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPenitenciaria from '../assets/images/logoPenitenciaria.png';

const InicioAreaAdministrador = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const user = {
    name: 'Uriel Umeres',
    area: 'Administrador',
    unit: '2',
  };

  const data = Array.from({ length: 50 }, (_, index) => ({
    name: `Juan Carlos López ${index + 1}`,
    crime: 'Robo',
    internalType: Math.random() > 0.5 ? 'Condenado' : 'Procesado', // Añadir tipo de interno
    court: 'T.O.P.LIBRES',
    admissionDate: '25/06/2025',
    sentenceDate: '25/06/2025',
    sentence: '25/06/2025',
    fileNumber: '3544',
    assistanceDate: '25/06/2025',
    transferDate: '25/06/2025',
  }));

  return (
    <div className="bg-general bg-cover bg-center min-h-screen flex flex-col p-4">
      <div className="bg-gray-100 flex-1 p-4 rounded-md flex flex-col">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div className="flex-1 flex flex-col text-left md:text-left">
            <p className='text-lg'><strong>Bienvenido/a, {user.name}</strong></p>
            <p className='text-sm'><strong>Área:</strong> {user.area}</p>
            <p className='text-sm'><strong>Unidad:</strong> {user.unit}</p>
          </div>

          <div className="my-4 md:my-0 flex flex-col items-center">
            <img src={logoPenitenciaria} alt="Logo" className="w-40 h-auto mb-2" />
          </div>

          <div className="flex-1 flex justify-end">
            <button
              onClick={() => navigate('/administrarusuarios')}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 text-xs"
            >
              Administrar Usuarios
            </button>
          </div>
        </div>

        <div className="flex items-center mb-4">
          <label htmlFor="search" className="mr-3 text-base font-semibold text-sm">Buscar:</label>
          <input
            type="text"
            id="search"
            placeholder="DNI / Legajo judicial"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-64 p-1 border border-gray-300 rounded text-sm"
          />
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
            <table className="w-full text-left bg-white rounded-md shadow-md text-sm">
              <thead className="bg-gray-400">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Nombre/Apellido</th>
                  <th className="p-2 border">Delitos</th>
                  <th className="p-2 border">Tipo Interno</th> {/* Añadido */}
                  <th className="p-2 border">Juzgado</th>
                  <th className="p-2 border">Fecha Ingreso</th>
                  <th className="p-2 border">Cumple Condena</th>
                  <th className="p-2 border">Duración Condena</th>
                  <th className="p-2 border">Legajo</th>
                  <th className="p-2 border">Fecha Asistida</th>
                  <th className="p-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 16).map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border text-xs">{index + 1}</td>
                    <td className="p-2 border text-xs">{item.name}</td>
                    <td className="p-2 border text-xs">{item.crime}</td>
                    <td className="p-2 border text-xs">{item.internalType}</td> {/* Añadido */}
                    <td className="p-2 border text-xs">{item.court}</td>
                    <td className="p-2 border text-xs">{item.admissionDate}</td>
                    <td className="p-2 border text-xs">
                      {item.internalType === 'Condenado' ? item.sentenceDate : '-'}
                    </td>
                    <td className="p-2 border text-xs">
                      {item.internalType === 'Condenado' ? item.sentence : '-'}
                    </td>
                    <td className="p-2 border text-xs">
                      {item.internalType === 'Condenado' ? item.fileNumber : '-'}
                    </td>
                    <td className="p-2 border text-xs">
                      {item.internalType === 'Condenado' ? item.assistanceDate : '-'}
                    </td>
                    <td className="p-2 border text-center">
                      <button 
                        className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                        onClick={() => navigate('/fichaingreso')}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-xs"
          >
            Cerrar sesión
          </button>
          <button className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 text-xs">
            Generar Informe Completo
          </button>
        </div>
      </div>
    </div>
  );
};

export default InicioAreaAdministrador;
