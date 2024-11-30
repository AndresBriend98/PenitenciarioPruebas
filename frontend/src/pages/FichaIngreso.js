import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Modal from '../components/ModalChanges';


const FichaIngreso = () => {
    const navigate = useNavigate();
    const [historialCambios, setHistorialCambios] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleDownload = (file) => {
        if (file) {
            const url = URL.createObjectURL(file);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.name; document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };

    const calcularCondenaRestante = (fechaCumpleCondena) => {
        const fechaActual = new Date();
        const fechaFinalCondena = new Date(fechaCumpleCondena);
    
        if (isNaN(fechaFinalCondena.getTime()) || isNaN(fechaActual.getTime())) {
            return 'No se puede calcular';
        }
    
        const diferenciaTiempo = fechaFinalCondena - fechaActual;
    
        if (diferenciaTiempo <= 0) return 'La condena ha finalizado';
    
        const añosRestantes = Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24 * 365));
        const mesesRestantes = Math.floor((diferenciaTiempo % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
        const díasRestantes = Math.floor((diferenciaTiempo % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    
        return `${añosRestantes} años, ${mesesRestantes} meses y ${díasRestantes} días`;
    };
    
    const [datosInterno, setDatosInterno] = useState({
        name: 'Maximiliano Ezequiel Dominguez',
        alias: 'JL',
        unit: 'Unidad Penitenciaria 9',
        fileNumber: '3576',
        typedoc: 'Cédula Ejemplar B',
        dni: '23123564',
        crime: 'Robo',
        typeofintern: 'Condenado',
        entryDate: '2026-06-01',
        sentenceEndDate: '2034-08-16',
        remainingSentence: '',
        numprontuario: '48765',
        reingresante: false,
        processed: true,
        placeOfEvent: 'Calle Falsa 123, Ciudad',
        detentionDate: '2024-08-15',
        intakeDate: '15/08/2023',
        sentence: '2 años de prisión',
        commutationDate: '2024-09-01',
        transitionalBenefitDate: '2025-01-01',
        conditionalLibertyDate: '2026-06-01',
        assistedDate: '2024-12-01',
        reportDate: '2024-08-31',
        policeSection: 'Sección 5',
        observation: '',
        firma: null,
        huellaDactilar: null,
        oficioEgreso: null,
        caratulaCausa: null,
    });

    useEffect(() => {
        const nuevaCondenaRestante = calcularCondenaRestante(datosInterno.sentenceEndDate);
        setDatosInterno((prevState) => ({
            ...prevState,
            remainingSentence: nuevaCondenaRestante,
        }));
    }, [datosInterno.sentenceEndDate]);

    const handleFileUpload = (e, field) => {
        const file = e.target.files[0];

        if (file) {
            setDatosInterno({
                ...datosInterno,
                [field]: file
            });

            const currentDate = new Date().toLocaleString();
            setHistorialCambios((prev) => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    fechaCarga: prev[field]?.fechaCarga || currentDate,
                    ultimaModificacion: currentDate,
                }
            }));
            setIsDataModified(true);
        }
    };

    const downloadFile = (file) => {
        const url = URL.createObjectURL(file);
        const a = document.createElement('a');
        a.href = url;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleInputChange = (e, field) => {
        const value = field === 'reingresante' ? e.target.checked : e.target.value;
        const currentDate = new Date().toLocaleString();

        if (field === 'sentenceEndDate') {
            const nuevaCondenaRestante = calcularCondenaRestante(value);

            if (value !== initialDatosInterno[field] || nuevaCondenaRestante !== initialDatosInterno.remainingSentence) {
                setIsDataModified(true);

                setHistorialCambios((prev) => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        fechaCarga: prev[field]?.fechaCarga || currentDate,
                        ultimaModificacion: currentDate,
                    }
                }));
            }

            setDatosInterno((prev) => ({
                ...prev,
                [field]: value,
                remainingSentence: nuevaCondenaRestante,
            }));
        } else {
            if (value !== initialDatosInterno[field]) {
                setIsDataModified(true);

                setHistorialCambios((prev) => ({
                    ...prev,
                    [field]: {
                        ...prev[field],
                        fechaCarga: prev[field]?.fechaCarga || currentDate,
                        ultimaModificacion: currentDate,
                    }
                }));
            } else if (value === initialDatosInterno[field]) {
                setIsDataModified(false);
            }
            setDatosInterno((prev) => ({
                ...prev,
                [field]: value
            }));
        }
    };

    const campoMapeadoDatosInterno = {
        name: 'Nombre',
        alias: 'Alias',
        unit: 'Unidad',
        fileNumber: 'Número de expediente',
        typedoc: 'Tipo de documento',
        dni: 'DNI',
        crime: 'Delito',
        typeofintern: 'Tipo de interno',
        entryDate: 'Fecha de ingreso',
        sentenceEndDate: 'Fecha de fin de condena',
        remainingSentence: 'Condena restante',
        numprontuario: 'Número de prontuario',
        reingresante: 'Reingresante',
        processed: 'Procesado',
        placeOfEvent: 'Lugar del hecho',
        detentionDate: 'Fecha de detención',
        intakeDate: 'Fecha de toma',
        sentence: 'Sentencia',
        commutationDate: 'Fecha de conmutación',
        transitionalBenefitDate: 'Fecha de beneficio transitorio',
        conditionalLibertyDate: 'Fecha de libertad condicional',
        assistedDate: 'Fecha asistida',
        reportDate: 'Fecha de informe',
        policeSection: 'Sección policial',
        observation: 'Observación',
        firma: 'Firma',
        huellaDactilar: 'Huella dactilar',
        oficioEgreso: 'Oficio de egreso',
        caratulaCausa: 'Carátula de la causa',
    };

    const [initialDatosInterno, setInitialDatosInterno] = useState({
        name: '',
        alias: '',
        unit: '',
        fileNumber: '',
        typedoc: '',
        dni: '',
        crime: '',
        typeofintern: '',
        entryDate: '',
        numprontuario: '',
        reingresante: false,
        processed: true,
        placeOfEvent: '',
        intakeDate: '',
        sentence: '',
        sentenceEndDate: '',
        remainingSentence: '',
        commutationDate: '',
        transitionalBenefitDate: '',
        conditionalLibertyDate: '',
        assistedDate: '',
        reportDate: '',
        policeSection: '',
        observation: '',
        firma: null,
        huellaDactilar: null,
        oficioEgreso: null,
        caratulaCausa: null,
        detentionDate: '',
        sentenceEndDate: '',
        commutationDate: '',
        transitionalBenefitDate: '',
        conditionalLibertyDate: '',
        assistedDate: '',
        reportDate: '',
    });

    const [isEditable, setIsEditable] = useState(false);
    const [buttonText, setButtonText] = useState('Actualizar');
    const [isDataModified, setIsDataModified] = useState(false);

    const handleCargarActualizar = () => {
        const currentDate = new Date().toLocaleString();

        if (buttonText === 'Actualizar') {
            setIsEditable(true);
            setButtonText('Guardar Cambios');
            setIsDataModified(false);
        } else if (buttonText === 'Guardar Cambios') {
            const allFieldsEmpty = Object.values(datosInterno).every(value =>
                value === '' || value === null || (typeof value === 'boolean' ? !value : false)
            );

            if (allFieldsEmpty) {
                alert("Por favor, completa al menos un campo antes de guardar.");
                return;
            }

            const hasChanges = Object.keys(datosInterno).some(key =>
                datosInterno[key] !== initialDatosInterno[key] &&
                (datosInterno[key] !== '' || datosInterno[key] !== null)
            );

            if (!hasChanges) {
                alert("No hay cambios significativos para guardar.");
                return;
            }

            console.log('Datos guardados');
            setInitialDatosInterno(datosInterno); setIsEditable(false);
            setButtonText('Actualizar');
            setIsDataModified(false);
        }
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            {/* Formulario de Detalles */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <h1 className="text-xl font-bold mb-4">Ficha de Ingreso</h1>
                <div className='bg-white p-4 rounded-md shadow-md border border-gray-300'>
                    <div className="flex items-center p-2 bg-gray-100 rounded-md shadow-sm mb-4">
                        <input
                            type="checkbox"
                            id="reingresante"
                            className="form-checkbox h-5 w-5 text-blue-600 bg-white border-gray-300 rounded-md focus:ring-blue-500"
                            checked={datosInterno.reingresante}
                            onChange={(e) => handleInputChange(e, 'reingresante')}
                            disabled={!isEditable} />
                        <label htmlFor="reingresante" className="ml-2 text-gray-700 text-sm font-medium">Reingresante</label>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Cantidad de Reingresos</label>
                            <input
                                type="number"
                                placeholder="Introduce la cantidad de reingresos"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.reingresante ? '1' : '0'} disabled={!datosInterno.reingresante || !isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Lugar del hecho</label>
                            <input
                                type="text"
                                placeholder="Introduce el lugar del hecho"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.placeOfEvent}
                                onChange={(e) => handleInputChange(e, 'placeOfEvent')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha de Detención</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.detentionDate}
                                onChange={(e) => handleInputChange(e, 'detentionDate')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha de Ingreso</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.entryDate}
                                onChange={(e) => handleInputChange(e, 'entryDate')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Condena</label>
                            <input
                                type="text"
                                placeholder="Introduce la condena"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.sentence}
                                onChange={(e) => handleInputChange(e, 'sentence')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha Cumple Condena</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm text-red-700"
                                value={datosInterno.sentenceEndDate}
                                onChange={(e) => handleInputChange(e, 'sentenceEndDate')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Condena Restante</label>
                            <input
                                type="text"
                                value={datosInterno.remainingSentence}
                                onChange={(e) => handleInputChange(e, 'remainingSentence')}
                                disabled={true} // Campo no editable
                                className="w-full p-1 border border-gray-300 rounded text-sm text-red-700"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha Conmutación de Pena</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.commutationDate}
                                onChange={(e) => handleInputChange(e, 'commutationDate')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha Beneficio Transitorio</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.transitionalBenefitDate}
                                onChange={(e) => handleInputChange(e, 'transitionalBenefitDate')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha Beneficio Libertad Condicional</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.conditionalLibertyDate}
                                onChange={(e) => handleInputChange(e, 'conditionalLibertyDate')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha Asistida</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.assistedDate}
                                onChange={(e) => handleInputChange(e, 'assistedDate')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha Informe</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.reportDate}
                                onChange={(e) => handleInputChange(e, 'reportDate')}
                                disabled={!isEditable} />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Observación</label>
                            <textarea
                                placeholder="Introduce una observación"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                rows="2"
                                value={datosInterno.observation}
                                onChange={(e) => handleInputChange(e, 'observation')}
                                disabled={!isEditable}                             ></textarea>
                        </div>
                    </div>
                    <div className="flex items-center mt-4 space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-2">Foto de Firma</label>
                            <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                                {isEditable ? (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full text-sm text-gray-500"
                                        onChange={(e) => handleFileUpload(e, 'firma')}
                                    />
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-500 text-sm">
                                            {datosInterno.firma ? datosInterno.firma.name : 'Ningún archivo cargado'}
                                        </p>
                                        {datosInterno.firma && (
                                            <button
                                                className="ml-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                                onClick={() => downloadFile(datosInterno.firma)}
                                            >
                                                <i className="fas fa-download"></i>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-2">Foto de Huella Dactilar</label>
                            <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                                {isEditable ? (
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="w-full text-sm text-gray-500"
                                        onChange={(e) => handleFileUpload(e, 'huellaDactilar')}
                                    />
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-500 text-sm">
                                            {datosInterno.huellaDactilar ? datosInterno.huellaDactilar.name : 'Ningún archivo cargado'}
                                        </p>
                                        {datosInterno.huellaDactilar && (
                                            <button
                                                className="ml-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                                onClick={() => handleDownload(datosInterno.huellaDactilar)}
                                            >
                                                <i className="fas fa-download"></i>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className="flex items-center mt-4 space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-2">Oficio de Egreso</label>
                            <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                                {isEditable ? (
                                    <input
                                        type="file"
                                        accept='.pdf'
                                        className="w-full text-sm text-gray-500"
                                        onChange={(e) => handleFileUpload(e, 'oficioEgreso')}
                                    />
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-500 text-sm">
                                            {datosInterno.oficioEgreso ? datosInterno.oficioEgreso.name : 'Ningún archivo cargado'}
                                        </p>
                                        {datosInterno.oficioEgreso && (
                                            <button
                                                className="ml-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                                onClick={() => handleDownload(datosInterno.oficioEgreso)}
                                            >
                                                <i className="fas fa-download"></i>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>


                        <div className="flex-1">
                            <label className="block text-sm font-semibold mb-2">Carátula de la Causa</label>
                            <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                                {isEditable ? (
                                    <input
                                        type="file"
                                        accept='.pdf'
                                        className="w-full text-sm text-gray-500"
                                        onChange={(e) => handleFileUpload(e, 'caratulaCausa')}
                                    />
                                ) : (
                                    <div className="flex items-center justify-between">
                                        <p className="text-gray-500 text-sm">
                                            {datosInterno.caratulaCausa ? datosInterno.caratulaCausa.name : 'Ningún archivo cargado'}
                                        </p>
                                        {datosInterno.caratulaCausa && (
                                            <button
                                                className="ml-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700 transition"
                                                onClick={() => handleDownload(datosInterno.caratulaCausa)}
                                            >
                                                <i className="fas fa-download"></i>
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>
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
                        disabled={buttonText === 'Guardar Cambios' && !isDataModified}
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
                        campoMapeado={campoMapeadoDatosInterno}
                    />

                </div>
            </div>

        </div >
    );
};

export default FichaIngreso;
