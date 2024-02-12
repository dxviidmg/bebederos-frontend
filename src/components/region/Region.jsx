import React, { useEffect, useState } from "react";
import { getRegionDetail } from "../apis/region";
import List from "../list/List";
import { useParams } from "react-router-dom";


const Region = () => {
  const [entidades, setEntidades] = useState([]);
  const [title, setTitle] = useState("");
  const { slug } = useParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegionDetail(slug);
        setEntidades(data.entidades);
        setTitle(data.texto + ": " + data.nombre)
        localStorage.setItem("color", data.color);
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
    <div className="padding">
      <List data={entidades} type="entidad" title={title}></List>
    </div>
  );
};
export default Region;
