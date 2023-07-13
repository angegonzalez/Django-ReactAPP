import axios from "axios";

const doLogin = async (loginData) => {
  let userLogged = "";
  try {
    const response = await axios.get("http://localhost:8000/users/");

    for (let user of response.data) {
      if (user["pk"] === loginData["username"]) {
        if (user["fields"]["password"] === loginData["password"]) {
          userLogged = loginData["username"];
        }
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
  localStorage.setItem("user", userLogged);
  return userLogged;
};

export default doLogin;
