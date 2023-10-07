import React from 'react';
import { Pie } from 'react-chartjs-2';
import './pieCharts.css';

function PieCharts(){
  const data = {
    labels: ['META', 'AAPL', 'AMZN', 'NFLX'],
    datasets: [
      {
        data: [12, 8, 5, 14], 
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
