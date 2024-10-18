import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaPermisos = () => {
    const [confirmDeletePermisoModal, setConfirmDeletePermisoModal] = useState(false);
    const [selectedPermisoIndex, setSelectedPermisoIndex] = useState(null);

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
                fechaCargaActa: actasArchivo ? new Date().toLocaleString() : null, // Aquí se genera la fecha de carga del acta
                fechasDeCargaActa: actasArchivo ? [new Date().toLocaleString()] : [], // Aquí se agrega la fecha de carga del acta a un array
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

            // Verificamos si la propiedad `fechasDeEliminacion` existe, si no, la inicializamos como arreglo
            if (!newPermisos[selectedPermisoIndex].fechasDeEliminacion) {
                newPermisos[selectedPermisoIndex].fechasDeEliminacion = [];
            }

            // Se agrega la nueva fecha de eliminación al arreglo de fechasDeEliminacion
            newPermisos[selectedPermisoIndex].fechasDeEliminacion.push(newDate);

            // Se elimina el archivo adjunto y se mantiene el registro de fechas
            newPermisos[selectedPermisoIndex].actasArchivo = null;  // Elimina el archivo
            setPermisos(newPermisos);  // Actualiza el estado con la nueva fecha y archivo eliminado
        }

        setConfirmDeletePermisoModal(false); // Cierra el modal
        setSelectedPermisoIndex(null); // Resetea el índice
    };

    // Función para cerrar el modal sin eliminar
    const handleCloseDeletePermisoModal = () => {
        setConfirmDeletePermisoModal(false); // Cierra el modal sin eliminar
        setSelectedPermisoIndex(null); // Resetea el índice
    };

    // Estado para manejar el archivo del permiso
    const [actasArchivo, setActasArchivo] = useState(null);
    const [nombreActaArchivo, setNombreActaArchivo] = useState('');

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        permisos: {
            tipo: '',
            motivo: '',
            autorizadoPor: ''
        }
    });

    const [permisoData, setPermisoData] = useState({ tipo: '', motivo: '', observacion: '', autorizadoPor: '' });
    const [permisos, setPermisos] = useState([]);

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className='bg-white p-4 rounded-md shadow-md'>
                <h1 className="text-2xl font-bold mb-4">Carga de Permisos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Permisos */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-bold">Permisos</h2>

                        <label className="block text-sm font-semibold mt-2 mb-2">Tipo de Permiso</label>
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

                    {/* Historial de Permisos */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-sm font-bold mt-4">Historial de Permisos</h3>
                        <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-96 overflow-y-auto">
                            {permisos.length > 0 ? (
                                <ul className="mt-2">
                                    {permisos.map((item, index) => (
                                        <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                            <p className="text-sm"><strong>Tipo de permiso:</strong> {item.tipo}</p>
                                            <p className="text-sm"><strong>Motivo:</strong> {item.motivo}</p>
                                            <p className="text-sm"><strong>Autorizado Por:</strong> {item.autorizadoPor}</p>

                                            <span className="text-sm"><strong>Acta:</strong></span>

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
                                                            setSelectedPermisoIndex(index);  // Guardamos el índice del archivo
                                                            setConfirmDeletePermisoModal(true);  // Abrimos el modal
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
                                                    <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                                )}

                                                {/* Mostrar la fecha de carga de acta solo si existe */}
                                                {item.fechasDeCargaActa && (
                                                    <div className="mt-2">
                                                        <p className='text-sm text-gray-500'><strong>Fecha de carga de acta:</strong></p>
                                                        <ul className="list-disc list-inside">
                                                            {item.fechasDeCargaActa.map((fecha, index) => (
                                                                <li key={index} className="text-sm text-gray-500">{fecha}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Mostrar las fechas de edición solo si hay al menos una */}
                                                {item.fechasDeEdicion && item.fechasDeEdicion.length > 0 && (
                                                    <div className="mt-2">
                                                        <p className='text-sm text-gray-500'><strong>Fecha de edición:</strong></p>
                                                        <ul className="list-disc list-inside">
                                                            {item.fechasDeEdicion.map((fecha, index) => (
                                                                <li key={index} className="text-sm text-gray-500">{fecha}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Mostrar las fechas de eliminación solo si hay al menos una */}
                                                {item.fechasDeEliminacion && item.fechasDeEliminacion.length > 0 && (
                                                    <div className="mt-2">
                                                        <p className='text-sm text-gray-500'><strong>Fecha de eliminación:</strong></p>
                                                        <ul className="list-disc list-inside">
                                                            {item.fechasDeEliminacion.map((fecha, index) => (
                                                                <li key={index} className="text-sm text-gray-500">{fecha}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}
                                            </div>

                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center">No hay permisos registrados.</p>
                            )}
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
