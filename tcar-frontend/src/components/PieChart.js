import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Enregistrement nécessaire
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['A', 'B', 'C'],
  datasets: [
    {
      label: 'Répartition',
      data: [40, 40, 20],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

function PieChart() {
  return <Pie data={data} />;
}

export default PieChart;
