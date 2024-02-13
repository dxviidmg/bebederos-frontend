import React, { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { loginUser } from "../apis/login";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { useEffect } from "react";
const entertainmentStreamingSED =
  process.env.REACT_APP_SUBSCRIPTION_EXPIRATION_DATE;

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [alertData, setAlertData] = useState({
    shown: false,
    message: "",
  });

  const [canLogin, setCanLogin] = useState(true);

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

  useEffect(() => {
    // Chequear si hay un token en el almacenamiento local

    // Create a new Date object using the dateString
    const expirationDate = new Date(entertainmentStreamingSED);
    const currentDate = new Date();

    setCanLogin(currentDate.getDate() <= expirationDate.getDate());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(formData);
      localStorage.setItem("user", JSON.stringify(response));

      if ("user_id" in response) {
        onLogin(response);
        if (response.tipo_jurisdiccion) {
          navigate(
            `/${response.tipo_jurisdiccion.toLowerCase()}/${response.nombre_jurisdiccion.toLowerCase()}`
          );
        } else {
          navigate("/regiones/");
        }
      } else {
        showAlert("Usuario o contraseña incorrecta");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        showAlert("Usuario o contraseña incorrecta");
      } else {
        showAlert("Error desconocido");
      }
    }
  };

  return (
    <div id="login">
      <Container>
        <Row className="justify-content-center">
          <Col
            md={6}
            lg={3}
            id="login-col"
            className="d-flex align-items-center"
          >
            <form className="Auth-form">
              <div className="Auth-form-content">
                <h3 className="Auth-form-title text-center">Iniciar sesión</h3>
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
                  {canLogin ? (
                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={handleSubmit}
                    >
                      Iniciar sesión
                    </button>
                  ) : (
                    <spam>
                      No puede iniciar sesión, ponganse en contacto con su
                      proveedor
                    </spam>
                  )}
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
    </div>
  );
}

export default Login;
