import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HistorialVisitasProhibidas from './HistorialVisitasProhibidas'; // Asegúrate de usar la ruta correcta
import HistorialVisitasSancionadas from './HistorialVisitasSacionadas'; // Asegúrate de usar la ruta correcta
import Header from './Header'; // Asegúrate de usar la ruta correcta

const CargaVisitas = () => {
    const navigate = useNavigate();
    const [historialVisitas, setHistorialVisitas] = useState([]);
    const [fileInputRefs, setFileInputRefs] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [comportamientoObservacion, setComportamientoObservacion] = useState({ tipo: '', texto: '', fechaCarga: '' });
    const [showComportamientoObservacionModal, setShowComportamientoObservacionModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');

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

    const handleVolver = () => {
        navigate('/general');
    };

    const handleGenerarInforme = () => {
    };


    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga de Visitas</h1>

                <div className="flex flex-col items-center mb-3">
                    <div className="relative flex justify-center items-center">
                        <div className="relative w-28 h-28 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                            {nuevaVisita.foto ? (
                                <img src={nuevaVisita.foto} alt="Foto Visita" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white text-xs">Foto</span>
                            )}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            className="hidden"
                            ref={photoInputRef}
                        />
                        <label
                            htmlFor="fotoInput"
                            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                            onClick={() => photoInputRef.current.click()}
                        >
                            +
                        </label>
                    </div>
                </div>

                {/* Checkboxes de Acreditado y Autorizado */}
                <div className="flex flex-col sm:flex-row sm:gap-4 justify-center mb-4">
                    <div className="flex items-center bg-white p-2 rounded-md shadow-sm w-full sm:w-auto">
                        <input
                            type="checkbox"
                            id="acreditado"
                            checked={nuevaVisita.acreditado}
                            onChange={handleInputChangeNuevaVisita}
                            className="mr-2"
                        />
                        <label htmlFor="acreditado" className="text-sm font-semibold">Acreditado</label>
                    </div>
                    <div className="flex items-center bg-white p-2 rounded-md shadow-sm w-full sm:w-auto">
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

                {/* Campos de la Visita */}
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
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
                        <div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el interno</label>
                            <select
                                id="relacion"
                                value={nuevaVisita.relacion}
                                onChange={handleInputChangeNuevaVisita}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.relacion ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="" disabled>Seleccionar relación</option>
                                {/* Opciones relacionadas con el ámbito familiar */}
                                <option value="Madre">Madre</option>
                                <option value="Padre">Padre</option>
                                <option value="Hermano/a">Hermano/a</option>
                                <option value="Cónyuge">Cónyuge</option>
                                <option value="Hijo/a">Hijo/a</option>
                                <option value="Tío/a">Tío/a</option>
                                <option value="Sobrino/a">Sobrino/a</option>
                                <option value="Abuelo/a">Abuelo/a</option>
                                <option value="Primo/a">Primo/a</option>
                                <option value="Pareja">Pareja</option>
                                <option value="Otro">Otro</option>
                            </select>
                            {errors.relacion && <p className="text-red-500 text-sm mt-1">{errors.relacion}</p>}
                        </div>

                        <div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
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
                        <div>
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
                        <div>
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
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
                        <div>
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
                </div>

                {/* Sección del Historial */}
                <div className="bg-white p-4 rounded-md shadow-md">
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
                                                    {/* Checkboxes */}
                                                    <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2 mb-2">
                                                        <div className="flex items-center mb-2 sm:mb-0">
                                                            <div className={`w-4 h-4 rounded-full ${item.acreditado ? 'bg-green-500' : 'bg-red-300'}`}></div>
                                                            <span className="ml-2 text-sm">Acreditado</span>
                                                        </div>
                                                        <div className="flex items-center mb-2 sm:mb-0">
                                                            <div className={`w-4 h-4 rounded-full ${item.autorizado ? 'bg-green-500' : 'bg-red-300'}`}></div>
                                                            <span className="ml-2 text-sm">Autorizado</span>
                                                        </div>
                                                    </div>
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
                                                    <p className="text-sm text-gray-500 mt-2 mb-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                                    <div className="flex space-x-2">
                                                        <div className="flex space-x-2">
                                                            <div className="flex space-x-2">
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedItemId(item.id);
                                                                        setComportamientoObservacion({ tipo: 'comportamiento', texto: item.comportamiento || '', fechaCarga: new Date().toLocaleString() });
                                                                        setIsEditing(!!item.comportamiento);
                                                                        setShowComportamientoObservacionModal(true);
                                                                    }}
                                                                    className={`p-2 rounded-full text-xs ${item.comportamiento ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-400 hover:bg-blue-500'} text-white`}
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
                                                                    className={`p-2 rounded-full text-xs ${item.observacion ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-400 hover:bg-blue-500'} text-white`}
                                                                >
                                                                    {item.observacion ? 'Editar observación' : 'Agregar observación'}
                                                                </button>
                                                            </div>

                                                        </div>

                                                    </div>

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
                                                        className="mt-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500"
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
                            <h2 className="text-lg font-bold mb-4">
                                {isEditing ? 'Editar' : 'Agregar'} {comportamientoObservacion.tipo.charAt(0).toUpperCase() + comportamientoObservacion.tipo.slice(1)}
                            </h2>
                            <textarea
                                value={comportamientoObservacion.texto}
                                onChange={(e) => setComportamientoObservacion({ ...comportamientoObservacion, texto: e.target.value })}
                                className="w-full h-32 border border-gray-300 p-2 rounded-md mb-4"
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSaveComportamientoObservacion}
                                    disabled={!comportamientoObservacion.texto.trim()}
                                    className={`bg-blue-500 text-white p-2 rounded-full mr-2 ${!comportamientoObservacion.texto.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
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
                    </div>
                )}

                {/* Contenedor principal con grid layout */}
                <div className='bg-white p-4 rounded-md shadow-md mb-4 mt-5'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <HistorialVisitasProhibidas />
                        <HistorialVisitasSancionadas />
                    </div>

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

export default CargaVisitas;