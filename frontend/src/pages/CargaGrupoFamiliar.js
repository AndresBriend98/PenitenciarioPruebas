import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

const CargaGrupoFamiliar = () => {
    const navigate = useNavigate();
    const [historial, setHistorial] = useState([]);
    const photoInputRef = useRef(null);

    const setFileInputRef = (element, index) => {
        fileInputRefs.current[index] = element;
    };

    const handleGenerarInforme = () => {
    };

    const [newRelacion, setNewRelacion] = useState("");
    const [otraRelacion, setOtraRelacion] = useState("");
    const [isEditingRelacion, setIsEditingRelacion] = useState(null);

    const handleGuardarRelacion = (index) => {
        const updatedHistorial = [...historial];
        updatedHistorial[index] = {
            ...updatedHistorial[index],
            relacion: newRelacion,
            ultimaModificacionRelacion: new Date().toLocaleString(),
        };
        setHistorial(updatedHistorial);
        setIsEditingRelacion(null);
    };

    const handleEditarRelacion = (index) => {
        setIsEditingRelacion(index);
        setNewRelacion(historial[index].relacion);
        setOtraRelacion("");
    };

    const handleGuardarDomicilio = (index) => {
        if (newDomicilio.trim() === "") {
            alert("El campo de domicilio no puede estar vacío.");
            return;
        }

        if (newDomicilio !== historial[index].domicilio) {
            const nuevoHistorial = [...historial];
            const editDate = new Date().toLocaleString();

            nuevoHistorial[index].domicilio = newDomicilio;
            nuevoHistorial[index].ultimaModificacionDomicilio = editDate;

            setHistorial(nuevoHistorial);
        }

        setIsEditingDomicilio(null);
    };

    const [isEditingDomicilio, setIsEditingDomicilio] = useState(null);
    const [newDomicilio, setNewDomicilio] = useState('');

    const handleEditarDomicilio = (index) => {
        setIsEditingDomicilio(index);
        setNewDomicilio(historial[index].domicilio);
    };

    const handleGuardarCiudad = (index) => {
        if (newCiudad.trim() === "") {
            alert("El campo de ciudad no puede estar vacío.");
            return;
        }

        if (newCiudad !== historial[index].ciudad) {
            const nuevoHistorial = [...historial];
            const editDate = new Date().toLocaleString();

            nuevoHistorial[index].ciudad = newCiudad;
            nuevoHistorial[index].ultimaModificacionCiudad = editDate;

            setHistorial(nuevoHistorial);
        }

        setIsEditingCiudad(null);
    };

    const [isEditingCiudad, setIsEditingCiudad] = useState(null);
    const [newCiudad, setNewCiudad] = useState('');

    const handleEditarCiudad = (index) => {
        setIsEditingCiudad(index);
        setNewCiudad(historial[index].ciudad);
    };

    const handleGuardarProvincia = (index) => {
        if (newProvincia.trim() === "") {
            alert("El campo de provincia no puede estar vacío.");
            return;
        }

        if (newProvincia !== historial[index].provincia) {
            const nuevoHistorial = [...historial];
            const editDate = new Date().toLocaleString();

            nuevoHistorial[index].provincia = newProvincia;
            nuevoHistorial[index].ultimaModificacionProvincia = editDate;

            setHistorial(nuevoHistorial);
        }

        setIsEditingProvincia(null);
    };

    const [isEditingProvincia, setIsEditingProvincia] = useState(null);
    const [newProvincia, setNewProvincia] = useState('');

    const handleEditarProvincia = (index) => {
        setIsEditingProvincia(index);
        setNewProvincia(historial[index].provincia);
    };

    const handleViewPhoto = (photo) => {
        setSelectedPhoto(photo);
        setShowModal(true);
    };

    const handleInputChange = (e, field) => {
        const { value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const [isEditingFallecimiento, setIsEditingFallecimiento] = useState(null);
    const [isEditingObservacion, setIsEditingObservacion] = useState(null);
    const [newFechaFallecimiento, setNewFechaFallecimiento] = useState('');
    const [newObservacion, setNewObservacion] = useState('');

    const handleEditarFechaFallecimiento = (index) => {
        setIsEditingFallecimiento(index);
        setNewFechaFallecimiento(historial[index].fechaFallecimiento || '');
    };

    const handleGuardarFechaFallecimiento = (index) => {
        const nuevoHistorial = [...historial];
        const currentDate = new Date().toLocaleString();

        nuevoHistorial[index].fechaFallecimiento = newFechaFallecimiento;
        nuevoHistorial[index].fechaFallecimientoCarga = currentDate;

        setHistorial(nuevoHistorial);
        setIsEditingFallecimiento(null);
    };

    const [isObservacionModified, setIsObservacionModified] = useState(false);
    const handleEditarObservacion = (index) => {
        setIsEditingObservacion(index);
        setNewObservacion(historial[index].observacion || '');
        setIsObservacionModified(false);
    };

    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData({ ...formData, foto: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };


    const handleUploadPhoto = (index) => {
        const fileInput = fileInputRefs.current[index];
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedHistorial = [...historial];
                updatedHistorial[index].foto = reader.result;
                setHistorial(updatedHistorial);
            };
            reader.readAsDataURL(file);
        } else {
            console.error("No se ha seleccionado ningún archivo.");
        }
    };

    const [formData, setFormData] = useState({
        nombre: '',
        relacion: '',
        nacionalidad: '',
        provincia: '',
        ciudad: '',
        domicilio: '',
        dni: '',
        fechaNacimiento: '',
        fechaFallecimiento: '',
        observacion: '',
        foto: null,
        otraRelacion: ''
    });

    const [errors, setErrors] = useState({});

    const handleGuardarObservacion = (index) => {
        const nuevoHistorial = [...historial];
        const editDate = new Date().toLocaleString();

        if (newObservacion !== historial[index].observacion) {
            nuevoHistorial[index].observacion = newObservacion;

            if (!nuevoHistorial[index].observacionCarga) {
                nuevoHistorial[index].observacionCarga = new Date().toLocaleString();
            }

            nuevoHistorial[index].ultimaModificacionObservacion = editDate;

            setHistorial(nuevoHistorial);
            setIsEditingObservacion(null);
        } else {
            setIsEditingObservacion(null);
            console.log("No hay cambios en la observación.");
        }
    };

    const handleGuardarCambios = () => {
        const newErrors = {};

        if (!formData.nombre) newErrors.nombre = 'Este campo es obligatorio.';
        if (!formData.relacion) newErrors.relacion = 'Este campo es obligatorio.';
        if (!formData.domicilio) newErrors.domicilio = 'Este campo es obligatorio.';
        if (!formData.dni) newErrors.dni = 'Este campo es obligatorio.';
        if (!formData.fechaNacimiento) newErrors.fechaNacimiento = 'Este campo es obligatorio.';
        if (!formData.nacionalidad) newErrors.nacionalidad = 'Este campo es obligatorio.';

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const fechaCarga = new Date().toLocaleString();
            const nuevaRelacion = formData.relacion === "Otro" ? formData.otraRelacion : formData.relacion;

            setHistorial([
                ...historial,
                {
                    nombre: formData.nombre,
                    relacion: nuevaRelacion,
                    domicilio: formData.domicilio,
                    dni: formData.dni,
                    ciudad: formData.ciudad,
                    nacionalidad: formData.nacionalidad,
                    provincia: formData.provincia,
                    fechaNacimiento: formData.fechaNacimiento,
                    fechaFallecimiento: formData.fechaFallecimiento || '',
                    observacion: formData.observacion || '',
                    foto: formData.foto,
                    fechaCarga: fechaCarga,
                    ultimaModificacionObservacion: null,
                    observacionCarga: formData.observacion ? fechaCarga : null,
                }
            ]);

            setFormData({
                nombre: '',
                relacion: '',
                domicilio: '',
                dni: '',
                nacionalidad: '',
                provincia: '',
                ciudad: '',
                fechaNacimiento: '',
                fechaFallecimiento: '',
                observacion: '',
                foto: null,
                otraRelacion: ''
            });
        }
    };

    const fileInputRefs = useRef({});

    const [showModal, setShowModal] = useState(false);

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-6 rounded-md shadow-md">
                <h1 className="text-xl font-bold mb-4">Grupo Familiar</h1>
                <div className="space-y-4 bg-white p-4 rounded-md shadow-md border border-gray-300">
                    {/* Sección de Foto de Grupo Familiar */}
                    <div className="flex flex-col items-center mb-4">
                        <div className="relative flex justify-center items-center">
                            <div className="relative w-32 h-32 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                                {formData.foto ? (
                                    <img src={formData.foto} alt="Foto Grupo Familiar" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-white">Foto</span>
                                )}
                            </div>

                            <button
                                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                onClick={() => photoInputRef.current.click()}
                            >
                                +
                            </button>

                            <input
                                type="file"
                                ref={photoInputRef}
                                accept="image/*"
                                onChange={handlePhotoChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Resto del formulario */}
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="nombre" className="block text-sm font-semibold mb-1">Nombre/s y Apellido/s</label>
                            <input
                                placeholder='Ingresar nombre y apellido'
                                type="text"
                                id="nombre"
                                value={formData.nombre}
                                onChange={(e) => handleInputChange(e, 'nombre')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="dni" className="block text-sm font-semibold mb-1">DNI/M.I</label>
                            <input
                                placeholder='Ingresar DNI/M.I'
                                type="number"
                                id="dni"
                                value={formData.dni}
                                onChange={(e) => handleInputChange(e, 'dni')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.dni ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.dni && <p className="text-red-500 text-sm mt-1">{errors.dni}</p>}
                        </div>

                        <div className="flex-grow">
                            <label htmlFor="relacion" className="block text-sm font-semibold mb-1">Relación con el interno</label>
                            <select
                                id="relacion"
                                value={formData.relacion}
                                onChange={(e) => handleInputChange(e, 'relacion')}
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
                            {formData.relacion === "Otro" && (
                                <div className="flex-grow mt-4">
                                    <label htmlFor="otraRelacion" className="block text-sm font-semibold mb-1">Especifique la relación</label>
                                    <input
                                        placeholder="Especificar otra relación"
                                        type="text"
                                        id="otraRelacion"
                                        value={formData.otraRelacion}
                                        onChange={(e) => handleInputChange(e, 'otraRelacion')}
                                        className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.otraRelacion ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                    {errors.otraRelacion && <p className="text-red-500 text-sm mt-1">{errors.otraRelacion}</p>}
                                </div>
                            )}
                        </div>

                        <div className="flex-grow">
                            <label htmlFor="domicilio" className="block text-sm font-semibold mb-1">Domicilio</label>
                            <input
                                placeholder='Ingresar domicilio'
                                type="text"
                                id="domicilio"
                                value={formData.domicilio}
                                onChange={(e) => handleInputChange(e, 'domicilio')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.domicilio ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.domicilio && <p className="text-red-500 text-sm mt-1">{errors.domicilio}</p>}
                        </div>

                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="nacionalidad" className="block text-sm font-semibold mb-1">Nacionalidad</label>
                            <select
                                id="nacionalidad"
                                value={formData.nacionalidad}
                                onChange={(e) => handleInputChange(e, 'nacionalidad')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.nacionalidad ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="" disabled>Seleccionar Nacionalidad</option>
                                <option value="Argentino">Argentino</option>
                                <option value="Brasileño">Brasileño</option>
                                <option value="Chileno">Chileno</option>
                                <option value="Colombiano">Colombiano</option>
                                <option value="Mexicano">Mexicano</option>
                                <option value="Peruano">Peruano</option>
                                <option value="Venezolano">Venezolano</option>
                                <option value="Ecuatoriano">Ecuatoriano</option>
                                <option value="Boliviano">Boliviano</option>
                                <option value="Paraguayo">Paraguayo</option>
                                <option value="Uruguayo">Uruguayo</option>
                                <option value="Hondureño">Hondureño</option>
                                <option value="Nicaragüense">Nicaragüense</option>
                                <option value="Guatemalteco">Guatemalteco</option>
                                <option value="Costarricense">Costarricense</option>
                                <option value="Salvadoreño">Salvadoreño</option>
                                <option value="Panameño">Panameño</option>
                                <option value="Cubano">Cubano</option>
                                <option value="Dominicano">Dominicano</option>
                                <option value="Puertorriqueño">Puertorriqueño</option>
                                <option value="Beliceño">Beliceño</option>
                                <option value="Jamaicano">Jamaicano</option>
                            </select>
                            {errors.nacionalidad && <p className="text-red-500 text-sm mt-1">{errors.nacionalidad}</p>}
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="provincia" className="block text-sm font-semibold mb-1">Provincia</label>
                            <input
                                placeholder='Ingresar provincia'
                                type="text"
                                id="provincia"
                                value={formData.provincia}
                                onChange={(e) => handleInputChange(e, 'provincia')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.provincia ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.provincia && <p className="text-red-500 text-sm mt-1">{errors.provincia}</p>}
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="ciudad" className="block text-sm font-semibold mb-1">Ciudad</label>
                            <input
                                placeholder='Ingresar ciudad'
                                type="text"
                                id="ciudad"
                                value={formData.ciudad}
                                onChange={(e) => handleInputChange(e, 'ciudad')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.ciudad ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.ciudad && <p className="text-red-500 text-sm mt-1">{errors.ciudad}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-grow">
                            <label htmlFor="fechaNacimiento" className="block text-sm font-semibold mb-1">Fecha de nacimiento</label>
                            <input
                                type="date"
                                id="fechaNacimiento"
                                value={formData.fechaNacimiento}
                                onChange={(e) => handleInputChange(e, 'fechaNacimiento')}
                                className={`w-full p-2 border border-gray-300 rounded text-sm ${errors.fechaNacimiento ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.fechaNacimiento && <p className="text-red-500 text-sm mt-1">{errors.fechaNacimiento}</p>}
                        </div>
                        <div className="flex-grow">
                            <label htmlFor="fechaFallecimiento" className="block text-sm font-semibold mb-1">Fecha de fallecimiento</label>
                            <input
                                type="date"
                                id="fechaFallecimiento"
                                value={formData.fechaFallecimiento}
                                onChange={(e) => handleInputChange(e, 'fechaFallecimiento')}
                                className="w-full p-2 border border-gray-300 rounded text-sm"
                            />
                        </div>
                    </div>
                    <div className="w-full">
                        <label htmlFor="observacion" className="block text-sm font-semibold mb-1">Observación</label>
                        <textarea
                            placeholder='Ingresar observación'
                            id="observacion"
                            rows="4"
                            value={formData.observacion}
                            onChange={(e) => handleInputChange(e, 'observacion')}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div className="flex justify-center mt-4">
                        <button
                            onClick={handleGuardarCambios}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-600 text-xs"
                        >
                            Cargar
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-5">
                    <h3 className="text-sm font-bold">Historial de Carga</h3>
                    <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-96 overflow-y-auto sm:max-h-80 md:max-h-96 lg:max-h-[24rem]">
                        {historial.length > 0 ? (
                            <ul className="mt-2">
                                {historial.map((item, index) => {
                                    if (!fileInputRefs.current[index]) {
                                        fileInputRefs.current[index] = React.createRef();
                                    }

                                    const inputRef = fileInputRefs.current[index];

                                    return (
                                        <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                            <p className='text-sm max-w-full break-words'><strong>Nombre/s y Apellido/s:</strong> {item.nombre}</p>
                                            <p className='text-sm max-w-full break-words mt-2'><strong>DNI/M.I:</strong> {item.dni}</p>
                                            <p className='text-sm max-w-full break-words mt-2'><strong>Nacionalidad: </strong> {item.nacionalidad}</p>
                                            {/* Relación */}
                                            <div className="mt-2">

                                                {isEditingRelacion === 0 ? (

                                                    <>
                                                        <select
                                                            id="relacion"
                                                            value={newRelacion}
                                                            onChange={(e) => setNewRelacion(e.target.value)}
                                                            className={`p-1 border border-gray-300 rounded text-sm flex-1 max-w-full ${newRelacion.trim() === "" ? 'border-red-500' : 'border-gray-300'}`}
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

                                                        {/* Campo de texto si "Otro" está seleccionado */}
                                                        {newRelacion === "Otro" && (
                                                            <div className="mt-4">
                                                                <input
                                                                    placeholder="Especificar otra relación"
                                                                    type="text"
                                                                    value={otraRelacion}
                                                                    onChange={(e) => setOtraRelacion(e.target.value)}
                                                                    className={`p-1 border border-gray-300 rounded text-sm w-full ${otraRelacion.trim() === "" ? 'border-red-500' : 'border-gray-300'}`}
                                                                />
                                                            </div>
                                                        )}

                                                        {/* Botón "Guardar" solo habilitado si hay un cambio y no está vacío */}
                                                        <button
                                                            onClick={() => handleGuardarRelacion(0)}
                                                            disabled={newRelacion.trim() === "" || newRelacion === historial[0].relacion}
                                                            className={`bg-green-400 text-white p-1 rounded hover:bg-green-500 text-xs ml-2 ${newRelacion.trim() === "" || newRelacion === historial[0].relacion ? 'bg-gray-400 cursor-not-allowed opacity-50' : ''}`}
                                                        >
                                                            Guardar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Modo de visualización cuando no está editando */}
                                                        <p className='text-sm flex-1 max-w-full break-words'>
                                                            <strong>Relación con el interno:</strong> {historial[0].relacion === "Otro" ? historial[0].otraRelacion : historial[0].relacion}
                                                        </p>
                                                        <button
                                                            onClick={() => handleEditarRelacion(0)}
                                                            className="bg-orange-400 text-white p-1 rounded hover:bg-orange-500 text-xs mt-1"
                                                        >
                                                            Editar Relación
                                                        </button>
                                                    </>
                                                )}

                                            </div>

                                            {historial[0].ultimaModificacionRelacion && (
                                                <p className="text-sm text-gray-500 mt-2">
                                                    <strong>Última modificación de la relación:</strong> {historial[0].ultimaModificacionRelacion}
                                                </p>
                                            )}
                                            {/* Ciudad */}
                                            <div className="mt-2">
                                                {isEditingCiudad === index ? (
                                                    <>
                                                        {/* Campo de entrada para Ciudad */}
                                                        <input
                                                            type="text"
                                                            value={newCiudad}
                                                            onChange={(e) => setNewCiudad(e.target.value)}
                                                            className="p-1 border border-gray-300 rounded text-sm flex-1 max-w-full"
                                                        />

                                                        {/* Botón "Guardar" solo habilitado si hay un cambio y no está vacío */}
                                                        <button
                                                            onClick={() => handleGuardarCiudad(index)}
                                                            disabled={newCiudad.trim() === "" || newCiudad === historial[index].ciudad}
                                                            className={`bg-green-400 text-white p-1 rounded hover:bg-green-500 text-xs ml-2 ${newCiudad.trim() === "" || newCiudad === historial[index].ciudad ? 'bg-green-400 cursor-not-allowed opacity-50' : ''}`}
                                                        >
                                                            Guardar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Modo de visualización cuando no está editando */}
                                                        <p className='text-sm max-w-full break-words'>
                                                            <strong>Ciudad:</strong> {item.ciudad || "No asignada"}
                                                        </p>
                                                        <button
                                                            onClick={() => handleEditarCiudad(index)}
                                                            className={`p-1 rounded text-xs mt-1 ${item.ciudad ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-400 hover:bg-blue-500'} text-white`}
                                                        >
                                                            {item.ciudad ? "Editar Ciudad" : "Añadir Ciudad"}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            {/* Mostrar la fecha de última edición siempre */}
                                            {item.ultimaModificacionCiudad && (
                                                <p className="text-sm text-gray-500 mt-2">
                                                    <strong>Última modificación ciudad:</strong> {item.ultimaModificacionCiudad}
                                                </p>
                                            )}
                                            {/* Provincia */}
                                            <div className="mt-2">
                                                {isEditingProvincia === index ? (
                                                    <>
                                                        {/* Campo de entrada para Provincia */}
                                                        <input
                                                            type="text"
                                                            value={newProvincia}
                                                            onChange={(e) => setNewProvincia(e.target.value)}
                                                            className="p-1 border border-gray-300 rounded text-sm flex-1 max-w-full"
                                                        />

                                                        {/* Botón "Guardar" solo habilitado si hay un cambio y no está vacío */}
                                                        <button
                                                            onClick={() => handleGuardarProvincia(index)}
                                                            disabled={newProvincia.trim() === "" || newProvincia === historial[index].provincia}
                                                            className={`bg-green-400 text-white p-1 rounded hover:bg-green-500 text-xs ml-2 ${newProvincia.trim() === "" || newProvincia === historial[index].provincia ? 'bg-green-400 cursor-not-allowed opacity-50' : ''}`}
                                                        >
                                                            Guardar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Modo de visualización cuando no está editando */}
                                                        <p className='text-sm max-w-full break-words'>
                                                            <strong>Provincia:</strong> {item.provincia || "No asignada"}
                                                        </p>
                                                        <button
                                                            onClick={() => handleEditarProvincia(index)}
                                                            className={`p-1 rounded text-xs mt-1 ${item.provincia ? 'bg-orange-400 hover:bg-orange-500' : 'bg-blue-400 hover:bg-blue-500'} text-white`}
                                                        >
                                                            {item.provincia ? "Editar Provincia" : "Añadir Provincia"}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            {/* Mostrar la fecha de última edición siempre */}
                                            {item.ultimaModificacionProvincia && (
                                                <p className="text-sm text-gray-500 mt-2">
                                                    <strong>Última modificación provincia:</strong> {item.ultimaModificacionProvincia}
                                                </p>
                                            )}

                                            {/* Domicilio */}
                                            <div className="mt-2">
                                                {isEditingDomicilio === index ? (
                                                    <>
                                                        {/* Campo de entrada para Domicilio */}
                                                        <input
                                                            type="text"
                                                            value={newDomicilio}
                                                            onChange={(e) => setNewDomicilio(e.target.value)}
                                                            className="p-1 border border-gray-300 rounded text-sm flex-1 max-w-full"
                                                        />

                                                        {/* Botón "Guardar" solo habilitado si hay un cambio y no está vacío */}
                                                        <button
                                                            onClick={() => handleGuardarDomicilio(index)}
                                                            disabled={newDomicilio.trim() === "" || newDomicilio === historial[index].domicilio}
                                                            className={`bg-green-400 text-white p-1 rounded hover:bg-green-500 text-xs ml-2 ${newDomicilio.trim() === "" || newDomicilio === historial[index].domicilio ? 'bg-green-400 cursor-not-allowed opacity-50' : ''}`}

                                                        >
                                                            Guardar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {/* Modo de visualización cuando no está editando */}
                                                        <p className='text-sm max-w-full break-words'>
                                                            <strong>Domicilio:</strong> {item.domicilio}
                                                        </p>
                                                        <button
                                                            onClick={() => handleEditarDomicilio(index)}
                                                            className="bg-orange-400 text-white p-1 rounded hover:bg-orange-500 text-xs mt-1"
                                                        >
                                                            Editar Domicilio
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                            {/* Mostrar la fecha de última edición siempre */}
                                            {item.ultimaModificacionDomicilio && (
                                                <p className="text-sm text-gray-500 mt-2">
                                                    <strong>Última modificación domicilio:</strong> {item.ultimaModificacionDomicilio}
                                                </p>
                                            )}

                                            <p className='text-sm max-w-full break-words mt-2'>
                                                <strong>Fecha de nacimiento: </strong>
                                                {new Date(item.fechaNacimiento).toLocaleDateString('es-ES', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}
                                            </p>


                                            <div className="mt-2">
                                                {isEditingObservacion === index ? (
                                                    <>
                                                        <p className='text-sm'><strong>Observación: </strong></p>
                                                        <textarea
                                                            value={newObservacion}
                                                            onChange={(e) => {
                                                                setNewObservacion(e.target.value);
                                                                setIsObservacionModified(e.target.value !== historial[index].observacion);
                                                            }}
                                                            className="p-2 border border-gray-300 rounded text-sm ml-2 w-full resize-both max-w-full min-h-[100px]"
                                                            rows="4"
                                                            style={{ resize: 'both' }}
                                                        />


                                                        <button
                                                            onClick={() => handleGuardarObservacion(index)}
                                                            className={`bg-green-400 text-white p-1 rounded hover:bg-green-500 text-xs ml-2 ${!isObservacionModified ? 'opacity-50 cursor-not-allowed' : ''}`}
                                                            disabled={!isObservacionModified}                                                         >
                                                            Guardar
                                                        </button>
                                                    </>
                                                ) : (
                                                    <>
                                                        {item.observacion ? (
                                                            <>
                                                                <p className='text-sm flex-1 max-w-full break-words'>
                                                                    <strong>Observación:</strong> {item.observacion}
                                                                </p>

                                                                <button
                                                                    onClick={() => handleEditarObservacion(index)}
                                                                    className="bg-orange-400 text-white p-1 rounded hover:bg-orange-500 text-xs mt-1"
                                                                >
                                                                    Editar Observación
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleEditarObservacion(index)}
                                                                className="bg-blue-400 text-white p-1 rounded hover:bg-blue-500 text-xs mt-1"
                                                            >
                                                                Agregar Observación
                                                            </button>
                                                        )}
                                                    </>

                                                )}
                                            </div>
                                            {item.observacion && item.observacionCarga && (
                                                <p className="text-sm text-gray-500 mt-2">
                                                    <strong>Fecha de carga observación:</strong> {item.observacionCarga}
                                                    {/* Verificar si hay una última modificación diferente a la fecha de carga */}
                                                    {item.ultimaModificacionObservacion && item.ultimaModificacionObservacion !== item.observacionCarga && (
                                                        <span className="ml-2">
                                                            <strong>Última modificación observación:</strong> {item.ultimaModificacionObservacion}
                                                        </span>
                                                    )}
                                                </p>
                                            )}

                                            {item.fechaFallecimiento ? (
                                                <p className='text-sm mt-2'>
                                                    <strong>Fecha de fallecimiento: </strong>
                                                    {item.fechaFallecimiento ? new Date(item.fechaFallecimiento).toLocaleDateString('es-ES', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                    }) : 'No disponible'}
                                                </p>

                                            ) : (
                                                <div className="flex items-center mt-2">
                                                    {isEditingFallecimiento === index ? (
                                                        <input
                                                            type="date"
                                                            value={newFechaFallecimiento}
                                                            onChange={(e) => setNewFechaFallecimiento(e.target.value)}
                                                            className="p-1 border border-gray-300 rounded text-sm"
                                                        />
                                                    ) : (
                                                        <button
                                                            onClick={() => handleEditarFechaFallecimiento(index)}
                                                            className="bg-blue-400 text-white p-1 rounded hover:bg-blue-500 text-xs"
                                                        >
                                                            Agregar Fecha de Fallecimiento
                                                        </button>
                                                    )}
                                                    {isEditingFallecimiento === index && (
                                                        <button
                                                            onClick={() => handleGuardarFechaFallecimiento(index)}
                                                            className="bg-blue-400 text-white p-1 rounded hover:bg-blue-500 text-xs ml-2"
                                                        >
                                                            Guardar
                                                        </button>
                                                    )}
                                                </div>
                                            )}

                                            {item.fechaFallecimiento && item.fechaFallecimientoCarga && (
                                                <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga (Fallecimiento):</strong> {item.fechaFallecimientoCarga}</p>
                                            )}

                                            {/* Sección de la foto */}
                                            <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-center">
                                                {item.foto ? (
                                                    <div className="w-16 h-16 bg-gray-500 rounded-full overflow-hidden">
                                                        <img src={item.foto} alt="Foto Grupo Familiar" className="w-full h-full object-cover" />
                                                    </div>
                                                ) : (
                                                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                                                        <span className="text-white">Sin Foto</span>
                                                    </div>
                                                )}

                                                <button
                                                    className="mt-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500"
                                                    onClick={() => item.foto ? handleViewPhoto(item.foto) : fileInputRefs.current[index]?.click()}
                                                >
                                                    {item.foto ? 'Ver Foto' : 'Subir Foto'}
                                                </button>

                                                {item.foto && (
                                                    <button
                                                        className="mt-2 bg-orange-400 text-white p-2 rounded-full text-xs hover:bg-orange-500"
                                                        onClick={() => fileInputRefs.current[index]?.click()}
                                                    >
                                                        Editar Foto
                                                    </button>
                                                )}

                                                <input
                                                    type="file"
                                                    ref={(element) => setFileInputRef(element, index)}
                                                    accept="image/*"
                                                    onChange={() => handleUploadPhoto(index)}
                                                    className="hidden"
                                                />
                                            </div>
                                            <div>
                                                <p className="text-sm max-w-full break-words text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500 text-center">
                                No hay registros de grupo familiar aún.
                            </p>
                        )}
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
                            <img src={selectedPhoto} alt="Foto Grande" className="w-full h-auto object-contain" />
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
        </div >
    );
};

export default CargaGrupoFamiliar;
