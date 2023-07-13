import { React, useState, useEffect } from "react";
import getUsers from "../../services/users";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarData() {
  const [data, setdata] = useState({});
  const [dataTime, setdataTime] = useState({});

  const getData = async () => {
    const users = await getUsers();
    let button_1_counter = 0;
    let button_2_counter = 0;
    let userLabels = []
    let userTimes = []

    for (let user of users) {
      userLabels.push(user["username"]);
      userTimes.push(user["time_connected"]);
      button_1_counter += user["button_1_counter"];
      button_2_counter += user["button_2_counter"];
    }

    console.log(userLabels, userTimes)

    setdata({
      ...data,
      labels: ["Button 1", "Button 2"],
      datasets: [
        {
          label: "Total clicks",
          data: [button_1_counter, button_2_counter],
          backgroundColor: 'rgba(53, 162, 235, 0.5)'
        },
      ],
    });

    setdataTime({
        ...dataTime,
        labels: userLabels,
        datasets: [
          {
            label: "Total time connected",
            data: userTimes,
            backgroundColor: 'rgba(53, 162, 235, 0.5)'
          },
        ],
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const options = {
    scales: {
      x: {
        type: "category",
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
        title: {
          display: true,
          text: 'Total button clicks',
        },
      },
  };

  const option2 = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: false,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'User time connected',
      },
    },
  };

  return (
    <>
      {Object.keys(data).length !== 0 ? (
        <div>
          <Bar data={data} options={options} className="mt-2" height={120} width={500}/>
          <br/>
        <div className="w-50 h-50">
            <Bar data={dataTime} options={option2} className="mt-2" height={500} width={500}/>
        </div>
          
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
