import React from "react";
import { useStockContext } from "../../context/stockContext";

import "./portfolioTable.css";

function PortfolioTable() {
    const { trades, totalTradeValuesAll, totalTradeValuesYear, totalTradeSoldAll, totalTradeSoldYear, transactionValueAll,
        transactionValueYear, maisValiasAll, maisValiasYear, dividendsAll, dividendsYear, totalInvestementAll, totalInvestementYear, investmentOwnCapitalAll, investmentOwnCapitalYear, investmentCapitalGainAll, investmentCapitalGainYear, taxAll, taxYear, totalInvestmentProfitabilityAll, totalInvestmentProfitabilityYear, ownCapitalProfitabilityAll, ownCapitalProfitabilityYear, uniqueYears, setSelectedYear, selectedYear } = useStockContext();

    // Filter Trades By Year
    const filteredTrades = trades.filter(trade => new Date(trade.date).getFullYear() === parseInt(selectedYear, 10));

    // Group all trades with the same stock id and Year
    const tradesByStockYear = {};
    filteredTrades.forEach(trade => {
        const stockId = trade.stock.id;
        if (!tradesByStockYear[stockId]) {
            tradesByStockYear[stockId] = [];
        }
        tradesByStockYear[stockId].push(trade);
    });

    // Group all trades with the same stock id
    const tradesByStock = {};

    trades.forEach(trade => {
        const stockId = trade.stock.id;
        if (!tradesByStock[stockId]) {
            tradesByStock[stockId] = [];
        }
        tradesByStock[stockId].push(trade);
    });

    return (
        <div className="portfolio-container">
            <h1>Portfolio</h1>

            <hr />

            {/* Main Table */}
            <h2 className="title-container">Main view</h2>
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Compra</th>
                        <th>Venda</th>
                        <th>Transacionado</th>
                        <th>Total Investimento</th>
                        <th>Investimento Capital Próprio</th>
                        <th>Investimento Capital Ganho</th>
                        <th>Mais Valias</th>
                        <th>Custos</th>
                        <th>Dividendos</th>
                        <th className="gold">Rentabilidade Invstimento Total</th>
                        <th className="gold">Rentabilidade Capital Próprio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalTradeValuesAll()}€</td>
                        <td>{totalTradeSoldAll()}€</td>
                        <td>{transactionValueAll()}€</td>
                        <td>{totalInvestementAll()}€</td>
                        <td>{investmentOwnCapitalAll()}€</td>
                        <td>{investmentCapitalGainAll()}€</td>
                        <td>{maisValiasAll()}</td>
                        <td>{taxAll()}</td>
                        <td>{dividendsAll()}€</td>
                        <td style={{ color: totalInvestmentProfitabilityAll() > 0 ? '#22B573' : '#D9534F' }}>
                            {totalInvestmentProfitabilityAll().toFixed(2)}%
                        </td>
                        <td style={{ color: ownCapitalProfitabilityAll() > 0 ? '#22B573' : '#D9534F' }}>
                            {ownCapitalProfitabilityAll().toFixed(2)}%
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Dividend Table */}
            <h2 className="title-container">Dividendos</h2>
            <table className="table-container">
                <thead>
                    <tr>
                        {Object.values(tradesByStock).map((stockTrades, index) => (
                            <th key={index}>{stockTrades[0].stock.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.values(tradesByStock).map((stockTrades, index) => {
                            const totalDividends = stockTrades.reduce((total, trade) => total + parseFloat(trade.dividends), 0);
                            return <td key={index}>{totalDividends}€</td>;
                        })}
                    </tr>
                </tbody>
            </table>

            {/* Select year and title */}
            <div className="title-select-container">
            <h2 className="left-title">Main view {selectedYear}</h2>
            <div className="select-container"> 
                <p>Select Year</p>
                <select
                    className="select-year"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}>
                    {uniqueYears.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                </div>
            </div>

            {/* Dividend Table by Year */}
            <table className="table-container">
                <thead>
                    <tr>
                        <th>Compra</th>
                        <th>Venda</th>
                        <th>Transacionado</th>
                        <th>Total Investimento</th>
                        <th>Investimento Capital Próprio</th>
                        <th>Investimento Capital Ganho</th>
                        <th>Mais Valias</th>
                        <th>Custos</th>
                        <th>Dividendos</th>
                        <th className="gold">Rentabilidade Invstimento Total</th>
                        <th className="gold">Rentabilidade Capital Próprio</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{totalTradeValuesYear()}€</td>
                        <td>{totalTradeSoldYear()}€</td>
                        <td>{transactionValueYear()}€</td>
                        <td>{totalInvestementYear()}€</td>
                        <td>{investmentOwnCapitalYear()}€</td>
                        <td>{investmentCapitalGainYear()}€</td>
                        <td>{maisValiasYear()}</td>
                        <td>{taxYear()}</td>
                        <td>{dividendsYear()}€</td>
                        <td style={{ color: totalInvestmentProfitabilityYear() > 0 ? '#22B573' : '#D9534F' }}>
                            {totalInvestmentProfitabilityYear().toFixed(2)}%
                        </td>
                        <td style={{ color: ownCapitalProfitabilityYear() > 0 ? '#22B573' : '#D9534F' }}>
                            {ownCapitalProfitabilityYear().toFixed(2)}%
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Dividend Table */}
            <h2 className="title-container">Dividendos {selectedYear}</h2>
            <table className="table-container">
                <thead>
                    <tr>
                        {Object.values(tradesByStockYear).map((stockTrades, index) => (
                            <th key={index}>{stockTrades[0].stock.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.values(tradesByStockYear).map((stockTrades, index) => {
                            const totalDividendsYear = stockTrades.reduce((total, trade) => total + parseFloat(trade.dividends), 0);
                            return <td key={index}>{totalDividendsYear}€</td>;
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default PortfolioTable;

