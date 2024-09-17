import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaCriminologia = () => {
    const navigate = useNavigate();
    
    const [tituloEditado, setTituloEditado] = useState(''); // Campo para el título en edición
    const [informeEditado, setInformeEditado] = useState(''); // Campo para el informe en edición
    const [observacionEditada, setObservacionEditada] = useState(''); // Campo para la observación en edición
    const handleSaveBeneficio = () => {
        const nuevoHistorialBeneficio = [...historialBeneficio];
        nuevoHistorialBeneficio[editIndexBeneficio] = {
            ...nuevoHistorialBeneficio[editIndexBeneficio],
            beneficio: editBeneficio,
            descripcion: editDescripcionBeneficio,
            observacion: editObservacionBeneficio,
            fechaModificacion: new Date().toLocaleString(), // Añadir la fecha actual
        };
        setHistorialBeneficio(nuevoHistorialBeneficio); // Actualiza el historial
        setEditIndexBeneficio(null); // Salir del modo de edición
        setEditBeneficio(''); // Limpiar los campos de edición
        setEditDescripcionBeneficio(''); // Limpiar los campos de edición
        setEditObservacionBeneficio(''); // Limpiar los campos de edición
    };

    const handleSaveEdit = () => {
        const historialActualizado = [...historial];
        historialActualizado[editIndex] = {
            ...historialActualizado[editIndex],
            titulo: tituloEditado,
            informe: informeEditado,
            observacion: observacionEditada,
            fechaModificacion: new Date().toLocaleString(), // Añade la fecha actual
        };
        setHistorial(historialActualizado); // Actualiza el historial
        setEditIndex(null); // Resetea el índice de edición
        setTituloEditado(''); // Limpia los campos de edición
        setInformeEditado(''); // Limpia los campos de edición
        setObservacionEditada(''); // Limpia los campos de edición
    };

    const handleCancelEdit = () => {
        setEditIndex(null); // Cancela la edición
        setTituloEditado(''); // Limpia los campos de edición
        setInformeEditado(''); // Limpia los campos de edición
        setObservacionEditada(''); // Limpia los campos de edición
    };

    const handleEdit = (index) => {
        const entrada = historial[index];
        setEditIndex(index); // Establece el índice de la entrada que se está editando
        setTituloEditado(entrada.titulo); // Carga el título en el campo de edición
        setInformeEditado(entrada.informe); // Carga el informe en el campo de edición
        setObservacionEditada(entrada.observacion || ''); // Carga la observación (si existe)
    };

    const handleCargarBeneficio = () => {
        if (beneficio.trim() === '' || descripcionBeneficio.trim() === '') {
            setHasErrorBeneficio(true); // Marca error específico
            return;
        }
        setHasErrorBeneficio(false); // Resetea el error si no hay problemas

        const nuevaEntrada = {
            beneficio,
            descripcion: descripcionBeneficio,
            observacion: observacionBeneficio,
            fecha: new Date().toLocaleString(),
        };

        setHistorialBeneficio([...historialBeneficio, nuevaEntrada]);
        setBeneficio('');
        setDescripcionBeneficio('');
        setObservacionBeneficio('');
    };

    // Estados de error
    const [hasErrorCriminologico, setHasErrorCriminologico] = useState(false); // Error para Criminología
    const [hasErrorBeneficio, setHasErrorBeneficio] = useState(false);         // Error para Beneficio


    const handleCargarCriminologico = () => {
        if (informeCriminologico.trim() === '' || tituloInforme.trim() === '') {
            setHasErrorCriminologico(true); // Activa el error
            return;
        }
        setHasErrorCriminologico(false); // Desactiva el error si no hay problemas

        // Agregar nueva entrada al historial
        const nuevaEntrada = {
            titulo: tituloInforme,
            informe: informeCriminologico,
            observacion: observacion,
            fecha: new Date().toLocaleString(),
        };

        setHistorial(prevHistorial => [...prevHistorial, nuevaEntrada]);

        // Limpiar los campos
        setInformeCriminologico('');
        setTituloInforme('');
        setObservacion('');
    };


    // Estados para Carga Beneficio
    const [beneficio, setBeneficio] = useState('');
    const [descripcionBeneficio, setDescripcionBeneficio] = useState('');
    const [observacionBeneficio, setObservacionBeneficio] = useState('');
    const [historialBeneficio, setHistorialBeneficio] = useState([]);
    const [editBeneficio, setEditBeneficio] = useState('');
    const [editDescripcionBeneficio, setEditDescripcionBeneficio] = useState('');
    const [editObservacionBeneficio, setEditObservacionBeneficio] = useState('');
    const [editIndexBeneficio, setEditIndexBeneficio] = useState(null);


    // Función para editar un beneficio
    const handleEditBeneficio = (index) => {
        const entrada = historialBeneficio[index];
        setEditBeneficio(entrada.beneficio);
        setEditDescripcionBeneficio(entrada.descripcion);
        setEditObservacionBeneficio(entrada.observacion || '');
        setEditIndexBeneficio(index);
    };

    const scrollContainerRef = useRef(null);
    const [informeCriminologico, setInformeCriminologico] = useState('');
    const [tituloInforme, setTituloInforme] = useState('');
    const [observacion, setObservacion] = useState('');
    const [historial, setHistorial] = useState([]);
    const [hasError, setHasError] = useState(false);
    const [editIndex, setEditIndex] = useState(null);
    const [editTitulo, setEditTitulo] = useState('');
    const [editInforme, setEditInforme] = useState('');
    const [editObservacion, setEditObservacion] = useState('');


    const [selectedArea, setSelectedArea] = useState('Criminologia');
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

    const handleSave = () => {
        const nuevoHistorial = [...historial];
        nuevoHistorial[editIndex] = {
            ...nuevoHistorial[editIndex],
            titulo: editTitulo,
            informe: editInforme,
            observacion: editObservacion, // Guardar la nueva observación
            fechaModificacion: new Date().toLocaleString(), // Agregar la fecha de modificación
        };
        setHistorial(nuevoHistorial);
        setEditIndex(null); // Salir del modo de edición
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -150 : 150,
                behavior: 'smooth'
            });
        }
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
            setSelectedArea('Criminología');
        }
    }, [selectedArea]);

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col z-10">
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

            {/* Contenedor principal con grid layout */}
            <div className='bg-white p-4 rounded-md shadow-md mb-4 mt-5'>
                <h1 className="text-2xl font-bold mb-4">Area Criminológica</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Formulario de Carga Criminológica */}
                    <div className="bg-white p-4 rounded-md shadow-md mb-4">
                        <h1 className="text-2xl font-bold mb-4">Carga Criminológica</h1>
                        <div className="grid grid-cols-1 gap-3">
                            {/* Campo para el Título del Informe */}
                            <div>
                                <label className="block text-sm font-bold">Título del Informe</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${hasErrorCriminologico ? 'border-red-500' : ''}`}
                                    value={tituloInforme}
                                    onChange={(e) => setTituloInforme(e.target.value)}
                                    placeholder="Ingresar el título del informe"
                                />
                                {hasErrorCriminologico && <p className="text-red-500 text-sm mt-1">El título es obligatorio.</p>}
                            </div>
                            {/* Informe Criminológico */}
                            <div>
                                <label className="block text-sm font-bold">Informe Criminológico</label>
                                <textarea
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${hasErrorCriminologico ? 'border-red-500' : ''}`}
                                    rows="3"
                                    value={informeCriminologico}
                                    onChange={(e) => setInformeCriminologico(e.target.value)}
                                    placeholder="Ingresar el informe criminológico del interno aquí"
                                ></textarea>
                                {hasErrorCriminologico && <p className="text-red-500 text-sm mt-1">El informe es obligatorio.</p>}
                            </div>
                            {/* Observación */}
                            <div>
                                <label className="block text-sm font-bold">Observación</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    rows="3"
                                    value={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                    placeholder="Ingresar alguna observación del interno aquí"
                                ></textarea>
                            </div>
                            {/* Botón Cargar Criminológico */}
                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={handleCargarCriminologico}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                        </div>
                        {/* Historial Criminológico */}
                        <div className="bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                            <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {historial.length > 0 ? (
                                    <ul className="space-y-2">
                                        {historial.map((entrada, index) => (
                                            <li key={index} className="border-b border-gray-300 pb-2">
                                                {editIndex === index ? (
                                                    <>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Título:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={tituloEditado}
                                                                    onChange={(e) => setTituloEditado(e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Informe:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={informeEditado}
                                                                    onChange={(e) => setInformeEditado(e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Observación:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={observacionEditada}
                                                                    onChange={(e) => setObservacionEditada(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="flex justify-center space-x-2 mt-2">
                                                                <button
                                                                    onClick={handleSaveEdit}
                                                                    className="bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600"
                                                                >
                                                                    Guardar
                                                                </button>
                                                                <button
                                                                    onClick={handleCancelEdit}
                                                                    className="bg-gray-500 text-white px-4 py-1 rounded text-xs hover:bg-gray-600"
                                                                >
                                                                    Cancelar
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-sm"><strong>Título:</strong> {entrada.titulo}</p>
                                                        <p className="text-sm"><strong>Informe:</strong> {entrada.informe}</p>
                                                        {entrada.observacion && (
                                                            <p className="text-sm"><strong>Observación:</strong> {entrada.observacion}</p>
                                                        )}
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                                        {entrada.fechaModificacion && (
                                                            <p className="text-sm text-gray-500"><strong>Fecha de modificación:</strong> {entrada.fechaModificacion}</p>
                                                        )}
                                                        <div className="flex justify-center mt-2">
                                                            <button onClick={() => handleEdit(index)} className="bg-orange-400 text-white p-2 rounded-md hover:bg-orange-500 text-xs">
                                                                Editar
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">No hay informes criminológicos registrados aún.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Formulario de Carga Beneficio */}
                    <div className="bg-white p-4 rounded-md shadow-md mb-4">
                        <h1 className="text-2xl font-bold mb-4">Carga Beneficio</h1>
                        <div className="grid grid-cols-1 gap-3">
                            <div>
                                <label className="block text-sm font-bold">Beneficio</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${hasErrorBeneficio ? 'border-red-500' : ''}`}
                                    value={beneficio}
                                    onChange={(e) => setBeneficio(e.target.value)}
                                    placeholder="Ingresar el beneficio del interno aquí"
                                />
                                {hasErrorBeneficio && <p className="text-red-500 text-sm mt-1">El beneficio es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold">Descripción</label>
                                <textarea
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${hasErrorBeneficio ? 'border-red-500' : ''}`}
                                    rows="3"
                                    value={descripcionBeneficio}
                                    onChange={(e) => setDescripcionBeneficio(e.target.value)}
                                    placeholder="Ingresar la descripción del beneficio aquí"
                                ></textarea>
                                {hasErrorBeneficio && <p className="text-red-500 text-sm mt-1">La descripción es obligatoria.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-bold">Observación</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    rows="3"
                                    value={observacionBeneficio}
                                    onChange={(e) => setObservacionBeneficio(e.target.value)}
                                    placeholder="Ingresar alguna observación del interno aquí"
                                ></textarea>
                            </div>
                            {/* Botón Cargar Beneficio */}
                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={handleCargarBeneficio}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                        </div>
                        {/* Historial Beneficio */}
                        {/* Historial de Beneficio */}
                        <div className="bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                            <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {historialBeneficio.length > 0 ? (
                                    <ul className="space-y-2">
                                        {historialBeneficio.map((entrada, index) => (
                                            <li key={index} className="border-b border-gray-300 pb-2">
                                                {editIndexBeneficio === index ? (
                                                    <>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Beneficio:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={editBeneficio}
                                                                    onChange={(e) => setEditBeneficio(e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Descripción:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={editDescripcionBeneficio}
                                                                    onChange={(e) => setEditDescripcionBeneficio(e.target.value)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Observación:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={editObservacionBeneficio}
                                                                    onChange={(e) => setEditObservacionBeneficio(e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="flex justify-center space-x-2 mt-2">
                                                                <button
                                                                    onClick={handleSaveBeneficio}
                                                                    className="bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600"
                                                                >
                                                                    Guardar
                                                                </button>
                                                                <button
                                                                    onClick={() => setEditIndexBeneficio(null)}
                                                                    className="bg-gray-500 text-white px-4 py-1 rounded text-xs hover:bg-gray-600"
                                                                >
                                                                    Cancelar
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-sm"><strong>Beneficio:</strong> {entrada.beneficio}</p>
                                                        <p className="text-sm"><strong>Descripción:</strong> {entrada.descripcion}</p>
                                                        {entrada.observacion && (
                                                            <p className="text-sm"><strong>Observación:</strong> {entrada.observacion}</p>
                                                        )}
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                                        {entrada.fechaModificacion && (
                                                            <p className="text-sm text-gray-500"><strong>Fecha de modificación:</strong> {entrada.fechaModificacion}</p>
                                                        )}
                                                        <div className="flex justify-center mt-2">
                                                            <button onClick={() => handleEditBeneficio(index)} className="bg-orange-400 text-white p-2 rounded-md hover:bg-orange-500 text-xs">
                                                                Editar
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">No hay beneficios registrados aún.</p>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
                {/* Carga de Archivos */}
                <div className="flex flex-col md:flex-row justify-center mt-2 space-y-6 md:space-y-0 md:space-x-6">
                    {/* Informe Criminológico */}
                    <div className="bg-white p-4 rounded-md shadow-md w-full max-w-xs">
                        <h2 className="text-sm font-bold mb-2">Informe <br />Criminológico</h2>
                        <input type="file" className="border p-2 rounded w-full text-sm" />
                    </div>
                    {/* Centro de Evaluación y Consejo Correccional */}
                    <div className="bg-white p-4 rounded-md shadow-md w-full max-w-xs">
                        <h2 className="text-sm font-bold mb-2">Centro de evaluación (procesados) <br />Consejo correccional (condenados)</h2>
                        <input type="file" className="border p-2 rounded w-full text-sm" />
                    </div>
                </div>

                {/* Botón de Menú Principal */}
                <div className="flex justify-between mt-10">
                    <button
                        onClick={handleVolver}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menu Principal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaCriminologia;