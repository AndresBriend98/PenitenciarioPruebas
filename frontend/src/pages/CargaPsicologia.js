import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CargaPsicologia = () => {
    const navigate = useNavigate();
    const [originalTitulo, setOriginalTitulo] = useState('');
    const [originalInforme, setOriginalInforme] = useState('');
    const [originalObservacion, setOriginalObservacion] = useState('');
    const [isModified, setIsModified] = useState(false);
    const [confirmDeleteHistorialModal, setConfirmDeleteHistorialModal] = useState(false);
    const [selectedHistorialIndex, setSelectedHistorialIndex] = useState(null);

    const handleEliminarActaArchivo = () => {
        const newHistorial = [...historial];
        const newDate = new Date().toLocaleString();

        if (!newHistorial[selectedHistorialIndex].fechaEliminacion) {
            newHistorial[selectedHistorialIndex].fechaEliminacion = newDate;
        } else {
            newHistorial[selectedHistorialIndex].fechaEliminacion = newDate;
        }

        newHistorial[selectedHistorialIndex].actasArchivo = null;
        setHistorial(newHistorial);
        setConfirmDeleteHistorialModal(false);
    };

    const handleCloseDeleteHistorialModal = () => {
        setConfirmDeleteHistorialModal(false);
        setSelectedHistorialIndex(null);
    };
    const [tituloEditado, setTituloEditado] = useState(''); const [informeEditado, setInformeEditado] = useState(''); const [observacionEditada, setObservacionEditada] = useState(''); const handleEdit = (index) => {
        const entrada = historial[index];
        setEditIndex(index); setTituloEditado(entrada.titulo); setInformeEditado(entrada.informe); setObservacionEditada(entrada.observacion || '');
        setOriginalTitulo(entrada.titulo);
        setOriginalInforme(entrada.informe);
        setOriginalObservacion(entrada.observacion || '');
        setIsModified(false);
    };
    const handleSaveEdit = () => {
        const historialActualizado = [...historial];
        historialActualizado[editIndex] = {
            ...historialActualizado[editIndex],
            titulo: tituloEditado,
            informe: informeEditado,
            observacion: observacionEditada,
            fechaModificacion: new Date().toLocaleString(),
        };
        setHistorial(historialActualizado); setEditIndex(null); setTituloEditado(''); setInformeEditado(''); setObservacionEditada('');
    };

    const handleCancelEdit = () => {
        setEditIndex(null); setTituloEditado(''); setInformeEditado(''); setObservacionEditada('');
    };
    const [editIndex, setEditIndex] = useState(null);
    const handleInputChange = (setValue, value, originalValue) => {
        setValue(value);
        setIsModified(value !== originalValue);
    };

    const [actasArchivo, setActasArchivo] = useState(null);
    const [nombreActaArchivo, setNombreActaArchivo] = useState('');
    const [nombreArchivo, setNombreArchivo] = useState('');
    const [tituloInformePsicologico, setTituloInformePsicologico] = useState(''); const [informePsicologico, setInformePsicologico] = useState(''); const [observacionPsicologica, setObservacionPsicologica] = useState(''); const [historial, setHistorial] = useState([]); const [hasErrorPsicologico, setHasErrorPsicologico] = useState(false);
    const handleCargarPsicologico = () => {
        if (informePsicologico.trim() === '' || tituloInformePsicologico.trim() === '') {
            setHasErrorPsicologico(true);
            return;
        }

        setHasErrorPsicologico(false);
        const nuevaEntradaPsicologica = {
            titulo: tituloInformePsicologico,
            informe: informePsicologico,
            observacion: observacionPsicologica,
            fecha: new Date().toLocaleString(),
            actasArchivo,
            nombreActaArchivo,
            fechaCargaActa: actasArchivo ? new Date().toLocaleString() : null,
            fechasDeCargaActa: actasArchivo ? [new Date().toLocaleString()] : [],
            fechaCarga: actasArchivo ? new Date().toLocaleString() : null,
        };

        setHistorial(prevHistorial => [...prevHistorial, nuevaEntradaPsicologica]);

        setTituloInformePsicologico('');
        setInformePsicologico('');
        setObservacionPsicologica('');
        setNombreArchivo('');
    };

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <h1 className="text-xl font-bold mb-4">Carga Psicológica</h1>

                <div className="grid grid-cols-1 gap-3 bg-white p-4 rounded-md shadow-md border border-gray-300">
                    {/* Campo para el Título del Informe Psicológico */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Título</label>
                        <input
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${hasErrorPsicologico ? 'border-red-500' : ''}`}
                            value={tituloInformePsicologico} onChange={(e) => setTituloInformePsicologico(e.target.value)}
                            placeholder="Ingresar el título del informe psicológico"
                        />
                        {hasErrorPsicologico && <p className="text-red-500 text-sm mt-1">El título es obligatorio.</p>}
                    </div>

                    {/* Campo para el Informe Psicológico */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Informe Psicológico</label>
                        <textarea
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${hasErrorPsicologico ? 'border-red-500' : ''}`}
                            rows="3"
                            value={informePsicologico}
                            onChange={(e) => setInformePsicologico(e.target.value)}
                            placeholder="Ingresar el informe psicológico del interno aquí"
                        ></textarea>
                        {hasErrorPsicologico && <p className="text-red-500 text-sm mt-1">El informe es obligatorio.</p>}
                    </div>

                    {/* Campo de Observaciones */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Observación</label>
                        <textarea
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                            rows="3"
                            value={observacionPsicologica}
                            onChange={(e) => setObservacionPsicologica(e.target.value)}
                            placeholder="Ingresar alguna observación psicológica del interno aquí"
                        ></textarea>
                    </div>

                    <label className="block text-sm font-bold mt-2 mb-2">Subir informe</label>

                    <input
                        type="file"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setActasArchivo(file); setNombreActaArchivo(file.name);
                        }}
                        accept=".pdf"
                        className="mt-1 mb-2 text-sm w-full border border-gray-300 rounded p-1"
                    />

                    {/* Botón de Cargar */}
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={handleCargarPsicologico}
                            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>
                </div>
                {/* Historial de Informes Psicológicos */}
                <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4 mt-5">
                    <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {historial.length > 0 ? (
                            <ul className="space-y-2">
                                {historial.map((entrada, index) => (
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
                                                            onChange={(e) => handleInputChange(setTituloEditado, e.target.value, originalTitulo)} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Informe:</label>
                                                        <input
                                                            className="border p-1 rounded text-sm w-full"
                                                            type="text"
                                                            value={informeEditado}
                                                            onChange={(e) => handleInputChange(setInformeEditado, e.target.value, originalInforme)} />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Observación:</label>
                                                        <input
                                                            className="border p-1 rounded text-sm w-full"
                                                            type="text"
                                                            value={observacionEditada}
                                                            onChange={(e) => handleInputChange(setObservacionEditada, e.target.value, originalObservacion)} />
                                                    </div>
                                                    <div className="flex justify-center space-x-2 mt-2">
                                                        <button
                                                            onClick={handleSaveEdit}
                                                            disabled={!isModified} className={`bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600 ${!isModified ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                                                <p className="text-sm"><strong>Título:</strong> {entrada.titulo}</p>
                                                <p className="text-sm"><strong>Informe:</strong> {entrada.informe}</p>
                                                {entrada.observacion && (
                                                    <p className="text-sm"><strong>Observación:</strong> {entrada.observacion}</p>
                                                )}
                                                <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {entrada.fecha}</p>
                                                {entrada.fechaModificacion && (
                                                    <p className="text-sm text-gray-500"><strong>Fecha de modificación:</strong> {entrada.fechaModificacion}</p>
                                                )}
                                                {/* Acta */}
                                                <span className="text-sm max-w-full break-words">
                                                    <strong>Informe:</strong>
                                                </span>
                                                {/* Si no hay archivo cargado */}
                                                {!entrada.actasArchivo ? (
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            const newHistorial = [...historial];
                                                            const newDate = new Date().toLocaleString();
                                                            newHistorial[index].actasArchivo = e.target.files[0];

                                                            newHistorial[index].fechaCarga = newDate;

                                                            newHistorial[index].fechasDeEdicion = [];
                                                            newHistorial[index].fechaEliminacion = null;

                                                            setHistorial(newHistorial);
                                                        }}
                                                        accept=".pdf"
                                                        className="mt-1 mb-2 text-sm ml-2 w-full border border-gray-300 rounded p-1"
                                                    />
                                                ) : (
                                                    <>
                                                        <a
                                                            href={URL.createObjectURL(entrada.actasArchivo)}
                                                            download={entrada.actasArchivo.name}
                                                            className="mt-2 ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar Informe
                                                        </a>

                                                        {/* Botón de Editar */}
                                                        <button
                                                            onClick={() => {
                                                                const input = document.createElement("input");
                                                                input.type = "file";
                                                                input.accept = ".pdf";

                                                                input.onchange = (e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const newHistorial = [...historial];
                                                                        const newDate = new Date().toLocaleString();

                                                                        if (!newHistorial[index].fechasDeEdicion) {
                                                                            newHistorial[index].fechasDeEdicion = [];
                                                                        }

                                                                        newHistorial[index].fechasDeEdicion.push(newDate);

                                                                        newHistorial[index].actasArchivo = file;

                                                                        setHistorial(newHistorial);
                                                                    }
                                                                };

                                                                input.click();
                                                            }}
                                                            className="mt-2 ml-2 bg-orange-400 text-white p-2 rounded-full text-xs hover:bg-orange-500"
                                                        >
                                                            Editar Informe
                                                        </button>


                                                        {/* Botón de Eliminar */}
                                                        <button
                                                            onClick={() => {
                                                                setSelectedHistorialIndex(index);
                                                                setConfirmDeleteHistorialModal(true);
                                                            }}
                                                            className="mt-2 ml-2 bg-red-400 text-white p-2 rounded-full text-xs hover:bg-red-500"
                                                        >
                                                            Eliminar Informe
                                                        </button>

                                                    </>
                                                )}

                                                {/* Mostrar las fechas de carga, edición y eliminación */}
                                                {entrada.fechaCarga && (
                                                    <p className="text-sm text-gray-500 max-w-full break-words">
                                                        <strong>Fecha de carga informe:</strong> {entrada.fechaCarga}
                                                    </p>
                                                )}

                                                {entrada.fechasDeEdicion && entrada.fechasDeEdicion.length > 0 && (
                                                    <p className="text-sm text-gray-500 max-w-full break-words">
                                                        <strong>Fecha de edición informe:</strong> {entrada.fechasDeEdicion[entrada.fechasDeEdicion.length - 1]}
                                                    </p>
                                                )}

                                                {entrada.fechaEliminacion && (
                                                    <p className="text-sm text-gray-500 max-w-full break-words">
                                                        <strong>Fecha de eliminación informe:</strong> {entrada.fechaEliminacion}
                                                    </p>
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
                            <p className="text-sm text-gray-500 text-center">No hay informes psicológicos registrados aún.</p>
                        )}
                    </div>
                    {/* Modal de confirmación de eliminación */}
                    {confirmDeleteHistorialModal && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-white p-6 rounded-md shadow-lg text-center w-full max-w-md mx-4 md:mx-0 max-h-screen overflow-auto">
                                <h2 className="text-lg font-bold mb-4 text-red-600">Confirmar Eliminación</h2>
                                <p>¿Estás seguro de que deseas eliminar este archivo? Esta acción no se puede deshacer.</p>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={handleEliminarActaArchivo}
                                        className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        onClick={handleCloseDeleteHistorialModal}
                                        className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
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

        </div >
    );
};

export default CargaPsicologia;
