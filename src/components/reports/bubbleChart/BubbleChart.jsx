import { Bubble } from "react-chartjs-2";
import "./bubbleChart.css";
import {getTrades} from "../../../services/Trades.js";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import "chartjs-adapter-date-fns";

export default function BubbleChart() {
  const [tradeData, setTradeData] = useState([]);

  useEffect(() => {
    async function fetchTradeData() {
      try {
        const data = await getTrades();
        const trades = data.data;
        setTradeData(trades);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTradeData();
  }, []);

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
  
  const data = {
    datasets: tradeData.map((trade, idx) => {
      console.log(format(new Date(trade.date), 'yyyy-MM-dd'))

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

  const  options = {
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