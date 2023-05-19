import axios from "axios";

const API_URL = "http://localhost:5000/api/library/";
const API_URL_ACTIVITY = "http://localhost:5000/api/activity/"

//get private libraries
const getPrivateLibrary = async (token) => {
  const response = await axios.get(API_URL + "activities/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

//get public libraries
const getPublicLibrary = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

//create activities
const createActivity = async (activity, token) => {
  const response = await axios.post(API_URL_ACTIVITY, activity, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

//Update Activity
const updateActivity = async (activity, token) => {
  const response = await axios.put(API_URL_ACTIVITY, activity, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


const libraryService = {
  getPrivateLibrary,
  getPublicLibrary,
  createActivity,
  updateActivity
};

export default libraryService;
