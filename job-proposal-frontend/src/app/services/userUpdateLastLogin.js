import axios from "axios";

const userUpdateLastLogin = async (username) => {
  try {
    await axios.post("http://localhost:8000/user/update_last_login", {
        username: username,
      });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default userUpdateLastLogin;
