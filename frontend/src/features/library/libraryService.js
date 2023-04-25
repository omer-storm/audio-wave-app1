import axios from "axios";

const API_URL = "http://localhost:5000/api/library/";

//get private libraries
const getPrivateLibrary = async (token) => {
  const response = await axios.get(API_URL + "activities/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log(response.data);
  return response.data;
};

//get public libraries
const getPublicLibrary = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const libraryService = {
  getPrivateLibrary,
  getPublicLibrary,
};

export default libraryService;
