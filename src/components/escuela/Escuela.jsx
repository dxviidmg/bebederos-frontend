import React, { useEffect, useState } from "react";
import { getEscuelaDetail } from "../apis/escuela";
import { useParams } from "react-router-dom";
import CustomTable from "../table/Table";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";

const Escuela = () => {
  const [escuela, setEscuela] = useState({});
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEscuelaDetail(slug);
        console.log("=>", data);
        setEscuela(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      console.log("Cleanup function called");
    };
  }, [slug]);

  return (
    <Container>
      <h1>
        {escuela.cct} {escuela.nombre}
      </h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Año</th>
            <th>Nivel Educativo</th>
            <th>Plantilla</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{escuela.numero}</td>
            <td>{escuela.año_convocatoria}</td>
            <td>{escuela.nivel_educativo}</td>
            <td>{escuela.plantilla_escolar}</td>
          </tr>
        </tbody>
      </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Domicilio</th>
            <th>Localidad</th>
            <th>Municipio</th>
            <th>Entidad</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{escuela.domicilio}</td>
            <td>{escuela.localidad}</td>
            <td>{escuela.municipio}</td>
            <td>{escuela.entidad}</td>
          </tr>
        </tbody>
      </Table>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mueble</th>
            <th>Sistema Potabilizador</th>
            <th>Manual</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{escuela.sistema_bebedero}</td>
            <td>{escuela.sistema_bebedero}</td>
            <td>{escuela.sistema_bebedero}</td>
          </tr>
        </tbody>
      </Table>

    </Container>
  );
};

export default Escuela;
