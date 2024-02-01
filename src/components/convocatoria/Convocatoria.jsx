import React, { useEffect, useState } from "react";
import { getConvocatoriaDetail } from "../apis/convocatoria";
import { useParams } from "react-router-dom";
import CustomTable from "../table/Table";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";


const Convocatoria = () => {
  const [escuelas, setEscuelas] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [data, setData] = useState([]);
  const [escuelasContratadas, setEscuelasContratadas] = useState(0);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getConvocatoriaDetail(slug);
        console.log("=>", data);
        setData(data.nombre);
        setEscuelas(data.escuelas);
        setDocumentos(data.documentos);
        setEscuelasContratadas(data.escuelas_contratadas);
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
    <div>
      <Container>
        <h1>{data}</h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Region</th>
              <th>Partida</th>
              <th>Escuelas contratadas</th>
              <th>Escuelas registradas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>{escuelasContratadas} </td>
              <td>{escuelas.length}</td>
            </tr>
          </tbody>
        </Table>
      </Container>

      <CustomTable
        title="Bitacora"
        data={documentos}
        columns={[
          {
            name: "Nombre",
            selector: (props) => <a href={props.archivo}>{props.nombre}</a>,
          },
          {
            name: "Fecha",
            selector: (row) => row.fecha,
          },
          {
            name: "Autor",
            selector: (row) => row.autor,
          },
        ]}
      />

      <CustomTable
        title="Escuelas"
        data={escuelas}
        columns={[
          {
            name: "Número",
            selector: (row) => row.numero,
          },
          {
            name: "CCT Anterior",
            selector: (row) => row.cct_anterior,
            sortable: true,
          },
          {
            name: "CCT",
            selector: (props) => <Link to={`/escuela/${props.slug}`}>{props.cct}</Link>

          },
          {
            name: "Nombre",
            selector: (row) => row.nombre,
          },
          {
            name: "Nivel educativo",
            selector: (row) => row.nivel_educativo,
          },
          {
            name: "Plantilla",
            selector: (row) => row.plantilla_escolar,
          },
          {
            name: "Mueble",
            selector: (row) => row.mueble,
          },
          {
            name: "Sistema Potabilizador",
            selector: (row) => row.sistema_potabilizador,
          },
        ]}
      />
    </div>
  );
};
export default Convocatoria;
