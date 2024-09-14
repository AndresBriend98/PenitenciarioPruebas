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


    // Función para manejar el cambio en el tipo de interno
    const handleTipoInternoChange = (e) => {
        setTipoInterno(e.target.value);
    };

    // Función para aplicar el estilo de deshabilitado
    const disabledStyle = {
        backgroundColor: '#f0f0f0', // Gris claro
        borderColor: '#d1d5db', // Gris claro para el borde
        color: '#6b7280', // Gris oscuro para el texto
        cursor: 'not-allowed', // Cambia el cursor para indicar que está deshabilitado
    };

    const [egreso, setEgreso] = useState(false);
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
    const oficioEgresoInputRef = useRef(null);
    const [tipoInterno, setTipoInterno] = useState('');

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

    const handleEgresoChange = () => {
        setEgreso(!egreso);
        if (!egreso) {
            // Resetear valores si se desmarca el checkbox
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
                <div className="flex flex-col md:flex-row items-start p-4 bg-gray-300 rounded-md mb-4">
                    {/* Foto y botón de carga */}
                    <div className="relative flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                        <div className="w-48 h-48 bg-gray-500 rounded-full flex justify-center items-center overflow-hidden">
                            {image ? (
                                <img src={image} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white">Foto Presentacion</span>
                            )}
                        </div>
                        <button
                            className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center absolute -right-2 top-2 cursor-pointer text-s hover:bg-blue-600"
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
                        <div className="flex justify-between items-center mt-4 space-x-2 ml-2">
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
                    <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-8 flex-grow">
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
                        <input
                            type="text"
                            placeholder="Delito"
                            value={user.crime}
                            onChange={(e) => setUser({ ...user, crime: e.target.value })}
                            className="w-full p-2 border border-gray-300 rounded text-sm"
                        />
                    </div>
                </div>

                {/* Checkboxes alineados a la derecha */}
                <div className="flex flex-col space-y-2 ml-auto mt-2 md:mt-0">
                    {/* Egreso checkbox y fecha */}
                    <div className="p-2 border-2 border-gray-300 bg-white rounded-md flex flex-col items-start shadow-sm">
                        <div className="flex items-center text-sm">
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
                            <div className="w-full mt-2">
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
                                    className="w-full p-1 border border-gray-300 rounded text-sm"
                                />
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
                        <label className="block text-gray-700 text-sm font-bold">Sección Policial</label>
                        <input type="text" placeholder="Introduce la sección policial" className="w-full p-1 border border-gray-300 rounded text-sm" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Observación</label>
                        <textarea placeholder="Introduce una observación" className="w-full p-1 border border-gray-300 rounded text-sm" rows="2"></textarea>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold">Núm. Prontuario Policial</label>
                        <input type="text" placeholder="Introduce el número de prontuario policial" className="w-full p-1 border border-gray-300 rounded text-sm" />
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
                    <label className="block text-gray-700 text-sm font-bold">Oficio de Egreso</label>
                    <input
                        type="file"
                        ref={oficioEgresoInputRef}
                        accept=".pdf,.doc,.docx"  // Ajusta los formatos según tus necesidades
                        onChange={handleOficioEgresoChange}
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
                        className="bg-green-500 text-white py-1 px-3 rounded shadow-md hover:bg-green-600 text-xs"
                        onClick={handleAgregarNuevoInterno}
                    >
                        Agregar Nuevo Interno
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CargaNuevoInterno;
