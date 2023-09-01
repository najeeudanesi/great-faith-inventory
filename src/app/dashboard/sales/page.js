/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import SalesTable from "../../components/Sales/salesTable";
import React, { useState, useEffect } from "react";
import SearchComponent from "../../components/searchComponent";
import { db } from "../../config/firebase";
import Link from "next/link";
import {
  onSnapshot,
  query,
  collection,
  orderBy,
  where,
} from "firebase/firestore";

export default function Page() {
  const [itemsList, setItemsList] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleDateChange = (e) => {
    const newSelectedDate = e.target.value;
    setSelectedDate(newSelectedDate);

    if (newSelectedDate && itemsList.length > 0) {
      const formattedDate = new Date(newSelectedDate).toDateString();
      const filtered = itemsList.filter(
        (item) => item.date.toDate().toDateString() === formattedDate
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(itemsList);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "sales"), orderBy("date", "desc")),
      (snapshot) => {
        // Extract data from the querySnapshot and convert to an array of objects
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItemsList(data);
        console.log(itemsList);
      }
    );

    return unsubscribe;
  }, [db]);

  const [filteredItems, setFilteredItems] = React.useState(itemsList);

  useEffect(() => {
    setFilteredItems(itemsList);
  }, [itemsList]);

  const handleSearch = (searchText) => {
    const filtered = itemsList.filter(
      (item) =>
        item?.imeiNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.device.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.condition.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.customerName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <div className="grid grid-cols-12 px-8 items-center">
        <div className="col-span-5 py-16">
          <span className="text-3xl">Sales History</span>
        </div>
        <div className="col-span-7 flex gap-2 justify-end">
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
        </div>
      </div>
      <div className="px-8 ">
        <div className="flex justify-between">
          <div className="w-1/2">
            <SearchComponent onSearch={handleSearch} />
          </div>
          <Link
            href="/dashboard/add-new-sale"
            className="bg-green-700 text-white px-4 py-2 my-3 rounded-md hover:bg-green-950"
          >
            Add New
          </Link>
        </div>
      </div>
      <SalesTable data={filteredItems} />
    </div>
  );
}
