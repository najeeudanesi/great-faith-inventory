import React, { useState, useEffect } from "react";

const StockCard = ({ data }) => {
  const [activeTab, setActiveTab] = useState("new");
  const [stockData, setStockData] = useState({
    used: {
      phones: 0,
      laptops: 0,
      others: 0,
    },
    new: {
      phones: 0,
      laptops: 0,
      others: 0,
    },
  });

  useEffect(() => {
    if (data) {
      const newData = {
        used: {
          phones: 0,
          laptops: 0,
          others: 0,
        },
        new: {
          phones: 0,
          laptops: 0,
          others: 0,
        },
      };

      // Loop through the data and update stockData
      Object.values(data).forEach((item) => {
        const { category, condition } = item;

        if (condition === "used") {
          newData.used[category + "s"] += 1;
        } else if (condition === "new") {
          newData.new[category + "s"] += 1;
        }
      });

      setStockData(newData);
    }
  }, [data]);

  const handleTabClick = (tab) => {
    console.log(data);
    setActiveTab(tab);
  };

  return (
    <div className="bg-pink-950 rounded-lg p-8 h-54 w-54 mb-2">
      <div className="flex justify-between items-center mb-4">
        <div className="text-md font-bold text-left">Stock</div>

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
              <span>{stockData.new.phones}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Laptops:</span>
              <span>{stockData.new.laptops}</span>
            </div>
            <div className="flex justify-between">
              <span>Others:</span>
              <span>{stockData.new.others}</span>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <div className="flex justify-between mb-2">
              <span>Phones:</span>
              <span>{stockData.used.phones}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Laptops:</span>
              <span>{stockData.used.laptops}</span>
            </div>
            <div className="flex justify-between">
              <span>Others:</span>
              <span>{stockData.used.others}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockCard;
