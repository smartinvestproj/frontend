import { Bubble } from "react-chartjs-2";
import { useStockContext } from "../../../context/stockContext";
import { format } from "date-fns";
import "chartjs-adapter-date-fns";
import "./bubbleChart.css";


export default function BubbleChart() {
  const { trades, filterTradesByState } = useStockContext();

  const backgroundColor = [
    '#0668E1',
    '#A3AAAE',
    '#E4C083',
    '#D81F26',
    '#FF5733',
    '#12A4C6',
    '#8CCE4A',
    '#F5A623',
    '#8E44AD',
    '#D35400',
    '#3498DB',
    '#16A085',
    '#E74C3C',
    '#2ECC71',
    '#9B59B6',
    '#F39C12',
    '#34495E'
  ];

  const filteredTrades = filterTradesByState();

  const data = {
    datasets: filteredTrades.map((trade, idx) => {

      return {
        label: trade.stock.name,
        data: [{
          x: format(new Date(trade.date), 'yyyy-MM-dd'),
          y: trade.total,
          r: trade.quantity,
        }],
        backgroundColor: backgroundColor[idx % backgroundColor.length],
      };
    }),
  };

  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      }
    }
  }

  return (
    <div className="bubbles-container">
      <h2>Portfolio value by time</h2>
      <Bubble data={data} options={options} />
    </div>
  );
}