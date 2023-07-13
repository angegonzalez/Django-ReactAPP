import axios from "axios";

const getUsers = async () => {
  const users = [];
  try {
    const response = await axios.get("http://localhost:8000/users/");
    for (let user of response.data) {
      if (user["pk"] !== "admin") {
        const date = new Date(user["fields"]["last_login"]);
        const lastLogin = date.toLocaleString("es-CO", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        });
        users.push({
          username: user["pk"],
          time_connected: user["fields"]["time_connected"],
          last_login: lastLogin,
          button_1_counter: user["fields"]["button_1_counter"],
          button_2_counter: user["fields"]["button_2_counter"],
        });
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
  return users;
};

export default getUsers;
