import React from "react";

import "./portfolioTable.css";

function PortfolioTable() {
  return (
  <div className="portfolio-container">
    <h1>Portfolio</h1>

    <hr/>

    {/* Main Table */}
    <h2 className="title-container">Main</h2>
    <table className="table-container">
        <thead>
            <tr>
                <th>Compra</th>
                <th>Venda</th>
                <th>Transacionado</th>
                <th>Total Investido</th>
                <th>Investimento Capital Próprio</th>
                <th>Investimento Capital Ganho</th>
                <th>Capitalizado</th>
                <th>Capitalizaçao</th>
                <th>Mais Valias</th>
                <th>Corretagem</th>
                <th>Custos</th>
                <th className="gold">Rentabilidade Invstimento Total</th>
                <th className="gold">Rentabilidade Capital Próprio</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
                <td>20000</td>
            </tr>
        </tbody>
    </table>

    {/* Dividend Table */}
    <h2 className="title-container">Dividendos</h2>
    <table className="table-container">
        <thead>
            <tr>
                <th>Dividendos Stock</th>
                <th>Dividendos Bruto</th>
                <th>Dividendos Net</th>
                <th>Month Dividend</th>
                <th>Realizado Bruto</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>20000</td>
                <td>300</td>
                <td>20000</td>
                <td>300</td>
                <td>20000</td>
            </tr>
        </tbody>
    </table>

   {/* Impostos Table */}
    <h2 className="title-container">Impostos</h2>
    <table className="table-container">
        <thead>
            <tr>
                <th>Impostos Pagos</th>
                <th>Impostos a Pagar</th>
                <th>Impostos a Receber</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>20000</td>
                <td>300</td>
                <td>300</td>
            </tr>
        </tbody>
    </table>
  </div>
  );
}

export default PortfolioTable;

