import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaGrupoFamiliar = () => {
    const scrollContainerRef = useRef(null);
    const navigate = useNavigate();
    const [historial, setHistorial] = useState([]);

    const [photo, setPhoto] = useState(null);
    const photoInputRef = useRef(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
                setFormData({ ...formData, foto: reader.result }); // Actualizar formData con la foto
            };
            reader.readAsDataURL(file);
        }
    };

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleViewPhoto = (photo) => {
        setSelectedPhoto(photo);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [formData, setFormData] = useState({
        nombre: '',
        relacion: '',
        domicilio: '',
        dni: '',
        fechaNacimiento: '',
        fechaFallecimiento: '',
        observacion: '',
        foto: null,
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (e, field) => {
        setFormData({ ...formData, [field]: e.target.value });
    };

    const handleGuardarCambios = () => {
        const newErrors = {};

        if (!formData.nombre) newErrors.nombre = 'Este campo es obligatorio.';
        if (!formData.relacion) newErrors.relacion = 'Este campo es obligatorio.';
        if (!formData.domicilio) newErrors.domicilio = 'Este campo es obligatorio.';
        if (!formData.dni) newErrors.dni = 'Este campo es obligatorio.';
        if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'Este campo es obligatorio.';
        if (!formData.foto) newErrors.foto = 'La foto es obligatoria.'; // Nueva validación para la foto

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Obtener la fecha y hora actuales
            const fechaCarga = new Date().toLocaleString();

            setHistorial([
                ...historial,
                {
                    nombre: formData.nombre,
                    relacion: formData.relacion,
                    domicilio: formData.domicilio,
                    dni: formData.dni,
                    fechaNacimiento: formData.fechaNacimiento,
                    fechaFallecimiento: formData.fechaFallecimiento || '',
                    observacion: formData.observacion || '',
                    foto: formData.foto,
                    fechaCarga // Añadido
                }
            ]);

            setFormData({
                nombre: '',
                relacion: '',
                domicilio: '',
                dni: '',
                fechaNacimiento: '',
                fechaFallecimiento: '',
                observacion: '',
                foto: null,
            });
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

    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos del formulario
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

    const [selectedArea, setSelectedArea] = useState('Grupo Familiar');;
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
            setSelectedArea('Grupo Familiar');
        }
    }, [selectedArea]);

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-md shadow-lg text-center">
                        <h2 className="text-sm font-bold mb-2">Datos cargados con éxito</h2>
                    </div>
                </div>
            )}

            {/* Información del usuario, foto y checkboxes */}
            <div className="bg-gray-300 p-4 rounded-md flex flex-col md:flex-row mb-4 items-start">
                {/* Foto y datos del usuario */}
                <div className="flex items-start flex-grow">
                    {/* Foto y botón de carga */}
                    <div className="relative mr-4 flex-shrink-0 flex flex-col items-center mt-4">
                        <div className="w-48 h-48 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden mb-2">
                            <span className="text-center text-white">Foto</span>
                        </div>
                    </div>
                    {/* Datos del usuario */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-bold text-center">{user.name}</h2>
                        <p className="mt-1 text-sm"><strong>Tipo de interno:</strong> {user.typeofintern}</p>
                        <p className="mt-1 text-sm"><strong>Alias:</strong> {user.alias}</p>
                        <p className="mt-1 text-sm"><strong>Unidad:</strong> {user.unit}</p>
                        <p className="mt-1 text-sm"><strong>Legajo:</strong> {user.fileNumber}</p>
                        <p className="mt-1 text-sm"><strong>Tipo de documento:</strong> {user.typedoc}</p>
                        <p className="mt-1 text-sm"><strong>DNI:</strong> {user.dni}</p>
                        <p className="mt-1 text-sm"><strong>Delito:</strong> {user.crime}</p>
                    </div>
                </div>
                {/* Checkboxes alineados a la derecha */}
                <div className="flex flex-col space-y-2 ml-auto mt-4 md:mt-0">
                    {/* Egreso checkbox y campos */}
                    <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex flex-col items-start shadow-sm">
                        <div className="flex items-center">
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
                            <div className="w-full mt-2">
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
                    <div className="flex space-x-2 mt-4">
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
                <h1 className="text-2xl font-bold mb-4">Grupo Familiar</h1>
                <div className="space-y-4">
                    {/* Sección de Foto de Grupo Familiar */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-32 h-32 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                {formData.foto ? (
                                    <img src={formData.foto} alt="Foto Grupo Familiar" className="w-full h-full object-cover" />
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
                        {errors.foto && <p className="text-red-500 text-sm mt-2">{errors.foto}</p>} {/* Mostrar mensaje de error debajo de la foto */}
                    </div>

                    {/* Resto del formulario */}
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                            <input
                                placeholder='Ingresar nombre y apellido'
                                type="text"
                                id="nombre"
                                value={formData.nombre}
                                onChange={(e) => handleInputChange(e, 'nombre')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="relacion" className="block text-sm font-semibold mb-1 mt-3">Relación con el interno</label>
                            <input
                                placeholder='Ingresar relacion con el interno'
                                type="text"
                                id="relacion"
                                value={formData.relacion}
                                onChange={(e) => handleInputChange(e, 'relacion')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.relacion ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.relacion && <p className="text-red-500 text-sm mt-1">{errors.relacion}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="domicilio" className="block text-sm font-semibold mb-1">Domicilio</label>
                            <input
                                placeholder='Ingresar domicilio'
                                type="text"
                                id="domicilio"
                                value={formData.domicilio}
                                onChange={(e) => handleInputChange(e, 'domicilio')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.domicilio ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.domicilio && <p className="text-red-500 text-sm mt-1">{errors.domicilio}</p>}
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="dni" className="block text-sm font-semibold mb-1 mt-3">DNI/M.I</label>
                            <input
                                placeholder='Ingresar DNI/M.I'
                                type="text"
                                id="dni"
                                value={formData.dni}
                                onChange={(e) => handleInputChange(e, 'dni')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="fechaNacimiento" className="block text-sm font-semibold mb-1">Fecha de nacimiento</label>
                            <input
                                type="date"
                                id="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={(e) => handleInputChange(e, 'fechaNacimiento')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fechaNacimiento ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.fechaNacimiento && <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>}
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="fechaFallecimiento" className="block text-sm font-semibold mb-1 mt-3">Fecha de fallecimiento</label>
                            <input
                                type="date"
                                id="fechaFallecimiento"
                                value={formData.fechaFallecimiento}
                                onChange={(e) => handleInputChange(e, 'fechaFallecimiento')}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="observacion" className="block text-sm font-semibold mb-1">Observación</label>
                        <textarea
                            placeholder='Ingresar observación'
                            id="observacion"
                            rows="4"
                            value={formData.observacion}
                            onChange={(e) => handleInputChange(e, 'observacion')}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-4">
                        <button
                            onClick={handleGuardarCambios}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>
                {/* Historial de Grupo Familiar */}
                <div className="bg-white p-4 rounded-md shadow-md mt-6">
                    <h3 className="text-sm font-bold">Historial de Carga</h3>
                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {historial.length > 0 ? (
                            <ul className="mt-2">
                                {historial.map((item, index) => (
                                    <li key={index} className="border border-gray-300 p-2 mb-2 rounded bg-white shadow-sm">
                                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                            <div>
                                                <p className='text-sm'><strong>Nombre/s y Apellido/s:</strong> {item.nombre}</p>
                                                <p className='text-sm'><strong>Relación con el interno:</strong> {item.relacion}</p>
                                                <p className='text-sm'><strong>Domicilio:</strong> {item.domicilio}</p>
                                                <p className='text-sm'><strong>DNI/M.I:</strong> {item.dni}</p>
                                                <p className='text-sm'><strong>Fecha de nacimiento:</strong> {item.fechaNacimiento}</p>
                                                {item.fechaFallecimiento && (
                                                    <p className='text-sm'><strong>Fecha de fallecimiento:</strong> {item.fechaFallecimiento}</p>
                                                )}
                                                {item.observacion && (
                                                    <p className='text-sm'><strong>Observación:</strong> {item.observacion}</p>
                                                )}
                                                <div><p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p></div>
                                            </div>
                                            {item.foto && (
                                                <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center">
                                                    <div className="w-16 h-16 bg-gray-500 rounded-full overflow-hidden">
                                                        <img src={item.foto} alt="Foto Grupo Familiar" className="w-full h-full object-cover" />
                                                    </div>
                                                    <button
                                                        onClick={() => handleViewPhoto(item.foto)}
                                                        className="mt-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                    >
                                                        Ver
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 text-center">
                                No hay registros de grupo familiar aún.
                            </p>
                        )}
                    </div>
                </div>

                {/* Modal para ver la imagen en grande */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-md shadow-lg relative max-w-lg w-full">
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                X
                            </button>
                            <img src={selectedPhoto} alt="Foto Grande" className="w-full h-auto object-contain" />
                        </div>
                    </div>
                )}
                <div className="flex justify-between mt-10">
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

export default CargaGrupoFamiliar;
