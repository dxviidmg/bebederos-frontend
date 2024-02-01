import axios from "axios";

const entertainmentStreamingUrl = process.env.REACT_APP_API_URL;

export const createDocumentoConvocatoria = async (data) => {
  const apiUrl = `${entertainmentStreamingUrl}/api/documentos-convocatoria/`;
  const user = JSON.parse(localStorage.getItem("user"));
  data['autor'] = user.full_name
  try {
    const response = await axios.post(apiUrl, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Token ${user.token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    return error;
  }
};
