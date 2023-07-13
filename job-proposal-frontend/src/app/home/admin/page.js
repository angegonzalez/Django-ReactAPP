"use client";

import { useEffect, useState } from "react";
import getUsers from "../../services/users";
import { Table } from "antd";

export default function HomeAdmin() {
  const validateUser = () => {
    if (
      localStorage.getItem("user") === "" ||
      localStorage.getItem("user") === null ||
      localStorage.getItem("user") !== "admin"
    ) {
      window.location.replace("/login");
    }
  };

  const [users, setusers] = useState([]);
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      sorter: (a, b) => a.username.length - b.username.length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <span className="text-xs">{text}</span>,
      defaultSortOrder: "ascend"
    },
    {
      title: "Time connected (s)",
      dataIndex: "time_connected",
      sorter: (a, b) => a["time_connected"] - b["time_connected"],
      sortDirections: ["descend", "ascend"],
      render: (text) => <span className="text-xs">{text}</span>,
    },
    {
      title: "Last login",
      dataIndex: "last_login",
      sorter: (a, b) => a["last_login"].length - b["last_login"].length,
      sortDirections: ["descend", "ascend"],
      render: (text) => <span className="text-xs">{text}</span>,
    },
    {
      title: "Button 1",
      dataIndex: "button_1_counter",
      sorter: (a, b) => a["button_1_counter"] - b["button_1_counter"],
      sortDirections: ["descend", "ascend"],
      render: (text) => <span className="text-xs">{text}</span>,
    },
    {
      title: "Button 2",
      dataIndex: "button_2_counter",
      sorter: (a, b) => a["button_2_counter"] - b["button_2_counter"],
      sortDirections: ["descend", "ascend"],
      render: (text) => <span className="text-xs">{text}</span>,
    },
  ];

  const paginationOptions = {
    pageSize: 10,
    total: users.length, // Total number of items
    size: "small",
  };

  async function getAllUsers() {
    const data = await getUsers();
    setusers([...users, ...data]);
  }

  useEffect(() => {
    validateUser();
    getAllUsers();
  }, []);

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url(https://img.freepik.com/vector-gratis/fondo-mapa-topografico_23-2148592632.jpg?w=1800&t=st=1689255348~exp=1689255948~hmac=125ce5bd6e71228450d7c23adb9d8c1797c476dafea4376646617c8721a43268)",
      }}
    >
      <div className="block items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 ">
        {users.length > 0 ? (
          <Table
            columns={columns}
            dataSource={users}
            onChange={onChange}
            pagination={paginationOptions}
            className="m-4"
          />
        ) : (
          <></>
        )}
        <div className="flex m-2 w-full center justify-center">
          <a
            onClick={() => {
              window.location.replace("/login");
              localStorage.removeItem("user");
            }}
            className="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-white bg-rose-500 rounded-lg hover:bg-rose-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:cursor-pointer"
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
}
