import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaPsicologia = () => {
    const navigate = useNavigate();
    const [editIndexPsicologico, setEditIndexPsicologico] = useState(null);
    const [tituloEditadoPsicologico, setTituloEditadoPsicologico] = useState('');
    const [informeEditadoPsicologico, setInformeEditadoPsicologico] = useState('');
    const [observacionEditadaPsicologica, setObservacionEditadaPsicologica] = useState('');

    // Funciones para manejar la edición
    const handleEditPsicologico = (index) => {
        const entrada = historialPsicologico[index]; // Obtén la entrada a editar
        setEditIndexPsicologico(index);
        setTituloEditadoPsicologico(entrada.titulo);
        setInformeEditadoPsicologico(entrada.informe);
        setObservacionEditadaPsicologica(entrada.observacion || '');
    };

    const handleSaveEditPsicologico = () => {
        const updatedHistorial = [...historialPsicologico];
        updatedHistorial[editIndexPsicologico] = {
            ...updatedHistorial[editIndexPsicologico],
            titulo: tituloEditadoPsicologico,
            informe: informeEditadoPsicologico,
            observacion: observacionEditadaPsicologica,
            fechaModificacion: new Date().toLocaleString(),
        };
        setHistorialPsicologico(updatedHistorial); // Asegúrate de tener este estado definido para el historial
        setEditIndexPsicologico(null);
    };

    const handleCancelEditPsicologico = () => {
        setEditIndexPsicologico(null);
    };
    const [tituloInformePsicologico, setTituloInformePsicologico] = useState(''); // Campo para el título del informe psicológico
    const [informePsicologico, setInformePsicologico] = useState(''); // Campo para el informe psicológico
    const [observacionPsicologica, setObservacionPsicologica] = useState(''); // Campo para la observación psicológica
    const [historialPsicologico, setHistorialPsicologico] = useState([]); // Historial de informes psicológicos
    const [hasErrorPsicologico, setHasErrorPsicologico] = useState(false); // Estado de error para formulario psicológico

    // Función para cargar nuevo informe psicológico
    const handleCargarPsicologico = () => {
        if (informePsicologico.trim() === '' || tituloInformePsicologico.trim() === '') {
            setHasErrorPsicologico(true); // Activa el error
            return;
        }
        setHasErrorPsicologico(false); // Desactiva el error si no hay problemas

        // Agregar nueva entrada al historial psicológico
        const nuevaEntradaPsicologica = {
            titulo: tituloInformePsicologico,
            informe: informePsicologico,
            observacion: observacionPsicologica,
            fecha: new Date().toLocaleString(),
        };

        setHistorialPsicologico(prevHistorial => [...prevHistorial, nuevaEntradaPsicologica]);

        // Limpiar los campos
        setTituloInformePsicologico('');
        setInformePsicologico('');
        setObservacionPsicologica('');
    };


    const handleVolver = () => {
        navigate('/general');
    };
    
    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header/>
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <h1 className="text-xl font-bold mb-4">Carga Psicológica</h1>

                <div className="grid grid-cols-1 gap-3 bg-white p-4 rounded-md shadow-md border border-gray-300">
                    {/* Campo para el Título del Informe Psicológico */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Título del Informe Psicológico</label>
                        <input
                            type="text"
                            className={`w-full p-2 border border-gray-300 rounded text-sm ${hasErrorPsicologico ? 'border-red-500' : ''}`}
                            value={tituloInformePsicologico}  // Estado para el título del informe psicológico
                            onChange={(e) => setTituloInformePsicologico(e.target.value)}
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

                    {/* Campo para Archivo Adjunto */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Archivo adjunto</label>
                        <input type="file" className="w-full p-2 border border-gray-300 rounded text-sm" />
                    </div>

                    {/* Botón de Cargar */}
                    <div className="flex justify-center mt-2">
                        <button
                            onClick={handleCargarPsicologico}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>
                </div>
                {/* Historial de Informes Psicológicos */}
                <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4 mt-5">
                    <h1 className="text-sm font-bold mt-4">Historial de Carga</h1>
                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {historialPsicologico.length > 0 ? (
                            <ul className="space-y-2">
                                {historialPsicologico.map((entrada, index) => (
                                    <li key={index} className="border-b border-gray-300 pb-2">
                                        {editIndexPsicologico === index ? (
                                            <>
                                                <div className="space-y-2">
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Título:</label>
                                                        <input
                                                            className="border p-1 rounded text-sm w-full"
                                                            type="text"
                                                            value={tituloEditadoPsicologico}
                                                            onChange={(e) => setTituloEditadoPsicologico(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Informe:</label>
                                                        <input
                                                            className="border p-1 rounded text-sm w-full"
                                                            type="text"
                                                            value={informeEditadoPsicologico}
                                                            onChange={(e) => setInformeEditadoPsicologico(e.target.value)}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium mb-1">Observación:</label>
                                                        <input
                                                            className="border p-1 rounded text-sm w-full"
                                                            type="text"
                                                            value={observacionEditadaPsicologica}
                                                            onChange={(e) => setObservacionEditadaPsicologica(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="flex justify-center space-x-2 mt-2">
                                                        <button
                                                            onClick={handleSaveEditPsicologico}
                                                            className="bg-green-500 text-white px-4 py-1 rounded text-xs hover:bg-green-600"
                                                        >
                                                            Guardar
                                                        </button>
                                                        <button
                                                            onClick={handleCancelEditPsicologico}
                                                            className="bg-red-500 text-white px-4 py-1 rounded text-xs hover:bg-red-600"
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
                                                <div className="flex justify-center mt-2">
                                                    <button onClick={() => handleEditPsicologico(index)} className="bg-orange-400 text-white p-2 rounded-md hover:bg-orange-500 text-xs">
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
