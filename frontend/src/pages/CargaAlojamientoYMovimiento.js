import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CargaAlojamientoYMovimiento = () => {
    const [alojamientoActual, setAlojamientoActual] = useState({
        pabellon: '',
        celda: ''
    });

    const [realojamientos, setRealojamientos] = useState([]);
    const [realojamientoData, setRealojamientoData] = useState({
        sector: '',
        pabellon: '',
        observacion: '',
        celda: '',
        fechaIngreso: '',
        motivoRealojamiento: ''
    });

    const handleEliminarRealojamientoArchivo = () => {
        const newRealojamientos = [...realojamientos];
        const newDate = new Date().toLocaleString();

        newRealojamientos[selectedRealojamientoIndex].actasArchivo = null;
        newRealojamientos[selectedRealojamientoIndex].fechasDeEliminacion = [newDate];

        setRealojamientos(newRealojamientos);
        setConfirmDeleteRealojamientoModal(false);
    };

    const [editingIndex, setEditingIndex] = useState(null);
    const [editedFechaEgreso, setEditedFechaEgreso] = useState('');

    const [confirmDeleteRealojamientoModal, setConfirmDeleteRealojamientoModal] = useState(false);
    const [selectedRealojamientoIndex, setSelectedRealojamientoIndex] = useState(null);

    const [actasArchivo, setActasArchivo] = useState(null);
    const [nombreActaArchivo, setNombreActaArchivo] = useState('');

    const [errors, setErrors] = useState({
        realojamientos: {
            sector: '',
            pabellon: '',
            celda: ''
        }
    });

    const navigate = useNavigate();

    const actualizarAlojamientoActual = (pabellon, celda) => {
        setAlojamientoActual({ pabellon, celda });
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
                fechaCarga,
                fechaEgreso: '',
                fechaCargaEgreso: '',
                actasArchivo,
                nombreActaArchivo,
                fechaCargaActa: actasArchivo ? new Date().toLocaleString() : null,
                fechasDeCargaActa: actasArchivo ? [new Date().toLocaleString()] : [],
            };

            setRealojamientos(prevRealojamientos => {
                return [...prevRealojamientos, nuevoRealojamiento];
            });

            actualizarAlojamientoActual(realojamientoData.pabellon, realojamientoData.celda);

            setRealojamientoData({ sector: '', pabellon: '', observacion: '', celda: '', fechaIngreso: '', motivoRealojamiento: '' });
            setActasArchivo(null);
            setNombreActaArchivo('');
            document.querySelector('input[type="file"]').value = '';

            setErrors(prevErrors => ({
                ...prevErrors,
                realojamientos: { sector: '', pabellon: '', celda: '' }
            }));
        }
    };

    const handleEditClick = (index, fechaEgreso) => {
        setEditingIndex(index);
        setEditedFechaEgreso(fechaEgreso || '');
    };

    const handleSaveClick = (index) => {
        const newRealojamientos = [...realojamientos];
        newRealojamientos[index].fechaEgreso = editedFechaEgreso;
        newRealojamientos[index].fechaCargaEgreso = new Date().toLocaleString();
        setRealojamientos(newRealojamientos);
        setEditingIndex(null);
        setEditedFechaEgreso('');
        actualizarAlojamientoActual(newRealojamientos[index].pabellon, newRealojamientos[index].celda);
    };

    const handleVolver = () => {
        navigate('/general');
    };

    const handleCloseDeleteRealojamientoModal = () => {
        setConfirmDeleteRealojamientoModal(false);
        setSelectedRealojamientoIndex(null);
    };
    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className='bg-white p-4 rounded-md shadow-md'>
                <h1 className="text-xl font-bold mb-4">Carga de Alojamiento y Movimiento</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


                    {/* Realojamiento */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 ">
                        <h2 className="mb-4 flex items-center bg-white p-4 rounded-md shadow-md border border-gray-300 mt-4">
                            <span className="font-bold text-sm mr-2">Lugar de alojamiento actual:</span>
                            <span className="text-sm border border-gray-300 bg-gray-100 p-2 rounded">
                                Pabellón: {alojamientoActual.pabellon || 'No disponible'} - Celda: {alojamientoActual.celda || 'No disponible'}
                            </span>
                        </h2>

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
                                setActasArchivo(file);
                                setNombreActaArchivo(file.name);
                            }}
                            accept=".pdf"
                            className="mt-1 mb-2 text-sm w-full border border-gray-300 rounded p-1"
                        />

                        <div className="flex justify-center mt-2">
                            <button
                                onClick={handleAgregarRealojamiento}
                                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                    </div>


                    {/* Historial de Realojamientos */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
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

                                            {/* Mostrar la fecha de carga solo si existe */}
                                            {item.fechaCarga && (
                                                <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                            )}

                                            <span className="text-sm"><strong>Acta:</strong></span>

                                            {!item.actasArchivo ? (
                                                <input
                                                    type="file"
                                                    onChange={(e) => {
                                                        const newRealojamientos = [...realojamientos];
                                                        const newDate = new Date().toLocaleString();

                                                        newRealojamientos[index].actasArchivo = e.target.files[0];

                                                        if (!newRealojamientos[index].fechaCarga) {
                                                            newRealojamientos[index].fechaCarga = newDate;
                                                        }

                                                        newRealojamientos[index].fechasDeEdicion = [];
                                                        newRealojamientos[index].fechasDeEliminacion = [];
                                                        newRealojamientos[index].fechasDeCargaActa = [newDate];

                                                        setRealojamientos(newRealojamientos);
                                                    }}
                                                    accept=".pdf"
                                                    className="mt-1 mb-2 text-sm ml-2 w-full border border-gray-300 rounded p-1"
                                                />

                                            ) : (
                                                <>
                                                    <a
                                                        href={URL.createObjectURL(item.actasArchivo)}
                                                        download={item.actasArchivo.name}
                                                        className="mt-2 ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                    >
                                                        Descargar Acta
                                                    </a>

                                                    <button
                                                        onClick={() => {
                                                            const input = document.createElement("input");
                                                            input.type = "file";
                                                            input.accept = ".pdf";

                                                            input.onchange = (e) => {
                                                                const file = e.target.files[0];
                                                                if (file) {
                                                                    const newRealojamientos = [...realojamientos];
                                                                    const newDate = new Date().toLocaleString();

                                                                    newRealojamientos[index].fechasDeEdicion = [newDate]; 

                                                                    newRealojamientos[index].actasArchivo = file;
                                                                    setRealojamientos(newRealojamientos);
                                                                }
                                                            };

                                                            input.click();
                                                        }}
                                                        className="mt-2 ml-2 bg-orange-400 text-white p-2 rounded-full text-xs hover:bg-orange-500"
                                                    >
                                                        Editar Acta
                                                    </button>



                                                    <button
                                                        onClick={() => {
                                                            setSelectedRealojamientoIndex(index);
                                                            setConfirmDeleteRealojamientoModal(true);
                                                        }}
                                                        className="mt-2 ml-2 bg-red-400 text-white p-2 rounded-full text-xs hover:bg-red-500"
                                                    >
                                                        Eliminar Acta
                                                    </button>

                                                </>
                                            )}

                                            <div>

                                                {/* Mostrar solo la última fecha de carga de acta */}
                                                {item.fechasDeCargaActa && item.fechasDeCargaActa.length > 0 && (
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500"><strong>Fecha de carga acta:</strong> {item.fechasDeCargaActa[0]}</p>
                                                    </div>
                                                )}

                                                {/* Mostrar las fechas de edición solo si hay al menos una */}
                                                {item.fechasDeEdicion && item.fechasDeEdicion.length > 0 && (
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500"><strong>Fecha de edición acta:</strong> {item.fechasDeEdicion[0]}</p>
                                                    </div>
                                                )}

                                                {/* Mostrar las fechas de eliminación solo si hay al menos una */}
                                                {item.fechasDeEliminacion && item.fechasDeEliminacion.length > 0 && (
                                                    <div className="mt-2">
                                                        <p className="text-sm text-gray-500"><strong>Fecha de eliminación acta:</strong> {item.fechasDeEliminacion[0]}</p>
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
