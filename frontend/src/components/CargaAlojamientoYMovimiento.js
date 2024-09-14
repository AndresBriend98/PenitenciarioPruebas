import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaAlojamientoYMovimiento = () => {
    const navigate = useNavigate();
    const scrollContainerRef = useRef(null);
    const [historial, setHistorial] = useState([]);

    const scroll = (direction) => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -150 : 150,
                behavior: 'smooth'
            });
        }
    };

    const [errors, setErrors] = useState({
        accommodationPlace: '',
        entryDate: '',
        exitDate: '',
        reason: '',
        actFile: ''
    });

    const validateForm = () => {
        const newErrors = {};

        if (!formData.movement.accommodationPlace.trim()) {
            newErrors.accommodationPlace = 'Lugar de alojamiento es obligatorio.';
        }

        if (!formData.movement.entryDate) {
            newErrors.entryDate = 'Fecha de ingreso es obligatoria.';
        }

        if (!formData.movement.exitDate) {
            newErrors.exitDate = 'Fecha de egreso es obligatoria.';
        }

        if (!formData.movement.reason.trim()) {
            newErrors.reason = 'Motivo del traslado es obligatorio.';
        }

        // Verifica si el archivo es seleccionado si es necesario
        if (!formData.movement.actFile) {
            newErrors.actFile = 'Archivo para "Subir Acta" es obligatorio.';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };


    const [formData, setFormData] = useState({
        currentAccommodation: 'Celda 33',
        movement: {
            accommodationPlace: '',
            entryDate: '',
            exitDate: '',
            reason: '',
            actFile: null
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // No hacer nada si hay errores de validación
        }

        // Agregar el nuevo registro al historial con la fecha de carga
        setHistorial((prevHistorial) => [
            ...prevHistorial,
            {
                id: Date.now(),  // Un identificador único para el registro
                lugar: formData.movement.accommodationPlace,
                fechaIngreso: formData.movement.entryDate,
                fechaEgreso: formData.movement.exitDate,
                motivo: formData.movement.reason,
                archivo: formData.movement.actFile ? URL.createObjectURL(formData.movement.actFile) : null,
                fechaCarga: new Date().toLocaleDateString() // Generar la fecha de carga actual
            }
        ]);

        // Limpiar los datos del formulario
        setFormData({
            currentAccommodation: 'Celda 33',
            movement: {
                accommodationPlace: '',
                entryDate: '',
                exitDate: '',
                reason: '',
                actFile: null
            }
        });

        // Limpiar los errores
        setErrors({});
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            movement: {
                ...prevData.movement,
                [name]: value
            }
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            movement: {
                ...prevData.movement,
                actFile: e.target.files[0]
            }
        }));
    };

    const [selectedArea, setSelectedArea] = useState('Alojamiento y movimiento');

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
            setSelectedArea('Alojamiento y movimiento');
        }
    }, [selectedArea]);


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
            setSelectedArea('Alojamiento y movimiento');
        }
    }, [selectedArea]);


    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
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
                <div className="flex flex-col md:flex-row">
                    {/* Formulario */}
                    <div className="flex flex-col w-full md:w-2/3 p-4 bg-white rounded-md shadow-md">
                        <h1 className="text-2xl font-bold mb-4">Carga de Alojamiento y Movimiento</h1>
                        <h2 className="mb-4 flex items-center bg-white p-4 rounded-md shadow-md border border-gray-300 mt-4">
                            <span className="font-bold mr-2">Lugar de alojamiento actual:</span>
                            <span className="text-sm border border-gray-300 bg-gray-100 p-2 rounded">{formData.currentAccommodation}</span>
                        </h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="accommodationPlace" className="block text-sm font-semibold mb-1">Lugar de alojamiento</label>
                            <input
                                placeholder='Ingrese el lugar de alojamiento'
                                type="text"
                                id="accommodationPlace"
                                name="accommodationPlace"
                                value={formData.movement.accommodationPlace}
                                onChange={handleInputChange}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.accommodationPlace ? 'border-red-500' : ''}`}
                            />
                            {errors.accommodationPlace && <p className="text-red-500 text-sm mb-4">{errors.accommodationPlace}</p>}

                            <label htmlFor="entryDate" className="block text-sm font-semibold mb-1 mt-2">Fecha de ingreso</label>
                            <input
                                type="date"
                                id="entryDate"
                                name="entryDate"
                                value={formData.movement.entryDate}
                                onChange={handleInputChange}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.entryDate ? 'border-red-500' : ''}`}
                            />
                            {errors.entryDate && <p className="text-red-500 text-sm mb-4">{errors.entryDate}</p>}

                            <label htmlFor="exitDate" className="block text-sm font-semibold mb-1 mt-2">Fecha de egreso</label>
                            <input
                                type="date"
                                id="exitDate"
                                name="exitDate"
                                value={formData.movement.exitDate}
                                onChange={handleInputChange}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.exitDate ? 'border-red-500' : ''}`}
                            />
                            {errors.exitDate && <p className="text-red-500 text-sm mb-4">{errors.exitDate}</p>}

                            <label htmlFor="reason" className="block text-sm font-semibold mb-1 mt-2">Motivo del traslado</label>
                            <textarea
                                placeholder='Ingrese el motivo del traslado'
                                id="reason"
                                name="reason"
                                value={formData.movement.reason}
                                onChange={handleInputChange}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.reason ? 'border-red-500' : ''}`}
                            ></textarea>
                            {errors.reason && <p className="text-red-500 text-sm mb-4">{errors.reason}</p>}

                            <label htmlFor="actFile" className="block text-sm font-semibold mb-1 mt-2">Subir Acta</label>
                            <input
                                type="file"
                                id="actFile"
                                name="actFile"
                                onChange={handleFileChange}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.actFile ? 'border-red-500' : ''}`}
                            />
                            {errors.actFile && <p className="text-red-500 text-sm mb-4">{errors.actFile}</p>}

                            <div className="flex justify-center mt-5">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                        </form>
                    </div>


                    {/* Historial */}
                    <div className="w-full md:w-1/3 p-4 bg-white rounded-md shadow-md mt-4 md:mt-0">
                        <h1 className="text-lg font-bold mb-4">Historial de Alojamiento y Movimiento</h1>
                        <div className="space-y-4">
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-[600px] overflow-y-auto">
                                {historial.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center">No hay registros de alojamiento y movimiento.</p>
                                ) : (
                                    historial.map((registro) => (
                                        <div key={registro.id} className="p-4 border border-gray-300 rounded-md mt-4">
                                            <p className="text-sm"><strong>Lugar de alojamiento:</strong> {registro.lugar}</p>
                                            <p className="text-sm"><strong>Fecha de ingreso:</strong> {registro.fechaIngreso}</p>
                                            <p className="text-sm"><strong>Fecha de egreso:</strong> {registro.fechaEgreso}</p>
                                            <p className="text-sm"><strong>Motivo del traslado:</strong> {registro.motivo}</p>
                                            {registro.archivo && (
                                                <div>
                                                    <strong className="text-sm">Acta: </strong>
                                                    <a
                                                        href={registro.archivo}
                                                        download
                                                        className="text-blue-500 hover:underline text-sm"
                                                    >
                                                        Descargar
                                                    </a>
                                                </div>
                                            )}
                                            <p className="text-sm text-gray-500 mt-2">
                                                <strong>Fecha de Carga:</strong> {registro.fechaCarga}
                                            </p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

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
        </div>
    );
};

export default CargaAlojamientoYMovimiento;
