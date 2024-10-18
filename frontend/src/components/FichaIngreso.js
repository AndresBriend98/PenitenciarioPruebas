import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const FichaIngreso = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: 'Maximiliano Ezequiel Dominguez',
        alias: 'JL',
        unit: 'Unidad Penitenciaria 9',
        fileNumber: '3576',
        typedoc: 'Cédula Ejemplar B',
        dni: '23123564',
        crime: 'Robo',
        typeofintern: 'Condenado',
        entryDate: '2026-06-01',
        sentenceEndDate: '10/06/2030',
        remainingSentence: '3 años 2 meses 5 días',
        numprontuario: '48765',
        reingresante: false,
        processed: true,
        placeOfEvent: 'Calle Falsa 123, Ciudad',
        detentionDate: '10/07/2023',
        intakeDate: '15/08/2023',
        sentence: '2 años de prisión',
        sentenceEndDate: '15/08/2025',
        remainingSentence: '1 año 5 meses 12 días',
        commutationDate: 'N/A',
        transitionalBenefitDate: 'N/A',
        conditionalLibertyDate: 'N/A',
        assistedDate: 'N/A',
        reportDate: '12/08/2024',
        policeSection: 'Sección 5',
        observation: 'Sin observaciones adicionales',
        signaturePhoto: null,
        fingerprintPhoto: null,
        dischargeOrder: null,
        detentionDate: '2024-08-15',
        sentenceEndDate: '2034-08-16',
        commutationDate: '2024-09-01',
        transitionalBenefitDate: '2025-01-01',
        conditionalLibertyDate: '2026-06-01',
        assistedDate: '2024-12-01',
        reportDate: '2024-08-31',
    });

    const handleVolver = () => {
        navigate('/general');
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header/>
            {/* Formulario de Detalles */}
            <div className="bg-white p-4 rounded-md shadow-md mb-4">
                <h1 className="text-2xl font-bold mb-4">Ficha de Ingreso</h1>
                <div className="flex items-center p-2 bg-gray-100 rounded-md shadow-sm mb-4">
                    <input
                        type="checkbox"
                        id="reingresante"
                        className="form-checkbox h-5 w-5 text-blue-600 bg-white border-gray-300 rounded-md focus:ring-blue-500"
                        checked={user.reingresante} // Muestra el valor del checkbox
                        readOnly // Si no quieres que el usuario pueda modificar el valor, puedes agregar esto
                    />
                    <label htmlFor="reingresante" className="ml-2 text-gray-700 text-sm font-medium">Reingresante</label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <label className="block text-sm font-semibold mb-2">Cantidad de Reingresos</label>
                        <input
                            type="number"
                            placeholder="Introduce la cantidad de reingresos"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.reingresante ? '1' : '0'} // Muestra el valor basado en si es reingresante
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Lugar del hecho</label>
                        <input
                            type="text"
                            placeholder="Introduce el lugar del hecho"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.placeOfEvent} // Muestra el lugar del hecho
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Fecha de Detención</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.detentionDate} // Muestra la fecha de detención
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Fecha de Ingreso</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.entryDate} // Muestra la fecha de ingreso
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Condena</label>
                        <input
                            type="text"
                            placeholder="Introduce la condena"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.sentence} // Muestra la condena
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Fecha Cumple Condena</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm text-red-700"
                            value={user.sentenceEndDate} // Muestra la fecha de finalización de condena
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Condena Restante</label>
                        <input
                            type="text"
                            placeholder="Introduce la condena restante"
                            className="w-full p-1 border border-gray-300 rounded text-sm text-red-700"
                            value={user.remainingSentence} // Muestra la condena restante
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Fecha Conmutación de Pena</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.commutationDate} // Muestra la fecha de conmutación de pena
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Fecha Beneficio Transitorio</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.transitionalBenefitDate} // Muestra la fecha de beneficio transitorio
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Fecha Beneficio Libertad Condicional</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.conditionalLibertyDate} // Muestra la fecha de beneficio de libertad condicional
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Fecha Asistida</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.assistedDate} // Muestra la fecha asistida
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Fecha Informe</label>
                        <input
                            type="date"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.reportDate} // Muestra la fecha de informe
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Sección Policial</label>
                        <input
                            type="text"
                            placeholder="Introduce la sección policial"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.policeSection} // Muestra la sección policial
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Observación</label>
                        <textarea
                            placeholder="Introduce una observación"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            rows="2"
                            value={user.observation} // Muestra la observación
                            readOnly
                        ></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-2">Núm. Prontuario Policial</label>
                        <input
                            type="text"
                            placeholder="Introduce el número de prontuario policial"
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                            value={user.numprontuario} // Muestra el número de prontuario policial
                            readOnly
                        />
                    </div>
                </div>
                <div className="flex items-center mt-4 space-x-4">
                    <div className="flex-1">
                        <label className="block text-sm font-semibold  mb-2">Foto de Firma</label>
                        <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                            <p className="text-gray-500 text-sm">Ningún archivo cargado</p>
                        </div>
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-semibold  mb-2">Foto de Huella Dactilar</label>
                        <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                            <p className="text-gray-500 text-sm">Ningún archivo cargado</p>
                        </div>
                    </div>
                </div>

                <div className="flex-1 mt-3">
                    <label className="block text-sm font-semibold  mb-2">Oficio de Egreso</label>
                    <div className="border border-gray-300 p-2 rounded-md bg-gray-50 mt-1">
                        <p className="text-gray-500 text-sm">Ningún archivo cargado</p>
                    </div>
                </div>

                <button
                    className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 text-xs mt-10"
                    onClick={handleVolver}
                >
                    Menu Principal
                </button>

            </div>

        </div>
    );
};

export default FichaIngreso;
