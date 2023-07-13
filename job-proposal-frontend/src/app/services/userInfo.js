import axios from "axios";

const getUserInfo = async () => {
  let userInfo = null;
  try {
    const response = await axios.get("http://localhost:8000/user_info/");
    const data = response.data[0];
    userInfo = {
        "url": data["fields"]["url"],
        "title": data["fields"]["title"],
        "description": data["fields"]["description"]
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
  return userInfo;
};

export default getUserInfo;
