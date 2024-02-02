import React, { useState, useEffect } from "react";
import { getEscuelaList } from "../apis/escuela";
import CustomTable from "../table/Table";
import { Link } from "react-router-dom";

const Escuelas = () => {
  const [escuelas, setEscuelas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEscuelaList();
        console.log(data);
        setEscuelas(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    return () => {
      console.log("Cleanup function called");
    };
  }, []);

  return (
    <div>
      <CustomTable
      title={"Buscador de escuelas"}
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
            selector: (props) => (
              <Link to={`/escuela/${props.slug}`}>{props.cct}</Link>
            ),
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
      ></CustomTable>
    </div>
  );
};

export default Escuelas;
