import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaEducacion = () => {
    const [sabeLeer, setSabeLeer] = useState(false);
    const [sabeEscribir, setSabeEscribir] = useState(false);
    const [documentacion, setDocumentacion] = useState(false);
    const [nivelEducativo, setNivelEducativo] = useState("");

    // Esta función se llamará para actualizar el estado de los checkboxes y el nivel educativo en la base de datos
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

    // Usamos useEffect para que se actualice en la base de datos cada vez que uno de los estados cambie
    useEffect(() => {
        actualizarDatosEnBase();
    }, [sabeLeer, sabeEscribir, documentacion, nivelEducativo]);  // Se ejecuta cada vez que uno de los estados cambia

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
    const archivoInputRef = useRef(); // Ref para el input de archivo
    const handleArchivoAdjunto = (e, index) => {
        const archivo = e.target.files[0];
        if (archivo) {
            const nuevaLista = [...historialCurso];
            nuevaLista[index].archivoAdjunto = archivo;  // Guardamos el archivo como un objeto File
            nuevaLista[index].fechaArchivoAdjunto = new Date().toLocaleString();  // Guardamos la fecha de carga
            setHistorialCurso(nuevaLista);
        }
    };

    const [errors, setErrors] = useState({
        nivelEducativo: ''
    });
    const [archivoAnulacion, setArchivoAnulacion] = useState(null);  // Define el estado
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [motivoAnulacion, setMotivoAnulacion] = useState("");
    const [cursoAnuladoIndex, setCursoAnuladoIndex] = useState(null); // Para saber qué curso se está anulando
    const handleAnularCursoConMotivo = () => {
        // Verifica si el motivo y el archivo son válidos
        if (motivoAnulacion.trim() === "" || !archivoAnulacion) {
            alert("Debe ingresar el motivo y el archivo adjunto.");
            return;
        }

        // Creamos el nuevo historial de anulaciones, añadiendo la información relevante
        const nuevoHistorialAnulado = [...historialCursoAnulado];
        const cursoAAnular = historialCurso[cursoAnuladoIndex];

        // Añadimos la anulación con motivo, fecha, archivo adjunto y archivo original del curso
        nuevoHistorialAnulado.push({
            ...cursoAAnular, // Información original del curso
            motivoAnulacion: motivoAnulacion,
            fechaAnulacion: new Date().toISOString().split('T')[0], // Fecha de anulación actual
            archivoAnulacion: archivoAnulacion, // El archivo adjunto
            nombreArchivo: archivoAnulacion.name, // Nombre original del archivo adjunto
            archivoOriginalCurso: cursoAAnular.archivoAdjunto, // Agregar archivo original del curso
            nombreArchivoOriginalCurso: cursoAAnular.archivoAdjunto, // Nombre del archivo original
        });

        // Eliminamos el curso del historial de cursos
        const nuevoHistorialCurso = historialCurso.filter((_, index) => index !== cursoAnuladoIndex);

        // Actualizamos los estados
        setHistorialCurso(nuevoHistorialCurso);
        setHistorialCursoAnulado(nuevoHistorialAnulado);

        // Limpiamos el motivo y el archivo tras anular el curso
        setMotivoAnulacion("");
        setArchivoAnulacion(null); // Limpiamos el archivo adjunto
        setIsModalOpen(false); // Cerramos el modal de anulación
        setCursoAnuladoIndex(null); // Restablecemos el índice de curso anulado
    };

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

        // Ajustar días y meses si es necesario
        if (dias < 0) {
            meses--;
            dias += new Date(inicio.getFullYear(), inicio.getMonth(), 0).getDate();
        }

        if (meses < 0) {
            anios--;
            meses += 12;
        }

        // Construir el resultado
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
    // Función para manejar la carga del registro del plan
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
        // Agregar el registro al historial de planes
        const nuevoRegistroPlan = {
            planCursado,
            fechaInicio: fechaInicioPlan,
            fechaFin: fechaFinPlan,
            tiempoCursando: tiempoCursandoPlan,
            fechaCarga: new Date().toLocaleString(),
        };
        setHistorialPlan([...historialPlan, nuevoRegistroPlan]);
        // Limpiar campos después de agregar
        setPlanCursado("");
        setFechaInicioPlan("");
        setFechaFinPlan("");
        setTiempoCursandoPlan("");
    };

    const [archivo, setArchivo] = useState(null);  // Nuevo estado para manejar el archivo

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
            archivoAdjunto: archivo,  // Guardar el archivo completo
            fechaArchivoAdjunto: new Date().toLocaleString(),  // Guardar la fecha de carga del archivo
        };

        setHistorialCurso([...historialCurso, nuevoRegistroCurso]);

        // Limpiar campos después de agregar
        setCurso("");
        setFechaInicioCurso("");
        setFechaFinCurso("");
        setTiempoCursandoCurso("");
        setArchivo(null); // Limpiar archivo
        archivoInputRef.current.value = ""; // Limpiar el input de archivo
    };

    const handleGenerarInforme = () => {

    };

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header/>
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga Educación</h1>

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
            
                {/* Dividir pantalla en dos */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">Cargar Registro de un Plan</h2>
                        {/* Registro de un Plan */}
                        {/* Registro de un Plan */}
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
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md mb-4">
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

                    {/* Derecha: Cargar Registro de un Curso */}
                    <div className="flex-1 bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">Cargar Registro de un Curso</h2>
                        {/* Registro de un Curso */}
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
                                    type="file"
                                    ref={archivoInputRef} // Asignamos la ref aquí
                                    className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                                    onChange={(e) => {
                                        setArchivo(e.target.files[0]); // Guardamos el archivo completo
                                    }}
                                />
                            </div>
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={handleAgregarCurso}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>

                        </div>

                        <div className="bg-white p-4 rounded-md shadow-md mb-4">
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

                                                {/* Mostrar el archivo adjunto si existe */}
                                                {/* Mostrar el archivo adjunto si existe */}
                                                {registro.archivoAdjunto ? (
                                                    <div className="text-sm mt-2">
                                                        <strong>Archivo adjunto:</strong>{" "}
                                                        {registro.archivoAdjunto instanceof File ? (
                                                            <a
                                                                href={URL.createObjectURL(registro.archivoAdjunto)} // Si es un objeto File válido
                                                                download={registro.archivoAdjunto.name} // Usamos el nombre del archivo para la descarga
                                                                className="bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                            >
                                                                Descargar
                                                            </a>
                                                        ) : (
                                                            <span className="text-red-500">Error: No se puede generar enlace para el archivo adjunto.</span>
                                                        )}

                                                        {/* Mostrar la fecha de carga del archivo */}
                                                        {registro.fechaArchivoAdjunto && (
                                                            <div className="text-xs text-gray-500 mt-1">
                                                                <div className="text-sm text-gray-500 mt-2"><strong>Fecha de Carga del Archivo:</strong> {registro.fechaArchivoAdjunto} </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : null}


                                                {/* Mostrar el campo para cargar archivo solo si no existe uno */}
                                                {!registro.archivoAdjunto && (
                                                    <div className="flex flex-col mt-2">
                                                        <span className="text-sm"><strong>Archivo adjunto:</strong></span>
                                                        <input
                                                            type="file"
                                                            onChange={(e) => handleArchivoAdjunto(e, index)}
                                                            className="mt-1 mb-2 text-sm border border-gray-300 rounded p-1 w-full"
                                                        />
                                                    </div>
                                                )}

                                                <div className="flex justify-end mt-2">
                                                    <button
                                                        onClick={() => {
                                                            setCursoAnuladoIndex(index); // Guardamos el índice del curso que se está anulando
                                                            setIsModalOpen(true);        // Abrimos el modal para el motivo
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
                        </div>


                        {isModalOpen && (
                            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
                                <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-full md:max-w-md mx-4 md:mx-auto"> {/* Responsivo */}
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
                                        onChange={(e) => setArchivoAnulacion(e.target.files[0])}
                                        className="w-full p-2 border border-gray-300 rounded text-sm mb-4"
                                    />

                                    {/* Botones de acción */}
                                    <div className="flex justify-between">
                                        <button
                                            onClick={() => setIsModalOpen(false)}
                                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 text-xs w-1/2 mr-2"
                                        >
                                            Cancelar
                                        </button>

                                        {/* Botón habilitado solo si ambos campos están completos */}
                                        <button
                                            onClick={handleAnularCursoConMotivo}
                                            className={`bg-red-500 text-white px-4 py-2 rounded text-xs w-1/2 ${(!motivoAnulacion.trim() || !archivoAnulacion) ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"}`}
                                            disabled={!motivoAnulacion.trim() || !archivoAnulacion}
                                        >
                                            Anular Curso
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}


                        <div className="bg-white p-4 rounded-md shadow-md mb-4">
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
                                                    <p className="text-sm italic"><strong>Fecha de anulación:</strong> {registro.fechaAnulacion}</p>

                                                    {/* Mostrar archivo adjunto de la anulación solo si existe */}
                                                    {registro.archivoAnulacion && (
                                                        <div className="text-sm italic mt-2">
                                                            <strong>Archivo adjunto:</strong>{" "}
                                                            <a
                                                                href={URL.createObjectURL(registro.archivoAnulacion)} // URL temporal para archivos locales
                                                                download={registro.nombreArchivo} // Nombre del archivo para la descarga
                                                                className="bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                            >
                                                                Descargar
                                                            </a>
                                                        </div>
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
                                                {registro.archivoOriginalCurso && (
                                                    <div className="text-sm">
                                                        <strong>Archivo adjunto:</strong>{" "}
                                                        <a
                                                            href={URL.createObjectURL(registro.archivoOriginalCurso)} // URL temporal para archivos locales
                                                            download={registro.archivoOriginalCurso.name} // Nombre del archivo para la descarga
                                                            className="bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar
                                                        </a>
                                                    </div>
                                                )}

                                                {/* Fecha de carga */}
                                                <div><p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {registro.fechaCarga}</p></div>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>


                    </div>
                </div>

                {/* Archivo Adjunto */}
                <div className="mt-4 bg-white flex flex-col md:flex-row md:items-start md:justify-start p-4 bg-white p-4 rounded-md shadow-md">
                    <label className="block text-sm font-semibold mb-2 md:mb-0 md:mr-5">Archivo Adjunto</label>
                    <input type="file" className="border border-gray-300 p-1 rounded text-sm w-full md:w-auto" />
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
