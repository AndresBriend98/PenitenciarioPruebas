import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaSalud = () => {
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

    const [errors, setErrors] = useState({
        vacunas: {
            descripcion: '',
            fecha: ''
        },
        atenciones: {
            descripcion: '',
            fecha: '',
            hora: ''
        },
        tratamientos: {
            descripcion: '',
            fecha: ''
        },
        padecimientos: {
            descripcion: '',
            fecha: ''
        }
    });

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
    const [selectedArea, setSelectedArea] = useState('Salud');
    const [historialpadecimiento, setHistorialpadecimiento] = useState([]);
    const [tratamientos, setTratamientos] = useState([]);
    const [vacunas, setVacunas] = useState([]);
    const [atenciones, setAtenciones] = useState([]);
    const [padecimientoData, setPadecimientoData] = useState({ descripcion: '', fecha: '' });
    const [tratamientoData, setTratamientoData] = useState({ descripcion: '', fecha: '' });
    const [vacunaData, setVacunaData] = useState({ descripcion: '', fecha: '' });
    const [atencionData, setAtencionData] = useState({ descripcion: '', fecha: '', hora: '' });

    const handleAgregarPadecimiento = () => {
        let hasErrors = false;
        const newErrors = { descripcion: '', fecha: '' };

        if (!padecimientoData.descripcion) {
            newErrors.descripcion = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!padecimientoData.fecha) {
            newErrors.fecha = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                padecimientos: newErrors
            }));
        } else {
            const padecimientoConFecha = {
                ...padecimientoData,
                fechaCarga: new Date().toLocaleString() // Fecha de carga actual
            };
            setHistorialpadecimiento([...historialpadecimiento, padecimientoConFecha]);
            setPadecimientoData({ descripcion: '', fecha: '' });
            setErrors(prevErrors => ({
                ...prevErrors,
                padecimientos: { descripcion: '', fecha: '' }
            }));
        }
    };


    const handleAgregarTratamiento = () => {
        let hasErrors = false;
        const newErrors = { descripcion: '', fecha: '' };

        if (!tratamientoData.descripcion) {
            newErrors.descripcion = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!tratamientoData.fecha) {
            newErrors.fecha = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                tratamientos: newErrors
            }));
        } else {
            const tratamientoConFecha = {
                ...tratamientoData,
                fechaCarga: new Date().toLocaleDateString() // Fecha de carga actual
            };
            setTratamientos([...tratamientos, tratamientoConFecha]);
            setTratamientoData({ descripcion: '', fecha: '' });
            setErrors(prevErrors => ({
                ...prevErrors,
                tratamientos: { descripcion: '', fecha: '' }
            }));
        }
    };


    const handleAgregarVacuna = () => {
        let hasErrors = false;
        const newErrors = { descripcion: '', fecha: '' };

        if (!vacunaData.descripcion) {
            newErrors.descripcion = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!vacunaData.fecha) {
            newErrors.fecha = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                vacunas: newErrors
            }));
        } else {
            const vacunaConFecha = {
                ...vacunaData,
                fechaCarga: new Date().toLocaleDateString() // Fecha de carga actual
            };
            setVacunas([...vacunas, vacunaConFecha]);
            setVacunaData({ descripcion: '', fecha: '' });
            setErrors(prevErrors => ({
                ...prevErrors,
                vacunas: { descripcion: '', fecha: '' }
            }));
        }
    };

    const handleAgregarAtencion = () => {
        let hasErrors = false;
        const newErrors = { descripcion: '', fecha: '', hora: '' };

        if (!atencionData.descripcion) {
            newErrors.descripcion = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!atencionData.fecha) {
            newErrors.fecha = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!atencionData.hora) {
            newErrors.hora = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                atenciones: newErrors
            }));
        } else {
            const atencionConFecha = {
                ...atencionData,
                fechaCarga: new Date().toLocaleDateString() // Fecha de carga actual
            };
            setAtenciones([...atenciones, atencionConFecha]);
            setAtencionData({ descripcion: '', fecha: '', hora: '' });
            setErrors(prevErrors => ({
                ...prevErrors,
                atenciones: { descripcion: '', fecha: '', hora: '' }
            }));
        }
    };


    const handleVolver = () => {
        navigate('/general');
    };

    const handleGenerarInforme = () => {

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
            setSelectedArea('Salud');
        }
    }, [selectedArea]);

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            {/* Información del usuario, foto y checkboxes */}
            <div className="bg-gray-300 p-4 rounded-md flex flex-col md:flex-row mb-4 items-center md:items-start">
                {/* Contenedor principal para asegurar alineación */}
                <div className="flex flex-col md:flex-row items-center md:items-start w-full">
                    {/* Foto y datos del usuario */}
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-4 md:mb-0 w-full md:w-auto">
                        {/* Foto y botón de carga */}
                        <div className="relative flex-shrink-0 flex flex-col items-center mb-4 md:mr-4 text-center md:text-left w-full md:w-auto">
                            <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                <span className="text-center text-white text-xs md:text-base">Foto</span>
                            </div>
                        </div>
                        {/* Datos del usuario */}
                        <div className="space-y-2 md:space-y-3 flex-grow w-full md:w-auto">
                            <h2 className="text-lg font-bold text-center md:text-left">{user.name}</h2>
                            <p className="text-sm"><strong>Tipo de interno:</strong> {user.typeofintern}</p>
                            <p className="text-sm"><strong>Alias:</strong> {user.alias}</p>
                            <p className="text-sm"><strong>Unidad:</strong> {user.unit}</p>
                            <p className="text-sm"><strong>Legajo:</strong> {user.fileNumber}</p>
                            <p className="text-sm"><strong>Tipo de documento:</strong> {user.typedoc}</p>
                            <p className="text-sm"><strong>DNI:</strong> {user.dni}</p>
                            <p className="text-sm"><strong>Delito:</strong> {user.crime}</p>
                        </div>
                    </div>
                    {/* Checkboxes alineados a la derecha en pantallas grandes y a la izquierda en pantallas pequeñas */}
                    <div className="flex flex-col space-y-4 md:space-y-2 md:ml-auto w-full md:w-auto">
                        {/* Egreso checkbox y campos */}
                        <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex flex-col items-start shadow-sm">
                            <div className="flex items-center mb-2">
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
                                <div className="w-full">
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
                        <div className="flex flex-col space-y-2">
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


            {/* Formulario dividido en cuatro secciones */}
            <div className='bg-white p-4 rounded-md shadow-md'>
                <h1 className="text-2xl font-bold mb-4">Carga de Salud</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Padecimientos */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold">Padecimientos</h2>
                        <label className="block text-sm font-semibold mt-2">Descripción</label>
                        <input
                            type="text"
                            value={padecimientoData.descripcion}
                            onChange={(e) => setPadecimientoData({ ...padecimientoData, descripcion: e.target.value })}
                            className={`w-full p-1 border ${errors.padecimientos.descripcion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            placeholder="Introduce la descripción aquí"
                        />
                        {errors.padecimientos.descripcion && <p className="text-red-500 text-sm">{errors.padecimientos.descripcion}</p>}

                        <label className="block text-sm font-semibold">Fecha</label>
                        <input
                            type="date"
                            value={padecimientoData.fecha}
                            onChange={(e) => setPadecimientoData({ ...padecimientoData, fecha: e.target.value })}
                            className={`w-full p-1 border ${errors.padecimientos.fecha ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.padecimientos.fecha && <p className="text-red-500 text-sm">{errors.padecimientos.fecha}</p>}

                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarPadecimiento}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        <h3 className="text-sm font-bold mt-4">Historial de Padecimientos</h3>
                        <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                            {historialpadecimiento.length > 0 ? (
                                <ul className="space-y-2 mt-2">
                                    {historialpadecimiento.map((item, index) => (
                                        <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                            <div className="text-sm">
                                                <strong>Descripción:</strong> {item.descripcion}
                                            </div>
                                            <div className="text-sm">
                                                <strong>Fecha:</strong> {item.fecha}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                <strong>Fecha de Carga:</strong> {item.fechaCarga}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay padecimientos registrados aún.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Tratamientos */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold">Tratamientos</h2>
                        <label className="block text-sm font-semibold mt-2">Descripción</label>
                        <input
                            type="text"
                            value={tratamientoData.descripcion}
                            onChange={(e) => setTratamientoData({ ...tratamientoData, descripcion: e.target.value })}
                            className={`w-full p-1 border ${errors.tratamientos.descripcion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            placeholder="Introduce la descripción aquí"
                        />
                        {errors.tratamientos.descripcion && <p className="text-red-500 text-sm">{errors.tratamientos.descripcion}</p>}

                        <label className="block text-sm font-semibold">Fecha</label>
                        <input
                            type="date"
                            value={tratamientoData.fecha}
                            onChange={(e) => setTratamientoData({ ...tratamientoData, fecha: e.target.value })}
                            className={`w-full p-1 border ${errors.tratamientos.fecha ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.tratamientos.fecha && <p className="text-red-500 text-sm">{errors.tratamientos.fecha}</p>}

                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarTratamiento}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        <h3 className="text-sm font-bold mt-4">Historial de Carga</h3>
                        <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                            {tratamientos.length > 0 ? (
                                <ul className="space-y-2 mt-2">
                                    {tratamientos.map((item, index) => (
                                        <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                            <div className="text-sm">
                                                <strong>Descripción:</strong> {item.descripcion}
                                            </div>
                                            <div className="text-sm">
                                                <strong>Fecha:</strong> {item.fecha}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                <strong>Fecha de Carga:</strong> {item.fechaCarga}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay tratamientos registrados aún.
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Vacunas */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold">Vacunas</h2>
                        <label className="block text-sm font-semibold mt-2">Descripción</label>
                        <input
                            type="text"
                            value={vacunaData.descripcion}
                            onChange={(e) => setVacunaData({ ...vacunaData, descripcion: e.target.value })}
                            className={`w-full p-1 border ${errors.vacunas.descripcion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            placeholder="Introduce la descripción aquí"
                        />
                        {errors.vacunas.descripcion && <p className="text-red-500 text-sm">{errors.vacunas.descripcion}</p>}

                        <label className="block text-sm font-semibold">Fecha</label>
                        <input
                            type="date"
                            value={vacunaData.fecha}
                            onChange={(e) => setVacunaData({ ...vacunaData, fecha: e.target.value })}
                            className={`w-full p-1 border ${errors.vacunas.fecha ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.vacunas.fecha && <p className="text-red-500 text-sm">{errors.vacunas.fecha}</p>}

                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarVacuna}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        <h3 className="text-sm font-bold mt-4">Historial de Vacunas</h3>
                        <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                            {vacunas.length > 0 ? (
                                <ul className="space-y-2 mt-2">
                                    {vacunas.map((item, index) => (
                                        <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                            <div className="text-sm">
                                                <strong>Descripción:</strong> {item.descripcion}
                                            </div>
                                            <div className="text-sm">
                                                <strong>Fecha:</strong> {item.fecha}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                <strong>Fecha de Carga:</strong> {item.fechaCarga}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay vacunas registradas aún.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Atenciones */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold">Atenciones</h2>
                        <label className="block text-sm font-semibold mt-2">Descripción</label>
                        <textarea
                            value={atencionData.descripcion}
                            onChange={(e) => setAtencionData({ ...atencionData, descripcion: e.target.value })}
                            className={`w-full p-1 border ${errors.atenciones.descripcion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            rows="3"
                            placeholder="Introduce la descripción aquí"
                        />
                        {errors.atenciones.descripcion && <p className="text-red-500 text-sm">{errors.atenciones.descripcion}</p>}

                        <label className="block text-sm font-semibold">Fecha</label>
                        <input
                            type="date"
                            value={atencionData.fecha}
                            onChange={(e) => setAtencionData({ ...atencionData, fecha: e.target.value })}
                            className={`w-full p-1 border ${errors.atenciones.fecha ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.atenciones.fecha && <p className="text-red-500 text-sm">{errors.atenciones.fecha}</p>}

                        <label className="block text-sm font-semibold">Hora</label>
                        <input
                            type="time"
                            value={atencionData.hora}
                            onChange={(e) => setAtencionData({ ...atencionData, hora: e.target.value })}
                            className={`w-full p-1 border ${errors.atenciones.hora ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.atenciones.hora && <p className="text-red-500 text-sm">{errors.atenciones.hora}</p>}

                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarAtencion}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        <h3 className="text-sm font-bold mt-4">Historial de Atenciones</h3>
                        <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                            {atenciones.length > 0 ? (
                                <ul className="space-y-2 mt-2">
                                    {atenciones.map((item, index) => (
                                        <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                            <div className="text-sm">
                                                <strong>Descripción:</strong> {item.descripcion}
                                            </div>
                                            <div className="text-sm">
                                                <strong>Fecha:</strong> {item.fecha}
                                            </div>
                                            <div className="text-sm">
                                                <strong>Hora:</strong> {item.hora}
                                            </div>
                                            <div className="text-sm text-gray-500 mt-2">
                                                <strong>Fecha de Carga:</strong> {item.fechaCarga}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay atenciones registradas aún.
                                </p>
                            )}
                        </div>
                    </div>

                </div>
                {/* Archivo Adjunto */}
                {/* Archivo Adjunto */}
                <div className="mt-4 bg-white flex flex-col md:flex-row md:items-start md:justify-start p-4 bg-white p-4 rounded-md shadow-md">
                    <label className="block text-sm font-semibold mb-2 md:mb-0 md:mr-5">Radiografías<br />
                        Oficios<br /> Información Médica</label>
                    <input type="file" className="border border-gray-300 p-1 rounded text-sm w-full md:w-auto md:mt-5" />
                </div>


                {/* Botones de acción */}
                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={handleVolver}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menu Principal
                    </button>
                    <button
                        onClick={handleGenerarInforme}
                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 text-xs"
                    >
                        Generar Informe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaSalud;
