import React, { useEffect, useState } from "react";

const SalesCard = ({ data }) => {
  const [salesData, setSalesData] = useState({
    sales: {
      phones: 0,
      laptops: 0,
      others: 0,
    },
  });

  useEffect(() => {
    if (data) {
      const newSalesData = {
        sales: {
          phones: 0,
          laptops: 0,
          others: 0,
        },
      };

      // Calculate sums based on category and convert price to integer
      data.forEach((item) => {
        const { category, price } = item;
        const priceInt = parseInt(price, 10);

        if (category === "phone") {
          newSalesData.sales.phones += priceInt;
        } else if (category === "laptop") {
          newSalesData.sales.laptops += priceInt;
        } else if (category === "others") {
          newSalesData.sales.others += priceInt;
        }
      });

      setSalesData(newSalesData);
    }
  }, [data]);

  return (
    <div className="bg-pink-950 rounded-lg p-8 h-48 w-54 mb-2">
      <div className="flex justify-between items-center mb-4">
        <div className="text-md font-bold text-left">{"Sales"}</div>
        <div className="flex"></div>
      </div>
      <div>
        {salesData ? (
          <div>
            <div className="flex justify-between mb-2">
              <span>Phones:</span>
              <span>NGN {salesData.sales.phones}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Laptops:</span>
              <span>NGN {salesData.sales.laptops}</span>
            </div>
            <div className="flex justify-between">
              <span>Others:</span>
              <span>NGN {salesData.sales.others}</span>
            </div>
          </div>
        ) : (
          <div>Nothing to display</div>
        )}
      </div>
    </div>
  );
};

export default SalesCard;
