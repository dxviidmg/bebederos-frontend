import logo from './logo.svg';
import './App.css';
import Login from "./components/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Regions from './components/regions/Regions';
import Region from './components/region/Region';
import Entidad from './components/entidad/Entidad';
import Convocatoria from './components/convocatoria/Convocatoria';
import Escuela from './components/escuela/Escuela';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/regiones" element={<Regions/>} />
        <Route path="/region/:slug" element={<Region/>} />
        <Route path="/entidad/:slug" element={<Entidad/>} />
        <Route path="/convocatoria/:slug" element={<Convocatoria/>} />
        <Route path="/escuela/:slug" element={<Escuela/>} />
        <Route path="/" element={<Login/>} />

      </Routes>
    </Router>
  );
}

export default App;
