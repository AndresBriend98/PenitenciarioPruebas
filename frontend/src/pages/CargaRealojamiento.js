import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CargaRealojamiento = () => {
    const handleAgregarRealojamiento = () => {
        if (validateForm()) {
            const fechaCarga = new Date().toLocaleString();

            const RealojamientoConFecha = {
                ...RealojamientoData,
                fechaCarga,
                nombreActaArchivo: RealojamientoData.actaOficio ? RealojamientoData.actaOficio.name : '',
                fechaCargaActa: RealojamientoData.actaOficio ? fechaCarga : null,
                fechasDeCargaActa: RealojamientoData.actaOficio ? [fechaCarga] : [],
            };

            setHistorialRealojamientos([...historialRealojamientos, RealojamientoConFecha]);

            setRealojamientoData({
                numeroActa: '',
                fechaRealojamiento: '',
                patenteMovil: '',
                horarioRealojamiento: '',
                lugarDestino: '',
                motivoRealojamiento: '',
                encargados: [],
                chofer: {
                    nombrecompleto: '',
                    dni: '',
                },
                actaOficio: null,
            });

            document.querySelector('input[type="file"]').value = '';
        }
    };
    const handleFileChange = (e, index) => {
        const file = e.target.files[0];
        if (file) {
            const newHistorial = [...historialRealojamientos];

            if (!newHistorial[index]) {
                newHistorial[index] = {};
            }

            newHistorial[index].fechasDeEdicionActa = [];
            newHistorial[index].fechasDeEliminacionActa = [];
            newHistorial[index].actaOficio = file;
            newHistorial[index].nombreActaArchivo = file.name;
            newHistorial[index].fechaCarga = new Date().toLocaleString();

            if (!newHistorial[index].fechasDeCargaActa) {
                newHistorial[index].fechasDeCargaActa = [];
            }

            newHistorial[index].fechasDeCargaActa.push(new Date().toLocaleString());

            setHistorialRealojamientos(newHistorial);
        }
    };

    const handleEditActa = (index) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".pdf";

        input.onchange = (e) => {
            const newHistorial = [...historialRealojamientos];
            const file = e.target.files[0];

            if (file) {
                newHistorial[index].actaOficio = file;
                newHistorial[index].nombreActaArchivo = file.name;

                if (!newHistorial[index].fechasDeEdicionActa) {
                    newHistorial[index].fechasDeEdicionActa = [];
                }

                newHistorial[index].fechasDeEdicionActa = [new Date().toLocaleString()];

                setHistorialRealojamientos(newHistorial);
            }
        };

        input.click();
    };

    const handleConfirmDeleteActa = () => {
        const newHistorial = [...historialRealojamientos];

        if (newHistorial[actaToDelete]) {
            newHistorial[actaToDelete] = {
                ...newHistorial[actaToDelete],
                actaOficio: null,
                nombreActaArchivo: null,
                fechasDeEliminacionActa: [new Date().toLocaleString()],
            };
        }

        setHistorialRealojamientos(newHistorial);
        setConfirmDeleteActaModal(false);
    };

    const [RealojamientoData, setRealojamientoData] = useState({
        numeroActa: '',
        fechaRealojamiento: '',
        patenteMovil: '',
        horarioRealojamiento: '',
        lugarDestino: '',
        motivoRealojamiento: '',
        encargados: [],
        chofer: {
            nombrecompleto: '',
            dni: '',
        },
        actaOficio: null,
    });

    const [nuevoEncargado, setNuevoEncargado] = useState({
        nombrecompleto: '',
        dni: '',
    });

    const [errors, setErrors] = useState({
        numeroActa: '',
        fechaRealojamiento: '',
        patenteMovil: '',
        horarioRealojamiento: '',
        lugarDestino: '',
        motivoRealojamiento: '',
        encargado: {
            nombrecompleto: '', dni: '',
        },
        chofer: {
            nombrecompleto: '',
            dni: '',
        },
    });

    const handleNuevoEncargadoChange = (e) => {
        const { name, value } = e.target;
        setNuevoEncargado({ ...nuevoEncargado, [name]: value });
    };

    const handleAgregarEncargado = () => {
        const newErrors = { ...errors };
        let isValid = true;

        if (!nuevoEncargado.nombrecompleto) {
            newErrors.encargado.nombrecompleto = 'Nombre y Apellido de la custodia es requerido';
            isValid = false;
        } else {
            newErrors.encargado.nombrecompleto = '';
        }

        if (!nuevoEncargado.dni) {
            newErrors.encargado.dni = 'DNI de la custodia es requerido';
            isValid = false;
        } else {
            newErrors.encargado.dni = '';
        }

        setErrors(newErrors);
        if (isValid) {
            setRealojamientoData({
                ...RealojamientoData,
                encargados: [...RealojamientoData.encargados, nuevoEncargado],
            });
            setNuevoEncargado({ nombrecompleto: '', dni: '' });
        }
    };

    const handleEliminarEncargado = (index) => {
        const nuevosEncargados = RealojamientoData.encargados.filter((_, i) => i !== index);
        setRealojamientoData({ ...RealojamientoData, encargados: nuevosEncargados });
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {
            numeroActa: '',
            fechaRealojamiento: '',
            patenteMovil: '',
            horarioRealojamiento: '',
            lugarDestino: '',
            motivoRealojamiento: '',
            encargado: {
                nombrecompleto: '', dni: '',
            },
            chofer: {
                nombrecompleto: '',
                dni: '',
            },
        };

        if (!RealojamientoData.numeroActa) {
            newErrors.numeroActa = 'Número de acta es requerido';
            isValid = false;
        }

        if (!RealojamientoData.fechaRealojamiento) {
            newErrors.fechaRealojamiento = 'Fecha de Realojamiento es requerida';
            isValid = false;
        }

        if (!RealojamientoData.patenteMovil) {
            newErrors.patenteMovil = 'Patente del móvil es requerida';
            isValid = false;
        }

        if (!RealojamientoData.horarioRealojamiento) {
            newErrors.horarioRealojamiento = 'Horario del Realojamiento es requerido';
            isValid = false;
        }

        if (!RealojamientoData.lugarDestino) {
            newErrors.lugarDestino = 'Lugar de destino es requerido';
            isValid = false;
        }

        if (!RealojamientoData.motivoRealojamiento) {
            newErrors.motivoRealojamiento = 'Motivo del Realojamiento es requerido';
            isValid = false;
        }

        if (RealojamientoData.encargados.length === 0) {
            newErrors.encargado.nombrecompleto = 'Nombre de la custodia es requerido';
            newErrors.encargado.dni = 'DNI de la custodia es requerido';
            isValid = false;
        }

        if (!RealojamientoData.chofer.nombrecompleto) {
            newErrors.chofer.nombrecompleto = 'Nombre del chofer es requerido';
            isValid = false;
        }

        if (!RealojamientoData.chofer.dni) {
            newErrors.chofer.dni = 'DNI del chofer es requerido';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const navigate = useNavigate();
    const [confirmDeleteActaModal, setConfirmDeleteActaModal] = useState(false);
    const [actaToDelete, setActaToDelete] = useState(null);
    const handleOpenDeleteActaModal = (index) => {
        setActaToDelete(index); setConfirmDeleteActaModal(true);
    };

    const handleCloseDeleteActaModal = () => {
        setConfirmDeleteActaModal(false);
    };

    const [historialRealojamientos, setHistorialRealojamientos] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRealojamientoData({
            ...RealojamientoData,
            [name]: value,
        });
    };

    const handleChoferChange = (e) => {
        const { name, value } = e.target;
        setRealojamientoData({
            ...RealojamientoData,
            chofer: {
                ...RealojamientoData.chofer,
                [name]: value,
            },
        });
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            {confirmDeleteActaModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg text-center w-full max-w-md mx-4 md:mx-0 max-h-screen overflow-auto">
                        <h2 className="text-lg font-bold mb-4 text-red-600">Confirmar Eliminación</h2>
                        <p>¿Estás seguro de que deseas eliminar este acta? Esta acción no se puede deshacer.</p>
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={handleConfirmDeleteActa}
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                            >
                                Eliminar
                            </button>
                            <button
                                onClick={handleCloseDeleteActaModal}
                                className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Header />
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-xl font-bold mb-4">Carga de Realojamiento</h1>
                <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4">
                    {/* Campos para agregar encargados */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4">
                        <h2 className="text-l font-bold mb-2">Custodia del Realojamiento</h2>

                        <div className="mb-2">
                            <label className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                            <input
                                type="text"
                                name="nombrecompleto"
                                value={nuevoEncargado.nombrecompleto}
                                onChange={handleNuevoEncargadoChange}
                                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                                placeholder="Nombre/s y Apellido/s"
                            />
                            {errors.encargado.nombrecompleto && (
                                <span className="text-red-500 text-sm">{errors.encargado.nombrecompleto}</span>
                            )}
                        </div>

                        {/* DNI */}
                        <div className="mb-2">
                            <label className="block text-sm font-semibold mb-1">DNI</label>
                            <input
                                type="number"
                                name="dni"
                                value={nuevoEncargado.dni}
                                onChange={handleNuevoEncargadoChange}
                                className="w-full p-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                                placeholder="DNI del encargado"
                            />
                            {errors.encargado.dni && (
                                <span className="text-red-500 text-sm">{errors.encargado.dni}</span>
                            )}
                        </div>

                        {/* Botón de agregar encargado */}
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleAgregarEncargado}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Agregar Custodia
                            </button>
                        </div>

                        {/* Mostrar encargados agregados */}
                        {RealojamientoData.encargados.length > 0 && (
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50">
                                <h3 className="text-sm font-bold mb-2">Custodias Agregados</h3>
                                <ul className="space-y-2">
                                    {RealojamientoData.encargados.map((encargado, index) => (
                                        <li key={index} className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 flex flex-col items-start space-y-2">
                                            {/* Información del encargado */}
                                            <div className="flex justify-between items-center w-full">
                                                <span className="text-sm">
                                                    <strong>Nombre/s y Apellido/s: </strong>{encargado.nombrecompleto} -
                                                    <strong> DNI: </strong>{encargado.dni}
                                                </span>
                                            </div>

                                            <div className="flex justify-start w-full">
                                                <button
                                                    onClick={() => handleEliminarEncargado(index)}
                                                    className="bg-red-400 text-white px-2 py-1 rounded text-xs sm:text-xs hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4">
                        <h2 className="text-l font-bold mb-2">Chofer</h2>

                        <label className="block text-sm font-semibold mb-2">Nombre/s y Apellido/s</label>
                        <input
                            type="text"
                            id="choferNombre"
                            name="nombrecompleto"
                            value={RealojamientoData.chofer ? RealojamientoData.chofer.nombrecompleto : ''} onChange={handleChoferChange}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />{errors.chofer.nombrecompleto && (
                            <p className="text-red-500 text-sm">{errors.chofer.nombrecompleto}</p>
                        )}


                        <label className="block text-sm font-semibold mt-2 mb-2">DNI</label>
                        <input
                            type="number"
                            id="choferDNI"
                            name="dni"
                            value={RealojamientoData.chofer ? RealojamientoData.chofer.dni : ''} onChange={handleChoferChange}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                        {errors.chofer.dni && (
                            <p className="text-red-500 text-sm">{errors.chofer.dni}</p>
                        )}
                    </div>

                    {/* Información del Realojamiento */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                            <label className="block text-sm font-semibold mb-2">Fecha de Realojamiento</label>
                            <input
                                type="date"
                                name="fechaRealojamiento"
                                value={RealojamientoData.fechaRealojamiento}
                                onChange={handleChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.fechaRealojamiento ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            />
                            {errors.fechaRealojamiento && <p className="text-red-500 text-sm">{errors.fechaRealojamiento}</p>}
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                            <label className="block text-sm font-semibold mb-2">Horario del Realojamiento</label>
                            <input
                                type="time"
                                name="horarioRealojamiento"
                                value={RealojamientoData.horarioRealojamiento}
                                onChange={handleChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.horarioRealojamiento ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            />
                            {errors.horarioRealojamiento && <p className="text-red-500 text-sm">{errors.horarioRealojamiento}</p>}
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                            <label className="block text-sm font-semibold mb-2">Número de Acta</label>
                            <input
                                type="text"
                                name="numeroActa"
                                value={RealojamientoData.numeroActa}
                                onChange={handleChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.numeroActa ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                                placeholder="Número de acta"
                            />
                            {errors.numeroActa && <p className="text-red-500 text-sm">{errors.numeroActa}</p>}
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                            <label className="block text-sm font-semibold mb-2">Patente del Móvil Utilizado</label>
                            <input
                                type="text"
                                name="patenteMovil"
                                value={RealojamientoData.patenteMovil}
                                onChange={handleChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.patenteMovil ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                                placeholder="Patente del móvil"
                            />
                            {errors.patenteMovil && <p className="text-red-500 text-sm">{errors.patenteMovil}</p>}
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                            <label className="block text-sm font-semibold">Lugar al Cual se Traslada</label>
                            <select
                                name="lugarDestino"
                                value={RealojamientoData.lugarDestino}
                                onChange={handleChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm mt-3 ${errors.lugarDestino ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="" disabled>Seleccionar unidad de destino</option>
                                {[...Array(12)].map((_, index) => (
                                    <option key={index} value={`Unidad ${index + 1}`}>
                                        Unidad {index + 1}
                                    </option>
                                ))}
                            </select>
                            {errors.lugarDestino && <p className="text-red-500 text-sm">{errors.lugarDestino}</p>}
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                            <label className="block text-sm font-semibold mb-2">Motivo de Realojamiento</label>
                            <textarea
                                name="motivoRealojamiento"
                                value={RealojamientoData.motivoRealojamiento}
                                onChange={handleChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.motivoRealojamiento ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                                rows="2"
                                placeholder="Motivo del Realojamiento"
                            />
                            {errors.motivoRealojamiento && <p className="text-red-500 text-sm">{errors.motivoRealojamiento}</p>}
                        </div>
                    </div>
                    <div className="mt-4 bg-white flex flex-col md:flex-row md:items-start md:justify-start bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <label className="block text-sm font-semibold mb-2 md:mb-0 md:mr-5">Subir Ácta / Oficio</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            accept=".pdf"
                            className="mt-1 mb-2 text-sm border border-gray-300 rounded p-1 w-full"
                        />

                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleAgregarRealojamiento}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>

                </div>
                {/* Historial de Realojamientos */}
                <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                    <h3 className="text-sm font-bold mt-4">Historial de Realojamientos</h3>
                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {historialRealojamientos.length > 0 ? (
                            <ul className="mt-2">
                                {historialRealojamientos.map((Realojamiento, index) => (
                                    <li key={index} className="border border-gray-300 p-2 mb-2 rounded bg-white shadow-sm">
                                        <div className="text-sm">
                                            {/* Renderización dinámica de encargados */}
                                            {Realojamiento.encargados.length === 1 ? (
                                                <div>
                                                    <strong className="text-sm">Custodia:</strong>  <strong>Nombre/s y Apellido/s: </strong>{Realojamiento.encargados[0].nombrecompleto} - <strong>DNI:</strong>  {Realojamiento.encargados[0].dni}
                                                </div>
                                            ) : (
                                                <div>
                                                    {Realojamiento.encargados.map((encargado, encargadoIndex) => (
                                                        <div key={encargadoIndex}>
                                                            <strong className="text-sm">Encargado {encargadoIndex + 1}:</strong> <strong>Nombre/s y Apellido/s:</strong> {encargado.nombrecompleto} - <strong>DNI:</strong>  {encargado.dni}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="text-sm">
                                            <strong className="text-sm">Chofer:</strong> {Realojamiento.chofer.nombrecompleto} {Realojamiento.chofer.apellidos}, <strong className="text-sm">DNI: </strong>{Realojamiento.chofer.dni}
                                        </div>
                                        <div className="text-sm"><strong className="text-sm">Patente del Móvil:</strong> {Realojamiento.patenteMovil}</div>
                                        <div className="text-sm"><strong className="text-sm">Lugar de Destino:</strong> {Realojamiento.lugarDestino}</div>
                                        <div className="text-sm"><strong className="text-sm">Motivo del Realojamiento:</strong> {Realojamiento.motivoRealojamiento}</div>
                                        <div className="text-sm"><strong className="text-sm">Número de Acta:</strong> {Realojamiento.numeroActa}</div>
                                        <div className="text-sm"><strong className="text-sm">Fecha de Realojamiento:</strong> {Realojamiento.fechaRealojamiento}</div>
                                        <div className="text-sm"><strong className="text-sm">Horario del Realojamiento:</strong> {Realojamiento.horarioRealojamiento}</div>
                                        {/* Mostrar la fecha de carga solo si existe */}
                                        {Realojamiento.fechaCarga && (
                                            <p className="text-sm text-gray-500 mt-2 mb-2"><strong>Fecha de carga:</strong> {Realojamiento.fechaCarga}</p>
                                        )}
                                        {Realojamiento.actaOficio ? (
                                            <div>
                                                <p className="text-sm mt-1"><strong>Acta/Oficio:</strong></p>
                                                <a
                                                    href={URL.createObjectURL(Realojamiento.actaOficio)}
                                                    download={Realojamiento.nombreActaArchivo}
                                                    className="mt-2 ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                >
                                                    Descargar Acta/Oficio
                                                </a>

                                                {/* Botones Editar y Eliminar */}
                                                <button
                                                    onClick={() => handleEditActa(index)}
                                                    className="mt-2 ml-2 bg-orange-400 text-white p-2 rounded-full text-xs hover:bg-orange-500"
                                                >
                                                    Editar Acta/Oficio
                                                </button>
                                                <button
                                                    onClick={() => handleOpenDeleteActaModal(index)}
                                                    className="mt-2 ml-2 bg-red-400 text-white p-2 rounded-full text-xs hover:bg-red-500"
                                                >
                                                    Eliminar Acta/Oficio
                                                </button>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className="text-sm"><strong>Subir Acta/Oficio:</strong></span>
                                                <input
                                                    type="file"
                                                    onChange={(e) => {
                                                        const newHistorial = [...historialRealojamientos];
                                                        const file = e.target.files[0];

                                                        if (file) {
                                                            if (!newHistorial[index].fechasDeCargaActa) {
                                                                newHistorial[index].fechasDeCargaActa = [];
                                                            }

                                                            newHistorial[index].fechasDeEdicionActa = [];
                                                            newHistorial[index].fechasDeEliminacionActa = [];
                                                            newHistorial[index].fechasDeCargaActa.push(new Date().toLocaleString());
                                                            newHistorial[index].actaOficio = file;
                                                            newHistorial[index].nombreActaArchivo = file.name;
                                                            newHistorial[index].fechaEdicionActa = null;

                                                            setHistorialRealojamientos(newHistorial);
                                                        }
                                                    }}
                                                    accept=".pdf"
                                                    className="mt-1 mb-2 text-sm border border-gray-300 rounded p-1 w-full"
                                                />
                                            </div>
                                        )}

                                        {Realojamiento.fechasDeCargaActa && Realojamiento.fechasDeCargaActa.length > 0 && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                <strong>Fecha de carga Acta/Oficio:</strong> {Realojamiento.fechasDeCargaActa[Realojamiento.fechasDeCargaActa.length - 1]}
                                            </p>
                                        )}

                                        {/* Mostrar fechas de edición solo si existen */}
                                        {Realojamiento.fechasDeEdicionActa && Realojamiento.fechasDeEdicionActa.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    <strong>Fecha de edición Acta/Oficio:</strong> {Realojamiento.fechasDeEdicionActa[Realojamiento.fechasDeEdicionActa.length - 1]}
                                                </p>
                                            </div>
                                        )}

                                        {/* Mostrar fechas de eliminación solo si existen */}
                                        {Realojamiento.fechasDeEliminacionActa && Realojamiento.fechasDeEliminacionActa.length > 0 && (
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    <strong>Fecha de eliminación Acta/Oficio:</strong> {Realojamiento.fechasDeEliminacionActa[Realojamiento.fechasDeEliminacionActa.length - 1]}
                                                </p>
                                            </div>
                                        )}

                                    </li>

                                ))}

                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 text-center">
                                No hay realojamientos registrados aún.
                            </p>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => navigate('/general')}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menu Principal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaRealojamiento;
