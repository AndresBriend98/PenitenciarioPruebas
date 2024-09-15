import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaVisitas = () => {
    // Estados para los formularios
    // Estados para los formularios
    const [formData, setFormData] = useState({
        sancionada: {
            foto: '',
            nombre: '',
            relacion: '',
            dni: '',
            motivo: '',
            fechaCumplimiento: '',
            fechaSancion: ''
        },
        prohibida: {
            foto: '',
            nombre: '',
            dni: '',
            relacion: '',
            motivo: ''
        }
    });

    const [errors, setErrors] = useState({
        sancionada: {},
        prohibida: {}
    });

    const photoInputRef = useRef(null);

    // Manejar cambios en los campos de formulario
    const handleInputChange = (e, section) => {
        const { id, value, type: inputType, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [id]: inputType === 'checkbox' ? checked : value
            }
        }));
    };

    // Manejar cambios en el archivo de foto
    const handlePhotoChange = (e, section) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prevState => ({
                    ...prevState,
                    [section]: {
                        ...prevState[section],
                        foto: reader.result
                    }
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Validar los datos del formulario
    const validateForm = (section) => {
        const currentData = formData[section];
        let validationErrors = {};
        if (!currentData.foto) validationErrors.foto = 'La foto es obligatoria';
        if (!currentData.nombre) validationErrors.nombre = 'El nombre es obligatorio';
        if (!currentData.relacion) validationErrors.relacion = 'La relación es obligatoria';
        if (!currentData.dni) validationErrors.dni = 'El DNI es obligatorio';
        if (!currentData.motivo) validationErrors.motivo = 'El motivo es obligatorio';
        if (section === 'sancionada') {
            if (!currentData.fechaCumplimiento) validationErrors.fechaCumplimiento = 'La fecha de cumplimiento es obligatoria';
            if (!currentData.fechaSancion) validationErrors.fechaSancion = 'La fecha de la sanción es obligatoria';
        }
        return validationErrors;
    };

    // Función para manejar la carga de datos de visitas sancionadas
    const handleSubmitSancionada = () => {
        const validationErrors = validateForm('sancionada');
        if (Object.keys(validationErrors).length === 0) {
            // Realizar la carga de datos aquí
            console.log(formData.sancionada);
            // Ejemplo de acción al enviar
            // fetch('/api/cargar-sancionada', { method: 'POST', body: JSON.stringify(formData.sancionada) });
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                sancionada: validationErrors
            }));
        }
    };

    // Función para manejar la carga de datos de visitas prohibidas
    const handleSubmitProhibida = () => {
        const validationErrors = validateForm('prohibida');
        if (Object.keys(validationErrors).length === 0) {
            // Realizar la carga de datos aquí
            console.log(formData.prohibida);
            // Ejemplo de acción al enviar
            // fetch('/api/cargar-prohibida', { method: 'POST', body: JSON.stringify(formData.prohibida) });
        } else {
            setErrors(prevErrors => ({
                ...prevErrors,
                prohibida: validationErrors
            }));
        }
    };

    const [sancionadaData, setSancionadaData] = useState({
        foto: '',
        nombre: '',
        relacion: '',
        dni: '',
        motivo: '',
        fechaCumplimiento: ''
    });

    const [prohibidaData, setProhibidaData] = useState({
        foto: '',
        nombre: '',
        dni: '',
        relacion: '',
        motivo: ''
    });

    const [nuevaVisita, setNuevaVisita] = useState({
        foto: '',
        acreditado: false,
        autorizado: false,
        nombre: '',
        dni: '',
        relacion: '',
        tipoVisita: '',
        motivoVisita: '',
        fechaVisita: '',
        horaVisita: '',
        comportamiento: '',
        observacion: ''
    });

    const handleAddVisita = () => {
        // Lógica para agregar la visita
        console.log(nuevaVisita);
        // Por ejemplo, podrías actualizar el estado o enviar datos a un servidor
    };


    // Ejemplo de cómo podrías usarlo
    const handleInputChangeNuevaVisita = (e) => {
        const { id, value, type, checked } = e.target;
        setNuevaVisita(prevState => ({
            ...prevState,
            [id]: type === 'checkbox' ? checked : value
        }));
    };


    // Estado para datos de visitas sancionadas
    const [visitaSancionada, setVisitaSancionada] = useState({
        foto: '',
        nombre: '',
        relacion: '',
        dni: '',
        motivoSancion: '',
        fechaCumplimiento: '',
    });

    // Estado para datos de visitas prohibidas
    const [visitaProhibida, setVisitaProhibida] = useState({
        foto: '',
        nombre: '',
        dni: '',
        relacion: '',
        motivoProhibicion: '',
    });

    // Manejar cambio de entrada en el formulario de visita sancionada
    const handleInputChangeSancionada = (e) => {
        const { id, value } = e.target;
        setVisitaSancionada(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Manejar cambio de entrada en el formulario de visita prohibida
    const handleInputChangeProhibida = (e) => {
        const { id, value } = e.target;
        setVisitaProhibida(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    // Manejar envío de nueva visita
    const handleSubmitNuevaVisita = () => {
        // Validación y lógica para enviar datos de nueva visita
        console.log('Datos de nueva visita:', nuevaVisita);
        // Aquí iría la lógica para enviar los datos al servidor
    };


    // Estado para Visitas Sancionadas
    const [sancionadas, setSancionadas] = useState({
        fotoSancionada: '',
        nombreSancionada: '',
        relacionSancionada: '',
        dniSancionada: '',
        motivoSancion: '',
        fechaCumplimiento: '',
    });

    // Estado para Visitas Prohibidas
    const [prohibidas, setProhibidas] = useState({
        fotoProhibida: '',
        nombreProhibida: '',
        dniProhibida: '',
        relacionProhibida: '',
        motivoProhibicion: '',
    });

    // Función para manejar cambios en los campos de Nueva Visita
    const handleNuevaVisitaChange = (e) => {
        setNuevaVisita({ ...nuevaVisita, [e.target.name]: e.target.value });
    };

    // Función para manejar cambios en los campos de Visitas Sancionadas
    const handleSancionadasChange = (e) => {
        setSancionadas({ ...sancionadas, [e.target.name]: e.target.value });
    };

    // Función para manejar cambios en los campos de Visitas Prohibidas
    const handleProhibidasChange = (e) => {
        setProhibidas({ ...prohibidas, [e.target.name]: e.target.value });
    };


    // Función para manejar el envío de Visitas Sancionadas
    const handleSubmitSancionadas = () => {
        // Lógica para enviar los datos de las visitas sancionadas
        console.log('Datos de visita sancionada:', sancionadas);
    };

    // Función para manejar el envío de Visitas Prohibidas
    const handleSubmitProhibidas = () => {
        // Lógica para enviar los datos de las visitas prohibidas
        console.log('Datos de visita prohibida:', prohibidas);
    };

    const handleCheckboxChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.checked });
    };

    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -150 : 150,
                behavior: 'smooth'
            });
        }
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
    const [selectedArea, setSelectedArea] = useState('Visitas');;
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
            setSelectedArea('Visitas');
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
                <h1 className="text-2xl font-bold mb-4">Carga de Visitas</h1>
                <div className="space-y-4">
                    {/* Sección de Foto de la Visita */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-32 h-32 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                {nuevaVisita.foto ? (
                                    <img src={nuevaVisita.foto} alt="Foto Visita" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white">Foto</span>
                                )}
                            </div>
                            <button
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => photoInputRef.current.click()}
                            >
                                +
                            </button>
                            <input
                                type="file"
                                ref={photoInputRef}
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>
                        {errors.foto && <p className="text-red-500 text-sm mt-2">{errors.foto}</p>}
                    </div>

                    {/* Checkboxes de Acreditado y Autorizado */}
                    <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="acreditado"
                                checked={nuevaVisita.acreditado}
                                onChange={(e) => handleInputChangeNuevaVisita(e)}
                                className="mr-2"
                            />
                            <label htmlFor="acreditado" className="text-sm font-semibold">Acreditado</label>
                        </div>
                        <div className="flex items-center mt-2 md:mt-0">
                            <input
                                type="checkbox"
                                id="autorizado"
                                checked={nuevaVisita.autorizado}
                                onChange={(e) => handleInputChangeNuevaVisita(e)}
                                className="mr-2"
                            />
                            <label htmlFor="autorizado" className="text-sm font-semibold">Autorizado</label>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-md shadow-md">
                        {/* Nombre/s y Apellido/s */}
                        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                            <div className="flex-grow">
                                <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                                <input
                                    placeholder='Ingresar nombre y apellido'
                                    type="text"
                                    id="nombre"
                                    value={nuevaVisita.nombre}
                                    onChange={(e) => handleInputChangeNuevaVisita(e)}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="dni" className="block text-sm font-semibold mb-1">DNI</label>
                                <input
                                    placeholder='Ingresar DNI'
                                    type="text"
                                    id="dni"
                                    value={nuevaVisita.dni}
                                    onChange={(e) => handleInputChangeNuevaVisita(e)}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}
                            </div>
                        </div>

                        {/* Relación con el interno y Tipo de Visita */}
                        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                            <div className="flex-grow">
                                <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el interno</label>
                                <input
                                    placeholder='Ingresar relación con el interno'
                                    type="text"
                                    id="relacion"
                                    value={nuevaVisita.relacion}
                                    onChange={(e) => handleInputChangeNuevaVisita(e)}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.relacion ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.relacion && <p className="text-red-500 text-sm mt-1">{errors.relacion}</p>}
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="tipoVisita" className="block text-sm font-semibold mb-1">Tipo de Visita</label>
                                <input
                                    placeholder='Ingresar tipo de visita'
                                    type="text"
                                    id="tipoVisita"
                                    value={nuevaVisita.tipoVisita}
                                    onChange={(e) => handleInputChangeNuevaVisita(e)}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.tipoVisita ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.tipoVisita && <p className="text-red-500 text-sm mt-1">{errors.tipoVisita}</p>}
                            </div>
                        </div>

                        {/* Motivo de la Visita, Fecha de la Visita y Hora de la Visita */}
                        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                            <div className="flex-grow">
                                <label htmlFor="motivoVisita" className="block text-sm font-semibold mb-1">Motivo de la Visita</label>
                                <input
                                    placeholder='Ingresar motivo de la visita'
                                    type="text"
                                    id="motivoVisita"
                                    value={nuevaVisita.motivoVisita}
                                    onChange={(e) => handleInputChangeNuevaVisita(e)}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.motivoVisita ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.motivoVisita && <p className="text-red-500 text-sm mt-1">{errors.motivoVisita}</p>}
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="fechaVisita" className="block text-sm font-semibold mb-1">Fecha de la Visita</label>
                                <input
                                    type="date"
                                    id="fechaVisita"
                                    value={nuevaVisita.fechaVisita}
                                    onChange={(e) => handleInputChangeNuevaVisita(e)}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fechaVisita ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.fechaVisita && <p className="text-red-500 text-sm mt-1">{errors.fechaVisita}</p>}
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="horaVisita" className="block text-sm font-semibold mb-1">Hora de la Visita</label>
                                <input
                                    type="time"
                                    id="horaVisita"
                                    value={nuevaVisita.horaVisita}
                                    onChange={(e) => handleInputChangeNuevaVisita(e)}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.horaVisita ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.horaVisita && <p className="text-red-500 text-sm mt-1">{errors.horaVisita}</p>}
                            </div>
                        </div>

                        {/* Comportamiento y Observación */}
                        <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
                            <div className="flex-grow">
                                <label htmlFor="comportamiento" className="block text-sm font-semibold mb-1">Comportamiento</label>
                                <input
                                    placeholder='Ingresar comportamiento'
                                    type="text"
                                    id="comportamiento"
                                    value={nuevaVisita.comportamiento}
                                    onChange={(e) => handleInputChangeNuevaVisita(e)}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.comportamiento ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.comportamiento && <p className="text-red-500 text-sm mt-1">{errors.comportamiento}</p>}
                            </div>
                            <div className="flex-grow">
                                <label htmlFor="observacion" className="block text-sm font-semibold mb-1">Observación</label>
                                <input
                                    placeholder='Ingresar observación'
                                    type="text"
                                    id="observacion"
                                    value={nuevaVisita.observacion}
                                    onChange={(e) => handleInputChangeNuevaVisita(e)}
                                    className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.observacion ? 'border-red-500' : 'border-gray-300'}`}
                                />
                                {errors.observacion && <p className="text-red-500 text-sm mt-1">{errors.observacion}</p>}
                            </div>
                        </div>

                        {/* Botón para Agregar Visita */}
                        <button
                            type="button"
                            onClick={handleAddVisita}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        >
                            Agregar Visita
                        </button>
                    </div>
                </div>
            </div>
            
            <div className="bg-white p-6 rounded-md shadow-md mt-6">
                <div className="flex flex-col md:flex-row md:space-x-6">
                    {/* Sección de Visitas Sancionadas */}
                    <div className="flex-1 bg-gray-100 p-6 rounded-md shadow-md mb-6 md:mb-0">
                        <h2 className="text-lg font-semibold mb-4">Visitas Sancionadas</h2>

                        {/* Foto de la visita sancionada */}
                        <div className="mb-4">
                            <label htmlFor="foto" className="block text-sm font-semibold mb-1">Foto de la Visita Sancionada</label>
                            <input
                                type="file"
                                id="foto"
                                ref={photoInputRef}
                                onChange={(e) => handlePhotoChange(e, 'sancionada')}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.sancionada.foto && <p className="text-red-500 text-sm mt-1">{errors.sancionada.foto}</p>}
                        </div>

                        {/* Nombre/s y Apellido/s */}
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                            <input
                                placeholder='Ingresar nombre y apellido'
                                type="text"
                                id="nombre"
                                value={formData.sancionada.nombre}
                                onChange={(e) => handleInputChange(e, 'sancionada')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.sancionada.nombre ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.sancionada.nombre && <p className="text-red-500 text-sm mt-1">{errors.sancionada.nombre}</p>}
                        </div>

                        {/* Relación con el Interno */}
                        <div className="mb-4">
                            <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el Interno</label>
                            <input
                                placeholder='Ingresar relación con el interno'
                                type="text"
                                id="relacion"
                                value={formData.sancionada.relacion}
                                onChange={(e) => handleInputChange(e, 'sancionada')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.sancionada.relacion ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.sancionada.relacion && <p className="text-red-500 text-sm mt-1">{errors.sancionada.relacion}</p>}
                        </div>

                        {/* DNI */}
                        <div className="mb-4">
                            <label htmlFor="dni" className="block text-sm font-semibold mb-1">DNI</label>
                            <input
                                placeholder='Ingresar DNI'
                                type="text"
                                id="dni"
                                value={formData.sancionada.dni}
                                onChange={(e) => handleInputChange(e, 'sancionada')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.sancionada.dni ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.sancionada.dni && <p className="text-red-500 text-sm mt-1">{errors.sancionada.dni}</p>}
                        </div>

                        {/* Motivo de la Sanción */}
                        <div className="mb-4">
                            <label htmlFor="motivo" className="block text-sm font-semibold mb-1">Motivo de la Sanción</label>
                            <input
                                placeholder='Ingresar motivo de la sanción'
                                type="text"
                                id="motivo"
                                value={formData.sancionada.motivo}
                                onChange={(e) => handleInputChange(e, 'sancionada')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.sancionada.motivo ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.sancionada.motivo && <p className="text-red-500 text-sm mt-1">{errors.sancionada.motivo}</p>}
                        </div>

                        {/* Fecha de Cumplimiento de la Sanción */}
                        <div className="mb-4">
                            <label htmlFor="fechaCumplimiento" className="block text-sm font-semibold mb-1">Fecha de Cumplimiento de la Sanción</label>
                            <input
                                type="date"
                                id="fechaCumplimiento"
                                value={formData.sancionada.fechaCumplimiento}
                                onChange={(e) => handleInputChange(e, 'sancionada')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.sancionada.fechaCumplimiento ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.sancionada.fechaCumplimiento && <p className="text-red-500 text-sm mt-1">{errors.sancionada.fechaCumplimiento}</p>}
                        </div>

                        {/* Fecha de la Sanción */}
                        <div className="mb-4">
                            <label htmlFor="fechaSancion" className="block text-sm font-semibold mb-1">Fecha de la Sanción</label>
                            <input
                                type="date"
                                id="fechaSancion"
                                value={formData.sancionada.fechaSancion}
                                onChange={(e) => handleInputChange(e, 'sancionada')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.sancionada.fechaSancion ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.sancionada.fechaSancion && <p className="text-red-500 text-sm mt-1">{errors.sancionada.fechaSancion}</p>}
                        </div>

                        {/* Botón para Cargar */}
                        <div className="mt-4">
                            <button
                                onClick={handleSubmitSancionada}
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Cargar
                            </button>
                        </div>
                    </div>

                    {/* Sección de Visitas Prohibidas */}
                    <div className="flex-1 bg-gray-100 p-6 rounded-md shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Visitas Prohibidas</h2>

                        {/* Foto de la visita prohibida */}
                        <div className="mb-4">
                            <label htmlFor="foto" className="block text-sm font-semibold mb-1">Foto de la Visita Prohibida</label>
                            <input
                                type="file"
                                id="foto"
                                ref={photoInputRef}
                                onChange={(e) => handlePhotoChange(e, 'prohibida')}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            {errors.prohibida.foto && <p className="text-red-500 text-sm mt-1">{errors.prohibida.foto}</p>}
                        </div>

                        {/* Nombre/s y Apellido/s */}
                        <div className="mb-4">
                            <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                            <input
                                placeholder='Ingresar nombre y apellido'
                                type="text"
                                id="nombre"
                                value={formData.prohibida.nombre}
                                onChange={(e) => handleInputChange(e, 'prohibida')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.prohibida.nombre ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.prohibida.nombre && <p className="text-red-500 text-sm mt-1">{errors.prohibida.nombre}</p>}
                        </div>

                        {/* DNI */}
                        <div className="mb-4">
                            <label htmlFor="dni" className="block text-sm font-semibold mb-1">DNI</label>
                            <input
                                placeholder='Ingresar DNI'
                                type="text"
                                id="dni"
                                value={formData.prohibida.dni}
                                onChange={(e) => handleInputChange(e, 'prohibida')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.prohibida.dni ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.prohibida.dni && <p className="text-red-500 text-sm mt-1">{errors.prohibida.dni}</p>}
                        </div>

                        {/* Relación con el Interno */}
                        <div className="mb-4">
                            <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el Interno</label>
                            <input
                                placeholder='Ingresar relación con el interno'
                                type="text"
                                id="relacion"
                                value={formData.prohibida.relacion}
                                onChange={(e) => handleInputChange(e, 'prohibida')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.prohibida.relacion ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.prohibida.relacion && <p className="text-red-500 text-sm mt-1">{errors.prohibida.relacion}</p>}
                        </div>

                        {/* Motivo */}
                        <div className="mb-4">
                            <label htmlFor="motivo" className="block text-sm font-semibold mb-1">Motivo</label>
                            <input
                                placeholder='Ingresar motivo'
                                type="text"
                                id="motivo"
                                value={formData.prohibida.motivo}
                                onChange={(e) => handleInputChange(e, 'prohibida')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.prohibida.motivo ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.prohibida.motivo && <p className="text-red-500 text-sm mt-1">{errors.prohibida.motivo}</p>}
                        </div>

                        {/* Botón para Cargar */}
                        <div className="mt-4">
                            <button
                                onClick={handleSubmitProhibida}
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Cargar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CargaVisitas;
