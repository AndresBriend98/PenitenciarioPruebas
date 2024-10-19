import React, { useState, useRef } from 'react';

const HistorialVisitasSancionadas = ({ setHistorialVisitasSancionadas }) => {
    const [nuevaVisitaSancionada, setNuevaVisitaSancionada] = useState({
        nombre: '',
        dni: '',
        relacion: '',
        motivo: '',
        fechaSancion: '',
        fechaCumplimiento: '',
        tiempoSancionado: '',
        foto: '',
        fechaFoto: ''
    });
    const [errors, setErrors] = useState({});
    const [visitasSancionadas, setVisitasSancionadas] = useState([]);
    const fileInputRefSancionada = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');
    const fileInputRefs = useRef([]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNuevaVisitaSancionada(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!nuevaVisitaSancionada.nombre) newErrors.nombre = 'El nombre es obligatorio';
        if (!nuevaVisitaSancionada.dni) newErrors.dni = 'El DNI es obligatorio';
        if (!nuevaVisitaSancionada.relacion) newErrors.relacion = 'La relación con el interno es obligatoria';
        if (!nuevaVisitaSancionada.motivo) newErrors.motivo = 'El motivo de la sanción es obligatorio';
        if (!nuevaVisitaSancionada.fechaSancion) newErrors.fechaSancion = 'La fecha de sanción es obligatoria';
        if (!nuevaVisitaSancionada.fechaCumplimiento) newErrors.fechaCumplimiento = 'La fecha de cumplimiento es obligatoria';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const calcularTiempoSancionado = () => {
        const { fechaSancion, fechaCumplimiento } = nuevaVisitaSancionada;
        if (fechaSancion && fechaCumplimiento) {
            const sancionDate = new Date(fechaSancion);
            const cumplimientoDate = new Date(fechaCumplimiento);
            const diffTime = Math.abs(cumplimientoDate - sancionDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setNuevaVisitaSancionada(prevState => ({
                ...prevState,
                tiempoSancionado: diffDays
            }));
        }
    };

    const handlePhotoChangeSancionada = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaVisitaSancionada(prevState => ({
                    ...prevState,
                    foto: reader.result,
                    fechaFoto: '' // No mostrar la fecha de carga de foto desde el formulario
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddVisita = () => {
        if (validateForm()) {
            calcularTiempoSancionado();  // Calcular tiempo sancionado antes de agregar
            const nueva = { ...nuevaVisitaSancionada, id: visitasSancionadas.length + 1 };
            setVisitasSancionadas(prevState => {
                const updatedList = [...prevState, nueva];
                setHistorialVisitasSancionadas(updatedList);  // Pasar el estado hacia el componente padre
                return updatedList;
            });
            setNuevaVisitaSancionada({
                nombre: '',
                dni: '',
                relacion: '',
                motivo: '',
                foto: '',
                fechaFoto: '',
                fechaSancion: '',
                fechaCumplimiento: '',
                tiempoSancionado: ''
            });
            setErrors({});
        }
    };

    const handleViewPhoto = (photo) => {
        setModalPhoto(photo);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    // HistorialVisitasSancionadas
    const handleUploadPhotoDesdeHistorialSancionadas = (index) => {
        const file = fileInputRefs.current[index].files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVisitasSancionadas(prevState => {
                    const updatedVisitas = [...prevState];
                    updatedVisitas[index] = {
                        ...updatedVisitas[index],
                        foto: reader.result,
                        fechaFoto: new Date().toLocaleString(),
                        desdeHistorial: true
                    };
                    return updatedVisitas;
                });
            };
            reader.readAsDataURL(file);
        }
    };


    return (
        <div>
            <div className="flex space-x-4">
                <div className="flex-1 bg-white p-4 rounded-md shadow-md border border-gray-300 ">
                    <h2 className="text-l font-bold mb-4">Carga Visita Sancionada</h2>

                    {/* Foto de la visita sancionada */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-28 h-28 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                {nuevaVisitaSancionada.foto ? (
                                    <img src={nuevaVisitaSancionada.foto} alt="Foto Visita Sancionada" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white text-xs">Foto</span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChangeSancionada}
                                className="hidden"
                                ref={fileInputRefSancionada}
                            />
                            <label
                                htmlFor="fotoInputSancionada"
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                                onClick={() => fileInputRefSancionada.current.click()}
                            >
                                +
                            </label>
                        </div>
                    </div>

                    {/* Campos del formulario */}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                            <input
                                placeholder="Ingrese el nombre y apellido"
                                type="text"
                                id="nombre"
                                value={nuevaVisitaSancionada.nombre}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.nombre ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            />
                            {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                        </div>
                        <div>
                            <label htmlFor="dni" className="block text-sm font-semibold mb-1">DNI</label>
                            <input
                                placeholder="Ingrese el DNI"
                                type="text"
                                id="dni"
                                value={nuevaVisitaSancionada.dni}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.dni ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            />
                            {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
                        </div>
                        <div>
                            <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el interno</label>
                            <select
                                id="relacion"
                                value={nuevaVisitaSancionada.relacion}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.relacion ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            >
                                <option value="" disabled>Seleccionar relación</option>
                                {/* Opciones relacionadas con el ámbito familiar */}
                                <option value="Madre">Madre</option>
                                <option value="Padre">Padre</option>
                                <option value="Hermano/a">Hermano/a</option>
                                <option value="Cónyuge">Cónyuge</option>
                                <option value="Hijo/a">Hijo/a</option>
                                <option value="Tío/a">Tío/a</option>
                                <option value="Sobrino/a">Sobrino/a</option>
                                <option value="Abuelo/a">Abuelo/a</option>
                                <option value="Primo/a">Primo/a</option>
                                <option value="Pareja">Pareja</option>
                                <option value="Otro">Otro</option>
                            </select>
                            {errors.relacion && <p className="text-red-500 text-sm mt-1">{errors.relacion}</p>}
                        </div>
                        <div>
                            <label htmlFor="motivo" className="block text-sm font-semibold mb-1">Motivo de la Sanción</label>
                            <input
                                placeholder="Ingrese el motivo de la sanción"
                                type="text"
                                id="motivo"
                                value={nuevaVisitaSancionada.motivo}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.motivo ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            />
                            {errors.motivo && <p className="text-red-500 text-sm">{errors.motivo}</p>}
                        </div>
                        <div>
                            <label htmlFor="fechaSancion" className="block text-sm font-semibold mb-1">Fecha de Sanción</label>
                            <input
                                type="date"
                                id="fechaSancion"
                                value={nuevaVisitaSancionada.fechaSancion}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.fechaSancion ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            />
                            {errors.fechaSancion && <p className="text-red-500 text-sm">{errors.fechaSancion}</p>}
                        </div>
                        <div>
                            <label htmlFor="fechaCumplimiento" className="block text-sm font-semibold mb-1">Fecha de Cumplimiento</label>
                            <input
                                type="date"
                                id="fechaCumplimiento"
                                value={nuevaVisitaSancionada.fechaCumplimiento}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.fechaCumplimiento ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            />
                            {errors.fechaCumplimiento && <p className="text-red-500 text-sm">{errors.fechaCumplimiento}</p>}
                        </div>
                    </div>

                    {/* Botón de agregar visita sancionada */}
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleAddVisita}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>
                </div>

            </div>

            <div className="mt-6 bg-white p-4 rounded-md shadow-md border border-gray-300">
                <h2 className="text-sm font-bold mb-4">Historial de Visitas Sancionadas</h2>
                <div className="bg-white p-4 rounded-md shadow-md">
                    <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                        {visitasSancionadas.length > 0 ? (
                            <ul className="space-y-4 ">
                                {visitasSancionadas.map((item, index) => {
                                    const sancionDate = new Date(item.fechaSancion);
                                    const cumplimientoDate = new Date(item.fechaCumplimiento);
                                    const diffTime = Math.abs(cumplimientoDate - sancionDate);
                                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));  // Calcular la diferencia en días
                                    return (
                                        <li key={item.id} className="border border-gray-300 p-2 rounded mt-2 bg-gray-50">
                                            <div className="flex flex-col md:flex-row items-center">
                                                <div className="flex-1">
                                                    <p className='text-sm'><strong>Nombre/s y Apellido/s:</strong> {item.nombre}</p>
                                                    <p className='text-sm'><strong>Relación con el interno:</strong> {item.relacion}</p>
                                                    <p className='text-sm'><strong>DNI:</strong> {item.dni}</p>
                                                    <p className='text-sm'><strong>Motivo de la Sanción:</strong> {item.motivo}</p>
                                                    <p className='text-sm'><strong>Fecha de Sanción:</strong> {item.fechaSancion}</p>
                                                    <p className='text-sm'><strong>Fecha de Cumplimiento:</strong> {item.fechaCumplimiento}</p>
                                                    <p className='text-sm'><strong>Tiempo Sancionado:</strong> {diffDays} días</p>
                                                    <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.desdeHistorial ? item.fechaFoto : new Date().toLocaleString()}</p>
                                                    {item.desdeHistorial && item.fechaFoto && (
                                                        <p className="text-sm text-gray-500"><strong>Fecha de carga de foto:</strong> {item.fechaFoto}</p>
                                                    )}
                                                </div>
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
                                                        onClick={() => item.foto ? handleViewPhoto(item.foto) : fileInputRefs.current[index].click()}
                                                    >
                                                        {item.foto ? 'Ver foto' : 'Subir foto'}
                                                    </button>
                                                    <input
                                                        type="file"
                                                        ref={el => fileInputRefs.current[index] = el}
                                                        accept="image/*"
                                                        onChange={() => handleUploadPhotoDesdeHistorialSancionadas(index)}
                                                        className="hidden"
                                                    />
                                                </div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 text-center">No hay visitas registradas aún.</p>
                        )}
                    </div>
                </div>
            </div>



            {/* Modal para ver foto */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-md shadow-lg relative max-w-lg w-full">
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                        >
                            ×
                        </button>
                        <img src={modalPhoto} alt="Modal Foto" className="w-full h-auto object-contain" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HistorialVisitasSancionadas;
