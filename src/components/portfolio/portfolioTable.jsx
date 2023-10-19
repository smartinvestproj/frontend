import React from "react";
import { useStockContext } from "../../context/stockContext";

import "./portfolioTable.css";

function PortfolioTable() {
    const { trades, stocks, totalTradeValues, stocksSold, transactionValue, totalInvestement, investmentOwnCapital, investmentCapitalGain, maisValias, tax, totalInvestmentProfitability, ownCapitalProfitability, dividends } = useStockContext();

    return (
        <div className="portfolio-container">
            <h1>Portfolio</h1>

            <hr />

            {/* Main Table */}
            <h2 className="title-container">Main</h2>
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
                        <td>{totalTradeValues()}€</td>
                        <td>{stocksSold()}€</td>
                        <td>{transactionValue()}€</td>
                        <td>{totalInvestement()}€</td>
                        <td>{investmentOwnCapital()}€</td>
                        <td>{investmentCapitalGain()}</td>
                        <td>{maisValias()}</td>
                        <td>{tax()}</td>
                        <td>{dividends()}€</td>
                        <td style={{ color: totalInvestmentProfitability() > 0 ? '#22B573' : '#D9534F' }}>
                            {totalInvestmentProfitability().toFixed(2)}%
                        </td>
                        <td style={{ color: ownCapitalProfitability() > 0 ? '#22B573' : '#D9534F' }}>
                            {ownCapitalProfitability().toFixed(2)}%
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* Dividend Table */}
            <h2 className="title-container">Dividendos</h2>
            <table className="table-container">
                <thead>
                    <tr>
                        {trades.map((trade, index) => (
                            <th key={index}>{trade.stock.name}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {trades.map((trade, index) => (
                            <td key={index}>{trade.dividends}</td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </div>

    );
}

export default PortfolioTable;

