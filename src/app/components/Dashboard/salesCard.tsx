import React, { useState } from 'react';

const SalesCard = () => {
  
  const [salesData, setSalesData] = useState({
     sales: {
      phones: 50,
      laptops: 30,
      others: 20,
     }

   
  });



  return (
    <div className="bg-pink-950 rounded-lg p-8 h-48 w-54 mb-2">
      <div className="flex justify-between items-center mb-4">
        <div className="text-md font-bold text-left">{"Sales" + "(NGN)"}</div>
        <div className="flex">
         
         
        </div>
      </div>
      <div>
        {salesData ? (
          <div>
            <div className="flex justify-between mb-2">
              <span>Phones:</span>
              <span>{salesData.sales.phones}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Laptops:</span>
              <span>{salesData.sales.laptops}</span>
            </div>
            <div className="flex justify-between">
              <span>Others:</span>
              <span>{salesData.sales.others}</span>
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
