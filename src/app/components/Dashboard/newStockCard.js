import React, { useEffect, useState } from "react";

const NewStockCard = (props) => {
  const [activeTab, setActiveTab] = useState("new");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="bg-pink-950 rounded-lg p-8 h-48 w-54 mb-2">
      <div className="flex justify-between items-center mb-4">
        <div className="text-md font-bold text-left">New Stock</div>
        <div className="flex">
          <button
            className={`mr-2 px-2 py-1 rounded text-sm ${
              activeTab === "new" ? "bg-pink-600 text-white" : "bg-pink-950"
            }`}
            onClick={() => handleTabClick("new")}
          >
            New
          </button>
          <button
            className={`px-2 py-1 rounded text-sm ${
              activeTab === "used" ? "bg-pink-600 text-white" : "bg-pink-950"
            }`}
            onClick={() => handleTabClick("used")}
          >
            Used
          </button>
        </div>
      </div>
      <div>
        {activeTab === "new" ? (
          <div>
            <div className="flex justify-between mb-2">
              <span>Phones:</span>
              <span>{props?.newStockCount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Laptops:</span>
              <span>{props?.newStockCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Others:</span>
              <span>{props?.newStockCount}</span>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <div className="flex justify-between mb-2">
              <span>Phones:</span>
              <span>{props?.oldStockCount}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Laptops:</span>
              <span>{props?.oldStockCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Others:</span>
              <span>{props?.oldStockCount}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewStockCard;
