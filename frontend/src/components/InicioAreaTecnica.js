import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPenitenciaria from '../assets/images/logoPenitenciaria.png';

const InicioAreaTecnica = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('');
  const navigate = useNavigate();

  const user = {
    name: 'Alfredo Fernandez',
    area: 'Técnica',
  };

  const data = Array.from({ length: 50 }, (_, index) => ({
    name: `Juan Carlos López ${index + 1}`,
    dni: '12345678', // Agrega el campo DNI aquí
    crime: 'Robo',
    internalType: Math.random() > 0.5 ? 'Condenado' : 'Procesado', // Añadir tipo de interno
    court: 'T.O.P.LIBRES',
    admissionDate: '25/06/2025',
    sentenceDate: '25/06/2025',
    sentence: '25/06/2025',
    fileNumber: '3544',
    assistanceDate: '25/06/2025',
    transferDate: '25/06/2025',
    unit: '3',
    unidad: `Unidad ${Math.floor(Math.random() * 12) + 1}` // Campo Unidad agregado
  }));

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bg-general bg-cover bg-center min-h-screen flex flex-col p-4">
      <div className="bg-gray-100 flex-1 p-4 rounded-md flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between items-start mb-4">
          <div className="text-left text-base mb-4 md:mb-0">
            <p className='text-lg'><strong>Bienvenido/a, {user.name}</strong></p>
            <p className='text-sm'><strong>Área:</strong> {user.area}</p>
          </div>

          <div className="my-4 md:my-0 flex flex-col items-center">
            <img src={logoPenitenciaria} alt="Logo" className="w-40 h-auto mb-2" />
          </div>

          <div className="flex flex-col md:flex-row md:items-center">
            <div className="flex items-center mb-2 md:mb-0 md:mr-4">
              <label htmlFor="search" className="mr-3 text-base font-semibold text-sm">Buscar:</label>
              <input
                type="text"
                id="search"
                placeholder="DNI / Legajo judicial"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded text-sm"
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="unit" className="mr-3 text-base font-semibold text-sm">Unidad:</label>
              <select
                id="unit"
                value={selectedUnit}
                onChange={(e) => setSelectedUnit(e.target.value)}
                className="w-full p-1 border border-gray-300 rounded text-sm text-gray-400"
              >
                <option value="">Seleccione una unidad</option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Unidad {i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
            <table className="w-full text-left bg-white rounded-md shadow-md text-sm">
              <thead className="bg-gray-400">
                <tr>
                  <th className="p-2 border">Nombre/Apellido</th>
                  <th className="p-2 border">DNI</th> {/* Agrega esta fila */}
                  <th className="p-2 border">Unidad</th> {/* Nueva columna Unidad */}
                  <th className="p-2 border">Delitos</th>
                  <th className="p-2 border">Tipo Interno</th>
                  <th className="p-2 border">Juzgado</th>
                  <th className="p-2 border">Fecha Ingreso</th>
                  <th className="p-2 border">Cumple Condena</th>
                  <th className="p-2 border">Duración Condena</th>
                  <th className="p-2 border">Legajo</th>
                  <th className="p-2 border">Fecha Asistida</th>
                  <th className="p-2 border">Unidad</th>
                  <th className="p-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 30).map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border text-xs">{item.name}</td>
                    <td className="p-2 border text-xs">{item.dni}</td>
                    <td className="p-2 border text-xs">{item.unidad}</td> {/* Muestra la Unidad aquí */}
                    <td className="p-2 border text-xs">{item.crime}</td>
                    <td className="p-2 border text-xs">{item.internalType}</td>
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
                    <td className="p-2 border text-xs">{item.unit}</td> {/* Nueva posición */}
                    <td className="p-2 border text-center">
                      <button className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                        onClick={() => navigate('/fichaingreso')}>
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
            onClick={handleLogout}
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

export default InicioAreaTecnica;
