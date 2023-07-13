import axios from "axios";

const getUserLastLogin = async (username) => {
  let lastLogin;
  try {
    const response = await axios.get("http://localhost:8000/user/last_login", {
      params: {
        username: username,
      },
    });
    lastLogin = response.data["last_login"];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
  return lastLogin;
};

export default getUserLastLogin;
