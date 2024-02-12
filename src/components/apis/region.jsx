import axios from 'axios';

const entertainmentStreamingUrl = process.env.REACT_APP_API_URL;

export const getRegionDetail = async (slug) => {
  const apiUrl = `${entertainmentStreamingUrl}/api/regions/${slug}`;
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