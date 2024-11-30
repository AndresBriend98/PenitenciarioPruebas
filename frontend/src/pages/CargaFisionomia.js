import React, { useState, } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Modal from '../components/ModalChanges';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const CargaFisionomia = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isImagenCargada, setIsImagenCargada] = useState(false);
    const handleDownloadZip = () => {
        const zip = new JSZip();

        datosFisionomicos.imagen.forEach(file => {
            zip.file(file.name, fetch(file.url).then(res => res.blob()));
        });

        zip.generateAsync({ type: 'blob' }).then(content => {
            saveAs(content, 'tatuajes-marcas-distintivas.zip');
        });
    };

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
        imagen: [],
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
        let value = e.target.value;
    
        if (field === 'imagen') {
            const files = Array.from(e.target.files);
            const fileUrls = files.map(file => ({
                name: file.name,
                url: URL.createObjectURL(file)
            }));
    
            setDatosFisionomicos(prevState => ({
                ...prevState,
                imagen: fileUrls
            }));
    
            setIsDataModified(true);
        } else {
            setDatosFisionomicos(prevState => {
                const updatedDatos = { ...prevState, [field]: value };
                setIsDataModified(
                    Object.keys(updatedDatos).some(key => updatedDatos[key] !== initialDatosFisionomicos[key])
                );
                return updatedDatos;
            });
        }
    };    

    const handleCargarActualizar = () => {
        const currentDate = new Date().toLocaleString();

        if (buttonText === 'Cargar') {
            const isAnyFieldFilled = Object.values(datosFisionomicos).some(value => {
                if (typeof value === 'string') {
                    return value.trim() !== '';
                }
                if (Array.isArray(value)) {
                    return value.length > 0;
                }
                return value !== null && value !== undefined;
            });

            if (!isAnyFieldFilled) return;

            if (datosFisionomicos.imagen && datosFisionomicos.imagen.length > 0) {
                setIsImagenCargada(true);
            }

            setInitialDatosFisionomicos(datosFisionomicos);

            setHistorialCambios(prev => {
                const newHistorial = {};
                Object.keys(datosFisionomicos).forEach(field => {
                    const fieldValue = datosFisionomicos[field];

                    if (fieldValue && (Array.isArray(fieldValue) ? fieldValue.length > 0 : fieldValue.trim() !== '')
                        && (fieldValue !== initialDatosFisionomicos[field])) {

                        newHistorial[field] = {
                            fechaCarga: currentDate,
                            ultimaModificacion: currentDate,
                            imagenUrl: field === 'imagen' ? fieldValue : null,
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
            const hasChanges = Object.keys(datosFisionomicos).some(key => {
                return datosFisionomicos[key] !== initialDatosFisionomicos[key];
            });

            if (!hasChanges) return;

            setIsEditable(false);
            setButtonText('Actualizar');
            setIsDataModified(false);

            setHistorialCambios(prev => {
                const updatedHistorial = {};
                Object.keys(datosFisionomicos).forEach(field => {
                    if (datosFisionomicos[field] !== initialDatosFisionomicos[field]) {
                        updatedHistorial[field] = {
                            fechaCarga: prev[field]?.fechaCarga || currentDate,
                            ultimaModificacion: currentDate,
                            imagenUrl: field === 'imagen' ? datosFisionomicos['imagen'] : null,
                            imagenNombre: field === 'imagen' ? datosFisionomicos['imagenNombre'] : null
                        };
                    }
                });
                return { ...prev, ...updatedHistorial };
            });

            setInitialDatosFisionomicos(datosFisionomicos);
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
                        <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                            {isEditable ? (
                                <input
                                    type="file"
                                    className="w-full text-sm text-gray-500"
                                    onChange={(e) => handleInputChange(e, 'imagen')}
                                    multiple
                                />
                            ) : (
                                <div className="flex items-center justify-between">
                                    <p className="text-gray-500 text-sm">
                                        {datosFisionomicos.imagen && datosFisionomicos.imagen.length > 0
                                            ? `${datosFisionomicos.imagen.length} archivo(s) cargado(s)`
                                            : 'Ningún archivo cargado'}
                                    </p>
                                    {datosFisionomicos.imagen && datosFisionomicos.imagen.length > 0 && (
                                        <button
                                            className="ml-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                            onClick={() => handleDownloadZip(datosFisionomicos.imagen)}
                                        >
                                            <i className="fas fa-download"></i>
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
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
                            : 'bg-blue-600'
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
