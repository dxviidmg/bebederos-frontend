import React, { useEffect, useState } from "react";
import { getEntidadDetail } from "../apis/entidad";
import List from "../list/List";
import { useParams } from "react-router-dom";


const Entidad = () => {
  const [convocatorias, setConvocatorias] = useState([]);
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("");

  const { slug } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEntidadDetail(slug);
        setConvocatorias(data.convocatorias);
        setTitle(data.texto + ": " + data.nombre)
        setColor(data.color)
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
      <List data={convocatorias} type="convocatoria" title={title} color={color}></List>
    </div>
  );
};
export default Entidad;
