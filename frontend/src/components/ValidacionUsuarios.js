import React, { useState,useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const ValidacionUsuarios = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showValidationSuccessModal, setShowValidationSuccessModal] = useState(false);
    const [showInvalidationSuccessModal, setShowInvalidationSuccessModal] = useState(false);

    const data = Array(50).fill({
        name: 'Juan Carlos López',
        dni: '18273984',
        area: 'Psicologia',
        unidad: '4',
        usuario: 'juancarloslopez',
    });

    const handleConfirm = () => {
        if (confirmationAction === 'validate') {
            console.log('Usuario validado:', selectedUser);
            setShowValidationSuccessModal(true);
        } else if (confirmationAction === 'invalidate') {
            console.log('Usuario no validado:', selectedUser);
            setShowInvalidationSuccessModal(true);
        }
        handleCloseModal();
    };



    const handleOpenConfirmationModal = (user, action) => {
        setSelectedUser(user);
        setConfirmationAction(action);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setConfirmationAction(null);
        setSelectedUser(null);
    };

    useEffect(() => {
        if (showValidationSuccessModal) {
            const timer = setTimeout(() => setShowValidationSuccessModal(false), 3000);
            return () => clearTimeout(timer);
        }
        if (showInvalidationSuccessModal) {
            const timer = setTimeout(() => setShowInvalidationSuccessModal(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [showValidationSuccessModal, showInvalidationSuccessModal]);
    

    return (
        <div className="bg-general bg-cover bg-center min-h-screen flex flex-col p-4">
            {/* Modal de éxito de validación */}
            {showValidationSuccessModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg text-center">
                        <h2 className="text-lg font-bold mb-4 text-green-600">Usuario Validado Con Éxito</h2>
                        <p>El usuario ha sido validado correctamente.</p>
                    </div>
                </div>
            )}

            {/* Modal de éxito de invalidación */}
            {showInvalidationSuccessModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg text-center">
                        <h2 className="text-lg font-bold mb-4 text-red-600">Usuario No Validado Con Éxito</h2>
                        <p>El usuario ha sido marcado como no validado.</p>
                    </div>
                </div>
            )}

            <div className="bg-gray-300 flex-1 p-4 rounded-md flex flex-col">
                <div className="text-left text-base mb-4 md:mb-0">
                    <p><strong>Validación de Usuarios</strong></p>
                </div>
                <div className="flex-1 overflow-x-auto mt-5">
                    <div className="max-h-[calc(100vh-14rem)] overflow-y-auto">
                        <table className="w-full text-left bg-white rounded-md shadow-md text-sm">
                            <thead className="bg-gray-400">
                                <tr>
                                    <th className="p-2 border">#</th>
                                    <th className="p-2 border">Nombre/s y Apellido/s</th>
                                    <th className="p-2 border">DNI</th>
                                    <th className="p-2 border">Área</th>
                                    <th className="p-2 border">Unidad</th>
                                    <th className="p-2 border">Usuario</th>
                                    <th className="p-2 border w-48">Validar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.slice(0, 16).map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="p-2 border">{index + 1}</td>
                                        <td className="p-2 border">{item.name}</td>
                                        <td className="p-2 border">{item.dni}</td>
                                        <td className="p-2 border">{item.area}</td>
                                        <td className="p-2 border">{item.unidad}</td>
                                        <td className="p-2 border">{item.usuario}</td>
                                        <td className="p-2 border text-center">
                                            <div className="flex justify-center space-x-2">
                                                <button
                                                    onClick={() => handleOpenConfirmationModal(item, 'validate')}
                                                    className="bg-green-700 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                                                >
                                                    Validar
                                                </button>
                                                <button
                                                    onClick={() => handleOpenConfirmationModal(item, 'invalidate')}
                                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 text-sm"
                                                >
                                                    No Validar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => navigate('/administrarusuarios')}
                        className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-sm"
                    >
                        Volver
                    </button>
                </div>
            </div>

            {/* Modal de confirmación */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Confirmación"
                className="flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
                style={{
                    content: {
                        maxWidth: '90%',
                        width: '400px',
                        maxHeight: '90%',
                        height: 'auto',
                        margin: 'auto',
                        padding: '20px',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                    },
                }}
            >
                <div className="w-full text-center">
                    <h2 className="text-lg font-semibold mb-4">Confirmación</h2>
                    <p className="mb-4">¿Estás seguro de que deseas {confirmationAction === 'validate' ? 'validar' : 'no validar'} al usuario <strong>{selectedUser?.name}</strong>?</p>
                    <div className="flex justify-center gap-4">
                        <button
                            type="button"
                            onClick={handleConfirm}
                            className={`text-white px-4 py-2 rounded-md ${confirmationAction === 'validate' ? 'bg-green-500 hover:bg-green-600' : 'bg-red-600 hover:bg-red-700'}`}
                        >
                            {confirmationAction === 'validate' ? 'Validar' : 'No Validar'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ValidacionUsuarios;
