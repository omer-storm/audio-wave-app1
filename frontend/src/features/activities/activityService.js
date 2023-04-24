import axios from "axios";

const API_URL = "http://localhost:5000/api/activity/";

//create activities
const create = async (activity, token) => {
  console.log(activity);
  const response = await axios.post(API_URL, activity, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const activityService = {
  create,
};

export default activityService;
