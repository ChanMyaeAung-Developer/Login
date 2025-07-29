import React, { useState, useEffect } from "react";
import TableFilterControls from "./TableFilterControls"; // Filter icon panel

const SearchAndFilter = ({
  dataColumns,
  onSearch,
  onFilter,
  onReset,
  currentGlobalFilter,
  resetFormRef
}) => {
  const [searchInput, setSearchInput] = useState(currentGlobalFilter || "");

  // currentGlobalFilter ပြောင်းရင် input box ကို update လုပ်
  useEffect(() => {
    setSearchInput(currentGlobalFilter || "");
  }, [currentGlobalFilter]);

  // Reset button နှိပ်လိုက်တဲ့အခါ input box ကို ရှင်းဖို့ ref expose
  useEffect(() => {
    if (resetFormRef.current) {
      resetFormRef.current.resetSearch = () => setSearchInput("");
    }
  }, [resetFormRef]);

  // Search Button click
  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(searchInput);
    }
  };

  // Input type ပြောင်းတဲ့အခါ
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value.trim() === "" && onSearch) {
      onSearch(""); // ရှင်းလိုက်ရင် reset
    }
  };

  // Optional: Enter နဲ့လည်း Search ချင်တယ်ဆိုရင် ဒီ handler ထည့်လို့ရတယ်
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleFilterApply = (filters) => {
    if (onFilter) onFilter(filters);
  };

  return (
  <div className="flex flex-wrap gap-4 p-2 bg-gray-100 rounded-lg shadow-sm justify-between items-center">

  {/* Search Box + Search Button */}
  <div className="flex gap-2 flex-grow">
    <input
      type="text"
      placeholder="Search..."
      value={searchInput}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      className="w-full h-9 px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 hover:border-green-400 transition duration-200"
    />
    <button
      onClick={handleSearchClick}
      className="h-9 px-4 py-1 text-sm bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
    >
      Search
    </button>
  </div>

  {/* Filter icon panel */}
  <TableFilterControls dataColumns={dataColumns} onFilterChange={handleFilterApply} />

  {/* Reset Button only */}
  <div className="flex gap-2">
    <button
      onClick={onReset}
      className="h-9 px-4 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
    >
      Reset
    </button>
  </div>
</div>

  );
};

export default SearchAndFilter;
