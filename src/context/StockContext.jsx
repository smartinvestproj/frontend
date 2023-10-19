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

    // Calculate Trade Values By Stock Id (Total for each one)

    function tradeValuesByStockId(stockId) {

        let totalTotal = 0;

        const tradeFilter = trades.filter(trade => trade.stock.id === stockId);

        tradeFilter.map(trade => {
            totalTotal += parseFloat(trade.total);
        });
        return { totalTotal };
    }

    // Calculate Total Values of All Trades

    function totalTradeValues() {

        let TotalValuesTrades = 0;

        trades.forEach(trade => {
            TotalValuesTrades += parseFloat(trade.total);
        });
        return TotalValuesTrades;
    }

    // Calculate Total of Stocks Sold

    function stocksSold() {

        let totalStocksSold = 0;

        const tradeFilter = trades.filter(trade => trade.state === 0);

        tradeFilter.forEach(trade => {
            totalStocksSold += parseFloat(trade.sell_price);
        });
        return totalStocksSold;
    }

    // Calculate Transaction Value

    function transactionValue() {
        return stocksSold(trades) + totalTradeValues(trades);
    }

    // Calculate "Mais Valias"

    function maisValias() {

        let gains = 0;

        trades.map(trade => {
            trade.sell_price === null && (trade.sell_price = parseFloat(trade.total));
            gains += (parseFloat(trade.sell_price) - parseFloat(trade.total))
        });
        return gains
    }

    // Calculate dividends

    function dividends() {

        let dividends = 0;

        trades.map(trade => {
            trade.dividends === null && (trade.dividends = 0);
            dividends += parseFloat(trade.dividends);
        });
        return dividends;
    }

    // Calculate TAX

    function tax() {
        let tax = 0;

        trades.map(trade => {
            trade.tax === null && (trade.tax = 0);
            tax += parseFloat(trade.tax);
        });
        return tax;
    }

    // Calculate Total investement

    function totalInvestement() {

        return totalTradeValues() - stocksSold() + maisValias() + dividends();
    }

    // Calculate Investment of own capital

    function investmentOwnCapital() {

        return totalInvestement() - maisValias() - dividends();
    }

    // Calculate Investment Capital Gain

    function investmentCapitalGain() {

        return maisValias() + dividends();
    }

    // Calculate Total investment profitability

    function totalInvestmentProfitability() {

        return (dividends() + maisValias()) / totalInvestement();
    }

    // Calculate Own Capital Profitability

    function ownCapitalProfitability() {

        return (dividends() + maisValias()) / investmentOwnCapital();
    }

    return (
        <StockContext.Provider value={{
            stocks,
            setStocks,
            trades,
            setTrades,
            tradeValuesByStockId,
            totalTradeValues,
            stocksSold,
            transactionValue,
            totalInvestement,
            investmentOwnCapital,
            investmentCapitalGain,
            maisValias,
            tax,
            dividends,
            totalInvestmentProfitability,
            ownCapitalProfitability,
        }}>
            {children}
        </StockContext.Provider>
    );
}

export { StockContext, StockProvider };