import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ url, title }) {
  const [dataChart, setDataChart] = useState({
    labels: [],
    values: []
  });

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDataChart(data))
      .catch((err) => console.error("Erreur PieChart:", err));
  }, [url]);

  const data = {
    labels: dataChart.labels,
    datasets: [
      {
        label: title,
        data: dataChart.values,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  return (
    <div style={{ width: "400px", margin: "20px auto" }}>
      <h3 style={{ textAlign: "center" }}>{title}</h3>
      <Pie data={data} />
    </div>
  );
}

export default PieChart;
