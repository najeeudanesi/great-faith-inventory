import React from "react";

const RecentCard = ({ data }) => {
  return (
    <div className="bg-gray-950 h-36 p-4 rounded-md">
      <div>
        {" "}
        <div className="flex justify-between mb-4">
          {" "}
          <span className="text-md font-semibold text-yellow-400">
            {" "}
            {data.device}
          </span>{" "}
          <span className="text-sm"> {data.color}</span>{" "}
          <span className="text-sm"> {data.storage}</span>{" "}
        </div>{" "}
      </div>
      <div className="mb-4">
        {" "}
        <span className="text-2xl text-green-400">N{data.price}</span>
      </div>

      <div>
        {" "}
        <div className="flex justify-between">
          {" "}
          <span className=""> {data.customerName}</span>{" "}
          <span className=""> {data.customerPhoneNumber}</span>{" "}
        </div>{" "}
      </div>
    </div>
  );
};

export default RecentCard;
