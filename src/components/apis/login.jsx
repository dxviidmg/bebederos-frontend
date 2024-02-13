import axios from 'axios';

const entertainmentStreamingUrl = process.env.REACT_APP_API_URL;
const apiUrl = `${entertainmentStreamingUrl}/api/api-token-auth/`;

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(apiUrl, credentials, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
