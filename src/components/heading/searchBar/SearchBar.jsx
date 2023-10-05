import React, { useState } from "react";
import './searchBar.css'

function SearchBar() {
  const initialResults = [
    { name: "Netflix", symbol: "NFLX", value: "€429,70", percentage: "-8,92%" },
    { name: "Amazon", symbol: "AMZN", value: "€781,82", percentage: "-3.37%" },
    { name: "Tesla", symbol: "TSLA", value: "€612,30", percentage: "-5.52%" },
    { name: "Meta", symbol: "META", value: "€139,69", percentage: "-7.49%" },
    { name: "Apple", symbol: "AAPL", value: "€981,10", percentage: "-6.21%" },
    { name: "Toyota", symbol: "TYTA", value: "€354,96", percentage: "-2.08%" },
  ];
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);

    const filteredResults = search
      ? initialResults.filter((result) =>
          result.name.toLowerCase().startsWith(search.toLowerCase())
        )
      : [];

    setSearchResults(filteredResults);
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
            {searchResults.map((result, index) => (
              <li key={index} className="results">
                <span className="result-name">{result.name}</span>
                <span className="result-symbol">{result.symbol}</span>
                <span className="result-value">{result.value}</span>
                <span className="result-percentage" style={{ color: "red" }}>
                  {result.percentage}
                </span>
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