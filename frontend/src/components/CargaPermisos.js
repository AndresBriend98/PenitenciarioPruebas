import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaPermisos = () => {
    const [confirmDeletePermisoModal, setConfirmDeletePermisoModal] = useState(false);
    const [selectedPermisoIndex, setSelectedPermisoIndex] = useState(null);

    // Estado para manejar los permisos
    const [permisos, setPermisos] = useState([]);

    // Estado para manejar los datos del permiso en el formulario
    const [permisoData, setPermisoData] = useState({ tipo: '', motivo: '', observacion: '', autorizadoPor: '' });

    // Estado para manejar los errores
    const [errors, setErrors] = useState({
        permisos: {
            tipo: '',
            motivo: '',
            autorizadoPor: ''
        }
    });

    // Función para guardar la observación editada o nueva
    const handleGuardarObservacion = (index) => {
        const newPermisos = [...permisos];
        const fechaModificacion = new Date().toLocaleString();  // Fecha de modificación

        // Actualizar la observación y registrar fechas
        newPermisos[index].observacion = newObservacion;
        newPermisos[index].ultimaModificacionObservacion = fechaModificacion;
        newPermisos[index].fechaObservacion = newPermisos[index].fechaObservacion || fechaModificacion; // Si no hay fecha de carga, asignamos la fecha de modificación

        setPermisos(newPermisos);  // Actualizamos el estado con las nuevas observaciones
        setIsEditingObservacion(null);  // Finaliza la edición
        setNewObservacion('');  // Reseteamos el campo de texto
    };

    // Activar el modo de edición para la observación
    const handleEditarObservacion = (index) => {
        setIsEditingObservacion(index);  // Activa la edición para el índice dado
        setNewObservacion(permisos[index].observacion || '');  // Muestra la observación actual (si existe)
    };

    // Definimos los estados necesarios para manejar la edición de la observación
    const [isEditingObservacion, setIsEditingObservacion] = useState(null);  // Estado para controlar la edición
    const [newObservacion, setNewObservacion] = useState('');  // Estado para almacenar el nuevo valor de la observación
    const [isObservacionModified, setIsObservacionModified] = useState(false);  // Estado para controlar si la observación fue modificada

    // Estado para manejar el archivo del permiso
    const [actasArchivo, setActasArchivo] = useState(null);
    const [nombreActaArchivo, setNombreActaArchivo] = useState('');

    const navigate = useNavigate();

    // Función para agregar/editar observación desde el historial
    const handleAgregarObservacionDesdeHistorial = (index) => {
        const observacion = prompt("Introduce una nueva observación:");

        if (observacion) {
            const newPermisos = [...permisos];
            const fechaModificacion = new Date().toLocaleString();
            const fechaCarga = newPermisos[index].fechaObservacion ? newPermisos[index].fechaObservacion : fechaModificacion;

            // Si la observación ya tiene fecha de carga, solo se actualiza la fecha de modificación
            newPermisos[index].observacion = observacion;  // Agregar/editar la observación
            newPermisos[index].ultimaModificacionObservacion = fechaModificacion;  // Registrar la fecha de última modificación
            newPermisos[index].fechaObservacion = fechaCarga;  // Registrar la fecha de carga de la observación

            setPermisos(newPermisos);
        }
    };

    // Función para agregar un nuevo permiso
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
                fechasDeCargaActa: actasArchivo ? [new Date().toLocaleString()] : [],
                fechaObservacion: permisoData.observacion ? fechaCarga : null, // Fecha de carga de observación
                ultimaModificacionObservacion: null // Nueva propiedad para registrar la última modificación
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


    // Función para eliminar el archivo del permiso
    const handleEliminarPermisoArchivo = () => {
        if (selectedPermisoIndex !== null) {
            const newPermisos = [...permisos];
            const newDate = new Date().toLocaleString(); // Obtiene la fecha actual

            if (!newPermisos[selectedPermisoIndex].fechasDeEliminacion) {
                newPermisos[selectedPermisoIndex].fechasDeEliminacion = [];
            }

            newPermisos[selectedPermisoIndex].fechasDeEliminacion.push(newDate);
            newPermisos[selectedPermisoIndex].actasArchivo = null;
            setPermisos(newPermisos);
        }

        setConfirmDeletePermisoModal(false);
        setSelectedPermisoIndex(null);
    };

    // Función para cerrar el modal sin eliminar
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
                                setActasArchivo(file); // Asigna el archivo al estado
                                setNombreActaArchivo(file.name); // Almacena el nombre del archivo
                            }}
                            accept=".pdf,.doc,.docx"
                            className="mt-1 mb-2 text-sm w-full border border-gray-300 rounded p-1"
                        />

                        <div className="flex justify-center mt-2">
                            <button
                                onClick={handleAgregarPermiso}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
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
                                                {/* Tipo de permiso */}
                                                <p className="text-sm max-w-full break-words">
                                                    <strong>Tipo de permiso:</strong> {item.tipo}
                                                </p>

                                                {/* Motivo */}
                                                <p className="text-sm max-w-full break-words">
                                                    <strong>Motivo:</strong> {item.motivo}
                                                </p>

                                                {/* Autorizado Por */}
                                                <p className="text-sm max-w-full break-words">
                                                    <strong>Autorizado Por:</strong> {item.autorizadoPor}
                                                </p>

                                                {/* Observación */}
                                                <div className="flex flex-wrap justify-between items-start mt-2">
                                                    {isEditingObservacion === index ? (
                                                        <>
                                                            {/* Campo de edición de observación */}
                                                            <p className="text-sm"><strong>Observación:</strong></p>
                                                            <textarea
                                                                value={newObservacion}
                                                                onChange={(e) => {
                                                                    setNewObservacion(e.target.value);
                                                                    setIsObservacionModified(e.target.value !== item.observacion);  // Actualizamos si hubo cambios
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
                                                    <p className="text-sm text-gray-600 mt-1 max-w-full break-words">
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
                                                            const newDate = new Date().toLocaleString(); // Obtiene la fecha actual

                                                            // Asignar el archivo a la entrada correspondiente
                                                            newPermisos[index].actasArchivo = e.target.files[0];

                                                            // Si no existe la fecha de carga, asignamos la fecha de carga
                                                            if (!newPermisos[index].fechaCarga) {
                                                                newPermisos[index].fechaCarga = newDate; // Asigna la fecha de carga
                                                            }

                                                            // Si no existe la fecha de carga de acta, la asignamos ahora
                                                            if (!newPermisos[index].fechasDeCargaActa) {
                                                                newPermisos[index].fechasDeCargaActa = []; // Inicializa el arreglo si no existe
                                                            }

                                                            // Registra la fecha de carga de acta solo si el archivo se carga por primera vez
                                                            newPermisos[index].fechasDeCargaActa.push(newDate);

                                                            setPermisos(newPermisos); // Actualiza el estado
                                                        }}
                                                        accept=".pdf,.doc,.docx"
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
                                                            onClick={() => {
                                                                const input = document.createElement("input");
                                                                input.type = "file";
                                                                input.accept = ".pdf,.doc,.docx";

                                                                input.onchange = (e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const newPermisos = [...permisos];
                                                                        const newDate = new Date().toLocaleString(); // Fecha de edición

                                                                        // Si no existe el campo `fechasDeEdicion`, lo inicializamos como un arreglo
                                                                        if (!newPermisos[index].fechasDeEdicion) {
                                                                            newPermisos[index].fechasDeEdicion = [];
                                                                        }

                                                                        // Agregamos la nueva fecha de edición
                                                                        newPermisos[index].fechasDeEdicion.push(newDate);

                                                                        // Reemplaza el archivo con el nuevo
                                                                        newPermisos[index].actasArchivo = file;
                                                                        setPermisos(newPermisos);
                                                                    }
                                                                };

                                                                input.click(); // Abre el selector de archivos
                                                            }}
                                                            className="mt-2 ml-2 bg-orange-400 text-white p-2 rounded-full text-xs hover:bg-orange-500"
                                                        >
                                                            Editar Acta
                                                        </button>

                                                        {/* Botón de Eliminar */}
                                                        <button
                                                            onClick={() => {
                                                                // Abrimos el modal de confirmación de eliminación
                                                                setSelectedPermisoIndex(index); // Guardamos el índice del archivo
                                                                setConfirmDeletePermisoModal(true); // Abrimos el modal
                                                            }}
                                                            className="mt-2 ml-2 bg-red-400 text-white p-2 rounded-full text-xs hover:bg-red-500"
                                                        >
                                                            Eliminar Acta
                                                        </button>
                                                    </>
                                                )}

                                                <div>
                                                    {/* Mostrar la fecha de carga solo si existe */}
                                                    {item.fechaCarga && (
                                                        <p className="text-sm text-gray-500 mt-2 max-w-full break-words">
                                                            <strong>Fecha de carga:</strong> {item.fechaCarga}
                                                        </p>
                                                    )}

                                                    {/* Mostrar la fecha de carga de acta solo si existe */}
                                                    {item.fechasDeCargaActa && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500 max-w-full break-words">
                                                                <strong>Fecha de carga de acta:</strong>
                                                            </p>
                                                            <ul className="list-disc list-inside">
                                                                {item.fechasDeCargaActa.map((fecha, index) => (
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
                                                    {item.fechasDeEdicion && item.fechasDeEdicion.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500 max-w-full break-words">
                                                                <strong>Fecha de edición:</strong>
                                                            </p>
                                                            <ul className="list-disc list-inside">
                                                                {item.fechasDeEdicion.map((fecha, index) => (
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
                                                    {item.fechasDeEliminacion &&
                                                        item.fechasDeEliminacion.length > 0 && (
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500 max-w-full break-words">
                                                                    <strong>Fecha de eliminación:</strong>
                                                                </p>
                                                                <ul className="list-disc list-inside">
                                                                    {item.fechasDeEliminacion.map((fecha, index) => (
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
