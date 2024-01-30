import React, { useEffect, useState } from "react";
import { getRegionDetail } from "../apis/region";
import List from "../list/List";

const Region = () => {
  const [entidades, setEntidades] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegionDetail();
        console.log(data);
        setEntidades(data.entidades);
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
      <List data={entidades} type={"entidad"}></List>
    </div>
  );
};
export default Region;
