import axios from 'axios';

const entertainmentStreamingUrl = process.env.REACT_APP_API_URL;

export const getEscuelaDetail = async (slug) => {
  const apiUrl = `${entertainmentStreamingUrl}/api/escuelas/${slug}`;
  const user = JSON.parse(localStorage.getItem("user"))
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getEscuelaList = async () => {
  const apiUrl = `${entertainmentStreamingUrl}/api/escuelas/`;
  const user = JSON.parse(localStorage.getItem("user"))
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${user.token}`,
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};