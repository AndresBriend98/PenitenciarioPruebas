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

    const disabledStyle = {
        backgroundColor: '#f0f0f0', borderColor: '#d1d5db', color: '#6b7280', cursor: 'not-allowed',
    };
    const [tipoInterno, setTipoInterno] = useState('');

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
        firstName: 'Maximiliano Ezequiel',
        lastName: 'Dominguez',
        alias: 'JL',
        unit: 'Unidad Penitenciaria 9',
        fileNumber: '3576',
        typedoc: 'Cédula Ejemplar B',
        dni: '23123564',
        crime: 'Robo',
        entryDate: '2026-06-01',
        sentenceEndDate: '2034-08-16',
        remainingSentence: '',
        numprontuario: '48765',
        reingresante: 0,
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
    const [initialTipoInterno, setInitialTipoInterno] = useState('');

    const campoMapeadoDatosInterno = {
        firstName: 'Maximiliano Ezequiel',
        lastName: 'Dominguez',
        alias: 'Alias',
        unit: 'Unidad',
        cantidadReingresos: 'Cantidad de Reingresos',
        tipoInterno: 'Tipo Interno',
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
        caratulaCausa: 'Carátula de la causa',
    };

    const [initialDatosInterno, setInitialDatosInterno] = useState({
        firstName: 'Maximiliano Ezequiel',
        lastName: 'Dominguez',
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
        caratulaCausa: null,
        detentionDate: '',
        sentenceEndDate: '',
        commutationDate: '',
        transitionalBenefitDate: '',
        conditionalLibertyDate: '',
        assistedDate: '',
        reportDate: '',
    });
    const handleCargarActualizar = () => {
        const currentDate = new Date().toLocaleString();

        if (buttonText === 'Actualizar') {
            setIsEditable(true);
            setButtonText('Guardar Cambios');

            setInitialTipoInterno(tipoInterno);
            setInitialDatosInterno(datosInterno);
            setIsDataModified(false);
        } else if (buttonText === 'Guardar Cambios') {
            const allFieldsEmpty = Object.values(datosInterno).every(value =>
                value === '' || value === null || (typeof value === 'boolean' ? !value : false)
            );

            if (allFieldsEmpty) {
                alert("Por favor, completa al menos un campo antes de guardar.");
                return;
            }

            const hasChanges = Object.keys(datosInterno).some(key => {
                return datosInterno[key] !== initialDatosInterno[key];
            }) || tipoInterno !== initialTipoInterno;

            if (!hasChanges) {
                alert("No hay cambios significativos para guardar.");
                return;
            }

            setInitialDatosInterno(datosInterno);
            setInitialTipoInterno(tipoInterno);

            // Guardamos los datos
            console.log('Datos guardados');
            setIsEditable(false);
            setButtonText('Actualizar');
            setIsDataModified(false);
        }
    };

    const handleInputChange = (e, field) => {
        let value = e.target.type === 'checkbox'
            ? e.target.checked
            : e.target.value;

        const currentDate = new Date().toLocaleString();

        if (field === 'cantidadReingresos') {
            value = Math.max(0, Math.min(100, parseInt(value) || 0));
        }

        if (field === 'reingresante') {
            setDatosInterno((prev) => ({
                ...prev,
                reingresante: value,
                cantidadReingresos: value ? 1 : '',
            }));

            setHistorialCambios((prev) => ({
                ...prev,
                reingresante: value
                    ? {
                        ...prev.reingresante,
                        fechaCarga: prev.reingresante?.fechaCarga || currentDate,
                        ultimaModificacion: currentDate,
                    }
                    : {
                        ...prev.reingresante,
                        ultimaModificacion: currentDate,
                        eliminado: true,
                    },
                cantidadReingresos: value
                    ? {
                        ...prev.cantidadReingresos,
                        fechaCarga: prev.cantidadReingresos?.fechaCarga || currentDate,
                        ultimaModificacion: currentDate,
                    }
                    : {
                        ...prev.cantidadReingresos,
                        ultimaModificacion: currentDate,
                        eliminado: true,
                    },
            }));

            setIsDataModified(true);
            return;
        }

        setDatosInterno((prev) => ({
            ...prev,
            [field]: value,
        }));

        if (value !== initialDatosInterno[field] && value !== datosInterno[field]) {
            setHistorialCambios((prev) => ({
                ...prev,
                [field]: {
                    ...prev[field],
                    fechaCarga: prev[field]?.fechaCarga || currentDate,
                    ultimaModificacion: currentDate,
                },
            }));
            setIsDataModified(true);
        } else {
            const currentHistory = { ...historialCambios };
            if (currentHistory[field]) {
                delete currentHistory[field];
            }
            setHistorialCambios(currentHistory);
            setIsDataModified(false);
        }
    };


    const handleTipoInternoChange = (e) => {
        const value = e.target.value;

        if (value !== initialTipoInterno) {
            setIsDataModified(true);
        } else {
            setIsDataModified(false);
        }

        setTipoInterno(value);

        const currentDate = new Date().toLocaleString();
        if (value !== initialTipoInterno) {
            setHistorialCambios((prev) => ({
                ...prev,
                tipoInterno: {
                    ...prev.tipoInterno,
                    fechaCarga: prev.tipoInterno?.fechaCarga || currentDate,
                    ultimaModificacion: currentDate,
                },
            }));
        }
    };


    const [isEditable, setIsEditable] = useState(false);
    const [buttonText, setButtonText] = useState('Actualizar');
    const [isDataModified, setIsDataModified] = useState(false);


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
                            <label className="block text-sm font-semibold mb-2">Tipo de Interno</label>
                            <select
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={tipoInterno}
                                onChange={handleTipoInternoChange}
                                disabled={!isEditable}
                            >
                                <option value="" disabled>Seleccionar tipo de interno</option>
                                <option value="condenado">Condenado</option>
                                <option value="procesado">Procesado</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Cantidad de Reingresos</label>
                            <input
                                type="number"
                                placeholder="Introduce la cantidad de reingresos"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.cantidadReingresos || ''}
                                onChange={(e) => handleInputChange(e, 'cantidadReingresos')}
                                disabled={!datosInterno.reingresante || !isEditable}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Lugar del hecho</label>
                            <input
                                type="text"
                                placeholder="Introduce el lugar del hecho"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.placeOfEvent}
                                onChange={(e) => handleInputChange(e, 'placeOfEvent')}
                                disabled={!isEditable}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha de Detención</label>
                            <input
                                type="date"
                                style={(tipoInterno === 'procesado' || tipoInterno === '') ? disabledStyle : {}}
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.detentionDate}
                                onChange={(e) => handleInputChange(e, 'detentionDate')}
                                disabled={tipoInterno === 'procesado' || tipoInterno === '' || !isEditable}
                            />
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
                                style={(tipoInterno === 'procesado' || tipoInterno === '') ? disabledStyle : {}}
                                disabled={tipoInterno === 'procesado' || tipoInterno === '' || !isEditable}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha Cumple Condena</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm text-red-700"
                                value={datosInterno.sentenceEndDate}
                                onChange={(e) => handleInputChange(e, 'sentenceEndDate')}
                                style={(tipoInterno === 'procesado' || tipoInterno === '') ? disabledStyle : {}}
                                disabled={tipoInterno === 'procesado' || tipoInterno === '' || !isEditable}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Condena Restante</label>
                            <input
                                type="text"
                                value={tipoInterno === 'procesado' || tipoInterno === '' ? 'No disponible' : datosInterno.remainingSentence}
                                disabled={tipoInterno === 'procesado' || tipoInterno === ''}
                                style={(tipoInterno === 'procesado' || tipoInterno === '') ? disabledStyle : {}}
                                className={`w-full p-1 border border-gray-300 rounded text-sm 
                                ${tipoInterno === 'procesado' || tipoInterno === '' ? 'bg-gray-200 text-gray-500' : 'text-red-700'}`}
                            />
                        </div>



                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha Conmutación de Pena</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.commutationDate}
                                onChange={(e) => handleInputChange(e, 'commutationDate')}
                                style={(tipoInterno === 'procesado' || tipoInterno === '') ? disabledStyle : {}}
                                disabled={tipoInterno === 'procesado' || tipoInterno === '' || !isEditable}
                            />
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
                                style={(tipoInterno === 'procesado' || tipoInterno === '') ? disabledStyle : {}}
                                disabled={tipoInterno === 'procesado' || tipoInterno === '' || !isEditable}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Fecha Asistida</label>
                            <input
                                type="date"
                                className="w-full p-1 border border-gray-300 rounded text-sm"
                                value={datosInterno.assistedDate}
                                onChange={(e) => handleInputChange(e, 'assistedDate')}
                                style={(tipoInterno === 'procesado' || tipoInterno === '') ? disabledStyle : {}}
                                disabled={tipoInterno === 'procesado' || tipoInterno === '' || !isEditable}
                            />
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
                                disabled={!isEditable}
                            ></textarea>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                        <div>
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

                        <div>
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

                        <div>
                            <label className="block text-sm font-semibold mb-2">Carátula de la Causa</label>
                            <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                                {isEditable ? (
                                    <input
                                        type="file"
                                        accept=".pdf"
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
