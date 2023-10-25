import React, { useEffect, useState } from "react";
import { getTrades } from "../../services/Trades";
import "./historicList.css";

export default function HistoricList() {
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        getTrades().then((response) => {
            setTrades(response.data);
        });
    }, []);

    console.log(trades);
    return (
        <>
            <p className="portfolio-title">Historic</p>

            <hr />
            <ul className="historic-container">
                {trades.map((trade) => (
                    <li key={trade.id}>
                        <div className="historic-row">
                            <p className="id-colored">#{trade.id}</p>
                            <p>Name: {trade.stock.name} </p>
                            <p>Symbol: {trade.stock.symbol} </p>
                            <p>Date: {trade.date}</p>
                            <p>Price: {trade.price}</p>
                            <p>Quantity: {trade.quantity}</p>
                            <p>Trade total: {trade.total}</p>
                            <p className={trade.state === 0 ? "state-sold" : "state-portfolio"}>
                                {trade.state === 0 ? "Sold" : "In Portfolio"}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}