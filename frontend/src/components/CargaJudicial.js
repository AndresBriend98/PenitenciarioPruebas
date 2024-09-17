import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaJudicial = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    const agregarVictima = () => {
        if (validarCamposVictima()) {
            const fechaCarga = new Date().toLocaleString(); // Obtener la fecha de carga actual
            setVictimas([...victimas, { ...victima, fechaCarga }]);
            setVictima({ nombres: '', dni: '' });
            setVictimaErrors({ nombres: false, dni: false });
        }
    };

    const [abogados, setAbogados] = useState([]);

    const handleAgregarAbogadoData = (event) => {
        event.preventDefault();

        if (!validateAbogadoFields()) {
            return;
        }

        const fechaCarga = new Date().toLocaleString(); // Obtener la fecha de carga actual

        setAbogados([...abogados, { ...abogado, fechaCarga }]);
        setAbogado({ nombreApellido: '', matricula: '', poderes: '' });
        setAbogadoErrors({ nombreApellido: false, matricula: false, poderes: false });
    };


    const handleAgregar = (e) => {
        e.preventDefault(); // Evita que la página se recargue

        if (validateFields()) {
            const fechaCarga = new Date().toLocaleString(); // Obtener la fecha de carga actual

            // Aquí va la lógica para agregar los datos, por ejemplo:
            console.log('Datos válidos, proceder con la acción de agregar.');
            console.log('Fecha de carga:', fechaCarga);
            // Aquí podrías hacer una llamada a la API o actualizar el estado
        } else {
            console.log('Por favor, complete todos los campos obligatorios.');
        }
    };


    const [judicialData, setJudicialData] = useState({
        nombreJuzgado: '',
        tipoJuzgado: '',
        distritoJuzgado: '',
        ubicacionJuzgado: '',
        fechaInicioCausa: '',
        estadoCaso: '',
        numeroCaso: '',
        fechaResolucionFinal: '',
        expediente: '',
        observacion: '',
        archivos: {
            resolucionFinal: null,
            dictamen: null,
            expediente: null
        },
    });

    const [victima, setVictima] = useState({ nombres: '', dni: '' });
    const [victimaErrors, setVictimaErrors] = useState({ nombres: false, dni: false });

    const validarCamposVictima = () => {
        let isValid = true;
        const errors = { nombres: false, dni: false };

        if (!victima.nombres.trim()) {
            errors.nombres = true;
            isValid = false;
        }

        if (!victima.dni.trim()) {
            errors.dni = true;
            isValid = false;
        }

        setVictimaErrors(errors);
        return isValid;
    };

    const [abogado, setAbogado] = useState({
        nombreApellido: '',
        matricula: '',
        poderes: '',
    });

    const [victimas, setVictimas] = useState([]); // Añade este estado

    const handleInputChange = (e, field, group = 'judicialData') => {
        const value = e.target.value;
        if (group === 'judicialData') {
            setJudicialData({ ...judicialData, [field]: value });
        } else if (group === 'abogado') {
            setAbogado({ ...abogado, [field]: value });
        } else if (group === 'victima') {
            setVictima({ ...victima, [field]: value });
        }
    };

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -150 : 150,
                behavior: 'smooth'
            });
        }
    };
    const handleFileChange = (e, key) => {
        setFiles({
            ...files,
            [key]: e.target.files[0],  // Asume que solo se selecciona un archivo por entrada
        });
    };

    const validateFields = () => {
        const newErrors = {};

        newErrors.nombreJuzgado = !judicialData.nombreJuzgado.trim();
        newErrors.tipoJuzgado = !judicialData.tipoJuzgado.trim();
        newErrors.distritoJuzgado = !judicialData.distritoJuzgado.trim();
        newErrors.ubicacionJuzgado = !judicialData.ubicacionJuzgado.trim();
        newErrors.fechaInicioCausa = !judicialData.fechaInicioCausa;
        newErrors.estadoCaso = !judicialData.estadoCaso.trim();
        newErrors.numeroCaso = !judicialData.numeroCaso.trim();
        newErrors.fechaResolucionFinal = !judicialData.fechaResolucionFinal;
        newErrors.expediente = !judicialData.expediente.trim();

        // Verificar archivos cargados
        newErrors.resolucionFinal = !files.resolucionFinal;
        newErrors.dictamen = !files.dictamen;
        newErrors.expedienteArchivo = !files.expediente;

        setErrors(newErrors);

        // Devuelve true si no hay errores
        return !Object.values(newErrors).includes(true);
    };

    const validateAbogadoFields = () => {
        const newErrors = {};
        newErrors.nombreApellido = !abogado.nombreApellido.trim();
        newErrors.matricula = !abogado.matricula.trim();
        newErrors.poderes = !abogado.poderes.trim(); // Eliminar si poderes no es obligatorio

        setAbogadoErrors(newErrors);

        return !Object.values(newErrors).includes(true);
    };

    const [abogadoErrors, setAbogadoErrors] = useState({
        nombreApellido: false,
        matricula: false,
        poderes: false, // Si también quieres que poderes sea obligatorio
    });

    const [files, setFiles] = useState({
        resolucionFinal: null,
        dictamen: null,
        expediente: null,
    });

    // Al inicio del componente, define el estado para los errores de validación
    const [errors, setErrors] = useState({
        nombreJuzgado: false,
        tipoJuzgado: false,
        distritoJuzgado: false,
        ubicacionJuzgado: false,
        fechaInicioCausa: false,
        estadoCaso: false,
        numeroCaso: false,
        fechaResolucionFinal: false,
        expediente: false,
        observacion: false,
        resolucionFinal: false,
        dictamen: false,
        expedienteArchivo: false,
    });

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

    const [selectedArea, setSelectedArea] = useState('Area judicial');;
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
            setSelectedArea('Area judicial');
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
            <div className="bg-white p-6 rounded-md shadow-md flex flex-col">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold mb-4">Área Judicial</h1>
                    <form className='bg-white p-4 rounded-md shadow-md'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1">Nombre del Juzgado</label>
                                <input
                                    placeholder="Ingrese el nombre del juzgado"
                                    type="text"
                                    value={judicialData.nombreJuzgado}
                                    onChange={(e) => handleInputChange(e, 'nombreJuzgado')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.nombreJuzgado ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.nombreJuzgado && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Tipo de Juzgado</label>
                                <input
                                    placeholder="Ingrese el tipo de juzgado"
                                    type="text"
                                    value={judicialData.tipoJuzgado}
                                    onChange={(e) => handleInputChange(e, 'tipoJuzgado')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.tipoJuzgado ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.tipoJuzgado && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            {/* Otros campos del juzgado */}
                            <div>
                                <label className="block text-sm font-semibold mb-1">Distrito del Juzgado</label>
                                <input
                                    placeholder="Ingrese la distrito del juzgado"
                                    type="text"
                                    value={judicialData.distritoJuzgado}
                                    onChange={(e) => handleInputChange(e, 'distritoJuzgado')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.distritoJuzgado ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.distritoJuzgado && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Ubicación del Juzgado</label>
                                <input
                                    placeholder="Ingrese la ubicación del juzgado"
                                    type="text"
                                    value={judicialData.ubicacionJuzgado}
                                    onChange={(e) => handleInputChange(e, 'ubicacionJuzgado')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.ubicacionJuzgado ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.ubicacionJuzgado && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Fecha de Inicio de la Causa</label>
                                <input
                                    placeholder="Ingrese fecha de inicio de la causa"
                                    type="date"
                                    value={judicialData.fechaInicioCausa}
                                    onChange={(e) => handleInputChange(e, 'fechaInicioCausa')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fechaInicioCausa ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.fechaInicioCausa && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Estado del Caso</label>
                                <input
                                    placeholder="Ingrese el estado del caso"
                                    type="text"
                                    value={judicialData.estadoCaso}
                                    onChange={(e) => handleInputChange(e, 'estadoCaso')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.estadoCaso ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.estadoCaso && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Número del Caso</label>
                                <input
                                    placeholder="Ingrese el múmero del caso"
                                    type="number"
                                    value={judicialData.numeroCaso}
                                    onChange={(e) => handleInputChange(e, 'numeroCaso')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.numeroCaso ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.numeroCaso && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1">Fecha Resolución Final</label>
                                <input
                                    placeholder="Ingrese la resolucion final"
                                    type="date"
                                    value={judicialData.fechaResolucionFinal}
                                    onChange={(e) => handleInputChange(e, 'fechaResolucionFinal')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fechaResolucionFinal ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.fechaResolucionFinal && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Expediente</label>
                            <input
                                placeholder="Ingrese el expediente"
                                type="text"
                                value={judicialData.expediente}
                                onChange={(e) => handleInputChange(e, 'expediente')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.expediente ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.expediente && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Observación</label>
                            <textarea
                                placeholder="Ingrese las observaciones"
                                value={judicialData.observacion}
                                onChange={(e) => handleInputChange(e, 'observacion')}
                                className="w-full p-2 border border-gray-300 rounded text-sm border-gray-300"
                            />
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <h2 className="text-xl font-bold mb-4">Documentos Adjuntos</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Resolución Final</label>
                                    <input
                                        placeholder="Ingrese la resolución final"
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'resolucionFinal')}
                                        className="w-full p-2 border border-gray-300 rounded text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Dictamen</label>
                                    <input
                                        placeholder="Ingrese el dictamen"
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'dictamen')}
                                        className="w-full p-2 border border-gray-300 rounded text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Expediente</label>
                                    <input
                                        placeholder="Ingrese el expediente"
                                        type="file"
                                        onChange={(e) => handleFileChange(e, 'expediente')}
                                        className="w-full p-2 border border-gray-300 rounded text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleAgregar}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                    </form>
                </div>

                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 pr-0 md:pr-4 mb-6 md:mb-0">
                        <h2 className="text-xl font-bold mb-4">Información del Abogado</h2>
                        <form className="bg-white p-4 rounded-md shadow-md">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                                    <input
                                        placeholder="Ingrese el nombre y apellido"
                                        type="text"
                                        value={abogado.nombreApellido}
                                        onChange={(e) => handleInputChange(e, 'nombreApellido', 'abogado')}
                                        className={`w-full p-2 border border-gray-300 rounded text-sm ${abogadoErrors.nombreApellido ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {abogadoErrors.nombreApellido && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1">Matrícula</label>
                                    <input
                                        placeholder="Ingrese la matrícula"
                                        type="number"
                                        value={abogado.matricula}
                                        onChange={(e) => handleInputChange(e, 'matricula', 'abogado')}
                                        className={`w-full p-2 border border-gray-300 rounded text-sm ${abogadoErrors.matricula ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {abogadoErrors.matricula && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Poderes</label>
                                <input
                                    placeholder="Ingrese los poderes"
                                    value={abogado.poderes}
                                    onChange={(e) => handleInputChange(e, 'poderes', 'abogado')}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${abogadoErrors.poderes ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {abogadoErrors.poderes && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div className="flex justify-center mb-4">
                                <button
                                    type="button" // Asegúrate de que sea de tipo "button"
                                    onClick={handleAgregarAbogadoData}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                            <h3 className="text-sm font-bold mt-4">Historial de Abogados</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                {abogados.length > 0 ? (
                                    <ul className="mt-2">
                                        {abogados.map((item, index) => (
                                            <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                                <p className='text-sm'><strong>Nombre y Apellido:</strong> {item.nombreApellido}</p>
                                                <p className='text-sm'><strong>Matrícula:</strong> {item.matricula}</p>
                                                <p className='text-sm'><strong>Poderes:</strong> {item.poderes}</p>
                                                <div>
                                                    <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay historial de abogados registrado aún.
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-1/2 pl-0 md:pl-4">
                        <h2 className="text-xl font-bold mb-4">Carga de Víctima</h2>
                        <form className="bg-white p-4 rounded-md shadow-md">
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                                <input
                                    type="text"
                                    placeholder="Ingrese el nombre y apellido"
                                    value={victima.nombres}
                                    onChange={(e) => setVictima({ ...victima, nombres: e.target.value })}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${victimaErrors.nombres ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {victimaErrors.nombres && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-semibold mb-1">DNI</label>
                                <input
                                    type="number"
                                    placeholder="Ingrese el DNI"
                                    value={victima.dni}
                                    onChange={(e) => setVictima({ ...victima, dni: e.target.value })}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${victimaErrors.dni ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {victimaErrors.dni && <p className="text-red-500 text-sm mt-1">Este campo es obligatorio.</p>}
                            </div>
                            <div className="flex justify-center mb-4">
                                <button
                                    type="button" // Cambiado a tipo button para evitar recarga
                                    onClick={agregarVictima}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                            <h3 className="text-sm font-bold mt-4">Historial de Víctimas</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                {victimas.length > 0 ? (
                                    <ul className="mt-2">
                                        {victimas.map((item, index) => (
                                            <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                                <p className='text-sm'><strong>Nombres:</strong> {item.nombres}</p>
                                                <p className='text-sm'><strong>DNI:</strong> {item.dni}</p>
                                                <div>
                                                    <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay historial de víctimas registrado aún.
                                    </p>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
                <div className="flex justify-between mt-6">
                    <button
                        onClick={handleVolver}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menú Principal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaJudicial;
