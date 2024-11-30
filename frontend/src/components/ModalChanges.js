import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const Modal = ({ isOpen, onClose, historialCambios, campoMapeado }) => {
    if (!isOpen) return null;

    const noChanges = Object.keys(historialCambios).length === 0;

    const handleDownloadZip = (imagenes) => {
        const zip = new JSZip();
        const promises = [];

        imagenes.forEach((file, index) => {
            const fetchPromise = fetch(file.url)
                .then(response => response.blob())
                .then(blob => {
                    zip.file(file.name, blob);
                })
                .catch(error => console.error('Error al agregar archivo al ZIP:', error));

            promises.push(fetchPromise);
        });

        Promise.all(promises).then(() => {
            zip.generateAsync({ type: 'blob' }).then(content => {
                saveAs(content, 'tatuajes-marcas-distintivas.zip');
            });
        });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-w-3xl">
                <h2 className="text-lg font-bold mb-2">Historial de Cambios</h2>

                {noChanges ? (
                    <p className="text-center text-sm text-gray-500 mt-4">No hay cambios registrados aún.</p>
                ) : (
                    <div className="overflow-y-auto max-h-[400px] md:max-h-[500px] lg:max-h-[600px] border border-gray-300 p-2 rounded mt-2 bg-gray-50">
                        {Object.entries(historialCambios).map(([field, { fechaCarga, ultimaModificacion, imagenUrl, imagenNombre }]) => (
                            <div key={field} className="mb-4 p-4 border-b border-gray-200 rounded-md">
                                <h3 className="block text-sm font-bold mb-1">{campoMapeado[field] || field}</h3>
                                <p className="text-sm text-gray-500 mt-2">
                                    <strong>Fecha de carga:</strong> {fechaCarga ? fechaCarga : 'No disponible'}
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    <strong>Última modificación:</strong> {ultimaModificacion ? ultimaModificacion : 'No disponible'}
                                </p>

                                {imagenUrl && (
                                    <div className="mt-2">
                                        <button
                                            className="ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                            onClick={() => handleDownloadZip(imagenUrl)}
                                        >
                                            Descargar Archivo/s
                                        </button>
                                    </div>
                                )}

                            </div>
                        ))}
                    </div>
                )}

                {/* Botón de cierre en la parte inferior derecha */}
                <div className="flex justify-end mt-4">
                    <button
                        className="px-2 py-1 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50"
                        onClick={onClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
