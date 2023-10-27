import { Pie } from "react-chartjs-2";
import "./pieCharts.css";
import { useStockContext } from "../../../context/stockContext";

function PieCharts() {
  const { trades } = useStockContext();

  const backgroundColor = [
    "#0668E1",
    "#A3AAAE",
    "#E4C083",
    "#D81F26",
    "#FF5733",
    "#12A4C6",
    "#8CCE4A",
    "#F5A623",
    "#8E44AD",
    "#D35400",
    "#3498DB",
    "#16A085",
    "#E74C3C",
    "#2ECC71",
    "#9B59B6",
    "#F39C12",
    "#34495E",
  ];

  const pieData = trades.map((trade, idx) => {
    if (trade.state === 1) {
      return {
        stock: trade.stock.name,
        quantity: trade.quantity,
        backgroundColor: backgroundColor[idx % backgroundColor.length],
      };
    }
    return null;
  }).filter(Boolean);

  const data = {
    labels: pieData.map((item) => item.stock),
    datasets: [
      {
        data: pieData.map((item) => item.quantity),
        backgroundColor: pieData.map((item) => item.backgroundColor),
        borderColor: "#242424",
      },
    ],
  };

  return (
    <div className="pieChart-container">
      <h2 className="pieChart-header">Stocks per Company</h2>
      <Pie data={data} />
    </div>
  );
}

export default PieCharts;