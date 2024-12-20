import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { HiEye, HiEyeOff } from 'react-icons/hi';

Modal.setAppElement('#root');

const AdministrarUsuarios = () => {
    const [searchDNI, setSearchDNI] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
    const [data, setData] = useState([]);

    const areas = ["Salud", "Trabajo", "Judicial", "Social", "Criminología", "Psicología"];

    const handleConfirmDelete = () => {
        setData((prevData) => prevData.filter((user) => user.dni !== selectedUser.dni));

        handleCloseConfirmationModal();

        setShowDeleteSuccessModal(true);
        setTimeout(() => setShowDeleteSuccessModal(false), 3000);
    };

    useEffect(() => {
        const generateRandomData = () => {
            return Array.from({ length: 10 }, () => ({
                name: 'Juan Carlos Lopez',
                dni: Math.floor(Math.random() * 100000000),
                area: areas[Math.floor(Math.random() * areas.length)],
                unidad: Math.floor(Math.random() * 10) + 1,
                usuario: 'usuario',
                password: generateRandomPassword(),
            }));
        };

        if (data.length === 0) {
            setData(generateRandomData());
        }
    }, [data]); 

    const generateRandomPassword = (length = 12) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            password += characters[randomIndex];
        }
        return password;
    };

    const filteredData = data.filter((item) => {
        const matchesDNI = searchDNI === '' || (item.dni && item.dni.toString().startsWith(searchDNI));
        const matchesArea = selectedArea ? item.area === selectedArea : true;
        return matchesDNI && matchesArea;
    });

    const [initialUser, setInitialUser] = useState(null);
    const [isSaveEnabled, setIsSaveEnabled] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (selectedUser) {
            switch (name) {
                case "dni":
                    const validDNI = value.replace(/\D/g, '');
                    setSelectedUser(prevState => ({
                        ...prevState,
                        [name]: validDNI,
                    }));
                    break;

                case "name":
                case "apellido":
                    const validName = value.replace(/[^a-zA-Z\s]/g, '');
                    setSelectedUser(prevState => ({
                        ...prevState,
                        [name]: validName,
                    }));
                    break;

                case "usuario":
                    const validUsuario = value.replace(/[^a-zA-Z0-9]/g, '');
                    setSelectedUser(prevState => ({
                        ...prevState,
                        [name]: validUsuario,
                    }));
                    break;

                case "password":
                    const validPassword = value.replace(/[^a-zA-Z0-9]/g, '');
                    setSelectedUser(prevState => ({
                        ...prevState,
                        [name]: validPassword,
                    }));
                    break;

                case "area":
                case "unidad":
                    setSelectedUser(prevState => ({
                        ...prevState,
                        [name]: value,
                    }));
                    break;

                default:
                    setSelectedUser(prevState => ({
                        ...prevState,
                        [name]: value,
                    }));
                    break;
            }
        }
    };

    const handleSave = () => {
        const fieldsAreEmpty = Object.keys(selectedUser).some((key) => {
            return (
                selectedUser[key] === '' ||
                selectedUser[key] === null ||
                selectedUser[key] === undefined
            );
        });

        if (fieldsAreEmpty) {
            alert('Por favor, complete todos los campos antes de guardar.');
            return;
        }

        const passwordValue = String(selectedUser.password).trim();
        if (passwordValue.length < 8 || passwordValue.length > 20) {
            alert('La contraseña debe tener entre 8 y 20 caracteres.');
            return;
        }

        const dniValue = String(selectedUser.dni).trim();
        if (dniValue.length !== 8) {
            alert('El DNI debe tener exactamente 8 caracteres.');
            return;
        }

        const hasRealChanges = Object.keys(initialUser).some((key) => {
            if (key === 'originalDNI') return false;
            return selectedUser[key].toString().trim() !== initialUser[key].toString().trim();
        });

        if (!hasRealChanges) {
            alert('No se realizaron cambios en los campos.');
            return;
        }

        setData((prevData) =>
            prevData.map((user) =>
                user.dni === initialUser.originalDNI ? selectedUser : user
            )
        );

        handleCloseModal();
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 3000);
    };

    useEffect(() => {
        const isValidPassword = selectedUser?.password && selectedUser.password.length >= 8 && selectedUser.password.length <= 20;
        const hasChanges = Object.keys(selectedUser || {}).some(key => selectedUser[key] !== initialUser[key]);

        if (hasChanges && isValidPassword) {
            setIsSaveEnabled(true);
        } else {
            setIsSaveEnabled(false);
        }
    }, [selectedUser, initialUser]);

    const handleCloseModal = () => {
        setModalIsOpen(false);

        if (selectedUser && initialUser) {
            setSelectedUser({ ...initialUser });
        }
    };

    useEffect(() => {
        if (selectedUser === null && initialUser !== null) {
            setSelectedUser(initialUser);
        }
    }, [initialUser, selectedUser]);

    const handleOpenModal = (user) => {
        setSelectedUser(user);
        setInitialUser({ ...user, originalDNI: user.dni });
        setModalIsOpen(true);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(prevState => !prevState);
    };


    const handleOpenConfirmationModal = (user) => {
        setSelectedUser(user);
        setConfirmationModalIsOpen(true);
    };
    const handleCloseConfirmationModal = () => {
        setConfirmationModalIsOpen(false);
    };

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="bg-general bg-cover bg-center min-h-screen flex flex-col p-4">
            {showSuccessModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg text-center">
                        <h2 className="text-lg font-bold mb-4 text-green-700">Cambios Guardados Con Éxito</h2>
                        <p>Los cambios se han realizado correctamente.</p>
                    </div>
                </div>
            )}

            {showDeleteSuccessModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-md shadow-lg text-center">
                        <h2 className="text-lg font-bold mb-4 text-red-600">Usuario Eliminado Con Éxito</h2>
                        <p>El usuario ha sido eliminado correctamente.</p>
                    </div>
                </div>
            )}

            <div className="bg-gray-100 flex-1 p-4 rounded-md flex flex-col">
                <div className="text-left text-base mb-4 md:mb-0">
                    <p className='text-l mb-5'><strong>Administrar Usuarios</strong></p>
                </div>
                <div className="flex items-center mb-4 space-x-4">
                    <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                        <label htmlFor="searchDNI" className="text-base font-semibold text-sm">Buscar DNI:</label>
                        <input
                            type="text"
                            id="searchDNI"
                            placeholder="DNI"
                            value={searchDNI}
                            onChange={(e) => setSearchDNI(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded text-sm"
                        />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="area" className="mr-3 text-base font-semibold text-sm">Área:</label>
                        <select
                            id="area"
                            value={selectedArea}
                            onChange={(e) => setSelectedArea(e.target.value)}
                            className="w-full p-1 border border-gray-300 rounded text-sm text-gray-400"
                        >
                            <option value="">Seleccione un área</option>
                            <option value="Salud">Salud</option>
                            <option value="Trabajo">Trabajo</option>
                            <option value="Judicial">Judicial</option>
                            <option value="Social">Social</option>
                            <option value="Criminología">Criminología</option>
                            <option value="Psicología">Psicología</option>
                        </select>
                    </div>
                </div>

                <div className="flex-1 overflow-x-auto mt-10">
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
                                    <th className="p-2 border w-44">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.slice(0, 10).map((item, index) => (
                                    <tr key={index} className="hover:bg-gray-100">
                                        <td className="p-2 border text-xs">{index + 1}</td>
                                        <td className="p-2 border text-xs">{item.name}</td>
                                        <td className="p-2 border text-xs">{item.dni}</td>
                                        <td className="p-2 border text-xs">{item.area}</td>
                                        <td className="p-2 border text-xs">{item.unidad}</td>
                                        <td className="p-2 border text-xs">{item.usuario}</td>
                                        <td className="p-2 border text-center">
                                            <div className="flex justify-center space-x-1">
                                                <button
                                                    onClick={() => handleOpenModal(item)}
                                                    className="bg-green-700 text-white px-2 py-1 rounded hover:bg-green-600 text-xs"
                                                >
                                                    Modificar
                                                </button>
                                                <button
                                                    onClick={() => handleOpenConfirmationModal(item)}
                                                    className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 text-xs"
                                                >
                                                    Eliminar
                                                </button>
                                                <button
                                                    onClick={() => navigate('/historialmovimientosusuarios')}
                                                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-400 text-xs"
                                                >
                                                    Historial de movimientos
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
                        onClick={() => navigate('/administrador')}
                        className="bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600 text-xs"
                    >
                        Volver
                    </button>
                    <button
                        onClick={() => navigate('/validacionusuarios')}
                        className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 text-xs"
                    >
                        Validación de Usuarios
                    </button>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Modificar Usuario"
                className="flex items-center justify-center"
                overlayClassName="fixed inset-0 bg-gray-800 bg-opacity-50"
                style={{
                    content: {
                        maxWidth: '90%',
                        width: '600px',
                        maxHeight: '90%',
                        height: 'auto',
                        margin: 'auto',
                        padding: '20px',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        overflow: 'auto',
                        display: 'flex',
                        flexDirection: 'column',
                    },
                }}
            >
                <div className="w-full">
                    <h2 className="text-lg font-bold mb-4">Modificar Usuario</h2>
                    <div className="border border-gray-400 p-4 rounded-lg shadow-md">


                        <form>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-semibold mb-2">Nombre/s y Apellido/s</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={selectedUser?.name || ''}
                                    onChange={handleChange}
                                    className="w-full p-1 border border-gray-300 rounded text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dni" className="block text-sm font-semibold mb-2">DNI</label>
                                <input
                                    type="text"
                                    id="dni"
                                    name="dni"
                                    value={selectedUser?.dni || ''}
                                    onChange={handleChange}
                                    maxLength={8}
                                    className="w-full p-1 border border-gray-300 rounded text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="area" className="block text-sm font-semibold mb-2">Área</label>
                                <select
                                    id="area"
                                    name="area"
                                    value={selectedUser?.area || ''}
                                    onChange={handleChange}
                                    className="w-full p-1 border border-gray-300 rounded text-sm"
                                >
                                    <option value="" disabled>Seleccione un área</option>
                                    <option value="Salud">Salud</option>
                                    <option value="Trabajo">Trabajo</option>
                                    <option value="Judicial">Judicial</option>
                                    <option value="Social">Social</option>
                                    <option value="Criminología">Criminología</option>
                                    <option value="Psicología">Psicología</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="unidad" className="block text-sm font-semibold mb-2">Unidad</label>
                                <select
                                    id="unidad"
                                    name="unidad"
                                    value={selectedUser?.unidad || ''}
                                    onChange={handleChange}
                                    className="w-full p-1 border border-gray-300 rounded text-sm"
                                >
                                    <option value="" disabled>Seleccione una unidad</option>
                                    {Array.from({ length: 11 }, (_, i) => (
                                        <option key={i} value={i + 1}>Unidad {i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="usuario" className="block text-sm font-semibold mb-2">Usuario</label>
                                <input
                                    type="text"
                                    id="usuario"
                                    name="usuario"
                                    value={selectedUser?.usuario || ''}
                                    onChange={handleChange}
                                    className="w-full p-1 border border-gray-300 rounded text-sm"
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-semibold mb-2">Contraseña</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        value={selectedUser?.password || ''}
                                        onChange={handleChange}
                                        className="w-full p-1 border border-gray-300 rounded text-sm"
                                    />
                                    <button
                                        type="button"
                                        onClick={handleTogglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-between mt-3">
                        <button
                            type="button"
                            onClick={handleSave}
                            className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600 text-xs"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-xs"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={confirmationModalIsOpen}
                onRequestClose={handleCloseConfirmationModal}
                contentLabel="Confirmar Eliminación"
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
                    },
                }}
            >
                <div className="w-full">
                    <h2 className="text-lg font-semibold mb-4">Confirmar Eliminación</h2>
                    <p className="mb-4">
                        ¿Estás seguro de que deseas eliminar a {selectedUser?.name}?
                    </p>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={handleConfirmDelete}
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 text-xs"
                        >
                            Eliminar
                        </button>
                        <button
                            type="button"
                            onClick={handleCloseConfirmationModal}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-xs"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AdministrarUsuarios;
