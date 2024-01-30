import React, { useEffect, useState } from "react";
import { getEntidadDetail } from "../apis/entidad";
import List from "../list/List";
import { useParams } from "react-router-dom";


const Entidad = () => {
  const [entidades, setEntidades] = useState([]);
  const [title, setTitle] = useState("");
  const { slug } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEntidadDetail(slug);
        console.log(data);
        setEntidades(data.convocatorias);
        setTitle(data.texto + ": " + data.nombre)
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
      <List data={entidades} type="convocatoria" title={title}></List>
    </div>
  );
};
export default Entidad;
