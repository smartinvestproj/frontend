import React, { useState } from "react";

function SearchBar() {
  const initialResults = ["Netflix", "Amazon", "Tesla", "Meta", "Apple"];
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);

    const filteredResults = search
      ? initialResults.filter((result) =>
          result.toLowerCase().includes(search.toLowerCase())
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
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="dropdown">
          <ul>
            {search !== "" && <li>No results found.</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
