import React, { useState } from "react";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <label
        htmlFor="datepicker"
        className="block text-sm font-medium text-gray-700"
      >
        Select a date:
      </label>
      <input
        type="date"
        id="datepicker"
        className="mt-1 p-2 block w-full border-pink-800 rounded-sm shadow-sm focus:ring-pink-500 focus:border-indigo-500 bg-gray-600 sm:text-sm"
        value={selectedDate}
        onChange={handleDateChange}
      />
    </div>
  );
};
export default DatePicker;
