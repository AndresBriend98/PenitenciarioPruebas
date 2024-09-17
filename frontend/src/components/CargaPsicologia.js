import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaPsicologia = () => {
    const navigate = useNavigate();
    const [editIndexPsicologico, setEditIndexPsicologico] = useState(null);
    const [tituloEditadoPsicologico, setTituloEditadoPsicologico] = useState('');
    const [informeEditadoPsicologico, setInformeEditadoPsicologico] = useState('');
    const [observacionEditadaPsicologica, setObservacionEditadaPsicologica] = useState('');

    // Funciones para manejar la edición
    const handleEditPsicologico = (index) => {
        const entrada = historialPsicologico[index]; // Obtén la entrada a editar
        setEditIndexPsicologico(index);
        setTituloEditadoPsicologico(entrada.titulo);
        setInformeEditadoPsicologico(entrada.informe);
        setObservacionEditadaPsicologica(entrada.observacion || '');
    };

    const handleSaveEditPsicologico = () => {
        const updatedHistorial = [...historialPsicologico];
        updatedHistorial[editIndexPsicologico] = {
            ...updatedHistorial[editIndexPsicologico],
            titulo: tituloEditadoPsicologico,
            informe: informeEditadoPsicologico,
            observacion: observacionEditadaPsicologica,
            fechaModificacion: new Date().toLocaleString(),
        };
        setHistorialPsicologico(updatedHistorial); // Asegúrate de tener este estado definido para el historial
        setEditIndexPsicologico(null);
    };

    const handleCancelEditPsicologico = () => {
        setEditIndexPsicologico(null);
    };
    const scrollContainerRef = useRef(null);
    const [tituloInformePsicologico, setTituloInformePsicologico] = useState(''); // Campo para el título del informe psicológico
    const [informePsicologico, setInformePsicologico] = useState(''); // Campo para el informe psicológico
    const [observacionPsicologica, setObservacionPsicologica] = useState(''); // Campo para la observación psicológica
    const [historialPsicologico, setHistorialPsicologico] = useState([]); // Historial de informes psicológicos
    const [hasErrorPsicologico, setHasErrorPsicologico] = useState(false); // Estado de error para formulario psicológico

    // Función para cargar nuevo informe psicológico
    const handleCargarPsicologico = () => {
        if (informePsicologico.trim() === '' || tituloInformePsicologico.trim() === '') {
            setHasErrorPsicologico(true); // Activa el error
            return;
        }
        setHasErrorPsicologico(false); // Desactiva el error si no hay problemas

        // Agregar nueva entrada al historial psicológico
        const nuevaEntradaPsicologica = {
            titulo: tituloInformePsicologico,
            informe: informePsicologico,
            observacion: observacionPsicologica,
            fecha: new Date().toLocaleString(),
        };

        setHistorialPsicologico(prevHistorial => [...prevHistorial, nuevaEntradaPsicologica]);

        // Limpiar los campos
        setTituloInformePsicologico('');
        setInformePsicologico('');
        setObservacionPsicologica('');
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -150 : 150,
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

    const [selectedArea, setSelectedArea] = useState('Psicologia');;
    const [showModal, setShowModal] = useState(false);

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
            setSelectedArea('Psicología');
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
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <h1 className="text-2xl font-bold mb-4">Carga Psicológica</h1>

                <div className="grid grid-cols-1 gap-3 bg-white p-4 rounded-md shadow-md mb-4">
                    {/* Campo para el Título del Informe Psicológico */}
                    <div>
                        <label className="block text-sm font-bold">Título del Informe Psicológico</label>
                        <input
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${hasErrorPsicologico ? 'border-red-500' : ''}`}
                            value={tituloInformePsicologico}  // Estado para el título del informe psicológico
                            onChange={(e) => setTituloInformePsicologico(e.target.value)}
                            placeholder="Ingresar el título del informe psicológico"
                        />
                        {hasErrorPsicologico && <p className="text-red-500 text-sm mt-1">El título es obligatorio.</p>}
                    </div>

                    {/* Campo para el Informe Psicológico */}
                    <div>
                        <label className="block text-sm font-bold">Informe Psicológico</label>
                        <textarea
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${hasErrorPsicologico ? 'border-red-500' : ''}`}
                            rows="3"
                            value={informePsicologico}
                            onChange={(e) => setInformePsicologico(e.target.value)}
                            placeholder="Ingresar el informe psicológico del interno aquí"
                        ></textarea>
                        {hasErrorPsicologico && <p className="text-red-500 text-sm mt-1">El informe es obligatorio.</p>}
                    </div>

                    {/* Campo de Observaciones */}
                    <div>
                        <label className="block text-sm font-bold">Observación</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            rows="3"
                            value={observacionPsicologica}
                            onChange={(e) => setObservacionPsicologica(e.target.value)}
                            placeholder="Ingresar alguna observación psicológica del interno aquí"
                        ></textarea>
                    </div>

                    {/* Campo para Archivo Adjunto */}
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Archivo adjunto</label>
                        <input type="file" className="w-full p-2 border border-gray-300 rounded text-sm" />
                    </div>

                    {/* Botón de Cargar */}
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={handleCargarPsicologico}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>
                </div>
                {/* Historial de Informes Psicológicos */}
                <div className="bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                    <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {historialPsicologico.length > 0 ? (
                            <ul className="space-y-2">
                                {historialPsicologico.map((entrada, index) => (
                                    <li key={index} className="border-b border-gray-300 pb-2">
                                        {editIndexPsicologico === index ? (
                                            <>
                                                <div className="space-y-2">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Título:</label>
                                                        <input
                                                            className="border p-1 rounded text-sm w-full"
                                                            type="text"
                                                            value={tituloEditadoPsicologico}
                                                            onChange={(e) => setTituloEditadoPsicologico(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Informe:</label>
                                                        <input
                                                            className="border p-1 rounded text-sm w-full"
                                                            type="text"
                                                            value={informeEditadoPsicologico}
                                                            onChange={(e) => setInformeEditadoPsicologico(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Observación:</label>
                                                        <input
                                                            className="border p-1 rounded text-sm w-full"
                                                            type="text"
                                                            value={observacionEditadaPsicologica}
                                                            onChange={(e) => setObservacionEditadaPsicologica(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex justify-center space-x-2 mt-2">
                                                        <button
                                                            onClick={handleSaveEditPsicologico}
                                                            className="bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEditPsicologico}
                                                            className="bg-red-500 text-white px-4 py-1 rounded text-xs hover:bg-red-600"
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
                                                    <button onClick={() => handleEditPsicologico(index)} className="bg-orange-400 text-white p-2 rounded-md hover:bg-orange-500 text-xs">
                                                        Editar
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 text-center">No hay informes psicológicos registrados aún.</p>
                        )}
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

        </div >
    );
};

export default CargaPsicologia;
