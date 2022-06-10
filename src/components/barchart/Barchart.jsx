import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({options, data}) => {
  return <Bar options={options} data={data} />;
}

BarChart.defaultProps = {
  batteryOuterWidth: 150,
  batteryOuterHeight: 60,
  batteryLevel: 0,
  batteryLevelColor: "#22E3A7"
}
export default BarChart
