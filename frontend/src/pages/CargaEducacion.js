import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CargaEducacion = () => {
    const [sabeLeer, setSabeLeer] = useState(false);
    const [sabeEscribir, setSabeEscribir] = useState(false);
    const [documentacion, setDocumentacion] = useState(false);
    const [nivelEducativo, setNivelEducativo] = useState("");
    const [archivosAdjuntos, setArchivosAdjuntos] = useState([]);
    const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
    const [isModalOpenArchivo, setIsModalOpenArchivo] = useState(false);
    const archivoInputRef = useRef(null);
    const [confirmDeleteHistorialModal, setConfirmDeleteHistorialModal] = useState(false);
    const [archivoAEliminar, setArchivoAEliminar] = useState(null);
    
    const handleEliminarActaArchivo = () => {
        if (archivoAEliminar !== null) {
            const nuevoHistorial = [...historialCurso];
            const archivoAEliminarIndex = archivoAEliminar;
            const archivo = nuevoHistorial[archivoAEliminarIndex];
            const fechaEliminacion = new Date().toLocaleString();
            archivo.fechaEliminacionArchivo = fechaEliminacion;
            archivo.archivoAdjunto = null;
            nuevoHistorial[archivoAEliminarIndex] = archivo;

            setHistorialCurso(nuevoHistorial);

            handleCloseDeleteHistorialModal();
        }
    };

    const handleArchivoAdjunto = (e, index) => {
        const archivoSeleccionado = e.target.files[0];

        if (archivoSeleccionado) {
            const nuevoHistorial = [...historialCurso];
            const registro = nuevoHistorial[index];

            if (registro.fechaEliminacionArchivo) {
                // Mantener la fecha de eliminación intacta
            }

            registro.archivoAdjunto = archivoSeleccionado;
            registro.fechaArchivoAdjunto = new Date().toLocaleString();

            registro.fechaEdicionArchivo = null;

            setHistorialCurso(nuevoHistorial);
        }
    };

    const handleCloseDeleteHistorialModal = () => {
        setConfirmDeleteHistorialModal(false);
        setArchivoAEliminar(null);
    };

    const handleOpenDeleteModal = (index) => {
        setArchivoAEliminar(index);
        setConfirmDeleteHistorialModal(true);
    };


    const handleArchivoSeleccionado = (e) => {
        const archivo = e.target.files[0];
        setArchivoSeleccionado(archivo);
    };

    const handleEditarArchivo = (index) => {
        const inputArchivo = document.createElement('input');
        inputArchivo.type = 'file';
        inputArchivo.accept = '.pdf';

        inputArchivo.onchange = (e) => {
            const archivoNuevo = e.target.files[0];

            const nuevoHistorial = [...historialCurso];
            nuevoHistorial[index] = {
                ...nuevoHistorial[index],
                archivoAdjunto: archivoNuevo,
                fechaEdicionArchivo: new Date().toLocaleString(),
            };

            setHistorialCurso(nuevoHistorial);
        };

        inputArchivo.click();
    };

    const handleCargarArchivo = () => {
        if (archivoSeleccionado) {
            const nuevoArchivo = {
                archivoAdjunto: archivoSeleccionado,
                fechaArchivoAdjunto: new Date().toLocaleString(),
            };
  
            setArchivosAdjuntos((prevArchivos) => [...prevArchivos, nuevoArchivo]);

            archivoInputRef.current.value = null;
            setArchivoSeleccionado(null);
        }
    };

    const actualizarDatosEnBase = async () => {
        try {
            const respuesta = await fetch('/api/actualizar-datos-educacion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    sabeLeer,
                    sabeEscribir,
                    documentacion,
                    nivelEducativo
                }),
            });

            if (respuesta.ok) {
                console.log("Datos actualizados correctamente.");
            } else {
                throw new Error("Hubo un problema al actualizar los datos.");
            }
        } catch (error) {
            console.error("Error al actualizar los datos:", error);
        }
    };

    useEffect(() => {
        actualizarDatosEnBase();
    }, [sabeLeer, sabeEscribir, documentacion, nivelEducativo]);

    const navigate = useNavigate();
    const [historialPlan, setHistorialPlan] = useState([]);
    const [historialCurso, setHistorialCurso] = useState([]);
    const [planCursado, setPlanCursado] = useState("");
    const [fechaInicioPlan, setFechaInicioPlan] = useState("");
    const [fechaFinPlan, setFechaFinPlan] = useState("");
    const [tiempoCursandoPlan, setTiempoCursandoPlan] = useState("");
    const [curso, setCurso] = useState("");
    const [fechaInicioCurso, setFechaInicioCurso] = useState("");
    const [fechaFinCurso, setFechaFinCurso] = useState("");
    const [tiempoCursandoCurso, setTiempoCursandoCurso] = useState("");
    const [historialCursoAnulado, setHistorialCursoAnulado] = useState([]);
    const [editingPlanIndex, setEditingPlanIndex] = useState(null);
    const [editingCursoIndex, setEditingCursoIndex] = useState(null);
    const [editedFechaFinPlan, setEditedFechaFinPlan] = useState('');
    const [editedFechaFinCurso, setEditedFechaFinCurso] = useState('');

    const [errors, setErrors] = useState({
        nivelEducativo: ''
    });

    const [archivoAnulacion, setArchivoAnulacion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [motivoAnulacion, setMotivoAnulacion] = useState("");
    const [cursoAnuladoIndex, setCursoAnuladoIndex] = useState(null);

    const handleSaveFechaFinPlan = (index) => {
        const updatedHistorialPlan = [...historialPlan];
        updatedHistorialPlan[index].fechaFin = editedFechaFinPlan;
        setHistorialPlan(updatedHistorialPlan);
        setEditingPlanIndex(null);
        setEditedFechaFinPlan('');
    };

    const calcularTiempoCursando = (fechaInicio, fechaFin) => {
        if (!fechaFin) return 'Falta definir el tiempo de fin';

        const inicio = new Date(fechaInicio);
        const fin = new Date(fechaFin);

        let anios = fin.getFullYear() - inicio.getFullYear();
        let meses = fin.getMonth() - inicio.getMonth();
        let dias = fin.getDate() - inicio.getDate();

        if (dias < 0) {
            meses--;
            dias += new Date(inicio.getFullYear(), inicio.getMonth(), 0).getDate();
        }

        if (meses < 0) {
            anios--;
            meses += 12;
        }

        const partes = [];
        if (anios > 0) partes.push(`${anios} año${anios > 1 ? 's' : ''}`);
        if (meses > 0) partes.push(`${meses} mes${meses > 1 ? 'es' : ''}`);
        if (dias > 0 || partes.length === 0) partes.push(`${dias} día${dias > 1 ? 's' : ''}`);

        return partes.join(', ');
    };

    const handleSaveFechaFinCurso = (index) => {
        const updatedHistorialCurso = [...historialCurso];
        updatedHistorialCurso[index].fechaFin = editedFechaFinCurso;
        setHistorialCurso(updatedHistorialCurso);
        setEditingCursoIndex(null);
        setEditedFechaFinCurso('');
    };
    const handleAgregarPlan = () => {
        let hasError = false;
        const newErrors = {};

        if (!planCursado.trim()) {
            newErrors.planCursado = "El campo 'Plan Cursado' es requerido";
            hasError = true;
        }
        if (!fechaInicioPlan) {
            newErrors.fechaInicioPlan = "El campo 'Fecha de Inicio' es requerido";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setErrors({});
        const nuevoRegistroPlan = {
            planCursado,
            fechaInicio: fechaInicioPlan,
            fechaFin: fechaFinPlan,
            tiempoCursando: tiempoCursandoPlan,
            fechaCarga: new Date().toLocaleString(),
        };
        setHistorialPlan([...historialPlan, nuevoRegistroPlan]);
        setPlanCursado("");
        setFechaInicioPlan("");
        setFechaFinPlan("");
        setTiempoCursandoPlan("");
    };

    const [archivo, setArchivo] = useState(null);

    const handleAgregarCurso = () => {
        let hasError = false;
        const newErrors = {};

        if (!curso.trim()) {
            newErrors.curso = "El campo 'Curso' es requerido";
            hasError = true;
        }
        if (!fechaInicioCurso) {
            newErrors.fechaInicioCurso = "El campo 'Fecha de Inicio' es requerido";
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        const nuevoRegistroCurso = {
            curso,
            fechaInicio: fechaInicioCurso,
            fechaFin: fechaFinCurso,
            tiempoCursando: tiempoCursandoCurso,
            fechaCarga: new Date().toLocaleString(),
            archivoAdjunto: archivo,
            fechaArchivoAdjunto: archivo ? new Date().toLocaleString() : null,
        };

        setHistorialCurso([...historialCurso, nuevoRegistroCurso]);

        setCurso("");
        setFechaInicioCurso("");
        setFechaFinCurso("");
        setTiempoCursandoCurso("");
        setArchivo(null);
        archivoInputRef.current.value = "";
    };


    const handleAnularCursoConMotivo = () => {
        if (motivoAnulacion.trim() === "" || !archivoAnulacion) {
            alert("Debe ingresar el motivo y el archivo adjunto.");
            return;
        }

        const nuevoHistorialAnulado = [...historialCursoAnulado];
        const cursoAAnular = historialCurso[cursoAnuladoIndex];

        const fechaActual = new Date().toLocaleString();

        nuevoHistorialAnulado.push({
            ...cursoAAnular,
            motivoAnulacion: motivoAnulacion,
            fechaAnulacion: fechaActual,
            archivoAnulacion: archivoAnulacion,
            nombreArchivo: archivoAnulacion.name,
            archivoOriginalCurso: cursoAAnular.archivoAdjunto,
            nombreArchivoOriginalCurso: cursoAAnular.archivoAdjunto,
            fechaCargaAnulacion: fechaActual,
        });

        const nuevoHistorialCurso = historialCurso.filter((_, index) => index !== cursoAnuladoIndex);

        setHistorialCurso(nuevoHistorialCurso);
        setHistorialCursoAnulado(nuevoHistorialAnulado);

        setMotivoAnulacion("");
        setArchivoAnulacion(null);
        setIsModalOpen(false);
        setCursoAnuladoIndex(null);
    };

    const handleGenerarInforme = () => {

    };

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-xl font-bold mb-4">Carga Educación</h1>

                {/* Checkboxes */}
                <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 bg-white rounded-md shadow-md flex flex-col sm:flex-row sm:gap-4 mb-4">
                    <div className="flex items-center bg-white p-4 rounded-md shadow-md mb-2 sm:mb-0 sm:w-auto">
                        <input
                            type="checkbox"
                            id="sabeLeer"
                            checked={sabeLeer}
                            onChange={() => setSabeLeer(!sabeLeer)}
                            className="mr-2"
                        />
                        <label htmlFor="sabeLeer" className="text-sm">Sabe leer</label>
                    </div>
                    <div className="flex items-center bg-white p-4 rounded-md shadow-md mb-2 sm:mb-0 sm:w-auto">
                        <input
                            type="checkbox"
                            id="sabeEscribir"
                            checked={sabeEscribir}
                            onChange={() => setSabeEscribir(!sabeEscribir)}
                            className="mr-2"
                        />
                        <label htmlFor="sabeEscribir" className="text-sm">Sabe escribir</label>
                    </div>
                    <div className="flex items-center bg-white p-4 rounded-md shadow-md mb-2 sm:mb-0 sm:w-auto">
                        <input
                            type="checkbox"
                            id="documentacion"
                            checked={documentacion}
                            onChange={() => setDocumentacion(!documentacion)}
                            className="mr-2"
                        />
                        <label htmlFor="documentacion" className="text-sm">Documentación</label>
                    </div>
                </div>

                {/* Nivel Educativo */}
                <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 mb-4 bg-white rounded-md shadow-md">
                    <label htmlFor="nivelEducativo" className="block text-sm font-semibold mb-2">Nivel educativo actual</label>
                    <select
                        id="nivelEducativo"
                        value={nivelEducativo}
                        onChange={(e) => setNivelEducativo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                    >
                        <option value="">Seleccione un nivel educativo</option>
                        <option value="Analfabeto">Analfabeto</option>
                        <option value="Primario Completo">Primario Completo</option>
                        <option value="Primario Incompleto">Primario Incompleto</option>
                        <option value="Secundario Completo">Secundario Completo</option>
                        <option value="Secundario Incompleto">Secundario Incompleto</option>
                        <option value="Terciario Completo">Terciario Completo</option>
                        <option value="Terciario Incompleto">Terciario Incompleto</option>
                        <option value="Universitario Completo">Universitario Completo</option>
                        <option value="Universitario Incompleto">Universitario Incompleto</option>
                    </select>
                </div>

                <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                    <h1 className="block text-sm font-semibold mb-2">Carga de Archivos Adjuntos</h1>

                    <input
                        type="file"
                        accept=".pdf"
                        ref={archivoInputRef}
                        onChange={handleArchivoSeleccionado}
                        className={`w-full p-1 border rounded text-sm mb-2`}
                    />

                    {archivoSeleccionado && (
                        <div className="flex justify-center mb-4">
                            <button
                                onClick={handleCargarArchivo}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                                disabled={!archivoSeleccionado}
                            >
                                Cargar archivo adjunto
                            </button>
                        </div>
                    )}

                    {archivosAdjuntos.length > 0 && (
                        <div className="flex justify-center md:justify-end mt-4">
                            <button
                                onClick={() => setIsModalOpenArchivo(true)}
                                className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900 text-xs"
                            >
                                Ver archivos cargados
                            </button>
                        </div>
                    )}

                    {isModalOpenArchivo && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-[90%] md:max-w-lg mx-auto">
                                <button
                                    onClick={() => setIsModalOpenArchivo(false)}
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
                                    <ul className="space-y-2">
                                        {archivosAdjuntos.map((item, index) => (
                                            <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                <div>
                                                    <span className="text-sm"><strong>Archivo:</strong></span>
                                                    <a
                                                        href={URL.createObjectURL(item.archivoAdjunto)}
                                                        download={item.archivoAdjunto.name}
                                                        className="ml-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                    >
                                                        {item.archivoAdjunto.name}
                                                    </a>
                                                </div>
                                                <div className="text-sm text-gray-500 mt-2">
                                                    <strong className="text-xs">Fecha de Carga:</strong> {item.fechaArchivoAdjunto}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    {/* Registro de un Plan */}
                    <div className="flex-1 bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold mb-4">Cargar Registro de un Plan</h2>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="planCursado" className="block text-sm font-semibold mb-2">Plan cursado</label>
                                <input
                                    type="text"
                                    id="planCursado"
                                    className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                                    placeholder="Ingrese el plan cursado"
                                    value={planCursado}
                                    onChange={(e) => {
                                        setPlanCursado(e.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, planCursado: "" }));
                                    }}
                                />
                                {errors.planCursado && <p className="text-red-500 text-sm">{errors.planCursado}</p>}
                            </div>
                            <div>
                                <label htmlFor="fechaInicioPlan" className="block text-sm font-semibold mb-2">Fecha de inicio</label>
                                <input
                                    type="date"
                                    id="fechaInicioPlan"
                                    className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                                    value={fechaInicioPlan}
                                    onChange={(e) => {
                                        setFechaInicioPlan(e.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, fechaInicioPlan: "" }));
                                    }}
                                />
                                {errors.fechaInicioPlan && <p className="text-red-500 text-sm">{errors.fechaInicioPlan}</p>}
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={handleAgregarPlan}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4 mt-5">
                            <h3 className="block text-sm font-semibold mb-2 mt-4">Historial de Carga</h3>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {historialPlan.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay registros de planes cargados aún.
                                    </p>
                                ) : (
                                    <ul className="space-y-2">
                                        {historialPlan.map((registro, index) => (
                                            <li key={index} className="border border-gray-300 p-2 rounded">
                                                <div className='text-sm'><strong>Plan Cursado:</strong> {registro.planCursado}</div>
                                                <div className='text-sm'><strong>Fecha Inicio:</strong> {registro.fechaInicio}</div>
                                                <div className="flex items-center">
                                                    <div className="flex-1 text-sm"><strong>Fecha Fin:</strong> {registro.fechaFin || 'Sin definir'}</div>
                                                    {editingPlanIndex === index ? (
                                                        <div className="flex flex-col ml-2">
                                                            <label className="font-medium text-xs">Modificar Fecha de Fin</label>
                                                            <input
                                                                type="date"
                                                                value={editedFechaFinPlan}
                                                                onChange={(e) => setEditedFechaFinPlan(e.target.value)}
                                                                className="p-1 border border-gray-300 rounded text-xs"
                                                            />
                                                            <button
                                                                onClick={() => handleSaveFechaFinPlan(index)}
                                                                className="bg-green-500 text-white p-1 rounded mt-1 hover:bg-green-600 text-xs"
                                                            >
                                                                Guardar
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => {
                                                                setEditingPlanIndex(index);
                                                                setEditedFechaFinPlan(registro.fechaFin || '');
                                                            }}
                                                            className="bg-orange-400 text-white p-1 rounded ml-2 hover:bg-orange-500 text-xs"
                                                        >
                                                            {registro.fechaFin ? 'Editar Fecha Fin' : 'Definir Fecha Fin'}
                                                        </button>
                                                    )}
                                                </div>
                                                <div className='text-sm'><strong>Tiempo Cursando:</strong> {calcularTiempoCursando(registro.fechaInicio, registro.fechaFin)}</div>
                                                <div><p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {registro.fechaCarga}</p></div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>

                    </div>

                    {/*Cargar Registro de un Curso */}
                    <div className="flex-1 bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold mb-4">Cargar Registro de un Curso</h2>
                        <div className="space-y-4">
                            <div className="mb-2">
                                <label htmlFor="curso" className="block text-sm font-semibold mb-2">Curso</label>
                                <input
                                    id="curso"
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                                    placeholder="Ingrese el curso"
                                    value={curso}
                                    onChange={(e) => {
                                        setCurso(e.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, curso: "" }));
                                    }}
                                />
                                {errors.curso && <p className="text-red-500 text-sm">{errors.curso}</p>}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="fechaInicioCurso" className="block text-sm font-semibold mb-2">Fecha de inicio</label>
                                <input
                                    id="fechaInicioCurso"
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                                    value={fechaInicioCurso}
                                    onChange={(e) => {
                                        setFechaInicioCurso(e.target.value);
                                        setErrors((prevErrors) => ({ ...prevErrors, fechaInicioCurso: "" }));
                                    }}
                                />
                                {errors.fechaInicioCurso && <p className="text-red-500 text-sm">{errors.fechaInicioCurso}</p>}
                            </div>
                            <div className="mb-2">
                                <label htmlFor="archivo" className="block text-sm font-semibold mb-2">Archivo adjunto</label>
                                <input
                                    id="archivo"
                                    accept=".pdf"
                                    type="file"
                                    ref={archivoInputRef}
                                    className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                                    onChange={(e) => {
                                        setArchivo(e.target.files[0]);
                                    }}
                                />
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={handleAgregarCurso}
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>

                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4 mt-5">
                            <h3 className="block text-sm font-semibold mb-2 mt-4">Historial de Carga</h3>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {historialCurso.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay registros de cursos cargados aún.
                                    </p>
                                ) : (
                                    <ul className="space-y-2">
                                        {historialCurso.map((registro, index) => (
                                            <li key={index} className="border border-gray-300 p-2 rounded">
                                                <div className="text-sm"><strong>Curso:</strong> {registro.curso}</div>
                                                <div className="text-sm"><strong>Fecha Inicio:</strong> {registro.fechaInicio}</div>
                                                <div className="flex items-center">
                                                    <div className="flex-1 text-sm"><strong>Fecha Fin:</strong> {registro.fechaFin || 'Sin definir'}</div>
                                                    {editingCursoIndex === index ? (
                                                        <div className="flex flex-col ml-2">
                                                            <label className="font-medium text-xs">Modificar Fecha de Fin</label>
                                                            <input
                                                                type="date"
                                                                value={editedFechaFinCurso}
                                                                onChange={(e) => setEditedFechaFinCurso(e.target.value)}
                                                                className="w-full p-1 border border-gray-300 rounded text-xs"
                                                            />
                                                            <button
                                                                onClick={() => handleSaveFechaFinCurso(index)}
                                                                className="bg-green-500 text-white p-1 rounded mt-1 hover:bg-green-600 text-xs"
                                                            >
                                                                Guardar
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            {registro.fechaFin ? (
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingCursoIndex(index);
                                                                        setEditedFechaFinCurso(registro.fechaFin);
                                                                    }}
                                                                    className="bg-orange-400 text-white p-1 rounded ml-2 hover:bg-orange-500 text-xs"
                                                                >
                                                                    Editar Fecha Fin
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        setEditingCursoIndex(index);
                                                                        setEditedFechaFinCurso('');
                                                                    }}
                                                                    className="bg-orange-400 text-white p-1 rounded ml-2 hover:bg-orange-500 text-xs"
                                                                >
                                                                    Definir Fecha Fin
                                                                </button>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                <div className="text-sm"><strong>Tiempo Cursando:</strong> {calcularTiempoCursando(registro.fechaInicio, registro.fechaFin)}</div>
                                                <div className="text-sm text-gray-500 mt-2"><strong>Fecha de Carga:</strong> {registro.fechaCarga}</div>

                                                {registro.archivoAdjunto ? (
                                                    <div className="flex items-center mt-2">
                                                        <strong className="text-sm mr-2">Archivo adjunto: </strong>

                                                        {/* Si el archivo es un objeto File */}
                                                        {registro.archivoAdjunto instanceof File ? (
                                                            <div className="flex items-center">
                                                                <a
                                                                    href={URL.createObjectURL(registro.archivoAdjunto)}
                                                                    download={registro.archivoAdjunto.name}
                                                                    className="bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                                >
                                                                    Descargar
                                                                </a>

                                                                {/* Botones Editar y Eliminar al lado del de Descargar */}
                                                                <button
                                                                    onClick={() => handleEditarArchivo(index)}
                                                                    className="bg-orange-400 text-white p-2 rounded-full text-xs hover:bg-orange-500 inline-block ml-2"
                                                                >
                                                                    Editar
                                                                </button>
                                                                <button
                                                                    onClick={() => handleOpenDeleteModal(index)}
                                                                    className="bg-red-400 text-white p-2 rounded-full text-xs hover:bg-red-500 inline-block ml-2"
                                                                >
                                                                    Eliminar
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-red-500">Error: No se puede generar enlace para el archivo adjunto.</span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    // Si el archivo fue eliminado, mostrar el campo para cargar uno nuevo
                                                    <div className="flex flex-col mt-2">
                                                        <span className="text-sm"><strong>Archivo adjunto:</strong></span>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleArchivoAdjunto(e, index)}
                                                            className="mt-1 mb-2 text-sm border border-gray-300 rounded p-1 w-full"
                                                        />
                                                    </div>
                                                )}

                                                {/* Mostrar las fechas debajo de los botones */}
                                                <div className="mt-2">
                                                    {/* Mostrar la fecha de carga del archivo solo si el archivo ha sido cargado */}
                                                    {registro.fechaArchivoAdjunto && (
                                                        <div className="text-sm text-gray-500 mt-1">
                                                            <strong>Fecha de Carga Archivo:</strong> {registro.fechaArchivoAdjunto}
                                                        </div>
                                                    )}

                                                    {/* Mostrar la fecha de edición, si existe */}
                                                    {registro.fechaEdicionArchivo && (
                                                        <div className="text-sm text-gray-500 mt-1">
                                                            <strong>Fecha de Edición Archivo:</strong> {registro.fechaEdicionArchivo}
                                                        </div>
                                                    )}

                                                    {/* Mostrar la fecha de eliminación, si existe */}
                                                    {registro.fechaEliminacionArchivo && (
                                                        <div className="text-sm text-gray-500 mt-1">
                                                            <strong>Fecha de Eliminación Archivo:</strong> {registro.fechaEliminacionArchivo}
                                                        </div>
                                                    )}
                                                </div>



                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        onClick={() => {
                                                            setCursoAnuladoIndex(index);
                                                            setIsModalOpen(true);
                                                        }}
                                                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600 text-xs"
                                                    >
                                                        Anular Curso
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

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

                        {isModalOpen && (
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-full md:max-w-md mx-4 md:mx-auto">
                                    <h2 className="text-lg font-bold mb-4 text-center md:text-left">Ingrese el Motivo de la Anulación</h2>

                                    {/* Textarea para el motivo */}
                                    <textarea
                                        className="w-full p-2 border border-gray-300 rounded text-sm mb-4 resize-none"
                                        rows="4"
                                        placeholder="Motivo de la anulación"
                                        value={motivoAnulacion}
                                        onChange={(e) => setMotivoAnulacion(e.target.value)}
                                    />

                                    {/* Input para el archivo adjunto */}
                                    <div className="text-sm mb-1"><strong>Archivo adjunto:</strong></div>
                                    <input
                                        type="file"
                                        accept='.pdf'
                                        onChange={(e) => setArchivoAnulacion(e.target.files[0])}
                                        className="w-full p-2 border border-gray-300 rounded text-sm mb-4"
                                    />

                                    {/* Botones de acción */}
                                    <div className="mt-3 flex justify-end space-x-2">
                                        <button
                                            onClick={handleAnularCursoConMotivo}
                                            className={`bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-xs ${!motivoAnulacion.trim() || !archivoAnulacion ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={!motivoAnulacion.trim() || !archivoAnulacion}
                                        >
                                            Anular Curso
                                        </button>
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 text-xs"
                                        >
                                            Cancelar
                                        </button>
                                    </div>

                                </div>
                            </div>
                        )}


                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4">
                            <h3 className="block text-sm font-semibold mb-2 mt-4">Historial de Cursos Anulados</h3>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {historialCursoAnulado.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay registros de cursos anulados.
                                    </p>
                                ) : (
                                    <ul className="space-y-2">
                                        {historialCursoAnulado.map((registro, index) => (
                                            <li key={index} className="border border-gray-300 p-3 mb-2 rounded-lg bg-gray-100">
                                                {/* Estado de la anulación */}
                                                <div className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-100 mt-3">
                                                    <div className="flex items-center mt-2">
                                                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                        <p className="text-sm ml-2 text-red-500 italic font-bold">Curso Anulado</p>
                                                    </div>

                                                    {/* Motivo y fecha de anulación */}
                                                    <p className="text-sm italic"><strong>Motivo de anulación:</strong> {registro.motivoAnulacion}</p>

                                                    {registro.archivoAnulacion ? (
                                                        <div>
                                                            <div className="text-sm italic mt-2">
                                                                <strong>Archivo adjunto:</strong>{" "}
                                                                <a
                                                                    href={URL.createObjectURL(registro.archivoAnulacion)}
                                                                    download={registro.nombreArchivo}
                                                                    className="bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                                >
                                                                    Descargar
                                                                </a>
                                                            </div>

                                                            {/* Fechas de carga de anulación */}
                                                            <div className="text-xs text-gray-500 mt-2">
                                                                {registro.fechaCargaAnulacion && (
                                                                    <p><strong>Fecha de Carga:</strong> {registro.fechaCargaAnulacion}</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-sm italic text-gray-500 mt-2">Archivo adjunto: Eliminado</p>
                                                    )}

                                                </div>

                                                {/* Información del curso */}
                                                <div className="text-sm"><strong>Curso:</strong> {registro.curso}</div>
                                                <div className="text-sm"><strong>Fecha Inicio:</strong> {registro.fechaInicio}</div>
                                                <div className="text-sm"><strong>Fecha Fin:</strong> {registro.fechaFin || 'No se definió'}</div>

                                                {/* Mostrar tiempo cursando si la fecha de fin está definida */}
                                                <div className="text-sm">
                                                    <strong>Tiempo Cursando:</strong> {registro.fechaFin ? calcularTiempoCursando(registro.fechaInicio, registro.fechaFin) : 'No se definió'}
                                                </div>

                                                {/* Mostrar archivo original solo si existe */}
                                                {registro.archivoOriginalCurso ? (
                                                    <div>
                                                        <div className="text-sm">
                                                            <strong>Archivo adjunto:</strong>{" "}
                                                            <a
                                                                href={URL.createObjectURL(registro.archivoOriginalCurso)}
                                                                download={registro.archivoOriginalCurso.name}
                                                                className="bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                            >
                                                                Descargar
                                                            </a>
                                                        </div>

                                                        {/* Mostrar fechas de carga, edición y eliminación del archivo si existen */}
                                                        <div className="text-sm text-gray-500 mt-2">
                                                            <p><strong>Fecha de carga:</strong> {registro.fechaCarga}</p>
                                                            {registro.fechaEdicionArchivo && (
                                                                <p><strong>Fecha de edición:</strong> {registro.fechaEdicionArchivo}</p>
                                                            )}
                                                            {registro.fechaEliminacionArchivo && (
                                                                <p><strong>Fecha de eliminación:</strong> {registro.fechaEliminacionArchivo}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    // Si el archivo fue eliminado, mostrar las fechas de carga, edición y eliminación

                                                    <div className=" mt-2">
                                                        <div className="text-sm mb-2"><strong>Archivo adjunto:</strong> Eliminado</div>
                                                        <div className='text-sm text-gray-500'><strong>Fecha de carga:</strong> {registro.fechaCarga}</div>
                                                        {registro.fechaEdicionArchivo && (
                                                            <div className='text-sm text-gray-500'><strong>Fecha de edición:</strong> {registro.fechaEdicionArchivo}</div>
                                                        )}
                                                        {registro.fechaEliminacionArchivo && (
                                                            <div className='text-sm text-gray-500'><strong>Fecha de eliminación:</strong> {registro.fechaEliminacionArchivo}</div>
                                                        )}
                                                    </div>
                                                )}

                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>



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

export default CargaEducacion;
