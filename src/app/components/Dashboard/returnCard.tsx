import React, { useState } from 'react';

const ReturnCard = () => {
  
  const [returnData, setReturnData] = useState({
     return: {
      phones: 50,
      laptops: 30,
      others: 20,
     }

   
  });



  return (
    <div className="bg-pink-950 rounded-lg p-8 h-48 w-54 mb-2">
      <div className="flex justify-between items-center mb-4">
        <div className="text-md font-bold text-left">{"return" + "(NGN)"}</div>
        <div className="flex">
         
         
        </div>
      </div>
      <div>
        {returnData ? (
          <div>
            <div className="flex justify-between mb-2">
              <span>Phones:</span>
              <span>{returnData.return.phones}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Laptops:</span>
              <span>{returnData.return.laptops}</span>
            </div>
            <div className="flex justify-between">
              <span>Others:</span>
              <span>{returnData.return.others}</span>
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
