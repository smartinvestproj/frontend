import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import './pieCharts.css';
import getTrades from '../../../services/getTrades';

function PieCharts(){

  const [tradeData, setTradeData] = useState([])

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

  if (tradeData === null) {
    return <div>Loading...</div>;
  }

  const stockNames = tradeData.map((trade) => trade.stock.name);
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

export default PieCharts;
