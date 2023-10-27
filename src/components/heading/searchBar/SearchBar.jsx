import React, { useState } from "react";
import { useStockContext } from "../../../context/stockContext";
import { Link } from "react-router-dom";
import './searchBar.css'

function SearchBar() {
  const { stocks } = useStockContext();

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);

  const filteredResults = search
    ? stocks.filter((result) =>
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
                <Link to="/stockManagement" className="link">
                  <span className="result-name">{result.name}</span>
                  <span className="result-symbol">{result.symbol}</span>
                </Link>
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