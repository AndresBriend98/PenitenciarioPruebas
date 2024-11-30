import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const scrollContainerRef = useRef(null);
    const photoInputRef = useRef(null);

    // Estado para los valores originales
    const [originalFields, setOriginalFields] = useState({
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
        egreso: true,
        leyBlumberg: false,
        leyMicaela: false,
        egresoDate: '2024-09-09',
        numOficioEgreso: '12345',
        photoUrl: null,
    });

    const [editableFields, setEditableFields] = useState({ ...originalFields });
    const [isEditing, setIsEditing] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);


    const handleCancelEdit = () => {
        setEditableFields({ ...originalFields });
        setIsEditing(false);
    };
    
    const handleEditToggle = () => {
        if (isEditing && hasChanges) {
            setOriginalFields({ ...editableFields });
        }
        setIsEditing(!isEditing);
    };
    
    useEffect(() => {
        if (editableFields) {
            const hasDifferences = JSON.stringify(originalFields) !== JSON.stringify(editableFields);
            setHasChanges(hasDifferences);
        }
    }, [editableFields, originalFields]);

    // Manejador para los cambios en los campos de texto
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableFields((prevFields) => ({
            ...prevFields,
            [name]: value,
        }));
    };

    // Manejador para los cambios en la imagen
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

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setEditableFields((prevFields) => ({
            ...prevFields,
            [name]: checked,
        }));
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
                    <div className="relative flex-shrink-0 flex flex-col items-center mb-4 md:mr-4 text-center md:text-left w-full md:w-auto">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
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
                    </div>

                    {/* Datos del usuario */}
                    <div className="space-y-2 md:space-y-3 flex-grow w-full md:w-auto">
                        <h2 className="text-lg font-bold text-center md:text-left">
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="name"
                                    value={editableFields.name}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full"
                                />
                            ) : (
                                editableFields.name
                            )}
                        </h2>
                        <p className="text-sm">
                            <strong>Tipo de interno:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="typeofintern"
                                    value={editableFields.typeofintern}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full"
                                />
                            ) : (
                                editableFields.typeofintern
                            )}
                        </p>
                        <p className="text-sm">
                            <strong>Alias:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="alias"
                                    value={editableFields.alias}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full"
                                />
                            ) : (
                                editableFields.alias
                            )}
                        </p>
                        <p className="text-sm">
                            <strong>Unidad:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="unit"
                                    value={editableFields.unit}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full"
                                />
                            ) : (
                                editableFields.unit
                            )}
                        </p>
                        <p className="text-sm">
                            <strong>Legajo:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="fileNumber"
                                    value={editableFields.fileNumber}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full"
                                />
                            ) : (
                                editableFields.fileNumber
                            )}
                        </p>
                        <p className="text-sm">
                            <strong>Tipo de documento:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="typedoc"
                                    value={editableFields.typedoc}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full"
                                />
                            ) : (
                                editableFields.typedoc
                            )}
                        </p>
                        <p className="text-sm">
                            <strong>DNI:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="dni"
                                    value={editableFields.dni}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full"
                                />
                            ) : (
                                editableFields.dni
                            )}
                        </p>
                        <p className="text-sm">
                            <strong>Delito:</strong>{' '}
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="crime"
                                    value={editableFields.crime}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 p-1 rounded text-sm w-full"
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
                                        className="w-full p-1 border border-gray-300 rounded text-sm"
                                        disabled={!isEditing}
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
                        {/* Botón de edición en la esquina inferior derecha */}
                        <div className="mt-auto self-end">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleEditToggle}
                                        className={`text-xs px-2 py-1 rounded-md shadow-md mr-2
                                        ${hasChanges ?
                                                'bg-green-400 text-white hover:bg-green-500 cursor-pointer' :
                                                'bg-green-300 text-white cursor-not-allowed'}`}
                                        disabled={!hasChanges} // Deshabilitado si no hay cambios
                                        title={!hasChanges ? "No hay cambios para guardar" : "Guardar cambios"}
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
