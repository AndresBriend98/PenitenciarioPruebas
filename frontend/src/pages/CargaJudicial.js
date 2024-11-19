import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Modal from '../components/ModalChanges';

const CargaJudicial = () => {
    const [victimas, setVictimas] = useState([]);
    const [victima, setVictima] = useState({ nombres: '', dni: '', foto: null });
    const [fotoVictima, setFotoVictima] = useState(null);
    const [victimaErrors, setVictimaErrors] = useState({ nombres: '', dni: '' });
    const handleAbogadoInputChange = (e, field) => {
        const value = e.target.value;
        setAbogado((prevState) => ({
            ...prevState,
            [field]: value,
        }));
    };
    
    const [showModalFoto, setShowModalFoto] = useState(false); const [modalPhoto, setModalPhoto] = useState('');
    const handleFotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFotoVictima(reader.result);
                setVictima({ ...victima, foto: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    const validarCampos = () => {
        let errores = { nombres: '', dni: '' };
        if (!victima.nombres) {
            errores.nombres = 'El nombre es requerido';
        }
        if (!victima.dni) {
            errores.dni = 'El DNI es requerido';
        }
        setVictimaErrors(errores);
        return Object.values(errores).every((error) => error === '');
    };

    const agregarVictima = () => {
        if (validarCampos()) {
            const nuevaVictima = {
                id: Date.now(),
                ...victima,
                fechaCarga: new Date().toLocaleString(),
            };
            setVictimas((prevVictimas) => [...prevVictimas, nuevaVictima]);
            setVictima({ nombres: '', dni: '', foto: null });
            setFotoVictima(null);
        }
    };

    const handleCloseFilesModal = () => {
        setIsModalOpenFiles(false);
    };

    const verFoto = (foto) => {
        if (foto) {
            return (
                <div className="w-16 h-16 bg-gray-500 rounded-full overflow-hidden">
                    <img src={foto} alt="Foto Victima" className="w-full h-full object-cover" />
                </div>
            );
        } else {
            return (
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                    <span className="text-white">Sin foto</span>
                </div>
            );
        }
    };

    const openModal = (foto) => {
        setModalPhoto(foto);
        setShowModalFoto(true);
    };

    const handleCloseModal = () => {
        setShowModalFoto(false);
        setModalPhoto('');
    };

    const navigate = useNavigate();
    const [isModalOpenFiles, setIsModalOpenFiles] = useState(false);
    const [files, setFiles] = useState({
        resolucionFinal: null,
        fundamentoSentencia: null,
        abocamiento: null,
        computo: null,
    });
    const [fileHistorial, setFileHistorial] = useState([]);

    const fileLabels = {
        resolucionFinal: "Resolución Final",
        fundamentoSentencia: "Fundamento de la Sentencia",
        abocamiento: "Abocamiento",
        computo: "Cómputo",
    };

    const handleFileEdit = (key, e) => {
        e.preventDefault(); e.stopPropagation();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.onchange = (e) => handleFileChange(e, key, true);
        fileInput.click();
    };

    const handleFileChange = (e, key, isEdit = false) => {
        const file = e.target.files[0];
        if (file) {
            const updatedFile = {
                file,
                fileName: file.name,
                fechaCarga: isEdit ? fileHistorial.find(item => item.tipo === key)?.fechaCarga : new Date().toLocaleString(),
                fechaEdicion: isEdit ? new Date().toLocaleString() : null,
                tipo: key,
            };
            setFiles({ ...files, [key]: file });

            setFileHistorial((prev) => {
                const existingFile = prev.find(item => item.tipo === key);
                if (existingFile) {
                    return prev.map(item => (item.tipo === key ? { ...item, ...updatedFile } : item));
                } else {
                    return [...prev, updatedFile];
                }
            });
        }
    };

    const handleOpenFilesModal = () => {
        setIsModalOpenFiles(true);
    };


    const handleInputChange = (e, field) => {
        const value = e.target.value;
        const currentDate = new Date().toLocaleString();

        if (value !== initialDatosJudiciales[field]) {
            setIsDataModified(true); setHistorialCambios(prev => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    fechaCarga: prev[field]?.fechaCarga || currentDate,
                    ultimaModificacion: currentDate,
                }
            }));
        } else {
            setIsDataModified(false);
        }

        setDatosJudiciales({ ...datosJudiciales, [field]: value });
    };

    const [isModalOpen, setIsModalOpen] = useState('');
    const handleFotoHistorialChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedVictimas = [...victimas];
                updatedVictimas[index] = {
                    ...updatedVictimas[index],
                    foto: reader.result,
                };
                setVictimas(updatedVictimas);
            };
            reader.readAsDataURL(file);
        }
    };
    const [historialCambios, setHistorialCambios] = useState({});
    const [isEditable, setIsEditable] = useState(true); const [buttonText, setButtonText] = useState('Cargar'); const [isDataModified, setIsDataModified] = useState(false);
    const handleCargarActualizar = (e) => {
        const currentDate = new Date().toLocaleString();

        if (buttonText === 'Cargar') {
            const isAnyFieldFilled = Object.values(datosJudiciales).some(value => value.trim() !== '');
            if (!isAnyFieldFilled) return;
            setInitialDatosJudiciales(datosJudiciales);

            setHistorialCambios(prev => {
                const newHistorial = {};
                Object.keys(datosJudiciales).forEach(field => {
                    if (datosJudiciales[field].trim() !== '') {
                        newHistorial[field] = {
                            fechaCarga: currentDate, ultimaModificacion: currentDate,
                        };
                    }
                });
                return { ...prev, ...newHistorial };
            });

            setIsEditable(false); setButtonText('Actualizar');
        } else if (buttonText === 'Actualizar') {
            setIsEditable(true); setButtonText('Guardar Cambios'); setIsDataModified(false);
        } else if (buttonText === 'Guardar Cambios') {
            const hasChanges = Object.keys(datosJudiciales).some(key => datosJudiciales[key] !== initialDatosJudiciales[key]);
            if (!hasChanges) return;
            console.log('Datos guardados');
            setIsEditable(false); setButtonText('Actualizar'); setIsDataModified(false);
        }
    };

    const [errors, setErrors] = useState({
        nombreJuzgado: false,
        tipoJuzgado: false,
        fueroJudicial: false,
        ubicacionJuzgado: false,
        fechaInicioCausa: false,
        estadoCaso: false,
        numeroCaso: false,
        fechaResolucionFinal: false,
    });

    const [datosJudiciales, setDatosJudiciales] = useState({
        nombreJuzgado: '',
        tipoJuzgado: '',
        fueroJudicial: '',
        ubicacionJuzgado: '',
        fechaInicioCausa: '',
        estadoCaso: '',
        numeroCaso: '',
        fechaResolucionFinal: '',
        observacion: '',
    });

    const campoMapeadoDatosJudiciales = {
        nombreJuzgado: 'Nombre del Juzgado',
        tipoJuzgado: 'Tipo de Juzgado',
        fueroJudicial: 'Fuero Judicial',
        ubicacionJuzgado: 'Ubicación del Juzgado',
        fechaInicioCausa: 'Fecha de Inicio de Causa',
        estadoCaso: 'Estado del Caso',
        numeroCaso: 'Número de Caso',
        fechaResolucionFinal: 'Fecha de Resolución Final',
        observacion: 'Observaciones',
    }

    const [initialDatosJudiciales, setInitialDatosJudiciales] = useState({
        nombreJuzgado: '',
        tipoJuzgado: '',
        fueroJudicial: '',
        ubicacionJuzgado: '',
        fechaInicioCausa: '',
        estadoCaso: '',
        numeroCaso: '',
        fechaResolucionFinal: '',
        observacion: '',
    });

    const [abogados, setAbogados] = useState([]);

    const handleAgregarAbogadoData = (event) => {
        event.preventDefault();

        if (!validateAbogadoFields()) {
            return;
        }

        const fechaCarga = new Date().toLocaleString();
        setAbogados([...abogados, { ...abogado, fechaCarga }]);
        setAbogado({ nombreApellido: '', matricula: '', poderes: '' });
        setAbogadoErrors({ nombreApellido: false, matricula: false, poderes: false });
    };

    const [abogado, setAbogado] = useState({
        nombreApellido: '',
        matricula: '',
        poderes: '',
    });

    const validateAbogadoFields = () => {
        const newErrors = {};
        newErrors.nombreApellido = !abogado.nombreApellido.trim();
        newErrors.matricula = !abogado.matricula.trim();
        newErrors.poderes = !abogado.poderes.trim();
        setAbogadoErrors(newErrors);

        return !Object.values(newErrors).includes(true);
    };

    const [abogadoErrors, setAbogadoErrors] = useState({
        nombreApellido: false,
        matricula: false,
        poderes: false,
    });

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-6 rounded-md shadow-md flex flex-col">
                <div className="mb-6">
                    <h1 className="text-xl font-bold mb-4">Área Judicial</h1>
                    <div className='bg-white p-4 rounded-md shadow-md border border-gray-300'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Nombre del Juzgado</label>
                                <input
                                    placeholder="Ingrese el nombre del juzgado"
                                    type="text"
                                    value={datosJudiciales.nombreJuzgado}
                                    onChange={(e) => handleInputChange(e, 'nombreJuzgado')}
                                    disabled={!isEditable} className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.nombreJuzgado ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.nombreJuzgado && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Tipo de Juzgado</label>
                                <input
                                    placeholder="Ingrese el tipo de juzgado"
                                    type="text"
                                    value={datosJudiciales.tipoJuzgado}
                                    onChange={(e) => handleInputChange(e, 'tipoJuzgado')}
                                    disabled={!isEditable} className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.tipoJuzgado ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.tipoJuzgado && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-semibold mb-1">Fuero Judicial</label>
                                <input
                                    placeholder="Ingrese el fuero judicial"
                                    type="text"
                                    value={datosJudiciales.fueroJudicial}
                                    onChange={(e) => handleInputChange(e, 'fueroJudicial')}
                                    disabled={!isEditable} className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fueroJudicial ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.fueroJudicial && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Ubicación del Juzgado</label>
                                <input
                                    placeholder="Ingrese la ubicación del juzgado"
                                    type="text"
                                    value={datosJudiciales.ubicacionJuzgado}
                                    onChange={(e) => handleInputChange(e, 'ubicacionJuzgado')}
                                    disabled={!isEditable} className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.ubicacionJuzgado ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.ubicacionJuzgado && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Fecha de Inicio de la Causa</label>
                                <input
                                    placeholder="Ingrese fecha de inicio de la causa"
                                    type="date"
                                    value={datosJudiciales.fechaInicioCausa}
                                    onChange={(e) => handleInputChange(e, 'fechaInicioCausa')}
                                    disabled={!isEditable} className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fechaInicioCausa ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.fechaInicioCausa && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Estado del Caso</label>
                                <input
                                    placeholder="Ingrese el estado del caso"
                                    type="text"
                                    value={datosJudiciales.estadoCaso}
                                    onChange={(e) => handleInputChange(e, 'estadoCaso')}
                                    disabled={!isEditable} className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.estadoCaso ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.estadoCaso && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Número del Caso</label>
                                <input
                                    placeholder="Ingrese el número del caso"
                                    type="number"
                                    value={datosJudiciales.numeroCaso}
                                    onChange={(e) => handleInputChange(e, 'numeroCaso')}
                                    disabled={!isEditable} className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.numeroCaso ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.numeroCaso && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Fecha Resolución Final</label>
                                <input
                                    placeholder="Ingrese la resolución final"
                                    type="date"
                                    value={datosJudiciales.fechaResolucionFinal}
                                    onChange={(e) => handleInputChange(e, 'fechaResolucionFinal')}
                                    disabled={!isEditable} className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fechaResolucionFinal ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.fechaResolucionFinal && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Observación</label>
                            <textarea
                                placeholder="Ingrese las observaciones"
                                value={datosJudiciales.observacion}
                                onChange={(e) => handleInputChange(e, 'observacion')}
                                disabled={!isEditable} className="w-full p-2 border border-gray-300 rounded text-sm border-gray-300"
                            />
                        </div>

                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleCargarActualizar}
                                className={`text-white px-4 py-2 rounded-md text-xs ${buttonText === 'Guardar Cambios' && !isDataModified
                                    ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500'}`}
                                disabled={buttonText === 'Guardar Cambios' && !isDataModified || buttonText === 'Cargar' && !Object.values(datosJudiciales).some(value => value.trim() !== '')}
                            >
                                {buttonText}
                            </button>
                        </div>
                        <div className="flex justify-center lg:justify-end mb-4 mt-4">
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900 text-xs"
                            >
                                Ver historial de cambios
                            </button>
                        </div>

                        <Modal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            historialCambios={historialCambios}
                            campoMapeado={campoMapeadoDatosJudiciales}
                        />

                        <div className="border border-gray-300 bg-gray-50 p-2 bg-white rounded-md shadow-md flex flex-col mt-5">
                            <h2 className="text-l font-bold mb-4">Documentos Adjuntos</h2>

                            <div className="flex flex-col md:flex-row md:space-x-4 items-center space-y-4 md:space-y-0">
                                <div className="w-full">
                                    <label className="block text-sm font-semibold mb-1">Resolución Final</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => handleFileChange(e, 'resolucionFinal')}
                                        disabled={!!files.resolucionFinal}
                                        className={`w-full p-2 border ${files.resolucionFinal ? 'bg-gray-200' : 'border-gray-300'} rounded text-sm`}
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-semibold mb-1">Fundamento de la Sentencia</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => handleFileChange(e, 'fundamentoSentencia')}
                                        disabled={!!files.fundamentoSentencia}
                                        className={`w-full p-2 border ${files.fundamentoSentencia ? 'bg-gray-200' : 'border-gray-300'} rounded text-sm`}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:space-x-4 items-center mt-4 space-y-4 md:space-y-0">
                                <div className="w-full">
                                    <label className="block text-sm font-semibold mb-1">Abocamiento</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => handleFileChange(e, 'abocamiento')}
                                        disabled={!!files.abocamiento}
                                        className={`w-full p-2 border ${files.abocamiento ? 'bg-gray-200' : 'border-gray-300'} rounded text-sm`}
                                    />
                                </div>

                                <div className="w-full">
                                    <label className="block text-sm font-semibold mb-1">Cómputo</label>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => handleFileChange(e, 'computo')}
                                        disabled={!!files.computo}
                                        className={`w-full p-2 border ${files.computo ? 'bg-gray-200' : 'border-gray-300'} rounded text-sm`}
                                    />
                                </div>
                            </div>

                            {/* Botón para abrir el modal de archivos cargados */}
                            <div className="flex justify-center mt-4 mb-4">
                                <button
                                    type="button"
                                    onClick={handleOpenFilesModal}
                                    className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900 text-xs"
                                >
                                    Ver archivos cargados
                                </button>
                            </div>



                            {/* Modal para ver y editar los archivos cargados */}
                            {isModalOpenFiles && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg mx-auto">
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault(); handleCloseFilesModal();
                                            }}
                                            className="absolute top-2 right-2 bg-gray-400 text-white p-2 rounded-full shadow-lg hover:bg-gray-500 focus:outline-none"
                                            aria-label="Cerrar modal"
                                        >
                                            <svg
                                                className="w-4 h-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>

                                        <h3 className="text-lg font-bold text-center">Archivos cargados</h3>
                                        <div className="mt-4 max-h-64 md:max-h-96 overflow-y-auto">
                                            {fileHistorial.length > 0 ? (
                                                <ul className="space-y-2">
                                                    {fileHistorial.map((item, index) => (
                                                        <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                            <div>
                                                                <span className="text-sm"><strong>{fileLabels[item.tipo]}:</strong></span>
                                                                <a
                                                                    href={URL.createObjectURL(item.file)}
                                                                    download={item.fileName}
                                                                    className="ml-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                                >
                                                                    {item.fileName}
                                                                </a>
                                                            </div>

                                                            <div className="text-sm text-gray-500 mt-2">
                                                                <strong className="text-xs">Fecha de Carga:</strong> {item.fechaCarga}
                                                            </div>

                                                            {item.fechaEdicion && (
                                                                <div className="text-sm text-gray-500 mt-2">
                                                                    <strong className="text-xs">Fecha de Edición:</strong> {item.fechaEdicion}
                                                                </div>
                                                            )}

                                                            {/* Botón de editar archivo */}
                                                            <div className="mt-2">
                                                                <button
                                                                    onClick={(e) => handleFileEdit(item.tipo, e)}
                                                                    className="bg-orange-400 text-white p-1 rounded hover:bg-orange-500 text-xs"
                                                                >
                                                                    Editar Archivo
                                                                </button>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            ) : (
                                                <p className="text-sm text-gray-500 text-center">No hay archivos cargados aún.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-6 md:mb-0 bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-l font-bold mb-4">Información del Abogado</h2>
                        <form className="bg-white p-4 rounded-md shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                                    <input
                                        placeholder="Ingrese el nombre y apellido"
                                        type="text"
                                        value={abogado.nombreApellido}
                                        onChange={(e) => handleAbogadoInputChange(e, 'nombreApellido')}
                                        className={`w-full p-2 border border-gray-300 rounded text-sm ${abogadoErrors.nombreApellido ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {abogadoErrors.nombreApellido && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Matrícula</label>
                                    <input
                                        placeholder="Ingrese la matrícula"
                                        type="text"
                                        value={abogado.matricula}
                                        onChange={(e) => handleAbogadoInputChange(e, 'matricula')}
                                        className={`w-full p-2 border border-gray-300 rounded text-sm ${abogadoErrors.matricula ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {abogadoErrors.matricula && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                                </div>

                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Poderes</label>
                                <input
                                    placeholder="Ingrese los poderes"
                                    value={abogado.poderes}
                                    onChange={(e) => handleAbogadoInputChange(e, 'poderes')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${abogadoErrors.poderes ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {abogadoErrors.poderes && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div className="flex justify-center mb-4">
                                <button
                                    type="button"
                                    onClick={handleAgregarAbogadoData}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                            <div className='bg-white p-4 rounded-md shadow-md border border-gray-300'>
                                <h3 className="text-sm font-bold">Historial de Abogados</h3>
                                <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                    {abogados.length > 0 ? (
                                        <ul className="mt-2">
                                            {abogados.map((item, index) => (
                                                <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                                    <p className='text-sm'><strong>Nombre y Apellido:</strong> {item.nombreApellido}</p>
                                                    <p className='text-sm'><strong>Matrícula:</strong> {item.matricula}</p>
                                                    <p className='text-sm'><strong>Poderes:</strong> {item.poderes}</p>
                                                    <div>
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center">
                                            No hay historial de abogados registrado aún.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>

                    <div className="w-full md:w-1/2 pl-0 md:pl-4 bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-l font-bold mb-4">Carga de Víctima</h2>
                        <form className="bg-white p-4 rounded-md shadow-md">
                            <div className="flex flex-col items-center mb-4">
                                <div className="relative flex justify-center items-center">
                                    <div className="relative w-28 h-28 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                        {fotoVictima ? (
                                            <img src={fotoVictima} alt="Foto Victima" className="w-full h-full object-cover" />
                                        ) : (
                                            <span className="text-white text-xs">Foto</span>
                                        )}
                                    </div>
                                    <input
                                        id="foto-victima"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFotoChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="foto-victima"
                                        className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                                    >
                                        +
                                    </label>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                                <input
                                    type="text"
                                    placeholder="Ingrese el nombre y apellido"
                                    value={victima.nombres}
                                    onChange={(e) => setVictima({ ...victima, nombres: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                />
                                {victimaErrors.nombres && <p className="text-red-500 text-xs">{victimaErrors.nombres}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">DNI</label>
                                <input
                                    type="text"
                                    placeholder="Ingrese el DNI"
                                    value={victima.dni}
                                    onChange={(e) => setVictima({ ...victima, dni: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                />
                                {victimaErrors.dni && <p className="text-red-500 text-xs">{victimaErrors.dni}</p>}
                            </div>

                            <div className="flex justify-center mb-4">
                                <button
                                    type="button"
                                    onClick={agregarVictima}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                            <div className='bg-white p-4 rounded-md shadow-md border border-gray-300'>
                                <h3 className="text-sm font-bold">Historial de Víctimas</h3>
                                <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                    {victimas.length > 0 ? (
                                        <ul className="mt-2">
                                            {victimas.map((item, index) => (
                                                <li key={item.id} className="border border-gray-300 p-2 mb-2 rounded bg-white shadow-sm">
                                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                                        <div className="flex-grow">
                                                            <p className="text-sm"><strong>Nombres:</strong> {item.nombres}</p>
                                                            <p className="text-sm"><strong>DNI:</strong> {item.dni}</p>
                                                            <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                                        </div>
                                                        <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center">
                                                            {verFoto(item.foto)}

                                                            {item.foto ? (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => openModal(item.foto)}
                                                                    className="mt-2 bg-blue-400 text-white p-2 rounded-full text-xs"
                                                                >
                                                                    Ver Foto
                                                                </button>
                                                            ) : (
                                                                <>
                                                                    <input
                                                                        id={`foto-historial-${item.id}`}
                                                                        type="file"
                                                                        accept="image/*"
                                                                        onChange={(e) => handleFotoHistorialChange(e, index)}
                                                                        className="hidden"
                                                                    />
                                                                    <label
                                                                        htmlFor={`foto-historial-${item.id}`}
                                                                        className="mt-2 bg-blue-400 text-white p-2 rounded-full cursor-pointer text-xs"
                                                                    >
                                                                        Subir Foto
                                                                    </label>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center">No hay víctimas cargadas aún.</p>
                                    )}
                                </div>
                            </div>
                        </form>

                        {/* Modal para mostrar la foto */}
                        {showModalFoto && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                                <div className="bg-white p-4 rounded-md shadow-lg relative max-w-full w-full sm:max-w-lg sm:w-auto">
                                    {/* Botón para cerrar el modal */}
                                    <button
                                        onClick={handleCloseModal}
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                    >
                                        ×
                                    </button>
                                    {/* Imagen dentro del modal, que será responsive */}
                                    <img
                                        src={modalPhoto}
                                        alt="Modal Foto"
                                        className="w-full h-auto object-contain max-h-[80vh] mx-auto"
                                    />
                                </div>
                            </div>
                        )}

                    </div>

                </div>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleVolver}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menú Principal
                    </button>
                </div>
            </div >
        </div >
    );
};

export default CargaJudicial;
