import React, { useEffect, useState } from "react";

const SearchComponent = ({ onSearch }) => {
  const [searchText, setSearchText] = React.useState("");

  const handleSearch = () => {
    onSearch(searchText);
  };

  const handleChange = (e) => {
    if (searchText == "") handleSearch();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <div className="flex items-center bg-transparent gap-5">
      <input
        type="text"
        placeholder="Search..."
        className="input input-decoration"
        value={searchText}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchComponent;
