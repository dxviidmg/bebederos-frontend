import React, { useEffect, useState } from "react";
import { getConvocatoriaDetail } from "../apis/convocatoria";
import { useParams } from "react-router-dom";
import Table from "../table/Table";


const Convocatoria = () => {
  const [escuelas, setEscuelas] = useState([]);
  const [title, setTitle] = useState("");
  const { slug } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getConvocatoriaDetail(slug);
        console.log(data);
        setTitle(data.nombre)
        setEscuelas(data.escuelas);

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
      <h1>{title}</h1>
      <Table data={escuelas} columns={[
	{
		name: 'Número',
		selector: row => row.numero,
	},
  {
		name: 'CCT Anterior',
		selector: row => row.cct_anterior,
	},
  {
		name: 'CCT',
		selector: row => row.cct,
	},
	{
		name: 'Nombre',
		selector: row => row.nombre,
	},
  {
		name: 'Nivel educativo',
		selector: row => row.nivel_educativo,
	},
	{
		name: 'Plantilla',
		selector: row => row.plantilla_escolar,
	},
  {
		name: 'Mueble',
		selector: row => row.mueble,
	},
  {
		name: 'SP',
		selector: row => row.sistema_potabilizador,
	},
]}></Table>
    </div>
  );
};
export default Convocatoria;
