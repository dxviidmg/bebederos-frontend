import logo from './logo.svg';
import './App.css';
import Login from "./components/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Regions from './components/regions/Regions';
import Region from './components/region/Region';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/regiones" element={<Regions/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Login/>} />

        <Route path="/region/:slug" element={<Region/>} />
      </Routes>
    </Router>
  );
}

export default App;
