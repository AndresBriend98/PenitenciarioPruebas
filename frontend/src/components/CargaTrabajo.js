import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaTrabajo = () => {
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

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // 'progreso' o 'observacion'
    const [selectedRegistroIndex, setSelectedRegistroIndex] = useState(null);
    const [inputValue, setInputValue] = useState(''); // Valor del textarea del modal
    const [modalEntries, setModalEntries] = useState([]);

    const handleOpenModal = (type, index) => {
        setModalType(type); // 'progreso' u 'observacion'
        setSelectedRegistroIndex(index); // índice del registro seleccionado

        // Inicializa modalEntries basado en las entradas existentes
        const entries = historial[index][type] || [];
        setModalEntries(entries);

        setInputValue(''); // Asegúrate de que inputValue esté vacío
        setModalOpen(true); // abre el modal
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
    const [selectedArea, setSelectedArea] = useState('Trabajo');;
    const [showModal, setShowModal] = useState(false);

    // Estado para el historial de cargas
    const [historial, setHistorial] = useState([]);

    const [formData, setFormData] = useState({
        tipoCapacitacion: '',
        diasLaborales: '',
        lugarCapacitacion: '',
        horaInicio: '', // Añadido
        horaFin: '', // Añadido
        remuneracion: ''
    });


    const [errors, setErrors] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleVolver = () => {
        navigate('/general');
    };

    const handleAgregar = () => {
        const { tipoCapacitacion, diasLaborales, lugarCapacitacion, horaInicio, horaFin, remuneracion } = formData;
        const newErrors = {};

        if (!tipoCapacitacion) newErrors.tipoCapacitacion = 'Campo requerido';
        if (!diasLaborales) newErrors.diasLaborales = 'Campo requerido';
        if (!lugarCapacitacion) newErrors.lugarCapacitacion = 'Campo requerido';
        if (!horaInicio) newErrors.horaInicio = 'Campo requerido';
        if (!horaFin) newErrors.horaFin = 'Campo requerido';
        if (!remuneracion) newErrors.remuneracion = 'Campo requerido';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Obtener la fecha y hora actual
        const fechaCarga = new Date().toLocaleString();

        // Crear un nuevo registro con fechaCarga
        const nuevoRegistro = {
            tipoCapacitacion,
            diasLaborales,
            lugarCapacitacion,
            horaInicio,
            horaFin,
            remuneracion,
            fechaCarga // Añadido
        };

        // Actualizar el historial con el nuevo registro
        setHistorial([...historial, nuevoRegistro]);

        // Limpiar el formulario
        setFormData({
            tipoCapacitacion: '',
            diasLaborales: '',
            lugarCapacitacion: '',
            horaInicio: '',
            horaFin: '',
            remuneracion: ''
        });
        setErrors({});
    };

    const handleSave = () => {
        if (inputValue.trim() === '') {
            alert('No se puede agregar un progreso u observación vacío.');
            return;
        }

        const fechaActual = new Date().toLocaleString(); // Obtener la fecha y hora actuales

        // Crear un nuevo objeto para progreso u observación
        const nuevoRegistro = {
            fecha: fechaActual,
            texto: inputValue
        };

        const updatedHistorial = [...historial];
        if (modalType === 'progreso') {
            updatedHistorial[selectedRegistroIndex].progreso = [...modalEntries, nuevoRegistro];
        } else if (modalType === 'observacion') {
            updatedHistorial[selectedRegistroIndex].observacion = [...modalEntries, nuevoRegistro];
        }

        // Actualiza el historial y cierra el modal
        setHistorial(updatedHistorial);
        setModalOpen(false);
        setModalEntries([]); // Limpiar las entradas del modal
        setInputValue(''); // Limpiar el valor del input
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
            setSelectedArea('Trabajo');
        }
    }, [selectedArea]);

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            {/* Información del usuario, foto y checkboxes */}
            <div className="bg-gray-300 p-4 rounded-md flex flex-col md:flex-row mb-4 items-start">
                {/* Foto y datos del usuario */}
                <div className="flex flex-col items-center md:flex-row md:items-start flex-grow">
                    {/* Foto y botón de carga */}
                    <div className="relative flex-shrink-0 flex flex-col items-center mt-4 md:mr-4">
                        <div className="w-48 h-48 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden mb-2">
                            <span className="text-center text-white">Foto</span>
                        </div>
                    </div>
                    {/* Datos del usuario */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-bold text-center md:text-left">{user.name}</h2>
                        <p className="mt-1 text-sm"><strong>Tipo de interno:</strong> {user.typeofintern}</p>
                        <p className="mt-1 text-sm"><strong>Alias:</strong> {user.alias}</p>
                        <p className="mt-1 text-sm"><strong>Unidad:</strong> {user.unit}</p>
                        <p className="mt-1 text-sm"><strong>Legajo:</strong> {user.fileNumber}</p>
                        <p className="mt-1 text-sm"><strong>Tipo de documento:</strong> {user.typedoc}</p>
                        <p className="mt-1 text-sm"><strong>DNI:</strong> {user.dni}</p>
                        <p className="mt-1 text-sm"><strong>Delito:</strong> {user.crime}</p>
                    </div>
                </div>
                {/* Checkboxes alineados a la izquierda */}
                <div className="flex flex-col space-y-2 mt-4 md:mt-0">
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
                    <div className="flex flex-col space-y-2 mt-4">
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
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga Trabajo</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Formulario de entrada de datos */}
                    <div className="flex flex-col w-full md:w-1/2 p-4 bg-white-100 shadow-md rounded-md">
                        <label className="font-medium text-sm">Tipo de Capacitación</label>
                        <input
                            type="text"
                            id="tipoCapacitacion"
                            value={formData.tipoCapacitacion}
                            onChange={handleInputChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.tipoCapacitacion ? 'border-red-500' : ''}`}
                            placeholder='Ingrese el tipo de capacitación'
                        />
                        {errors.tipoCapacitacion && <p className="text-red-500 text-xs mb-2">{errors.tipoCapacitacion}</p>}

                        <label className="font-medium text-sm mt-3">Días Laborales</label>
                        <input
                            type="int"
                            id="diasLaborales"
                            value={formData.diasLaborales}
                            onChange={handleInputChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.diasLaborales ? 'border-red-500' : ''}`}
                            placeholder='Ingrese los días laborales'
                        />
                        {errors.diasLaborales && <p className="text-red-500 text-xs mb-2">{errors.diasLaborales}</p>}

                        <label className="font-medium text-sm mt-3">Lugar de Capacitación</label>
                        <input
                            type="text"
                            id="lugarCapacitacion"
                            value={formData.lugarCapacitacion}
                            onChange={handleInputChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.lugarCapacitacion ? 'border-red-500' : ''}`}
                            placeholder='Ingrese el lugar de capacitación'
                        />
                        {errors.lugarCapacitacion && <p className="text-red-500 text-xs mb-2">{errors.lugarCapacitacion}</p>}

                        <div className="flex flex-col">
                            <label className="font-medium text-sm mt-3">Hora de Inicio</label>
                            <input
                                type="time"
                                id="horaInicio"
                                value={formData.horaInicio}
                                onChange={handleInputChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.horaInicio ? 'border-red-500' : ''}`}
                            />
                            {errors.horaInicio && <p className="text-red-500 text-xs mb-2">{errors.horaInicio}</p>}

                            <label className="font-medium text-sm mt-3">Hora de Fin</label>
                            <input
                                type="time"
                                id="horaFin"
                                value={formData.horaFin}
                                onChange={handleInputChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.horaFin ? 'border-red-500' : ''}`}
                            />
                            {errors.horaFin && <p className="text-red-500 text-xs mb-2">{errors.horaFin}</p>}
                        </div>

                        <label className="font-medium text-sm mt-3">Remuneración</label>
                        <input
                            type="number"
                            id="remuneracion"
                            value={formData.remuneracion}
                            onChange={handleInputChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.remuneracion ? 'border-red-500' : ''}`}
                            placeholder='Ingrese la remuneración'
                        />
                        {errors.remuneracion && <p className="text-red-500 text-xs mb-2">{errors.remuneracion}</p>}

                        <div className="flex justify-center mt-5">
                            <button
                                onClick={handleAgregar}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                    </div>
                    {/* Mostrar historial de cargas */}
                    <div className="flex flex-col w-full md:w-1/2 p-4 bg-white rounded-md shadow-md">
                        <h2 className="text-sm font-bold mt-4">Historial de Carga</h2>
                        <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-96 overflow-y-auto"> {/* Limita la altura y agrega scroll */}
                            {historial.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay registros de trabajo registrados aún.
                                </p>
                            ) : (
                                <ul className="space-y-12">
                                    {historial.map((registro, index) => (
                                        <li key={index} className="p-2 bg-gray-100 rounded-md">
                                            <p className='text-sm'><strong>Tipo de Capacitación:</strong> {registro.tipoCapacitacion}</p>
                                            <p className='text-sm'><strong>Días Laborales:</strong> {registro.diasLaborales}</p>
                                            <p className='text-sm'><strong>Lugar de Capacitación:</strong> {registro.lugarCapacitacion}</p>
                                            <p className='text-sm'><strong>Hora de Inicio:</strong> {registro.horaInicio}</p>
                                            <p className='text-sm'><strong>Hora de Fin:</strong> {registro.horaFin}</p>
                                            <p className='text-sm'><strong>Remuneración:</strong> {registro.remuneracion}</p>
                                            <div><p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {registro.fechaCarga}</p></div>

                                            {/* Renderizar progresos */}
                                            {registro.progreso && registro.progreso.length > 0 && (
                                                <div className="mt-3">
                                                    <h4 className="font-bold text-sm mb-2">Progreso:</h4>
                                                    {registro.progreso.map((entry, i) => (
                                                        <div key={`progreso-${i}`} className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-100">
                                                            <p className='text-sm'><strong className='text-sm'>Fecha:</strong> {entry.fecha}</p>
                                                            <p className='text-sm'><strong>Descripción:</strong> {entry.texto}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Renderizar observaciones */}
                                            {registro.observacion && registro.observacion.length > 0 && (
                                                <div className="mt-3">
                                                    <h4 className="font-bold text-sm mb-2">Observación:</h4>
                                                    {registro.observacion.map((entry, i) => (
                                                        <div key={`observacion-${i}`} className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-100">
                                                            <p className='text-sm'><strong>Fecha:</strong> {entry.fecha}</p>
                                                            <p className='text-sm'><strong>Descripción:</strong> {entry.texto}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex justify-end mt-4"> {/* Cambiado para alinear a la derecha */}
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => handleOpenModal('progreso', index)}
                                                        className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 text-xs"
                                                    >
                                                        Progreso
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenModal('observacion', index)}
                                                        className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 text-xs"
                                                    >
                                                        Observación
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                </div>
                {modalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="bg-white p-6 rounded-md w-full max-w-lg">
                            <h2 className="text-xl mb-4 font-bold">
                                {modalType === 'progreso' ? 'Progreso' : 'Observación'}
                            </h2>
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm resize-none"
                                rows="4"
                                placeholder='Ingrese aquí el progreso/observación...'
                            />
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={handleSave}
                                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 text-xs"
                                    disabled={!inputValue.trim()} // Deshabilitar si textarea está vacío
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 text-xs"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* Botón de Volver */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handleVolver}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menu principal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaTrabajo;
