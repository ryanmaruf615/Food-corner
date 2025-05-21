import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const LineChart = ({
  monthlyIncome,
}: {
  monthlyIncome: { month: string; monthlyIncome: number }[];
}) => {
  // Create an array to hold monthly income values for each month
  const incomeData = allMonths.map((month) => {
    const entry = monthlyIncome?.find((item) => item.month === month);
    return entry ? entry.monthlyIncome : 0; // Use 0 if no data for that month
  });

  const data = {
    labels: allMonths,
    datasets: [
      {
        label: "Monthly Income",
        data: incomeData,
        fill: false,
        borderColor: "#fb923c",

        tension: 0.1,
        pointRadius: 5, // Size of the dot points
        pointHoverRadius: 7, // Size of the dot points when hovered
      },
    ],
  };

  return <Line data={data} />;
};

export default LineChart;
