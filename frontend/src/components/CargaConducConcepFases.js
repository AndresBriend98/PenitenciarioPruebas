import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

const CargaConducConcepFases = () => {
    const navigate = useNavigate();
    const [faseActual, setFaseActual] = useState('Ninguna'); // Inicialmente "Ninguna"
    const [fechas, setFechas] = useState({
        Socializacion: { inicio: '', fin: '' },
        Consolidacion: { inicio: '', fin: '' },
        Confianza: { inicio: '', fin: '' },
        PeriodoObservacion: { inicio: '', fin: '' },
        FasePrueba: { inicio: '', fin: '' }
    });
    // Función para determinar la fase actual en base a las fechas ingresadas
    const determinarFaseActual = () => {
        if (fechas['PeriodoObservacion'].inicio && !fechas['PeriodoObservacion'].fin) {
            return 'Periodo de Observación';
        } else if (fechas['Socializacion'].inicio && !fechas['Socializacion'].fin) {
            return 'Fase de Tratamiento (Socializacion)';
        } else if (fechas['Consolidacion'].inicio && !fechas['Consolidacion'].fin) {
            return 'Fase de Tratamiento (Consolidacion)';
        } else if (fechas['Confianza'].inicio && !fechas['Confianza'].fin) {
            return 'Fase de Tratamiento (Confianza)';
        } else if (fechas['FasePrueba'].inicio && !fechas['FasePrueba'].fin) {
            return 'Fase de Prueba';
        }
        return 'Ninguna';
    };

    // Función para determinar si se puede habilitar la fecha de inicio de la fase actual
    const puedeHabilitarInicio = (fase) => {
        if (fase === 'PeriodoObservacion') {
            return true;  // El campo de fecha de inicio de "Periodo de Observación" siempre está habilitado
        } else if (fase === 'Socializacion') {
            return fechas['PeriodoObservacion']?.fin !== '';
        } else if (fase === 'Consolidacion') {
            return fechas['Socializacion']?.fin !== '';
        } else if (fase === 'Confianza') {
            return fechas['Consolidacion']?.fin !== '';
        } else if (fase === 'FasePrueba') {
            return fechas['Confianza']?.fin !== '';
        }
        return false;
    };

    // Función para determinar si se puede habilitar la fecha de fin de la fase actual
    const puedeHabilitarFin = (fase) => {
        if (fechas[fase]?.inicio !== '') {
            return true;
        }
        return false;
    };
    const handleDateChange = (fase, tipo, date) => {
        setFechas({
            ...fechas,
            [fase]: {
                ...fechas[fase],
                [tipo]: date
            }
        });

        // Actualizar la fase actual después de ingresar una fecha de inicio o fin
        if (tipo === 'inicio' || tipo === 'fin') {
            setFaseActual(determinarFaseActual());
        }

        // Si es la fecha de fin, avanzar a la siguiente fase
        if (tipo === 'fin' && date) {
            if (fase === 'Socializacion' && fechas['Socializacion'].fin) {
                setFaseActual('Fase de Tratamiento (Consolidacion)');
            } else if (fase === 'Consolidacion' && fechas['Consolidacion'].fin) {
                setFaseActual('Fase de Tratamiento (Confianza)');
            } else if (fase === 'Confianza' && fechas['Confianza'].fin) {
                setFaseActual('Fase de Prueba');
            } else if (fase === 'PeriodoObservacion' && fechas['PeriodoObservacion'].fin) {
                setFaseActual('Fase de Tratamiento (Socializacion)');
            }
        }
    };

    const [errors, setErrors] = useState({
        conducta: '',
        concepto: '',
        trimestre: '',
        ano: '',
        puntajeConc: '',
        puntajeCond: ''
    });

    const [evolucion, setEvolucion] = useState('');

    const handleAgregarEvolucion = () => {
        if (evolucion.trim() === '' || fechaEvolucion.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                evolucion: 'La descripción y la fecha no pueden estar vacías.'
            }));
            return;
        }

        const fechaCarga = new Date().toLocaleString(); // Obtener la fecha de carga actual

        setHistorialEvolucion([...historialEvolucion, { descripcion: evolucion, fecha: fechaEvolucion, fechaCarga }]);
        setEvolucion('');
        setFechaEvolucion('');
        setErrors((prevErrors) => ({ ...prevErrors, evolucion: '' }));
    };

    const [confirmDeleteArchivoModal, setConfirmDeleteArchivoModal] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);

    const handleEliminarArchivo = () => {
        if (selectedItemIndex !== null) {
            const newHistorial = [...historialCorrectivo];
            const newDate = new Date().toLocaleString(); // Obtiene la fecha actual

            // Verificamos si la propiedad `fechasDeEliminacion` existe, si no, la inicializamos como arreglo
            if (!newHistorial[selectedItemIndex].fechasDeEliminacion) {
                newHistorial[selectedItemIndex].fechasDeEliminacion = [];
            }

            // Se agrega la nueva fecha de eliminación al arreglo de fechasDeEliminacion
            newHistorial[selectedItemIndex].fechasDeEliminacion.push(newDate);

            // Se elimina el archivo adjunto y se mantiene el registro de fechas
            newHistorial[selectedItemIndex].disposicion = null;  // Elimina el archivo
            setHistorialCorrectivo(newHistorial);  // Actualiza el estado con la nueva fecha y archivo eliminado
        }

        setConfirmDeleteArchivoModal(false); // Cierra el modal
        setSelectedItemIndex(null); // Resetea el índice
    };

    const handleCloseDeleteArchivoModal = () => {
        setConfirmDeleteArchivoModal(false); // Cierra el modal sin eliminar
        setSelectedItemIndex(null); // Resetea el índice
    };


    const [disposicion, setDisposicion] = useState(null); // Estado para manejar el archivo de disposición
    const [historialCorrectivo, setHistorialCorrectivo] = useState([]);
    const [fechaEvolucion, setFechaEvolucion] = useState('');
    const [historialEvolucion, setHistorialEvolucion] = useState([]);
    const [fechaInicioCorrectivo, setFechaInicioCorrectivo] = useState('');
    const [fechaFinCorrectivo, setFechaFinCorrectivo] = useState('');
    const [items, setItems] = useState([]);
    const [trimestre, setTrimestre] = useState('');
    const [ano, setAno] = useState('');
    const [conducta, setConducta] = useState('');
    const [puntajeCond, setPuntajeCond] = useState('');
    const [puntajeConc, setPuntajeConc] = useState('');
    const [concepto, setConcepto] = useState('');
    const [correctivo, setCorrectivo] = useState('');

    const [nombreDisposicion, setNombreDisposicion] = useState(''); // Estado para almacenar el nombre del archivo

    const handleAgregarCorrectivo = () => {
        const newErrors = {}; // Crear un objeto de errores

        // Validaciones
        if (correctivo.trim() === '') {
            newErrors.correctivo = 'La descripción es obligatoria.';
        }

        if (fechaInicioCorrectivo.trim() === '') {
            newErrors.fechaInicioCorrectivo = 'La fecha de inicio es obligatoria.';
        }

        if (fechaFinCorrectivo.trim() === '') {
            newErrors.fechaFinCorrectivo = 'La fecha de fin es obligatoria.';
        }

        // Si hay errores, actualiza el estado de errores y no agregues el correctivo
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const fechaCarga = new Date().toLocaleString(); // Obtener la fecha de carga actual

        // Crear un objeto para el nuevo historial de correctivos
        const nuevoCorrectivo = {
            descripcion: correctivo,
            fechaInicio: fechaInicioCorrectivo,
            fechaFin: fechaFinCorrectivo,
            fechaCarga,
            disposicion, // Incluir el archivo de disposición
        };

        // Verificar si hay archivo de disposición y si es así, registrar la fecha de carga de disposición
        if (disposicion) {
            const fechaDisposicion = new Date().toLocaleString(); // Fecha de carga de disposición

            // Si no existe `fechasDeCargaDisposicion`, inicializarlo como un arreglo
            if (!nuevoCorrectivo.fechasDeCargaDisposicion) {
                nuevoCorrectivo.fechasDeCargaDisposicion = [];
            }

            // Registrar la fecha de carga de disposición
            nuevoCorrectivo.fechasDeCargaDisposicion.push(fechaDisposicion);
        }

        // Agregar el nuevo correctivo al historial
        setHistorialCorrectivo([...historialCorrectivo, nuevoCorrectivo]);

        // Limpiar campos
        setCorrectivo('');
        setFechaInicioCorrectivo('');
        setFechaFinCorrectivo('');
        setDisposicion(null); // Limpiar el archivo de disposición
        setErrors({}); // Limpiar errores
    };

    const handleAddItem = () => {
        let hasErrors = false;
        const newErrors = {
            trimestre: '',
            ano: '',
            conducta: '',
            puntajeConc: '',
            puntajeCond: '',
            concepto: ''
        };

        if (!trimestre) {
            newErrors.trimestre = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!ano) {
            newErrors.ano = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!conducta) {
            newErrors.conducta = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!puntajeConc) {
            newErrors.puntajeConc = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!puntajeCond) {
            newErrors.puntajeCond = 'Este campo es obligatorio.';
            hasErrors = true;
        }
        if (!concepto) {
            newErrors.concepto = 'Este campo es obligatorio.';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(prevErrors => ({
                ...prevErrors,
                ...newErrors
            }));
        } else {
            const fechaCarga = new Date().toLocaleString(); // Obtener la fecha de carga actual

            setItems([...items, { trimestre, ano, conducta, puntajeCond, concepto, puntajeConc, fechaCarga }]);
            setTrimestre('');
            setAno('');
            setConducta('');
            setPuntajeCond('');
            setPuntajeConc('');
            setConcepto('');
            setErrors({
                trimestre: '',
                ano: '',
                conducta: '',
                puntajeConc: '',
                puntajeCond: '',
                concepto: ''
            });
        }
    };

    return (
        <div className="bg-general bg-cover bg-center min-h-screen p-4 flex flex-col">
            <Header />
            <div className="bg-white p-4 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Carga de Conducta-Concepto-Fases</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-lg font-bold mb-4">Conducta y Concepto</h2>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Trimestre:</label>
                            <select
                                value={trimestre}
                                onChange={(e) => setTrimestre(e.target.value)}
                                className={`border rounded p-2 w-full text-sm ${errors.trimestre ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder='Seleccione un trimestre'
                            >
                                <option value="" disabled>Seleccione un trimestre</option>
                                {/* Opciones de trimestres */}
                                <option value="1">Trimestre 1</option>
                                <option value="2">Trimestre 2</option>
                                <option value="3">Trimestre 3</option>
                                <option value="4">Trimestre 4</option>
                            </select>
                            {errors.trimestre && <p className="text-red-500 text-sm mt-1">{errors.trimestre}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Año:</label>
                            <input
                                type="number"
                                value={ano}
                                onChange={(e) => {
                                    if (e.target.value.length <= 4) {
                                        setAno(e.target.value);
                                    }
                                }}
                                className={`border rounded p-2 w-full text-sm ${errors.ano ? 'border-red-500' : 'border-gray-300'}`}
                                min="1000"
                                max="9999"
                                step="1"
                                placeholder='Ingrese el año'
                            />
                            {errors.ano && <p className="text-red-500 text-sm mt-1">{errors.ano}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Conducta:</label>
                            <select
                                value={conducta}
                                onChange={(e) => setConducta(e.target.value)}
                                className={`border rounded p-2 w-full text-sm ${errors.conducta ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="" disabled>Seleccione una conducta</option>
                                {/* Opciones de conducta */}
                                <option value="Excelente">Excelente</option>
                                <option value="Muy Buena">Muy buena</option>
                                <option value="Buena">Buena</option>
                                <option value="Regular">Regular</option>
                                <option value="Mala">Mala</option>
                                <option value="Muy Mala">Muy Mala</option>
                            </select>
                            {errors.conducta && <p className="text-red-500 text-sm mt-1">{errors.conducta}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Puntaje Conducta:</label>
                            <input
                                type="number"
                                value={puntajeCond}
                                onChange={(e) => {
                                    if (e.target.value >= 0 && e.target.value <= 10) {
                                        setPuntajeCond(e.target.value);
                                    }
                                }}
                                className={`border rounded p-2 w-full text-sm ${errors.puntajeCond ? 'border-red-500' : 'border-gray-300'}`}
                                min="0"
                                max="10"
                                step="1"
                                placeholder='Ingrese el puntaje del conducta'
                            />
                            {errors.puntajeCond && <p className="text-red-500 text-sm mt-1">{errors.puntajeCond}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Concepto:</label>
                            <select
                                value={concepto}
                                onChange={(e) => setConcepto(e.target.value)}
                                className={`border rounded p-2 w-full text-sm ${errors.concepto ? 'border-red-500' : 'border-gray-300'}`}
                            >
                                <option value="" disabled>Seleccione un concepto</option>
                                {/* Opciones de concepto */}
                                <option value="Excelente">Excelente</option>
                                <option value="Muy Buena">Muy buena</option>
                                <option value="Buena">Buena</option>
                                <option value="Regular">Regular</option>
                                <option value="Mala">Mala</option>
                                <option value="Muy Mala">Muy Mala</option>
                            </select>
                            {errors.concepto && <p className="text-red-500 text-sm mt-1">{errors.concepto}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-1">Puntaje Concepto:</label>
                            <input
                                type="number"
                                value={puntajeConc}
                                onChange={(e) => {
                                    if (e.target.value >= 0 && e.target.value <= 10) {
                                        setPuntajeConc(e.target.value);
                                    }
                                }}
                                className={`border rounded p-2 w-full text-sm ${errors.puntajeConc ? 'border-red-500' : 'border-gray-300'}`}
                                min="0"
                                max="10"
                                step="1"
                                placeholder='Ingrese el puntaje del concepto'
                            />
                            {errors.puntajeConc && <p className="text-red-500 text-sm mt-1">{errors.puntajeConc}</p>}
                        </div>

                        <div className="flex justify-center mb-4">
                            <button
                                onClick={handleAddItem}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        <table className="min-w-full table-auto border-collapse border border-gray-300 overflow-x-auto overflow-y-auto block md:table md:overflow-visible">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Trimestre</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Año</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Conducta</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Puntaje Conducta</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Concepto</th>
                                    <th className="px-4 py-2 border border-gray-300 text-left text-sm">Puntaje Concepto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.trimestre}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.ano}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.conducta}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.puntajeCond}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.concepto}</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">{item.puntajeConc}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Sección de Fase Actual */}
                    <div className="bg-white p-4 rounded-md shadow-md">
                        <h2 className="text-md font-bold mb-4 flex items-center">
                            <span className="font-bold mr-2">Fase Actual:</span>
                            <span className="text-sm border border-gray-300 bg-gray-100 p-2 rounded">{faseActual}</span>
                        </h2>

                        {/* Sección de Periodo de Observación */}
                        <div className="bg-white p-4 rounded-md shadow-md mt-4">
                            <h2 className="text-md font-bold mb-4 flex items-center">
                                <span className="font-bold mr-2">Periodo de Observación:</span>
                            </h2>
                            <table className="min-w-full table-auto border-collapse border border-gray-300 overflow-x-auto overflow-y-auto block md:table md:overflow-visible">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fase</th>
                                        <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fecha inicio</th>
                                        <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fecha fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">Periodo de Observación</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">
                                            <input
                                                type="date"
                                                value={fechas['PeriodoObservacion']?.inicio || ''}
                                                onChange={(e) => handleDateChange('PeriodoObservacion', 'inicio', e.target.value)}
                                                className={`border p-1 w-full text-sm rounded ${fechas['PeriodoObservacion']?.inicio ? 'border-gray-300' : 'border-gray-300'}`}
                                                disabled={false}  // Siempre habilitado para el Periodo de Observación
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">
                                            <input
                                                type="date"
                                                value={fechas['PeriodoObservacion']?.fin || ''}
                                                onChange={(e) => handleDateChange('PeriodoObservacion', 'fin', e.target.value)}
                                                className={`border p-1 w-full text-sm rounded ${!fechas['PeriodoObservacion']?.inicio ? 'bg-gray-200' : 'border-gray-300'}`}
                                                disabled={!fechas['PeriodoObservacion']?.inicio}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Sección de Fase de Tratamiento */}
                        <div className="bg-white p-4 rounded-md shadow-md mt-4">
                            <h2 className="text-md font-bold mb-4 flex items-center">
                                <span className="font-bold mr-2">Fase de Tratamiento:</span>
                            </h2>
                            <table className="min-w-full table-auto border-collapse border border-gray-300 overflow-x-auto overflow-y-auto block md:table md:overflow-visible">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fase</th>
                                        <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fecha inicio</th>
                                        <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fecha fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {['Socializacion', 'Consolidacion', 'Confianza'].map((fase) => (
                                        <tr key={fase}>
                                            <td className="px-4 py-2 border border-gray-300 text-left text-sm">{fase}</td>
                                            <td className="px-4 py-2 border border-gray-300 text-left text-sm">
                                                <input
                                                    type="date"
                                                    value={fechas[fase]?.inicio || ''}
                                                    onChange={(e) => handleDateChange(fase, 'inicio', e.target.value)}
                                                    className={`border p-1 w-full text-sm rounded ${puedeHabilitarInicio(fase) ? 'border-gray-300' : 'bg-gray-200'}`}
                                                    disabled={!puedeHabilitarInicio(fase)}
                                                />
                                            </td>
                                            <td className="px-4 py-2 border border-gray-300 text-left text-sm">
                                                <input
                                                    type="date"
                                                    value={fechas[fase]?.fin || ''}
                                                    onChange={(e) => handleDateChange(fase, 'fin', e.target.value)}
                                                    className={`border p-1 w-full text-sm rounded ${!puedeHabilitarFin(fase) ? 'bg-gray-200' : 'border-gray-300'}`}
                                                    disabled={!puedeHabilitarFin(fase)}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Sección de Fase de Prueba */}
                        <div className="bg-white p-4 rounded-md shadow-md mt-4">
                            <h2 className="text-md font-bold mb-4 flex items-center">
                                <span className="font-bold mr-2">Fase de Prueba:</span>
                            </h2>
                            <table className="min-w-full table-auto border-collapse border border-gray-300 overflow-x-auto overflow-y-auto block md:table md:overflow-visible">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fase</th>
                                        <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fecha inicio</th>
                                        <th className="px-4 py-2 border border-gray-300 text-left text-sm">Fecha fin</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">Fase de Prueba</td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">
                                            <input
                                                type="date"
                                                value={fechas['FasePrueba']?.inicio || ''}
                                                onChange={(e) => handleDateChange('FasePrueba', 'inicio', e.target.value)}
                                                className={`border p-1 w-full text-sm rounded ${puedeHabilitarInicio('FasePrueba') ? 'border-gray-300' : 'bg-gray-200'}`}
                                                disabled={!puedeHabilitarInicio('FasePrueba')}
                                            />
                                        </td>
                                        <td className="px-4 py-2 border border-gray-300 text-left text-sm">
                                            <input
                                                type="date"
                                                value={fechas['FasePrueba']?.fin || ''}
                                                onChange={(e) => handleDateChange('FasePrueba', 'fin', e.target.value)}
                                                className={`border p-1 w-full text-sm rounded ${!puedeHabilitarFin('FasePrueba') ? 'bg-gray-200' : 'border-gray-300'}`}
                                                disabled={!puedeHabilitarFin('FasePrueba')}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* Sección de Evolución */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-5">
                        <h2 className="text-lg font-bold">Evolución</h2>
                        <label className="block text-sm font-semibold mt-2">Descripción</label>
                        <textarea
                            value={evolucion}
                            onChange={(e) => setEvolucion(e.target.value)}
                            className={`w-full p-1 border ${errors.evolucion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            placeholder="Introduce la evolución aquí"
                        />
                        <label className="block text-sm font-semibold mt-2">Fecha</label>
                        <input
                            type="date"
                            value={fechaEvolucion}
                            onChange={(e) => setFechaEvolucion(e.target.value)}
                            className={`w-full p-1 border ${errors.evolucion ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.evolucion && <p className="text-red-500 text-sm">{errors.evolucion}</p>}
                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarEvolucion}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>
                        <h3 className="text-sm font-bold mt-4">Historial de Carga</h3>
                        <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-96 overflow-y-auto">
                            {historialEvolucion.length > 0 ? (
                                <ul className="mt-2">
                                    {historialEvolucion.map((item, index) => (
                                        <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                            <p className='text-sm'><strong>Descripción:</strong> {item.descripcion}</p>
                                            <p className='text-sm'><strong>Fecha:</strong> {item.fecha}</p>
                                            <div>
                                                <p className="text-sm text-gray-500 mt-2"><strong>Fecha de carga:</strong> {item.fechaCarga}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-gray-500 text-center">
                                    No hay historial de evolución registrado aún.
                                </p>
                            )}
                        </div>

                    </div>

                    {/* Sección de Correctivo Disciplinario */}
                    <div className="bg-white p-4 rounded-md shadow-md border border-gray-300 mt-4">
                        <h2 className="text-lg font-bold">Correctivo Disciplinario</h2>
                        <label className="block text-sm font-semibold mt-2">Descripción</label>
                        <textarea
                            value={correctivo}
                            onChange={(e) => setCorrectivo(e.target.value)}
                            className={`w-full p-1 border ${errors.correctivo ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                            placeholder="Introduce el correctivo aquí"
                        />
                        {errors.correctivo && <p className="text-red-500 text-sm">{errors.correctivo}</p>}

                        <label className="block text-sm font-semibold mt-2">Fecha Inicio</label>
                        <input
                            type="date"
                            value={fechaInicioCorrectivo}
                            onChange={(e) => setFechaInicioCorrectivo(e.target.value)}
                            className={`w-full p-1 border ${errors.fechaInicioCorrectivo ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.fechaInicioCorrectivo && <p className="text-red-500 text-sm">{errors.fechaInicioCorrectivo}</p>}

                        <label className="block text-sm font-semibold mt-2">Fecha Fin</label>
                        <input
                            type="date"
                            value={fechaFinCorrectivo}
                            onChange={(e) => setFechaFinCorrectivo(e.target.value)}
                            className={`w-full p-1 border ${errors.fechaFinCorrectivo ? 'border-red-500' : 'border-gray-300'} rounded text-sm mb-2`}
                        />
                        {errors.fechaFinCorrectivo && <p className="text-red-500 text-sm">{errors.fechaFinCorrectivo}</p>}

                        {/* Campo para subir archivo de disposición */}
                        <label className="block text-sm font-bold mt-2 mb-2">Disposición</label>
                        <input
                            type="file"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                setDisposicion(file); // Asigna el archivo al estado
                                setNombreDisposicion(file ? file.name : ''); // Almacena el nombre del archivo
                            }}
                            accept=".pdf,.doc,.docx"
                            className="mt-1 mb-2 text-sm w-full border border-gray-300 rounded p-1"
                        />

                        <div className="flex justify-center">
                            <button
                                onClick={handleAgregarCorrectivo}
                                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 text-xs"
                            >
                                Cargar
                            </button>
                        </div>

                        {/* Historial de Carga */}
                        <div className="bg-white p-4 rounded-md shadow-md">
                            <h3 className="text-sm font-bold mt-4">Historial de Carga</h3>
                            <div className="mt-3 border border-gray-300 rounded bg-gray-50 p-2 max-h-96 overflow-y-auto">
                                {historialCorrectivo.length > 0 ? (
                                    <ul className="mt-2">
                                        {historialCorrectivo.map((item, index) => (
                                            <li key={index} className="px-4 py-2 border border-gray-300 text-left mb-2 rounded bg-white shadow-sm">
                                                <p className="text-sm"><strong>Descripción:</strong> {item.descripcion}</p>
                                                <p className="text-sm"><strong>Fecha Inicio:</strong> {item.fechaInicio}</p>
                                                <p className="text-sm"><strong>Fecha Fin:</strong> {item.fechaFin}</p>

                                                <span className="text-sm"><strong>Disposición:</strong></span>

                                                {/* Si no hay archivo cargado */}
                                                {!item.disposicion ? (
                                                    <input
                                                        type="file"
                                                        onChange={(e) => {
                                                            const newHistorial = [...historialCorrectivo];
                                                            const newDate = new Date().toLocaleString(); // Obtiene la fecha actual

                                                            // Si no existe la fecha de carga, asignamos la fecha de carga solo una vez
                                                            if (!newHistorial[index].fechaCarga) {
                                                                newHistorial[index].fechaCarga = newDate; // Asigna la fecha de carga
                                                            }

                                                            // Si no existe la fecha de carga de disposición, la asignamos ahora
                                                            if (!newHistorial[index].fechasDeCargaDisposicion) {
                                                                newHistorial[index].fechasDeCargaDisposicion = []; // Inicializa el arreglo si no existe
                                                            }

                                                            // Registra la fecha de carga de disposición solo si el archivo se carga por primera vez
                                                            newHistorial[index].fechasDeCargaDisposicion.push(newDate);

                                                            // Asigna el archivo a la entrada correspondiente
                                                            newHistorial[index].disposicion = e.target.files[0];

                                                            setHistorialCorrectivo(newHistorial); // Actualiza el estado
                                                        }}
                                                        accept=".pdf,.doc,.docx"
                                                        className="mt-1 mb-2 text-sm ml-2 w-full border border-gray-300 rounded p-1"
                                                    />
                                                ) : (
                                                    <>
                                                        {/* Enlace para descargar el archivo */}
                                                        <a
                                                            href={URL.createObjectURL(item.disposicion)}
                                                            download={item.disposicion.name}
                                                            className="mt-2 ml-2 bg-blue-400 text-white p-2 rounded-full text-xs hover:bg-blue-500 inline-block"
                                                        >
                                                            Descargar disposición
                                                        </a>

                                                        {/* Botón de Editar */}
                                                        <button
                                                            onClick={() => {
                                                                const input = document.createElement("input");
                                                                input.type = "file";
                                                                input.accept = ".pdf,.doc,.docx";

                                                                input.onchange = (e) => {
                                                                    const file = e.target.files[0];
                                                                    if (file) {
                                                                        const newHistorial = [...historialCorrectivo];
                                                                        const newDate = new Date().toLocaleString(); // Fecha de edición

                                                                        // Si no existe el campo `fechasDeEdicion`, lo inicializamos como un arreglo
                                                                        if (!newHistorial[index].fechasDeEdicion) {
                                                                            newHistorial[index].fechasDeEdicion = [];
                                                                        }

                                                                        // Agregamos la nueva fecha de edición
                                                                        newHistorial[index].fechasDeEdicion.push(newDate);

                                                                        // Reemplaza el archivo con el nuevo
                                                                        newHistorial[index].disposicion = file;
                                                                        setHistorialCorrectivo(newHistorial);
                                                                    }
                                                                };

                                                                input.click(); // Abre el selector de archivos
                                                            }}
                                                            className="mt-2 ml-2 bg-yellow-400 text-white p-2 rounded-full text-xs hover:bg-yellow-500"
                                                        >
                                                            Editar disposición
                                                        </button>

                                                        {/* Botón de Eliminar */}
                                                        <button
                                                            onClick={() => {
                                                                // Abrimos el modal de confirmación de eliminación
                                                                setSelectedItemIndex(index);  // Guardamos el índice del archivo
                                                                setConfirmDeleteArchivoModal(true);  // Abrimos el modal
                                                            }}
                                                            className="mt-2 ml-2 bg-red-400 text-white p-2 rounded-full text-xs hover:bg-red-500"
                                                        >
                                                            Eliminar disposición
                                                        </button>
                                                    </>
                                                )}

                                                <div>
                                                    {/* Mostrar la fecha de carga solo si existe */}
                                                    {item.fechaCarga && (
                                                        <p className="text-sm text-gray-500 mt-2">
                                                            <strong>Fecha de carga:</strong> {item.fechaCarga}
                                                        </p>
                                                    )}

                                                    {/* Mostrar la fecha de carga de disposición solo si existe */}
                                                    {item.fechasDeCargaDisposicion && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                <strong>Fecha de carga de disposición:</strong>
                                                            </p>
                                                            <ul className="list-disc list-inside">
                                                                {item.fechasDeCargaDisposicion.map((fecha, index) => (
                                                                    <li key={index} className="text-sm text-gray-500">
                                                                        {fecha}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Mostrar las fechas de edición solo si hay al menos una */}
                                                    {item.fechasDeEdicion && item.fechasDeEdicion.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                <strong>Fecha de edición:</strong>
                                                            </p>
                                                            <ul className="list-disc list-inside">
                                                                {item.fechasDeEdicion.map((fecha, index) => (
                                                                    <li key={index} className="text-sm text-gray-500">
                                                                        {fecha}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}

                                                    {/* Mostrar las fechas de eliminación solo si hay al menos una */}
                                                    {item.fechasDeEliminacion && item.fechasDeEliminacion.length > 0 && (
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                <strong>Fecha de eliminación:</strong>
                                                            </p>
                                                            <ul className="list-disc list-inside">
                                                                {item.fechasDeEliminacion.map((fecha, index) => (
                                                                    <li key={index} className="text-sm text-gray-500">
                                                                        {fecha}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-sm text-gray-500 text-center">
                                        No hay historial de correctivo disciplinario registrado aún.
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Modal de confirmación de eliminación */}
                        {confirmDeleteArchivoModal && (
                            <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                                <div className="bg-white p-6 rounded-md shadow-lg text-center w-full max-w-md mx-4 md:mx-0 max-h-screen overflow-auto">
                                    <h2 className="text-lg font-bold mb-4 text-red-600">Confirmar Eliminación</h2>
                                    <p>¿Estás seguro de que deseas eliminar este archivo? Esta acción no se puede deshacer.</p>
                                    <div className="mt-4 flex justify-center">
                                        <button
                                            onClick={handleEliminarArchivo}
                                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600"
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            onClick={handleCloseDeleteArchivoModal}
                                            className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between mt-10">
                        <button
                            onClick={() => navigate('/general')}
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 text-xs"
                        >
                            Menu Principal
                        </button>
                    </div>
                </div>

            </div>
        </div >
    );
};

export default CargaConducConcepFases;
