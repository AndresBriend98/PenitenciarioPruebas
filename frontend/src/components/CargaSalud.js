import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import JSZip from "jszip";
import Header from './Header';

const CargaSalud = () => {
    const navigate = useNavigate();
    const [tratamientoKey, setTratamientoKey] = useState(0);
    const [vacunaKey, setVacunaKey] = useState(0);
    const [atencionKey, setAtencionKey] = useState(0);
    const [tratamientoData, setTratamientoData] = useState({ descripcion: '', fecha: '', file: null, fileName: '' });
    const [vacunaData, setVacunaData] = useState({ descripcion: '', fecha: '', file: null, fileName: '' });
    const [atencionData, setAtencionData] = useState({ descripcion: '', fecha: '', hora: '', file: null, fileName: '' });
    const [tratamientos, setTratamientos] = useState([]);
    const [vacunas, setVacunas] = useState([]);
    const [atenciones, setAtenciones] = useState([]);
    const [padecimientoData, setPadecimientoData] = useState({ descripcion: '', fecha: '', file: null, fileName: '' });
    const [fileKey, setFileKey] = useState(0);
    const [historialpadecimiento, setHistorialpadecimiento] = useState([]);
    // Estado para el modal de Tratamientos
    const [isModalOpenTratamiento, setIsModalOpenTratamiento] = useState(false);

    // Deshabilitar el scroll cuando el modal de Tratamientos está abierto
    useEffect(() => {
        if (isModalOpenTratamiento) {
            document.body.style.overflow = "hidden"; // Deshabilita el scroll
        } else {
            document.body.style.overflow = "auto"; // Restaura el scroll cuando se cierra el modal
        }

        return () => {
            document.body.style.overflow = "auto"; // Restaura cuando el componente se desmonta
        };
    }, [isModalOpenTratamiento]);

    // Estado para el modal de Padecimientos
    const [isModalOpenPadecimiento, setIsModalOpenPadecimiento] = useState(false);

    // Función para descargar todos los archivos cargados como ZIP (específica para Tratamientos)
    const handleDownloadAllFilesTratamiento = () => {
        const zip = new JSZip();
        const zipFilename = "archivos_tratamientos.zip";

        // Crear una lista de promesas para cada archivo descargable
        const filePromises = sortedHistorialTratamientos.map((item) => {
            if (item.file) {
                return fetch(item.file)
                    .then((response) => response.blob())
                    .then((blob) => {
                        zip.file(item.fileName, blob);
                    });
            }
            return null; // Si no hay archivo, no hacemos nada
        });

        // Usar Promise.all para esperar a que todas las descargas se completen
        Promise.all(filePromises).then(() => {
            zip.generateAsync({ type: "blob" }).then((content) => {
                // Descargar el archivo ZIP generado
                const a = document.createElement("a");
                a.href = URL.createObjectURL(content);
                a.download = zipFilename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        });
    };

    const handleAgregarTratamiento = () => {
        let hasErrors = false;
        const newErrors = { descripcion: '', fecha: '' };

        if (!tratamientoData.descripcion) {
            newErrors.descripcion = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!tratamientoData.fecha) {
            newErrors.fecha = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                tratamientos: newErrors
            }));
        } else {
            const tratamientoConFecha = {
                ...tratamientoData,
                fechaCarga: new Date().toLocaleString(),
                file: tratamientoData.file ? URL.createObjectURL(tratamientoData.file) : '', // Convertir archivo a URL para mostrarlo
            };

            setTratamientos([...tratamientos, tratamientoConFecha]);
            setTratamientoData({ descripcion: '', fecha: '', file: null, fileName: '' });
            setFileKey(prevKey => prevKey + 1); // Reiniciar el input
            setErrors(prevErrors => ({
                ...prevErrors,
                tratamientos: { descripcion: '', fecha: '' }
            }));
        }
    };

    // Función para ordenar por fecha de carga los tratamientos
    const sortedHistorialTratamientos = [...tratamientos].sort((a, b) => new Date(b.fechaCarga) - new Date(a.fechaCarga));

    // Función para descargar todos los archivos cargados como ZIP (específica para Padecimientos)
    const handleDownloadAllFilesPadecimiento = () => {
        const zip = new JSZip();
        const zipFilename = "archivos_padecimientos.zip";

        // Crear una lista de promesas para cada archivo descargable
        const filePromises = sortedHistorial.map((item) => {
            if (item.file) {
                return fetch(item.file)
                    .then((response) => response.blob())
                    .then((blob) => {
                        zip.file(item.fileName, blob);
                    });
            }
            return null; // Si no hay archivo, no hacemos nada
        });

        // Usar Promise.all para esperar a que todas las descargas se completen
        Promise.all(filePromises).then(() => {
            zip.generateAsync({ type: "blob" }).then((content) => {
                // Descargar el archivo ZIP generado
                const a = document.createElement("a");
                a.href = URL.createObjectURL(content);
                a.download = zipFilename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        });
    };
    const handleAgregarPadecimiento = () => {
        let hasErrors = false;
        const newErrors = { descripcion: '', fecha: '' };

        if (!padecimientoData.descripcion) {
            newErrors.descripcion = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!padecimientoData.fecha) {
            newErrors.fecha = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                padecimientos: newErrors
            }));
        } else {
            const padecimientoConFecha = {
                ...padecimientoData,
                fechaCarga: new Date().toLocaleString(),
                file: padecimientoData.file ? URL.createObjectURL(padecimientoData.file) : '', // Asegúrate de esto
                fileName: padecimientoData.fileName
            };

            setHistorialpadecimiento([...historialpadecimiento, padecimientoConFecha]);
            setPadecimientoData({ descripcion: '', fecha: '', file: null, fileName: '' });
            setFileKey(prevKey => prevKey + 1); // Reiniciar el input
            setErrors(prevErrors => ({
                ...prevErrors,
                padecimientos: { descripcion: '', fecha: '' }
            }));
        }
    };

    // Función para ordenar por fecha de carga
    const sortedHistorial = [...historialpadecimiento].sort((a, b) => new Date(b.fechaCarga) - new Date(a.fechaCarga));

    const [errors, setErrors] = useState({
        vacunas: { descripcion: '', fecha: '' },
        atenciones: { descripcion: '', fecha: '', hora: '' },
        tratamientos: { descripcion: '', fecha: '' },
        padecimientos: { descripcion: '', fecha: '' }
    });

    // Manejadores de archivos
    const handleFileChange = (e, section) => {
        const file = e.target.files[0];
        if (section === "padecimiento") {
            setPadecimientoData({
                ...padecimientoData,
                file: file,
                fileName: file ? file.name : '',
            });
        } else if (section === "tratamiento") {
            setTratamientoData({
                ...tratamientoData,
                file: file,
                fileName: file ? file.name : '',
            });
        } else if (section === "vacuna") {
            setVacunaData({
                ...vacunaData,
                file: file,
                fileName: file ? file.name : '',
            });
        } else if (section === "atencion") {
            setAtencionData({
                ...atencionData,
                file: file,
                fileName: file ? file.name : '',
            });
        }
    };

    const handleAgregarVacuna = () => {
        let hasErrors = false;
        const newErrors = { descripcion: '', fecha: '' };

        if (!vacunaData.descripcion) {
            newErrors.descripcion = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!vacunaData.fecha) {
            newErrors.fecha = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                vacunas: newErrors
            }));
        } else {
            const vacunaConFecha = {
                ...vacunaData,
                fechaCarga: new Date().toLocaleString(),
                file: vacunaData.file ? URL.createObjectURL(vacunaData.file) : '',
            };

            setVacunas([...vacunas, vacunaConFecha]);
            setVacunaData({ descripcion: '', fecha: '', file: null, fileName: '' });
            setVacunaKey(prevKey => prevKey + 1); // Reiniciar el input
            setErrors(prevErrors => ({
                ...prevErrors,
                vacunas: { descripcion: '', fecha: '' }
            }));
        }
    };
    const [isModalOpenVacuna, setIsModalOpenVacuna] = useState(false);
    // Función para descargar todos los archivos como ZIP
    const handleDownloadAllFilesVacuna = () => {
        const archivos = vacunas.filter(item => item.file);  // Filtra los elementos que tienen archivos

        if (archivos.length === 0) {
            alert("No hay archivos para descargar.");
            return;
        }

        // Genera un ZIP con los archivos (esto requiere la librería JSZIP o similar)
        const zip = new JSZip();
        archivos.forEach((item, index) => {
            zip.file(item.fileName, item.file);
        });

        // Guarda el archivo ZIP en el navegador
        zip.generateAsync({ type: "blob" }).then(content => {
            const blob = new Blob([content], { type: "application/zip" });
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "vacunas.zip";  // Nombre del archivo zip
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    // Función para descargar todos los archivos cargados como ZIP (específica para Atenciones)
    const handleDownloadAllFilesAtencion = () => {
        const zip = new JSZip();
        const zipFilename = "archivos_atenciones.zip";

        // Crear una lista de promesas para cada archivo descargable
        const filePromises = sortedHistorialAtenciones.map((item) => {
            if (item.file) {
                return fetch(item.file)
                    .then((response) => response.blob())
                    .then((blob) => {
                        zip.file(item.fileName, blob);
                    });
            }
            return null; // Si no hay archivo, no hacemos nada
        });

        // Usar Promise.all para esperar a que todas las descargas se completen
        Promise.all(filePromises).then(() => {
            zip.generateAsync({ type: "blob" }).then((content) => {
                // Descargar el archivo ZIP generado
                const a = document.createElement("a");
                a.href = URL.createObjectURL(content);
                a.download = zipFilename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            });
        });
    };

    const handleAgregarAtencion = () => {
        let hasErrors = false;
        const newErrors = { descripcion: '', fecha: '', hora: '' };

        // Validar campos
        if (!atencionData.descripcion) {
            newErrors.descripcion = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!atencionData.fecha) {
            newErrors.fecha = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!atencionData.hora) {
            newErrors.hora = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        // Si hay errores, los actualizamos
        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                atenciones: newErrors
            }));
        } else {
            // Si no hay errores, creamos una nueva atención
            const atencionConFecha = {
                ...atencionData,
                fechaCarga: new Date().toLocaleString(),
                file: atencionData.file ? URL.createObjectURL(atencionData.file) : '',
            };

            // Agregar la nueva atención al historial
            setAtenciones([...atenciones, atencionConFecha]);

            // Limpiar los datos para la siguiente atención
            setAtencionData({ descripcion: '', fecha: '', hora: '', file: null, fileName: '' });
            setAtencionKey(prevKey => prevKey + 1); // Reiniciar input
            setErrors(prevErrors => ({
                ...prevErrors,
                atenciones: { descripcion: '', fecha: '', hora: '' }
            }));
        }
    };

    // Estado para el modal de archivos cargados de atenciones
    const [isModalOpenAtencion, setIsModalOpenAtencion] = useState(false); // Modal abierto o cerrado para atenciones
    // Función para ordenar por fecha de carga
    const sortedHistorialAtenciones = [...atenciones].sort((a, b) => new Date(b.fechaCarga) - new Date(a.fechaCarga));

    const handleGenerarInforme = () => {
    };

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            {/* Formulario dividido en cuatro secciones */}
            <div className='bg-white p-4 rounded-md shadow-md'>
                <h1 className="text-xl font-bold mb-4">Carga de Salud</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Padecimientos */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold mb-2">Padecimientos</h2>
                        {/* Input para descripción y fecha */}
                        <label className="block text-sm font-semibold  mb-2">Descripción</label>
                        <input
                            type="text"
                            value={padecimientoData.descripcion}
                            onChange={(e) => setPadecimientoData({ ...padecimientoData, descripcion: e.target.value })}
                            className={`w-full p-1 border ${errors.padecimientos.descripcion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            placeholder="Introduce la descripción aquí"
                        />
                        {errors.padecimientos.descripcion && <p className="text-red-500 text-sm">{errors.padecimientos.descripcion}</p>}

                        <label className="block text-sm font-semibold mb-2">Fecha</label>
                        <input
                            type="date"
                            value={padecimientoData.fecha}
                            onChange={(e) => setPadecimientoData({ ...padecimientoData, fecha: e.target.value })}
                            className={`w-full p-1 border ${errors.padecimientos.fecha ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.padecimientos.fecha && <p className="text-red-500 text-sm">{errors.padecimientos.fecha}</p>}

                        {/* Input para subir archivo */}
                        <label className="block text-sm font-semibold  mb-2">Archivo adjunto</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            onChange={(e) => handleFileChange(e, "padecimiento")}
                            key={fileKey}
                            className={`w-full p-1 border ${errors.padecimientos.file ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />

                        {errors.padecimientos.file && <p className="text-red-500 text-sm">{errors.padecimientos.file}</p>}

                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarPadecimiento}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-5">
                            <h3 className="text-sm font-bold">Historial de Padecimientos</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                {historialpadecimiento.length > 0 ? (
                                    <ul className="space-y-2 mt-2">
                                        {historialpadecimiento.map((item, index) => (
                                            <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                <div className="text-sm">
                                                    <strong>Descripción:</strong> {item.descripcion}
                                                </div>
                                                <div className="text-sm">
                                                    <strong>Fecha:</strong> {item.fecha}
                                                </div>
                                                {item.file && (
                                                    <div>
                                                        <span className="text-sm"><strong>Archivo adjunto:</strong></span>
                                                        <a
                                                            href={item.file}
                                                            download={item.fileName}
                                                            className="ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar Archivo
                                                        </a>
                                                    </div>
                                                )}
                                                <div className="text-sm text-gray-500 mt-2">
                                                    <strong>Fecha de Carga:</strong> {item.fechaCarga}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay padecimientos registrados aún.
                                    </p>
                                )}
                            </div>
                            {historialpadecimiento.some(item => item.file) && (
                                <div className="flex justify-end mt-4">
                                    {/* Botón para abrir el modal de archivos cargados en Padecimientos */}
                                    <button
                                        onClick={() => setIsModalOpenPadecimiento(true)}
                                        className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900 text-xs"
                                    >
                                        Ver archivos cargados
                                    </button>
                                </div>
                            )}
                            {isModalOpenPadecimiento && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg mx-auto">
                                        <button
                                            onClick={() => setIsModalOpenPadecimiento(false)}
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

                                        <h3 className="text-lg font-bold text-center">Archivos cargados de Padecimientos</h3>
                                        <div className="mt-4 max-h-64 md:max-h-96 overflow-y-auto">
                                            <ul className="space-y-2">
                                                {sortedHistorial.filter(item => item.file).length > 0 ? (
                                                    sortedHistorial
                                                        .filter(item => item.file) // Filtrar solo los que tienen archivo adjunto
                                                        .map((item, index) => (
                                                            <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                                <div>
                                                                    <span className="text-sm"><strong>Archivo:</strong></span>
                                                                    <a
                                                                        href={item.file}
                                                                        download={item.fileName}
                                                                        className="ml-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                                    >
                                                                        {item.fileName}
                                                                    </a>
                                                                </div>
                                                                <div className="text-sm text-gray-500 mt-2">
                                                                    <strong className="text-xs">Fecha de Carga:</strong> {item.fechaCarga}
                                                                </div>
                                                            </li>
                                                        ))
                                                ) : (
                                                    <p className="text-sm text-gray-500 text-center">No hay archivos cargados aún.</p>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Botón para descargar todos los archivos como ZIP */}
                                        {sortedHistorial.some(item => item.file) && (
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    onClick={handleDownloadAllFilesPadecimiento}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 text-xs"
                                                >
                                                    Descargar todos los archivos
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tratamientos */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold mb-2">Tratamientos</h2>
                        <label className="block text-sm font-semibold  mb-2">Descripción</label>
                        <input
                            type="text"
                            value={tratamientoData.descripcion}
                            onChange={(e) => setTratamientoData({ ...tratamientoData, descripcion: e.target.value })}
                            className={`w-full p-1 border ${errors.tratamientos.descripcion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            placeholder="Introduce la descripción aquí"
                        />
                        {errors.tratamientos.descripcion && <p className="text-red-500 text-sm">{errors.tratamientos.descripcion}</p>}

                        <label className="block text-sm font-semibold mb-2">Fecha</label>
                        <input
                            type="date"
                            value={tratamientoData.fecha}
                            onChange={(e) => setTratamientoData({ ...tratamientoData, fecha: e.target.value })}
                            className={`w-full p-1 border ${errors.tratamientos.fecha ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.tratamientos.fecha && <p className="text-red-500 text-sm">{errors.tratamientos.fecha}</p>}
                        {/* Input para subir archivo de tratamiento */}
                        <label className="block text-sm font-semibold  mb-2">Archivo adjunto</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx,.jpg,.png"
                            onChange={(e) => handleFileChange(e, "tratamiento")}
                            key={tratamientoKey} // Usamos la clave para forzar el reset del input
                            className={`w-full p-1 border ${errors.tratamientos.file ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />

                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarTratamiento}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        {/* Historial de Tratamientos */}
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-5">
                            <h3 className="text-sm font-bold mt-4">Historial de Tratamientos</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                {tratamientos.length > 0 ? (
                                    <ul className="space-y-2 mt-2">
                                        {tratamientos.map((item, index) => (
                                            <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                <div className="text-sm">
                                                    <strong>Descripción:</strong> {item.descripcion}
                                                </div>
                                                <div className="text-sm">
                                                    <strong>Fecha:</strong> {item.fecha}
                                                </div>
                                                {item.file ? (
                                                    <div>
                                                        <span className="text-sm"><strong>Archivo adjunto:</strong></span>
                                                        <a
                                                            href={item.file}
                                                            download={item.fileName} // El archivo será descargado con su nombre original
                                                            className="ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar Archivo
                                                        </a>
                                                    </div>
                                                ) : null}
                                                <div className="text-sm text-gray-500 mt-2">
                                                    <strong>Fecha de Carga:</strong> {item.fechaCarga}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">No hay tratamientos registrados aún.</p>
                                )}
                            </div>

                            {/* Modal para ver los archivos cargados y descargarlos */}
                            {tratamientos.some(item => item.file) && (
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => setIsModalOpenTratamiento(true)}
                                        className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900 text-xs"
                                    >
                                        Ver archivos cargados
                                    </button>
                                </div>
                            )}

                            {/* Modal de archivos cargados de Tratamientos */}
                            {isModalOpenTratamiento && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg mx-auto">
                                        <button
                                            onClick={() => setIsModalOpenTratamiento(false)}
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

                                        <h3 className="text-lg font-bold text-center">Archivos cargados de Tratamientos</h3>
                                        <div className="mt-4 max-h-64 md:max-h-96 overflow-y-auto">
                                            <ul className="space-y-2">
                                                {tratamientos.filter(item => item.file).length > 0 ? (
                                                    tratamientos
                                                        .filter(item => item.file) // Filtrar solo tratamientos con archivos adjuntos
                                                        .map((item, index) => (
                                                            <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                                <div>
                                                                    <span className="text-sm"><strong>Archivo:</strong></span>
                                                                    <a
                                                                        href={item.file}
                                                                        download={item.fileName}
                                                                        className="ml-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                                    >
                                                                        {item.fileName}
                                                                    </a>
                                                                </div>
                                                                <div className="text-sm text-gray-500 mt-2">
                                                                    <strong className="text-xs">Fecha de Carga:</strong> {item.fechaCarga}
                                                                </div>
                                                            </li>
                                                        ))
                                                ) : (
                                                    <p className="text-sm text-gray-500 text-center">No hay archivos cargados.</p>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Botón para descargar todos los archivos como ZIP */}
                                        {tratamientos.some(item => item.file) && (
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    onClick={handleDownloadAllFilesTratamiento}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 text-xs"
                                                >
                                                    Descargar todos los archivos
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Vacunas */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold mb-2">Vacunas</h2>
                        <label className="block text-sm font-semibold  mb-2">Descripción</label>
                        <input
                            type="text"
                            value={vacunaData.descripcion}
                            onChange={(e) => setVacunaData({ ...vacunaData, descripcion: e.target.value })}
                            className={`w-full p-1 border ${errors.vacunas.descripcion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            placeholder="Introduce la descripción aquí"
                        />
                        {errors.vacunas.descripcion && <p className="text-red-500 text-sm">{errors.vacunas.descripcion}</p>}

                        <label className="block text-sm font-semibold mb-2">Fecha</label>
                        <input
                            type="date"
                            value={vacunaData.fecha}
                            onChange={(e) => setVacunaData({ ...vacunaData, fecha: e.target.value })}
                            className={`w-full p-1 border ${errors.vacunas.fecha ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.vacunas.fecha && <p className="text-red-500 text-sm">{errors.vacunas.fecha}</p>}
                        <label className="block text-sm font-semibold  mb-2">Archivo adjunto</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e, "vacuna")}
                            key={vacunaKey} // Usamos la clave para forzar el reset
                            className={`w-full p-1 border ${errors.vacunas.file ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarVacuna}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                        {/* Historial de Vacunas */}
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-5">
                            <h3 className="text-sm font-bold mt-4">Historial de Vacunas</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                {vacunas.length > 0 ? (
                                    <ul className="space-y-2 mt-2">
                                        {vacunas.map((item, index) => (
                                            <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                <div className="text-sm">
                                                    <strong>Descripción:</strong> {item.descripcion}
                                                </div>
                                                <div className="text-sm">
                                                    <strong>Fecha:</strong> {item.fecha}
                                                </div>
                                                {item.file ? (
                                                    <div>
                                                        <span className="text-sm"><strong>Archivo adjunto:</strong></span>
                                                        <a
                                                            href={item.file}
                                                            download={item.fileName} // El archivo se descarga con su nombre original
                                                            className="ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar Archivo
                                                        </a>
                                                    </div>
                                                ) : null}
                                                <div className="text-sm text-gray-500 mt-2">
                                                    <strong>Fecha de Carga:</strong> {item.fechaCarga}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay vacunas registradas aún.
                                    </p>
                                )}
                            </div>

                            {/* Modal para ver los archivos cargados y descargarlos */}
                            {vacunas.some(item => item.file) && (
                                <div className="flex justify-end mt-4">
                                    <button
                                        onClick={() => setIsModalOpenVacuna(true)}
                                        className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900 text-xs"
                                    >
                                        Ver archivos cargados
                                    </button>
                                </div>
                            )}

                            {/* Modal de archivos cargados de Vacunas */}
                            {isModalOpenVacuna && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg mx-auto">
                                        <button
                                            onClick={() => setIsModalOpenVacuna(false)}
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

                                        <h3 className="text-lg font-bold text-center">Archivos cargados de Vacunas</h3>
                                        <div className="mt-4 max-h-64 md:max-h-96 overflow-y-auto">
                                            <ul className="space-y-2">
                                                {vacunas.filter(item => item.file).length > 0 ? (
                                                    vacunas
                                                        .filter(item => item.file) // Filtrar solo vacunas con archivos adjuntos
                                                        .map((item, index) => (
                                                            <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                                <div>
                                                                    <span className="text-sm"><strong>Archivo:</strong></span>
                                                                    <a
                                                                        href={item.file}
                                                                        download={item.fileName}
                                                                        className="ml-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                                    >
                                                                        {item.fileName}
                                                                    </a>
                                                                </div>
                                                                <div className="text-sm text-gray-500 mt-2">
                                                                    <strong className="text-xs">Fecha de Carga:</strong> {item.fechaCarga}
                                                                </div>
                                                            </li>
                                                        ))
                                                ) : (
                                                    <p className="text-sm text-gray-500 text-center">No hay archivos cargados.</p>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Botón para descargar todos los archivos como ZIP */}
                                        {vacunas.some(item => item.file) && (
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    onClick={handleDownloadAllFilesVacuna}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 text-xs"
                                                >
                                                    Descargar todos los archivos
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}


                        </div>
                    </div>

                    {/* Atenciones */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300">
                        <h2 className="text-lg font-bold mb-2">Atenciones</h2>
                        <label className="block text-sm font-semibold  mb-2">Descripción</label>
                        <textarea
                            value={atencionData.descripcion}
                            onChange={(e) => setAtencionData({ ...atencionData, descripcion: e.target.value })}
                            className={`w-full p-1 border ${errors.atenciones.descripcion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            rows="3"
                            placeholder="Introduce la descripción aquí"
                        />
                        {errors.atenciones.descripcion && <p className="text-red-500 text-sm">{errors.atenciones.descripcion}</p>}

                        <label className="block text-sm font-semibold mb-2">Fecha</label>
                        <input
                            type="date"
                            value={atencionData.fecha}
                            onChange={(e) => setAtencionData({ ...atencionData, fecha: e.target.value })}
                            className={`w-full p-1 border ${errors.atenciones.fecha ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.atenciones.fecha && <p className="text-red-500 text-sm">{errors.atenciones.fecha}</p>}

                        <label className="block text-sm font-semibold mb-2">Hora</label>
                        <input
                            type="time"
                            value={atencionData.hora}
                            onChange={(e) => setAtencionData({ ...atencionData, hora: e.target.value })}
                            className={`w-full p-1 border ${errors.atenciones.hora ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.atenciones.hora && <p className="text-red-500 text-sm">{errors.atenciones.hora}</p>}

                        <label className="block text-sm font-semibold  mb-2">Archivo adjunto</label>
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(e) => handleFileChange(e, "atencion")}
                            key={atencionKey} // Usamos la clave para forzar el reset
                            className={`w-full p-1 border ${errors.atenciones.file ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarAtencion}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-5">
                            <h3 className="text-sm font-bold mt-4">Historial de Atenciones</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-40 overflow-y-auto">
                                {atenciones.length > 0 ? (
                                    <ul className="space-y-2 mt-2">
                                        {atenciones.map((item, index) => (
                                            <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                <div className="text-sm">
                                                    <strong>Descripción:</strong> {item.descripcion}
                                                </div>
                                                <div className="text-sm">
                                                    <strong>Fecha:</strong> {item.fecha}
                                                </div>
                                                <div className="text-sm">
                                                    <strong>Hora:</strong> {item.hora}
                                                </div>
                                                {item.file ? (
                                                    <div>
                                                        <span className="text-sm"><strong>Archivo adjunto:</strong></span>
                                                        <a
                                                            href={item.file}
                                                            download={item.fileName} // El archivo se descarga con su nombre original
                                                            className="ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar Archivo
                                                        </a>
                                                    </div>
                                                ) : null}
                                                <div className="text-sm text-gray-500 mt-2">
                                                    <strong>Fecha de Carga:</strong> {item.fechaCarga}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay atenciones registradas aún.
                                    </p>
                                )}
                            </div>
                            {/* Modal de archivos cargados de Atenciones */}
                            {isModalOpenAtencion && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
                                    <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-lg mx-auto">
                                        <button
                                            onClick={() => setIsModalOpenAtencion(false)}
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

                                        <h3 className="text-lg font-bold text-center">Archivos cargados de Atenciones</h3>
                                        <div className="mt-4 max-h-64 md:max-h-96 overflow-y-auto">
                                            <ul className="space-y-2">
                                                {atenciones.filter(item => item.file).length > 0 ? (
                                                    atenciones
                                                        .filter(item => item.file) // Filtrar solo atenciones con archivos
                                                        .map((item, index) => (
                                                            <li key={index} className="border border-gray-300 p-2 rounded bg-white shadow-sm">
                                                                <div>
                                                                    <span className="text-sm"><strong>Archivo:</strong></span>
                                                                    <a
                                                                        href={item.file}
                                                                        download={item.fileName}
                                                                        className="ml-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600"
                                                                    >
                                                                        {item.fileName}
                                                                    </a>
                                                                </div>
                                                                <div className="text-sm text-gray-500 mt-2">
                                                                    <strong className="text-xs">Fecha de Carga:</strong> {item.fechaCarga}
                                                                </div>
                                                            </li>
                                                        ))
                                                ) : (
                                                    <p className="text-sm text-gray-500 text-center">No hay archivos cargados.</p>
                                                )}
                                            </ul>
                                        </div>

                                        {/* Botón para descargar todos los archivos como ZIP */}
                                        {atenciones.some(item => item.file) && (
                                            <div className="flex justify-center mt-4">
                                                <button
                                                    onClick={handleDownloadAllFilesAtencion}
                                                    className="bg-green-500 text-white p-2 rounded hover:bg-green-600 text-xs"
                                                >
                                                    Descargar todos los archivos
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Botones de Ver archivos cargados y Generar Informe */}
                            <div className="flex justify-between mt-4">
                                {/* Botón para generar informe a la izquierda */}
                                {atenciones.length > 0 && (
                                    <button
                                        className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 text-xs"
                                        onClick={handleGenerarInforme}
                                    >
                                        Generar Informe de Atenciones
                                    </button>
                                )}

                                {/* Botón para abrir el modal de archivos cargados a la derecha */}
                                {atenciones.some(item => item.file) && (
                                    <button
                                        onClick={() => setIsModalOpenAtencion(true)}
                                        className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900 text-xs"
                                    >
                                        Ver archivos cargados
                                    </button>
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
                        Generar Informe General
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaSalud;
