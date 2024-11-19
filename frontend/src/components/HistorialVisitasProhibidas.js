import React, { useState, useRef } from 'react';

const HistorialVisitasProhibidas = ({ setHistorialVisitasProhibidas }) => {
    const [nuevaVisita, setNuevaVisita] = useState({
        nombre: '',
        dni: '',
        relacion: '',
        motivo: '',
        foto: '',
        fechaFoto: ''
    });
    const [errors, setErrors] = useState({});
    const [visitasProhibidas, setVisitasProhibidas] = useState([]);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setNuevaVisita(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};
        if (!nuevaVisita.nombre) newErrors.nombre = 'El nombre es obligatorio';
        if (!nuevaVisita.dni) newErrors.dni = 'El DNI es obligatorio';
        if (!nuevaVisita.relacion) newErrors.relacion = 'La relación con el interno es obligatoria';
        if (!nuevaVisita.motivo) newErrors.motivo = 'El motivo de la prohibición es obligatorio';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddVisita = () => {
        if (validateForm()) {
            const nueva = { ...nuevaVisita, id: visitasProhibidas.length + 1 };
            setVisitasProhibidas(prevState => {
                const updatedList = [...prevState, nueva];
                setHistorialVisitasProhibidas(updatedList);
                return updatedList;
            });
            setNuevaVisita({
                nombre: '',
                dni: '',
                relacion: '',
                motivo: '',
                foto: '',
                fechaFoto: ''
            });
            setErrors({});
        }
    };
   
    const [showModal, setShowModal] = useState(false);
    const [modalPhoto, setModalPhoto] = useState('');
    const fileInputRef = useRef(null);

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setNuevaVisita(prevState => ({
                    ...prevState,
                    foto: reader.result,
                    fechaFoto: ''
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleViewPhoto = (photo) => {
        setModalPhoto(photo);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const fileInputRefs = useRef([]);

    const handleUploadPhotoDesdeHistorialProhibidas = (index) => {
        const file = fileInputRefs.current[index].files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setVisitasProhibidas(prevState => {
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
                <div className="flex-1 bg-white p-4 rounded-md shadow-md border border-gray-300">
                    <h2 className="text-l font-bold mb-4">Carga Visita Prohibida</h2>

                    {/* Foto de la visita */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-28 h-28 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                {nuevaVisita.foto ? (
                                    <img src={nuevaVisita.foto} alt="Foto Visita Prohibida" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white text-xs">Foto</span>
                                )}
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                                ref={fileInputRef}
                            />
                            <label
                                htmlFor="fotoInput"
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center cursor-pointer"
                                onClick={() => fileInputRef.current.click()}
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
                                placeholder="Ingrese el nombre y el apellido"
                                type="text"
                                id="nombre"
                                value={nuevaVisita.nombre}
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
                                value={nuevaVisita.dni}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.dni ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            />
                            {errors.dni && <p className="text-red-500 text-sm">{errors.dni}</p>}
                        </div>
                        <div>
                            <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el interno</label>
                            <select
                                id="relacion"
                                value={nuevaVisita.relacion}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.relacion ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            >
                                <option value="" disabled>Seleccionar relación</option>
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
                            <label htmlFor="motivo" className="block text-sm font-semibold mb-1">Motivo de la Prohibición</label>
                            <input
                                placeholder="Ingrese el motivo de la prohibición"
                                type="text"
                                id="motivo"
                                value={nuevaVisita.motivo}
                                onChange={handleInputChange}
                                className={`w-full p-2 border ${errors.motivo ? 'border-red-500' : 'border-gray-300'} rounded text-sm`}
                            />
                            {errors.motivo && <p className="text-red-500 text-sm">{errors.motivo}</p>}
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

            </div>

            {/* Sección del Historial */}
            <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-6">
                <h3 className="text-sm font-bold">Historial de Visitas Prohibidas</h3>
                <div className="border border-gray-300 p-2 rounded mt-2 bg-gray-50 max-h-60 overflow-y-auto">
                    {visitasProhibidas.length > 0 ? (
                        <ul className="mt-2">
                            {visitasProhibidas.map((item, index) => (
                                <li key={index} className="border border-gray-300 p-2 mb-2 rounded bg-white shadow-sm">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                                        <div className="flex-grow">
                                            <p className='text-sm'><strong>Nombre/s y Apellido/s:</strong> {item.nombre}</p>
                                            <p className='text-sm'><strong>Relación con el interno:</strong> {item.relacion}</p>
                                            <p className='text-sm'><strong>DNI:</strong> {item.dni}</p>
                                            <p className='text-sm'><strong>Motivo de la Prohibición:</strong> {item.motivo}</p>
                                            <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {new Date().toLocaleString()}</p>
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
                                                onChange={() => handleUploadPhotoDesdeHistorialProhibidas(index)}
                                                className="hidden"
                                            />
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-gray-500 text-center">No hay visitas registradas aún.</p>
                    )}
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

export default HistorialVisitasProhibidas;
