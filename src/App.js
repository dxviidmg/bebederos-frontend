import logo from "./logo.svg";
import "./App.css";
import Login from "./components/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Regions from "./components/regions/Regions";
import Region from "./components/region/Region";
import Entidad from "./components/entidad/Entidad";
import Convocatoria from "./components/convocatoria/Convocatoria";
import Escuela from "./components/escuela/Escuela";
import CustomNavbar from "./components/navbar/Navbar";
import { useState, useEffect } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Chequear si hay un token en el almacenamiento local
    const storedToken = localStorage.getItem("user");
    console.log('storedToken', storedToken)

    if (storedToken) {
      // Si hay un token, establecer el estado de inicio de sesión y actualizar el token
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (data) => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      {isLoggedIn ? <CustomNavbar /> : ""}

      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/regiones" element={<Regions />} />
            <Route path="/region/:slug" element={<Region />} />
            <Route path="/entidad/:slug" element={<Entidad />} />
            <Route path="/convocatoria/:slug" element={<Convocatoria />} />
            <Route path="/escuela/:slug" element={<Escuela />} />
          </>
        ) : (
          <Route path="/" element={<Login onLogin={handleLogin} />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
