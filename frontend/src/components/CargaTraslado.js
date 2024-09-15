import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaTraslado = () => {
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

    const [trasladoData, setTrasladoData] = useState({
        numeroActa: '',
        fechaTraslado: '',
        patenteMovil: '',
        horarioTraslado: '',
        lugarDestino: '',
        motivoTraslado: '',
        encargado: {
            nombrecompleto: '',
            dni: '',
        },
    });

    const handleAgregarTraslado = () => {
        if (validateForm()) {
            // Agregar fecha de carga al trasladoData
            const trasladoConFecha = {
                ...trasladoData,
                fechaCarga: new Date().toLocaleString()
            };

            // Guardar el nuevo traslado con la fecha de carga en el historial
            setHistorialTraslados([...historialTraslados, trasladoConFecha]);

            // Limpiar el formulario de traslado
            setTrasladoData({
                numeroActa: '',
                fechaTraslado: '',
                patenteMovil: '',
                horarioTraslado: '',
                lugarDestino: '',
                motivoTraslado: '',
                encargado: {
                    nombrecompleto: '',
                    dni: '',
                },
            });
        }
    };


    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            numeroActa: '',
            fechaTraslado: '',
            patenteMovil: '',
            horarioTraslado: '',
            lugarDestino: '',
            motivoTraslado: '',
            encargado: {
                nombrecompleto: '',
                dni: '',
            },
        };

        if (!trasladoData.numeroActa) {
            newErrors.numeroActa = 'Número de acta es requerido';
            isValid = false;
        }

        if (!trasladoData.fechaTraslado) {
            newErrors.fechaTraslado = 'Fecha de traslado es requerida';
            isValid = false;
        }

        if (!trasladoData.patenteMovil) {
            newErrors.patenteMovil = 'Patente del móvil es requerida';
            isValid = false;
        }

        if (!trasladoData.horarioTraslado) {
            newErrors.horarioTraslado = 'Horario del traslado es requerido';
            isValid = false;
        }

        if (!trasladoData.lugarDestino) {
            newErrors.lugarDestino = 'Lugar de destino es requerido';
            isValid = false;
        }

        if (!trasladoData.motivoTraslado) {
            newErrors.motivoTraslado = 'Motivo del traslado es requerido';
            isValid = false;
        }

        if (!trasladoData.encargado.nombrecompleto) {
            newErrors.encargado.nombrecompleto = 'Nombre del encargado es requerido';
            isValid = false;
        }

        if (!trasladoData.encargado.dni) {
            newErrors.encargado.dni = 'DNI del encargado es requerido';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const [errors, setErrors] = useState({
        numeroActa: '',
        fechaTraslado: '',
        patenteMovil: '',
        horarioTraslado: '',
        lugarDestino: '',
        motivoTraslado: '',
        encargado: {
            nombrecompleto: '',
            dni: '',
        },
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

    const [selectedArea, setSelectedArea] = useState('Traslado');
    const [historialTraslados, setHistorialTraslados] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrasladoData({
            ...trasladoData,
            [name]: value,
        });
    };

    const handleEncargadoChange = (e) => {
        const { name, value } = e.target;
        setTrasladoData({
            ...trasladoData,
            encargado: {
                ...trasladoData.encargado,
                [name]: value,
            },
        });
    };

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
            setSelectedArea('Traslado');
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
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga de Traslado</h1>
                <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4">
                    <h2 className="text-lg font-bold mb-2">Encargado del Traslado</h2>
                    <label className="block text-sm font-semibold mb-2">Nombre/s y Apellido/s</label>
                    <input
                        type="text"
                        name="nombrecompleto"
                        value={trasladoData.encargado.nombrecompleto}
                        onChange={handleEncargadoChange}
                        className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.encargado.nombrecompleto ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                        placeholder="Nombre/s y Apellido/s del encargado"
                    />

                    {errors.encargado.nombrecompleto && <p className="text-red-500 text-sm">{errors.encargado.nombrecompleto}</p>}

                    <label className="block text-sm font-semibold mt-2 mb-2">DNI</label>
                    <input
                        type="text"
                        name="dni"
                        value={trasladoData.encargado.dni}
                        onChange={handleEncargadoChange}
                        className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.encargado.dni ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                        placeholder="DNI del encargado"
                    />
                    {errors.encargado.dni && <p className="text-red-500 text-sm">{errors.encargado.dni}</p>}
                </div>
                {/* Información del Traslado */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <label className="block text-sm font-semibold mb-2">Fecha de Traslado</label>
                        <input
                            type="date"
                            name="fechaTraslado"
                            value={trasladoData.fechaTraslado}
                            onChange={handleChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.fechaTraslado ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                        />
                        {errors.fechaTraslado && <p className="text-red-500 text-sm">{errors.fechaTraslado}</p>}
                    </div>

                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <label className="block text-sm font-semibold mb-2">Horario del Traslado</label>
                        <input
                            type="time"
                            name="horarioTraslado"
                            value={trasladoData.horarioTraslado}
                            onChange={handleChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.horarioTraslado ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                        />
                        {errors.horarioTraslado && <p className="text-red-500 text-sm">{errors.horarioTraslado}</p>}
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <label className="block text-sm font-semibold mb-2">Número de Acta</label>
                        <input
                            type="text"
                            name="numeroActa"
                            value={trasladoData.numeroActa}
                            onChange={handleChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.numeroActa ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            placeholder="Número de acta"
                        />
                        {errors.numeroActa && <p className="text-red-500 text-sm">{errors.numeroActa}</p>}
                    </div>

                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <label className="block text-sm font-semibold mb-2">Patente del Móvil Utilizado</label>
                        <input
                            type="text"
                            name="patenteMovil"
                            value={trasladoData.patenteMovil}
                            onChange={handleChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.patenteMovil ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            placeholder="Patente del móvil"
                        />
                        {errors.patenteMovil && <p className="text-red-500 text-sm">{errors.patenteMovil}</p>}
                    </div>

                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <label className="block text-sm font-semibold">Lugar al Cual se Traslada</label>
                        <input
                            type="text"
                            name="lugarDestino"
                            value={trasladoData.lugarDestino}
                            onChange={handleChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm mt-3 ${errors.lugarDestino ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            placeholder="Lugar destino"
                        />
                        {errors.lugarDestino && <p className="text-red-500 text-sm">{errors.lugarDestino}</p>}
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <label className="block text-sm font-semibold mb-2">Motivo de Traslado</label>
                        <textarea
                            name="motivoTraslado"
                            value={trasladoData.motivoTraslado}
                            onChange={handleChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.motivoTraslado ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            rows="2"
                            placeholder="Motivo del traslado"
                        />
                        {errors.motivoTraslado && <p className="text-red-500 text-sm">{errors.motivoTraslado}</p>}
                    </div>
                </div>
                <div className="mt-4 bg-white flex flex-col md:flex-row md:items-start md:justify-start p-4 bg-white p-4 rounded-md shadow-md">
                    <label className="block text-sm font-semibold mb-2 md:mb-0 md:mr-5">Subir Ácta / Oficio</label>
                    <input type="file" className="border border-gray-300 p-1 rounded text-sm w-full md:w-auto md:mt-5" />
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleAgregarTraslado}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                    >
                        Cargar
                    </button>
                </div>

                <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-6">
                    <h2 className="text-sm font-bold mt-4">Historial de Traslados</h2>
                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {historialTraslados.length > 0 ? (
                            <ul className="space-y-4">
                                {historialTraslados.map((traslado, index) => (
                                    <li key={index} className="border-b border-gray-300 pb-2 mb-2">
                                        <div><strong className="text-sm">Número de Acta:</strong> {traslado.numeroActa}</div>
                                        <div><strong className="text-sm">Fecha de Traslado:</strong> {traslado.fechaTraslado}</div>
                                        <div><strong className="text-sm">Patente del Móvil:</strong> {traslado.patenteMovil}</div>
                                        <div><strong className="text-sm">Horario del Traslado:</strong> {traslado.horarioTraslado}</div>
                                        <div><strong className="text-sm">Lugar de Destino:</strong> {traslado.lugarDestino}</div>
                                        <div><strong className="text-sm">Motivo del Traslado:</strong> {traslado.motivoTraslado}</div>
                                        <div><strong className="text-sm">Encargado:</strong> {traslado.encargado.nombrecompleto} {traslado.encargado.apellidos}, <strong className="text-sm">DNI: </strong>{traslado.encargado.dni}</div>
                                        <div><p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {traslado.fechaCarga}</p></div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 text-center">
                                No hay traslados registrados aún.
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => navigate('/general')}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menu Principal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaTraslado;
