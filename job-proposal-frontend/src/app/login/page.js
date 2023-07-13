"use client";
import { useState } from "react";
import { Form, Input, Button, Alert } from "antd";
import doLogin from "../services/login";
import userUpdateLastLogin from "../services/userUpdateLastLogin";

export default function Login() {
  const [showErrorMessage, setshowErrorMessage] = useState(false);

  const updateLastLogin = async () => {
     userUpdateLastLogin(localStorage.getItem("user"));
  }

  const onFinish = async (values) => {
    let userLogged = await doLogin(values);
    if (userLogged === "") {
      setshowErrorMessage(true);
    } else if (userLogged === "admin") {
      window.location.replace("/home/admin");
    } else {
      updateLastLogin();
      window.location.replace("/home/user");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/vector-gratis/fondo-mapa-topografico_23-2148592632.jpg?w=1800&t=st=1689255348~exp=1689255948~hmac=125ce5bd6e71228450d7c23adb9d8c1797c476dafea4376646617c8721a43268)",
      }}
    >
      <div className="w-full max-w-sm p-4 backdrop-blur-sm bg-white/30 border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 ">
        <Form name="basic" onFinish={onFinish} className="space-y-6">
          <h5 className="text-2xl font-normal text-gray-900 ">
            <b>Welcome</b> back!
          </h5>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your username
            </label>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <input
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="username"
              />
            </Form.Item>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              />
            </Form.Item>
          </div>
          <Form.Item>
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login to your account
            </button>
          </Form.Item>
        </Form>
        {showErrorMessage ? (
          <Alert
            className="absolute bottom-10 right-10"
            message="Username or password are invalid!"
            type="error"
            closable
            showIcon
            onClose={() => {
              setshowErrorMessage(false);
            }}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
