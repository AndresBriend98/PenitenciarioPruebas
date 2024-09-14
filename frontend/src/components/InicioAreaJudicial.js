import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPenitenciaria from '../assets/images/logoPenitenciaria.png';

const InicioAreaJudicial = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const user = {
    name: 'Tomás Torres',
    area: 'Judicial',
    unit: '4'
  };

  const data = Array(50).fill({
    name: 'Juan Carlos López',
    crime: 'Robo',
    sentenceDate: '25/06/2025',
    court: 'T.O.P.LIBRES',
    sentence: '25/06/2025',
    fileNumber: '3544',
    transferDate: '25/06/2025',
    conditionalDate: '25/06/2025',
    assistanceDate: '25/06/2025',
    admissionDate: '25/06/2025'
  });

  const handleLogout = () => {
    //Logica falta
    navigate('/login');
  };

  const handleAddInterno = () => {
    navigate('/carganuevointerno');
  };

  return (
    <div className="bg-general bg-cover bg-center min-h-screen flex flex-col p-4">
      <div className="bg-gray-100 flex-1 p-4 rounded-md flex flex-col">
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="text-center md:text-left text-base mb-4 md:mb-0 flex flex-col items-center md:items-start">
            <p className='text-lg'><strong>Bienvenido/a, {user.name}</strong></p>
            <p className='text-sm'><strong>Área:</strong> {user.area}</p>
            <p className='text-sm'><strong>Unidad:</strong> {user.unit}</p>
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
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
            <table className="w-full text-left bg-white rounded-md shadow-md text-sm">
              <thead className="bg-gray-400">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Nombre/Apellido</th>
                  <th className="p-2 border">Delitos</th>
                  <th className="p-2 border">Cumple</th>
                  <th className="p-2 border">Juzgado</th>
                  <th className="p-2 border">Condena</th>
                  <th className="p-2 border">Legajo</th>
                  <th className="p-2 border">F_TRANS</th>
                  <th className="p-2 border">F_COND</th>
                  <th className="p-2 border">F_ASIST</th>
                  <th className="p-2 border">F_ING</th>
                  <th className="p-2 border">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.slice(0, 30).map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border text-xs">{index + 1}</td>
                    <td className="p-2 border text-xs">{item.name}</td>
                    <td className="p-2 border text-xs">{item.crime}</td>
                    <td className="p-2 border text-xs">{item.sentenceDate}</td>
                    <td className="p-2 border text-xs">{item.court}</td>
                    <td className="p-2 border text-xs">{item.sentence}</td>
                    <td className="p-2 border text-xs">{item.fileNumber}</td>
                    <td className="p-2 border text-xs">{item.transferDate}</td>
                    <td className="p-2 border text-xs">{item.conditionalDate}</td>
                    <td className="p-2 border text-xs">{item.assistanceDate}</td>
                    <td className="p-2 border text-xs">{item.admissionDate}</td>
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
          <button
            onClick={handleAddInterno}
            className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 text-xs"
          >
            Agregar Interno
          </button>
        </div>
      </div>
    </div>
  );
};

export default InicioAreaJudicial;
