import React, { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'; 
const CargaSalidas = () => {

    const [confirmDeleteHistorialModal, setConfirmDeleteHistorialModal] = useState(false);
    const [selectedHistorialIndex, setSelectedHistorialIndex] = useState(null);
        const handleCloseDeleteHistorialModal = () => {
        setConfirmDeleteHistorialModal(false);
        setSelectedHistorialIndex(null);
    };
    const handleEliminarActaArchivo = () => {
        if (selectedHistorialIndex !== null) {
            const newHistorial = [...historial];
            const newDate = new Date().toLocaleString(); 
                        if (!newHistorial[selectedHistorialIndex].fechasDeEliminacion) {
                newHistorial[selectedHistorialIndex].fechasDeEliminacion = [];
            }

                        newHistorial[selectedHistorialIndex].fechasDeEliminacion.push(newDate);

                        newHistorial[selectedHistorialIndex].actasArchivo = null;
            newHistorial[selectedHistorialIndex].nombreActaArchivo = '';

                        setHistorial(newHistorial);
        }

                setConfirmDeleteHistorialModal(false);
        setSelectedHistorialIndex(null);
    };

    const handleGenerarReporte = (index) => {

        const registro = historial[index];         const fechaHora = new Date();

        const reporte = `
            Reporte de Salida
    
            Motivo de la salida: ${registro.motivoSalida}
            Nombre/s y apellido/s del acompañante del interno: ${registro.acompananteInterno}
            DNI del acompañante del interno: ${registro.dniAcompananteInterno}
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
        ventanaImpresion.print();     };
    const [encargados, setEncargados] = useState([]);         const handlePrintRegistro = (index) => {
        const registro = historialAnulados[index];

                const contenidoImprimir = `
        <div style="padding: 20px;">
            <h2>Salida Anulada</h2>
            <p><strong>Motivo de anulación:</strong> ${registro.motivoAnulacion}</p>
            <p><strong>Fecha de anulación:</strong> ${registro.fechaAnulacion}</p>
            <p><strong>Motivo de la salida:</strong> ${registro.motivoSalida}</p>
            <p><strong>Nombre/s y apellido/s del acompañante del interno:</strong> ${registro.acompananteInterno}</p>
            <p><strong>DNI del acompañante del interno:</strong> ${registro.dniAcompananteInterno}</p>
            <p><strong>Fecha de salida:</strong> ${registro.fechaSalida}</p>
            <p><strong>Hora de salida:</strong> ${registro.horaSalida}</p>
            <p><strong>Fecha de entrada:</strong> ${registro.fechaEntrada}</p>
            <p><strong>Hora de entrada:</strong> ${registro.horaEntrada}</p>
            <p><strong>Observación:</strong> ${registro.observacion || 'N/A'}</p>
            <p><strong>Fecha de carga:</strong> ${registro.fechaCarga}</p>
        </div>
    `;

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
        ventanaImpresion.print();      };
        const [actasArchivo, setActasArchivo] = useState(null);
    const [nombreActaArchivo, setNombreActaArchivo] = useState('');
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
            archivoAdjunto: anularArchivoNombre,          };

        setHistorialAnulados((prev) => [...prev, anulacion]);
        setHistorial(updatedHistorial.filter((_, i) => i !== selectedIndex));
        setAnularModalOpen(false);
        setAnularMotivo('');
        setAnularArchivo(null);
        setAnularArchivoNombre('');      };

    const fileInputRef = useRef(null);

        const getEstadoVisita = (fechaSalida, fechaEntrada) => {
        const ahora = new Date();
        const fechaHoraSalida = new Date(`${fechaSalida}T00:00:00`);         const fechaHoraEntrada = new Date(`${fechaEntrada}T23:59:59`); 
        if (fechaHoraSalida < ahora && fechaHoraEntrada < ahora) {
            return { color: 'bg-green-500', texto: 'Concretada', colorTexto: 'text-green-500' };
        } else if (fechaHoraSalida > ahora) {
            return { color: 'bg-yellow-500', texto: 'Pendiente', colorTexto: 'text-yellow-500' };
        }
        return { color: 'bg-red-500', texto: 'Anulada', colorTexto: 'text-red-500' };
    };

        const [formData, setFormData] = useState({
        motivoSalida: '',
        acompananteInterno: '',
        dniAcompananteInterno: '',
        fechaSalida: '',
        horaSalida: '',
        fechaEntrada: '',
        horaEntrada: '',
        observacion: '',
        matriculaMovil: '',         nombreCustodia: '',         dniCustodia: '',           nombreChofer: '',          dniChofer: ''          });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const now = new Date();
            const fechaCarga = now.toLocaleString();             const fechaSalida = formData.fechaSalida;
            const fechaEntrada = formData.fechaEntrada;

                        const estadoVisita = getEstadoVisita(fechaSalida, fechaEntrada);

                        const newHistorial = {
                ...formData,
                fechaCarga,                 estadoVisita,                 encargados,                 actasArchivo,                 nombreActaArchivo,                 fechaCargaActa: actasArchivo ? new Date().toLocaleString() : null,                 fechasDeCargaActa: actasArchivo ? [new Date().toLocaleString()] : [],

                                observacion: formData.observacion || '',
                fechaCargaObservacion: formData.observacion ? now.toLocaleString() : null,             };

            setHistorial((prev) => [...prev, newHistorial]);

                        setFormData({
                motivoSalida: '',
                acompananteInterno: '',
                dniAcompananteInterno: '',
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

                        setActasArchivo(null);
            setNombreActaArchivo('');
            fileInputRef.current.value = ''; 
            setErrors({});
        }
    };

        const handleEliminarEncargado = (index) => {
        const nuevosEncargados = encargados.filter((_, i) => i !== index);
        setEncargados(nuevosEncargados);
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
            const fechaActual = new Date().toLocaleString();

            updatedHistorial[selectedIndex] = {
                ...updatedHistorial[selectedIndex],
                observacion: inputValue,
                                fechaCargaObservacion: updatedHistorial[selectedIndex].fechaCargaObservacion
                    ? updatedHistorial[selectedIndex].fechaCargaObservacion
                    : fechaActual,                                  fechaModificacionObservacion: fechaActual,
            };
        }

        setHistorial(updatedHistorial);
        setModalOpen(false);
    };

        const validateForm = () => {
        const errors = {};

                if (!formData.motivoSalida) errors.motivoSalida = 'Motivo de la salida es obligatorio.';
        if (!formData.acompananteInterno) errors.acompananteInterno = 'Acompañante del interno es obligatorio.';
        if (!formData.dniAcompananteInterno) errors.dniAcompananteInterno = 'DNI del acompañante del interno es obligatorio.';
        if (!formData.fechaSalida) errors.fechaSalida = 'Fecha de salida es obligatoria.';
        if (!formData.horaSalida) errors.horaSalida = 'Hora de salida es obligatoria.';
        if (!formData.fechaEntrada) errors.fechaEntrada = 'Fecha de entrada es obligatoria.';
        if (!formData.horaEntrada) errors.horaEntrada = 'Hora de entrada es obligatoria.';
        if (!formData.matriculaMovil) errors.matriculaMovil = 'Matrícula del móvil es obligatoria.';
        if (!formData.nombreChofer) errors.nombreChofer = 'Nombre del chofer es obligatorio.';
        if (!formData.dniChofer) errors.dniChofer = 'DNI del chofer es obligatorio.';

                if (encargados.length === 0) {
            if (!formData.nombreCustodia) {
                errors.nombreCustodia = 'Nombre del personal de custodia es obligatorio.';
            }
            if (!formData.dniCustodia) {
                errors.dniCustodia = 'DNI del personal de custodia es obligatorio.';
            }
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
        const handleAgregarEncargado = () => {
        const newErrors = { ...errors };
        let isValid = true;

                if (!formData.nombreCustodia) {
            newErrors.nombreCustodia = 'Nombre del personal de custodia es requerido';
            isValid = false;
        } else {
            newErrors.nombreCustodia = '';
        }

        if (!formData.dniCustodia) {
            newErrors.dniCustodia = 'DNI del personal de custodia es requerido';
            isValid = false;
        } else {
            newErrors.dniCustodia = '';
        }

        setErrors(newErrors); 
        if (isValid) {
            setEncargados([
                ...encargados,
                { nombre: formData.nombreCustodia, dni: formData.dniCustodia }
            ]);

                        setFormData({
                ...formData,
                nombreCustodia: '',
                dniCustodia: ''
            });
        }
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
                        <div className='"bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4">'>
                            {/* Campos para el personal de custodia */}
                            <div className="mb-2 ">
                                <label className="block text-sm font-medium mb-1" htmlFor="nombreCustodia">Nombre/s y Apellido/s (custodia):</label>
                                <input
                                    type="text"
                                    id="nombreCustodia"
                                    name="nombreCustodia"
                                    value={formData.nombreCustodia}
                                    onChange={(e) => setFormData({ ...formData, nombreCustodia: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Ingrese el nombre del personal de custodia"
                                />
                                {errors.nombreCustodia && <p className="text-red-500 text-xs mt-1">{errors.nombreCustodia}</p>}
                            </div>

                            <div className="mb-2">
                                <label className="block text-sm font-medium mb-1" htmlFor="dniCustodia">DNI (custodia):</label>
                                <input
                                    type="number"
                                    id="dniCustodia"
                                    name="dniCustodia"
                                    value={formData.dniCustodia}
                                    onChange={(e) => setFormData({ ...formData, dniCustodia: e.target.value })}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Ingrese el DNI del personal de custodia"
                                />
                                {errors.dniCustodia && <p className="text-red-500 text-xs mt-1">{errors.dniCustodia}</p>}
                            </div>

                            {/* Botón para agregar encargado (custodia) */}
                            <div className="flex justify-center mt-4">
                                <button
                                    onClick={handleAgregarEncargado}
                                    type="button"
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                                >
                                    Agregar Custodia
                                </button>
                            </div>
                            {/* Mostrar encargados (custodias) agregados */}
                            {encargados.length > 0 && (
                                <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50">
                                    <h3 className="text-sm font-bold mb-2">Encargados de Custodia</h3>
                                    <ul className="space-y-2">
                                        {encargados.map((encargado, index) => (
                                            <li key={index} className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 flex justify-between items-center">
                                                <span className="text-sm">
                                                    <strong>Nombre: </strong>{encargado.nombre} - <strong>DNI: </strong>{encargado.dni}
                                                </span>
                                                <button
                                                    onClick={() => handleEliminarEncargado(index)}
                                                    className="bg-red-400 text-white px-2 py-1 rounded text-xs sm:text-xs hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                                                >
                                                    Eliminar
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4">
                            <div className="grid grid-cols-2 gap-2">

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

                                {/* Campo Matrícula del móvil */}
                                <div>
                                    <label className="block text-sm font-medium mb-1" htmlFor="matriculaMovil">Patente del móvil:</label>
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
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4">
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
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="acompananteInterno">"Nombre/s y apellido/s (acompañante del interno):</label>
                                <input
                                    type="text"
                                    id="acompananteInterno"
                                    name="acompananteInterno"
                                    value={formData.acompananteInterno}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Ingrese el Nombre/s y apellido/s acompañante del interno"
                                />
                                {errors.acompananteInterno && <p className="text-red-500 text-xs mt-1">{errors.acompananteInterno}</p>}
                            </div>
                            {/* DNI Acompañante del interno */}
                            <div>
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="dniAcompananteInterno">
                                    DNI (acompañante del interno):
                                </label>
                                <input
                                    type="number"
                                    id="dniAcompananteInterno"
                                    name="dniAcompananteInterno"                                     value={formData.dniAcompananteInterno}
                                    onChange={handleInputChange}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                    placeholder="Ingrese el DNI del acompañante del interno"
                                />
                                {errors.dniAcompananteInterno && <p className="text-red-500 text-xs mt-1">{errors.dniAcompananteInterno}</p>}
                            </div>

                            {/* Campos de fecha y hora de salida */}
                            <div className="grid grid-cols-2 gap-2 mt-2">
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

                            {/* Observación */}
                            <div>
                                <label className="block text-sm font-medium mb-1 mt-2" htmlFor="observacion">Observación:</label>
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
                            {/* Campo para subir actas */}
                            <label className="block text-sm font-bold mt-2 mb-2">Subir Acta</label>
                            <input
                                type="file"
                                ref={fileInputRef}                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    setActasArchivo(file);                                     setNombreActaArchivo(file.name);                                 }}
                                accept=".pdf,.doc,.docx"
                                className="mt-1 mb-2 text-sm w-full border border-gray-300 rounded p-1"
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
                    <div className="flex-1 bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4 mt-5">
                        <h2 className="text-sm font-bold mt-4">Historial de Carga</h2>
                        <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-96 overflow-y-auto">
                            {historial.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay registros de carga aún.
                                </p>
                            ) : (
                                <ul className="space-y-3">
                                    {historial.map((registro, index) => {
                                                                                const fechaHoraSalida = new Date(`${registro.fechaSalida}T${registro.horaSalida}`);
                                        const fechaHoraEntrada = new Date(`${registro.fechaEntrada}T${registro.horaEntrada}`);
                                        const ahora = new Date();

                                        let estadoColor = '', estadoTextoColor = '', estadoTexto = '';

                                                                                if (registro.motivoAnulacion) {
                                            estadoColor = 'bg-red-500';
                                            estadoTextoColor = 'text-red-500';
                                            estadoTexto = 'Anulada';
                                        }
                                                                                else if (fechaHoraEntrada <= ahora) {
                                            estadoColor = 'bg-green-500';
                                            estadoTextoColor = 'text-green-500';
                                            estadoTexto = 'Concretada';
                                        }
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
                                                <div className="text-sm mt-2">
                                                    {registro.encargados.length === 1 ? (
                                                        <div>
                                                            <strong className="text-sm">Custodia: </strong>
                                                            <strong>Nombre/s y Apellido/s:</strong> {registro.encargados[0].nombre || "No disponible"} -
                                                            <strong>DNI:</strong> {registro.encargados[0].dni || "No disponible"}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {registro.encargados.map((encargado, encargadoIndex) => (
                                                                <div key={encargadoIndex}>
                                                                    <strong className="text-sm">Custodia {encargadoIndex + 1}: </strong>
                                                                    <strong>Nombre/s y Apellido/s:</strong> {encargado.nombre || "No disponible"} -
                                                                    <strong>DNI:</strong> {encargado.dni || "No disponible"}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Nuevos campos */}
                                                <p className='text-sm mt-2'><strong>Nombre del chofer:</strong> {registro.nombreChofer}</p>
                                                <p className='text-sm'><strong>DNI del chofer:</strong> {registro.dniChofer}</p>
                                                <p className='text-sm'><strong>Patente del móvil:</strong> {registro.matriculaMovil}</p>

                                                <p className='text-sm mt-2'><strong>Nombres/s y Apellido/s (compañante del interno):</strong> {registro.acompananteInterno}</p>
                                                <p className='text-sm'><strong>DNI (compañante del interno):</strong> {registro.dniAcompananteInterno}</p>
                                                <p className='text-sm'><strong>Motivo de la salida:</strong> {registro.motivoSalida}</p>
                                                <p className='text-sm mt-2'><strong>Fecha de salida:</strong> {registro.fechaSalida}</p>
                                                <p className='text-sm'><strong>Hora de salida:</strong> {registro.horaSalida}</p>
                                                <p className='text-sm'><strong>Fecha de entrada:</strong> {registro.fechaEntrada}</p>
                                                <p className='text-sm'><strong>Hora de entrada:</strong> {registro.horaEntrada}</p>


                                                {/* Observación y fecha de carga */}
                                                {registro.observacion && (
                                                    <p className="text-sm">
                                                        <strong>Observación:</strong> {registro.observacion}
                                                        <div className="mt-2 text-sm text-gray-500">
                                                            <p>
                                                                <strong>Fecha de carga observación:</strong> {registro.fechaCargaObservacion}
                                                                {registro.fechaModificacionObservacion && (
                                                                    <span className="ml-2"><strong>(Última modificación:</strong> {registro.fechaModificacionObservacion})</span>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </p>
                                                )}
                                                {/* Acta */}
                                                <span className="text-sm max-w-full break-words">
                                                    <strong>Acta:</strong>
                                                </span>

                                                {/* Si no hay archivo cargado */}
                                                {!registro.actasArchivo ? (
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            const newHistorial = [...historial];
                                                            const newDate = new Date().toLocaleString(); 
                                                                                                                        newHistorial[index].actasArchivo = e.target.files[0];

                                                                                                                        if (!newHistorial[index].fechaCarga) {
                                                                newHistorial[index].fechaCarga = newDate;                                                             }

                                                                                                                        if (!newHistorial[index].fechasDeCargaActa) {
                                                                newHistorial[index].fechasDeCargaActa = [];                                                             }

                                                                                                                        newHistorial[index].fechasDeCargaActa.push(newDate);

                                                            setHistorial(newHistorial);                                                         }}
                                                        accept=".pdf,.doc,.docx"
                                                        className="mt-1 mb-2 text-sm ml-2 w-full border border-gray-300 rounded p-1"
                                                    />
                                                ) : (
                                                    <>
                                                        {/* Enlace para descargar el archivo */}
                                                        <a
                                                            href={URL.createObjectURL(registro.actasArchivo)}
                                                            download={registro.actasArchivo.name}
                                                            className="mt-2 ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar Acta
                                                        </a>

                                                        {/* Botón de Editar */}
                                                        <button
                                                            onClick={() => {
                                                                const input = document.createElement("input");
                                                                input.type = "file";
                                                                input.accept = ".pdf,.doc,.docx";

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

                                                                input.click();                                                             }}
                                                            className="mt-2 ml-2 bg-orange-400 text-white p-2 rounded-full text-xs hover:bg-orange-500"
                                                        >
                                                            Editar Acta
                                                        </button>

                                                        {/* Botón de Eliminar */}
                                                        <button
                                                            onClick={() => {
                                                                                                                                setSelectedHistorialIndex(index);                                                                 setConfirmDeleteHistorialModal(true);                                                             }}
                                                            className="mt-2 ml-2 bg-red-400 text-white p-2 rounded-full text-xs hover:bg-red-500"
                                                        >
                                                            Eliminar Acta
                                                        </button>
                                                    </>
                                                )}

                                                <div>

                                                    {/* Mostrar la fecha de carga de acta solo si existe */}
                                                    {registro.fechasDeCargaActa && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500 max-w-full break-words">
                                                                <strong>Fecha de carga de acta:</strong>
                                                            </p>
                                                            <ul className="list-disc list-inside">
                                                                {registro.fechasDeCargaActa.map((fecha, index) => (
                                                                    <li
                                                                        key={index}
                                                                        className="text-sm text-gray-500 max-w-full break-words"
                                                                    >
                                                                        {fecha}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Mostrar las fechas de edición solo si hay al menos una */}
                                                    {registro.fechasDeEdicion && registro.fechasDeEdicion.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500 max-w-full break-words">
                                                                <strong>Fecha de edición de acta:</strong>
                                                            </p>
                                                            <ul className="list-disc list-inside">
                                                                {registro.fechasDeEdicion.map((fecha, index) => (
                                                                    <li
                                                                        key={index}
                                                                        className="text-sm text-gray-500 max-w-full break-words"
                                                                    >
                                                                        {fecha}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Mostrar las fechas de eliminación solo si hay al menos una */}
                                                    {registro.fechasDeEliminacion &&
                                                        registro.fechasDeEliminacion.length > 0 && (
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500 max-w-full break-words">
                                                                    <strong>Fecha de eliminación de acta:</strong>
                                                                </p>
                                                                <ul className="list-disc list-inside">
                                                                    {registro.fechasDeEliminacion.map((fecha, index) => (
                                                                        <li
                                                                            key={index}
                                                                            className="text-sm text-gray-500 max-w-full break-words"
                                                                        >
                                                                            {fecha}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                </div>

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
                                                        Anular Salida
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

                    {/* Historial de Salidas Anuladas */}
                    <div className="flex-1 bg-white p-4 rounded-md shadow-md border border-gray-300 mb-4 mt-5">
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
                                                        <strong className="text-sm italic">Acta: </strong>
                                                        <a
                                                            href={registro.archivoAdjunto}                                                              download={registro.archivoAdjunto}                                                              className="inline-block bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 text-xs"
                                                        >
                                                            Descargar Acta
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                            <div className='border border-gray-300 rounded-lg p-3 mb-2 bg-gray-100'>
                                                {/* Mostrar información de los encargados */}
                                                <div className="text-sm">
                                                    {registro.encargados.length === 1 ? (
                                                        <div>
                                                            <strong className="text-sm">Custodia: </strong>
                                                            <strong>Nombre/s y Apellido/s:</strong> {registro.encargados[0].nombre || "No disponible"} -
                                                            <strong>DNI:</strong> {registro.encargados[0].dni || "No disponible"}
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {registro.encargados.map((encargado, encargadoIndex) => (
                                                                <div key={encargadoIndex}>
                                                                    <strong className="text-sm">Custodia {encargadoIndex + 1}: </strong>
                                                                    <strong>Nombre/s y Apellido/s:</strong> {encargado.nombre || "No disponible"} -
                                                                    <strong>DNI:</strong> {encargado.dni || "No disponible"}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>

                                                <p className='text-sm mt-2'><strong>Nombre/s y Apellido/s (chofer):</strong> {registro.nombreChofer}</p>
                                                <p className='text-sm'><strong>DNI (chofer):</strong> {registro.dniChofer}</p>
                                                <p className='text-sm'><strong>Patente del móvil:</strong> {registro.matriculaMovil}</p>

                                                <p className='text-sm mt-2'><strong>Nombres/s y Apellido/s (compañante del interno):</strong> {registro.acompananteInterno}</p>
                                                <p className='text-sm'><strong>DNI (compañante del interno):</strong> {registro.dniAcompananteInterno}</p>
                                                <p className='text-sm'><strong>Motivo de la salida:</strong> {registro.motivoSalida}</p>
                                                <p className='text-sm mt-2'><strong>Fecha de salida:</strong> {registro.fechaSalida}</p>
                                                <p className='text-sm'><strong>Hora de salida:</strong> {registro.horaSalida}</p>
                                                <p className='text-sm'><strong>Fecha de entrada:</strong> {registro.fechaEntrada}</p>
                                                <p className='text-sm'><strong>Hora de entrada:</strong> {registro.horaEntrada}</p>

                                                {/* Mostrar observación si existe */}
                                                {registro.observacion && (
                                                    <p className='text-sm'>
                                                        <strong>Observación:</strong> {registro.observacion}
                                                        <div className="mt-2 text-sm text-gray-500">
                                                            {registro.fechaCargaObservacion && (
                                                                <span>
                                                                    <strong>Fecha de carga observación:</strong> {registro.fechaCargaObservacion}
                                                                    {registro.fechaModificacionObservacion && (
                                                                        <span className="ml-2">
                                                                            <strong>(Última modificación:</strong> {registro.fechaModificacionObservacion})
                                                                        </span>
                                                                    )}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </p>
                                                )}

                                                {/* Mostrar fecha de carga */}
                                                <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {registro.fechaCarga}</p>


                                                {/* Acta */}
                                                <span className="text-sm max-w-full break-words">
                                                    <strong>Acta:</strong>
                                                </span>

                                                {/* Si no hay archivo cargado */}
                                                {!registro.actasArchivo ? (
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            const newHistorial = [...historial];
                                                            const newDate = new Date().toLocaleString(); 
                                                                                                                        newHistorial[index].actasArchivo = e.target.files[0];

                                                                                                                        if (!newHistorial[index].fechaCarga) {
                                                                newHistorial[index].fechaCarga = newDate;                                                             }

                                                                                                                        if (!newHistorial[index].fechasDeCargaActa) {
                                                                newHistorial[index].fechasDeCargaActa = [];                                                             }

                                                                                                                        newHistorial[index].fechasDeCargaActa.push(newDate);

                                                            setHistorial(newHistorial);                                                         }}
                                                        accept=".pdf,.doc,.docx"
                                                        className="mt-1 mb-2 text-sm ml-2 w-full border border-gray-300 rounded p-1"
                                                    />
                                                ) : (
                                                    <>
                                                        {/* Enlace para descargar el archivo */}
                                                        <a
                                                            href={URL.createObjectURL(registro.actasArchivo)}
                                                            download={registro.actasArchivo.name}
                                                            className="mt-2 ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar Acta
                                                        </a>
                                                    </>
                                                )}
                                                <div>

                                                    {/* Mostrar la fecha de carga de acta solo si existe */}
                                                    {registro.fechasDeCargaActa && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500 max-w-full break-words">
                                                                <strong>Fecha de carga de acta:</strong>
                                                            </p>
                                                            <ul className="list-disc list-inside">
                                                                {registro.fechasDeCargaActa.map((fecha, index) => (
                                                                    <li
                                                                        key={index}
                                                                        className="text-sm text-gray-500 max-w-full break-words"
                                                                    >
                                                                        {fecha}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Mostrar las fechas de edición solo si hay al menos una */}
                                                    {registro.fechasDeEdicion && registro.fechasDeEdicion.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500 max-w-full break-words">
                                                                <strong>Fecha de edición:</strong>
                                                            </p>
                                                            <ul className="list-disc list-inside">
                                                                {registro.fechasDeEdicion.map((fecha, index) => (
                                                                    <li
                                                                        key={index}
                                                                        className="text-sm text-gray-500 max-w-full break-words"
                                                                    >
                                                                        {fecha}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Mostrar las fechas de eliminación solo si hay al menos una */}
                                                    {registro.fechasDeEliminacion &&
                                                        registro.fechasDeEliminacion.length > 0 && (
                                                            <div className="mt-2">
                                                                <p className="text-sm text-gray-500 max-w-full break-words">
                                                                    <strong>Fecha de eliminación:</strong>
                                                                </p>
                                                                <ul className="list-disc list-inside">
                                                                    {registro.fechasDeEliminacion.map((fecha, index) => (
                                                                        <li
                                                                            key={index}
                                                                            className="text-sm text-gray-500 max-w-full break-words"
                                                                        >
                                                                            {fecha}
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        )}
                                                </div>

                                                {/* Botón de imprimir */}
                                                <div className="mt-4 flex justify-end">
                                                    <button
                                                        onClick={() => handlePrintRegistro(index)}
                                                        className="bg-blue-800 text-white px-2 py-1 rounded-md hover:bg-blue-900 text-xs"
                                                    >
                                                        Imprimir
                                                    </button>
                                                </div>
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
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-md w-80">
                            <h2 className="text-l font-bold mb-4">
                                {modalType === 'observacion' ? 'Agregar/Editar Observación' : 'Agregar/Editar Otro Campo'}
                            </h2>
                            <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className="w-full h-32 border border-gray-300 p-2 rounded-md text-sm mb-4"
                                placeholder="Ingrese la observación aquí..."
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSave}
                                    disabled={!inputValue.trim()}
                                    className={`bg-green-500 text-white p-2 text-xs rounded mr-2 ${!inputValue.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setModalOpen(false)}
                                    className="bg-gray-500 text-white p-2 text-xs rounded"
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
                                <label className="block text-sm font-medium mb-1" htmlFor="anularArchivo">  :</label>
                                <input
                                    type="file"
                                    id="anularArchivo"
                                    name="anularArchivo"
                                    onChange={(e) => {
                                        const archivo = e.target.files[0];
                                        setAnularArchivo(archivo);
                                        setAnularArchivoNombre(archivo.name);                                      }}
                                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                                />
                            </div>
                            <div className="mt-3 flex justify-end space-x-2">
                                <button
                                    onClick={handleSaveAnulacion}
                                    className={`bg-red-500 text-white p-2 rounded-md hover:bg-red-600 text-xs ${!anularMotivo.trim() || !anularArchivo ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!anularMotivo.trim() || !anularArchivo}                                  >
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
