import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import "./barChart.css";
import { getTrades } from "../../../services/Trades.js";

function BarChart() {
  const [trades, setTrades] = useState([]);

  useEffect(() => {
    async function fetchTradeData() {
      try {
        const data = await getTrades();
        const trades = data.data;
        setTrades(trades);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTradeData();
  }, []);

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

const barData = trades.map((trade, idx) => {
    if (trade.state === 1) {
      return {
        stockName: trade.stock.name,
        price: trade.price,
        backgroundColor: backgroundColor[idx % backgroundColor.length],
      };
    }
    return null;
  }).filter(Boolean);


  if (trades === null) {
    return <div>Loading...</div>;
  }

  const data = {
    labels: barData.map((item) => item.stockName),
    datasets: [
      {
        data: barData.map((item) => item.price),
        backgroundColor: barData.map((item) => item.backgroundColor),
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
        legend: {
          display: false,
        },
      },
  };

  return (
    <div className='barChart-container'>
      <h2 className='barChart-header'>Stocks Price</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
