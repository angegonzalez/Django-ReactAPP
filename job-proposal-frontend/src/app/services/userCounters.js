import axios from "axios";

const updateCounters = async (username, button) => {
  try {
    if (button === 1) {
      await axios.post("http://localhost:8000/user/update_button_1", {
        username: username,
      });
    } else {
      await axios.post("http://localhost:8000/user/update_button_2", {
        username: username,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default updateCounters;
