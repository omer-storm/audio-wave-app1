import axios from "axios";

const API_URL = "http://localhost:5000/api/activity/";

//create activities
const createActivity = async (activity, token) => {
  const response = await axios.post(API_URL, activity, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const activityService = {
  createActivity,
};

export default activityService;
