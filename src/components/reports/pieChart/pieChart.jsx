import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './pieCharts.css';
import {getTrades} from '../../../services/Trades.js';
import {getStocks} from '../../../services/Stocks.js';

export default function PieCharts(){

  const [tradeData, setTradeData] = useState([]);
  const [stockData, setStockData] = useState([]);
  const [stockName, setStockName] = useState([]);

  useEffect(() => {
    const fetchTrades = async () => {
      const tradesData = await getTrades();
      setTradeData(tradesData.data);
    };

    fetchTrades();
  }, []);

  console.log("Trade Data is: ", tradeData)
  useEffect(() => {
    async function fetchStocks() {
      try {
        const data = await getStocks();
        const stocks = data.data;
        setStockData(stocks);
      } catch (error) {
        console.log(error);
      }
    }
    fetchStocks();
  }, []);

  if (tradeData === null) {
    return <div>Loading...</div>;
  }

  function checkStockName() {
    const [stockNames, setStockNames] = useState({});
  
    tradeData.forEach((trade) => {
      stockData.forEach((stock) => {
        if (trade.stock_id === stock.id) {
          setStockNames((prevStockNames) => ({
            ...prevStockNames,
            [trade.stock_id]: stock.name
          }));
        }
      });
    });
  }
  
  const stockNames = stockData.map((stock) => stock.name);

  const quantities = tradeData.map((trade) => parseFloat(trade.quantity));  

  

  const data = {
    labels: stockNames,
    datasets: [
      {
        data: quantities,
        backgroundColor : [
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
        ],
        borderColor: '#242424',
      },
    ],
  };  


  return (
    <div className='pieChart-container'>
      <h2 className='pieChart-header'>Stocks per Company</h2>
      <Pie data={data} />
    </div>
  );
};