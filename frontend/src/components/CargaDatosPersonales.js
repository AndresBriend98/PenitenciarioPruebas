import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Modal from './ModalChanges';

const CargaDatosPersonales = () => {
    const [historialCambios, setHistorialCambios] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const navigate = useNavigate();
    // Declaración de estados
    const [datosPersonales, setDatosPersonales] = useState({
        telefono: '',
        fechaNacimiento: '',
        edad: '',
        nacionalidad: '',
        provincia: '',
        lugarNacimiento: '',
        estadoCivil: '',
        domicilioActual: '',
        domicilioAnterior: '',
        religion: '',
        profesion: '',
        ocupacion: '',
        fechaFallecimiento: '',
        antecedenteLaboral: '',
        observacion: '',
        peculio: '',
        lugaresTrabajosYDirecciones: '',
        ultimaModificacion: ''
    });

    const campoMapeadoDatosPersonales = {
        telefono: "Teléfono",
        fechaNacimiento: "Fecha de nacimiento",
        edad: "Edad",
        nacionalidad: "Nacionalidad",
        provincia: "Provincia",
        lugarNacimiento: "Lugar de nacimiento",
        estadoCivil: "Estado civil",
        domicilioActual: "Domicilio actual",
        domicilioAnterior: "Domicilio anterior",
        religion: "Religión",
        profesion: "Profesión",
        ocupacion: "Ocupación",
        fechaFallecimiento: "Fecha de fallecimiento",
        antecedenteLaboral: "Antecedente laboral",
        observacion: "Observación",
        peculio: "Peculio",
        lugaresTrabajosYDirecciones: "Lugares de trabajo y direcciones"
    };

    // Guardamos el valor inicial al cargar los datos
    const [initialDatosPersonales, setInitialDatosPersonales] = useState({
        telefono: '',
        fechaNacimiento: '',
        edad: '',
        nacionalidad: '',
        provincia: '',
        lugarNacimiento: '',
        estadoCivil: '',
        domicilioActual: '',
        domicilioAnterior: '',
        religion: '',
        profesion: '',
        ocupacion: '',
        fechaFallecimiento: '',
        antecedenteLaboral: '',
        observacion: '',
        peculio: '',
        lugaresTrabajosYDirecciones: '',
    });

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        const currentDate = new Date().toLocaleString();

        // Verifica si el campo cambió
        if (value !== initialDatosPersonales[field]) {
            setIsDataModified(true); // Marca como modificado
            setHistorialCambios(prev => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    // Si no tiene fecha de carga, se agrega la fecha de carga
                    fechaCarga: prev[field]?.fechaCarga || currentDate,
                    ultimaModificacion: currentDate, // Siempre actualiza la fecha de modificación
                }
            }));
        } else {
            setIsDataModified(false); // Si el valor no cambió, desmarca como modificado
        }

        setDatosPersonales({ ...datosPersonales, [field]: value });
    };
    
    const [isEditable, setIsEditable] = useState(true); // Los campos inician habilitados
    const [buttonText, setButtonText] = useState('Cargar'); // Inicia con "Cargar"
    const [isDataModified, setIsDataModified] = useState(false); // Controla si los datos fueron modificado
    const handleCargarActualizar = () => {
        const currentDate = new Date().toLocaleString();

        if (buttonText === 'Cargar') {
            const isAnyFieldFilled = Object.values(datosPersonales).some(value => value.trim() !== '');
            if (!isAnyFieldFilled) return; // No hacer nada si ningún campo está lleno

            // Guardamos los datos iniciales (fechas de carga y modificación)
            setInitialDatosPersonales(datosPersonales);

            // Actualizar historial con fecha de carga
            setHistorialCambios(prev => {
                const newHistorial = {};
                Object.keys(datosPersonales).forEach(field => {
                    if (datosPersonales[field].trim() !== '') {
                        newHistorial[field] = {
                            fechaCarga: currentDate, // Establece la fecha de carga
                            ultimaModificacion: currentDate, // Establece la fecha de modificación
                        };
                    }
                });
                return { ...prev, ...newHistorial };
            });

            setIsEditable(false); // No se puede editar después de cargar
            setButtonText('Actualizar'); // Cambia el botón a 'Actualizar'

        } else if (buttonText === 'Actualizar') {
            setIsEditable(true); // Permite la edición
            setButtonText('Guardar Cambios'); // Cambia el texto del botón
            setIsDataModified(false); // Resetear el estado de modificación

        } else if (buttonText === 'Guardar Cambios') {
            // Verifica si realmente hay cambios antes de guardarlos
            const hasChanges = Object.keys(datosPersonales).some(key => datosPersonales[key] !== initialDatosPersonales[key]);
            if (!hasChanges) return; // No hace nada si no hay cambios

            console.log('Datos guardados');
            setIsEditable(false); // Deshabilitar la edición
            setButtonText('Actualizar'); // Cambia el texto del botón
            setIsDataModified(false); // Resetear el estado de modificación
        }
    };

    const nacionalidades = [
        'Argentina',
        'Bolivia',
        'Brasil',
        'Chile',
        'Colombia',
        'Ecuador',
        'Paraguay',
        'Perú',
        'Uruguay',
        'Venezuela',
        'México',
        'Estados Unidos',
        'Canadá',
        'España',
        'Francia',
        'Italia',
        'Alemania',
        'Reino Unido',
        'Australia',
        'China',
        'Japón',
        'India'
    ];

    // Lista de estados civiles
    const estadosCiviles = [
        'Soltero/a',
        'Casado/a',
        'Divorciado/a',
        'Viudo/a',
        'Separado/a'
    ];

    // Lista de provincias
    const provincias = [
        'Buenos Aires',
        'Catamarca',
        'Chaco',
        'Chubut',
        'CABA', // Ciudad Autónoma de Buenos Aires
        'Córdoba',
        'Corrientes',
        'Entre Ríos',
        'Formosa',
        'Jujuy',
        'La Pampa',
        'La Rioja',
        'Mendoza',
        'Misiones',
        'Neuquén',
        'Río Negro',
        'Salta',
        'San Juan',
        'San Luis',
        'Santa Cruz',
        'Santa Fe',
        'Santiago del Estero',
        'Tierra del Fuego',
        'Tucumán'
    ];

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-xl font-bold mb-6">Carga de Datos Personales</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-white p-4 rounded-md shadow-md border border-gray-300">
                    {/* Fecha de nacimiento */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Fecha de nacimiento</label>
                        <input
                            type="date"
                            value={datosPersonales.fechaNacimiento}
                            onChange={(e) => handleInputChange(e, 'fechaNacimiento')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Edad */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Edad</label>
                        <input
                            type="number"
                            placeholder="Ingrese su edad"
                            value={datosPersonales.edad}
                            onChange={(e) => handleInputChange(e, 'edad')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Nacionalidad */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Nacionalidad</label>
                        <select
                            value={datosPersonales.nacionalidad}
                            onChange={(e) => handleInputChange(e, 'nacionalidad')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="" disabled>Selecciona una nacionalidad</option>
                            {nacionalidades.map((nac) => (
                                <option key={nac} value={nac}>{nac}</option>
                            ))}
                        </select>
                    </div>

                    {/* Provincia */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Provincia</label>
                        <select
                            value={datosPersonales.provincia}
                            onChange={(e) => handleInputChange(e, 'provincia')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="" disabled>Selecciona una provincia</option>
                            {provincias.map((prov) => (
                                <option key={prov} value={prov}>{prov}</option>
                            ))}
                        </select>
                    </div>

                    {/* Lugar de nacimiento */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Lugar de nacimiento / Pueblo / Dpto</label>
                        <input
                            type="text"
                            placeholder="Introduce el lugar de nacimiento"
                            value={datosPersonales.lugarNacimiento}
                            onChange={(e) => handleInputChange(e, 'lugarNacimiento')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Estado Civil */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Estado Civil</label>
                        <select
                            value={datosPersonales.estadoCivil}
                            onChange={(e) => handleInputChange(e, 'estadoCivil')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        >
                            <option value="" disabled>Selecciona un estado civil</option>
                            {estadosCiviles.map((estado) => (
                                <option key={estado} value={estado}>{estado}</option>
                            ))}
                        </select>
                    </div>

                    {/* Domicilio Actual */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Domicilio Actual</label>
                        <input
                            type="text"
                            placeholder="Introduce el domicilio actual"
                            value={datosPersonales.domicilioActual}
                            onChange={(e) => handleInputChange(e, 'domicilioActual')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Domicilio Anterior */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Domicilio Anterior</label>
                        <input
                            type="text"
                            placeholder="Introduce el domicilio anterior"
                            value={datosPersonales.domicilioAnterior}
                            onChange={(e) => handleInputChange(e, 'domicilioAnterior')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    {/* Teléfono */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Teléfono</label>
                        <input
                            placeholder="Ingrese su teléfono"
                            type="text"
                            value={datosPersonales.telefono}
                            onChange={(e) => handleInputChange(e, 'telefono')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>


                    {/* Religion */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Religión</label>
                        <input
                            placeholder="Ingrese la religión"
                            type="text"
                            value={datosPersonales.religion}
                            onChange={(e) => handleInputChange(e, 'religion')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Profesion */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Profesión</label>
                        <input
                            placeholder="Ingrese su profesión"
                            type="text"
                            value={datosPersonales.profesion}
                            onChange={(e) => handleInputChange(e, 'profesion')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>

                    {/* Ocupación*/}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Ocupación</label>
                        <input
                            placeholder="Ingrese su ocupación"
                            type="text"
                            value={datosPersonales.ocupacion}
                            onChange={(e) => handleInputChange(e, 'ocupacion')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    {/* Fecha de fallecimiento */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Fecha de fallecimiento</label>
                        <input
                            type="date"
                            value={datosPersonales.fechaFallecimiento}
                            onChange={(e) => handleInputChange(e, 'fechaFallecimiento')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    {/* Antecedente laboral*/}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Antecedente laboral</label>
                        <textarea
                            placeholder="Ingrese su antecedente laboral"
                            type="text"
                            value={datosPersonales.antecedenteLaboral}
                            onChange={(e) => handleInputChange(e, 'antecedenteLaboral')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    {/* Observación*/}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Observación</label>
                        <textarea
                            placeholder="Ingrese alguna observación"
                            type="text"
                            value={datosPersonales.observacion}
                            onChange={(e) => handleInputChange(e, 'observacion')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    {/* Peculio */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Peculio</label>
                        <textarea
                            placeholder="Ingrese un peculio"
                            type="text"
                            value={datosPersonales.peculio}
                            onChange={(e) => handleInputChange(e, 'peculio')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    {/* Lugares de trabajos y direcciones */}
                    <div>
                        <label className="block text-sm font-semibold mb-1">Lugares de trabajos y direcciones</label>
                        <textarea
                            placeholder="Ingrese los lugares de trabajos y direcciones"
                            type="text"
                            value={datosPersonales.lugaresTrabajosYDirecciones}
                            onChange={(e) => handleInputChange(e, 'lugaresTrabajosYDirecciones')}
                            disabled={!isEditable}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>
                <div className="flex justify-between mt-10">
                    <button
                        onClick={() => navigate('/general')}
                        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Menu Principal
                    </button>
                    <button
                        onClick={handleCargarActualizar}
                        className={`text-white px-4 py-2 rounded-md text-xs ${buttonText === 'Guardar Cambios' && !isDataModified
                            ? 'bg-blue-300 cursor-not-allowed' // Deshabilitado si no hay cambios
                            : 'bg-blue-500' // Habilitado si hay cambios
                            }`}
                        disabled={buttonText === 'Guardar Cambios' && !isDataModified || buttonText === 'Cargar' && !Object.values(datosPersonales).some(value => value.trim() !== '')}
                    >
                        {buttonText}
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-800 text-white p-2 rounded hover:bg-blue-900 text-xs"
                    >
                        Ver Historial de Cambios
                    </button>

                    <Modal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        historialCambios={historialCambios}
                        campoMapeado={campoMapeadoDatosPersonales}
                    />

                </div>

            </div>
        </div>
    );

};

export default CargaDatosPersonales;