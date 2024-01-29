import React, { useEffect, useState } from "react";
import { getRegionsList } from "../apis/regions";

const Regions = () => {
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    // Define a function to fetch data
    const fetchData = async () => {
      try {
        const data = await getRegionsList(); // Use await here
        console.log(data);
        setRegions(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetch data function
    fetchData();

    // The cleanup function (optional) - will be called when the component unmounts
    return () => {
      // Perform cleanup, if needed
      console.log("Cleanup function called");
    };
  }, []);

  return <div>{regions.map((region) => region.nombre)}</div>;
};

export default Regions;
