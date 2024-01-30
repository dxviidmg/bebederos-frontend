import React, { useEffect, useState } from "react";
import { getEntidadesList } from "../apis/region";
import List from "../list/List";

const Entidades = () => {
  const [entidades, setEntidades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getEntidadesList();
        console.log(data);
        setEntidades(data);
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
      <List data={entidades}></List>
    </div>
  );
};
export default Regions;
