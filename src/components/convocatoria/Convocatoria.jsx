import React, { useEffect, useState } from "react";
import { getConvocatoriaDetail } from "../apis/convocatoria";
import { useParams } from "react-router-dom";
import CustomTable from "../table/Table";
import { Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import CustomModal from "../modal/CustomModal";


const Convocatoria = () => {
  const [escuelas, setEscuelas] = useState([]);
  const [documentos, setDocumentos] = useState([]);
  const [data, setData] = useState([]);
  const [escuelasContratadas, setEscuelasContratadas] = useState(0);
  const [color, setColor] = useState("")


  const { slug } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setColor(localStorage.getItem('color'));
        const data = await getConvocatoriaDetail(slug);
        console.log("=>", data);
        setData(data);
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


  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const updateDocumentos = (documento) => {
    setDocumentos([...documentos, documento]);
  };

  const styles = {
    th: {
      backgroundColor: color,
    },
  };

  return (
    <div className="padding">
      <Container>
      <CustomModal show={isModalOpen} handleClose={closeModal} updateDocumentos={updateDocumentos} id={data.id}/>
        <h1 className="text-center">{data.nombre}</h1>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={styles.th} >Escuelas contratadas</th>
              <th style={styles.th}>Escuelas registradas</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{escuelasContratadas} </td>
              <td>{escuelas.length}</td>
            </tr>
          </tbody>
        </Table>
        <Button variant="primary" style={{backgroundColor: localStorage.getItem('color')}} onClick={openModal}>
        Nueva nota de bitacora
      </Button>
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
            selector: (row) => row.fecha_formateada,
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
