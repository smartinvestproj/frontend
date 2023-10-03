import React, { useState, useEffect } from "react";
import '../styles/components-styles/searchBar.css'

function SearchBar() {
  const URL = "http://127.0.0.1:8000/api/stocks";

  const [search, setSearch] = useState("");
  const [originalResults, setOriginalResults] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(URL);
        if (response.ok) {
          const data = await response.json();
          setOriginalResults(data.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);

    if (search === "") {
      setSearchResults([]);
    } else {
      const filteredResults = originalResults.filter((result) =>
        result.name.toLowerCase().startsWith(search.toLowerCase())
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
            {searchResults.map((result, index) => (
              <li key={index} className="results">
                <span className="result-name">{result.name}</span>
                <span className="result-symbol">{result.symbol}</span>
                <span className="result-value">{trade.value}</span>
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
