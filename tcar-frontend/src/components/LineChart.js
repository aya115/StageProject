import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Enregistrement des composants
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const data = {
  labels: ['9:00AM', '12:00PM', '3:00PM', '6:00PM', '9:00PM'],
  datasets: [
    {
      label: 'Performance',
      data: [200, 400, 600, 800, 900],
      borderColor: 'blue',
      backgroundColor: 'rgba(0, 123, 255, 0.5)',
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: 'black', // visible sur fond blanc
      },
    },
  },
  scales: {
    x: {
      ticks: { color: 'black' },
      grid: { color: '#ccc' },
    },
    y: {
      ticks: { color: 'black' },
      grid: { color: '#ccc' },
    },
  },
};


function LineChart() {
  return <Line data={data} options={options} />;
}

export default LineChart;
