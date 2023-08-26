import React from "react";

function CreditTable({ creditData }) {
  return (
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
            Amount
          </th>
          <th scope="col" className="table-head">
            IMEI no.
          </th>
          <th scope="col" className="table-head">
            {"Customer's Name"}
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
        {creditData.map((item) => (
          <tr key={item.id} className="bg-transaparent">
            <td className="tab-row ">{item.productName}</td>
            <td className="tab-row">{item.color}</td>
            <td className="tab-row">{item.storage}</td>
            <td className="tab-row">{item.amount}</td>
            <td className="tab-row">{item.specialNumber}</td>
            <td className="tab-row">{item.customerName}</td>
            <td className="tab-row">{item.phoneNumber}</td>
            <td className="tab-row">{item.condition}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CreditTable;
