import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const [touchStartX, setTouchStartX] = useState(0);
    const [scrollOffset, setScrollOffset] = useState(0);
    
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setScrollOffset(scrollContainerRef.current.scrollLeft);
    };
    
    const handleTouchMove = (e) => {
        const touchMoveX = e.touches[0].clientX;
        const distanceMoved = touchStartX - touchMoveX;
    
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollLeft = scrollOffset + distanceMoved;
        }
    };

    const navigate = useNavigate();
    const location = useLocation();
    const scrollContainerRef = useRef(null);
    const photoInputRef = useRef(null);

    const [originalFields, setOriginalFields] = useState({
        firstName: 'Maximiliano Ezequiel',
        lastName: 'Dominguez',
        alias: 'JL',
        unit: 'Unidad Penitenciaria 9',
        fileNumber: '3576',
        typedoc: 'Cédula Ejemplar B',
        dni: '23123564',
        crime: 'Robo',
        entryDate: '10/06/2024',
        sentenceEndDate: '10/06/2030',
        remainingSentence: '3 años 2 meses 5 días',
        egreso: true,
        leyBlumberg: false,
        leyMicaela: false,
        egresoDate: '2024-09-09',
        numOficioEgreso: '12345',
        photoUrl: null,
        motivoEgreso: 'traslado',
        oficioEgreso: null,
        oficioEgresoFechaCarga: null,
        oficioEgresoFechaEdicion: null,
    });

    const handleFileChange = (e) => {
        const { name, files } = e.target;

        if (name === 'oficioEgreso') {
            if (files.length > 0) {
                setEditableFields((prevFields) => ({
                    ...prevFields,
                    [name]: files[0],
                }));
                setIsFileChanged(true);
            } else {
                setEditableFields((prevFields) => ({
                    ...prevFields,
                    [name]: null,
                }));
                setIsFileChanged(false);
            }
        }
    };

    const handleSave = () => {
        const hasChanges = Object.keys(editableFields).some(
            (key) => editableFields[key] !== originalFields[key]
        );

        if (hasChanges) {
            const currentDateTime = new Date().toLocaleString();

            if (editableFields.oficioEgreso !== originalFields.oficioEgreso) {
                setOriginalFields((prevFields) => ({
                    ...editableFields,
                    oficioEgresoFechaCarga: prevFields.oficioEgresoFechaCarga || currentDateTime,
                    oficioEgresoFechaEdicion: isFileChanged ? currentDateTime : prevFields.oficioEgresoFechaEdicion,
                }));
            } else {
                setOriginalFields((prevFields) => ({
                    ...editableFields,
                }));
            }

            setHasChanges(false);
        }

        setIsEditing(false);
        setIsFileChanged(false);
    };



    const handleCancelEdit = () => {
        setEditableFields({ ...originalFields });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }

        setIsEditing(false);
        setIsFileChanged(false);
    };

    const [editableFields, setEditableFields] = useState({ ...originalFields });
    const [fileDates, setFileDates] = useState({
        carga: null,
        ultimaModificacion: null,
    });
    const [isFileChanged, setIsFileChanged] = useState(false);

    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const fileInputRef = useRef(null);
    const handleEditToggle = () => {
        if (isEditing && hasChanges || isFileChanged) {
            setOriginalFields({ ...editableFields });
            setFileDates({ ...fileDates });
        }
        setIsEditing(!isEditing);
    };

    const handleDownload = (file) => {
        const fileUrl = URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = file.name;
        link.click();
        URL.revokeObjectURL(fileUrl);
    };

    useEffect(() => {
        const hasDifferences = Object.keys(editableFields).some((key) => {
            return editableFields[key] !== originalFields[key];
        });

        setHasChanges(hasDifferences);
    }, [editableFields, originalFields]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditableFields((prevFields) => ({
            ...prevFields,
            [name]: checked,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditableFields((prevFields) => ({
                    ...prevFields,
                    photoUrl: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const areas = [
        'Ficha Ingreso',
        'Área Judicial',
        'Datos Personales',
        'Conducta-Concepto-Fases',
        'Permisos',
        'Antecedentes Penales',
        'Grupo Familiar',
        'Visitas',
        'Salidas',
        'Realojamiento',
        'Alojamiento y movimiento',
        'Salud',
        'Educación',
        'Trabajo',
        'Criminología',
        'Psicológica',
        'Fisionomía',
        'Consejo'
    ];

    const getAreaFromPath = (path) => {
        switch (path) {
            case '/cargasalud':
                return 'Salud';
            case '/cargacriminologia':
                return 'Criminología';
            case '/cargafisionomia':
                return 'Fisionomía';
            case '/cargapermisos':
                return 'Permisos';
            case '/cargaantecedentespenales':
                return 'Antecedentes Penales';
            case '/cargaconducconcepfases':
                return 'Conducta-Concepto-Fases';
            case '/cargarealojamiento':
                return 'Realojamiento';
            case '/cargagrupofamiliar':
                return 'Grupo Familiar';
            case '/cargajudicial':
                return 'Área Judicial';
            case '/cargavisitas':
                return 'Visitas';
            case '/cargasalidas':
                return 'Salidas';
            case '/cargaalojamientoymovimiento':
                return 'Alojamiento y movimiento';
            case '/cargaeducacion':
                return 'Educación';
            case '/cargatrabajo':
                return 'Trabajo';
            case '/cargapsicologia':
                return 'Psicológica';
            case '/cargadatospersonales':
                return 'Datos Personales';
            case '/fichaingreso':
                return 'Ficha Ingreso';
            case '/cargaconsejo':
                return 'Consejo';
            default:
                return 'Psicológica';
        }
    };
    const [selectedArea, setSelectedArea] = useState(getAreaFromPath(location.pathname));

    useEffect(() => {
        setSelectedArea(getAreaFromPath(location.pathname));
    }, [location.pathname]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -150 : 150,
                behavior: 'smooth'
            });
        }
    };

    const handleAreaChange = (area) => {
        setSelectedArea(area);
    
        const container = scrollContainerRef.current;
        const selectedButton = container.querySelector(`[data-area="${area}"]`);
    
        if (selectedButton) {
            const containerRect = container.getBoundingClientRect();
            const buttonRect = selectedButton.getBoundingClientRect();
    
            if (
                buttonRect.left >= containerRect.left &&
                buttonRect.right <= containerRect.right
            ) {
                return;
            }
            container.scrollTo({
                left: selectedButton.offsetLeft - (container.offsetWidth / 2) + (selectedButton.offsetWidth / 2),
                behavior: 'smooth',
            });
        }
    
        // Navegar a la ruta correspondiente
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
            case 'Antecedentes Penales':
                navigate('/cargaantecedentespenales');
                break;
            case 'Conducta-Concepto-Fases':
                navigate('/cargaconducconcepfases');
                break;
            case 'Realojamiento':
                navigate('/cargarealojamiento');
                break;
            case 'Grupo Familiar':
                navigate('/cargagrupofamiliar');
                break;
            case 'Área Judicial':
                navigate('/cargajudicial');
                break;
            case 'Visitas':
                navigate('/cargavisitas');
                break;
            case 'Salidas':
                navigate('/cargasalidas');
                break;
            case 'Alojamiento y movimiento':
                navigate('/cargaalojamientoymovimiento');
                break;
            case 'Educación':
                navigate('/cargaeducacion');
                break;
            case 'Trabajo':
                navigate('/cargatrabajo');
                break;
            case 'Psicológica':
                navigate('/cargapsicologia');
                break;
            case 'Datos Personales':
                navigate('/cargadatospersonales');
                break;
            case 'Ficha Ingreso':
                navigate('/fichaingreso');
                break;
            case 'Consejo':
                navigate('/cargaconsejo');
                break;
            default:
                console.error('Área no definida: ', area);
                break;
        }
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
        }
    }, [selectedArea]);

    return (
        <div>
            {/* Información del usuario, foto y checkboxes */}
            <div className="bg-gray-300 p-4 rounded-md flex flex-col md:flex-row mb-4 items-center md:items-start relative">
                {/* Contenedor principal para asegurar alineación */}
                <div className="flex flex-col md:flex-row items-center md:items-start w-full">
                    {/* Foto */}
                    <div className="relative flex-shrink-0 flex flex-col items-center mb-4 text-center md:text-left w-full md:w-auto">
                        <div className="w-32 h-32 md:w-56 md:h-56 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                            {editableFields.photoUrl ? (
                                <img
                                    src={editableFields.photoUrl}
                                    alt="Foto de usuario"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-center text-white text-xs md:text-base">Foto</span>
                            )}
                        </div>

                        {isEditing && (
                            <>
                                <button
                                    className="mt-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    onClick={() => photoInputRef.current.click()}
                                >
                                    +
                                </button>

                                <input
                                    type="file"
                                    ref={photoInputRef}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </>
                        )}
                        {/* Otros checkboxes */}
                        <div className="flex flex-row space-x-2 mt-5">
                            <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex items-center shadow-sm">
                                <input
                                    type="checkbox"
                                    id="leyBlumberg"
                                    name="leyBlumberg"
                                    checked={editableFields.leyBlumberg}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    disabled={!isEditing}
                                />
                                <label htmlFor="leyBlumberg" className="text-sm">Ley Blumberg</label>
                            </div>
                            <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex items-center shadow-sm">
                                <input
                                    type="checkbox"
                                    id="leyMicaela"
                                    name="leyMicaela"
                                    checked={editableFields.leyMicaela}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    disabled={!isEditing}
                                />
                                <label htmlFor="leyMicaela" className="text-sm">Ley Micaela</label>
                            </div>
                        </div>

                    </div>

                    {/* Datos del usuario */}
                    <div className="space-y-6 md:space-y-7 flex-grow w-full md:w-auto">
                        <h2 className="text-lg font-bold text-center md:text-center">
                            {isEditing ? (
                                <>
                                    <label htmlFor="firstName" className="text-sm font-bold text-black-600">Nombre/s:</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        value={editableFields.firstName}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 p-1 rounded text-sm w-full md:w-3/4 lg:w-1/2"
                                    />
                                    <div className="mt-4">
                                        <label htmlFor="lastName" className="text-sm font-bold text-black-600 mt-2">Apellido/s:</label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            id="lastName"
                                            value={editableFields.lastName}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 p-1 rounded text-sm w-full md:w-3/4 lg:w-1/2"
                                        />
                                    </div>
                                </>
                            ) : (
                                `${editableFields.firstName} ${editableFields.lastName}`
                            )}
                        </h2>
                        <p className="text-sm text-center">
                            <strong>Alias:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="alias"
                                    value={editableFields.alias}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full md:w-3/4 lg:w-1/2"
                                />
                            ) : (
                                editableFields.alias
                            )}
                        </p>
                        <p className="text-sm text-center">
                            <strong>Unidad:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="unit"
                                    value={editableFields.unit}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full md:w-3/4 lg:w-1/2"
                                />
                            ) : (
                                editableFields.unit
                            )}
                        </p>
                        <p className="text-sm text-center">
                            <strong>Legajo:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="fileNumber"
                                    value={editableFields.fileNumber}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full md:w-3/4 lg:w-1/2"
                                />
                            ) : (
                                editableFields.fileNumber
                            )}
                        </p>
                        <p className="text-sm text-center">
                            <strong>Tipo de documento:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="typedoc"
                                    value={editableFields.typedoc}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full md:w-3/4 lg:w-1/2"
                                />
                            ) : (
                                editableFields.typedoc
                            )}
                        </p>
                        <p className="text-sm text-center">
                            <strong>DNI:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="dni"
                                    value={editableFields.dni}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full md:w-3/4 lg:w-1/2"
                                />
                            ) : (
                                editableFields.dni
                            )}
                        </p>
                        <p className="text-sm text-center">
                            <strong>Delito:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="crime"
                                    value={editableFields.crime}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full md:w-3/4 lg:w-1/2"
                                />
                            ) : (
                                editableFields.crime
                            )}
                        </p>
                    </div>

                    {/* Checkboxes alineados a la derecha en pantallas grandes y a la izquierda en pantallas pequeñas */}
                    <div className="flex flex-col space-y-4 md:space-y-2 md:ml-auto w-full md:w-auto">
                        {/* Egreso checkbox y campos */}
                        <div className="p-2 mt-1 border-2 border-gray-300 bg-white rounded-md flex flex-col items-start shadow-sm">
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id="egreso"
                                    name="egreso"
                                    checked={editableFields.egreso}
                                    onChange={handleCheckboxChange}
                                    className="mr-2"
                                    disabled={!isEditing}
                                />
                                <label htmlFor="egreso" className="text-sm">Egreso</label>
                            </div>
                            {editableFields.egreso && (
                                <div className="w-full">
                                    <label htmlFor="egresoDate" className="block text-sm font-semibold mb-1">Fecha de Egreso</label>
                                    <input
                                        type="date"
                                        id="egresoDate"
                                        name="egresoDate"
                                        value={editableFields.egresoDate}
                                        onChange={handleInputChange}
                                        className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
                                        disabled={!isEditing}
                                    />

                                    <label htmlFor="numOficioEgreso" className="block text-sm font-semibold mb-1">Num. Oficio Egreso</label>
                                    <input
                                        type="text"
                                        id="numOficioEgreso"
                                        name="numOficioEgreso"
                                        value={editableFields.numOficioEgreso}
                                        onChange={handleInputChange}
                                        className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
                                        disabled={!isEditing}
                                    />

                                    {/* Motivo de Egreso */}
                                    <label htmlFor="motivoEgreso" className="block text-sm font-semibold mb-1">Motivo de Egreso</label>
                                    <select
                                        id="motivoEgreso"
                                        name="motivoEgreso"
                                        value={editableFields.motivoEgreso}
                                        onChange={handleInputChange}
                                        className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
                                        disabled={!isEditing}
                                    >
                                        <option value="" disabled>Seleccionar motivo de egreso</option>
                                        <option value="traslado">Traslado</option>
                                        <option value="libertad condicional">Libertad Condicional</option>
                                        <option value="libertad asistida">Libertad Asistida</option>
                                        <option value="fallecimiento">Fallecimiento</option>
                                    </select>

                                    <label htmlFor="oficioEgreso" className="block text-sm font-semibold mb-1">Oficio de Egreso</label>
                                    <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                                        <div className="flex items-center justify-between">
                                            <p className="text-gray-500 text-sm">
                                                {editableFields.oficioEgreso
                                                    ? editableFields.oficioEgreso.name
                                                    : originalFields.oficioEgreso
                                                        ? originalFields.oficioEgreso.name
                                                        : 'Ningún archivo cargado'}
                                            </p>

                                            {isEditing ? (
                                                <>
                                                    <button
                                                        type="button"
                                                        onClick={() => fileInputRef.current.click()}
                                                        className="ml-2 p-1 text-xs bg-green-500 text-white rounded-full hover:bg-green-600 transition"
                                                        title="Seleccionar archivo"
                                                    >
                                                        <i className="fas fa-upload"></i>
                                                    </button>
                                                    <input
                                                        type="file"
                                                        id="oficioEgreso"
                                                        name="oficioEgreso"
                                                        accept=".pdf"
                                                        onChange={handleFileChange}
                                                        ref={fileInputRef}
                                                        className="hidden"
                                                    />
                                                </>
                                            ) : (
                                                originalFields.oficioEgreso && (
                                                    <button
                                                        className="ml-2 p-1 text-xs bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                                        onClick={() => handleDownload(originalFields.oficioEgreso)}
                                                        title="Descargar archivo"
                                                    >
                                                        <i className="fas fa-download"></i>
                                                    </button>
                                                )
                                            )}
                                        </div>

                                        {/* Mostrar fechas */}
                                        {originalFields.oficioEgresoFechaCarga && (
                                            <p className="text-xs text-gray-500 mt-2">
                                                <strong>Fecha carga archivo:</strong> {originalFields.oficioEgresoFechaCarga}
                                            </p>
                                        )}
                                        {originalFields.oficioEgresoFechaEdicion && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                <strong>Última edición archivo:</strong> {originalFields.oficioEgresoFechaEdicion}
                                            </p>
                                        )}
                                    </div>



                                </div>
                            )}
                        </div>

                        <div className="mt-auto self-end">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleSave}
                                        className={`text-xs px-2 py-1 rounded-md shadow-md mr-2
                        ${(hasChanges || isFileChanged) ? 'bg-green-400 text-white hover:bg-green-500 cursor-pointer' : 'bg-green-300 text-white cursor-not-allowed'}`}
                                        disabled={!hasChanges && !isFileChanged}
                                        title={!hasChanges && !isFileChanged ? "No hay cambios para guardar" : "Guardar cambios"}
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={handleCancelEdit}
                                        className="bg-gray-400 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-gray-500"
                                    >
                                        Cancelar
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={handleEditToggle}
                                    className="bg-orange-400 text-white text-xs px-2 py-1 rounded-md shadow-md hover:bg-orange-500"
                                >
                                    Editar
                                </button>
                            )}
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
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    {areas.map((area) => (
                        <button
                            key={area}
                            data-area={area}
                            onClick={() => handleAreaChange(area)}
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
        </div>
    );
};

export default Header;
