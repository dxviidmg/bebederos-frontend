import axios from 'axios';

const entertainmentStreamingUrl = process.env.REACT_APP_API_URL;
const apiUrl = `${entertainmentStreamingUrl}/api/regions/`;

console.log('apiUrl', apiUrl)

export const getRegionsList = async () => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data)
    return response.data;
  } catch (error) {
    return error;
  }
};