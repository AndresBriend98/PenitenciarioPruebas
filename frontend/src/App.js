import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import InicioAreaJudicial from './components/InicioAreaJudicial';
import InicioAreaGeneral from './components/InicioAreaGeneral';
import InicioAreaTecnica from './components/InicioAreaTecnica';
import InicioAreaJefe from './components/InicioAreaJefe';
import InicioAreaAdministrador from './components/InicioAreaAdministrador';
import InicioAreaSuperAdministrador from './components/InicioAreaSuperAdministrador';
import AdministrarUsuarios from './components/AdministrarUsuarios';
import ValidacionUsuarios from './components/ValidacionUsuarios';
import HistorialMovimientosUsuarios from './components/HistorialMovimientosUsuarios';
import CargaNuevoInterno from './components/CargaNuevoInterno';
import CargaDatosPersonales from './components/CargaDatosPersonales';
import CargaCriminologia from './components/CargaCriminologia';
import CargaSalud from './components/CargaSalud';
import CargaFisionomia from './components/CargaFisionomia';
import CargaPermisos from './components/CargaPermisos';
import CargaAntecedentesPenales from './components/CargaAntecedentesPenales';
import CargaConducConcepFases from './components/CargaConducConcepFases';
import CargaTraslado from './components/CargaTraslado';
import CargaGrupoFamiliar from './components/CargaGrupoFamiliar';
import CargaJudicial from './components/CargaJudicial';
import CargaVisitas from './components/CargaVisitas';
import CargaSalidas from './components/CargaSalidas';
import CargaAlojamientoYMovimiento from './components/CargaAlojamientoYMovimiento';
import CargaEducacion from './components/CargaEducacion';
import CargaTrabajo from './components/CargaTrabajo';
import CargaPsicologia from './components/CargaPsicologia';
import FichaIngreso from './components/FichaIngreso';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/judicial" element={<InicioAreaJudicial />} />
        <Route path="/general" element={<InicioAreaGeneral />} />
        <Route path="/tecnica" element={<InicioAreaTecnica />} />
        <Route path="/jefatura" element={<InicioAreaJefe />} />
        <Route path="/administrador" element={<InicioAreaAdministrador />} />
        <Route path="/superadministrador" element={<InicioAreaSuperAdministrador />} />
        <Route path="/administrarusuarios" element={<AdministrarUsuarios />} />
        <Route path="/validacionusuarios" element={<ValidacionUsuarios />} />
        <Route path="/historialmovimientosusuarios" element={<HistorialMovimientosUsuarios />} />
        <Route path="/carganuevointerno" element={<CargaNuevoInterno />} />
        <Route path="/cargadatospersonales" element={<CargaDatosPersonales />} />
        <Route path="/cargacriminologia" element={<CargaCriminologia />} />
        <Route path="/cargasalud" element={<CargaSalud />} />
        <Route path="/cargafisionomia" element={<CargaFisionomia />} />
        <Route path="/cargapermisos" element={<CargaPermisos />} />
        <Route path="/cargaantecedentespenales" element={<CargaAntecedentesPenales />} />
        <Route path="/cargaconducconcepfases" element={<CargaConducConcepFases />} />
        <Route path="/cargatraslado" element={<CargaTraslado />} />
        <Route path="/cargagrupofamiliar" element={<CargaGrupoFamiliar />} />
        <Route path="/cargajudicial" element={<CargaJudicial />} />
        <Route path="/cargavisitas" element={<CargaVisitas />} />
        <Route path="/cargasalidas" element={<CargaSalidas />} />
        <Route path="/cargaalojamientoymovimiento" element={<CargaAlojamientoYMovimiento />} />
        <Route path="/cargaeducacion" element={<CargaEducacion />} />
        <Route path="/cargatrabajo" element={<CargaTrabajo />} />
        <Route path="/cargapsicologia" element={<CargaPsicologia />} />
        <Route path="/fichaingreso" element={<FichaIngreso/>} />
      </Routes>
    </Router>
  );
}

export default App;
