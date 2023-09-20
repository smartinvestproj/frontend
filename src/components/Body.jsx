import React, { useEffect, useRef, useState } from "react";
import "../styles/components-styles/body.css";
import Chart from "chart.js/auto";

function Body() {
  const chartRef = useRef(null);
  const [period, setPeriod] = useState("1 day"); // Estado para controlar o período

  useEffect(() => {
    const data = {
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      datasets: [
        {
          label: "",
          data: [12, 19, 10, 5, 7, 4, 7, 10, 12, 15, 6, 3],
          backgroundColor: ["rgb(217,83,79)"],
          borderColor: ["rgb(217,83,79)"],
          borderWidth: 2,
        },
      ],
    };

    // Opções do gráfico (exemplo)
    const options = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(198, 166, 83, 0.2)", // Define a cor do quadriculado horizontal
          },
          ticks: {
            color: "white", // Define a cor das labels dos meses
          },
        },
        x: {
          grid: {
            color: "rgba(198, 166, 83, 0.2)", // Define a cor do quadriculado horizontal
          },
          ticks: {
            color: "white", // Define a cor das labels dos meses
          },
        },
      },
      plugins: {
        legend: {
        display: false, // Define a legenda como invisível
        },
    },
    elements: {
      point: {
        radius: 0,
        pointStyle: 'rect',
      }
    }
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
  }, [period]);

  // Função para atualizar o período do gráfico
  const updatePeriod = (newPeriod) => {
    setPeriod(newPeriod);
  };

  return (
    <main className="main">
      <h1>Portfolio Overview</h1>
      <div className="line"></div>
      <div className="graph">
        <div className="money">
          <h1>€2346,67</h1>
          <div className="profit">
            <p>-10,4%</p>
          </div>
        </div>
      <div className="line2"></div>
      <div className="updateButtons">
        <button onClick={() => updatePeriod("1 day")}>1 day</button>
        <button onClick={() => updatePeriod("1 week")}>1 week</button>
        <button onClick={() => updatePeriod("1 month")}>1 month</button>
        <button onClick={() => updatePeriod("3 months")}>3 months</button>
        <button onClick={() => updatePeriod("6 months")}>6 months</button>
        <button onClick={() => updatePeriod("1 year")}>1 year</button>
        <button onClick={() => updatePeriod("All")} className="all">
          <i className="fi fi-rr-chart-line-up" style={{ marginRight: '5px' }}></i> All
        </button>
      </div>
        <canvas ref={chartRef} id="overviewChart" width="400" height="150"></canvas>
      </div>
    </main>
  );
}

export default Body;
