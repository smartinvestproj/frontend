import React from 'react';
import { Pie } from 'react-chartjs-2';
import './pieCharts.css';

function PieCharts(){
  // Dados para o gráfico de pizza
  const data = {
    labels: ['Maçãs', 'Bananas', 'Pêssegos', 'Uvas'],
    datasets: [
      {
        data: [12, 8, 5, 14], // Valores para cada fatia do gráfico
        backgroundColor: ['red', 'yellow', 'orange', 'purple'], // Cores para cada fatia
      },
    ],
  };

  return (
    <div className='chart'>
      <h2>Gráfico de Pizza</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieCharts;
