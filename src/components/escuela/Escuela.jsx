import React, { useEffect, useState } from "react";
import { getEscuelaDetail } from "../apis/escuela";
import { useParams } from "react-router-dom";
import CustomTable from "../table/Table";
import { Row, Col, Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Escuela = () => {
  const [escuela, setEscuela] = useState({});
  const [expediente, setExpediente] = useState([]);
  const [incidencias, setIncidencias] = useState([]);
  const [mantenimientos, setMantenimientos] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEscuelaDetail(slug);
        console.log("=>", data);
        setEscuela(data)
        if (data.expediente){
          setExpediente(data.expediente)
        }
        setIncidencias(data.incidencias)
        setMantenimientos(data.mantenimientos)
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
    <>
    <Container>
      <h1>
        {escuela.cct} {escuela.nombre}
      </h1>
      <h2>Información general</h2>
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
      <h2>Ubicacíon</h2>

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

      <h2>Información del mueble</h2>
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
            <td>{escuela.mueble}</td>
            <td>{escuela.sistema_potabilizador}</td>
            <td>
              <a href={escuela.manual}>Descargar</a>
            </td>
          </tr>
        </tbody>
      </Table>

      <h2>Expediente</h2>

      <Row>
        {Object.keys(expediente).map((key) =>
          expediente[key] ? (
            <Col md={4} key={key}>
              <Button href={expediente[key]}>{key}</Button>
            </Col>
          ) : null
        )}
      </Row>





    </Container>

<CustomTable
title="Incidencias"
data={incidencias}
columns={[
  {
    name: "Id",
    selector: (row) => row.id,
  },
  {
    name: "Descripcion",
    selector: (props) => <a href={props.archivo}>{props.descripcion}</a>,
  },
  {
    name: "Creacion",
    selector: (row) => row.creacion,
  },
  {
    name: "Prioridad",
    selector: (row) => row.prioridad,
  },
  {
    name: "Status",
    selector: (row) => row.status,
  },  {
    name: "Autor",
    selector: (row) => row.autor,
  },
]}
/>


<CustomTable
title="Mantenimientos"
data={mantenimientos}
columns={[
  {
    name: "tipo",
    selector: (row) => row.tipo,
  },
  {
    name: "Creacion",
    selector: (row) => row.creacion,
  },
  {
    name: "Fecha",
    selector: (row) => row.fecha,
  },
  {
    name: "descripcion",
    selector: (row) => row.descripcion,
  }
]}
/>


</>
  );
};

export default Escuela;
