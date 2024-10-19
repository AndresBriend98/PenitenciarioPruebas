import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logoPenitenciaria from '../assets/images/logoPenitenciaria.png';

const InicioAreaAdministrador = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [searchDNI, setSearchDNI] = useState('');  // Campo de búsqueda por DNI
  const [searchLegajo, setSearchLegajo] = useState('');  // Campo de búsqueda por Legajo
  const [data, setData] = useState([]);  // Datos que se generarán una sola vez

  const user = {
    name: 'Uriel Umeres',
    area: 'Administrador',
    unit: '2',
  };


  // Solo se genera una vez al montar el componente
  useEffect(() => {
    const generatedData = Array(15).fill(null).map((_, index) => ({
      name: 'Juan Carlos López',
      crime: 'Robo',
      sentenceDate: '25/06/2025',
      court: 'T.O.P.LIBRES',
      sentence: '25/06/2025',
      fileNumber: Math.floor(1000 + Math.random() * 9000), // Genera un número de legajo aleatorio de 4 dígitos
      transferDate: '25/06/2025',
      assistanceDate: '25/06/2025',
      admissionDate: '25/06/2025',
      internalType: Math.random() > 0.5 ? 'Condenado' : 'Procesado',
      dni: Math.floor(10000000 + Math.random() * 90000000) // DNI aleatorio de 8 dígitos
    }));
    setData(generatedData); // Solo se setea una vez
  }, []);

  const filteredData = data.filter((item) => {
    // Si el interno es "Procesado", no tiene legajo
    const isValidLegajo = item.internalType === 'Condenado'
      ? (item.fileNumber && item.fileNumber.toString().startsWith(searchLegajo))
      : false;  // Procesados no tienen legajo, por lo que siempre será false

    const matchesDNI = searchDNI === '' || (item.dni && item.dni.toString().startsWith(searchDNI));
    const matchesLegajo = searchLegajo === '' || isValidLegajo;

    // Solo mostrar internos que sean válidos (condenados con legajo o procesados sin legajo)
    return matchesDNI && matchesLegajo;
  });

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

        <div className="flex flex-col md:flex-row md:items-center mb-5">
          <div className="flex items-center mb-2 md:mb-0 md:mr-4">
            <label htmlFor="searchDNI" className="text-base font-semibold text-sm">Buscar DNI:</label>
            <input
              type="text"
              id="searchDNI"
              placeholder="DNI"
              value={searchDNI}
              onChange={(e) => setSearchDNI(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded text-sm"
            />
          </div>

          <div className="flex items-center mb-2 md:mb-0 md:mr-4">
            <label htmlFor="searchLegajo" className="text-base font-semibold text-sm">Buscar Legajo:</label>
            <input
              type="text"
              id="searchLegajo"
              placeholder="Legajo"
              value={searchLegajo}
              onChange={(e) => setSearchLegajo(e.target.value)}
              className="w-full p-1 border border-gray-300 rounded text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="max-h-[calc(100vh-12rem)] overflow-y-auto">
            <table className="w-full text-left bg-white rounded-md shadow-md text-sm">
              <thead className="bg-gray-400">
                <tr>
                  <th className="p-2 border">#</th>
                  <th className="p-2 border">Nombre/Apellido</th>
                  <th className="p-2 border">DNI</th> {/* Nueva columna de DNI */}
                  <th className="p-2 border">Delitos</th>
                  <th className="p-2 border">Tipo Interno</th>
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
                {filteredData.slice(0, 15).map((item, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="p-2 border text-xs">{index + 1}</td>
                    <td className="p-2 border text-xs">{item.name}</td>
                    <td className="p-2 border text-xs">{item.dni}</td> {/* Mostrar DNI */}
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
