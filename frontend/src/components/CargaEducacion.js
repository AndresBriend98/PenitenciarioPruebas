import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaEducacion = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);
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
    const [editingPlanIndex, setEditingPlanIndex] = useState(null);
    const [editingCursoIndex, setEditingCursoIndex] = useState(null);
    const [editedFechaFinPlan, setEditedFechaFinPlan] = useState('');
    const [editedFechaFinCurso, setEditedFechaFinCurso] = useState('');
    const [planCursando, setPlanCursando] = useState('');
    const [nivelEducativo, setNivelEducativo] = useState('');
    const [sabeLeer, setSabeLeer] = useState(false);
    const [sabeEscribir, setSabeEscribir] = useState(false);
    const [documentacion, setDocumentacion] = useState(false);
    const [historial, setHistorial] = useState([]);
    const [errors, setErrors] = useState({
        planCursando: '',
        nivelEducativo: ''
    });

    const handleCargar = () => {
        let valid = true;
        const newErrors = { planCursando: '', nivelEducativo: '' };

        if (!planCursando) {
            newErrors.planCursando = "El campo 'Plan cursando' es requerido.";;
            valid = false;
        }

        if (!nivelEducativo) {
            newErrors.nivelEducativo = "El campo 'Nivel educativo actual' es requerido.";
            valid = false;
        }

        if (!valid) {
            setErrors(newErrors);
            return;
        }

        const nuevaEntrada = {
            fechaSeleccion: new Date().toLocaleString(),
            seleccionado: {
                sabeLeer: sabeLeer,
                sabeEscribir: sabeEscribir,
                documentacion: documentacion
            },
            planCursando,
            nivelEducativo
        };

        setHistorial([...historial, nuevaEntrada]);

        // Limpiar los campos después de cargar
        setPlanCursando('');
        setNivelEducativo('');
        setSabeLeer(false);
        setSabeEscribir(false);
        setDocumentacion(false);
        setErrors({ planCursando: '', nivelEducativo: '' }); // Limpiar errores
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
            fechaCarga: new Date().toLocaleDateString(),
        };
        setHistorialPlan([...historialPlan, nuevoRegistroPlan]);
        // Limpiar campos después de agregar
        setPlanCursado("");
        setFechaInicioPlan("");
        setFechaFinPlan("");
        setTiempoCursandoPlan("");
    };
    const [formData, setFormData] = useState({
        planCursado: "",
        fechaInicioPlan: "",
        fechaFinPlan: "",
        tiempoCursandoPlan: "",
        curso: "",
        fechaInicioCurso: "",
        fechaFinCurso: "",
        tiempoCursandoCurso: ""
    });

    // Función para manejar la carga del registro de un curso
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
        // Agregar el registro al historial de cursos
        const nuevoRegistroCurso = {
            curso,
            fechaInicio: fechaInicioCurso,
            fechaFin: fechaFinCurso,
            tiempoCursando: tiempoCursandoCurso,
            fechaCarga: new Date().toLocaleDateString(),
        };
        setHistorialCurso([...historialCurso, nuevoRegistroCurso]);
        // Limpiar campos después de agregar
        setCurso("");
        setFechaInicioCurso("");
        setFechaFinCurso("");
        setTiempoCursandoCurso("");
    };

    // Función de validación para los campos
    const validateForm = () => {
        const newErrors = {};

        // Validación para "Registro de un Plan"
        if (!formData.planCursado) newErrors.planCursado = "El campo 'Plan cursado' es obligatorio.";
        if (!formData.fechaInicioPlan) newErrors.fechaInicioPlan = "El campo 'Fecha de inicio' es obligatorio.";

        // Validación para "Registro de un Curso"
        if (!formData.curso) newErrors.curso = "El campo 'Curso' es obligatorio.";
        if (!formData.fechaInicioCurso) newErrors.fechaInicioCurso = "El campo 'Fecha de inicio' es obligatorio.";

        setErrors(newErrors);

        // Devuelve verdadero si no hay errores
        return Object.keys(newErrors).length === 0;
    };

    // Manejador para la carga del formulario
    const handleSubmitPlan = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Lógica para cargar el plan si pasa la validación
            console.log("Plan cargado con éxito:", formData);
        }
    };

    const handleSubmitCurso = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Lógica para cargar el curso si pasa la validación
            console.log("Curso cargado con éxito:", formData);
        }
    };

    // Función para actualizar el estado del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const [errorsPlan, setErrorsPlan] = useState({
        planCursado: "",
        fechaInicioPlan: "",
        fechaFinPlan: "",
        tiempoCursandoPlan: "",
    });
    const [errorsCurso, setErrorsCurso] = useState({
        curso: "",
        fechaInicioCurso: "",
        fechaFinCurso: "",
        tiempoCursandoCurso: "",
    });

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -150 : 150,
                behavior: 'smooth'
            });
        }
    };

    const handleCargarRegistroPlan = () => {
        let hasErrors = false;
        const newErrors = { ...errorsPlan };

        // Validaciones
        if (!document.getElementById('planCursado').value) {
            newErrors.planCursado = "El campo Plan cursado es requerido.";
            hasErrors = true;
        } else {
            newErrors.planCursado = "";
        }

        if (!document.getElementById('fechaInicioPlan').value) {
            newErrors.fechaInicioPlan = "El campo Fecha de inicio es requerido.";
            hasErrors = true;
        } else {
            newErrors.fechaInicioPlan = "";
        }

        setErrorsPlan(newErrors);

        if (!hasErrors) {
            // Agregar datos al historial de planes
            const nuevoRegistroPlan = {
                plan: document.getElementById('planCursado').value,
                fechaInicio: document.getElementById('fechaInicioPlan').value,
                fechaFin: document.getElementById('fechaFinPlan').value,
                tiempoCursando: document.getElementById('tiempoCursandoPlan').value,
                fechaCarga: new Date().toLocaleDateString()
            };

            setHistorialPlan([...historialPlan, nuevoRegistroPlan]);

            // Limpiar los campos del formulario
            document.getElementById('planCursado').value = '';
            document.getElementById('fechaInicioPlan').value = '';
            document.getElementById('fechaFinPlan').value = '';
            document.getElementById('tiempoCursandoPlan').value = '';
        }
    };

    const handleCargarRegistroCurso = () => {
        let hasErrors = false;
        const newErrors = { ...errorsCurso };

        // Validaciones
        if (!document.getElementById('curso').value) {
            newErrors.curso = "El campo Curso es requerido.";
            hasErrors = true;
        } else {
            newErrors.curso = "";
        }

        if (!document.getElementById('fechaInicioCurso').value) {
            newErrors.fechaInicioCurso = "El campo Fecha de inicio es requerido.";
            hasErrors = true;
        } else {
            newErrors.fechaInicioCurso = "";
        }


        setErrorsCurso(newErrors);

        if (!hasErrors) {
            // Agregar datos al historial
            const nuevoRegistroCurso = {
                curso: document.getElementById('curso').value,
                fechaInicio: document.getElementById('fechaInicioCurso').value,
                fechaFin: document.getElementById('fechaFinCurso').value,
                tiempoCursando: document.getElementById('tiempoCursandoCurso').value,
                fechaCarga: new Date().toLocaleDateString() // Fecha de carga actual
            };

            setHistorialCurso([...historialCurso, nuevoRegistroCurso]);

            // Limpiar los campos del formulario después de agregar
            document.getElementById('curso').value = '';
            document.getElementById('fechaInicioCurso').value = '';
            document.getElementById('fechaFinCurso').value = '';
            document.getElementById('tiempoCursandoCurso').value = '';
        }
    };

    const handleGenerarInforme = () => {

    };

    const [user, setUser] = useState({
        name: 'Maximiliano Ezequiel Dominguez',
        alias: 'JL',
        unit: 'Unidad Penitenciaria 9',
        fileNumber: '3576',
        typedoc: 'Cédula Ejemplar B',
        dni: '23123564',
        crime: 'Robo',
        typeofintern: 'Condenado',
        entryDate: '10/06/2024',
        sentenceEndDate: '10/06/2030',
        remainingSentence: '3 años 2 meses 5 días',
    });

    const areas = [
        'Ficha ingreso',
        'Area judicial',
        'Datos personales',
        'Conducta-Concepto-Fases',
        'Permisos',
        'Antecedentes penales',
        'Grupo Familiar',
        'Visitas',
        'Salidas',
        'Traslado',
        'Alojamiento y movimiento',
        'Salud',
        'Educación',
        'Trabajo',
        'Criminología',
        'Psicología',
        'Fisionomía'
    ];

    const [selectedArea, setSelectedArea] = useState('Educacion');;
    const [showModal, setShowModal] = useState(false);

    const handleVolver = () => {
        navigate('/general');
    };

    useEffect(() => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const selectedButton = container.querySelector(`[data-area="${selectedArea}"]`);
            if (selectedButton) {
                container.scrollTo({
                    left: selectedButton.offsetLeft - (container.offsetWidth / 2) + (selectedButton.offsetWidth / 2),
                    behavior: 'smooth'
                });
            }
            setSelectedArea('Educación');
        }
    }, [selectedArea]);

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            {/* Información del usuario, foto y checkboxes */}
            <div className="bg-gray-300 p-4 rounded-md flex flex-col md:flex-row mb-4 items-center md:items-start">
                {/* Contenedor principal para asegurar alineación */}
                <div className="flex flex-col md:flex-row items-center md:items-start w-full">
                    {/* Foto y datos del usuario */}
                    <div className="flex flex-col md:flex-row items-center md:items-start mb-4 md:mb-0 w-full md:w-auto">
                        {/* Foto y botón de carga */}
                        <div className="relative flex-shrink-0 flex flex-col items-center mb-4 md:mr-4 text-center md:text-left w-full md:w-auto">
                            <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                <span className="text-center text-white text-xs md:text-base">Foto</span>
                            </div>
                        </div>
                        {/* Datos del usuario */}
                        <div className="space-y-2 md:space-y-3 flex-grow w-full md:w-auto">
                            <h2 className="text-lg font-bold text-center md:text-left">{user.name}</h2>
                            <p className="text-sm"><strong>Tipo de interno:</strong> {user.typeofintern}</p>
                            <p className="text-sm"><strong>Alias:</strong> {user.alias}</p>
                            <p className="text-sm"><strong>Unidad:</strong> {user.unit}</p>
                            <p className="text-sm"><strong>Legajo:</strong> {user.fileNumber}</p>
                            <p className="text-sm"><strong>Tipo de documento:</strong> {user.typedoc}</p>
                            <p className="text-sm"><strong>DNI:</strong> {user.dni}</p>
                            <p className="text-sm"><strong>Delito:</strong> {user.crime}</p>
                        </div>
                    </div>
                    {/* Checkboxes alineados a la derecha en pantallas grandes y a la izquierda en pantallas pequeñas */}
                    <div className="flex flex-col space-y-4 md:space-y-2 md:ml-auto w-full md:w-auto">
                        {/* Egreso checkbox y campos */}
                        <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex flex-col items-start shadow-sm">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="egreso"
                                    checked={true}
                                    readOnly
                                    className="mr-2"
                                />
                                <label htmlFor="egreso" className="text-sm">Egreso</label>
                            </div>
                            {true && ( // Condición para mostrar los campos
                                <div className="w-full">
                                    <label htmlFor="egresoDate" className="block text-sm font-semibold mb-1">Fecha de Egreso</label>
                                    <input
                                        type="date"
                                        id="egresoDate"
                                        value="2024-09-09" // Valor preestablecido
                                        readOnly
                                        className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
                                    />
                                    <label htmlFor="numOficioEgreso" className="block text-sm font-semibold mb-1">Num. Oficio Egreso</label>
                                    <input
                                        type="text"
                                        id="numOficioEgreso"
                                        value="12345" // Valor preestablecido
                                        readOnly
                                        className="w-full p-1 border border-gray-300 rounded text-sm"
                                    />
                                </div>
                            )}
                        </div>
                        {/* Otros checkboxes */}
                        <div className="flex flex-col space-y-2">
                            <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex items-center shadow-sm">
                                <input
                                    type="checkbox"
                                    id="leyBlumberg"
                                    checked={false}
                                    readOnly
                                    className="mr-2"
                                />
                                <label htmlFor="leyBlumberg" className="text-sm">Ley Blumberg</label>
                            </div>
                            <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex items-center shadow-sm">
                                <input
                                    type="checkbox"
                                    id="leyMicaela"
                                    checked={false}
                                    readOnly
                                    className="mr-2"
                                />
                                <label htmlFor="leyMicaela" className="text-sm">Ley Micaela</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="relative flex items-center justify-center w-full mb-4">
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-0 bg-white text-gray-800 p-2 rounded-full shadow-lg border border-black hover:bg-gray-100 transition-colors z-20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                <div
                    ref={scrollContainerRef}
                    className="flex items-center overflow-hidden whitespace-nowrap px-4 mx-4"
                >
                    {areas.map((area) => (
                        <button
                            key={area}
                            data-area={area}
                            onClick={() => {
                                switch (area) {
                                    case 'Salud':
                                        navigate('/cargasalud');
                                        break;
                                    case 'Criminología':
                                        navigate('/cargacriminologia');
                                        break;
                                    case 'Fisionomía':
                                        navigate('/cargafisionomia');
                                        break;
                                    case 'Permisos':
                                        navigate('/cargapermisos');
                                        break;
                                    case 'Antecedentes penales':
                                        navigate('/cargaantecedentespenales');
                                        break;
                                    case 'Conducta-Concepto-Fases':
                                        navigate('/cargaconducconcepfases');
                                        break;
                                    case 'Traslado':
                                        navigate('/cargatraslado');
                                        break;
                                    case 'Grupo Familiar':  // Añadido caso para Grupo Familiar
                                        navigate('/cargagrupofamiliar');
                                        break;
                                    case 'Area judicial':  // Añadido caso para Judicial
                                        navigate('/cargajudicial');
                                        break;
                                    case 'Visitas':  // Añadido caso para Visitas
                                        navigate('/cargavisitas');
                                        break;
                                    case 'Salidas':  // Añadido caso para Salidas
                                        navigate('/cargasalidas');
                                        break;
                                    case 'Alojamiento y movimiento':  // Añadido caso para Alojamiento y Movimiento
                                        navigate('/cargaalojamientoymovimiento');
                                        break;
                                    case 'Educación':  // Añadido caso para Educación
                                        navigate('/cargaeducacion');
                                        break;
                                    case 'Trabajo':  // Añadido caso para Trabajo
                                        navigate('/cargatrabajo');
                                        break;
                                    case 'Psicología':  // Añadido caso para Psicología
                                        navigate('/cargapsicologia');
                                        break;
                                    case 'Datos personales':  // Añadido caso para datos personales
                                        navigate('/cargadatospersonales');
                                        break;
                                    case 'Ficha ingreso':  // Añadido caso para datos personales
                                        navigate('/fichaingreso');
                                        break;
                                    default:
                                        // Manejo de casos no definidos
                                        console.error('Área no definida: ', area);
                                        break;
                                }
                            }}
                            className={`px-12 py-2 text-sm font-medium rounded-full transition-transform transform border border-black ${selectedArea === area
                                ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white shadow-lg scale-95'
                                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {area}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-0 bg-white text-gray-800 p-2 rounded-full shadow-lg border border-black hover:bg-gray-100 transition-colors z-20"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </button>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga Educación</h1>

                {/* Checkboxes */}
                <div className="flex flex-col sm:flex-row sm:gap-4 mb-4">
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

                {/* Campos de texto */}
                <div className="mb-4 bg-white p-4 rounded-md shadow-md">
                    <label htmlFor="planCursando" className="text-sm font-bold">Plan cursando</label>
                    <input
                        type="text"
                        id="planCursando"
                        value={planCursando}
                        onChange={(e) => setPlanCursando(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                        placeholder="Ingrese el plan que esta cursando"
                    />
                    {errors.planCursando && <p className="text-red-500 text-sm">{errors.planCursando}</p>} {/* Mensaje de error */}

                    <label htmlFor="nivelEducativo" className="text-sm font-bold">Nivel educativo actual</label>
                    <select
                        id="nivelEducativo"
                        value={nivelEducativo}
                        onChange={(e) => setNivelEducativo(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-sm mb-2 mt-2"
                    >
                        <option value="">Seleccione un nivel educativo</option>
                        <option value="Analfabeto">Analfabeto</option>
                        <option value="Primario">Primario</option>
                        <option value="Secundario">Secundario</option>
                        <option value="Terciario">Terciario</option>
                        <option value="Universitario">Universitario</option>
                    </select>
                    {errors.nivelEducativo && <p className="text-red-500 text-sm">{errors.nivelEducativo}</p>} {/* Mensaje de error */}

                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleCargar}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>

                </div>
                <div className="bg-white p-4 rounded-md shadow-md mb-4">
                    <h3 className="text-sm font-bold mt-4">Historial de Carga</h3>
                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {historial.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center">
                                No hay registros cargados aún.
                            </p>
                        ) : (
                            <ul className="space-y-2">
                                {historial.map((registro, index) => (
                                    <li key={index} className="border border-gray-300 p-2 rounded">
                                        <div><strong className="text-sm">Plan Cursando:</strong> {registro.planCursando}</div>
                                        <div><strong className="text-sm">Nivel Educativo Actual:</strong> {registro.nivelEducativo}</div>
                                        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2">
                                            <div className="flex items-center mb-2 sm:mb-0">
                                                <div className={`w-4 h-4 rounded-full ${registro.seleccionado.sabeLeer ? 'bg-green-500' : 'bg-red-300'}`}></div>
                                                <span className="ml-2 text-sm">Sabe leer</span>
                                            </div>
                                            <div className="flex items-center mb-2 sm:mb-0">
                                                <div className={`w-4 h-4 rounded-full ${registro.seleccionado.sabeEscribir ? 'bg-green-500' : 'bg-red-300'}`}></div>
                                                <span className="ml-2 text-sm">Sabe escribir</span>
                                            </div>
                                            <div className="flex items-center mb-2 sm:mb-0">
                                                <div className={`w-4 h-4 rounded-full ${registro.seleccionado.documentacion ? 'bg-green-500' : 'bg-red-300'}`}></div>
                                                <span className="ml-2 text-sm">Documentación</span>
                                            </div>
                                        </div>
                                        <div><p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {registro.fechaSeleccion}</p></div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Dividir pantalla en dos */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">Cargar Registro de un Plan</h2>
                        {/* Registro de un Plan */}
                        {/* Registro de un Plan */}
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="planCursado" className="text-sm font-bold">Plan cursado</label>
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
                                <label htmlFor="fechaInicioPlan" className="text-sm font-bold">Fecha de inicio</label>
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
                            <h3 className="text-sm font-bold mt-4">Historial de Carga</h3>
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
                                <label htmlFor="curso" className="text-sm font-bold">Curso</label>
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
                                <label htmlFor="fechaInicioCurso" className="text-sm font-bold">Fecha de inicio</label>
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
                            <h3 className="text-sm font-bold mt-4">Historial de Carga</h3>
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
