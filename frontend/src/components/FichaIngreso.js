import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FichaIngreso = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -150 : 150,
                behavior: 'smooth'
            });
        }
    };

    const [user, setUser] = useState({
        name: 'Ana María Fernández',
        alias: 'AMF',
        unit: 'Unidad Penitenciaria 12',
        fileNumber: '4587',
        typedoc: 'DNI',
        dni: '27483912',
        crime: 'Hurto',
        typeofintern: 'Condenado',
        entryDate: '2026-06-01',
        sentenceEndDate: '15/08/2025',
        remainingSentence: '1 año 5 meses 12 días',
        numprontuario: '48765',
        reingresante: false,
        processed: true,
        placeOfEvent: 'Calle Falsa 123, Ciudad',
        detentionDate: '10/07/2023',
        intakeDate: '15/08/2023',
        sentence: '2 años de prisión',
        sentenceEndDate: '15/08/2025',
        remainingSentence: '1 año 5 meses 12 días',
        commutationDate: 'N/A',
        transitionalBenefitDate: 'N/A',
        conditionalLibertyDate: 'N/A',
        assistedDate: 'N/A',
        reportDate: '12/08/2024',
        policeSection: 'Sección 5',
        observation: 'Sin observaciones adicionales',
        signaturePhoto: null,
        fingerprintPhoto: null,
        dischargeOrder: null,
        detentionDate: '2024-08-15',
        sentenceEndDate: '2034-08-16',
        commutationDate: '2024-09-01',
        transitionalBenefitDate: '2025-01-01',
        conditionalLibertyDate: '2026-06-01',
        assistedDate: '2024-12-01',
        reportDate: '2024-08-31',
    });

    const areas = [
        'Ficha ingreso',
        'Area judicial',
        'Datos personales',
        'Conducta-Concepto-Fases',
        'Permisos',
        'Antecedentes penales',
        'Grupo Familiar',
        'Visitas',
        'Salidas',
        'Traslado',
        'Alojamiento y movimiento',
        'Salud',
        'Educación',
        'Trabajo',
        'Criminología',
        'Psicología',
        'Fisionomía'
    ];

    const [selectedArea, setSelectedArea] = useState('Ficha ingreso');


    const handleVolver = () => {
        navigate('/general');
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const selectedButton = container.querySelector(`[data-area="${selectedArea}"]`);
            if (selectedButton) {
                container.scrollTo({
                    left: selectedButton.offsetLeft - (container.offsetWidth / 2) + (selectedButton.offsetWidth / 2),
                    behavior: 'smooth'
                });
            }
            setSelectedArea('Ficha ingreso');
        }
    }, [selectedArea]);

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            {/* Información del usuario, foto y checkboxes */}
            <div className="bg-gray-400 p-4 rounded-md flex flex-col md:flex-row mb-4 items-start">
                {/* Foto y datos del usuario */}
                <div className="flex items-start flex-grow">
                    {/* Foto y botón de carga */}
                    <div className="relative mr-4 flex-shrink-0 flex flex-col items-center mt-4">
                        <div className="w-48 h-48 bg-gray-300 rounded-full flex justify-center items-center overflow-hidden mb-2">
                            <span className="text-center text-gray-700">Foto</span>
                        </div>
                    </div>
                    {/* Datos del usuario */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-bold">{user.name}</h2>
                        <p className="mt-1 text-sm"><strong>Tipo de interno:</strong> {user.typeofintern}</p>
                        <p className="mt-1 text-sm"><strong>Alias:</strong> {user.alias}</p>
                        <p className="mt-1 text-sm"><strong>Unidad:</strong> {user.unit}</p>
                        <p className="mt-1 text-sm"><strong>Legajo:</strong> {user.fileNumber}</p>
                        <p className="mt-1 text-sm"><strong>Tipo de documento:</strong> {user.typedoc}</p>
                        <p className="mt-1 text-sm"><strong>DNI:</strong> {user.dni}</p>
                        <p className="mt-1 text-sm"><strong>Delito:</strong> {user.crime}</p>
                    </div>
                </div>
                {/* Checkboxes alineados a la derecha */}
                <div className="flex flex-col space-y-2 ml-auto mt-4 md:mt-0">
                    {/* Egreso checkbox y campos */}
                    <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex flex-col items-start shadow-sm">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="egreso"
                                checked={true}
                                readOnly
                                className="mr-2"
                            />
                            <label htmlFor="egreso" className="text-sm">Egreso</label>
                        </div>
                        {true && ( // Condición para mostrar los campos
                            <div className="w-full mt-2">
                                <label htmlFor="egresoDate" className="block text-sm font-semibold mb-1">Fecha de Egreso</label>
                                <input
                                    type="date"
                                    id="egresoDate"
                                    value="2024-09-09" // Valor preestablecido
                                    readOnly
                                    className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
                                />
                                <label htmlFor="numOficioEgreso" className="block text-sm font-semibold mb-1">Num. Oficio Egreso</label>
                                <input
                                    type="text"
                                    id="numOficioEgreso"
                                    value="12345" // Valor preestablecido
                                    readOnly
                                    className="w-full p-1 border border-gray-300 rounded text-sm"
                                />
                            </div>
                        )}
                    </div>
                    {/* Otros checkboxes */}
                    <div className="flex space-x-2 mt-4">
                        <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex items-center shadow-sm">
                            <input
                                type="checkbox"
                                id="leyBlumberg"
                                checked={false}
                                readOnly
                                className="mr-2"
                            />
                            <label htmlFor="leyBlumberg" className="text-sm">Ley Blumberg</label>
                        </div>
                        <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex items-center shadow-sm">
                            <input
                                type="checkbox"
                                id="leyMicaela"
                                checked={false}
                                readOnly
                                className="mr-2"
                            />
                            <label htmlFor="leyMicaela" className="text-sm">Ley Micaela</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative flex items-center justify-center w-full mb-4">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 bg-white text-gray-800 p-2 rounded-full shadow-lg border border-black hover:bg-gray-100 transition-colors z-20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex items-center overflow-hidden whitespace-nowrap px-4 mx-4"
                >
                    {areas.map((area) => (
                        <button
                            key={area}
                            data-area={area}
                            onClick={() => {
                                switch (area) {
                                    case 'Salud':
                                        navigate('/cargasalud');
                                        break;
                                    case 'Criminología':
                                        navigate('/cargacriminologia');
                                        break;
                                    case 'Fisionomía':
                                        navigate('/cargafisionomia');
                                        break;
                                    case 'Permisos':
                                        navigate('/cargapermisos');
                                        break;
                                    case 'Antecedentes penales':
                                        navigate('/cargaantecedentespenales');
                                        break;
                                    case 'Conducta-Concepto-Fases':
                                        navigate('/cargaconducconcepfases');
                                        break;
                                    case 'Traslado':
                                        navigate('/cargatraslado');
                                        break;
                                    case 'Grupo Familiar':  // Añadido caso para Grupo Familiar
                                        navigate('/cargagrupofamiliar');
                                        break;
                                    case 'Area judicial':  // Añadido caso para Judicial
                                        navigate('/cargajudicial');
                                        break;
                                    case 'Visitas':  // Añadido caso para Visitas
                                        navigate('/cargavisitas');
                                        break;
                                    case 'Salidas':  // Añadido caso para Salidas
                                        navigate('/cargasalidas');
                                        break;
                                    case 'Alojamiento y movimiento':  // Añadido caso para Alojamiento y Movimiento
                                        navigate('/cargaalojamientoymovimiento');
                                        break;
                                    case 'Educación':  // Añadido caso para Educación
                                        navigate('/cargaeducacion');
                                        break;
                                    case 'Trabajo':  // Añadido caso para Trabajo
                                        navigate('/cargatrabajo');
                                        break;
                                    case 'Psicología':  // Añadido caso para Psicología
                                        navigate('/cargapsicologia');
                                        break;
                                    case 'Datos personales':  // Añadido caso para datos personales
                                        navigate('/cargadatospersonales');
                                        break;
                                    case 'Ficha ingreso':  // Añadido caso para datos personales
                                        navigate('/fichaingreso');
                                        break;
                                    default:
                                        // Manejo de casos no definidos
                                        console.error('Área no definida: ', area);
                                        break;
                                }
                            }}
                            className={`px-12 py-2 text-sm font-medium rounded-full transition-transform transform border border-black ${selectedArea === area
                                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg scale-95'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {area}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 bg-white text-gray-800 p-2 rounded-full shadow-lg border border-black hover:bg-gray-100 transition-colors z-20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>

            {/* Formulario de Detalles */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <h1 className="text-2xl font-bold mb-4">Ficha de Ingreso</h1>
                <div className="flex items-center p-2 bg-gray-100 rounded-md shadow-sm mb-4">
                    <input
                        type="checkbox"
                        id="reingresante"
                        className="form-checkbox h-5 w-5 text-blue-600 bg-white border-gray-300 rounded-md focus:ring-blue-500"
                        checked={user.reingresante} // Muestra el valor del checkbox
                        readOnly // Si no quieres que el usuario pueda modificar el valor, puedes agregar esto
                    />
                    <label htmlFor="reingresante" className="ml-2 text-gray-700 text-sm font-medium">Reingresante</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Cantidad de Reingresos</label>
                        <input
                            type="number"
                            placeholder="Introduce la cantidad de reingresos"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.reingresante ? '1' : '0'} // Muestra el valor basado en si es reingresante
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Lugar del hecho</label>
                        <input
                            type="text"
                            placeholder="Introduce el lugar del hecho"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.placeOfEvent} // Muestra el lugar del hecho
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha de Detención</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.detentionDate} // Muestra la fecha de detención
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha de Ingreso</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.entryDate} // Muestra la fecha de ingreso
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Condena</label>
                        <input
                            type="text"
                            placeholder="Introduce la condena"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.sentence} // Muestra la condena
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Cumple Condena</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm text-red-700"
                            value={user.sentenceEndDate} // Muestra la fecha de finalización de condena
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Condena Restante</label>
                        <input
                            type="text"
                            placeholder="Introduce la condena restante"
                            className="w-full p-1 border border-gray-300 rounded text-sm text-red-700"
                            value={user.remainingSentence} // Muestra la condena restante
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Conmutación de Pena</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.commutationDate} // Muestra la fecha de conmutación de pena
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Beneficio Transitorio</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.transitionalBenefitDate} // Muestra la fecha de beneficio transitorio
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Beneficio Libertad Condicional</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.conditionalLibertyDate} // Muestra la fecha de beneficio de libertad condicional
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Asistida</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.assistedDate} // Muestra la fecha asistida
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Informe</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.reportDate} // Muestra la fecha de informe
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Sección Policial</label>
                        <input
                            type="text"
                            placeholder="Introduce la sección policial"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.policeSection} // Muestra la sección policial
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Observación</label>
                        <textarea
                            placeholder="Introduce una observación"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            rows="2"
                            value={user.observation} // Muestra la observación
                            readOnly
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Núm. Prontuario Policial</label>
                        <input
                            type="text"
                            placeholder="Introduce el número de prontuario policial"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.numprontuario} // Muestra el número de prontuario policial
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex items-center mt-4 space-x-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold">Foto de Firma</label>
                        <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                            <p className="text-gray-500 text-sm">Ningún archivo cargado</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold">Foto de Huella Dactilar</label>
                        <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                            <p className="text-gray-500 text-sm">Ningún archivo cargado</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 mt-3">
                    <label className="block text-gray-700 text-sm font-bold">Oficio de Egreso</label>
                    <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                        <p className="text-gray-500 text-sm">Ningún archivo cargado</p>
                    </div>
                </div>

                <button
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-sm mt-10"
                    onClick={handleVolver}
                >
                    Volver
                </button>

            </div>

        </div>
    );
};

export default FichaIngreso;
