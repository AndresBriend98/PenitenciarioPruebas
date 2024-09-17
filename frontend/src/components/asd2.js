import React, { useState, useRef, useEffect } from 'react';

const CargaVisitas = () => {
    // Estado para los datos de la nueva visita prohibida
    const [nuevaVisitaProhibida, setNuevaVisitaProhibida] = useState({
        nombre: '',
        dni: '',
        relacion: '',
        motivo: '',
        foto: ''
    });
    const handleInputChangeProhibida = (e) => {
        const { id, value } = e.target;
        setNuevaVisitaProhibida((prev) => ({
            ...prev,
            [id]: value
        }));
    };
    const handlePhotoChangeProhibida = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaVisitaProhibida((prev) => ({
                    ...prev,
                    foto: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleAddProhibida = () => {
        // Validaciones
        let errors = {};
        if (!nuevaVisitaProhibida.nombre) errors.nombre = 'Campo requerido';
        if (!nuevaVisitaProhibida.dni) errors.dni = 'Campo requerido';
        if (!nuevaVisitaProhibida.relacion) errors.relacion = 'Campo requerido';
        if (!nuevaVisitaProhibida.motivo) errors.motivo = 'Campo requerido';

        if (Object.keys(errors).length) {
            setErrorsProhibida(errors);
        } else {
            // Lógica para guardar la visita prohibida
            console.log('Visita Prohibida Agregada:', nuevaVisitaProhibida);
            // Limpiar formulario
            setNuevaVisitaProhibida({
                nombre: '',
                dni: '',
                relacion: '',
                motivo: '',
                foto: ''
            });
            setErrorsProhibida({});
        }
    };
    // Estado para los datos de la nueva visita sancionada
    const [nuevaVisitaSancionada, setNuevaVisitaSancionada] = useState({
        nombre: '',
        dni: '',
        relacion: '',
        motivo: '',
        foto: ''
    });

    // Estado para los errores en el formulario de visita sancionada
    const [errorsSancionada, setErrorsSancionada] = useState({});

    // Referencia para el input de archivo de foto en visita sancionada
    const photoInputRefSancionada = useRef(null);
    const handleInputChangeSancionada = (e) => {
        const { id, value } = e.target;
        setNuevaVisitaSancionada((prev) => ({
            ...prev,
            [id]: value
        }));
    };
    const handlePhotoChangeSancionada = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaVisitaSancionada((prev) => ({
                    ...prev,
                    foto: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    const handleAddSancionada = () => {
        // Validaciones
        let errors = {};
        if (!nuevaVisitaSancionada.nombre) errors.nombre = 'Campo requerido';
        if (!nuevaVisitaSancionada.dni) errors.dni = 'Campo requerido';
        if (!nuevaVisitaSancionada.relacion) errors.relacion = 'Campo requerido';
        if (!nuevaVisitaSancionada.motivo) errors.motivo = 'Campo requerido';

        if (Object.keys(errors).length) {
            setErrorsSancionada(errors);
        } else {
            // Lógica para guardar la visita sancionada
            console.log('Visita Sancionada Agregada:', nuevaVisitaSancionada);
            // Limpiar formulario
            setNuevaVisitaSancionada({
                nombre: '',
                dni: '',
                relacion: '',
                motivo: '',
                foto: ''
            });
            setErrorsSancionada({});
        }
    };

    // Estado para los errores en el formulario de visita prohibida
    const [errorsProhibida, setErrorsProhibida] = useState({});

    // Referencia para el input de archivo de foto en visita prohibida
    const photoInputRefProhibida = useRef(null);

    const [historialVisitas, setHistorialVisitas] = useState([]);
    const [fileInputRefs, setFileInputRefs] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [comportamientoObservacion, setComportamientoObservacion] = useState({ tipo: '', texto: '', fechaCarga: '' });
    const [showComportamientoObservacionModal, setShowComportamientoObservacionModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');

    // Función para manejar los cambios en el formulario de visita prohibida
    const handleInputChangeVisitaProhibida = (e) => {
        // Implementación
    };

    // Función para añadir una nueva visita prohibida
    const handleAddVisitaProhibida = () => {
        // Implementación
    };

    // Estado para el historial de visitas prohibidas
    const [historialVisitasProhibidas, setHistorialVisitasProhibidas] = useState([]);
    // Función para manejar los cambios en el formulario de visita sancionada
    const handleInputChangeVisitaSancionada = (e) => {
        // Implementación
    };

    // Función para añadir una nueva visita sancionada
    const handleAddVisitaSancionada = () => {
        // Implementación
    };

    // Estado para el historial de visitas sancionadas
    const [historialVisitasSancionadas, setHistorialVisitasSancionadas] = useState([]);

    const photoInputRef = useRef(null);

    useEffect(() => {
        setFileInputRefs(historialVisitas.map(() => React.createRef()));
    }, [historialVisitas]);

    const handleUploadPhoto = (index) => {
        const file = fileInputRefs[index].current.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedHistorial = [...historialVisitas];
                updatedHistorial[index] = {
                    ...updatedHistorial[index],
                    foto: reader.result,
                };
                setHistorialVisitas(updatedHistorial);
            };
            reader.readAsDataURL(file);
        }
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaVisita((prev) => ({
                    ...prev,
                    foto: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveComportamientoObservacion = () => {
        const updatedHistorial = historialVisitas.map((item) =>
            item.id === selectedItemId
                ? {
                    ...item,
                    [comportamientoObservacion.tipo]: comportamientoObservacion.texto,
                    [`fecha${comportamientoObservacion.tipo.charAt(0).toUpperCase() + comportamientoObservacion.tipo.slice(1)}`]: comportamientoObservacion.fechaCarga,
                }
                : item
        );
        setHistorialVisitas(updatedHistorial);
        setShowComportamientoObservacionModal(false);
    };

    const handleViewPhoto = (photoUrl) => {
        setModalPhoto(photoUrl);
        setShowModal(true);
    };

    useEffect(() => {
        setFileInputRefs(historialVisitas.map(() => React.createRef()));
    }, [historialVisitas]);

    const [showAddModal, setShowAddModal] = useState(false);
    const [addType, setAddType] = useState(null); // 'comportamiento' o 'observacion'
    const [newData, setNewData] = useState('');


    const handleSaveData = () => {
        if (editIndex !== null) {
            // Actualizar la entrada existente en el historial
            const updatedHistorial = historialVisitas.map((item, index) => {
                if (index === editIndex) {
                    return {
                        ...item,
                        [addType]: newData,
                        fechaCarga: `${new Date().toLocaleString()} (${addType})`
                    };
                }
                return item;
            });
            setHistorialVisitas(updatedHistorial);
        } else {
            // Agregar una nueva entrada al historial
            const newHistorialItem = {
                comportamiento: addType === 'comportamiento' ? newData : '',
                observacion: addType === 'observacion' ? newData : '',
                fechaCarga: `${new Date().toLocaleString()} (${addType})`,
                // Otros campos según sea necesario
            };
            setHistorialVisitas([...historialVisitas, newHistorialItem]);
        }

        setNewData('');
        setShowAddModal(false);
    };


    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPhoto(null); // Limpiar la foto seleccionada al cerrar el modal
    };

    const [nuevaVisita, setNuevaVisita] = useState({
        foto: null,
        acreditado: false,
        autorizado: false,
        nombre: '',
        dni: '',
        relacion: '',
        tipoVisita: '',
        motivoVisita: '',
        fechaVisita: '',
        horaVisita: '',
        comportamiento: '',
        observacion: ''
    });
    const [editIndex, setEditIndex] = useState(null);
    const [errors, setErrors] = useState({});

    const handleInputChangeNuevaVisita = (e) => {
        const { id, value, type, checked } = e.target;
        setNuevaVisita(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };

    const validateFields = () => {
        const requiredFields = ['nombre', 'dni', 'relacion', 'tipoVisita', 'motivoVisita', 'fechaVisita', 'horaVisita'];
        const newErrors = {};

        requiredFields.forEach(field => {
            if (!nuevaVisita[field]) {
                newErrors[field] = 'Este campo es obligatorio';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddVisita = () => {
        if (!validateFields()) {
            return;
        }
        if (editIndex !== null) {
            // Edit an existing visita
            const updatedHistorial = [...historialVisitas];
            updatedHistorial[editIndex] = nuevaVisita;
            setHistorialVisitas(updatedHistorial);
            setEditIndex(null);
        } else {
            // Add a new visita
            setHistorialVisitas(prev => [...prev, { ...nuevaVisita, fechaCarga: new Date().toLocaleString() }]);
        }
        // Reset form
        setNuevaVisita({
            foto: '',
            acreditado: false,
            autorizado: false,
            nombre: '',
            dni: '',
            relacion: '',
            tipoVisita: '',
            motivoVisita: '',
            fechaVisita: '',
            horaVisita: '',
            comportamiento: '',
            observacion: ''
        });
        setErrors({});
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga de Visitas</h1>
                <div className="space-y-4">
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-32 h-32 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                {nuevaVisita.foto ? (
                                    <img src={nuevaVisita.foto} alt="Foto Visita" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white">Foto</span>
                                )}
                            </div>
                            <button
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => photoInputRef.current.click()}
                            >
                                +
                            </button>
                            <input
                                type="file"
                                ref={photoInputRef}
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>
                {/* Checkboxes de Acreditado y Autorizado */}
                <div className="flex flex-col sm:flex-row sm:gap-4 justify-center">
                    <div className="flex items-center bg-white p-4 rounded-md shadow-md mb-2 sm:mb-0 sm:w-auto">
                        <input
                            type="checkbox"
                            id="acreditado"
                            checked={nuevaVisita.acreditado}
                            onChange={handleInputChangeNuevaVisita}
                            className="mr-2"
                        />
                        <label htmlFor="acreditado" className="text-sm font-semibold">Acreditado</label>
                    </div>
                    <div className="flex items-center bg-white p-4 rounded-md shadow-md mb-2 sm:mb-0 sm:w-auto">
                        <input
                            type="checkbox"
                            id="autorizado"
                            checked={nuevaVisita.autorizado}
                            onChange={handleInputChangeNuevaVisita}
                            className="mr-2"
                        />
                        <label htmlFor="autorizado" className="text-sm font-semibold">Autorizado</label>
                    </div>
                </div>

            </div>
            {/* Campos de la Visita */}
            <div className="bg-white p-6 rounded-md shadow-md">
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                    <div className="flex-grow">
                        <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                        <input
                            placeholder='Ingresar nombre y apellido'
                            type="text"
                            id="nombre"
                            value={nuevaVisita.nombre}
                            onChange={handleInputChangeNuevaVisita}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="dni" className="block text-sm font-semibold mb-1">DNI</label>
                        <input
                            placeholder='Ingresar DNI'
                            type="text"
                            id="dni"
                            value={nuevaVisita.dni}
                            onChange={handleInputChangeNuevaVisita}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                    <div className="flex-grow">
                        <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el interno</label>
                        <input
                            placeholder='Ingresar relación con el interno'
                            type="text"
                            id="relacion"
                            value={nuevaVisita.relacion}
                            onChange={handleInputChangeNuevaVisita}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.relacion ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.relacion && <p className="text-red-500 text-sm mt-1">{errors.relacion}</p>}
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="tipoVisita" className="block text-sm font-semibold mb-1">Tipo de Visita</label>
                        <input
                            placeholder='Ingresar tipo de visita'
                            type="text"
                            id="tipoVisita"
                            value={nuevaVisita.tipoVisita}
                            onChange={handleInputChangeNuevaVisita}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.tipoVisita ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.tipoVisita && <p className="text-red-500 text-sm mt-1">{errors.tipoVisita}</p>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                    <div className="flex-grow">
                        <label htmlFor="motivoVisita" className="block text-sm font-semibold mb-1">Motivo de la Visita</label>
                        <input
                            placeholder='Ingresar motivo de la visita'
                            type="text"
                            id="motivoVisita"
                            value={nuevaVisita.motivoVisita}
                            onChange={handleInputChangeNuevaVisita}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.motivoVisita ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.motivoVisita && <p className="text-red-500 text-sm mt-1">{errors.motivoVisita}</p>}
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="fechaVisita" className="block text-sm font-semibold mb-1">Fecha de la Visita</label>
                        <input
                            placeholder='Ingresar fecha de la visita'
                            type="date"
                            id="fechaVisita"
                            value={nuevaVisita.fechaVisita}
                            onChange={handleInputChangeNuevaVisita}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fechaVisita ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.fechaVisita && <p className="text-red-500 text-sm mt-1">{errors.fechaVisita}</p>}
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="horaVisita" className="block text-sm font-semibold mb-1">Hora de la Visita</label>
                        <input
                            placeholder='Ingresar hora de la visita'
                            type="time"
                            id="horaVisita"
                            value={nuevaVisita.horaVisita}
                            onChange={handleInputChangeNuevaVisita}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.horaVisita ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.horaVisita && <p className="text-red-500 text-sm mt-1">{errors.horaVisita}</p>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                    <div className="flex-grow">
                        <label htmlFor="comportamiento" className="block text-sm font-semibold mb-1">Comportamiento</label>
                        <input
                            placeholder='Ingresar comportamiento'
                            type="text"
                            id="comportamiento"
                            value={nuevaVisita.comportamiento}
                            onChange={handleInputChangeNuevaVisita}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div className="flex-grow">
                        <label htmlFor="observacion" className="block text-sm font-semibold mb-1">Observación</label>
                        <input
                            placeholder='Ingresar observación'
                            type="text"
                            id="observacion"
                            value={nuevaVisita.observacion}
                            onChange={handleInputChangeNuevaVisita}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                    <button
                        onClick={handleAddVisita}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                    >
                        Cargar
                    </button>
                </div>
                {/* Sección del Historial */}
                <div className="bg-white p-4 rounded-md shadow-md mt-6">
                    <h3 className="text-sm font-bold">Historial de Carga</h3>
                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {historialVisitas.length > 0 ? (
                            <ul className="mt-2">
                                {historialVisitas.map((item, index) => {
                                    const inputRef = fileInputRefs[index];

                                    return (
                                        <li key={index} className="border border-gray-300 p-2 mb-2 rounded bg-white shadow-sm">
                                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                                <div className="flex-grow">
                                                    <p className='text-sm'><strong>Nombre/s y Apellido/s:</strong> {item.nombre}</p>
                                                    <p className='text-sm'><strong>Relación con el interno:</strong> {item.relacion}</p>
                                                    <p className='text-sm'><strong>DNI:</strong> {item.dni}</p>
                                                    <p className='text-sm'><strong>Tipo de Visita:</strong> {item.tipoVisita}</p>
                                                    <p className='text-sm'><strong>Motivo de la Visita:</strong> {item.motivoVisita}</p>
                                                    <p className='text-sm'><strong>Fecha de la Visita:</strong> {item.fechaVisita}</p>
                                                    <p className='text-sm'><strong>Hora de la Visita:</strong> {item.horaVisita}</p>
                                                    {item.comportamiento && (
                                                        <p className='text-sm'>
                                                            <strong>Comportamiento:</strong> {item.comportamiento}
                                                            {item.fechaComportamiento && (
                                                                <span className="text-gray-500"> Fecha de carga: {item.fechaComportamiento}</span>
                                                            )}
                                                        </p>
                                                    )}
                                                    {item.observacion && (
                                                        <p className='text-sm'>
                                                            <strong>Observación:</strong> {item.observacion}
                                                            {item.fechaObservacion && (
                                                                <span className="text-gray-500"> Fecha de carga: {item.fechaObservacion}</span>
                                                            )}
                                                        </p>
                                                    )}
                                                    <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedItemId(item.id);
                                                            setComportamientoObservacion({ tipo: 'comportamiento', texto: item.comportamiento || '', fechaCarga: new Date().toLocaleString() });
                                                            setIsEditing(!!item.comportamiento);
                                                            setShowComportamientoObservacionModal(true);
                                                        }}
                                                        className="mt-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                    >
                                                        {item.comportamiento ? 'Editar comportamiento' : 'Agregar comportamiento'}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedItemId(item.id);
                                                            setComportamientoObservacion({ tipo: 'observacion', texto: item.observacion || '', fechaCarga: new Date().toLocaleString() });
                                                            setIsEditing(!!item.observacion);
                                                            setShowComportamientoObservacionModal(true);
                                                        }}
                                                        className="mt-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                    >
                                                        {item.observacion ? 'Editar observación' : 'Agregar observación'}
                                                    </button>
                                                </div>
                                                <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center">
                                                    {item.foto ? (
                                                        <div className="w-16 h-16 bg-gray-500 rounded-full overflow-hidden">
                                                            <img src={item.foto} alt="Foto Visita" className="w-full h-full object-cover" />
                                                        </div>
                                                    ) : (
                                                        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                                                            <span className="text-white">Sin foto</span>
                                                        </div>
                                                    )}
                                                    <button
                                                        className="mt-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                        onClick={() => item.foto ? handleViewPhoto(item.foto) : inputRef.current.click()}
                                                    >
                                                        {item.foto ? 'Ver' : 'Subir foto'}
                                                    </button>
                                                    <input
                                                        type="file"
                                                        ref={inputRef}
                                                        accept="image/*"
                                                        onChange={() => handleUploadPhoto(index)}
                                                        className="hidden"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 text-center">No hay visitas registradas aún.</p>
                        )}
                    </div>
                </div>

                {/* Modal para ver la imagen en grande */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-md shadow-lg relative max-w-lg w-full">
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                X
                            </button>
                            <img src={modalPhoto} alt="Foto Grande" className="w-full h-auto object-contain" />
                        </div>
                    </div>
                )}

                {/* Modal para comportamiento/observación */}
                {showComportamientoObservacionModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-md w-80">
                            <h2 className="text-lg font-bold mb-4">{isEditing ? 'Editar' : 'Agregar'} {comportamientoObservacion.tipo.charAt(0).toUpperCase() + comportamientoObservacion.tipo.slice(1)}</h2>
                            <textarea
                                value={comportamientoObservacion.texto}
                                onChange={(e) => setComportamientoObservacion({ ...comportamientoObservacion, texto: e.target.value })}
                                className="w-full h-32 border border-gray-300 p-2 rounded-md mb-4"
                            />
                            <button
                                onClick={handleSaveComportamientoObservacion}
                                className="bg-blue-500 text-white p-2 rounded-full mr-2"
                            >
                                Guardar
                            </button>
                            <button
                                onClick={() => setShowComportamientoObservacionModal(false)}
                                className="bg-gray-500 text-white p-2 rounded-full"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="flex space-x-4">
                {/* Carga Visitas Prohibidas */}
                <div className="flex-1 bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-lg font-bold mb-4">Carga Visitas Prohibidas</h2>
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-32 h-32 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                {nuevaVisitaProhibida.foto ? (
                                    <img src={nuevaVisitaProhibida.foto} alt="Foto Visita Prohibida" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white">Foto</span>
                                )}
                            </div>
                            <button
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => photoInputRefProhibida.current.click()}
                            >
                                +
                            </button>
                            <input
                                type="file"
                                ref={photoInputRefProhibida}
                                accept="image/*"
                                onChange={handlePhotoChangeProhibida}
                                className="hidden"
                            />
                        </div>
                    </div>
                    {/* Otros campos del formulario */}
                    {/* Nombre, DNI, Relación, Motivo */}
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                        <input
                            placeholder="Ingresar nombre y apellido"
                            type="text"
                            id="nombre"
                            value={nuevaVisitaProhibida.nombre}
                            onChange={handleInputChangeProhibida}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errorsProhibida.nombre ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errorsProhibida.nombre && <p className="text-red-500 text-sm mt-1">{errorsProhibida.nombre}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dni" className="block text-sm font-semibold mb-1">DNI</label>
                        <input
                            placeholder="Ingresar DNI"
                            type="text"
                            id="dni"
                            value={nuevaVisitaProhibida.dni}
                            onChange={handleInputChangeProhibida}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errorsProhibida.dni ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errorsProhibida.dni && <p className="text-red-500 text-sm mt-1">{errorsProhibida.dni}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el interno</label>
                        <input
                            placeholder="Ingresar relación con el interno"
                            type="text"
                            id="relacion"
                            value={nuevaVisitaProhibida.relacion}
                            onChange={handleInputChangeProhibida}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errorsProhibida.relacion ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errorsProhibida.relacion && <p className="text-red-500 text-sm mt-1">{errorsProhibida.relacion}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="motivo" className="block text-sm font-semibold mb-1">Motivo de la Prohibición</label>
                        <input
                            placeholder="Ingresar motivo de la prohibición"
                            type="text"
                            id="motivo"
                            value={nuevaVisitaProhibida.motivo}
                            onChange={handleInputChangeProhibida}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errorsProhibida.motivo ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errorsProhibida.motivo && <p className="text-red-500 text-sm mt-1">{errorsProhibida.motivo}</p>}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleAddProhibida}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>


                </div>

                <div className="flex-1 bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-lg font-bold mb-4">Carga Visitas Sancionadas</h2>
                    {/* Formulario para Cargar Visita Sancionada */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-32 h-32 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                {nuevaVisitaSancionada.foto ? (
                                    <img src={nuevaVisitaSancionada.foto} alt="Foto Visita Sancionada" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white">Foto</span>
                                )}
                            </div>
                            <button
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => photoInputRefSancionada.current.click()}
                            >
                                +
                            </button>
                            <input
                                type="file"
                                ref={photoInputRefSancionada}
                                accept="image/*"
                                onChange={handlePhotoChangeSancionada}
                                className="hidden"
                            />
                        </div>
                    </div>
                    {/* Otros campos del formulario */}
                    <div className="mb-4">
                        <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                        <input
                            placeholder="Ingresar nombre y apellido"
                            type="text"
                            id="nombre"
                            value={nuevaVisitaSancionada.nombre}
                            onChange={handleInputChangeSancionada}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errorsSancionada.nombre ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errorsSancionada.nombre && <p className="text-red-500 text-sm mt-1">{errorsSancionada.nombre}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="dni" className="block text-sm font-semibold mb-1">DNI</label>
                        <input
                            placeholder="Ingresar DNI"
                            type="text"
                            id="dni"
                            value={nuevaVisitaSancionada.dni}
                            onChange={handleInputChangeSancionada}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errorsSancionada.dni ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errorsSancionada.dni && <p className="text-red-500 text-sm mt-1">{errorsSancionada.dni}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el interno</label>
                        <input
                            placeholder="Ingresar relación con el interno"
                            type="text"
                            id="relacion"
                            value={nuevaVisitaSancionada.relacion}
                            onChange={handleInputChangeSancionada}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errorsSancionada.relacion ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errorsSancionada.relacion && <p className="text-red-500 text-sm mt-1">{errorsSancionada.relacion}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="motivo" className="block text-sm font-semibold mb-1">Motivo de la Sanción</label>
                        <input
                            placeholder="Ingresar motivo de la sanción"
                            type="text"
                            id="motivo"
                            value={nuevaVisitaSancionada.motivo}
                            onChange={handleInputChangeSancionada}
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${errorsSancionada.motivo ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errorsSancionada.motivo && <p className="text-red-500 text-sm mt-1">{errorsSancionada.motivo}</p>}
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleAddSancionada}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>



                </div>

            </div>

        </div>
    );
};

export default CargaVisitas;