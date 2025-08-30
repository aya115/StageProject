import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
  const [dataChart, setDataChart] = useState({
    labels: [],
    values: []
  });

  useEffect(() => {
    fetch("http://localhost:8081/api/dashboard/pie")
      .then((res) => res.json())
      .then((data) => setDataChart(data))
      .catch((err) => console.error("Erreur PieChart:", err));
  }, []);

  const data = {
    labels: dataChart.labels,
    datasets: [
      {
        label: "Modèles de pièces",
        data: dataChart.values,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return <Pie data={data} />;
}

export default PieChart;
