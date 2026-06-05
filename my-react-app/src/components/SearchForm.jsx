import React from "react";

function SearchForm({
  searchTerm,
  onSearchChange,
  onAnalyze,
}) {
  return (
    <div className="search-form">
    <input
          type="text"
          placeholder="Enter GitHub username"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}/>
      <button onClick={onAnalyze}>
        Analyze
      </button>
    </div>
  );
}

export default SearchForm;