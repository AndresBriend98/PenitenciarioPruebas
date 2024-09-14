import React, { useState, useRef,useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaDatosPersonales = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -200 : 200,
                behavior: 'smooth'
            });
        }
    };

    const [user, setUser] = useState({
        name: 'Maximiliano Ezequiel Dominguez',
        alias: 'JL',
        unit: 'Unidad Penitenciaria 9',
        fileNumber: '3576',
        typedoc: 'Cédula Ejemplar B',
        dni: '23123564',
        crime: 'Robo',
        typeofintern: 'Condenado',
        entryDate: '10/06/2024',
        sentenceEndDate: '10/06/2030',
        remainingSentence: '3 años 2 meses 5 días',
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

    const [selectedArea, setSelectedArea] = useState('Datos personales');

    const [egreso, setEgreso] = useState(true);
    const [egresoDate, setEgresoDate] = useState('');
    const [leyMicaela, setLeyMicaela] = useState(true);
    const [leyBlumberg, setLeyBlumberg] = useState(true);
    const [image, setImage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleVolver = () => {
        navigate('/general');
    };

    const handleGuardarCambios = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
        }, 3000);
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
            setSelectedArea('Datos personales');
        }
    }, [selectedArea]); 

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-md shadow-lg text-center">
                        <h2 className="text-sm font-bold mb-2">Datos cargados con éxito</h2>
                    </div>
                </div>
            )}

            {/* Información del usuario, foto y checkboxes */}
            <div className="bg-gray-300 p-4 rounded-md flex flex-col md:flex-row mb-4 items-start">
                {/* Foto y datos del usuario */}
                <div className="flex items-start flex-grow">
                    {/* Foto y botón de carga */}
                    <div className="relative mr-4 flex-shrink-0 flex flex-col items-center mt-4">
                        <div className="w-48 h-48 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden mb-2">
                            <span className="text-center text-white">Foto</span>
                        </div>
                    </div>
                    {/* Datos del usuario */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-bold text-center">{user.name}</h2>
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
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga de Datos Personales</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha de nacimiento</label>
                        <input type="date" placeholder="Selecciona una fecha" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Edad</label>
                        <input type="number" placeholder="Introduce la edad" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Nacionalidad</label>
                        <input type="text" placeholder="Introduce la nacionalidad" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Provincia</label>
                        <input type="text" placeholder="Introduce la provincia" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Lugar de nacimiento / Pueblo / Dpto</label>
                        <input type="text" placeholder="Introduce el lugar de nacimiento" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Estado Civil</label>
                        <input type="text" placeholder="Introduce el estado civil" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Domicilio Actual</label>
                        <input type="text" placeholder="Introduce el domicilio actual" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Domicilio Anterior</label>
                        <input type="text" placeholder="Introduce el domicilio anterior" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Número de teléfono</label>
                        <input type="text" placeholder="Introduce el número de teléfono" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Religión</label>
                        <input type="text" placeholder="Introduce la religión" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Profesión</label>
                        <input type="text" placeholder="Introduce la profesión" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Ocupación</label>
                        <input type="text" placeholder="Introduce la ocupación" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha de fallecimiento</label>
                        <input type="date" placeholder="Selecciona una fecha" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Antecedente laboral</label>
                        <textarea placeholder="Describe el antecedente laboral" className="w-full p-1 border border-gray-300 rounded text-sm" rows="2" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Observación</label>
                        <textarea placeholder="Introduce una observación" className="w-full p-1 border border-gray-300 rounded text-sm" rows="2" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Peculio</label>
                        <textarea placeholder="Introduce el pelucio" className="w-full p-1 border border-gray-300 rounded text-sm" rows="2" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Lugares de trabajos y direcciones</label>
                        <textarea placeholder="Introduce el pelucio" className="w-full p-1 border border-gray-300 rounded text-sm" rows="2" />
                    </div>
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={() => navigate('/general')}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menu Principal
                    </button>
                    <div className="flex space-x-3">
                        <button
                            onClick={handleGuardarCambios}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default CargaDatosPersonales;