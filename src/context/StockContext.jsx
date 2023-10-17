import { createContext, useContext, useEffect, useState } from "react";
import getStocks from "../services/getStocks";
import getTrades from "../services/getTrades";

const StockContext = createContext();

export function useStockContext() {
    return useContext(StockContext);
}

const StockProvider = ({ children }) => {
    const [stocks, setStocks] = useState([]);
    const [trades, setTrades] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const stocksResponse = await getStocks();
                const tradesResponse = await getTrades();
                
                setStocks(stocksResponse.data);
                setTrades(tradesResponse.data);
            } catch (error) {
                console.error("ERROR FETCHING DATA FROM API");
            }
        }
        fetchData();
    }, []);

    const calculateTradeValues = (stockId) => {
        const tradeFilter = trades.filter(trade => trade.stock.id === stockId);
        let totalValue = 0;
        let totalTotal = 0;

        tradeFilter.map(trade => {
            totalValue += parseFloat(trade.value);
            totalTotal += parseFloat(trade.total);
        });

        return {
            totalValue,
            totalTotal
        };
    };

    return (
        <StockContext.Provider value={{ stocks, setStocks, trades, setTrades, calculateTradeValues }}>
            {children}
        </StockContext.Provider>
    );
}

export { StockContext, StockProvider };