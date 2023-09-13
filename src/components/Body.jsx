import React, { useEffect, useRef } from "react";
import "../styles/components-styles/main.css";
import Chart from "chart.js/auto";

function Body() {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      datasets: [
        {
          label: "Ganhos",
          data: [12, 19, 10, 5, 7, 5, 7, 10, 12, 15, 6, 3],
          backgroundColor: ["rgb(255, 0, 0)"],
          borderColor: ["rgb(255, 0, 0)"],
          borderWidth: 1,
        },
      ],
    };

    // Opções do gráfico (exemplo)
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    const ctx = chartRef.current; // Obtenha a referência atual do elemento canvas

    // Verifique se o gráfico já existe e destrua-o
    if (ctx && ctx.chart) {
      ctx.chart.destroy();
    }

    // Crie uma nova instância do gráfico de linha (corrigido)
    const newChart = new Chart(ctx, {
      type: "line",
      data: data,
      options: options,
    });

    // Armazene a referência ao gráfico no elemento canvas
    ctx.chart = newChart;
  }, []);

  return (
    <main className="main">
      <h1>Portfolio Overview</h1>
      <div className="line"></div>
      <canvas ref={chartRef} id="myChart" width="400" height="200"></canvas>
    </main>
  );
}

export default Body;
