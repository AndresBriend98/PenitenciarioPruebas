import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaTrabajo = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // 'progreso' o 'observacion'
    const [selectedRegistroIndex, setSelectedRegistroIndex] = useState(null);
    const [inputValue, setInputValue] = useState(''); // Valor del textarea del modal
    const [modalEntries, setModalEntries] = useState([]);

    const handleOpenModal = (type, index) => {
        setModalType(type); // 'progreso' u 'observacion'
        setSelectedRegistroIndex(index); // índice del registro seleccionado

        // Inicializa modalEntries basado en las entradas existentes
        const entries = historial[index][type] || [];
        setModalEntries(entries);

        setInputValue(''); // Asegúrate de que inputValue esté vacío
        setModalOpen(true); // abre el modal
    };

    const [historial, setHistorial] = useState([]);

    const [formData, setFormData] = useState({
        tipoCapacitacion: '',
        diasLaborales: '',
        lugarCapacitacion: '',
        horaInicio: '', // Añadido
        horaFin: '', // Añadido
        remuneracion: ''
    });

    const [errors, setErrors] = useState('');

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleVolver = () => {
        navigate('/general');
    };

    const handleAgregar = () => {
        const { tipoCapacitacion, diasLaborales, lugarCapacitacion, horaInicio, horaFin, remuneracion } = formData;
        const newErrors = {};

        if (!tipoCapacitacion) newErrors.tipoCapacitacion = 'Campo requerido';
        if (!diasLaborales) newErrors.diasLaborales = 'Campo requerido';
        if (!lugarCapacitacion) newErrors.lugarCapacitacion = 'Campo requerido';
        if (!horaInicio) newErrors.horaInicio = 'Campo requerido';
        if (!horaFin) newErrors.horaFin = 'Campo requerido';
        if (!remuneracion) newErrors.remuneracion = 'Campo requerido';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Obtener la fecha y hora actual
        const fechaCarga = new Date().toLocaleString();

        // Crear un nuevo registro con fechaCarga
        const nuevoRegistro = {
            tipoCapacitacion,
            diasLaborales,
            lugarCapacitacion,
            horaInicio,
            horaFin,
            remuneracion,
            fechaCarga // Añadido
        };

        // Actualizar el historial con el nuevo registro
        setHistorial([...historial, nuevoRegistro]);

        // Limpiar el formulario
        setFormData({
            tipoCapacitacion: '',
            diasLaborales: '',
            lugarCapacitacion: '',
            horaInicio: '',
            horaFin: '',
            remuneracion: ''
        });
        setErrors({});
    };

    const handleSave = () => {
        if (inputValue.trim() === '') {
            alert('No se puede agregar un progreso u observación vacío.');
            return;
        }

        const fechaActual = new Date().toLocaleString(); // Obtener la fecha y hora actuales

        // Crear un nuevo objeto para progreso u observación
        const nuevoRegistro = {
            fecha: fechaActual,
            texto: inputValue
        };

        const updatedHistorial = [...historial];
        if (modalType === 'progreso') {
            updatedHistorial[selectedRegistroIndex].progreso = [...modalEntries, nuevoRegistro];
        } else if (modalType === 'observacion') {
            updatedHistorial[selectedRegistroIndex].observacion = [...modalEntries, nuevoRegistro];
        }

        // Actualiza el historial y cierra el modal
        setHistorial(updatedHistorial);
        setModalOpen(false);
        setModalEntries([]); // Limpiar las entradas del modal
        setInputValue(''); // Limpiar el valor del input
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">\
            <Header/>
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga Trabajo</h1>
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Formulario de entrada de datos */}
                    <div className="flex flex-col w-full md:w-1/2 p-4 bg-white-100 shadow-md rounded-md">
                        <label className="font-medium text-sm mb-2">Tipo de Capacitación</label>
                        <input
                            type="text"
                            id="tipoCapacitacion"
                            value={formData.tipoCapacitacion}
                            onChange={handleInputChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.tipoCapacitacion ? 'border-red-500' : ''}`}
                            placeholder='Ingrese el tipo de capacitación'
                        />
                        {errors.tipoCapacitacion && <p className="text-red-500 text-xs mb-2">{errors.tipoCapacitacion}</p>}

                        <label className="font-medium text-sm mt-3 mb-2">Días Laborales</label>
                        <input
                            type="int"
                            id="diasLaborales"
                            value={formData.diasLaborales}
                            onChange={handleInputChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.diasLaborales ? 'border-red-500' : ''}`}
                            placeholder='Ingrese los días laborales'
                        />
                        {errors.diasLaborales && <p className="text-red-500 text-xs mb-2">{errors.diasLaborales}</p>}

                        <label className="font-medium text-sm mt-3 mb-2">Lugar de Capacitación</label>
                        <input
                            type="text"
                            id="lugarCapacitacion"
                            value={formData.lugarCapacitacion}
                            onChange={handleInputChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.lugarCapacitacion ? 'border-red-500' : ''}`}
                            placeholder='Ingrese el lugar de capacitación'
                        />
                        {errors.lugarCapacitacion && <p className="text-red-500 text-xs mb-2">{errors.lugarCapacitacion}</p>}

                        <div className="flex flex-col">
                            <label className="font-medium text-sm mt-3 mb-2">Hora de Inicio</label>
                            <input
                                type="time"
                                id="horaInicio"
                                value={formData.horaInicio}
                                onChange={handleInputChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.horaInicio ? 'border-red-500' : ''}`}
                            />
                            {errors.horaInicio && <p className="text-red-500 text-xs mb-2">{errors.horaInicio}</p>}

                            <label className="font-medium text-sm mt-3 mb-2">Hora de Fin</label>
                            <input
                                type="time"
                                id="horaFin"
                                value={formData.horaFin}
                                onChange={handleInputChange}
                                className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.horaFin ? 'border-red-500' : ''}`}
                            />
                            {errors.horaFin && <p className="text-red-500 text-xs mb-2">{errors.horaFin}</p>}
                        </div>

                        <label className="font-medium text-sm mt-3 mb-2">Remuneración</label>
                        <input
                            type="number"
                            id="remuneracion"
                            value={formData.remuneracion}
                            onChange={handleInputChange}
                            className={`w-full p-1 border border-gray-300 rounded text-sm ${errors.remuneracion ? 'border-red-500' : ''}`}
                            placeholder='Ingrese la remuneración'
                        />
                        {errors.remuneracion && <p className="text-red-500 text-xs mb-2">{errors.remuneracion}</p>}

                        <div className="flex justify-center mt-5 mb-2">
                            <button
                                onClick={handleAgregar}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                    </div>
                    {/* Mostrar historial de cargas */}
                    <div className="flex flex-col w-full md:w-1/2 p-4 bg-white rounded-md shadow-md">
                        <h2 className="text-sm font-bold mt-4">Historial de Carga</h2>
                        <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-96 overflow-y-auto"> {/* Limita la altura y agrega scroll */}
                            {historial.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay registros de trabajo registrados aún.
                                </p>
                            ) : (
                                <ul className="space-y-12">
                                    {historial.map((registro, index) => (
                                        <li key={index} className="p-2 bg-gray-100 rounded-md">
                                            <p className='text-sm'><strong>Tipo de Capacitación:</strong> {registro.tipoCapacitacion}</p>
                                            <p className='text-sm'><strong>Días Laborales:</strong> {registro.diasLaborales}</p>
                                            <p className='text-sm'><strong>Lugar de Capacitación:</strong> {registro.lugarCapacitacion}</p>
                                            <p className='text-sm'><strong>Hora de Inicio:</strong> {registro.horaInicio}</p>
                                            <p className='text-sm'><strong>Hora de Fin:</strong> {registro.horaFin}</p>
                                            <p className='text-sm'><strong>Remuneración:</strong> {registro.remuneracion}</p>
                                            <div><p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {registro.fechaCarga}</p></div>

                                            {/* Renderizar progresos */}
                                            {registro.progreso && registro.progreso.length > 0 && (
                                                <div className="mt-3">
                                                    <h4 className="font-bold text-sm mb-2">Progreso:</h4>
                                                    {registro.progreso.map((entry, i) => (
                                                        <div key={`progreso-${i}`} className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-100">
                                                            <p className='text-sm'><strong className='text-sm'>Fecha:</strong> {entry.fecha}</p>
                                                            <p className='text-sm'><strong>Descripción:</strong> {entry.texto}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Renderizar observaciones */}
                                            {registro.observacion && registro.observacion.length > 0 && (
                                                <div className="mt-3">
                                                    <h4 className="font-bold text-sm mb-2">Observación:</h4>
                                                    {registro.observacion.map((entry, i) => (
                                                        <div key={`observacion-${i}`} className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-100">
                                                            <p className='text-sm'><strong>Fecha:</strong> {entry.fecha}</p>
                                                            <p className='text-sm'><strong>Descripción:</strong> {entry.texto}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                            <div className="flex justify-end mt-4"> {/* Cambiado para alinear a la derecha */}
                                                <div className="space-x-2">
                                                    <button
                                                        onClick={() => handleOpenModal('progreso', index)}
                                                        className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 text-xs"
                                                    >
                                                        Progreso
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenModal('observacion', index)}
                                                        className="bg-blue-400 text-white p-2 rounded-md hover:bg-blue-500 text-xs"
                                                    >
                                                        Observación
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    {modalOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
                            <div className="bg-white p-6 rounded-md w-full max-w-lg">
                                <h2 className="text-xl mb-4 font-bold">
                                    {modalType === 'progreso' ? 'Progreso' : 'Observación'}
                                </h2>
                                <textarea
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-md mb-4 text-sm resize-none"
                                    rows="4"
                                    placeholder='Ingrese aquí el progreso/observación...'
                                />
                                <div className="flex justify-end space-x-4">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 text-xs"
                                        disabled={!inputValue.trim()} // Deshabilitar si textarea está vacío
                                    >
                                        Guardar
                                    </button>
                                    <button
                                        onClick={() => setModalOpen(false)}
                                        className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 text-xs"
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>


                {/* Botón de Volver */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={handleVolver}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menu principal
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaTrabajo;
