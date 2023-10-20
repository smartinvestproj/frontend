import { Bubble } from "react-chartjs-2";
import "./bubbleChart.css";
import {getTrades} from "../../../services/Trades.js";
import { useEffect, useState } from "react";
import { format } from "date-fns";

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
  
  const data = {
    datasets: tradeData.map((trade) => {
      const formattedDate = format(new Date(trade.created_at), "yyyy-MM-dd");
      return {
        label: trade.stock.name,
        data: [{
          x: formattedDate,
          y: parseFloat(trade.total),
          r: parseFloat(trade.quantity),
        }],
      };
    }),
    backgroundColor: ['#0668E1', '#A3AAAE', '#E4C083', '#D81F26'],
  };

  return (
    <div className="bubbles-container">
      <h2>Portfolio value by time</h2>
      <Bubble data={data} />
    </div>
  );
}