import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaCriminologia = () => {
    const navigate = useNavigate();
    const [originalTitulo, setOriginalTitulo] = useState('');
    const [originalInforme, setOriginalInforme] = useState('');
    const [isModified, setIsModified] = useState(false);
    const [originalBeneficio, setOriginalBeneficio] = useState('');
    const [originalDescripcion, setOriginalDescripcion] = useState('');
    const [originalObservacion, setOriginalObservacion] = useState('');
    const [isBeneficioModified, setIsBeneficioModified] = useState(false);
    const [historialRegimen, setHistorialRegimen] = useState([]);
    const [archivoRegimen, setArchivoRegimen] = useState(null);
    const [estaAdheridoRegimen, setEstaAdheridoRegimen] = useState(false);
    const [isRegimenCargado, setIsRegimenCargado] = useState(false);
    const handleSubirArchivoRegimen = () => {
        if (archivoRegimen) {
            const nuevaEntrada = {
                nombreArchivo: nombreArchivoRegimen,
                archivo: archivoRegimen,
                fecha: new Date().toLocaleDateString(),
            };
            setHistorialRegimen([...historialRegimen, nuevaEntrada]);
            setArchivoRegimen(null);
            setNombreArchivoRegimen('');
            setIsRegimenCargado(true); // Indicar que ya se ha hecho una carga
        }
    };

    const [nombreArchivoRegimen, setNombreArchivoRegimen] = useState('');

    const handleEditBeneficio = (index) => {
        const entrada = historialBeneficio[index];
        setEditBeneficio(entrada.beneficio);
        setEditDescripcionBeneficio(entrada.descripcion);
        setEditObservacionBeneficio(entrada.observacion || '');
        setEditIndexBeneficio(index);

        // Guardar los valores originales
        setOriginalBeneficio(entrada.beneficio);
        setOriginalDescripcion(entrada.descripcion);
        setOriginalObservacion(entrada.observacion || '');
        setIsBeneficioModified(false); // Resetea el estado de modificaciones al entrar en modo edición
    };

    const handleInputChangeBeneficio = (setValue, value, originalValue) => {
        setValue(value);
        setIsBeneficioModified(value !== originalValue); // Marca como modificado si el nuevo valor es diferente al original
    };

    const handleEdit = (index) => {
        const entrada = historial[index];
        setEditIndex(index); // Establece el índice de la entrada que se está editando
        setTituloEditado(entrada.titulo); // Carga el título en el campo de edición
        setInformeEditado(entrada.informe); // Carga el informe en el campo de edición
        setObservacionEditada(entrada.observacion || ''); // Carga la observación (si existe)

        // Guarda los valores originales
        setOriginalTitulo(entrada.titulo);
        setOriginalInforme(entrada.informe);
        setOriginalObservacion(entrada.observacion || '');
        setIsModified(false); // Resetea el estado de modificaciones al entrar en modo edición
    };

    const handleInputChange = (setValue, value, originalValue) => {
        setValue(value);
        setIsModified(value !== originalValue); // Marca como modificado si el nuevo valor es diferente al original
    };
    // Estado para almacenar el archivo y su nombre
    const [informeCriminologicoArchivo, setInformeCriminologicoArchivo] = useState(null);
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [tituloEditado, setTituloEditado] = useState(''); // Campo para el título en edición
    const [informeEditado, setInformeEditado] = useState(''); // Campo para el informe en edición
    const [observacionEditada, setObservacionEditada] = useState(''); // Campo para la observación en edición

    const handleSaveBeneficio = () => {
        const nuevoHistorialBeneficio = [...historialBeneficio];
        nuevoHistorialBeneficio[editIndexBeneficio] = {
            ...nuevoHistorialBeneficio[editIndexBeneficio],
            beneficio: editBeneficio,
            descripcion: editDescripcionBeneficio,
            observacion: editObservacionBeneficio,
            fechaModificacion: new Date().toLocaleString(), // Añadir la fecha actual
        };
        setHistorialBeneficio(nuevoHistorialBeneficio); // Actualiza el historial
        setEditIndexBeneficio(null); // Salir del modo de edición
        setEditBeneficio(''); // Limpiar los campos de edición
        setEditDescripcionBeneficio(''); // Limpiar los campos de edición
        setEditObservacionBeneficio(''); // Limpiar los campos de edición
    };

    const handleSaveEdit = () => {
        const historialActualizado = [...historial];
        historialActualizado[editIndex] = {
            ...historialActualizado[editIndex],
            titulo: tituloEditado,
            informe: informeEditado,
            observacion: observacionEditada,
            fechaModificacion: new Date().toLocaleString(), // Añade la fecha actual
        };
        setHistorial(historialActualizado); // Actualiza el historial
        setEditIndex(null); // Resetea el índice de edición
        setTituloEditado(''); // Limpia los campos de edición
        setInformeEditado(''); // Limpia los campos de edición
        setObservacionEditada(''); // Limpia los campos de edición
    };

    const handleCancelEdit = () => {
        setEditIndex(null); // Cancela la edición
        setTituloEditado(''); // Limpia los campos de edición
        setInformeEditado(''); // Limpia los campos de edición
        setObservacionEditada(''); // Limpia los campos de edición
    };

    const handleCargarBeneficio = () => {
        // Validar que al menos uno de los campos esté lleno
        if (!beneficio && !descripcionBeneficio && !observacionBeneficio) {
            setHasErrorBeneficio(true); // Mostrar error si todos los campos están vacíos
            return;
        }

        setHasErrorBeneficio(false); // Resetea el estado de error si hay algo cargado

        // Crear una nueva entrada con los valores actuales
        const nuevaEntrada = {
            beneficio: beneficio || '',               // El beneficio es opcional
            descripcion: descripcionBeneficio || '',   // La descripción es opcional
            observacion: observacionBeneficio || '',   // La observación es opcional
            fecha: new Date().toLocaleString(),
        };

        // Añadir la nueva entrada al historial de beneficios
        setHistorialBeneficio([...historialBeneficio, nuevaEntrada]);

        // Restablecer estados después de la carga
        setBeneficio('');
        setDescripcionBeneficio('');
        setObservacionBeneficio('');
    };

    // Estados de error
    const [hasErrorCriminologico, setHasErrorCriminologico] = useState(false); // Error para Criminología
    const [hasErrorBeneficio, setHasErrorBeneficio] = useState(false);         // Error para Beneficio

    const handleCargarCriminologico = () => {
        // Validar que al menos uno de los campos esté lleno
        if (!tituloInforme && !informeCriminologico && !informeCriminologicoArchivo && !observacion) {
            setHasErrorCriminologico(true); // Mostrar error si todos los campos están vacíos
            return;
        }

        setHasErrorCriminologico(false); // Resetea el estado de error si hay algo cargado

        // Crear una nueva entrada con los valores actuales
        const nuevaEntrada = {
            titulo: tituloInforme || '',              // El título es opcional
            informe: informeCriminologico || '',      // El informe es opcional
            observacion: observacion || '',           // La observación es opcional
            archivo: informeCriminologicoArchivo || null, // El archivo es opcional
            nombreArchivo: nombreArchivo || '',       // El nombre del archivo es opcional
            fecha: new Date().toLocaleString(),
        };

        // Añadir la nueva entrada al historial
        setHistorial([...historial, nuevaEntrada]);

        // Restablecer estados después de la carga
        setTituloInforme('');
        setInformeCriminologico('');
        setObservacion('');
        setInformeCriminologicoArchivo(null);
        setNombreArchivo('');
    };

    const [beneficio, setBeneficio] = useState('');
    const [descripcionBeneficio, setDescripcionBeneficio] = useState('');
    const [observacionBeneficio, setObservacionBeneficio] = useState('');
    const [historialBeneficio, setHistorialBeneficio] = useState([]);
    const [editBeneficio, setEditBeneficio] = useState('');
    const [editDescripcionBeneficio, setEditDescripcionBeneficio] = useState('');
    const [editObservacionBeneficio, setEditObservacionBeneficio] = useState('');
    const [editIndexBeneficio, setEditIndexBeneficio] = useState(null);
    const [informeCriminologico, setInformeCriminologico] = useState('');
    const [tituloInforme, setTituloInforme] = useState('');
    const [observacion, setObservacion] = useState('');
    const [historial, setHistorial] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    
    const [user, setUser] = useState({
        typeofintern: 'Procesado',
    });

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col z-10">
            <Header/>
            {/* Contenedor principal con grid layout */}
            <div className='bg-white p-4 rounded-md shadow-md mb-4 mt-5'>
                <h1 className="text-2xl font-bold mb-4">Area Criminológica</h1>

                {/* Solo muestra esta sección si el tipo de interno es "Procesado" */}
                {user.typeofintern === 'Procesado' && (
                    <div className="bg-white p-4 rounded-md shadow-md mb-4">
                        <label className="block text-sm font-semibold mb-2 mt-2">
                            <input
                                type="checkbox"
                                checked={estaAdheridoRegimen}
                                onChange={(e) => setEstaAdheridoRegimen(e.target.checked)}
                                disabled={isRegimenCargado}
                                className="mr-2"
                            />
                            <span>Está adherido al régimen</span>
                        </label>

                        {estaAdheridoRegimen && (
                            <>
                                <label className="block text-sm font-semibold mb-2 mt-4">Adhesión al régimen</label>
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setArchivoRegimen(file);
                                        setNombreArchivoRegimen(file.name);
                                    }}
                                    accept=".pdf,.doc,.docx"
                                    className="mt-1 mb-2 text-sm w-full border border-gray-300 rounded p-1"
                                />

                                <div className="flex justify-center">
                                    <button
                                        onClick={() => {
                                            handleSubirArchivoRegimen();
                                            setArchivoRegimen(null);
                                            document.querySelector('input[type="file"]').value = null;
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                        disabled={!archivoRegimen}
                                    >
                                        Cargar
                                    </button>
                                </div>

                                <div className="bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                                    <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                        {historialRegimen.length > 0 ? (
                                            <ul className="space-y-2">
                                                {historialRegimen.map((entrada, index) => (
                                                    <li key={index} className="border-b border-gray-300 pb-2">
                                                        {entrada.archivo ? (
                                                            <div>
                                                                <p className="text-sm"><strong>Adhesión al Régimen:</strong></p>
                                                                <a
                                                                    href={URL.createObjectURL(entrada.archivo)}
                                                                    download={entrada.nombreArchivo}
                                                                    className="mt-2 ml-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600 inline-block"
                                                                >
                                                                    Descargar Adhesión al Régimen
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <span className="text-sm"><strong>Archivo de Adhesión al Régimen:</strong></span>
                                                                <input
                                                                    type="file"
                                                                    onChange={(e) => {
                                                                        const newHistorial = [...historialRegimen];
                                                                        newHistorial[index].archivo = e.target.files[0];
                                                                        newHistorial[index].nombreArchivo = e.target.files[0].name;
                                                                        setHistorialRegimen(newHistorial);
                                                                    }}
                                                                    accept=".pdf,.doc,.docx"
                                                                    className="mt-1 mb-2 text-sm border border-gray-300 rounded p-1 w-full"
                                                                />
                                                            </div>
                                                        )}
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-sm text-gray-500 text-center">No hay archivos de adhesión al régimen registrados aún.</p>
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Formulario de Carga Criminológica */}
                    <div className="bg-white p-4 rounded-md shadow-md mb-4">
                        <h1 className="text-2xl font-bold mb-4">Carga Criminológica</h1>
                        {/* Si hay un error, muestra el mensaje */}
                        {hasErrorCriminologico && (
                            <p className="text-red-500 text-sm mb-5">Por favor, complete al menos un campo para poder realizar una carga.</p>
                        )}
                        <div className="grid grid-cols-1 gap-3">
                            {/* Campo para el Título del Informe */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Título del Informe</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border border-gray-300 rounded text-sm`}
                                    value={tituloInforme}
                                    onChange={(e) => setTituloInforme(e.target.value)}
                                    placeholder="Ingresar el título del informe (opcional)"
                                />
                            </div>

                            {/* Informe Criminológico */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Informe Criminológico</label>
                                <textarea
                                    className={`w-full p-2 border border-gray-300 rounded text-sm`}
                                    rows="3"
                                    value={informeCriminologico}
                                    onChange={(e) => setInformeCriminologico(e.target.value)}
                                    placeholder="Ingresar el informe criminológico del interno (opcional)"
                                ></textarea>
                            </div>

                            {/* Observación */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Observación</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    rows="3"
                                    value={observacion}
                                    onChange={(e) => setObservacion(e.target.value)}
                                    placeholder="Ingresar alguna observación del interno (opcional)"
                                ></textarea>
                            </div>

                            {/* Input para archivo de Informe Criminológico */}
                            <label className="block text-sm font-semibold mt-2">Informe Criminológico</label>
                            <input
                                type="file"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    setInformeCriminologicoArchivo(file); // Asigna el archivo al estado
                                    setNombreArchivo(file ? file.name : ''); // Almacena el nombre del archivo si existe
                                }}
                                accept=".pdf,.doc,.docx"
                                className="mb-2 text-sm w-full border border-gray-300 rounded p-1"
                            />

                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={handleCargarCriminologico}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                        </div>


                        {/* Historial Criminológico */}
                        <div className="bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                            <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {/* Filtrar las entradas del historial que tienen al menos un campo cargado */}
                                {historial.filter(entrada => entrada.titulo || entrada.informe || entrada.observacion || entrada.archivo).length > 0 ? (
                                    <ul className="space-y-2">
                                        {historial.filter((entrada, index) =>
                                            entrada.titulo || entrada.informe || entrada.observacion || entrada.archivo // Filtramos solo las entradas que tienen algún campo cargado
                                        ).map((entrada, index) => (
                                            <li key={index} className="border-b border-gray-300 pb-2">
                                                {editIndex === index ? (
                                                    <>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Título:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={tituloEditado}
                                                                    onChange={(e) => handleInputChange(setTituloEditado, e.target.value, originalTitulo)} // Cambia esta línea
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Informe:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={informeEditado}
                                                                    onChange={(e) => handleInputChange(setInformeEditado, e.target.value, originalInforme)} // Cambia esta línea
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Observación:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={observacionEditada}
                                                                    onChange={(e) => handleInputChange(setObservacionEditada, e.target.value, originalObservacion)} // Cambia esta línea
                                                                />
                                                            </div>
                                                            <div className="flex justify-center space-x-2 mt-2">
                                                                <button
                                                                    onClick={handleSaveEdit}
                                                                    disabled={!isModified} // Deshabilita el botón si no ha habido modificaciones
                                                                    className={`bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600 ${!isModified ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    Guardar
                                                                </button>
                                                                <button
                                                                    onClick={handleCancelEdit}
                                                                    className="bg-gray-500 text-white px-4 py-1 rounded text-xs hover:bg-gray-600"
                                                                >
                                                                    Cancelar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Solo mostramos Título si tiene valor */}
                                                        {entrada.titulo && (
                                                            <p className="text-sm"><strong>Título:</strong> {entrada.titulo}</p>
                                                        )}
                                                        {/* Solo mostramos Informe si tiene valor */}
                                                        {entrada.informe && (
                                                            <p className="text-sm"><strong>Informe:</strong> {entrada.informe}</p>
                                                        )}
                                                        {/* Solo mostramos Observación si tiene valor */}
                                                        {entrada.observacion && (
                                                            <p className="text-sm"><strong>Observación:</strong> {entrada.observacion}</p>
                                                        )}
                                                        {/* Solo mostramos el archivo si existe */}
                                                        {entrada.archivo ? (
                                                            <div>
                                                                <p className="text-sm"><strong>Informe Criminológico:</strong></p>
                                                                <a
                                                                    href={URL.createObjectURL(entrada.archivo)} // Crea un enlace para el archivo
                                                                    download={entrada.nombreArchivo} // Usa el nombre original del archivo
                                                                    className="mt-2 ml-2 bg-blue-500 text-white p-2 rounded-full text-xs hover:bg-blue-600 inline-block" // Estilo del botón
                                                                >
                                                                    Descargar Informe Criminológico
                                                                </a>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <span className="text-sm"><strong>Informe Criminológico:</strong></span>
                                                                <input
                                                                    type="file"
                                                                    onChange={(e) => {
                                                                        const newHistorial = [...historial];
                                                                        newHistorial[index].archivo = e.target.files[0]; // Asigna el archivo a la entrada correspondiente
                                                                        newHistorial[index].nombreArchivo = e.target.files[0].name; // Almacena el nombre del archivo
                                                                        setHistorial(newHistorial); // Actualiza el historial
                                                                    }}
                                                                    accept=".pdf,.doc,.docx"
                                                                    className="mt-1 mb-2 text-sm border border-gray-300 rounded p-1 w-full"
                                                                />
                                                            </div>
                                                        )}
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                                        {entrada.fechaModificacion && (
                                                            <p className="text-sm text-gray-500"><strong>Fecha de modificación:</strong> {entrada.fechaModificacion}</p>
                                                        )}
                                                        <div className="flex justify-center mt-2">
                                                            <button onClick={() => handleEdit(index)} className="bg-orange-400 text-white p-2 rounded-md hover:bg-orange-500 text-xs">
                                                                Editar
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">No hay informes criminológicos registrados aún.</p>
                                )}
                            </div>
                        </div>

                    </div>


                    {/* Formulario de Carga Beneficio */}
                    <div className="bg-white p-4 rounded-md shadow-md mb-4">
                        <h1 className="text-2xl font-bold mb-4">Carga Beneficio</h1>
                        {hasErrorBeneficio && (
                            <p className="text-red-500 text-sm mb-5">Por favor, complete al menos un campo para poder realizar una carga.</p>
                        )}
                        <div className="grid grid-cols-1 gap-3">
                            {/* Campo para el Beneficio */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Beneficio</label>
                                <input
                                    type="text"
                                    className={`w-full p-2 border border-gray-300 rounded text-sm`}
                                    value={beneficio}
                                    onChange={(e) => setBeneficio(e.target.value)}
                                    placeholder="Ingresar el beneficio del interno aquí (opcional)"
                                />
                            </div>

                            {/* Campo para la Descripción */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Descripción</label>
                                <textarea
                                    className={`w-full p-2 border border-gray-300 rounded text-sm`}
                                    rows="3"
                                    value={descripcionBeneficio}
                                    onChange={(e) => setDescripcionBeneficio(e.target.value)}
                                    placeholder="Ingresar la descripción del beneficio aquí (opcional)"
                                ></textarea>
                            </div>

                            {/* Campo para Observación */}
                            <div>
                                <label className="block text-sm font-semibold mb-2">Observación</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded text-sm"
                                    rows="3"
                                    value={observacionBeneficio}
                                    onChange={(e) => setObservacionBeneficio(e.target.value)}
                                    placeholder="Ingresar alguna observación del interno aquí (opcional)"
                                ></textarea>
                            </div>

                            {/* Botón Cargar Beneficio */}
                            <div className="flex justify-center mt-2">
                                <button
                                    onClick={handleCargarBeneficio}
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Cargar
                                </button>
                            </div>
                        </div>
                        {/* Historial de Beneficio */}
                        <div className="bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                            <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                            <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                                {historialBeneficio.length > 0 ? (
                                    <ul className="space-y-2">
                                        {historialBeneficio.map((entrada, index) => (
                                            <li key={index} className="border-b border-gray-300 pb-2">
                                                {editIndexBeneficio === index ? (
                                                    <>
                                                        <div className="space-y-2">
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Beneficio:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={editBeneficio}
                                                                    onChange={(e) => handleInputChangeBeneficio(setEditBeneficio, e.target.value, originalBeneficio)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Descripción:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={editDescripcionBeneficio}
                                                                    onChange={(e) => handleInputChangeBeneficio(setEditDescripcionBeneficio, e.target.value, originalDescripcion)}
                                                                />
                                                            </div>
                                                            <div>
                                                                <label className="block text-sm font-medium mb-1">Observación:</label>
                                                                <input
                                                                    className="border p-1 rounded text-sm w-full"
                                                                    type="text"
                                                                    value={editObservacionBeneficio}
                                                                    onChange={(e) => handleInputChangeBeneficio(setEditObservacionBeneficio, e.target.value, originalObservacion)}
                                                                />
                                                            </div>
                                                            <div className="flex justify-center space-x-2 mt-2">
                                                                <button
                                                                    onClick={handleSaveBeneficio}
                                                                    disabled={!isBeneficioModified}
                                                                    className={`bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600 ${!isBeneficioModified ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                                >
                                                                    Guardar
                                                                </button>
                                                                <button
                                                                    onClick={() => setEditIndexBeneficio(null)}
                                                                    className="bg-gray-500 text-white px-4 py-1 rounded text-xs hover:bg-gray-600"
                                                                >
                                                                    Cancelar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p className="text-sm">
                                                            {entrada.beneficio && <><strong>Beneficio:</strong> {entrada.beneficio}</>}
                                                        </p>
                                                        <p className="text-sm">
                                                            {entrada.descripcion && <><strong>Descripción:</strong> {entrada.descripcion}</>}
                                                        </p>
                                                        {entrada.observacion && (
                                                            <p className="text-sm"><strong>Observación:</strong> {entrada.observacion}</p>
                                                        )}
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                                        {entrada.fechaModificacion && (
                                                            <p className="text-sm text-gray-500"><strong>Fecha de modificación:</strong> {entrada.fechaModificacion}</p>
                                                        )}
                                                        <div className="flex justify-center mt-2">
                                                            <button onClick={() => handleEditBeneficio(index)} className="bg-orange-400 text-white p-2 rounded-md hover:bg-orange-500 text-xs">
                                                                Editar
                                                            </button>
                                                        </div>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">No hay beneficios registrados aún.</p>
                                )}
                            </div>
                        </div>


                    </div>
                </div>
            </div>
            {/* Botón de Menú Principal */}
            <div className="flex justify-between mt-10">
                <button
                    onClick={handleVolver}
                    className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                >
                    Menu Principal
                </button>
            </div>
        </div>
    );
};

export default CargaCriminologia;