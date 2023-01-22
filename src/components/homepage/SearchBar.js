import React from "react";
import { IoSearchOutline } from "react-icons/io5";
const SearchBar = ({ filter, setFilter }) => {
  return (
    <div className="search-bar">
      <input
        placeholder="Ara"
        onChange={(e) => {
          setFilter(e.target.value);
        }}
      ></input>
      <IoSearchOutline className="search-icon" size={25} color="gray" />
    </div>
  );
};

export default SearchBar;
