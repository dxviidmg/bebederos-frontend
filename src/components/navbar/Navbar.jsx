import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';


const CustomNavbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({})
    const [color, setColor] = useState("#78dd0e")

    useEffect(() => {
        let u = localStorage.getItem("user");
        setUser(u)    
      }, [user]);


      useEffect(() => {
        // Función que se ejecutará en cada intervalo
        const handleInterval = () => {
          setColor(localStorage.getItem('color') || '');
        };
    
        // Configurar un intervalo que ejecute handleInterval cada segundo (ajusta según tus necesidades)
        const intervalId = setInterval(handleInterval, 800);
    
        // Limpia el intervalo cuando el componente se desmonta
        return () => {
          clearInterval(intervalId);
        };
      }, []);


    const handleHome = () => {
        let u = JSON.parse(localStorage.getItem("user"));
        if (u.tipo_jurisdiccion){
            navigate(`/${u.tipo_jurisdiccion.toLowerCase()}/${u.nombre_jurisdiccion.toLowerCase()}`);
          }
          else {
            navigate('/regiones/');
          }


          
    
    }


    const handleLogout = () => {
        localStorage.removeItem("user")
    }

  return (
    <Navbar expand="lg" style={{backgroundColor: color}}>
      <Container fluid >
        <Navbar.Brand href="#">Bebederos escolares</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link onClick={handleHome}>Home</Nav.Link>
            <Nav.Link href="/" onClick={handleLogout}>Salir</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default CustomNavbar
