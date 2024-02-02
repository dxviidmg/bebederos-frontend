import axios from 'axios';

const entertainmentStreamingUrl = process.env.REACT_APP_API_URL;

export const getExpedienteFileMeanings = async () => {
  const apiUrl = `${entertainmentStreamingUrl}/api/expediente-file-meanings`;
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