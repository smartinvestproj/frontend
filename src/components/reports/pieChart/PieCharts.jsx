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
        backgroundColor: ['#0668E1', '#A3AAAE', '#E4C083', '#D81F26'],
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
