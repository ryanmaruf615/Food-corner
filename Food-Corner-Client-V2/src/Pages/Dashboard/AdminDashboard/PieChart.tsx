import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChart = ({
  topItem,
}: {
  topItem: {
    _id: string;
    totalQuantity: number;
    title: string;
  }[];
}) => {
  console.log(
    topItem?.map((item) => item.title),
    topItem
  );
  const data = {
    labels: topItem?.map((item) => item.title),
    topItem,
    datasets: [
      {
        data: topItem?.map((item) => item.totalQuantity),
        topItem,
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Pie Chart Example",
      },
      datalabels: {
        display: true,
        color: "white",
        formatter: (value: number) => value.toString(),
      },
    },
  };

  return <Pie data={data} options={options} />;
};

export default PieChart;
