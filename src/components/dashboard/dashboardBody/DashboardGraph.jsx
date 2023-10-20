import React, { useEffect, useRef, useState } from "react";
import "./dashboardGraph.css";
import Chart from "chart.js/auto";
import { getTrades } from "../../../services/Trades.js";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const data = {
  labels: [],
  datasets: [
    {
      label: "",
      data: [],
      backgroundColor: ["rgb(217,83,79)"],
      borderColor: ["rgb(217,83,79)"],
      borderWidth: 2,
    },
  ],
};

export default function PortfolioPage({props}) {
  const chartRef = useRef(null);
  const [period, setPeriod] = useState("All"); // Estado para controlar o período
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

  function maisValias(trade) {
    let gains = 0;
    trades.sell_price === null && (trades.sell_price = parseFloat(trades.total));
    gains += parseFloat(trades.sell_price) - parseFloat(trades.total);
    return gains;
  }

  function totalTradeValues(trade) {
    if (trade.state === 1) {
      return parseFloat(trade.total);
    } else {
      return 0;
    }
  }

  function stocksSold(trade) {
    if (trade.state === 0) {
      return parseFloat(stock.total);
    } else {
      return 0;
    }
  }

  function calculateAll(trades) {
    const totalTrades = totalTradeValues(trades);
    const stocksSoldValue = stocksSold(trades);
    const totalGains = maisValias(trades);
    const dividends = trades.map((trade) => trade.dividends);
    
    const total = totalTrades - stocksSoldValue + totalGains + dividends;
    
    return {
      tradeId: trades.id,
      total,
    };
  }

  console.log('total trade values:' + totalTradeValues(trades));
  console.log('stocks sold:' + stocksSold(trades));
  console.log('mais valias:' + maisValias(trades));
  console.log('total:' + calculateAll(trades));

  useEffect(() => {
    updatePeriod("All");
  }, [period]);

  // Função para atualizar o período do gráfico
  const updatePeriod = (newPeriod) => {
    // setPeriod(newPeriod);

    // Modify the dataset and labels when "1 day" is selected
    let newData = null;

    if (newPeriod === "1 day") {
      const currentDate = new Date();
      const hourIndex = currentDate.getHours();

      const DayLabels = [];
      for (let i = 0; i < 24; i++) {
        const hour = (hourIndex + i) % 24;
        DayLabels.push(`${hour}:00`);
      }

      const hoursData = DayLabels.map(() => Math.floor(Math.random() * 20));

      newData = {
        labels: DayLabels,
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
      const currentDate = new Date();
      const weekLabels = [];

      for (let i = 7; i >= 1; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        const dayOfWeek = date.getDay();
        const dayName = dayNames[dayOfWeek];
        weekLabels.push(dayName);
      }

      const weekData = weekLabels.map(() => Math.floor(Math.random() * 21));

      newData = {
        labels: weekLabels,
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
      const currentDate = new Date();
      const monthLabels = [];
      const monthData = [];

      for (let i = 1; i < 31; i++) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        const day = date.getDate();
        monthLabels.unshift(day);
        monthData.unshift(Math.floor(Math.random() * 20));
      }

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
      const monthIndex = new Date().getMonth();
      const Months3Labels = Array.from(
        { length: 3 },
        (_, i) => monthNames[monthIndex - 2 + i]
      );
      const months3Data = Array.from({ length: 90 }, () =>
        Math.floor(Math.random() * 20)
      );

      newData = {
        labels: Months3Labels,
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
      const monthIndex = new Date().getMonth();
      const Months6Labels = Array.from(
        { length: 6 },
        (_, i) => monthNames[monthIndex - 5 + i]
      );
      const months6Data = Array.from({ length: 180 }, () =>
        Math.floor(Math.random() * 20)
      );
      newData = {
        labels: Months6Labels,
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
      const monthIndex = new Date().getMonth();
      const months12Labels = [];

      for (let i = 0; i < 12; i++) {
        const month = (monthIndex + i) % 12;
        months12Labels.push(monthNames[month]);
      }

      const yearData = months12Labels.map(() => Math.floor(Math.random() * 20));

      newData = {
        labels: months12Labels,
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
      let minDate = new Date();
      const currentDate = new Date();
      let allLabels = [];
      let AllData = calculateAll(trades);

      trades.map((trade) => {
        const date = new Date(trade.date);
        if (date < minDate) {
          minDate = date;
        }
      });

      const timeDiff = currentDate - minDate;
      const interval = timeDiff / 4;

      allLabels.push(minDate.toLocaleDateString("pt-PT"));
      for (let i = 1; i <= 3; i++) {
        const intermediateDate = new Date(minDate.getTime() + i * interval);
        allLabels.push(intermediateDate.toLocaleDateString("pt-PT"));
      }
      allLabels.push(currentDate.toLocaleDateString("pt-PT"));

      newData = {
        labels: allLabels,
        datasets: [
          {
            label: "",
            data: [0, AllData],
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
          pointStyle: "rect",
        },
      },
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
            <i
              className="fi fi-rr-chart-line-up"
              style={{ marginRight: "5px" }}
            ></i>{" "}
            All
          </button>
        </div>
        <canvas
          ref={chartRef}
          id="overviewChart"
          width="400"
          height="150"
        ></canvas>
      </div>
    </main>
  );
}