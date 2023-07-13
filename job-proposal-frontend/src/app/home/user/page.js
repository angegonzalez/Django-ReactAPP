"use client";

import { useEffect, useState } from "react";
import getUserInfo from "../../services/userInfo";
import updateCounters from "../../services/userCounters";
import { Alert } from "antd";
import getUserLastLogin from "../../services/userGetLastLogin";
import userUpdateTimeConnected from "../../services/userUpdateLastConnected";

export default function HomeUser() {
  const validateUser = () => {
    console.log(localStorage.getItem("user"));
    if (
      localStorage.getItem("user") === "" ||
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") === "admin"
    ) {
      window.location.replace("/login");
    }
  };
  const [info, setinfo] = useState(undefined);
  const [alertMessage, setalertMessage] = useState("");
  const [showAlert, setshowAlert] = useState(false);

  async function getData() {
    const infoUser = await getUserInfo();
    setinfo(infoUser);
  }

  useEffect(() => {
    validateUser();
    getData();
  }, []);

  const showSuccessAlert = () => {
    setshowAlert(true);
    setTimeout(() => {
      setshowAlert(false);
    }, 1500);
  };
  
  const updateTimeConnected = async () => {
    const userLastLogin = await getUserLastLogin(localStorage.getItem("user"));
    console.log(userLastLogin);
    const now = new Date();
    const userLastLoginDate = new Date(userLastLogin);
    const timeToAdd = Math.floor((now - userLastLoginDate) / 1000);
    console.log(timeToAdd)
    await userUpdateTimeConnected( localStorage.getItem("user"), timeToAdd)
  }

  const logout = async () => {
    await updateTimeConnected();
    window.location.replace("/login");
    localStorage.removeItem("user");
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/vector-gratis/fondo-mapa-topografico_23-2148592632.jpg?w=1800&t=st=1689255348~exp=1689255948~hmac=125ce5bd6e71228450d7c23adb9d8c1797c476dafea4376646617c8721a43268)",
      }}
    >
      {info != undefined ? (
        <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-2xl ">
          <img
            className="object-cover w-full rounded-t-lg h-100 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={info.url}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <>
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 ">
                {info.title}
              </h5>
            </>
            <>
              <p className="font-normal text-xs text-gray-700 ">
                {info.description}
              </p>
            </>

            <div className="flex space-x-3 mt-3">
              <a
                onClick={() => {
                  updateCounters(localStorage.getItem("user"), 1);
                  setalertMessage("Button 1 counter successfully updated!");
                  showSuccessAlert();
                }}
                className="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:cursor-pointer"
              >
                Button 1
              </a>
              <a
                onClick={() => {
                  updateCounters(localStorage.getItem("user"), 2);
                  setalertMessage("Button 2 counter successfully updated!");
                  showSuccessAlert();
                }}
                className="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 hover:cursor-pointer"
              >
                Button 2
              </a>
              <a
                onClick={() => {
                  logout();
                }}
                className="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-white bg-rose-500 rounded-lg hover:bg-rose-300 focus:ring-4 focus:outline-none focus:ring-blue-300 hover:cursor-pointer"
              >
                Logout
              </a>
            </div>
          </div>
          {showAlert ? (
            <Alert
              className="absolute bottom-10 right-10"
              message={alertMessage}
              type="success"
              closable
              showIcon
              onClose={() => {
                setshowAlert(false);
              }}
            />
          ) : (
            <></>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
