import React, { useEffect, useRef, useState } from "react";
import "./dashboardGraph.css";
import Chart from "chart.js/auto";



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

export default function PortfolioPage({props}) {
  const chartRef = useRef(null);
  const [period, setPeriod] = useState("1 day"); // Estado para controlar o período
  

  useEffect(() => {
    

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
    // setPeriod(newPeriod);

    // Modify the dataset and labels when "1 day" is selected
    let newData = null;

    if (newPeriod === "1 day") {
      const hoursLabels = Array.from({ length: 24 }, (_, i) => `${i}h`);
      const hoursData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 20)); // Generate random data
      newData = {
        labels: hoursLabels,
        datasets: [
          {
            label: "",
            data: hoursData,
            backgroundColor: ["rgb(217,83,79)"],
            borderColor: ["rgb(217,83,79)"],
            borderWidth: 2,
          },
        ],
      };
    } else if (newPeriod === "1 week") {
      const weekData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 21)); // Generate random data up to 20
      newData = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: "",
            data: weekData,
            backgroundColor: ["rgb(217,83,79)"],
            borderColor: ["rgb(217,83,79)"],
            borderWidth: 2,
          },
        ],
      };
    } else if (newPeriod === "1 month") {
      const monthLabels = Array.from({ length: 30 }, (_, i) => `${i}`);
      const monthData = Array.from({ length: 30 }, () => Math.floor(Math.random() * 20)); // Generate random data
      newData = {
        labels: monthLabels,
        datasets: [
          {
            label: "",
            data: monthData,
            backgroundColor: ["rgb(217,83,79)"],
            borderColor: ["rgb(217,83,79)"],
            borderWidth: 2,
          },
        ],
      };
    } else if (newPeriod === "3 months") {
      const months3Labels = Array.from({ length: 90 }, (_, i) => `${i}`);
      const months3Data = Array.from({ length: 90 }, () => Math.floor(Math.random() * 20)); // Generate random data
      newData = {
        labels: months3Labels,
        datasets: [
          {
            label: "",
            data: months3Data,
            backgroundColor: ["rgb(217,83,79)"],
            borderColor: ["rgb(217,83,79)"],
            borderWidth: 2,
          },
        ],
      };
    } else if (newPeriod === "6 months") {
      const months6Labels = Array.from({ length: 180 }, (_, i) => `${i}`);
      const months6Data = Array.from({ length: 180 }, () => Math.floor(Math.random() * 20)); // Generate random data
      newData = {
        labels: months6Labels,
        datasets: [
          {
            label: "",
            data: months6Data,
            backgroundColor: ["rgb(217,83,79)"],
            borderColor: ["rgb(217,83,79)"],
            borderWidth: 2,
          },
        ],
      };
    } else if (newPeriod === "1 year") {
      const yearData = Array.from({ length: 12 }, () => Math.floor(Math.random() * 20)); // Generate random data
      newData = {
        labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        datasets: [
          {
            label: "",
            data: yearData,
            backgroundColor: ["rgb(217,83,79)"],
            borderColor: ["rgb(217,83,79)"],
            borderWidth: 2,
          },
        ],
      };
    } else if (newPeriod === "All") {
      newData = {
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
    }

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
    const ctx = chartRef.current;

    if (ctx && ctx.chart) {
      ctx.chart.destroy();
    }

    const newChart = new Chart(ctx, {
      type: "line",
      data: newData, // Use the updated dataset
      options: options,
    });

    ctx.chart = newChart;

    
  };

  return (
    <main className="main">
      <div className="graph">
        <div className="myPortfolio">
          <h1 className="my-portolio-h1">My Portfolio</h1>
        </div>
        <div className="money">
          <h1>€2346,67</h1>
          <div className="profit">
            <p>-10,4%</p>
          </div>
        </div>
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