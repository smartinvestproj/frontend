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
    const [selectedYear, setSelectedYear] = useState("2023");
    const uniqueYears = [...new Set(trades.map(trade => new Date(trade.date).getFullYear()))];

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

    // Filter Stocks By Year

    function filterTradessByYear(year) {
        return trades.filter(trade => new Date(trade.date).getFullYear() === parseInt(year));
    }

    // Calculate Trade Values By Stock Id (Total for each one)

    function tradeValuesByStockId(stockId) {

        let totalTotal = 0;

        const tradeFilter = trades.filter(trade => trade.stock.id === stockId);

        tradeFilter.map(trade => {
            totalTotal += parseFloat(trade.total);
        });
        return { totalTotal };
    }

    //__________________________________________________________________________________________________//

    // Calculate Total Values of All Trades receiving all trades or filtered trades by year

    function calcTtradeValue(trades_) {

        let allTradeValue = 0;

        trades_.map(trade => {
            allTradeValue += parseFloat(trade.total);
        });
        return allTradeValue;
    }

    // Calculate Total Values of All Trades

    function totalTradeValuesAll() {
        return calcTtradeValue(trades);
    }

    // Calculate Total Values of All Trades YEAR

    function totalTradeValuesYear() {
        const filteredTrades = filterTradessByYear(selectedYear);
        return calcTtradeValue(filteredTrades);
    }

    //__________________________________________________________________________________________________//

    // Calculate Total of Stocks Sold receiving all trades or filtered trades by year

    function calcStocksSold(trades_) {

        let allStocksSold = 0;

        const tradeFilter = trades_.filter(trade => trade.state === 0);

        tradeFilter.forEach(trade => {
            allStocksSold += parseFloat(trade.sell_price);
        });
        return allStocksSold;
    }

    // Calculate Total Values of All Trades Sold

    function totalTradeSoldAll() {
        return calcStocksSold(trades);
    }

    // Calculate Total Values of All Trades YEAR

    function totalTradeSoldYear() {
        const filteredTrades = filterTradessByYear(selectedYear);
        return calcStocksSold(filteredTrades);
    }

    //__________________________________________________________________________________________________//

    // Calculate Transaction Value All

    function transactionValueAll() {
        return totalTradeSoldAll() + totalTradeValuesAll();
    }

    // Calculate Transaction Value Year

    function transactionValueYear() {
        return totalTradeSoldYear() + totalTradeValuesYear();
    }

    //__________________________________________________________________________________________________//

    // Calculate Total investement All

    function totalInvestementAll() {

        return totalTradeValuesAll() - totalTradeSoldAll() + maisValiasAll() + dividendsAll();
    }

    // Calculate Total investement Year

    function totalInvestementYear() {

        return totalTradeValuesYear() - totalTradeSoldYear() + maisValiasYear() + dividendsYear();
    }

    //__________________________________________________________________________________________________//

    // Calculate Investment of own capital All

    function investmentOwnCapitalAll() {

        return totalInvestementAll() - maisValiasAll() - dividendsAll();
    }

    // Calculate Investment of own capital Year

    function investmentOwnCapitalYear() {

        return totalInvestementYear() - maisValiasYear() - dividendsYear();
    }

    //__________________________________________________________________________________________________//

    // Calculate Investment Capital Gain All

    function investmentCapitalGainAll() {

        return maisValiasAll() + dividendsAll();
    }

    // Calculate Investment Capital Gain Year

    function investmentCapitalGainYear() {

        return maisValiasYear() + dividendsYear();
    }

    //__________________________________________________________________________________________________//

    // Calculate "Mais Valias"

    function calcMaisValias(trades_) {

        let gains = 0;

        trades_.map(trade => {
            trade.sell_price === null && (trade.sell_price = parseFloat(trade.total));
            gains += (parseFloat(trade.sell_price) - parseFloat(trade.total))
        });
        return gains
    }

    // Calculate "Mais Valias" All

    function maisValiasAll() {
        return calcMaisValias(trades);
    }

    // Calculate "Mais Valias" Year

    function maisValiasYear() {
        const filteredTrades = filterTradessByYear(selectedYear);
        return calcMaisValias(filteredTrades);
    }

    //__________________________________________________________________________________________________//

    // Calculate TAX 

    function calcTax(trades_) {
        let tax = 0;

        trades_.map(trade => {
            trade.tax === null && (trade.tax = 0);
            tax += parseFloat(trade.tax);
        });
        return tax;
    }

    // Calculate Tax All

    function taxAll() {
        return calcTax(trades);
    }

    // Calculate Tax Year

    function taxYear() {
        const filteredTrades = filterTradessByYear(selectedYear);
        return calcTax(filteredTrades);
    }


    //__________________________________________________________________________________________________//

    // Calculate dividends 

    function caclDividends(trades_) {

        let dividends = 0;

        trades_.map(trade => {
            trade.dividends === null && (trade.dividends = 0);
            dividends += parseFloat(trade.dividends);
        });
        return dividends;
    }

    // Calculate dividends All

    function dividendsAll() {
        return caclDividends(trades);
    }

    // Calculate dividends Year

    function dividendsYear() {
        const filteredTrades = filterTradessByYear(selectedYear);
        return caclDividends(filteredTrades);
    }

    //__________________________________________________________________________________________________//

    // Calculate Total investment profitability All

    function totalInvestmentProfitabilityAll() {

        return (dividendsAll() + maisValiasAll()) / totalInvestementAll();
    }

    // Calculate Total investment profitability Year

    function totalInvestmentProfitabilityYear() {

        return (dividendsYear() + maisValiasYear()) / totalInvestementYear();
    }

    //__________________________________________________________________________________________________//

    // Calculate Own Capital Profitability All

    function ownCapitalProfitabilityAll() {

        return (dividendsAll() + maisValiasAll()) / investmentOwnCapitalAll();
    }

    // Calculate Own Capital Profitability Year

    function ownCapitalProfitabilityYear() {

        return (dividendsYear() + maisValiasYear()) / investmentOwnCapitalYear();
    }

    //__________________________________________________________________________________________________//

    return (
        <StockContext.Provider value={{
            stocks,
            setStocks,
            trades,
            setTrades,
            tradeValuesByStockId,
            totalTradeValuesAll,
            totalTradeValuesYear,
            totalTradeSoldAll,
            totalTradeSoldYear,
            transactionValueAll,
            transactionValueYear,
            maisValiasAll,
            maisValiasYear,
            dividendsAll,
            dividendsYear,
            totalInvestementAll,
            totalInvestementYear,
            investmentOwnCapitalAll,
            investmentOwnCapitalYear,
            investmentCapitalGainAll,
            investmentCapitalGainYear,
            taxAll,
            taxYear,
            totalInvestmentProfitabilityAll,
            totalInvestmentProfitabilityYear,
            ownCapitalProfitabilityAll,
            ownCapitalProfitabilityYear,
            uniqueYears,
            setSelectedYear,
            selectedYear,
        }}>
            {children}
        </StockContext.Provider>
    );
}

export { StockContext, StockProvider };