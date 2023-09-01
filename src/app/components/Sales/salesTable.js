/* eslint-disable react/no-unescaped-entities */
import React from "react";
const SalesTable = ({ data }) => {
  return (
    <div className="px-8 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-800">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="table-head">
              Product Name
            </th>
            <th scope="col" className="table-head">
              Color
            </th>
            <th scope="col" className="table-head">
              Storage
            </th>
            <th scope="col" className="table-head">
              Amount Paid
            </th>
            <th scope="col" className="table-head">
              IMEI no.
            </th>
            <th scope="col" className="table-head">
              Customer's Name
            </th>
            <th scope="col" className="table-head">
              Phone Number
            </th>
            <th scope="col" className="table-head">
              Condition
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Render table rows dynamically */}
          {data.map((item) => (
            <tr key={item.id} className="bg-transaparent">
              <td className="tab-row ">{item.device}</td>
              <td className="tab-row">{item.color}</td>
              <td className="tab-row">{item.storage}</td>
              <td className="tab-row">{item.price}</td>
              <td className="tab-row">{item.imeiNumber}</td>
              <td className="tab-row">{item.customerName}</td>
              <td className="tab-row">{item.customerPhoneNumber}</td>
              <td className="tab-row">{item.condition}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
