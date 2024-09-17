import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Asegúrate de usar la ruta correcta

// Componente CargaSalidas.js
const CargaSalidas = () => {

    // Función para determinar el estado
    const getEstadoVisita = (fechaSalida, fechaEntrada) => {
        const ahora = new Date();
        if (fechaSalida < ahora && fechaEntrada < ahora) {
            return { color: 'bg-green-500', texto: 'Concretada', colorTexto: 'text-green-500' };
        } else if (fechaSalida > ahora) {
            return { color: 'bg-yellow-500', texto: 'Pendiente', colorTexto: 'text-yellow-500' };
        }
        return { color: 'bg-red-500', texto: 'Anulada', colorTexto: 'text-red-500' };
    };

    // Componente del historial
    const HistorialCarga = ({ registros }) => (
        <div>
            {registros.map((registro) => {
                const estado = getEstadoVisita(registro.fechaSalida, registro.fechaEntrada);
                return (
                    <div key={registro.id} className="flex items-center mt-2">
                        <div className={`w-3 h-3 rounded-full ${estado.color}`}></div>
                        <p className={`text-sm ml-2 ${estado.colorTexto} italic font-bold`}>Estado de la Salida: {estado.texto}</p>
                    </div>
                );
            })}
        </div>
    );

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        motivoSalida: '',
        acompananteInterno: '',
        fechaSalida: '',
        horaSalida: '',
        fechaEntrada: '',
        horaEntrada: '',
        observacion: ''
    });
    const [errors, setErrors] = useState({});
    const [historial, setHistorial] = useState([]);
    const [historialAnulados, setHistorialAnulados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [anularModalOpen, setAnularModalOpen] = useState(false);
    const [anularMotivo, setAnularMotivo] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.motivoSalida) errors.motivoSalida = 'Motivo de la salida es obligatorio.';
        if (!formData.acompananteInterno) errors.acompananteInterno = 'Acompañante del interno es obligatorio.';
        if (!formData.fechaSalida) errors.fechaSalida = 'Fecha de salida es obligatoria.';
        if (!formData.horaSalida) errors.horaSalida = 'Hora de salida es obligatoria.';
        if (!formData.fechaEntrada) errors.fechaEntrada = 'Fecha de entrada es obligatoria.';
        if (!formData.horaEntrada) errors.horaEntrada = 'Hora de entrada es obligatoria.';

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const now = new Date();
            const fechaCarga = now.toLocaleString();
            const fechaEntrada = new Date(`${formData.fechaEntrada}T${formData.horaEntrada}`);
            const estadoVisita = getEstadoVisita(fechaEntrada);

            const newHistorial = {
                ...formData,
                fechaCarga,
                estadoVisita
            };
            setHistorial((prev) => [...prev, newHistorial]);
            setFormData({
                motivoSalida: '',
                acompananteInterno: '',
                fechaSalida: '',
                horaSalida: '',
                fechaEntrada: '',
                horaEntrada: '',
                observacion: ''
            });
            setErrors({});
        }
    };

    const handleOpenModal = (type, index) => {
        setModalType(type);
        setSelectedIndex(index);
        setInputValue(type === 'observacion' ? historial[index]?.observacion : '');
        setModalOpen(true);
    };

    const handleSave = () => {
        const updatedHistorial = [...historial];
        if (modalType === 'observacion') {
            updatedHistorial[selectedIndex] = {
                ...updatedHistorial[selectedIndex],
                observacion: inputValue,
                fechaCargaObservacion: new Date().toLocaleString()
            };
        }
        setHistorial(updatedHistorial);
        setModalOpen(false);
    };

    const handleAnularVisita = (index) => {
        setSelectedIndex(index);
        setAnularModalOpen(true);
    };

    const handleSaveAnulacion = () => {
        const now = new Date().toLocaleString();
        const updatedHistorial = [...historial];
        const anulacion = {
            ...updatedHistorial[selectedIndex],
            motivoAnulacion: anularMotivo,
            fechaAnulacion: now,
            estadoVisita: 'Anulada'
        };
        setHistorialAnulados((prev) => [...prev, anulacion]);
        setHistorial(updatedHistorial.filter((_, i) => i !== selectedIndex));
        setAnularModalOpen(false);
        setAnularMotivo('');
    };

    const handleVolver = () => {
        navigate('/general');
    };

    const handleGenerarInforme = () => {
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-6 rounded-md shadow-md">
                {/* Formulario de Carga */}
                <div className="bg-white rounded-md shadow-md mb-4 p-3">
                    <h2 className="text-xl font-bold mb-3">Carga de Salidas</h2>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="motivoSalida">Motivo de la salida:</label>
                            <input
                                type="text"
                                id="motivoSalida"
                                name="motivoSalida"
                                value={formData.motivoSalida}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder='Ingrese el motivo de la salida'
                            />
                            {errors.motivoSalida && <p className="text-red-500 text-xs mt-1">{errors.motivoSalida}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="acompananteInterno">Acompañante del interno:</label>
                            <input
                                type="text"
                                id="acompananteInterno"
                                name="acompananteInterno"
                                value={formData.acompananteInterno}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder='Ingrese el acompañante del interno'
                            />
                            {errors.acompananteInterno && <p className="text-red-500 text-xs mt-1">{errors.acompananteInterno}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="fechaSalida">Fecha de salida:</label>
                                <input
                                    type="date"
                                    id="fechaSalida"
                                    name="fechaSalida"
                                    value={formData.fechaSalida}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                />
                                {errors.fechaSalida && <p className="text-red-500 text-xs mt-1">{errors.fechaSalida}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="horaSalida">Hora de salida:</label>
                                <input
                                    type="time"
                                    id="horaSalida"
                                    name="horaSalida"
                                    value={formData.horaSalida}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                />
                                {errors.horaSalida && <p className="text-red-500 text-xs mt-1">{errors.horaSalida}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="fechaEntrada">Fecha de entrada:</label>
                                <input
                                    type="date"
                                    id="fechaEntrada"
                                    name="fechaEntrada"
                                    value={formData.fechaEntrada}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                />
                                {errors.fechaEntrada && <p className="text-red-500 text-xs mt-1">{errors.fechaEntrada}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="horaEntrada">Hora de entrada:</label>
                                <input
                                    type="time"
                                    id="horaEntrada"
                                    name="horaEntrada"
                                    value={formData.horaEntrada}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                />
                                {errors.horaEntrada && <p className="text-red-500 text-xs mt-1">{errors.horaEntrada}</p>}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="observacion">Observación:</label>
                            <textarea
                                id="observacion"
                                name="observacion"
                                value={formData.observacion}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder='Ingrese alguna observación aqui'
                                rows="3"
                            />
                        </div>
                        <div className="flex justify-center mt-2">
                            <button
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dividir Historiales */}
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Historial de Cargas */}
                    {/* Historial de Cargas */}
                    <div className="flex-1 bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                        <h2 className="text-sm font-bold mt-4">Historial de Carga</h2>
                        <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-96 overflow-y-auto">
                            {historial.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay registros de carga aún.
                                </p>
                            ) : (
                                <ul className="space-y-3">
                                    {historial.map((registro, index) => {
                                        // Calcular el estado de la salida
                                        const fechaHoraSalida = new Date(`${registro.fechaSalida}T${registro.horaSalida}`);
                                        const fechaHoraEntrada = new Date(`${registro.fechaEntrada}T${registro.horaEntrada}`);
                                        const ahora = new Date();
                                        let estadoColor, estadoTexto, estadoTextoColor;

                                        if (registro.motivoAnulacion) {
                                            estadoColor = 'bg-red-500';
                                            estadoTextoColor = 'text-red-500';
                                            estadoTexto = 'Anulada';
                                        } else if (fechaHoraEntrada < ahora) {
                                            estadoColor = 'bg-green-500';
                                            estadoTextoColor = 'text-green-500';
                                            estadoTexto = 'Concretada';
                                        } else if (fechaHoraSalida > ahora) {
                                            estadoColor = 'bg-yellow-500';
                                            estadoTextoColor = 'text-yellow-500';
                                            estadoTexto = 'Pendiente';
                                        }

                                        return (
                                            <li key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
                                                <p className='text-sm'><strong>Motivo de la salida:</strong> {registro.motivoSalida}</p>
                                                <p className='text-sm'><strong>Acompañante del interno:</strong> {registro.acompananteInterno}</p>
                                                <p className='text-sm'><strong>Fecha de salida:</strong> {registro.fechaSalida}</p>
                                                <p className='text-sm'><strong>Hora de salida:</strong> {registro.horaSalida}</p>
                                                <p className='text-sm'><strong>Fecha de entrada:</strong> {registro.fechaEntrada}</p>
                                                <p className='text-sm'><strong>Hora de entrada:</strong> {registro.horaEntrada}</p>
                                                {registro.observacion && (
                                                    <p className='text-sm'>
                                                        <strong>Observación:</strong> {registro.observacion}
                                                        {registro.fechaCargaObservacion && (
                                                            <>
                                                                {' '}
                                                                <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga observacion:</strong> {registro.fechaCargaObservacion}</p>
                                                            </>
                                                        )}
                                                    </p>
                                                )}
                                                <p className="text-sm text-gray-500"><strong>Fecha de carga:</strong> {registro.fechaCarga}</p>
                                                <div className="flex items-center mt-2">
                                                    <div className={`w-3 h-3 rounded-full ${estadoColor}`}></div>
                                                    <p className={`text-sm ml-2 ${estadoTextoColor} italic font-bold`}>Estado de la Salida: {estadoTexto}</p>
                                                </div>
                                                <div className="flex space-x-2 mt-2">
                                                    <button
                                                        onClick={() => handleOpenModal('observacion', index)}
                                                        className="bg-blue-500 text-white p-1 rounded-md hover:bg-blue-600 text-xs"
                                                    >
                                                        {registro.observacion ? 'Editar Observación' : 'Agregar Observación'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleAnularVisita(index)}
                                                        className="bg-red-500 text-white p-1 rounded-md hover:bg-red-600 text-xs"
                                                    >
                                                        Anular Visita
                                                    </button>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    </div>

                    {/* Historial de Salidas Anuladas */}
                    <div className="flex-1 bg-white p-4 rounded-md shadow-md mb-4 mt-5">
                        <h2 className="text-sm font-bold mt-4">Historial de Salidas Anuladas</h2>
                        <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-96 overflow-y-auto">
                            {historialAnulados.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay registros de salidas anuladas aún.
                                </p>
                            ) : (
                                <ul className="space-y-3">
                                    {historialAnulados.map((registro, index) => (
                                        <li key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
                                            <div className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-100">
                                                <div className="flex items-center mt-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    <p className="text-sm ml-2 text-red-500 italic font-bold">Estado de la Salida: Anulada</p>
                                                </div>
                                                <p className='text-sm italic'><strong>Motivo de anulación:</strong> {registro.motivoAnulacion}</p>
                                                <p className='text-sm italic'><strong>Fecha de anulación:</strong> {registro.fechaAnulacion}</p>
                                            </div>
                                            <p className='text-sm'><strong>Motivo de la salida:</strong> {registro.motivoSalida}</p>
                                            <p className='text-sm'><strong>Acompañante del interno:</strong> {registro.acompananteInterno}</p>
                                            <p className='text-sm'><strong>Fecha de salida:</strong> {registro.fechaSalida}</p>
                                            <p className='text-sm'><strong>Hora de salida:</strong> {registro.horaSalida}</p>
                                            <p className='text-sm'><strong>Fecha de entrada:</strong> {registro.fechaEntrada}</p>
                                            <p className='text-sm'><strong>Hora de entrada:</strong> {registro.horaEntrada}</p>
                                            {registro.observacion && (
                                                <p className='text-sm'>
                                                    <strong>Observación:</strong> {registro.observacion}
                                                    {registro.fechaCargaObservacion && (
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga observación:</strong> {registro.fechaCargaObservacion}</p>
                                                    )}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-500"><strong>Fecha de carga:</strong> {registro.fechaCarga}</p>

                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>

                </div>

                {/* Modal para observaciones */}
                {modalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-md shadow-lg w-80">
                            <h3 className="text-sm font-bold mb-3">
                                {modalType === 'observacion' ? 'Agregar/Editar Observación' : 'Agregar/Editar Otro Campo'}
                            </h3>
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                rows="4"
                                placeholder='Ingrese la oservación aqui...'
                            />
                            <div className="mt-3 flex justify-end space-x-2">
                                <button
                                    onClick={handleSave}
                                    className={`bg-green-500 text-white p-2 rounded-md hover:bg-green-600 text-xs ${!inputValue.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!inputValue.trim()}  // Deshabilitar si está vacío
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

                {/* Modal para anulación */}
                {anularModalOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-md shadow-lg w-80">
                            <h3 className="text-sm font-bold mb-3">Motivo de Anulación</h3>
                            <textarea
                                value={anularMotivo}
                                onChange={(e) => setAnularMotivo(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder='Ingrese en motivo de la anulación'
                                rows="4"
                            />
                            <div className="mt-3 flex justify-end space-x-2">
                                <button
                                    onClick={handleSaveAnulacion}
                                    className={`bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-xs ${!anularMotivo.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!anularMotivo.trim()}
                                >
                                    Anular
                                </button>
                                <button
                                    onClick={() => setAnularModalOpen(false)}
                                    className="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 text-xs"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
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
                        Generar Informe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaSalidas;
