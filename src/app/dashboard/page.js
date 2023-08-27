/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { auth, db } from "../config/firebase";
import { useRouter } from "next/navigation";
import StockCard from "../components/Dashboard/stockCard";
import NewStockCard from "../components/Dashboard/newStockCard";
import SalesCard from "../components/Dashboard/salesCard";
import RecentCard from "../components/Dashboard/recentCard";
import ReturnCard from "../components/Dashboard/returnCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function Page() {
  const [data, setData] = useState([]);
  const navigate = useRouter();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "sales"), orderBy("date", "desc")),
      (snapshot) => {
        // Extract data from the querySnapshot and convert to an array of objects
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(newData);
      }
    );

    return unsubscribe;
  }, [db, auth]);
  return (
    <div>
      <div className=" flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-3">
          <div className="p-12 lg:col-span-2">
            <div className="mb-8">
              <h1>Daily Activity Report</h1>
              <p className="text-xs">Transaction for this day</p>
            </div>
            <div className="grid grid-cols-2 gap-5 ">
              <div>
                <StockCard />
              </div>
              <div>
                <NewStockCard />
              </div>
              <div>
                <SalesCard />
              </div>
              <div>
                <ReturnCard />
              </div>
            </div>
          </div>
          <div className="p-8 lg:col-span-1 outline outline-1 outline-pink-800 h-screen w-full">
            <div className="flex gap-4 mb-4">
              {" "}
              <Link
                href="/dashboard/add-new-sale"
                className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-950"
              >
                Add New
              </Link>{" "}
            </div>
            {data.slice(0, 3).map((item, index) => (
              <div key={index} className="mb-4">
                <RecentCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
