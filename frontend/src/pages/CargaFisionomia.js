import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Modal from '../components/ModalChanges';

const CargaFisionomia = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
    const campoMapeadoFisionomia = {
        estatura: 'Estatura',
        cuerpo: 'Cuerpo',
        cabello: 'Cabello',
        frente: 'Frente',
        cejas: 'Cejas',
        parpados: 'Párpados',
        ojos: 'Ojos',
        orejas: 'Orejas',
        tatuajes: 'Tatuajes',
        bigotes: 'Bigotes',
        cutis: 'Cutis',
        barba: 'Barba',
        labios: 'Labios',
        boca: 'Boca',
        lobulos: 'Lóbulos',
        menton: 'Mentón',
        narizDorso: 'Nariz Dorso',
        narizBase: 'Nariz Base',
        imagen: 'Tatuajes/Marcas Distintivas'
    };

    const [datosFisionomicos, setDatosFisionomicos] = useState({
        estatura: '',
        cuerpo: '',
        cabello: '',
        frente: '',
        cejas: '',
        parpados: '',
        ojos: '',
        orejas: '',
        tatuajes: '',
        bigotes: '',
        cutis: '',
        barba: '',
        labios: '',
        boca: '',
        lobulos: '',
        menton: '',
        narizDorso: '',
        narizBase: '',
        imagen: null,
        ultimaModificacion: ''
    });

    const [initialDatosFisionomicos, setInitialDatosFisionomicos] = useState({
        estatura: '',
        cuerpo: '',
        cabello: '',
        frente: '',
        cejas: '',
        parpados: '',
        ojos: '',
        orejas: '',
        tatuajes: '',
        bigotes: '',
        cutis: '',
        barba: '',
        labios: '',
        boca: '',
        lobulos: '',
        menton: '',
        narizDorso: '',
        narizBase: '',
        imagen: null,
    });

    const handleInputChange = (e, field) => {
        const currentDate = new Date().toLocaleString();

        if (field === 'imagen') {
            const file = e.target.files[0];
            if (file) {
                const imageUrl = URL.createObjectURL(file);

                setDatosFisionomicos(prevState => ({
                    ...prevState,
                    imagen: imageUrl,
                    imagenNombre: file.name
                }));

                setHistorialCambios(prev => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        fechaCarga: prev[field]?.fechaCarga || currentDate,
                        ultimaModificacion: currentDate,
                        imagenUrl: imageUrl,
                        imagenNombre: file.name
                    }
                }));

                setIsDataModified(true);
            }
        } else {
            const value = e.target.value;

            if (value !== initialDatosFisionomicos[field]) {
                setIsDataModified(true);
                setHistorialCambios(prev => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        fechaCarga: prev[field]?.fechaCarga || currentDate,
                        ultimaModificacion: currentDate,
                    }
                }));
            } else {
                setIsDataModified(false);
            }

            setDatosFisionomicos(prevState => ({ ...prevState, [field]: value }));
        }
    };

    const handleCargarActualizar = () => {
        const currentDate = new Date().toLocaleString();

        if (buttonText === 'Cargar') {
            const isAnyFieldFilled = Object.values(datosFisionomicos).some(value => value.trim() !== '');
            if (!isAnyFieldFilled) return;

            setInitialDatosFisionomicos(datosFisionomicos);

            setHistorialCambios(prev => {
                const newHistorial = {};
                Object.keys(datosFisionomicos).forEach(field => {
                    if (datosFisionomicos[field] && datosFisionomicos[field] !== '') {
                        newHistorial[field] = {
                            fechaCarga: currentDate,
                            ultimaModificacion: currentDate,
                            imagenUrl: field === 'imagen' ? datosFisionomicos['imagen'] : null,
                            imagenNombre: field === 'imagen' ? datosFisionomicos['imagenNombre'] : null
                        };
                    }
                });
                return { ...prev, ...newHistorial };
            });

            setIsEditable(false); 
            setButtonText('Actualizar');

        } else if (buttonText === 'Actualizar') {
            setIsEditable(true); 
            setButtonText('Guardar Cambios');
            setIsDataModified(false);

        } else if (buttonText === 'Guardar Cambios') {

            const hasChanges = Object.keys(datosFisionomicos).some(key => datosFisionomicos[key] !== initialDatosFisionomicos[key]);
            if (!hasChanges) return;

            console.log('Datos guardados');
            setIsEditable(false);
            setButtonText('Actualizar'); 
            setIsDataModified(false); 
        }
    };

    const [isEditable, setIsEditable] = useState(true);
    const [buttonText, setButtonText] = useState('Cargar');
    const [isDataModified, setIsDataModified] = useState(false);
    const [historialCambios, setHistorialCambios] = useState({});
    const navigate = useNavigate();

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            {/* Formulario de Detalles */}
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-l font-bold mb-4">Carga de Fisionomia</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-white p-4 rounded-md shadow-md border border-gray-300">
                    {/* Estatura */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Estatura</label>
                        <input
                            type="text"
                            placeholder="Introduce la estatura"
                            value={datosFisionomicos.estatura}
                            onChange={(e) => handleInputChange(e, 'estatura')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Cuerpo */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Cuerpo</label>
                        <input
                            type="text"
                            placeholder="Describe el cuerpo"
                            value={datosFisionomicos.cuerpo}
                            onChange={(e) => handleInputChange(e, 'cuerpo')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Cabello */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Cabello</label>
                        <input
                            type="text"
                            placeholder="Describe el cabello"
                            value={datosFisionomicos.cabello}
                            onChange={(e) => handleInputChange(e, 'cabello')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Frente */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Frente</label>
                        <input
                            type="text"
                            placeholder="Describe la frente"
                            value={datosFisionomicos.frente}
                            onChange={(e) => handleInputChange(e, 'frente')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Cejas */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Cejas</label>
                        <input
                            type="text"
                            placeholder="Describe las cejas"
                            value={datosFisionomicos.cejas}
                            onChange={(e) => handleInputChange(e, 'cejas')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Párpados */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Párpados</label>
                        <input
                            type="text"
                            placeholder="Describe los párpados"
                            value={datosFisionomicos.parpados}
                            onChange={(e) => handleInputChange(e, 'parpados')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Ojos */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Ojos</label>
                        <input
                            type="text"
                            placeholder="Describe los ojos"
                            value={datosFisionomicos.ojos}
                            onChange={(e) => handleInputChange(e, 'ojos')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Orejas */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Orejas</label>
                        <input
                            type="text"
                            placeholder="Describe las orejas"
                            value={datosFisionomicos.orejas}
                            onChange={(e) => handleInputChange(e, 'orejas')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Tatuajes */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Tatuajes</label>
                        <input
                            type="text"
                            placeholder="Describe los tatuajes"
                            value={datosFisionomicos.tatuajes}
                            onChange={(e) => handleInputChange(e, 'tatuajes')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Bigotes */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Bigotes</label>
                        <input
                            type="text"
                            placeholder="Describe los bigotes"
                            value={datosFisionomicos.bigotes}
                            onChange={(e) => handleInputChange(e, 'bigotes')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Cutis */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Cutis</label>
                        <input
                            type="text"
                            placeholder="Describe el cutis"
                            value={datosFisionomicos.cutis}
                            onChange={(e) => handleInputChange(e, 'cutis')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Barba */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Barba</label>
                        <input
                            type="text"
                            placeholder="Describe la barba"
                            value={datosFisionomicos.barba}
                            onChange={(e) => handleInputChange(e, 'barba')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Labios */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Labios</label>
                        <input
                            type="text"
                            placeholder="Describe los labios"
                            value={datosFisionomicos.labios}
                            onChange={(e) => handleInputChange(e, 'labios')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Boca */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Boca</label>
                        <input
                            type="text"
                            placeholder="Describe la boca"
                            value={datosFisionomicos.boca}
                            onChange={(e) => handleInputChange(e, 'boca')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Lóbulos */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Lóbulos</label>
                        <input
                            type="text"
                            placeholder="Describe los lóbulos"
                            value={datosFisionomicos.lobulos}
                            onChange={(e) => handleInputChange(e, 'lobulos')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Mentón */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Mentón</label>
                        <input
                            type="text"
                            placeholder="Describe el mentón"
                            value={datosFisionomicos.menton}
                            onChange={(e) => handleInputChange(e, 'menton')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Nariz Dorso */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Nariz Dorso</label>
                        <input
                            type="text"
                            placeholder="Describe el dorso de la nariz"
                            value={datosFisionomicos.narizDorso}
                            onChange={(e) => handleInputChange(e, 'narizDorso')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>

                    {/* Nariz Base */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Nariz Base</label>
                        <input
                            type="text"
                            placeholder="Describe la base de la nariz"
                            value={datosFisionomicos.narizBase}
                            onChange={(e) => handleInputChange(e, 'narizBase')}
                            disabled={!isEditable}
                            className="border rounded p-2 w-full text-sm"
                        />
                    </div>
                    {/* Tatuajes/Marcas Distintivas */}
                    <div className='mt-2'>
                        <label className="block text-sm font-semibold mb-2">Tatuajes/Marcas Distintivas</label>
                        <input
                            type="file"
                            className="border rounded p-2 w-full text-sm"
                            onChange={(e) => handleInputChange(e, 'imagen')}
                            disabled={!isEditable}
                        />

                        {/* Mostrar el enlace para descargar el archivo subido */}
                        {datosFisionomicos.imagenNombre && (
                            <div className="mt-2">
                                <a
                                    href={datosFisionomicos.imagen}
                                    download={datosFisionomicos.imagenNombre}
                                    className="ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                >
                                    Descargar Tatuajes/Marcas Distintivas
                                </a>
                            </div>
                        )}
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
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-500'
                            }`}
                        disabled={
                            (buttonText === 'Guardar Cambios' && !isDataModified) || 
                            (buttonText === 'Cargar' &&
                                !Object.values(datosFisionomicos).some(value => {
                                    if (typeof value === 'string') {
                                        return value.trim() !== ''; 
                                    }
                                    if (datosFisionomicos.imagen) {
                                        return true; 
                                    }
                                    return false;
                                })
                            )
                        }
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
                        campoMapeado={campoMapeadoFisionomia}
                    />
                </div>
            </div>
        </div>
    );

};

export default CargaFisionomia;
