import axios from 'axios';

const entertainmentStreamingUrl = process.env.REACT_APP_API_URL;
const apiUrl = `${entertainmentStreamingUrl}/api/regions/`;


export const getRegionsList = async () => {
  const user = JSON.parse(localStorage.getItem("user"))

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${user.token}`,
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    return error;
  }
};