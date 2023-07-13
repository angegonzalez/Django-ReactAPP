import axios from "axios";

const userUpdateTimeConnected= async (username, time) => {
  try {
    await axios.post("http://localhost:8000/user/update_time_connected", {
        username: username,
        time: time
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default userUpdateTimeConnected;
