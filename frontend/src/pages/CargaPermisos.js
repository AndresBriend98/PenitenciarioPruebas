import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CargaPermisos = () => {
    const [confirmDeletePermisoModal, setConfirmDeletePermisoModal] = useState(false);
    const [selectedPermisoIndex, setSelectedPermisoIndex] = useState(null);

    const [permisos, setPermisos] = useState([]);

    const [permisoData, setPermisoData] = useState({ tipo: '', motivo: '', observacion: '', autorizadoPor: '' });

    const [errors, setErrors] = useState({
        permisos: {
            tipo: '',
            motivo: '',
            autorizadoPor: ''
        }
    });

    const handleGuardarObservacion = (index) => {
        const newPermisos = [...permisos];
        const fechaModificacion = new Date().toLocaleString();
        newPermisos[index].observacion = newObservacion;
        newPermisos[index].ultimaModificacionObservacion = fechaModificacion;
        newPermisos[index].fechaObservacion = newPermisos[index].fechaObservacion || fechaModificacion;
        setPermisos(newPermisos); setIsEditingObservacion(null); setNewObservacion('');
    };

    const handleEditarObservacion = (index) => {
        setIsEditingObservacion(index); setNewObservacion(permisos[index].observacion || '');
    };

    const [isEditingObservacion, setIsEditingObservacion] = useState(null); const [newObservacion, setNewObservacion] = useState(''); const [isObservacionModified, setIsObservacionModified] = useState(false);
    const [actasArchivo, setActasArchivo] = useState(null);
    const [nombreActaArchivo, setNombreActaArchivo] = useState('');

    const navigate = useNavigate();

    const handleAgregarPermiso = () => {
        let hasErrors = false;
        const newErrors = { tipo: '', motivo: '', autorizadoPor: '' };

        if (!permisoData.tipo) {
            newErrors.tipo = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!permisoData.motivo) {
            newErrors.motivo = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!permisoData.autorizadoPor) {
            newErrors.autorizadoPor = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                permisos: newErrors
            }));
        } else {
            const fechaCarga = new Date().toLocaleString();
            const nuevoPermiso = {
                ...permisoData,
                fechaCarga,
                actasArchivo: actasArchivo,
                nombreActaArchivo: nombreActaArchivo,
                fechaCargaActa: actasArchivo ? new Date().toLocaleString() : null,
                fechaObservacion: permisoData.observacion ? fechaCarga : null,
                ultimaModificacionObservacion: null,
                fechasDeEdicion: [],
                fechasDeEliminacion: []
            };

            setPermisos(prevPermisos => [...prevPermisos, nuevoPermiso]);

            setPermisoData({ tipo: '', motivo: '', observacion: '', autorizadoPor: '' });
            setActasArchivo(null);
            setNombreActaArchivo('');
            document.querySelector('input[type="file"]').value = '';

            setErrors(prevErrors => ({
                ...prevErrors,
                permisos: { tipo: '', motivo: '', autorizadoPor: '' }
            }));
        }
    };

    const handleEditarActa = (index) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".pdf";

        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const newPermisos = [...permisos];
                const newDate = new Date().toLocaleString();

                if (!newPermisos[index].fechasDeEdicion) {
                    newPermisos[index].fechasDeEdicion = [];
                }

                newPermisos[index].actasArchivo = file;
                newPermisos[index].fechasDeEdicion = [newDate];

                setPermisos(newPermisos);
            }
        };

        input.click();
    };

    const handleEliminarPermisoArchivo = () => {
        if (selectedPermisoIndex !== null) {
            const newPermisos = [...permisos];
            const newDate = new Date().toLocaleString();

            if (!newPermisos[selectedPermisoIndex].fechasDeEliminacion) {
                newPermisos[selectedPermisoIndex].fechasDeEliminacion = [];
            }

            newPermisos[selectedPermisoIndex].actasArchivo = null;
            newPermisos[selectedPermisoIndex].fechasDeEliminacion = [newDate];

            setPermisos(newPermisos);
        }

        setConfirmDeletePermisoModal(false);
        setSelectedPermisoIndex(null);
    };

    const handleCloseDeletePermisoModal = () => {
        setConfirmDeletePermisoModal(false);
        setSelectedPermisoIndex(null);
    };

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className='bg-white p-4 rounded-md shadow-md'>
                <h1 className="text-xl font-bold mb-4">Carga de Permisos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Permisos */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-l font-bold">Permisos</h2>

                        <label className="block text-sm font-semibold mt-5 mb-2">Tipo de Permiso</label>
                        <input
                            type="text"
                            value={permisoData.tipo}
                            onChange={(e) => setPermisoData({ ...permisoData, tipo: e.target.value })}
                            placeholder="Introduce el tipo de permiso"
                            className={`w-full p-1 border ${errors.permisos.tipo ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.permisos.tipo && <p className="text-red-500 text-sm">{errors.permisos.tipo}</p>}

                        <label className="block text-sm font-semibold mt-2 mb-2">Permiso Autorizado Por</label>
                        <input
                            type="text"
                            value={permisoData.autorizadoPor}
                            onChange={(e) => setPermisoData({ ...permisoData, autorizadoPor: e.target.value })}
                            placeholder="Introduce el nombre y apellido del autorizador"
                            className={`w-full p-1 border ${errors.permisos.autorizadoPor ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.permisos.autorizadoPor && <p className="text-red-500 text-sm">{errors.permisos.autorizadoPor}</p>}

                        <label className="block text-sm font-semibold mb-2">Motivo del Permiso</label>
                        <input
                            type="text"
                            value={permisoData.motivo}
                            onChange={(e) => setPermisoData({ ...permisoData, motivo: e.target.value })}
                            placeholder="Introduce el motivo del permiso"
                            className={`w-full p-1 border ${errors.permisos.motivo ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.permisos.motivo && <p className="text-red-500 text-sm">{errors.permisos.motivo}</p>}

                        <label className="block text-sm font-semibold mt-2 mb-2">Observaciones</label>
                        <textarea
                            value={permisoData.observacion}
                            onChange={(e) => setPermisoData({ ...permisoData, observacion: e.target.value })}
                            placeholder="Introduce tus observaciones aquí"
                            rows="3"
                            className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
                        />

                        {/* Campo para subir actas */}
                        <label className="block text-sm font-bold mt-2 mb-2">Subir Acta</label>
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setActasArchivo(file); setNombreActaArchivo(file.name);
                            }}
                            accept=".pdf"
                            className="mt-1 mb-2 text-sm w-full border border-gray-300 rounded p-1"
                        />

                        <div className="flex justify-center mt-2">
                            <button
                                onClick={handleAgregarPermiso}
                                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                    </div>

                    <div className="flex-1 bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4">
                        {/* Historial de Permisos */}
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <h3 className="text-sm font-bold">Historial de Permisos</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-96 overflow-y-auto">
                                {permisos.length > 0 ? (
                                    <ul className="mt-2">
                                        {permisos.map((item, index) => (
                                            <li
                                                key={index}
                                                className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm"
                                            >
                                                <p className="text-sm max-w-full break-words">
                                                    <strong>Tipo de permiso:</strong> {item.tipo}
                                                </p>

                                                <p className="text-sm max-w-full break-words">
                                                    <strong>Motivo:</strong> {item.motivo}
                                                </p>

                                                <p className="text-sm max-w-full break-words">
                                                    <strong>Autorizado Por:</strong> {item.autorizadoPor}
                                                </p>

                                                {/* Observación */}
                                                <div className="flex flex-wrap justify-between items-start mt-2">
                                                    {isEditingObservacion === index ? (
                                                        <>
                                                            <p className="text-sm"><strong>Observación:</strong></p>
                                                            <textarea
                                                                value={newObservacion}
                                                                onChange={(e) => {
                                                                    setNewObservacion(e.target.value);
                                                                    setIsObservacionModified(e.target.value !== item.observacion);
                                                                }}
                                                                className="p-1 border border-gray-300 rounded text-sm ml-2 flex-1 max-w-full"
                                                                rows="2"
                                                            />

                                                            <button
                                                                onClick={() => handleGuardarObservacion(index)}
                                                                className={`bg-green-400 text-white p-1 rounded hover:bg-green-500 text-xs ml-2 ${!isObservacionModified ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                disabled={!isObservacionModified}
                                                            >
                                                                Guardar
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Visualización de la observación si no se está editando */}
                                                            {item.observacion ? (
                                                                <>
                                                                    <p className="text-sm flex-1 max-w-full break-words">
                                                                        <strong>Observación:</strong> {item.observacion}
                                                                    </p>

                                                                    <button
                                                                        onClick={() => handleEditarObservacion(index)}
                                                                        className="bg-orange-400 text-white p-1 rounded hover:bg-orange-500 text-xs ml-1 mt-1"
                                                                    >
                                                                        Editar Observación
                                                                    </button>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <p className="text-sm text-gray-600">
                                                                        <strong>Observación:</strong> No se han registrado observaciones.
                                                                    </p>
                                                                    <button
                                                                        onClick={() => handleEditarObservacion(index)}
                                                                        className="bg-blue-400 text-white p-1 rounded hover:bg-blue-500 text-xs ml-1 mt-1"
                                                                    >
                                                                        Agregar Observación
                                                                    </button>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>

                                                {/* Fecha de carga y última modificación de la observación */}
                                                {item.fechaObservacion && (
                                                    <p className="text-sm text-gray-500 mt-1 max-w-full break-words">
                                                        <strong>Fecha de carga de observación:</strong>{" "}
                                                        {item.fechaObservacion}
                                                        {item.ultimaModificacionObservacion && (
                                                            <span>
                                                                {" "}
                                                                (Última modificación: {item.ultimaModificacionObservacion})
                                                            </span>
                                                        )}
                                                    </p>
                                                )}

                                                {/* Fecha de carga y otras fechas */}
                                                {item.fechaCarga && (
                                                    <p className="text-sm text-gray-500 mt-2 max-w-full break-words">
                                                        <strong>Fecha de carga:</strong> {item.fechaCarga}
                                                    </p>
                                                )}

                                                {/* Acta */}
                                                <span className="text-sm max-w-full break-words">
                                                    <strong>Acta:</strong>
                                                </span>
                                                {/* Si no hay archivo cargado */}
                                                {!item.actasArchivo ? (
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            const newPermisos = [...permisos];
                                                            const newDate = new Date().toLocaleString();
                                                            newPermisos[index].actasArchivo = e.target.files[0];
                                                            newPermisos[index].fechasDeEdicion = [];
                                                            newPermisos[index].fechasDeEliminacion = [];
                                                            newPermisos[index].fechaCargaActa = newDate;

                                                            setPermisos(newPermisos);
                                                        }}
                                                        accept=".pdf"
                                                        className="mt-1 mb-2 text-sm ml-2 w-full border border-gray-300 rounded p-1"
                                                    />
                                                ) : (
                                                    <>
                                                        {/* Enlace para descargar el archivo */}
                                                        <a
                                                            href={URL.createObjectURL(item.actasArchivo)}
                                                            download={item.actasArchivo.name}
                                                            className="mt-2 ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar Acta
                                                        </a>

                                                        {/* Botón de Editar */}
                                                        <button
                                                            onClick={() => handleEditarActa(index)}
                                                            className="mt-2 ml-2 bg-orange-400 text-white p-2 rounded-full text-xs hover:bg-orange-500"
                                                        >
                                                            Editar Acta
                                                        </button>

                                                        {/* Botón de Eliminar */}
                                                        <button
                                                            onClick={() => {
                                                                setSelectedPermisoIndex(index);
                                                                setConfirmDeletePermisoModal(true);
                                                            }}
                                                            className="mt-2 ml-2 bg-red-400 text-white p-2 rounded-full text-xs hover:bg-red-500"
                                                        >
                                                            Eliminar Acta
                                                        </button>
                                                    </>
                                                )}

                                                {item.fechaCargaActa && (
                                                    <p className="text-sm text-gray-500 mt-2 max-w-full break-words">
                                                        <strong>Fecha de carga acta:</strong> {item.fechaCargaActa}
                                                    </p>
                                                )}

                                                {item.fechasDeEdicion && item.fechasDeEdicion.length > 0 && (
                                                    <p className="text-sm text-gray-500 mt-2 max-w-full break-words">
                                                        <strong>Fecha de edición acta:</strong> {item.fechasDeEdicion[0]}
                                                    </p>
                                                )}

                                                {item.fechasDeEliminacion && item.fechasDeEliminacion.length > 0 && (
                                                    <p className="text-sm text-gray-500 mt-2 max-w-full break-words">
                                                        <strong>Fecha de eliminación acta:</strong> {item.fechasDeEliminacion[0]}
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center max-w-full break-words">
                                        No hay permisos registrados.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Modal de confirmación de eliminación */}
                    {confirmDeletePermisoModal && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-md shadow-lg text-center w-full max-w-md mx-4 md:mx-0 max-h-screen overflow-auto">
                                <h2 className="text-lg font-bold mb-4 text-red-600">Confirmar Eliminación</h2>
                                <p>¿Estás seguro de que deseas eliminar este archivo? Esta acción no se puede deshacer.</p>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={handleEliminarPermisoArchivo}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={handleCloseDeletePermisoModal}
                                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
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

export default CargaPermisos;
