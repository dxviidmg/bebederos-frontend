import React, { useEffect, useState } from "react";
import { getRegionsList } from "../apis/regions";
import List from "../list/List";

const Regions = () => {
  const [regions, setRegions] = useState([]);

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegionsList();
        localStorage.setItem("color", data[getRandomInt(data.length)].color);

        setRegions(data);
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
    <div className="padding">
      <List data={regions} type="region"  title="Regiones"></List>
    </div>
  );
};
export default Regions;
