import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

function LineChart() {
  const [lineData, setLineData] = useState({
    labels: [],
    values: []
  });

  useEffect(() => {
    fetch("http://localhost:8081/api/dashboard/line")
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Erreur LineChart:", err));
  }, []);

  const data = {
    labels: lineData.labels, // ["Fournisseurs", "Mécaniciens"]
    datasets: [
      {
        label: "Nombre",
        data: lineData.values, // [nbFournisseurs, nbMecaniciens]
        borderColor: "blue",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: { legend: { display: true } },
  };

  return <Line data={data} options={options} />;
}

export default LineChart;
