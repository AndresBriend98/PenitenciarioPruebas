import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import InicioAreaJudicial from './pages/InicioAreaJudicial';
import InicioAreaGeneral from './pages/InicioAreaGeneral';
import InicioAreaTecnica from './pages/InicioAreaTecnica';
import InicioAreaJefe from './pages/InicioAreaJefe';
import InicioAreaAdministrador from './pages/InicioAreaAdministrador';
import InicioAreaSuperAdministrador from './pages/InicioAreaSuperAdministrador';
import AdministrarUsuarios from './pages/AdministrarUsuarios';
import ValidacionUsuarios from './pages/ValidacionUsuarios';
import HistorialMovimientosUsuarios from './pages/HistorialMovimientosUsuarios';
import CargaNuevoInterno from './pages/CargaNuevoInterno';
import CargaDatosPersonales from './pages/CargaDatosPersonales';
import CargaCriminologia from './pages/CargaCriminologia';
import CargaSalud from './pages/CargaSalud';
import CargaFisionomia from './pages/CargaFisionomia';
import CargaPermisos from './pages/CargaPermisos';
import CargaAntecedentesPenales from './pages/CargaAntecedentesPenales';
import CargaConducConcepFases from './pages/CargaConducConcepFases';
import CargaRealojamiento from './pages/CargaRealojamiento';
import CargaGrupoFamiliar from './pages/CargaGrupoFamiliar';
import CargaJudicial from './pages/CargaJudicial';
import CargaVisitas from './pages/CargaVisitas';
import CargaSalidas from './pages/CargaSalidas';
import CargaAlojamientoYMovimiento from './pages/CargaAlojamientoYMovimiento';
import CargaEducacion from './pages/CargaEducacion';
import CargaTrabajo from './pages/CargaTrabajo';
import CargaPsicologia from './pages/CargaPsicologia';
import FichaIngreso from './pages/FichaIngreso';
import CargaConsejo from './pages/CargaConsejo';

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
        <Route path="/CargaRealojamiento" element={<CargaRealojamiento />} />
        <Route path="/cargagrupofamiliar" element={<CargaGrupoFamiliar />} />
        <Route path="/cargajudicial" element={<CargaJudicial />} />
        <Route path="/cargavisitas" element={<CargaVisitas />} />
        <Route path="/cargasalidas" element={<CargaSalidas />} />
        <Route path="/cargaalojamientoymovimiento" element={<CargaAlojamientoYMovimiento />} />
        <Route path="/cargaeducacion" element={<CargaEducacion />} />
        <Route path="/cargatrabajo" element={<CargaTrabajo />} />
        <Route path="/cargapsicologia" element={<CargaPsicologia />} />
        <Route path="/fichaingreso" element={<FichaIngreso/>} />
        <Route path="/cargaconsejo" element={<CargaConsejo/>} />
      </Routes>
    </Router>
  );
}

export default App;
