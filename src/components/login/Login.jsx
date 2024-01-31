import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { loginUser } from "../apis/login";
import { useNavigate } from 'react-router-dom';


function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [alertData, setAlertData] = useState({
    shown: false,
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const showAlert = (message) => {
    setAlertData({
      shown: true,
      message: message,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await loginUser(formData);
      localStorage.setItem('user', JSON.stringify(response));
      console.log(response)

      if ('user_id' in response) {
        if (response.tipo_jurisdiccion){
          navigate(`/${response.tipo_jurisdiccion.toLowerCase()}/${response.nombre_jurisdiccion.toLowerCase()}`);
        }
        else {
          navigate('/regiones/');
        }
      } else {
        showAlert("Usuario o contraseña incorrecta");
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.status === 400) {
        showAlert("Usuario o contraseña incorrecta");
      } else {
        showAlert("Error desconocido");
      }
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6} lg={3}>
          <form className="Auth-form">
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Iniciar sesión</h3>
              <div className="form-group mt-3">
                <label>Usuario</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  placeholder="Usuario"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control mt-1"
                  placeholder="Contraseña"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="d-grid gap-2 mt-3">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Iniciar sesión
                </button>
              </div>
              {alertData.shown && (
                <Alert variant="danger" className="mt-3">
                  {alertData.message}
                </Alert>
              )}
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
