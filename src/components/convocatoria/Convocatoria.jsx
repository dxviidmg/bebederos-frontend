import React, { useEffect, useState } from "react";
import { getConvocatoriaDetail } from "../apis/convocatoria";
import List from "../list/List";
import { useParams } from "react-router-dom";


const Convocatoria = () => {
  const [entidades, setEntidades] = useState([]);
  const [title, setTitle] = useState("");
  const { slug } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getConvocatoriaDetail(slug);
        console.log(data);
        setEntidades(data.convocatorias);
        setTitle(data.nombre)
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
    </div>
  );
};
export default Convocatoria;
