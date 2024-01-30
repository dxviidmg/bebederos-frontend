import axios from 'axios';

const entertainmentStreamingUrl = process.env.REACT_APP_API_URL;

export const getEntidadDetail = async (slug) => {
  const apiUrl = `${entertainmentStreamingUrl}/api/entidads/${slug}`;
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