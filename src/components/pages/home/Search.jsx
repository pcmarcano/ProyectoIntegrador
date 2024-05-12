import React from "react";
import "./Search.css";

const Search = () => {
    return (
        <div className="search-container">
            <input type="text" placeholder="Buscar..." className="search-input" />
            <button className="search-button">Buscar</button>
        </div>
    );
};

export default Search;
