import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const CargaNuevoInterno = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: '',
        alias: '',
        typedoc: '',
        fileNumber: '',
        dni: '',
        crime: '',
        entryDate: '10/06/2024',
        sentenceEndDate: '10/06/2030',
        remainingSentence: '3 años 2 meses 5 días',
    });

        const handleTipoInternoChange = (e) => {
        setTipoInterno(e.target.value);
    };

        const handleDelitoChange = (e) => {
        setDelito(e.target.value);
    };

        const disabledStyle = {
        backgroundColor: '#f0f0f0',         borderColor: '#d1d5db',         color: '#6b7280',         cursor: 'not-allowed',     };

    const [egreso, setEgreso] = useState(false);
    const [motivoEgreso, setMotivoEgreso] = useState('');
    const [egresoDate, setEgresoDate] = useState('');
    const [numOficioEgreso, setNumOficioEgreso] = useState('');
    const [leyMicaela, setLeyMicaela] = useState(false);
    const [leyBlumberg, setLeyBlumberg] = useState(false);
    const [reingresante, setReingresante] = useState(false);
    const [image, setImage] = useState(null);
    const [firma, setFirma] = useState(null);
    const [huella, setHuella] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [oficioEgreso, setOficioEgreso] = useState(null);
    const [caratulaCausa, setCaratulaCausa] = useState(null);
    const oficioEgresoInputRef = useRef(null);
    const caratulaCausaInputRef = useRef(null);
    const [tipoInterno, setTipoInterno] = useState('');
    const [delito, setDelito] = useState('');

    const fileInputRef = useRef(null);
    const firmaInputRef = useRef(null);
    const huellaInputRef = useRef(null);
    const adjuntoInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCheckboxChange = () => {
        setReingresante(!reingresante);
    };

    const handleOficioEgresoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setOficioEgreso(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCaratulaCausaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCaratulaCausa(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEgresoChange = () => {
        setEgreso(!egreso);
        if (!egreso) {
                        setEgresoDate('');
            setNumOficioEgreso('');
        }
    };

    const handleFirmaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFirma(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleHuellaChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHuella(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleArchivoAdjuntoChange = (e) => {

    };

    const handleVolver = () => {
        navigate('/judicial');
    };

    const handleAgregarNuevoInterno = () => {
        setShowModal(true);
        setTimeout(() => {
            setShowModal(false);
            navigate('/judicial');
        }, 3000);
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-6 flex flex-col">
            {showModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg text-center">
                        <h2 className="text-lg font-bold mb-4">Nuevo interno añadido con exito</h2>
                        <p>Redirigiendo al inicio...</p>
                    </div>
                </div>
            )}
            {/* Información del usuario, foto y checkboxes */}
            <div className="bg-gray-300 p-4 rounded-md flex flex-col md:flex-row mb-4 items-start">
                <div className="flex flex-col md:flex-row items-start w-full">
                    {/* Foto y botón de carga */}
                    <div className="relative flex-shrink-0 mb-4 md:mb-0 md:mr-4 text-center md:text-left w-full md:w-auto">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden mx-auto">
                            {image ? (
                                <img src={image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white text-xs md:text-base">Foto Presentacion</span>
                            )}
                        </div>
                        <button
                            className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center absolute -right-2 top-2 md:-right-4 md:top-4 cursor-pointer hover:bg-blue-600"
                            onClick={() => fileInputRef.current.click()}
                        >
                            +
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                        {/* Botón de Fotos del Interno */}
                        <div className="flex justify-center md:justify-start mt-4 space-x-2">
                            <button
                                className="bg-blue-500 text-white px-5 py-1 rounded hover:bg-blue-600 text-xs"
                                onClick={() => adjuntoInputRef.current.click()}
                            >
                                + Otras Fotos del Interno
                            </button>
                            <input
                                type="file"
                                ref={adjuntoInputRef}
                                onChange={handleArchivoAdjuntoChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    {/* Datos del usuario */}
                    <div className="flex-grow ml-0 md:ml-6 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                        <input
                            type="text"
                            placeholder="Nombre/s y Apellido/s"
                            value={user.name}
                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Alias"
                            value={user.alias}
                            onChange={(e) => setUser({ ...user, alias: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Tipo de documento"
                            value={user.typedoc}
                            onChange={(e) => setUser({ ...user, typedoc: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="Legajo"
                            value={user.fileNumber}
                            onChange={(e) => setUser({ ...user, fileNumber: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                        <input
                            type="text"
                            placeholder="DNI/M.I"
                            value={user.dni}
                            onChange={(e) => setUser({ ...user, dni: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>
                
                <div className="flex flex-col space-y-2 mt-4 md:mt-0 w-full md:w-auto">
                    {/* Egreso checkbox, fecha, motivo y oficio de egreso */}
                    <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex flex-col items-start shadow-sm">
                        <div className="flex items-center text-sm mb-2">
                            <input
                                type="checkbox"
                                id="egreso"
                                checked={egreso}
                                onChange={handleEgresoChange}
                                className="mr-2"
                            />
                            <label htmlFor="egreso">Egreso</label>
                        </div>
                        {egreso && (
                            <div className="w-full">
                                <label htmlFor="egresoDate" className="block text-sm font-semibold mb-1">Fecha de Egreso</label>
                                <input
                                    type="date"
                                    id="egresoDate"
                                    value={egresoDate}
                                    onChange={(e) => setEgresoDate(e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
                                />

                                <label htmlFor="numOficioEgreso" className="block text-sm font-semibold mb-1">Num. Oficio Egreso</label>
                                <input
                                    type="text"
                                    id="numOficioEgreso"
                                    value={numOficioEgreso}
                                    onChange={(e) => setNumOficioEgreso(e.target.value)}
                                    placeholder="Ingrese N. Oficio Egreso"
                                    className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
                                />

                                <label htmlFor="motivoEgreso" className="block text-sm font-semibold mb-1">Motivo de Egreso</label>
                                <select
                                    id="motivoEgreso"
                                    value={motivoEgreso}
                                    onChange={(e) => setMotivoEgreso(e.target.value)}
                                    className="w-full p-1 border border-gray-300 rounded text-sm mb-2"
                                >
                                    <option value="" disabled>Seleccionar motivo de egreso</option>
                                    <option value="traslado">Traslado</option>
                                    <option value="libertad condicional">Libertad Condicional</option>
                                    <option value="libertad asistida">Libertad Asistida</option>
                                    <option value="fallecimiento">Fallecimiento</option>
                                </select>

                                <div className="flex-1 mt-3">
                                    <label className="block text-gray-700 text-sm font-bold">Oficio de Egreso</label>
                                    <input
                                        type="file"
                                        ref={oficioEgresoInputRef}
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleOficioEgresoChange}
                                        className="block w-full p-1 border border-gray-300 rounded text-sm"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Otros checkboxes */}
                    <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex items-center text-sm shadow-sm">
                        <input
                            type="checkbox"
                            id="leyBlumberg"
                            checked={leyBlumberg}
                            onChange={() => setLeyBlumberg(!leyBlumberg)}
                            className="mr-2"
                        />
                        <label htmlFor="leyBlumberg">Ley Blumberg</label>
                    </div>
                    <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex items-center text-sm shadow-sm">
                        <input
                            type="checkbox"
                            id="leyMicaela"
                            checked={leyMicaela}
                            onChange={() => setLeyMicaela(!leyMicaela)}
                            className="mr-2"
                        />
                        <label htmlFor="leyMicaela">Ley Micaela</label>
                    </div>
                </div>
            </div>


            {/* Formulario de Detalles */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <h1 className="text-2xl font-bold mb-4">Carga de Nuevo Interno</h1>
                <div className="flex items-center p-2 bg-gray-100 rounded-md shadow-sm mb-4">
                    <input
                        type="checkbox"
                        id="reingresante"
                        checked={reingresante}
                        onChange={handleCheckboxChange}
                        className="form-checkbox h-5 w-5 text-blue-600 bg-white border-gray-300 rounded-md focus:ring-blue-500"
                    />
                    <label htmlFor="reingresante" className="ml-2 text-gray-700 text-sm font-medium">Reingresante</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Tipo de Interno</label>
                        <select
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={tipoInterno}
                            onChange={handleTipoInternoChange}
                        >
                            <option value="" disabled>Seleccionar tipo de interno</option>
                            <option value="interno">Interno</option>
                            <option value="procesado">Procesado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Delito</label>
                        <select
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={delito}
                            onChange={handleDelitoChange}                         >
                            <option value="" disabled>Seleccionar delito</option>
                            <option value="A DESHO">A DESHO</option>
                            <option value="A SEXUAL">A SEXUAL</option>
                            <option value="AMENAZAS">AMENAZAS</option>
                            <option value="ABIGEATO">ABIGEATO</option>
                            <option value="CORRUP. MEN">CORRUP. MEN</option>
                            <option value="DAÑOS">DAÑOS</option>
                            <option value="DEFRAUDACIÓN">DEFRAUDACIÓN</option>
                            <option value="ENCUBRIM">ENCUBRIM</option>
                            <option value="ESTAFA">ESTAFA</option>
                            <option value="ESTUPRO">ESTUPRO</option>
                            <option value="EXTORSIÓN">EXTORSIÓN</option>
                            <option value="F. TESTIMO">F. TESTIMO</option>
                            <option value="F/ PROST.">F/ PROST.</option>
                            <option value="HOMICIDIO">HOMICIDIO</option>
                            <option value="HURTO">HURTO</option>
                            <option value="INCENDIO">INCENDIO</option>
                            <option value="LESIONES">LESIONES</option>
                            <option value="PRIV.ILEGITI">PRIV.ILEGITI</option>
                            <option value="A ROBO">A ROBO</option>
                            <option value="T/ A SEX">T/ A SEX</option>
                            <option value="T/ HOMICI">T/ HOMICI</option>
                            <option value="T/ HURTO">T/ HURTO</option>
                            <option value="TORTURA">TORTURA</option>
                            <option value="VIOL DOMICI">VIOL DOMICI</option>
                            <option value="VIOLACION">VIOLACION</option>
                            <option value="P/ ARMA">P/ ARMA</option>
                            <option value="VIOL GENERO">VIOL GENERO</option>
                            <option value="LEY 23737">LEY 23737</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Cantidad de Reingresos</label>
                        <input
                            type="number"
                            placeholder="Introduce la cantidad de reingresos"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            min="0"
                            step="1"
                            style={!reingresante ? disabledStyle : {}}
                            disabled={!reingresante}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Lugar del hecho</label>
                        <input type="text" placeholder="Introduce el lugar del hecho" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha de Detención</label>
                        <input
                            type="date"
                            style={tipoInterno === 'procesado' ? disabledStyle : {}}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            disabled={tipoInterno === 'procesado'}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha de Ingreso</label>
                        <input type="date" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Condena</label>
                        <input
                            type="text"
                            placeholder="Introduce la condena"
                            style={tipoInterno === 'procesado' ? disabledStyle : {}}
                            disabled={tipoInterno === 'procesado'}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Cumple Condena</label>
                        <input
                            type="date"
                            style={tipoInterno === 'procesado' ? disabledStyle : {}}
                            disabled={tipoInterno === 'procesado'}
                            className="w-full p-1 border border-gray-300 rounded text-sm text-red-700"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Condena Restante</label>
                        <input
                            type="text"
                            placeholder="Introduce la condena restante"
                            style={tipoInterno === 'procesado' ? disabledStyle : {}}
                            disabled={tipoInterno === 'procesado'}
                            className="w-full p-1 border border-gray-300 rounded text-sm text-red-700"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Conmutación de Pena</label>
                        <input
                            type="date"
                            style={tipoInterno === 'procesado' ? disabledStyle : {}}
                            disabled={tipoInterno === 'procesado'}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Beneficio Transitorio</label>
                        <input type="date" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Beneficio Libertad Condicional</label>
                        <input
                            type="date"
                            style={tipoInterno === 'procesado' ? disabledStyle : {}}
                            disabled={tipoInterno === 'procesado'}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Asistida</label>
                        <input
                            type="date"
                            style={tipoInterno === 'procesado' ? disabledStyle : {}}
                            disabled={tipoInterno === 'procesado'}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Fecha Informe</label>
                        <input type="date" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Observación</label>
                        <textarea placeholder="Introduce una observación" className="w-full p-1 border border-gray-300 rounded text-sm" rows="2"></textarea>
                    </div>
                </div>
                <div className="flex items-center mt-4 space-x-4">
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold">Foto de Firma</label>
                        <input
                            type="file"
                            ref={firmaInputRef}
                            accept=".png,.jpg,.jpeg"
                            onChange={handleFirmaChange}
                            className="block w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-gray-700 text-sm font-bold">Foto de Huella Dactilar</label>
                        <input
                            type="file"
                            ref={huellaInputRef}
                            accept=".png,.jpg,.jpeg"
                            onChange={handleHuellaChange}
                            className="block w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>
                <div className="flex-1 mt-3">
                    <label className="block text-gray-700 text-sm font-bold">Caratula de la Causa</label>
                    <input
                        type="file"
                        ref={caratulaCausaInputRef}
                        accept=".pdf,.doc,.docx"
                        onChange={handleCaratulaCausaChange}
                        className="block w-full p-1 border border-gray-300 rounded text-sm"
                    />
                </div>
                <div className="flex justify-between items-center mt-10 space-x-2">
                    <button
                        className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-xs"
                        onClick={handleVolver}
                    >
                        Menu Principal
                    </button>
                    <button
                        className="bg-blue-500 text-white py-1 px-3 rounded shadow-md hover:bg-blue-600 text-xs"
                        onClick={handleAgregarNuevoInterno}
                    >
                        Cargar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaNuevoInterno;
