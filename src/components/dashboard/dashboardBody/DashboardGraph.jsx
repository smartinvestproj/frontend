import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { useStockContext } from "../../../context/stockContext";
import "./dashboardGraph.css";

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

export default function PortfolioPage() {
  const { trades, totalTradeValuesAll } = useStockContext();
  const chartRef = useRef(null);
  const [period, setPeriod] = useState("All");


  function calculateAll(trades) {
    const results = trades.map((trade) => {

      const total = totalTradeValuesAll();

      return {
        tradeId: trade.id,
        tradeDate: trade.date,
        total,
      };
    });

    return results;
  }

  useEffect(() => {
    updatePeriod("All");
  }, [trades, period]);

  const updatePeriod = (newPeriod) => {
    let newData = null;

    if (newPeriod === "1 week") {
      const currentDate = new Date();
      const weekLabels = [];
      const weekData = [];

      const lastWeekTrades = calculateAll(trades).filter((trade) => {
        const tradeDate = new Date(trade.tradeDate);
        const oneWeekAgo = new Date(currentDate);
        oneWeekAgo.setDate(currentDate.getDate() - 7);

        return tradeDate >= oneWeekAgo && tradeDate <= currentDate;
      });

      for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        const dayOfWeek = date.getDay();
        const dayName = dayNames[dayOfWeek];
        weekLabels.push(dayName);
      }

      for (const day of weekLabels) {
        const totalForDay = lastWeekTrades
          .filter(
            (trade) => dayNames[new Date(trade.tradeDate).getDay()] === day
          )
          .reduce((acc, trade) => acc + trade.total, 0);
        weekData.push(totalForDay);
      }

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
      const oneMonthAgo = new Date(currentDate);
      oneMonthAgo.setMonth(currentDate.getMonth() - 1);

      const monthLabels = [];
      const monthData = [];

      const lastMonthTrades = calculateAll(trades).filter((trade) => {
        const tradeDate = new Date(trade.tradeDate);
        return tradeDate >= oneMonthAgo && tradeDate < currentDate;
      });

      for (let i = 30; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);
        const day = date.getDate();
        monthLabels.push(day);
      }

      for (const day of monthLabels) {
        const totalForDay = lastMonthTrades
          .filter((trade) => {
            const tradeDate = new Date(trade.tradeDate);
            return tradeDate.getDate() === day;
          })
          .reduce((acc, trade) => acc + trade.total, 0);
        monthData.push(totalForDay);
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
      const currentDate = new Date();
      const Months3Labels = [];
      const months3Data = [];

      const last3MonthsTrades = calculateAll(trades).filter((trade) => {
        const tradeDate = new Date(trade.tradeDate);
        const threeMonthsAgo = new Date(currentDate);
        threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

        return tradeDate >= threeMonthsAgo && tradeDate <= currentDate;
      });

      for (let i = 3; i > 0; i--) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);
        const month = date.getMonth();
        const monthName = monthNames[month];
        Months3Labels.push(monthName);
      }

      for (const month of Months3Labels) {
        const totalForMonth = last3MonthsTrades
          .filter((trade) => {
            const tradeMonth = new Date(trade.tradeDate).getMonth();
            return tradeMonth === monthNames.indexOf(month);
          })
          .reduce((acc, trade) => acc + trade.total, 0);
        months3Data.push(totalForMonth);
      }

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
      const currentDate = new Date();
      const Months6Labels = [];
      const months6Data = [];

      const last6MonthsTrades = calculateAll(trades).filter((trade) => {
        const tradeDate = new Date(trade.tradeDate);
        const sixMonthsAgo = new Date(currentDate);
        sixMonthsAgo.setMonth(currentDate.getMonth() - 6);

        return tradeDate >= sixMonthsAgo && tradeDate <= currentDate;
      });

      for (let i = 6; i > 0; i--) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);
        const month = date.getMonth();
        const monthName = monthNames[month];
        Months6Labels.push(monthName);
      }

      for (const month of Months6Labels) {
        const totalForMonth = last6MonthsTrades
          .filter((trade) => {
            const tradeMonth = new Date(trade.tradeDate).getMonth();
            return tradeMonth === monthNames.indexOf(month);
          })
          .reduce((acc, trade) => acc + trade.total, 0);
        months6Data.push(totalForMonth);
      }

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
      const currentDate = new Date();
      const twelveMonthsAgo = new Date(currentDate);
      twelveMonthsAgo.setMonth(currentDate.getMonth() - 12);

      const yearLabels = [];
      const yearData = [];

      const last12MonthsTrades = calculateAll(trades).filter((trade) => {
        const tradeDate = new Date(trade.tradeDate);
        return tradeDate >= twelveMonthsAgo && tradeDate <= currentDate;
      });

      for (let i = 12; i > 0; i--) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);
        const month = date.getMonth();
        const monthName = monthNames[month];
        yearLabels.push({ label: monthName, year: date.getFullYear() });
      }

      for (const label of yearLabels) {
        const totalForMonth = last12MonthsTrades
          .filter((trade) => {
            const tradeDate = new Date(trade.tradeDate);
            return (
              tradeDate.getMonth() === monthNames.indexOf(label.label) &&
              tradeDate.getFullYear() === label.year
            );
          })
          .reduce((acc, trade) => acc + trade.total, 0);

        yearData.push(totalForMonth);
      }

      newData = {
        labels: yearLabels.map((label) => label.label),
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
      let allLabels = [];
      let AllData = calculateAll(trades);
      const values = AllData.map((trade) => trade.total);

      trades.map((trade) => {
        const date = new Date(trade.date);
        if (date < minDate) {
          minDate = date;
        }
        allLabels.push(date.toLocaleDateString("pt-PT"));
      });

      newData = {
        labels: allLabels,
        datasets: [
          {
            label: "",
            data: values,
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
            color: "rgba(198, 166, 83, 0.2)",
          },
          ticks: {
            color: "white",
          },
        },
        x: {
          grid: {
            color: "rgba(198, 166, 83, 0.2)",
          },
          ticks: {
            color: "white",
          },
        },
      },
      plugins: {
        legend: {
          display: false,
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
      data: newData,
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
          <h1>€ {totalTradeValuesAll()}</h1>
        </div>
        <div className="updateButtons">
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