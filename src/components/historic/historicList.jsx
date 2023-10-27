import { useState } from "react";
import { useStockContext } from "../../context/stockContext";
import "./historicList.css";

export default function HistoricList() {
    const { trades } = useStockContext();
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    const requestSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const getClassNamesFor = (name) => {
        if (!sortConfig) return;

        return sortConfig.key === name ? sortConfig.direction : undefined;
    };

    const sortedTrades = [...trades].sort((a, b) => {
        if (sortConfig.key) {
            const aValue = a[sortConfig.key];
            const bValue = b[sortConfig.key];
            
            if (sortConfig.key === "state") {
                return sortConfig.direction === "asc" ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
            } else if (sortConfig.key === "price" || sortConfig.key === "total") {
                return sortConfig.direction === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
            } else {
                return sortConfig.direction === "asc" ? String(aValue).localeCompare(String(bValue)) : String(bValue).localeCompare(String(aValue));
            }
        }
        return 0;
    });

    return (
        <>
            <p className="portfolio-title">Historic</p>
            <hr />
            <table className="table-container-historic">
                <thead>
                    <tr>
                        <th onClick={() => requestSort("id")} className={getClassNamesFor("id")}>ID</th>
                        <th onClick={() => requestSort("stock.name")} className={getClassNamesFor("stock.name")}>Name</th>
                        <th onClick={() => requestSort("stock.symbol")} className={getClassNamesFor("stock.symbol")}>Symbol</th>
                        <th onClick={() => requestSort("date")} className={getClassNamesFor("date")}>Date</th>
                        <th onClick={() => requestSort("price")} className={getClassNamesFor("price")}>Price</th>
                        <th onClick={() => requestSort("quantity")} className={getClassNamesFor("quantity")}>Quantity</th>
                        <th onClick={() => requestSort("total")} className={getClassNamesFor("total")}>Trade Total</th>
                        <th onClick={() => requestSort("sell_price")} className={getClassNamesFor("sell_price")}>Sold Price</th>
                        <th onClick={() => requestSort("state")} className={getClassNamesFor("state")}>State</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTrades.map((trade) => (
                        <tr key={trade.id} className="teste-historic">
                            <td className="id-colored">#{trade.id}</td>
                            <td>{trade.stock.name}</td>
                            <td>{trade.stock.symbol}</td>
                            <td>{trade.date}</td>
                            <td>{trade.price}</td>
                            <td>{trade.quantity}</td>
                            <td>{trade.total}</td>
                            <td>{trade.sell_price}</td>
                            <td className={trade.state === 0 ? "state-sold" : "state-portfolio"}>
                                {trade.state === 0 ? "Sold" : "In Portfolio"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
