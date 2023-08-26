/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ItemsCard from "@/app/components/Products/itemsCard";
import SearchComponent from "../../../components/searchComponent";
import React, { useEffect } from "react";
import Link from "next/link";
import { db } from "@/app/config/firebase";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
export default function page() {
  const [itemsList, setItemsList] = React.useState([]);

  useEffect(() => {
    onSnapshot(
      query(collection(db, "stocks"), orderBy("timestamp", "desc")),
      (snapshot) => setItemsList(snapshot.docs)
    );
  }, [db]);

  const [filteredItems, setFilteredItems] = React.useState(itemsList);

  useEffect(() => {
    setFilteredItems(itemsList);
  }, [itemsList]);
  const handleSearch = (searchText) => {
    const filtered = itemsList.filter(
      (item) =>
        item
          ?.data()
          .imeiNumber.toLowerCase()
          .includes(searchText.toLowerCase()) ||
        item?.data().device.toLowerCase().includes(searchText.toLowerCase()) ||
        item?.data().condition.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="container mx-auto bg-transparent">
      <div className="grid grid-cols-12 mx-16 items-center">
        <div className="col-span-5">
          <SearchComponent onSearch={handleSearch} />
        </div>

        <div className="col-span-7 flex justify-end">
          {" "}
          <Link
            href="/api/dashboard/products/add-new"
            className="bg-green-700 text-white px-4 py-2 rounded-md"
          >
            Add New
          </Link>
        </div>
      </div>

      {filteredItems.map((item, index) => (
        <ItemsCard
          key={index}
          image={item?.data().image}
          name={item?.data().device}
          imeiNumber={item?.data().imeiNumber}
          condition={item?.data().condition}
        />
      ))}
    </div>
  );
}
