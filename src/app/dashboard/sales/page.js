"use client";
import SalesTable from "../../components/Sales/salesTable";
import React, { useEffect } from "react";
import SearchComponent from "../../components/searchComponent";
import DatePicker from "../../components/date-picker";
import { db } from "../../config/firebase";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";

export default function Page() {
  const [itemsList, setItemsList] = React.useState([]);

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
  }, [itemsList]);

  const [filteredItems, setFilteredItems] = React.useState(itemsList);

  useEffect(() => {
    setFilteredItems(itemsList);
  }, [itemsList]);

  const handleSearch = (searchText) => {
    const filtered = itemsList.filter(
      (item) =>
        item?.imeiNumber.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.device.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.condition.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div>
      <div className="grid grid-cols-12 px-8 items-center">
        <div className="col-span-5 py-16">
          <span className="text-3xl">Sales History</span>
        </div>
        <div className="col-span-7 flex justify-end">
          <DatePicker />
        </div>
      </div>
      <div className="grid grid-cols-12 px-8">
        <div className="col-span-5">
          <SearchComponent onSearch={handleSearch} />
        </div>
      </div>
      <SalesTable data={filteredItems} />
    </div>
  );
}
