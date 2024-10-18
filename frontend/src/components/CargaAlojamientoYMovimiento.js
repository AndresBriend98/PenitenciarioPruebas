import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaAlojamientoYMovimiento = () => {
    const [confirmDeleteRealojamientoModal, setConfirmDeleteRealojamientoModal] = useState(false);
    const [selectedRealojamientoIndex, setSelectedRealojamientoIndex] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null); // Para saber qué ítem se está editando
    const [editedFechaEgreso, setEditedFechaEgreso] = useState(''); // Estado para la fecha de egreso editada

    const handleEditClick = (index, fechaEgreso) => {
        setEditingIndex(index);
        setEditedFechaEgreso(fechaEgreso || ''); // Si ya hay una fecha, la coloca; si no, lo pone vacío
    };

    const handleSaveClick = (index) => {
        console.log("Guardando fecha de egreso:", editedFechaEgreso, "para el index:", index);  // Verifica la fecha de egreso
        const newRealojamientos = [...realojamientos];
        newRealojamientos[index].fechaEgreso = editedFechaEgreso;
        newRealojamientos[index].fechaCargaEgreso = new Date().toLocaleString();
        setRealojamientos(newRealojamientos);
        setEditingIndex(null);
        setEditedFechaEgreso('');
    };    

    const handleEliminarRealojamientoArchivo = () => {
        if (selectedRealojamientoIndex !== null) {
            const newRealojamientos = [...realojamientos];
            const newDate = new Date().toLocaleString();

            if (!newRealojamientos[selectedRealojamientoIndex].fechasDeEliminacion) {
                newRealojamientos[selectedRealojamientoIndex].fechasDeEliminacion = [];
            }

            newRealojamientos[selectedRealojamientoIndex].fechasDeEliminacion.push(newDate);
            newRealojamientos[selectedRealojamientoIndex].actasArchivo = null;
            setRealojamientos(newRealojamientos);
        }

        setConfirmDeleteRealojamientoModal(false);
        setSelectedRealojamientoIndex(null);
    };


    const handleAgregarRealojamiento = () => {
        let hasErrors = false;
        const newErrors = { sector: '', pabellon: '', celda: '' };

        if (!realojamientoData.sector) {
            newErrors.sector = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!realojamientoData.pabellon) {
            newErrors.pabellon = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!realojamientoData.celda) {
            newErrors.celda = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!realojamientoData.fechaIngreso) {
            newErrors.fechaIngreso = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!realojamientoData.motivoRealojamiento) {
            newErrors.motivoRealojamiento = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                realojamientos: newErrors
            }));
        } else {
            const fechaCarga = new Date().toLocaleString();
            const nuevoRealojamiento = {
                ...realojamientoData,
                motivoRealojamiento: realojamientoData.motivoRealojamiento,
                fechaIngreso: realojamientoData.fechaIngreso,
                fechaCarga,
                fechaEgreso: '', // Inicializar la fecha de egreso vacía
                fechaCargaEgreso: '', // Inicializar la fecha de carga de egreso vacía
                actasArchivo: actasArchivo,
                nombreActaArchivo: nombreActaArchivo,
                fechaCargaActa: actasArchivo ? new Date().toLocaleString() : null,
                fechasDeCargaActa: actasArchivo ? [new Date().toLocaleString()] : [],
            };

            setRealojamientos(prevRealojamientos => {
                return [...prevRealojamientos, nuevoRealojamiento];
            });

            // Limpiar el formulario
            setRealojamientoData({ sector: '', pabellon: '', observacion: '', celda: '' });
            setActasArchivo(null);
            setNombreActaArchivo('');
            document.querySelector('input[type="file"]').value = '';

            setErrors(prevErrors => ({
                ...prevErrors,
                realojamientos: { sector: '', pabellon: '', celda: '' }
            }));
        }
    };

    const handleCloseDeleteRealojamientoModal = () => {
        setConfirmDeleteRealojamientoModal(false);
        setSelectedRealojamientoIndex(null);
    };

    const [actasArchivo, setActasArchivo] = useState(null);
    const [nombreActaArchivo, setNombreActaArchivo] = useState('');

    const navigate = useNavigate();

    const [errors, setErrors] = useState({
        realojamientos: {
            sector: '',
            pabellon: '',
            celda: ''
        }
    });

    const [realojamientoData, setRealojamientoData] = useState({ sector: '', pabellon: '', observacion: '', celda: '' });
    const [realojamientos, setRealojamientos] = useState([]);

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className='bg-white p-4 rounded-md shadow-md'>
                <h1 className="text-2xl font-bold mb-4">Carga de Alojamiento y Movimiento</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* Realojamiento */}
                    <div className="bg-white p-4 rounded-md shadow-md">

                        <label className="block text-sm font-semibold mt-2 mb-2">Sector</label>
                        <input
                            type="text"
                            value={realojamientoData.sector}
                            onChange={(e) => setRealojamientoData({ ...realojamientoData, sector: e.target.value })}
                            placeholder="Introduce el sector de realojamiento"
                            className={`w-full p-1 border ${errors.realojamientos.sector ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.realojamientos.sector && <p className="text-red-500 text-sm">{errors.realojamientos.sector}</p>}

                        <label className="block text-sm font-semibold mb-2">Pabellón</label>
                        <input
                            type="text"
                            value={realojamientoData.pabellon}
                            onChange={(e) => setRealojamientoData({ ...realojamientoData, pabellon: e.target.value })}
                            placeholder="Introduce el pabellon del realojamiento"
                            className={`w-full p-1 border ${errors.realojamientos.pabellon ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.realojamientos.pabellon && <p className="text-red-500 text-sm">{errors.realojamientos.pabellon}</p>}

                        <label className="block text-sm font-semibold mt-2 mb-2">Celda</label>
                        <input
                            type="text"
                            value={realojamientoData.celda}
                            onChange={(e) => setRealojamientoData({ ...realojamientoData, celda: e.target.value })}
                            placeholder="Introduce el nombre y apellido de quien realoja"
                            className={`w-full p-1 border ${errors.realojamientos.celda ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.realojamientos.celda && <p className="text-red-500 text-sm">{errors.realojamientos.celda}</p>}

                        <label className="block text-sm font-semibold mb-2">Fecha de Ingreso</label>
                        <input
                            type="date"
                            value={realojamientoData.fechaIngreso}
                            onChange={(e) => setRealojamientoData({ ...realojamientoData, fechaIngreso: e.target.value })}
                            className={`w-full p-1 border ${errors.realojamientos.fechaIngreso ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.realojamientos.fechaIngreso && <p className="text-red-500 text-sm">{errors.realojamientos.fechaIngreso}</p>}

                        <label className="block text-sm font-semibold mb-2">Motivo del Realojamiento</label>
                        <input
                            type="text"
                            value={realojamientoData.motivoRealojamiento}
                            onChange={(e) => setRealojamientoData({ ...realojamientoData, motivoRealojamiento: e.target.value })}
                            placeholder="Introduce el motivo del realojamiento"
                            className={`w-full p-1 border ${errors.realojamientos.motivoRealojamiento ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.realojamientos.motivoRealojamiento && <p className="text-red-500 text-sm">{errors.realojamientos.motivoRealojamiento}</p>}


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
                                onClick={handleAgregarRealojamiento}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                    </div>


                    {/* Historial de Realojamientos */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h3 className="text-sm font-bold mt-4">Historial de Alojamientos y Movimientos</h3>
                        <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-96 overflow-y-auto">
                            {realojamientos.length > 0 ? (
                                <ul className="mt-2">
                                    {realojamientos.map((item, index) => (
                                        <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                            <p className="text-sm"><strong>Sector:</strong> {item.sector}</p>
                                            <p className="text-sm"><strong>Pabellón:</strong> {item.pabellon}</p>
                                            <p className="text-sm"><strong>Celda:</strong> {item.celda}</p>
                                            <p className="text-sm"><strong>Fecha de ingreso:</strong> {item.fechaIngreso}</p>
                                            <p className="text-sm">
                                                {/* Fecha de egreso */}
                                                <p className="text-sm">
                                                    <strong className='text-sm'>Fecha de egreso: </strong>
                                                    {editingIndex === index ? (
                                                        <>
                                                            <input
                                                                type="date"
                                                                value={editedFechaEgreso}
                                                                onChange={(e) => setEditedFechaEgreso(e.target.value)}
                                                                className="p-1 border border-gray-300 rounded text-sm ml-1"
                                                            />
                                                            <button
                                                                onClick={() => handleSaveClick(index)}
                                                                className="bg-green-500 text-white p-1 rounded mt-1 hover:bg-green-600 text-xs ml-1"
                                                            >
                                                                Guardar
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            {/* Usa realojamientos[index] para acceder al dato correcto */}
                                                            {realojamientos[index].fechaEgreso || 'Sin definir'}
                                                            <button
                                                                onClick={() => handleEditClick(index, realojamientos[index].fechaEgreso)}
                                                                className={`ml-2 p-1 rounded text-xs text-white ${realojamientos[index].fechaEgreso ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-400 hover:bg-blue-500'}`}
                                                            >
                                                                {realojamientos[index].fechaEgreso ? 'Editar Fecha Egreso' : 'Agregar Fecha Egreso'}
                                                            </button>
                                                        </>
                                                    )}
                                                </p>
                                            </p>
                                            <p className="text-sm"><strong>Motivo del realojamiento:</strong> {item.motivoRealojamiento}</p>

                                            <span className="text-sm"><strong>Acta:</strong></span>

                                            {/* Si no hay archivo cargado */}
                                            {!item.actasArchivo ? (
                                                <input
                                                    type="file"
                                                    onChange={(e) => {
                                                        const newRealojamientos = [...realojamientos];
                                                        const newDate = new Date().toLocaleString(); // Obtiene la fecha actual

                                                        // Asignar el archivo a la entrada correspondiente
                                                        newRealojamientos[index].actasArchivo = e.target.files[0];

                                                        // Si no existe la fecha de carga, asignamos la fecha de carga
                                                        if (!newRealojamientos[index].fechaCarga) {
                                                            newRealojamientos[index].fechaCarga = newDate; // Asigna la fecha de carga
                                                        }

                                                        // Si no existe la fecha de carga de acta, la asignamos ahora
                                                        if (!newRealojamientos[index].fechasDeCargaActa) {
                                                            newRealojamientos[index].fechasDeCargaActa = []; // Inicializa el arreglo si no existe
                                                        }

                                                        // Registra la fecha de carga de acta solo si el archivo se carga por primera vez
                                                        newRealojamientos[index].fechasDeCargaActa.push(newDate);

                                                        setRealojamientos(newRealojamientos); // Actualiza el estado
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
                                                                    const newRealojamientos = [...realojamientos];
                                                                    const newDate = new Date().toLocaleString(); // Fecha de edición

                                                                    // Si no existe el campo `fechasDeEdicion`, lo inicializamos como un arreglo
                                                                    if (!newRealojamientos[index].fechasDeEdicion) {
                                                                        newRealojamientos[index].fechasDeEdicion = [];
                                                                    }

                                                                    // Agregamos la nueva fecha de edición
                                                                    newRealojamientos[index].fechasDeEdicion.push(newDate);

                                                                    // Reemplaza el archivo con el nuevo
                                                                    newRealojamientos[index].actasArchivo = file;
                                                                    setRealojamientos(newRealojamientos);
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
                                                            setSelectedRealojamientoIndex(index);  // Guardamos el índice del archivo
                                                            setConfirmDeleteRealojamientoModal(true);  // Abrimos el modal
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
                                <p className="text-sm text-gray-500 text-center">No hay realojamientos registrados.</p>
                            )}
                        </div>
                    </div>

                    {/* Modal de confirmación de eliminación */}
                    {confirmDeleteRealojamientoModal && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-md shadow-lg text-center w-full max-w-md mx-4 md:mx-0 max-h-screen overflow-auto">
                                <h2 className="text-lg font-bold mb-4 text-red-600">Confirmar Eliminación</h2>
                                <p>¿Estás seguro de que deseas eliminar este archivo? Esta acción no se puede deshacer.</p>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={handleEliminarRealojamientoArchivo}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={handleCloseDeleteRealojamientoModal}
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

export default CargaAlojamientoYMovimiento;
