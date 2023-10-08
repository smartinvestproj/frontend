import React, { useState, useEffect } from "react";
import '../styles/components-styles/searchBar.css'
import getStocks from "../services/getStocks";
import getTrades from "../services/getTrades";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [originalStocks, setOriginalStocks] = useState([]);
  const [originalTrades, setOriginalTrades] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const stocksResponse = await getStocks();
        const stocksData = stocksResponse.data;
        setOriginalStocks(stocksData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStocks();
  }, []);

  useEffect(() => {
    async function fetchTrades() {
      try {
        const tradesResponse = await getTrades();
        const tradesData = tradesResponse.data;
        setOriginalTrades(tradesData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTrades();
  }, []);

  const calculateTradeValues = (stockId) => {
    const trades = originalTrades.filter(trade => trade.stock.id === stockId);
    let totalValue = 0;
    let totalTotal = 0;

    trades.map(trade => {
      totalValue += parseFloat(trade.value);
      totalTotal += parseFloat(trade.total);
    });

    return {
      totalValue,
      totalTotal
    };
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);

    if (search === "") {
      setSearchResults([]);
    } else {
      const filteredResults = originalStocks.filter((stock) =>
        stock && stock.name && stock.name.toLowerCase().startsWith(search.toLowerCase())
      );

      setSearchResults(filteredResults);
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
        />
        <i className="fi fi-rr-search search-icon"></i>
      </div>
      {searchResults.length > 0 ? (
        <div className="dropdown">
          <ul style={{ listStyle: "none" }}>
            {searchResults.map((stock, index) => (
              <li key={index} className="results">
                <span className="result-name">{stock.name}</span>
                <span className="result-symbol">{stock.symbol}</span>
                {calculateTradeValues(stock.id) && (
                    <span className="result-value">
                      {calculateTradeValues(stock.id).totalTotal + "€"}
                    </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="dropdown">
          <ul style={{ listStyle: "none" }}>
            {search !== "" ? (
              <li className="results">No results found.</li>
            ) : null}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
