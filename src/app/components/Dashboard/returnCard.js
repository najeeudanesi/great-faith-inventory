import React, { useEffect, useState } from "react";

const ReturnCard = ({ data }) => {
  const [returnData, setReturnData] = useState({
    return: {
      phones: 0,
      laptops: 0,
      others: 0,
    },
  });

  useEffect(() => {
    if (data) {
      const newReturnData = {
        return: {
          phones: 0,
          laptops: 0,
          others: 0,
        },
      };

      console.log(data);
      // Calculate sums based on category and convert quantity to integer
      data.forEach((item) => {
        const { category, price } = item;
        const priceInt = parseInt(price, 10);

        if (category === "phone") {
          newReturnData.return.phones += priceInt;
        } else if (category === "laptop") {
          newReturnData.return.laptops += priceInt;
        } else if (category === "others") {
          newReturnData.return.others += priceInt;
        }
      });

      setReturnData(newReturnData);
    }
  }, [data]);

  return (
    <div className="bg-pink-950 rounded-lg p-8 h-48 w-54 mb-2">
      <div className="flex justify-between items-center mb-4">
        <div className="text-md font-bold text-left">{"Refunds"}</div>
        <div className="flex"></div>
      </div>
      <div>
        {returnData ? (
          <div>
            <div className="flex justify-between mb-2">
              <span>Phones:</span>
              <span>NGN {returnData.return.phones}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Laptops:</span>
              <span>NGN {returnData.return.laptops}</span>
            </div>
            <div className="flex justify-between">
              <span>Others:</span>
              <span>NGN {returnData.return.others}</span>
            </div>
          </div>
        ) : (
          <div>Nothing to display</div>
        )}
      </div>
    </div>
  );
};

export default ReturnCard;
