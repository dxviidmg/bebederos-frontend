import React, { useEffect, useState } from "react";
import { getRegionsList } from "../apis/regions";
import List from "../list/List";

const Regions = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRegionsList();
        console.log(data);
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
    <div>
      <List data={regions} type="region"  title="Regiones"></List>
    </div>
  );
};
export default Regions;
