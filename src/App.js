import logo from './logo.svg';
import './App.css';
import Login from "./components/login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Regions from './components/regions/Regions';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/regions" element={<Regions/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
