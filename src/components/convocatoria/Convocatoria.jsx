import React, { useEffect, useState } from "react";
import { getConvocatoriaDetail } from "../apis/convocatoria";
import { useParams } from "react-router-dom";
import CustomTable from "../table/Table";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';

const Convocatoria = () => {
  const [escuelas, setEscuelas] = useState([]);
  const [data, setData] = useState([]);
  const [escuelasContratadas, setEscuelasContratadas] = useState(0);
  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getConvocatoriaDetail(slug);
        console.log('=>', data);
        setData(data.nombre);
        setEscuelas(data.escuelas)
        setEscuelasContratadas(data.escuelas_contratadas)
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
        data={escuelas}
        columns={[
          {
            name: "Número",
            selector: (row) => row.numero,
          },
          {
            name: "CCT Anterior",
            selector: (row) => row.cct_anterior,
          },
          {
            name: "CCT",
            selector: (row) => row.cct,
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
            name: "SP",
            selector: (row) => row.sistema_potabilizador,
          },
        ]}
      />
    </div>
  );
};
export default Convocatoria;