"use client";
import creditData from "../../components/Credit/creditData";
import CreditTable from "../../components/Credit/creditTable";
import DatePicker from "../../components/date-picker";
import SearchComponent from "../../components/searchComponent";
import React from "react";

export default function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [filteredItems, setFilteredItems] = React.useState(creditData);

  const handleSearch = (searchText) => {
    const filtered = creditData.filter((item) =>
      item.productName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <div className="grid grid-cols-12 px-8 items-center">
        <div className="col-span-5 py-16">
          <span className="text-3xl">Credit Sales</span>
        </div>
        <div className="col-span-7 flex justify-end">
          {" "}
          <DatePicker />
        </div>
      </div>
      <div className="grid grid-cols-12 px-8">
        <div className="col-span-5">
          <SearchComponent onSearch={handleSearch} />
        </div>
      </div>

      <CreditTable creditData={filteredItems} />
    </div>
  );
}
