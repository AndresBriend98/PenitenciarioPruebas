import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'; // Asegúrate de usar la ruta correcta

// Componente CargaSalidas.js
const CargaSalidas = () => {
    const handleGenerarReporte = (index) => {
        const registro = historial[index]; // Obtener la información de la salida
        const fechaHora = new Date();

        const reporte = `
            Reporte de Salida
    
            Motivo de la salida: ${registro.motivoSalida}
            Acompañante del interno: ${registro.acompananteInterno}
            Matrícula del móvil: ${registro.matriculaMovil}
            Nombre del personal de custodia: ${registro.nombreCustodia}
            DNI del personal de custodia: ${registro.dniCustodia}
            Nombre del chofer: ${registro.nombreChofer}
            DNI del chofer: ${registro.dniChofer}
            Fecha de salida: ${registro.fechaSalida}
            Hora de salida: ${registro.horaSalida}
            Fecha de entrada: ${registro.fechaEntrada}
            Hora de entrada: ${registro.horaEntrada}
            Observación: ${registro.observacion || 'No hay observación'}
            Fecha de carga: ${registro.fechaCarga}
    
            Firmas:
            Firma del Interno: ____________________________
            Firma del Oficial Encargado del Interno: ____________________________
            Firma Jefe Seguridad Interno: ____________________________
            Firma del Director: ____________________________
        `;

        const ventanaImpresion = window.open('', '_blank');
        ventanaImpresion.document.write('<html><head><title>Reporte de Salida</title></head><body>');
        ventanaImpresion.document.write('<pre>' + reporte + '</pre>');
        ventanaImpresion.document.write('</body></html>');
        ventanaImpresion.document.close();
        ventanaImpresion.print(); // Imprimir el reporte
    };

    // Función para imprimir el registro
    const handlePrintRegistro = (index) => {
        const registro = historialAnulados[index];

        // Crear el contenido HTML para imprimir
        const contenidoImprimir = `
        <div style="padding: 20px;">
            <h2>Salida Anulada</h2>
            <p><strong>Motivo de anulación:</strong> ${registro.motivoAnulacion}</p>
            <p><strong>Fecha de anulación:</strong> ${registro.fechaAnulacion}</p>
            <p><strong>Motivo de la salida:</strong> ${registro.motivoSalida}</p>
            <p><strong>Acompañante del interno:</strong> ${registro.acompananteInterno}</p>
            <p><strong>Fecha de salida:</strong> ${registro.fechaSalida}</p>
            <p><strong>Hora de salida:</strong> ${registro.horaSalida}</p>
            <p><strong>Fecha de entrada:</strong> ${registro.fechaEntrada}</p>
            <p><strong>Hora de entrada:</strong> ${registro.horaEntrada}</p>
            <p><strong>Observación:</strong> ${registro.observacion || 'N/A'}</p>
            <p><strong>Fecha de carga:</strong> ${registro.fechaCarga}</p>
        </div>
    `;

        // Crear un nuevo documento para imprimir
        const ventanaImpresion = window.open('', '_blank');
        ventanaImpresion.document.write(`
        <html>
            <head>
                <title>Imprimir Salida Anulada</title>
            </head>
            <body>
                ${contenidoImprimir}
            </body>
        </html>
    `);
        ventanaImpresion.document.close();
        ventanaImpresion.print();  // Imprimir el contenido
    };

    const [anularArchivo, setAnularArchivo] = useState(null);
    const [anularArchivoNombre, setAnularArchivoNombre] = useState('');
    const handleSaveAnulacion = () => {
        const now = new Date().toLocaleString();
        const updatedHistorial = [...historial];

        const anulacion = {
            ...updatedHistorial[selectedIndex],
            motivoAnulacion: anularMotivo,
            fechaAnulacion: now,
            estadoVisita: 'Anulada',
            archivoAdjunto: anularArchivoNombre,  // Guardar el nombre del archivo
        };

        setHistorialAnulados((prev) => [...prev, anulacion]);
        setHistorial(updatedHistorial.filter((_, i) => i !== selectedIndex));
        setAnularModalOpen(false);
        setAnularMotivo('');
        setAnularArchivo(null);
        setAnularArchivoNombre('');  // Limpiar nombre del archivo
    };

    // Función para determinar el estado
    const getEstadoVisita = (fechaSalida, fechaEntrada) => {
        const ahora = new Date();
        const fechaHoraSalida = new Date(`${fechaSalida}T00:00:00`); // Asumir hora 00:00 para fecha de salida
        const fechaHoraEntrada = new Date(`${fechaEntrada}T23:59:59`); // Asumir hora 23:59 para fecha de entrada

        if (fechaHoraSalida < ahora && fechaHoraEntrada < ahora) {
            return { color: 'bg-green-500', texto: 'Concretada', colorTexto: 'text-green-500' };
        } else if (fechaHoraSalida > ahora) {
            return { color: 'bg-yellow-500', texto: 'Pendiente', colorTexto: 'text-yellow-500' };
        }
        return { color: 'bg-red-500', texto: 'Anulada', colorTexto: 'text-red-500' };
    };

    // Estado inicial con los nuevos campos
    const [formData, setFormData] = useState({
        motivoSalida: '',
        acompananteInterno: '',
        fechaSalida: '',
        horaSalida: '',
        fechaEntrada: '',
        horaEntrada: '',
        observacion: '',
        matriculaMovil: '', // Nuevo campo
        nombreCustodia: '', // Nuevo campo: Nombre y apellido del personal de custodia
        dniCustodia: '',   // Nuevo campo: DNI del personal de custodia
        nombreChofer: '',  // Nuevo campo: Nombre y apellido del chofer
        dniChofer: ''      // Nuevo campo: DNI del chofer
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Validación para los nuevos campos
    const validateForm = () => {
        const errors = {};
        if (!formData.motivoSalida) errors.motivoSalida = 'Motivo de la salida es obligatorio.';
        if (!formData.acompananteInterno) errors.acompananteInterno = 'Acompañante del interno es obligatorio.';
        if (!formData.fechaSalida) errors.fechaSalida = 'Fecha de salida es obligatoria.';
        if (!formData.horaSalida) errors.horaSalida = 'Hora de salida es obligatoria.';
        if (!formData.fechaEntrada) errors.fechaEntrada = 'Fecha de entrada es obligatoria.';
        if (!formData.horaEntrada) errors.horaEntrada = 'Hora de entrada es obligatoria.';
        if (!formData.matriculaMovil) errors.matriculaMovil = 'Matrícula del móvil es obligatoria.';  // Nuevo campo
        if (!formData.nombreCustodia) errors.nombreCustodia = 'Nombre del personal de custodia es obligatorio.'; // Nuevo campo
        if (!formData.dniCustodia) errors.dniCustodia = 'DNI del personal de custodia es obligatorio.'; // Nuevo campo
        if (!formData.nombreChofer) errors.nombreChofer = 'Nombre del chofer es obligatorio.';  // Nuevo campo
        if (!formData.dniChofer) errors.dniChofer = 'DNI del chofer es obligatorio.';  // Nuevo campo

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Envío del formulario actualizado con los nuevos campos
    const handleSubmit = () => {
        if (validateForm()) {
            const now = new Date();
            const fechaCarga = now.toLocaleString();
            const fechaSalida = formData.fechaSalida;
            const fechaEntrada = formData.fechaEntrada;

            const estadoVisita = getEstadoVisita(fechaSalida, fechaEntrada);

            const newHistorial = {
                ...formData,
                fechaCarga,
                estadoVisita
            };

            setHistorial((prev) => [...prev, newHistorial]);

            // Limpiar los campos del formulario después del submit
            setFormData({
                motivoSalida: '',
                acompananteInterno: '',
                fechaSalida: '',
                horaSalida: '',
                fechaEntrada: '',
                horaEntrada: '',
                observacion: '',
                matriculaMovil: '',
                nombreCustodia: '',
                dniCustodia: '',
                nombreChofer: '',
                dniChofer: ''
            });
            setErrors({});
        }
    };
    const navigate = useNavigate();

    const [errors, setErrors] = useState({});
    const [historial, setHistorial] = useState([]);
    const [historialAnulados, setHistorialAnulados] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [anularModalOpen, setAnularModalOpen] = useState(false);
    const [anularMotivo, setAnularMotivo] = useState('');


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

    const handleVolver = () => {
        navigate('/general');
    };

    const handleGenerarInforme = () => {
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-6 rounded-md shadow-md">
                <div className="bg-white rounded-md shadow-md mb-4 p-3">
                    <h2 className="text-xl font-bold mb-3">Carga de Salidas</h2>
                    <div className="space-y-3">
                        {/* Campo Motivo de la salida */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="motivoSalida">Motivo de la salida:</label>
                            <input
                                type="text"
                                id="motivoSalida"
                                name="motivoSalida"
                                value={formData.motivoSalida}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Ingrese el motivo de la salida"
                            />
                            {errors.motivoSalida && <p className="text-red-500 text-xs mt-1">{errors.motivoSalida}</p>}
                        </div>

                        {/* Campo Acompañante del interno */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="acompananteInterno">Acompañante del interno:</label>
                            <input
                                type="text"
                                id="acompananteInterno"
                                name="acompananteInterno"
                                value={formData.acompananteInterno}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Ingrese el acompañante del interno"
                            />
                            {errors.acompananteInterno && <p className="text-red-500 text-xs mt-1">{errors.acompananteInterno}</p>}
                        </div>

                        {/* Campo Matrícula del móvil */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="matriculaMovil">Matrícula del móvil:</label>
                            <input
                                type="numer"
                                id="matriculaMovil"
                                name="matriculaMovil"
                                value={formData.matriculaMovil}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Ingrese la matrícula del móvil"
                            />
                            {errors.matriculaMovil && <p className="text-red-500 text-xs mt-1">{errors.matriculaMovil}</p>}
                        </div>

                        {/* Campos de fecha y hora de salida */}
                        <div className="grid grid-cols-2 gap-2">
                            {/* Fecha de salida */}
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
                            {/* Hora de salida */}
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

                            {/* Fecha de entrada */}
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
                            {/* Hora de entrada */}
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

                        {/* Campos de Nombre y DNI del personal de custodia y chofer */}
                        <div className="grid grid-cols-2 gap-2">
                            {/* Nombre del personal de custodia */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="nombreCustodia">Nombre/s y Apellido/s (custodia):</label>
                                <input
                                    type="text"
                                    id="nombreCustodia"
                                    name="nombreCustodia"
                                    value={formData.nombreCustodia}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Ingrese el nombre del personal de custodia"
                                />
                                {errors.nombreCustodia && <p className="text-red-500 text-xs mt-1">{errors.nombreCustodia}</p>}
                            </div>

                            {/* DNI del personal de custodia */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="dniCustodia">DNI (custodia):</label>
                                <input
                                    type="number"
                                    id="dniCustodia"
                                    name="dniCustodia"
                                    value={formData.dniCustodia}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Ingrese el DNI del personal de custodia"
                                />
                                {errors.dniCustodia && <p className="text-red-500 text-xs mt-1">{errors.dniCustodia}</p>}
                            </div>

                            {/* Nombre del chofer */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="nombreChofer">Nombre/s y Apellido/s (chofer)</label>
                                <input
                                    type="text"
                                    id="nombreChofer"
                                    name="nombreChofer"
                                    value={formData.nombreChofer}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Ingrese el nombre del chofer"
                                />
                                {errors.nombreChofer && <p className="text-red-500 text-xs mt-1">{errors.nombreChofer}</p>}
                            </div>

                            {/* DNI del chofer */}
                            <div>
                                <label className="block text-sm font-medium mb-1" htmlFor="dniChofer">DNI (chofer):</label>
                                <input
                                    type="number"
                                    id="dniChofer"
                                    name="dniChofer"
                                    value={formData.dniChofer}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Ingrese el DNI del chofer"
                                />
                                {errors.dniChofer && <p className="text-red-500 text-xs mt-1">{errors.dniChofer}</p>}
                            </div>
                        </div>

                        {/* Observación */}
                        <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="observacion">Observación:</label>
                            <textarea
                                id="observacion"
                                name="observacion"
                                value={formData.observacion}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                placeholder="Ingrese alguna observación aquí"
                                rows="3"
                            />
                        </div>

                        {/* Botón de envío */}
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
                    {/* Historial de Carga */}
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
                                        // Crear objetos de fecha para comparar
                                        const fechaHoraSalida = new Date(`${registro.fechaSalida}T${registro.horaSalida}`);
                                        const fechaHoraEntrada = new Date(`${registro.fechaEntrada}T${registro.horaEntrada}`);
                                        const ahora = new Date();

                                        let estadoColor = '', estadoTextoColor = '', estadoTexto = '';

                                        // Si la salida está anulada, asignar estado Anulada
                                        if (registro.motivoAnulacion) {
                                            estadoColor = 'bg-red-500';
                                            estadoTextoColor = 'text-red-500';
                                            estadoTexto = 'Anulada';
                                        }
                                        // Si la fecha de entrada ya pasó, la salida está Concretada
                                        else if (fechaHoraEntrada <= ahora) {
                                            estadoColor = 'bg-green-500';
                                            estadoTextoColor = 'text-green-500';
                                            estadoTexto = 'Concretada';
                                        }
                                        // Si la fecha de salida es mayor que la fecha y hora actual, la salida está Pendiente
                                        else if (fechaHoraSalida < ahora) {
                                            estadoColor = 'bg-yellow-500';
                                            estadoTextoColor = 'text-yellow-500';
                                            estadoTexto = 'Pendiente';
                                        } else {
                                            estadoColor = 'bg-gray-500';
                                            estadoTextoColor = 'text-gray-500';
                                            estadoTexto = 'Desconocido';
                                        }

                                        return (
                                            <li key={index} className="border border-gray-300 p-2 rounded mt-2 bg-gray-50">
                                                <p className='text-sm'><strong>Motivo de la salida:</strong> {registro.motivoSalida}</p>
                                                <p className='text-sm'><strong>Acompañante del interno:</strong> {registro.acompananteInterno}</p>
                                                <p className='text-sm'><strong>Fecha de salida:</strong> {registro.fechaSalida}</p>
                                                <p className='text-sm'><strong>Hora de salida:</strong> {registro.horaSalida}</p>
                                                <p className='text-sm'><strong>Fecha de entrada:</strong> {registro.fechaEntrada}</p>
                                                <p className='text-sm'><strong>Hora de entrada:</strong> {registro.horaEntrada}</p>

                                                {/* Nuevos campos */}
                                                <p className='text-sm'><strong>Matrícula del móvil:</strong> {registro.matriculaMovil}</p>
                                                <p className='text-sm'><strong>Nombre del personal de custodia:</strong> {registro.nombreCustodia}</p>
                                                <p className='text-sm'><strong>DNI del personal de custodia:</strong> {registro.dniCustodia}</p>
                                                <p className='text-sm'><strong>Nombre del chofer:</strong> {registro.nombreChofer}</p>
                                                <p className='text-sm'><strong>DNI del chofer:</strong> {registro.dniChofer}</p>

                                                {registro.observacion && (
                                                    <p className='text-sm'>
                                                        <strong>Observación:</strong> {registro.observacion}
                                                        {registro.fechaCargaObservacion && (
                                                            <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga observación:</strong> {registro.fechaCargaObservacion}</p>
                                                        )}
                                                    </p>
                                                )}

                                                <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {registro.fechaCarga}</p>

                                                {/* Estado de la salida */}
                                                <div className="flex items-center mt-2">
                                                    <div className={`w-3 h-3 rounded-full ${estadoColor}`}></div>
                                                    <p className={`text-sm ml-2 ${estadoTextoColor} italic font-bold`}>
                                                        Estado de la Salida: {estadoTexto}
                                                    </p>
                                                </div>

                                                {/* Botones para agregar observación y anular visita */}
                                                <div className="flex space-x-2 mt-2">
                                                    {/* Cambiar el color del botón en función de si ya existe una observación */}
                                                    <button
                                                        onClick={() => handleOpenModal('observacion', index)}
                                                        className={`p-1 rounded-md text-xs ${registro.observacion ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-400 hover:bg-blue-500'} text-white`}
                                                    >
                                                        {registro.observacion ? 'Editar Observación' : 'Agregar Observación'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleAnularVisita(index)}
                                                        className="bg-red-400 text-white p-1 rounded-md hover:bg-red-500 text-xs"
                                                    >
                                                        Anular Visita
                                                    </button>

                                                    {/* Nuevo botón "Generar Reporte" */}
                                                    <button
                                                        onClick={() => handleGenerarReporte(index)}
                                                        className="bg-blue-800 text-white p-1 rounded-md hover:bg-blue-900 text-xs"
                                                    >
                                                        Generar Reporte
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
                                        <li key={index} className="border border-gray-300 p-2 rounded mt-2 bg-gray-50">
                                            <div className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-100">
                                                <div className="flex items-center mt-2">
                                                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                                    <p className="text-sm ml-2 text-red-500 italic font-bold">Estado de la Salida: Anulada</p>
                                                </div>
                                                <p className='text-sm italic'><strong>Motivo de anulación:</strong> {registro.motivoAnulacion}</p>
                                                <p className='text-sm italic'><strong>Fecha de anulación:</strong> {registro.fechaAnulacion}</p>
                                                {registro.archivoAdjunto && (
                                                    <div className="mt-3">
                                                        {/* Diseño para el botón de descarga */}
                                                        <strong className="text-sm italic">Acta: </strong>
                                                        <a
                                                            href={registro.archivoAdjunto}  // URL del archivo
                                                            download={registro.archivoAdjunto}  // Usa el nombre guardado
                                                            className="inline-block bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 text-xs"
                                                        >
                                                            Descargar Acta
                                                        </a>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Mostrar detalles de la salida anulada */}
                                            <p className='text-sm'><strong>Motivo de la salida:</strong> {registro.motivoSalida}</p>
                                            <p className='text-sm'><strong>Acompañante del interno:</strong> {registro.acompananteInterno}</p>
                                            <p className='text-sm'><strong>Nombre/s y Apellido/s (custodia):</strong> {registro.nombreCustodia}</p>
                                            <p className='text-sm'><strong>DNI (custodia):</strong> {registro.dniCustodia}</p>
                                            <p className='text-sm'><strong>Nombre/s y Apellido/s (chofer):</strong> {registro.nombreChofer}</p>
                                            <p className='text-sm'><strong>DNI (chofer):</strong> {registro.dniChofer}</p>
                                            <p className='text-sm'><strong>Matrícula del móvil:</strong> {registro.matriculaMovil}</p>
                                            <p className='text-sm'><strong>Fecha de salida:</strong> {registro.fechaSalida}</p>
                                            <p className='text-sm'><strong>Hora de salida:</strong> {registro.horaSalida}</p>
                                            <p className='text-sm'><strong>Fecha de entrada:</strong> {registro.fechaEntrada}</p>
                                            <p className='text-sm'><strong>Hora de entrada:</strong> {registro.horaEntrada}</p>

                                            {/* Mostrar observación si existe */}
                                            {registro.observacion && (
                                                <p className='text-sm'>
                                                    <strong>Observación:</strong> {registro.observacion}
                                                    {registro.fechaCargaObservacion && (
                                                        <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga observación:</strong> {registro.fechaCargaObservacion}</p>
                                                    )}
                                                </p>
                                            )}

                                            {/* Mostrar fecha de carga */}
                                            <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {registro.fechaCarga}</p>

                                            {/* Botón de imprimir */}
                                            <div className="mt-4 flex justify-end">
                                                <button
                                                    onClick={() => handlePrintRegistro(index)}
                                                    className="bg-blue-800 text-white px-2 py-1 rounded-md hover:bg-blue-900 text-xs"
                                                >
                                                    Imprimir
                                                </button>
                                            </div>
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
                                placeholder='Ingrese el motivo de la anulación'
                                rows="4"
                            />
                            <div className="mt-3">
                                <label className="block text-sm font-medium mb-1" htmlFor="anularArchivo">Subir acta:</label>
                                <input
                                    type="file"
                                    id="anularArchivo"
                                    name="anularArchivo"
                                    onChange={(e) => {
                                        const archivo = e.target.files[0];
                                        setAnularArchivo(archivo);
                                        setAnularArchivoNombre(archivo.name);  // Guardar el nombre del archivo
                                    }}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <div className="mt-3 flex justify-end space-x-2">
                                <button
                                    onClick={handleSaveAnulacion}
                                    className={`bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-xs ${!anularMotivo.trim() || !anularArchivo ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!anularMotivo.trim() || !anularArchivo}  // Deshabilitar si está vacío o sin archivo
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
