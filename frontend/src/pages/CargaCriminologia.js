import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CargaCriminologia = () => {
    const navigate = useNavigate();
    const [originalTitulo, setOriginalTitulo] = useState('');
    const [originalInforme, setOriginalInforme] = useState('');
    const [isModified, setIsModified] = useState(false);
    const [originalBeneficio, setOriginalBeneficio] = useState('');
    const [originalDescripcion, setOriginalDescripcion] = useState('');
    const [originalObservacion, setOriginalObservacion] = useState('');
    const [isBeneficioModified, setIsBeneficioModified] = useState(false);
    const [historialRegimen, setHistorialRegimen] = useState([]);
    const [archivoRegimen, setArchivoRegimen] = useState(null);
    const [estaAdheridoRegimen, setEstaAdheridoRegimen] = useState(false);
    const [isRegimenCargado, setIsRegimenCargado] = useState(false);
    const handleSubirArchivoRegimen = () => {
        if (archivoRegimen) {
            const nuevaEntrada = {
                nombreArchivo: nombreArchivoRegimen,
                archivo: archivoRegimen,
                fecha: new Date().toLocaleDateString(),
            };
            setHistorialRegimen([...historialRegimen, nuevaEntrada]);
            setArchivoRegimen(null);
            setNombreArchivoRegimen('');
            setIsRegimenCargado(true);
        }
    };

    const [confirmDeleteHistorialModal, setConfirmDeleteHistorialModal] = useState(false);
    const [selectedHistorialIndex, setSelectedHistorialIndex] = useState(null);

    const handleCloseDeleteHistorialModal = () => {
        setConfirmDeleteHistorialModal(false);
        setSelectedHistorialIndex(null);
    };
    const handleEliminarActaArchivo = () => {
        if (selectedHistorialIndex !== null) {
            const newHistorial = [...historial];
            const newDate = new Date().toLocaleString();

            if (!newHistorial[selectedHistorialIndex].fechasDeEliminacion) {
                newHistorial[selectedHistorialIndex].fechasDeEliminacion = [];
            }

            newHistorial[selectedHistorialIndex].fechasDeEliminacion.push(newDate);

            newHistorial[selectedHistorialIndex].actasArchivo = null;
            newHistorial[selectedHistorialIndex].nombreActaArchivo = '';

            setHistorial(newHistorial);
        }
        setConfirmDeleteHistorialModal(false);
        setSelectedHistorialIndex(null);
    };

    const [nombreArchivoRegimen, setNombreArchivoRegimen] = useState('');

    const handleEditBeneficio = (index) => {
        const entrada = historialBeneficio[index];
        setEditBeneficio(entrada.beneficio);
        setEditDescripcionBeneficio(entrada.descripcion);
        setEditObservacionBeneficio(entrada.observacion || '');
        setEditIndexBeneficio(index);

        setOriginalBeneficio(entrada.beneficio);
        setOriginalDescripcion(entrada.descripcion);
        setOriginalObservacion(entrada.observacion || '');
        setIsBeneficioModified(false);
    };

    const handleInputChangeBeneficio = (setValue, value, originalValue) => {
        setValue(value);
        setIsBeneficioModified(value !== originalValue);
    };

    const handleEdit = (index) => {
        const entrada = historial[index];
        setEditIndex(index);
        setTituloEditado(entrada.titulo);
        setInformeEditado(entrada.informe);
        setObservacionEditada(entrada.observacion || '');

        setOriginalTitulo(entrada.titulo);
        setOriginalInforme(entrada.informe);
        setOriginalObservacion(entrada.observacion || '');
        setIsModified(false);
    };

    const handleInputChange = (setValue, value, originalValue) => {
        setValue(value);
        setIsModified(value !== originalValue);
    };

    const [informeCriminologicoArchivo, setInformeCriminologicoArchivo] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [tituloEditado, setTituloEditado] = useState('');
    const [informeEditado, setInformeEditado] = useState('');
    const [observacionEditada, setObservacionEditada] = useState('');

    const handleSaveBeneficio = () => {
        const nuevoHistorialBeneficio = [...historialBeneficio];
        nuevoHistorialBeneficio[editIndexBeneficio] = {
            ...nuevoHistorialBeneficio[editIndexBeneficio],
            beneficio: editBeneficio,
            descripcion: editDescripcionBeneficio,
            observacion: editObservacionBeneficio,
            fechaModificacion: new Date().toLocaleString(),
        };
        setHistorialBeneficio(nuevoHistorialBeneficio);
        setEditIndexBeneficio(null); 
        setEditBeneficio('');
        setEditDescripcionBeneficio('');
        setEditObservacionBeneficio('');
    };

    const handleSaveEdit = () => {
        const historialActualizado = [...historial];
        historialActualizado[editIndex] = {
            ...historialActualizado[editIndex],
            titulo: tituloEditado,
            informe: informeEditado,
            observacion: observacionEditada,
            fechaModificacion: new Date().toLocaleString(),
        };
        setHistorial(historialActualizado);
        setEditIndex(null);
        setTituloEditado('');
        setInformeEditado('');
        setObservacionEditada('');
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
        setTituloEditado('');
        setInformeEditado('');
        setObservacionEditada('');
    };

    const [actasArchivo, setActasArchivo] = useState(null);
    const [nombreActaArchivo, setNombreActaArchivo] = useState('');
    const handleCargarBeneficio = () => {
        if (!beneficio && !descripcionBeneficio && !observacionBeneficio) {
            setHasErrorBeneficio(true);
            return;
        }

        setHasErrorBeneficio(false); 

        const nuevaEntrada = {
            beneficio: beneficio || '',
            descripcion: descripcionBeneficio || '',
            observacion: observacionBeneficio || '',
            fecha: new Date().toLocaleString(),
        };

        setHistorialBeneficio([...historialBeneficio, nuevaEntrada]);

        setActasArchivo(null);
        setNombreActaArchivo('');
        setBeneficio('');
        setDescripcionBeneficio('');
        setObservacionBeneficio('');
    };

    const [hasErrorCriminologico, setHasErrorCriminologico] = useState(false); 
    const [hasErrorBeneficio, setHasErrorBeneficio] = useState(false);
    const fileInputRef = useRef(null);
    const handleCargarCriminologico = () => {

        if (!tituloInforme && !informeCriminologico && !informeCriminologicoArchivo && !observacion) {
            setHasErrorCriminologico(true);
            return;
        }

        setHasErrorCriminologico(false);

        const nuevaEntrada = {
            titulo: tituloInforme || '',
            informe: informeCriminologico || '',
            observacion: observacion || '',
            actasArchivo,
            nombreActaArchivo,
            fechaCargaActa: actasArchivo ? new Date().toLocaleString() : null,
            fechasDeCargaActa: actasArchivo ? [new Date().toLocaleString()] : [],
            fecha: new Date().toLocaleString(),
        };

        setHistorial([...historial, nuevaEntrada]);

        setTituloInforme('');
        setInformeCriminologico('');
        setObservacion('');
        setInformeCriminologicoArchivo(null);
        setNombreArchivo('');
        fileInputRef.current.value = ''; 
    };

    const [beneficio, setBeneficio] = useState('');
    const [descripcionBeneficio, setDescripcionBeneficio] = useState('');
    const [observacionBeneficio, setObservacionBeneficio] = useState('');
    const [historialBeneficio, setHistorialBeneficio] = useState([]);
    const [editBeneficio, setEditBeneficio] = useState('');
    const [editDescripcionBeneficio, setEditDescripcionBeneficio] = useState('');
    const [editObservacionBeneficio, setEditObservacionBeneficio] = useState('');
    const [editIndexBeneficio, setEditIndexBeneficio] = useState(null);
    const [informeCriminologico, setInformeCriminologico] = useState('');
    const [tituloInforme, setTituloInforme] = useState('');
    const [observacion, setObservacion] = useState('');
    const [historial, setHistorial] = useState([]);
    const [editIndex, setEditIndex] = useState(null);

    const [user, setUser] = useState({
        typeofintern: 'Procesado',
    });

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col z-10">
            <Header />
            <div className='bg-white p-4 rounded-md shadow-md mb-4 mt-5 '>
                <h1 className="text-xl font-bold mb-4">Area Criminológica</h1>

                {/* Solo muestra esta sección si el tipo de interno es "Procesado" */}
                {user.typeofintern === 'Procesado' && (
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <label className="block text-sm font-semibold mb-2 mt-2">
                            <input
                                type="checkbox"
                                checked={estaAdheridoRegimen}
                                onChange={(e) => setEstaAdheridoRegimen(e.target.checked)}
                                disabled={isRegimenCargado}
                                className="mr-2"
                            />
                            <span>Está adherido al régimen</span>
                        </label>

                        {estaAdheridoRegimen && (
                            <>

                                <label className="block text-sm font-semibold mb-2 mt-4">Adhesión al régimen</label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setArchivoRegimen(file);
                                        setNombreArchivoRegimen(file.name);
                                    }}
                                    accept=".pdf,.doc,.docx"
                                    className="mt-1 mb-2 text-sm w-full border border-gray-300 rounded p-1"
                                />

                                <div className="flex justify-center">
                                    <button
                                        onClick={() => {
                                            handleSubirArchivoRegimen();
                                            setArchivoRegimen(null);
                                            document.querySelector('input[type="file"]').value = null;
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                        disabled={!archivoRegimen}
                                    >
                                        Cargar
                                    </button>
                                </div>

                                <div className="bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                                    <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                        {historialRegimen.length > 0 ? (
                                            <ul className="space-y-2">
                                                {historialRegimen.map((entrada, index) => (
                                                    <li key={index} className="border-b border-gray-300 pb-2">
                                                        {entrada.archivo ? (
                                                            <div>
                                                                <p className="text-sm"><strong>Adhesión al Régimen:</strong></p>
                                                                <a
                                                                    href={URL.createObjectURL(entrada.archivo)}
                                                                    download={entrada.nombreArchivo}
                                                                    className="mt-2 ml-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600 inline-block"
                                                                >
                                                                    Descargar Adhesión al Régimen
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <span className="text-sm"><strong>Archivo de Adhesión al Régimen:</strong></span>
                                                                <input
                                                                    type="file"
                                                                    onChange={(e) => {
                                                                        const newHistorial = [...historialRegimen];
                                                                        newHistorial[index].archivo = e.target.files[0];
                                                                        newHistorial[index].nombreArchivo = e.target.files[0].name;
                                                                        setHistorialRegimen(newHistorial);
                                                                    }}
                                                                    accept=".pdf,.doc,.docx"
                                                                    className="mt-1 mb-2 text-sm border border-gray-300 rounded p-1 w-full"
                                                                />
                                                            </div>
                                                        )}
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-500 text-center">No hay archivos de adhesión al régimen registrados aún.</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                    {/* Formulario de Carga Criminológica */}
                    <div className="bg-white p-4 rounded-md shadow-md mb-4 border border-gray-300 rounded mt-2 bg-gray-50 mb-4">
                        <h1 className="text-l font-bold mb-4">Carga Criminológica</h1>
                        {hasErrorCriminologico && (
                            <p className="text-red-500 text-sm mb-5">Por favor, complete al menos un campo para poder realizar una carga.</p>
                        )}
                        <div className="grid grid-cols-1 gap-3">
                            {/* Campo para el Título del Informe */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Título del Informe</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border border-gray-300 rounded text-sm`}
                                    value={tituloInforme}
                                    onChange={(e) => setTituloInforme(e.target.value)}
                                    placeholder="Ingresar el título del informe (opcional)"
                                />
                            </div>

                            {/* Informe Criminológico */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Informe Criminológico</label>
                                <textarea
                                    className={`w-full p-2 border border-gray-300 rounded text-sm`}
                                    rows="3"
                                    value={informeCriminologico}
                                    onChange={(e) => setInformeCriminologico(e.target.value)}
                                    placeholder="Ingresar el informe criminológico del interno (opcional)"
                                ></textarea>
                            </div>

                            {/* Observación */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Observación</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    rows="3"
                                    value={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                    placeholder="Ingresar alguna observación del interno (opcional)"
                                ></textarea>
                            </div>

                            <label className="block text-sm font-bold mt-2 mb-2">Subir informe</label>
                        
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setActasArchivo(file);
                                    setNombreActaArchivo(file.name);
                                }}
                                accept=".pdf,.doc,.docx"
                                className="mt-1 mb-2 text-sm w-full border border-gray-300 rounded p-1"
                            />

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
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4 mt-5">
                            <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {historial.filter(entrada => entrada.titulo || entrada.informe || entrada.observacion || entrada.archivo).length > 0 ? (
                                    <ul className="space-y-2">
                                        {historial.filter((entrada, index) =>
                                            entrada.titulo || entrada.informe || entrada.observacion || entrada.archivo
                                        ).map((entrada, index) => (
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
                                                                    onChange={(e) => handleInputChange(setTituloEditado, e.target.value, originalTitulo)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Informe:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={informeEditado}
                                                                    onChange={(e) => handleInputChange(setInformeEditado, e.target.value, originalInforme)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Observación:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={observacionEditada}
                                                                    onChange={(e) => handleInputChange(setObservacionEditada, e.target.value, originalObservacion)}
                                                                />
                                                            </div>
                                                            <div className="flex justify-center space-x-2 mt-2">
                                                                <button
                                                                    onClick={handleSaveEdit}
                                                                    disabled={!isModified}
                                                                    className={`bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600 ${!isModified ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                                        {/* Solo mostramos Título si tiene valor */}
                                                        {entrada.titulo && (
                                                            <p className="text-sm"><strong>Título:</strong> {entrada.titulo}</p>
                                                        )}
                                                        {/* Solo mostramos Informe si tiene valor */}
                                                        {entrada.informe && (
                                                            <p className="text-sm"><strong>Informe:</strong> {entrada.informe}</p>
                                                        )}
                                                        {/* Solo mostramos Observación si tiene valor */}
                                                        {entrada.observacion && (
                                                            <p className="text-sm"><strong>Observación:</strong> {entrada.observacion}</p>
                                                        )}

                                                        {/* Acta */}
                                                        <span className="text-sm max-w-full break-words">
                                                            <strong>Informe:</strong>
                                                        </span>
                                                        {/* Si no hay archivo cargado */}
                                                        {!entrada.actasArchivo ? (
                                                            <input
                                                                type="file"
                                                                onChange={(e) => {
                                                                    const newHistorial = [...historial];
                                                                    const newDate = new Date().toLocaleString(); 

                                                                    newHistorial[index].actasArchivo = e.target.files[0];

                                                                    if (!newHistorial[index].fechaCarga) {
                                                                        newHistorial[index].fechaCarga = newDate;
                                                                    }


                                                                    if (!newHistorial[index].fechasDeCargaActa) {
                                                                        newHistorial[index].fechasDeCargaActa = [];
                                                                    }

                                                                    newHistorial[index].fechasDeCargaActa.push(newDate);

                                                                    setHistorial(newHistorial);
                                                                }}
                                                                accept=".pdf,.doc,.docx"
                                                                className="mt-1 mb-2 text-sm ml-2 w-full border border-gray-300 rounded p-1"
                                                            />
                                                        ) : (
                                                            <>
                                                                <a
                                                                    href={URL.createObjectURL(entrada.actasArchivo)}
                                                                    download={entrada.actasArchivo.name}
                                                                    className="mt-2 ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                                >
                                                                    Descargar Informe
                                                                </a>

                                                                <button
                                                                    onClick={() => {
                                                                        const input = document.createElement("input");
                                                                        input.type = "file";
                                                                        input.accept = ".pdf,.doc,.docx";

                                                                        input.onchange = (e) => {
                                                                            const file = e.target.files[0];
                                                                            if (file) {
                                                                                const newHistorial = [...historial];
                                                                                const newDate = new Date().toLocaleString();

                                                                                if (!newHistorial[index].fechasDeEdicion) {
                                                                                    newHistorial[index].fechasDeEdicion = [];
                                                                                }

                                                                                newHistorial[index].fechasDeEdicion.push(newDate);

                                                                                newHistorial[index].actasArchivo = file;
                                                                                setHistorial(newHistorial);
                                                                            }
                                                                        };

                                                                        input.click();
                                                                    }}
                                                                    className="mt-2 ml-2 bg-orange-400 text-white p-2 rounded-full text-xs hover:bg-orange-500"
                                                                >
                                                                    Editar Informe
                                                                </button>

                                                                {/* Botón de Eliminar */}
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedHistorialIndex(index);
                                                                        setConfirmDeleteHistorialModal(true);
                                                                    }}
                                                                    className="mt-2 ml-2 bg-red-400 text-white p-2 rounded-full text-xs hover:bg-red-500"
                                                                >
                                                                    Eliminar Informe
                                                                </button>
                                                            </>
                                                        )}

                                                        <div>

                                                            {/* Mostrar la fecha de carga de acta solo si existe */}
                                                            {entrada.fechasDeCargaActa && (
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500 max-w-full break-words">
                                                                        <strong>Fecha de carga informe:</strong>
                                                                    </p>
                                                                    <ul className="list-disc list-inside">
                                                                        {entrada.fechasDeCargaActa.map((fecha, index) => (
                                                                            <li
                                                                                key={index}
                                                                                className="text-sm text-gray-500 max-w-full break-words"
                                                                            >
                                                                                {fecha}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Mostrar las fechas de edición solo si hay al menos una */}
                                                            {entrada.fechasDeEdicion && entrada.fechasDeEdicion.length > 0 && (
                                                                <div className="mt-2">
                                                                    <p className="text-sm text-gray-500 max-w-full break-words">
                                                                        <strong>Fecha de edición informe:</strong>
                                                                    </p>
                                                                    <ul className="list-disc list-inside">
                                                                        {entrada.fechasDeEdicion.map((fecha, index) => (
                                                                            <li
                                                                                key={index}
                                                                                className="text-sm text-gray-500 max-w-full break-words"
                                                                            >
                                                                                {fecha}
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}

                                                            {/* Mostrar las fechas de eliminación solo si hay al menos una */}
                                                            {entrada.fechasDeEliminacion &&
                                                                entrada.fechasDeEliminacion.length > 0 && (
                                                                    <div className="mt-2">
                                                                        <p className="text-sm text-gray-500 max-w-full break-words">
                                                                            <strong>Fecha de eliminación informe:</strong>
                                                                        </p>
                                                                        <ul className="list-disc list-inside">
                                                                            {entrada.fechasDeEliminacion.map((fecha, index) => (
                                                                                <li
                                                                                    key={index}
                                                                                    className="text-sm text-gray-500 max-w-full break-words"
                                                                                >
                                                                                    {fecha}
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                )}
                                                        </div>
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                                        {entrada.fechaModificacion && (
                                                            <p className="text-sm text-gray-500"><strong>Fecha de modificación (beneficio/descripción/observación):</strong> {entrada.fechaModificacion}</p>
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
                        {/* Modal de confirmación de eliminación */}
                        {confirmDeleteHistorialModal && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-md shadow-lg text-center w-full max-w-md mx-4 md:mx-0 max-h-screen overflow-auto">
                                    <h2 className="text-lg font-bold mb-4 text-red-600">Confirmar Eliminación</h2>
                                    <p>¿Estás seguro de que deseas eliminar este archivo? Esta acción no se puede deshacer.</p>
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            onClick={handleEliminarActaArchivo}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            onClick={handleCloseDeleteHistorialModal}
                                            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                    {/* Formulario de Carga Beneficio */}
                    <div className="bg-white p-4 rounded-md shadow-md mb-4 border border-gray-300 rounded mt-2 bg-gray-50 mb-4">
                        <h1 className="text-l font-bold mb-4">Carga Beneficio</h1>
                        {hasErrorBeneficio && (
                            <p className="text-red-500 text-sm mb-5">Por favor, complete al menos un campo para poder realizar una carga.</p>
                        )}
                        <div className="grid grid-cols-1 gap-3">
                            {/* Campo para el Beneficio */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Beneficio</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border border-gray-300 rounded text-sm`}
                                    value={beneficio}
                                    onChange={(e) => setBeneficio(e.target.value)}
                                    placeholder="Ingresar el beneficio del interno aquí (opcional)"
                                />
                            </div>

                            {/* Campo para la Descripción */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Descripción</label>
                                <textarea
                                    className={`w-full p-2 border border-gray-300 rounded text-sm`}
                                    rows="3"
                                    value={descripcionBeneficio}
                                    onChange={(e) => setDescripcionBeneficio(e.target.value)}
                                    placeholder="Ingresar la descripción del beneficio aquí (opcional)"
                                ></textarea>
                            </div>

                            {/* Campo para Observación */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Observación</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    rows="3"
                                    value={observacionBeneficio}
                                    onChange={(e) => setObservacionBeneficio(e.target.value)}
                                    placeholder="Ingresar alguna observación del interno aquí (opcional)"
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
                        {/* Historial de Beneficio */}
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4 mt-5">
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
                                                                    onChange={(e) => handleInputChangeBeneficio(setEditBeneficio, e.target.value, originalBeneficio)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Descripción:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={editDescripcionBeneficio}
                                                                    onChange={(e) => handleInputChangeBeneficio(setEditDescripcionBeneficio, e.target.value, originalDescripcion)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Observación:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={editObservacionBeneficio}
                                                                    onChange={(e) => handleInputChangeBeneficio(setEditObservacionBeneficio, e.target.value, originalObservacion)}
                                                                />
                                                            </div>
                                                            <div className="flex justify-center space-x-2 mt-2">
                                                                <button
                                                                    onClick={handleSaveBeneficio}
                                                                    disabled={!isBeneficioModified}
                                                                    className={`bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600 ${!isBeneficioModified ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                                        <p className="text-sm">
                                                            {entrada.beneficio && <><strong>Beneficio:</strong> {entrada.beneficio}</>}
                                                        </p>
                                                        <p className="text-sm">
                                                            {entrada.descripcion && <><strong>Descripción:</strong> {entrada.descripcion}</>}
                                                        </p>
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
    );
};

export default CargaCriminologia;