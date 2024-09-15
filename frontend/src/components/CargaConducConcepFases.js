import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaConducConcepFases = () => {
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

    const [errors, setErrors] = useState({
        conducta: '',
        concepto: '',
        trimestre: '',
        ano: '',
        puntajeConc: '',
        puntajeCond: ''
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

    const [historialCorrectivo, setHistorialCorrectivo] = useState([]);
    const [fechaEvolucion, setFechaEvolucion] = useState('');
    const [historialEvolucion, setHistorialEvolucion] = useState([]);
    const [fechaCorrectivo, setFechaCorrectivo] = useState('');
    const [selectedArea, setSelectedArea] = useState('Conducta-Concepto-Fases');
    const [showModal, setShowModal] = useState(false);
    const [items, setItems] = useState([]);
    const [trimestre, setTrimestre] = useState('');
    const [ano, setAno] = useState('');
    const [conducta, setConducta] = useState('');
    const [puntajeCond, setPuntajeCond] = useState('');
    const [puntajeConc, setPuntajeConc] = useState('');
    const [concepto, setConcepto] = useState('');
    const [correctivo, setCorrectivo] = useState('');
    const [faseActual, setFaseActual] = useState('Ninguna');
    const [fechas, setFechas] = useState({
        Socializacion: { inicio: '', fin: '' },
        Consolidacion: { inicio: '', fin: '' },
        Confianza: { inicio: '', fin: '' }
    });
    const [evolucion, setEvolucion] = useState('');

    const handleAgregarEvolucion = () => {
        if (evolucion.trim() === '' || fechaEvolucion.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                evolucion: 'La descripción y la fecha no pueden estar vacías.'
            }));
            return;
        }

        const fechaCarga = new Date().toLocaleString(); // Obtener la fecha de carga actual

        setHistorialEvolucion([...historialEvolucion, { descripcion: evolucion, fecha: fechaEvolucion, fechaCarga }]);
        setEvolucion('');
        setFechaEvolucion('');
        setErrors((prevErrors) => ({ ...prevErrors, evolucion: '' }));
    };


    const handleAgregarCorrectivo = () => {
        if (correctivo.trim() === '' || fechaCorrectivo.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                correctivo: 'La descripción y la fecha no pueden estar vacías.'
            }));
            return;
        }

        const fechaCarga = new Date().toLocaleString(); // Obtener la fecha de carga actual

        setHistorialCorrectivo([...historialCorrectivo, { descripcion: correctivo, fecha: fechaCorrectivo, fechaCarga }]);
        setCorrectivo('');
        setFechaCorrectivo('');
        setErrors((prevErrors) => ({ ...prevErrors, correctivo: '' }));
    };


    const handleAddItem = () => {
        let hasErrors = false;
        const newErrors = {
            trimestre: '',
            ano: '',
            conducta: '',
            puntajeConc: '',
            puntajeCond: '',
            concepto: ''
        };

        if (!trimestre) {
            newErrors.trimestre = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!ano) {
            newErrors.ano = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!conducta) {
            newErrors.conducta = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!puntajeConc) {
            newErrors.puntajeConc = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!puntajeCond) {
            newErrors.puntajeCond = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!concepto) {
            newErrors.concepto = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                ...newErrors
            }));
        } else {
            const fechaCarga = new Date().toLocaleString(); // Obtener la fecha de carga actual

            setItems([...items, { trimestre, ano, conducta, puntajeCond, concepto, puntajeConc, fechaCarga }]);
            setTrimestre('');
            setAno('');
            setConducta('');
            setPuntajeCond('');
            setPuntajeConc('');
            setConcepto('');
            setErrors({
                trimestre: '',
                ano: '',
                conducta: '',
                puntajeConc: '',
                puntajeCond: '',
                concepto: ''
            });
        }
    };

    const handleDateChange = (fase, tipo, date) => {
        setFechas({
            ...fechas,
            [fase]: {
                ...fechas[fase],
                [tipo]: date
            }
        });
    };

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
            setSelectedArea('Conducta-Concepto-Fases');
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
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga de Conducta-Concepto-Fases</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">Conducta y Concepto</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Trimestre:</label>
                            <input
                                type="number"
                                value={trimestre}
                                onChange={(e) => {
                                    if (e.target.value.length <= 1) {
                                        setTrimestre(e.target.value);
                                    }
                                }}
                                className={`border rounded p-2 w-full text-sm ${errors.trimestre ? 'border-red-500' : 'border-gray-300'}`}
                                min="1"
                                max="10"
                                step="1"
                                placeholder='Ingrese el trimestre'
                            />
                            {errors.trimestre && <p className="text-red-500 text-sm mt-1">{errors.trimestre}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Año:</label>
                            <input
                                type="number"
                                value={ano}
                                onChange={(e) => {
                                    if (e.target.value.length <= 4) {
                                        setAno(e.target.value);
                                    }
                                }}
                                className={`border rounded p-2 w-full text-sm ${errors.ano ? 'border-red-500' : 'border-gray-300'}`}
                                min="1000"
                                max="9999"
                                step="1"
                                placeholder='Ingrese el año'
                            />
                            {errors.ano && <p className="text-red-500 text-sm mt-1">{errors.ano}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Conducta:</label>
                            <input
                                type="text"
                                value={conducta}
                                onChange={(e) => setConducta(e.target.value)}
                                className={`border rounded p-2 w-full text-sm ${errors.conducta ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder='Ingrese la conducta'
                            />
                            {errors.conducta && <p className="text-red-500 text-sm mt-1">{errors.conducta}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Puntaje Conducta:</label>
                            <input
                                type="number"
                                value={puntajeCond}
                                onChange={(e) => {
                                    if (e.target.value >= 0 && e.target.value <= 10) {
                                        setPuntajeCond(e.target.value);
                                    }
                                }}
                                className={`border rounded p-2 w-full text-sm ${errors.puntajeCond ? 'border-red-500' : 'border-gray-300'}`}
                                min="0"
                                max="10"
                                step="1"
                                placeholder='Ingrese el puntaje del conducta'
                            />
                            {errors.puntajeCond && <p className="text-red-500 text-sm mt-1">{errors.puntajeCond}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Concepto:</label>
                            <input
                                type="text"
                                value={concepto}
                                onChange={(e) => setConcepto(e.target.value)}
                                className={`border rounded p-2 w-full text-sm ${errors.concepto ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder='Ingrese el concepto'
                            />
                            {errors.concepto && <p className="text-red-500 text-sm mt-1">{errors.concepto}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Puntaje Concepto:</label>
                            <input
                                type="number"
                                value={puntajeConc}
                                onChange={(e) => {
                                    if (e.target.value >= 0 && e.target.value <= 10) {
                                        setPuntajeConc(e.target.value);
                                    }
                                }}
                                className={`border rounded p-2 w-full text-sm ${errors.puntajeConc ? 'border-red-500' : 'border-gray-300'}`}
                                min="0"
                                max="10"
                                step="1"
                                placeholder='Ingrese el puntaje del concepto'
                            />
                            {errors.puntajeConc && <p className="text-red-500 text-sm mt-1">{errors.puntajeConc}</p>}
                        </div>

                        <div className="flex justify-center mb-4">
                            <button
                                onClick={handleAddItem}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        <table className="min-w-full table-auto border-collapse border border-gray-300 overflow-x-auto overflow-y-auto block md:table md:overflow-visible">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Trimestre</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Año</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Conducta</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Puntaje Conducta</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Concepto</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Puntaje Concepto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.trimestre}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.ano}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.conducta}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.puntajeCond}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.concepto}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.puntajeConc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Sección de Fase actual */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-md font-bold mb-4 flex items-center">
                            <span className="font-bold mr-2">Fase Actual:</span>
                            <span className="text-sm border border-gray-300 bg-gray-100 p-2 rounded">{faseActual}</span>
                        </h2>
                        <table className="min-w-full table-auto border-collapse border border-gray-300 overflow-x-auto overflow-y-auto block md:table md:overflow-visible">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fase</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fecha inicio</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fecha fin</th>
                                </tr>
                            </thead>
                            <tbody>
                                {['Socializacion', 'Consolidacion', 'Confianza'].map((fase) => (
                                    <tr key={fase}>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{fase}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">
                                            <input
                                                type="date"
                                                value={fechas[fase]?.inicio || ''}
                                                onChange={(e) => handleDateChange(fase, 'inicio', e.target.value)}
                                                className="border border-gray-300 rounded p-1 w-full text-sm"
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">
                                            <input
                                                type="date"
                                                value={fechas[fase]?.fin || ''}
                                                onChange={(e) => handleDateChange(fase, 'fin', e.target.value)}
                                                className="border border-gray-300 rounded p-1 w-full text-sm"
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {/* Sección de Evolución */}
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-5">
                            <h2 className="text-lg font-bold">Evolución</h2>
                            <label className="block text-sm font-semibold mt-2">Descripción</label>
                            <textarea
                                value={evolucion}
                                onChange={(e) => setEvolucion(e.target.value)}
                                className={`w-full p-1 border ${errors.evolucion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                                placeholder="Introduce la evolución aquí"
                            />
                            <label className="block text-sm font-semibold mt-2">Fecha</label>
                            <input
                                type="date"
                                value={fechaEvolucion}
                                onChange={(e) => setFechaEvolucion(e.target.value)}
                                className={`w-full p-1 border ${errors.evolucion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            />
                            {errors.evolucion && <p className="text-red-500 text-sm">{errors.evolucion}</p>}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleAgregarEvolucion}
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                            <h3 className="text-sm font-bold mt-4">Historial de Carga</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                {historialEvolucion.length > 0 ? (
                                    <ul className="mt-2">
                                        {historialEvolucion.map((item, index) => (
                                            <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                                <p className='text-sm'><strong>Descripción:</strong> {item.descripcion}</p>
                                                <p className='text-sm'><strong>Fecha:</strong> {item.fecha}</p>
                                                <div>
                                                    <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay historial de evolución registrado aún.
                                    </p>
                                )}
                            </div>

                        </div>

                        {/* Sección de Correctivo Disciplinario */}
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-4">
                            <h2 className="text-lg font-bold">Correctivo Disciplinario</h2>
                            <label className="block text-sm font-semibold mt-2">Descripción</label>
                            <textarea
                                value={correctivo}
                                onChange={(e) => setCorrectivo(e.target.value)}
                                className={`w-full p-1 border ${errors.correctivo ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                                placeholder="Introduce el correctivo aquí"
                            />
                            <label className="block text-sm font-semibold mt-2">Fecha</label>
                            <input
                                type="date"
                                value={fechaCorrectivo}
                                onChange={(e) => setFechaCorrectivo(e.target.value)}
                                className={`w-full p-1 border ${errors.correctivo ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            />
                            {errors.correctivo && <p className="text-red-500 text-sm">{errors.correctivo}</p>}
                            <div className="flex justify-center">
                                <button
                                    onClick={handleAgregarCorrectivo}
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                            <h3 className="text-sm font-bold mt-4">Historial de Carga</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                {historialCorrectivo.length > 0 ? (
                                    <ul className="mt-2">
                                        {historialCorrectivo.map((item, index) => (
                                            <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                                <p className='text-sm'><strong>Descripción:</strong> {item.descripcion}</p>
                                                <p className='text-sm'><strong>Fecha:</strong> {item.fecha}</p>
                                                <div><p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p></div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay historial de correctivo disciplinario registrado aún.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
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
        </div>
    );
};

export default CargaConducConcepFases;
