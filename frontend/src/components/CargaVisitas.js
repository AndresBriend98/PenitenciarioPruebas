import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import HistorialVisitasProhibidas from './HistorialVisitasProhibidas'; // Asegúrate de usar la ruta correcta
import HistorialVisitasSancionadas from './HistorialVisitasSacionadas'; // Asegúrate de usar la ruta correcta
import Header from './Header'; // Asegúrate de usar la ruta correcta
import Modal from './ModalAlerts';

const CargaVisitas = () => {
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();
    // Función para generar el reporte e imprimirlo
    const handleGenerarReporte = () => {
        let visitasAImprimir = [];

        // Si el filtro de DNI está vacío, se imprime todo el historial de visitas
        if (dniFiltro) {
            // Filtrar las visitas basadas en el DNI ingresado
            visitasAImprimir = historialVisitas.filter(item =>
                item.dni.toLowerCase().includes(dniFiltro.toLowerCase())
            );

            if (visitasAImprimir.length === 0) {
                alert("No se encontraron visitas para el DNI ingresado.");
                return;
            }
        } else {
            // Si no hay filtro, se imprime todo el historial
            visitasAImprimir = historialVisitas;
        }

        // Generar el contenido del reporte en formato HTML
        let contenidoImprimir = `
        <div style="padding: 20px;">
            <h2>Informe de Visitas</h2>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
            <table style="width: 100%; border-collapse: collapse;" border="1">
                <thead>
                    <tr>
                        <th>Nombre/s</th>
                        <th>DNI</th>
                        <th>Relación</th>
                        <th>Tipo de Visita</th>
                        <th>Motivo</th>
                        <th>Fecha</th>
                        <th>Hora</th>
                        <th>Comportamiento</th>
                        <th>Observación</th>
                        <th>Fecha de Carga</th>
                    </tr>
                </thead>
                <tbody>`;

        // Recorrer las visitas y agregar cada una al reporte
        visitasAImprimir.forEach((item) => {
            contenidoImprimir += `
            <tr>
                <td>${item.nombre}</td>
                <td>${item.dni}</td>
                <td>${item.relacion || item.otraRelacion}</td>
                <td>${item.tipoVisita}</td>
                <td>${item.motivoVisita}</td>
                <td>${item.fechaVisita}</td>
                <td>${item.horaVisita}</td>
                <td>${item.comportamiento || 'N/A'}</td>
                <td>${item.observacion || 'N/A'}</td>
                <td>${item.fechaCarga}</td>
            </tr>`;
        });

        contenidoImprimir += `
                </tbody>
            </table>
            <p>Este informe ha sido generado automáticamente.</p>
        </div>
    `;

        // Crear una ventana nueva para imprimir el informe
        const ventanaImpresion = window.open('', '_blank');
        ventanaImpresion.document.write(`
        <html>
            <head>
                <title>Informe de Visitas</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                    }
                    h2 {
                        text-align: center;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                        border-bottom: 1px solid #ddd;
                    }
                </style>
            </head>
            <body>
                ${contenidoImprimir}
            </body>
        </html>
    `);
        ventanaImpresion.document.close();
        ventanaImpresion.print();  // Imprimir el contenido
    };
    const [historialVisitas, setHistorialVisitas] = useState([]);  // Historial de visitas
    const [fileInputRefs, setFileInputRefs] = useState([]);  // Referencias a los inputs de los archivos
    const [selectedItemId, setSelectedItemId] = useState(null);  // Item seleccionado en el historial
    const [comportamientoObservacion, setComportamientoObservacion] = useState({ tipo: '', texto: '', fechaCarga: '' });
    const [showComportamientoObservacionModal, setShowComportamientoObservacionModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');
    const [historialVisitasProhibidas, setHistorialVisitasProhibidas] = useState([]);
    const [historialVisitasSancionadas, setHistorialVisitasSancionadas] = useState([]);  // Historial de visitas sancionadas
    const photoInputRef = useRef(null);  // Referencia para subir fotos

    // Función para verificar si el DNI está en el historial
    const isDniAlreadyInHistory = (dni) => {
        return historialVisitasProhibidas.some(visita => visita.dni === dni);
    };

    const handleInputChangeNuevaVisita = (e) => {
        const { id, value, type, checked } = e.target;

        setNuevaVisita(prevState => {
            // Si el campo que se está modificando es comportamiento o observación
            if (id === 'comportamiento' || id === 'observacion') {
                return {
                    ...prevState,
                    [id]: type === 'checkbox' ? checked : value,
                    // Asignar la fecha de carga solo si no está definida
                    [`fecha${id.charAt(0).toUpperCase() + id.slice(1)}`]: prevState[id] !== value ? prevState[`fecha${id.charAt(0).toUpperCase() + id.slice(1)}`] || new Date().toLocaleString() : prevState[`fecha${id.charAt(0).toUpperCase() + id.slice(1)}`]
                };
            }
            return {
                ...prevState,
                [id]: type === 'checkbox' ? checked : value
            };
        });
    };


    // Función para verificar si el DNI estuvo sancionado y ya cumplió la sanción
    const checkDniSancionadoCumplido = (dni) => {
        const visitaSancionada = historialVisitasSancionadas.find(visita => visita.dni === dni);

        if (visitaSancionada) {
            const { fechaSancion, fechaCumplimiento } = visitaSancionada;
            const today = new Date();
            const cumplimientoDate = new Date(fechaCumplimiento);

            // Si ya cumplió la sanción
            if (cumplimientoDate < today) {
                return {
                    estuvoSancionado: true,
                    fechaSancion,
                    fechaCumplimiento
                };
            }
        }

        return { estuvoSancionado: false };
    };
    // Estado para la nueva visita
    const [nuevaVisita, setNuevaVisita] = useState({
        foto: null,
        acreditado: false,
        autorizado: false,
        nombre: '',
        dni: '',
        relacion: '',
        tipoVisita: '',
        motivoVisita: '',
        fechaVisita: '',
        horaVisita: '',
        comportamiento: '',
        observacion: ''
    });

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaVisita((prev) => ({
                    ...prev,
                    foto: reader.result,  // Actualizar el estado con la nueva imagen
                }));
            };
            reader.readAsDataURL(file); // Leer la imagen como base64
        }
    };

    const [editIndex, setEditIndex] = useState(null);  // Para editar visitas
    const [errors, setErrors] = useState({});  // Para manejar errores de validación
    // Estado para almacenar el filtro por DNI
    const [dniFiltro, setDniFiltro] = useState('');

    // Función para manejar el cambio en el campo de filtro
    const handleFiltroDniChange = (e) => {
        setDniFiltro(e.target.value);
    };

    // Filtrar el historial por el DNI ingresado
    const historialFiltrado = historialVisitas.filter(item =>
        item.dni.toLowerCase().includes(dniFiltro.toLowerCase())
    );
    // Validación de campos requeridos
    const validateFields = () => {
        const requiredFields = ['nombre', 'dni', 'relacion', 'tipoVisita', 'motivoVisita', 'fechaVisita', 'horaVisita'];
        const newErrors = {};

        requiredFields.forEach(field => {
            if (!nuevaVisita[field]) {
                newErrors[field] = 'Este campo es obligatorio';
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSaveComportamientoObservacion = () => {
        const updatedHistorial = historialVisitas.map((item) =>
            item.id === selectedItemId
                ? {
                    ...item,
                    [comportamientoObservacion.tipo]: comportamientoObservacion.texto,
                    // Si no existe la fecha de carga, asignarla. Si ya existe, no la sobreescribimos.
                    [`fecha${comportamientoObservacion.tipo.charAt(0).toUpperCase() + comportamientoObservacion.tipo.slice(1)}`]: item[`fecha${comportamientoObservacion.tipo.charAt(0).toUpperCase() + comportamientoObservacion.tipo.slice(1)}`] || new Date().toLocaleString(),
                    // Solo actualizamos la fecha de modificación si estamos editando el campo correspondiente
                    [`fechaUltimaModificacion${comportamientoObservacion.tipo.charAt(0).toUpperCase() + comportamientoObservacion.tipo.slice(1)}`]: isEditing ? new Date().toLocaleString() : item[`fechaUltimaModificacion${comportamientoObservacion.tipo.charAt(0).toUpperCase() + comportamientoObservacion.tipo.slice(1)}`]
                }
                : item
        );
        setHistorialVisitas(updatedHistorial);
        setShowComportamientoObservacionModal(false);
    };

    // y si aún está dentro del tiempo de sanción
    const checkDniInSancionadas = (dni) => {
        const visitaSancionada = historialVisitasSancionadas.find(visita => visita.dni === dni);

        if (visitaSancionada) {
            const { fechaCumplimiento } = visitaSancionada;
            const today = new Date();
            const cumplimientoDate = new Date(fechaCumplimiento);

            // Si la fecha de cumplimiento es posterior a la fecha actual, la sanción aún es válida
            if (cumplimientoDate >= today) {
                return { isStillSanctioned: true, hasFulfilledSanction: false }; // Aún está sancionado
            } else {
                return { isStillSanctioned: false, hasFulfilledSanction: true }; // Ya cumplió la sanción
            }
        }

        return { isStillSanctioned: false, hasFulfilledSanction: false }; // No está sancionado
    };

    const handleAddVisita = () => {
        if (!validateFields()) {
            return;  // Si hay errores de validación, no continuar
        }

        if (isDniAlreadyInHistory(nuevaVisita.dni)) {
            setModalMessage('El DNI ingresado se encuentra en el historial de visitas prohibidas.');
            setShowModalAlert(true);
            return;
        }

        const { isStillSanctioned, hasFulfilledSanction } = checkDniInSancionadas(nuevaVisita.dni);

        if (isStillSanctioned) {
            setModalMessage('El DNI ingresado se encuentra en el historial de visitas sancionadas y la sanción aún no ha sido cumplida.');
            setShowModalAlert(true);
            return;
        }

        if (hasFulfilledSanction) {
            setModalMessage('El DNI está registrado en el historial de visitas sancionadas, pero ya ha cumplido su sanción. Carga completada.');
            setShowModalAlert(true);
        }

        const nuevaRelacion = nuevaVisita.relacion === "Otro" ? nuevaVisita.otraRelacion : nuevaVisita.relacion;

        // Definir fecha de carga de la nueva visita
        const nuevaVisitaConFecha = {
            ...nuevaVisita,
            relacion: nuevaRelacion,
            fechaCarga: new Date().toLocaleString(),  // Asignar la fecha de carga en el momento de la creación
            fechaUltimaModificacion: '',  // No modificar aún la fecha de modificación
        };

        if (editIndex !== null) {
            // Editar una visita existente
            const updatedHistorial = [...historialVisitas];
            updatedHistorial[editIndex] = {
                ...nuevaVisitaConFecha,
                fechaUltimaModificacion: new Date().toLocaleString(),
            };
            setHistorialVisitas(updatedHistorial);
            setEditIndex(null);
        } else {
            // Agregar una nueva visita
            setHistorialVisitas(prev => [
                ...prev,
                nuevaVisitaConFecha
            ]);
        }

        // Resetear el formulario después de agregar la visita
        setNuevaVisita({
            foto: '',
            acreditado: false,
            autorizado: false,
            nombre: '',
            dni: '',
            relacion: '',
            otraRelacion: '',
            tipoVisita: '',
            motivoVisita: '',
            fechaVisita: '',
            horaVisita: '',
            comportamiento: '',
            observacion: ''
        });
        setErrors({});
    };

    useEffect(() => {
        setFileInputRefs(historialVisitas.map(() => React.createRef()));
    }, [historialVisitas]);

    const handleUploadPhoto = (index) => {
        const file = fileInputRefs[index].current.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedHistorial = [...historialVisitas];
                updatedHistorial[index] = {
                    ...updatedHistorial[index],
                    foto: reader.result,  // Actualizar la foto en el historial de visitas
                };
                setHistorialVisitas(updatedHistorial);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleViewPhoto = (photoUrl) => {
        setModalPhoto(photoUrl);
        setShowModal(true);
    };

    useEffect(() => {
        setFileInputRefs(historialVisitas.map(() => React.createRef()));
    }, [historialVisitas]);

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedPhoto(null); // Limpiar la foto seleccionada al cerrar el modal
    };

    const handleVolver = () => {
        navigate('/general');
    };

    const handleGenerarInforme = () => {
    };

    const closeModalAlert = () => {
        setShowModalAlert(false);
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <Modal isOpen={showModalAlert} message={modalMessage} onClose={closeModalAlert} />
            <div className="bg-white bg-white p-4 rounded-md shadow-md border border-gray-300">
                <h1 className="text-xl font-bold mb-4">Carga de Visitas</h1>

                <div className="flex flex-col items-center mb-3 ">
                    <div className="relative flex justify-center items-center">
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-28 h-28 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                {nuevaVisita.foto ? (
                                    <img src={nuevaVisita.foto} alt="Foto Visita" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white text-xs">Foto</span>
                                )}
                            </div>

                            {/* Input de archivo que se mantiene oculto */}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}  // Manejador de cambio de foto
                                className="hidden"
                                ref={photoInputRef}  // Referencia a input de foto
                            />

                            {/* Botón para activar el input */}
                            <label
                                htmlFor="fotoInput"
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                                onClick={() => photoInputRef.current.click()}  // Abrir selector de archivo al hacer clic
                            >
                                +
                            </label>
                        </div>
                    </div>
                </div>

                {/* Checkboxes de Acreditado y Autorizado */}
                <div className="flex flex-col sm:flex-row sm:gap-4 justify-center mb-4">
                    <div className="flex items-center bg-white p-2 rounded-md shadow-sm w-full sm:w-auto">
                        <input
                            type="checkbox"
                            id="acreditado"
                            checked={nuevaVisita.acreditado}
                            onChange={handleInputChangeNuevaVisita}
                            className="mr-2"
                        />
                        <label htmlFor="acreditado" className="text-sm font-semibold">Acreditado/da </label>
                    </div>
                    <div className="flex items-center bg-white p-2 rounded-md shadow-sm w-full sm:w-auto">
                        <input
                            type="checkbox"
                            id="autorizado"
                            checked={nuevaVisita.autorizado}
                            onChange={handleInputChangeNuevaVisita}
                            className="mr-2"
                        />
                        <label htmlFor="autorizado" className="text-sm font-semibold">Autorizado/da</label>
                    </div>
                </div>

                {/* Campos de la Visita */}
                <div className="bg-white p-4 rounded-md shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                            <input
                                placeholder='Ingresar nombre y apellido'
                                type="text"
                                id="nombre"
                                value={nuevaVisita.nombre}
                                onChange={handleInputChangeNuevaVisita}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                        </div>
                        <div>
                            <label htmlFor="dni" className="block text-sm font-semibold mb-1">DNI</label>
                            <input
                                placeholder='Ingresar DNI'
                                type="number"
                                id="dni"
                                value={nuevaVisita.dni}
                                onChange={(e) => setNuevaVisita({ ...nuevaVisita, dni: e.target.value })}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el interno</label>
                            <select
                                id="relacion"
                                value={nuevaVisita.relacion}
                                onChange={handleInputChangeNuevaVisita}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.relacion ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="" disabled>Seleccionar relación</option>
                                <option value="Madre">Madre</option>
                                <option value="Madrastra">Madrastra</option>
                                <option value="Padre">Padre</option>
                                <option value="Padrastro">Padrastro</option>
                                <option value="Hermano/a">Hermano/a</option>
                                <option value="Hermanastro/tra">Hermanastro/tra</option>
                                <option value="Cónyuge">Cónyuge</option>
                                <option value="Hijo/a">Hijo/a</option>
                                <option value="Tío/a">Tío/a</option>
                                <option value="Sobrino/a">Sobrino/a</option>
                                <option value="Abuelo/a">Abuelo/a</option>
                                <option value="Primo/a">Primo/a</option>
                                <option value="Pareja">Pareja</option>
                                <option value="ExPareja">ExPareja</option>
                                <option value="Otro">Otro</option>
                            </select>
                            {errors.relacion && <p className="text-red-500 text-sm mt-1">{errors.relacion}</p>}

                            {/* Mostrar campo adicional si seleccionan "Otro" */}
                            {nuevaVisita.relacion === "Otro" && (
                                <div className="mt-4">
                                    <label htmlFor="otraRelacion" className="block text-sm font-semibold mb-1">Especificar otra relación</label>
                                    <input
                                        placeholder="Especificar otra relación"
                                        type="text"
                                        id="otraRelacion"
                                        value={nuevaVisita.otraRelacion || ''}
                                        onChange={handleInputChangeNuevaVisita}
                                        className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.otraRelacion ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.otraRelacion && <p className="text-red-500 text-sm mt-1">{errors.otraRelacion}</p>}
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="tipoVisita" className="block text-sm font-semibold mb-1">Tipo de Visita</label>
                            <input
                                placeholder='Ingresar tipo de visita'
                                type="text"
                                id="tipoVisita"
                                value={nuevaVisita.tipoVisita}
                                onChange={handleInputChangeNuevaVisita}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.tipoVisita ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.tipoVisita && <p className="text-red-500 text-sm mt-1">{errors.tipoVisita}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="motivoVisita" className="block text-sm font-semibold mb-1">Motivo de la Visita</label>
                            <input
                                placeholder='Ingresar motivo de la visita'
                                type="text"
                                id="motivoVisita"
                                value={nuevaVisita.motivoVisita}
                                onChange={handleInputChangeNuevaVisita}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.motivoVisita ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.motivoVisita && <p className="text-red-500 text-sm mt-1">{errors.motivoVisita}</p>}
                        </div>
                        <div>
                            <label htmlFor="fechaVisita" className="block text-sm font-semibold mb-1">Fecha de la Visita</label>
                            <input
                                placeholder='Ingresar fecha de la visita'
                                type="date"
                                id="fechaVisita"
                                value={nuevaVisita.fechaVisita}
                                onChange={handleInputChangeNuevaVisita}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fechaVisita ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.fechaVisita && <p className="text-red-500 text-sm mt-1">{errors.fechaVisita}</p>}
                        </div>
                        <div>
                            <label htmlFor="horaVisita" className="block text-sm font-semibold mb-1">Hora de la Visita</label>
                            <input
                                placeholder='Ingresar hora de la visita'
                                type="time"
                                id="horaVisita"
                                value={nuevaVisita.horaVisita}
                                onChange={handleInputChangeNuevaVisita}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.horaVisita ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.horaVisita && <p className="text-red-500 text-sm mt-1">{errors.horaVisita}</p>}
                        </div>
                        <div>
                            <label htmlFor="comportamiento" className="block text-sm font-semibold mb-1">Comportamiento</label>
                            <input
                                placeholder='Ingresar comportamiento'
                                type="text"
                                id="comportamiento"
                                value={nuevaVisita.comportamiento}
                                onChange={handleInputChangeNuevaVisita}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="observacion" className="block text-sm font-semibold mb-1">Observación</label>
                            <textarea
                                placeholder='Ingresar observación'
                                type="text"
                                id="observacion"
                                value={nuevaVisita.observacion}
                                onChange={handleInputChangeNuevaVisita}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleAddVisita}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>
                </div>
                {/* Sección del Historial */}
                <div className="border border-gray-300 rounded mt-2 bg-gray-50bg-white p-4 rounded-md shadow-md">
                    <h3 className="text-sm font-bold mb-2">Historial de Carga</h3>

                    {/* Mostrar el campo para filtrar por DNI solo si hay visitas en el historial */}
                    {historialVisitas.length > 0 && (
                        <div className="mb-4">
                            <label htmlFor="dniFiltro" className="text-sm font-semibold">Filtrar Visita por DNI</label>
                            <input
                                type="text"
                                id="dniFiltro"
                                placeholder="Ingrese el DNI"
                                value={dniFiltro}
                                onChange={handleFiltroDniChange}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                    )}

                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {/* Mostrar mensaje si no hay visitas en el historial */}
                        {historialVisitas.length === 0 ? (
                            <p className="text-sm text-gray-500 text-center">No hay visitas registradas aún.</p>
                        ) : (
                            // Mostrar mensaje si el filtro no devuelve resultados
                            historialFiltrado.length === 0 ? (
                                <p className="text-sm text-gray-500 text-center">No se encontraron visitas para el DNI ingresado.</p>
                            ) : (
                                <ul className="mt-2">
                                    {historialFiltrado.map((item, index) => {
                                        const inputRef = fileInputRefs[index];
                                        const sancionadoInfo = checkDniSancionadoCumplido(item.dni); // Verificar si estuvo sancionado

                                        return (
                                            <li key={item.id} className="border border-gray-300 p-2 mb-2 rounded bg-white shadow-sm">
                                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                                    <div className="flex-grow">
                                                        {/* Checkboxes */}
                                                        <div className="flex flex-col sm:flex-row sm:space-x-4 mt-2 mb-2">
                                                            <div className="flex items-center mb-2 sm:mb-0">
                                                                <div className={`w-4 h-4 rounded-full ${item.acreditado ? 'bg-green-500' : 'bg-red-300'}`}></div>
                                                                <span className="ml-2 text-sm">Acreditado/da</span>
                                                            </div>
                                                            <div className="flex items-center mb-2 sm:mb-0">
                                                                <div className={`w-4 h-4 rounded-full ${item.autorizado ? 'bg-green-500' : 'bg-red-300'}`}></div>
                                                                <span className="ml-2 text-sm">Autorizado/da</span>
                                                            </div>
                                                        </div>

                                                        {/* Mostrar mensaje si estuvo sancionado y cumplió */}
                                                        {sancionadoInfo.estuvoSancionado && (
                                                            <p className="text-sm text-green-600 mb-2">
                                                                Esta visita anteriormente estuvo sancionada desde <strong>{sancionadoInfo.fechaSancion}</strong> hasta <strong>{sancionadoInfo.fechaCumplimiento}</strong>. Hoy está habilitado. (Para más detalles ver historial de visitas sancionadas)
                                                            </p>
                                                        )}

                                                        {/* Información de la visita */}
                                                        <p className='text-sm'><strong>Nombre/s y Apellido/s:</strong> {item.nombre}</p>
                                                        <p className='text-sm'><strong>Relación con el interno:</strong> {item.relacion || item.otraRelacion}</p>
                                                        <p className='text-sm'><strong>DNI:</strong> {item.dni}</p>
                                                        <p className='text-sm'><strong>Tipo de Visita:</strong> {item.tipoVisita}</p>
                                                        <p className='text-sm'><strong>Motivo de la Visita:</strong> {item.motivoVisita}</p>
                                                        <p className='text-sm'><strong>Fecha de la Visita:</strong> {item.fechaVisita}</p>
                                                        <p className='text-sm'><strong>Hora de la Visita:</strong> {item.horaVisita}</p>

                                                        {item.comportamiento && (
                                                            <p className='text-sm'>
                                                                <strong>Comportamiento:</strong> {item.comportamiento}
                                                                {item.fechaComportamiento && (
                                                                    <span className="text-gray-500">
                                                                        {` Fecha de carga: ${item.fechaComportamiento} `}
                                                                    </span>
                                                                )}
                                                                {item.fechaUltimaModificacionComportamiento && item.fechaComportamiento !== item.fechaUltimaModificacionComportamiento && (
                                                                    <span className="text-gray-500">
                                                                        {` (Última modificación: ${item.fechaUltimaModificacionComportamiento})`}
                                                                    </span>
                                                                )}
                                                            </p>
                                                        )}

                                                        {item.observacion && (
                                                            <p className='text-sm'>
                                                                <strong>Observación:</strong> {item.observacion}
                                                                {item.fechaObservacion && (
                                                                    <span className="text-gray-500">
                                                                        {` Fecha de carga: ${item.fechaObservacion} `}
                                                                    </span>
                                                                )}
                                                                {item.fechaUltimaModificacionObservacion && item.fechaObservacion !== item.fechaUltimaModificacionObservacion && (
                                                                    <span className="text-gray-500">
                                                                        {` (Última modificación: ${item.fechaUltimaModificacionObservacion})`}
                                                                    </span>
                                                                )}
                                                            </p>
                                                        )}

                                                        <p className="text-sm text-gray-500 mt-2 mb-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>

                                                        {/* Botones para agregar comportamiento y observaciones */}
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedItemId(item.id);
                                                                    setComportamientoObservacion({ tipo: 'comportamiento', texto: item.comportamiento || '', fechaCarga: new Date().toLocaleString() });
                                                                    setIsEditing(!!item.comportamiento);
                                                                    setShowComportamientoObservacionModal(true);
                                                                }}
                                                                className={`p-2 rounded-full text-xs ${item.comportamiento ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-400 hover:bg-blue-500'} text-white`}
                                                            >
                                                                {item.comportamiento ? 'Editar comportamiento' : 'Agregar comportamiento'}
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedItemId(item.id);
                                                                    setComportamientoObservacion({ tipo: 'observacion', texto: item.observacion || '', fechaCarga: new Date().toLocaleString() });
                                                                    setIsEditing(!!item.observacion);
                                                                    setShowComportamientoObservacionModal(true);
                                                                }}
                                                                className={`p-2 rounded-full text-xs ${item.observacion ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-400 hover:bg-blue-500'} text-white`}
                                                            >
                                                                {item.observacion ? 'Editar observación' : 'Agregar observación'}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Foto de la visita */}
                                                    <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center">
                                                        {item.foto ? (
                                                            <div className="w-16 h-16 bg-gray-500 rounded-full overflow-hidden">
                                                                <img src={item.foto} alt="Foto Visita" className="w-full h-full object-cover" />
                                                            </div>
                                                        ) : (
                                                            <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                                                                <span className="text-white">Sin foto</span>
                                                            </div>
                                                        )}
                                                        <button
                                                            className="mt-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500"
                                                            onClick={() => item.foto ? handleViewPhoto(item.foto) : inputRef.current.click()}
                                                        >
                                                            {item.foto ? 'Ver' : 'Subir foto'}
                                                        </button>
                                                        <input
                                                            type="file"
                                                            ref={inputRef}
                                                            accept="image/*"
                                                            onChange={() => handleUploadPhoto(index)}
                                                            className="hidden"
                                                        />
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )
                        )}
                    </div>


                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleGenerarReporte}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                        >
                            {dniFiltro ? "Generar informe completo del DNI" : "Generar informe completo"}
                        </button>
                    </div>

                </div>

                {/* Modal para ver la imagen en grande */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-md shadow-lg relative max-w-lg w-full">
                            <button
                                onClick={handleCloseModal}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                                X
                            </button>
                            <img src={modalPhoto} alt="Foto Grande" className="w-full h-auto object-contain" />
                        </div>
                    </div>
                )}

                {/* Modal para comportamiento/observación */}
                {showComportamientoObservacionModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-4 rounded-md w-80">
                            <h2 className="text-l font-bold mb-4">
                                {isEditing ? 'Editar' : 'Agregar'} {comportamientoObservacion.tipo.charAt(0).toUpperCase() + comportamientoObservacion.tipo.slice(1)}
                            </h2>
                            <textarea
                                value={comportamientoObservacion.texto}
                                onChange={(e) => setComportamientoObservacion({ ...comportamientoObservacion, texto: e.target.value })}
                                className="w-full h-32 border border-gray-300 p-2 rounded-md  text-sm mb-4"
                                placeholder={comportamientoObservacion.tipo === 'comportamiento' ? 'Ingrese algún comportamiento...' : 'Ingrese alguna observación...'}
                            />
                            <div className="flex justify-end">
                                <button
                                    onClick={handleSaveComportamientoObservacion}
                                    disabled={!comportamientoObservacion.texto.trim()}
                                    className={`bg-green-500 text-white p-2 text-xs rounded mr-2 ${!comportamientoObservacion.texto.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'}`}
                                >
                                    Guardar
                                </button>
                                <button
                                    onClick={() => setShowComportamientoObservacionModal(false)}
                                    className="bg-gray-500 text-white p-2 text-xs rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contenedor principal con grid layout */}
                <div className='bg-white p-4 rounded-md shadow-md mb-4 mt-5'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <HistorialVisitasProhibidas setHistorialVisitasProhibidas={setHistorialVisitasProhibidas} />
                        <HistorialVisitasSancionadas setHistorialVisitasSancionadas={setHistorialVisitasSancionadas} />
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
                        Generar Informe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaVisitas;