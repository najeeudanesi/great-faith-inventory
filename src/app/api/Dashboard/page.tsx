"use client";
import { Metadata } from "next";
import { auth } from "@/app/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import StockCard from "@/app/components/Dashboard/stockCard";
import NewStockCard from "@/app/components/Dashboard/newStockCard";
export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Page() {
  const navigate = useRouter();
  const signOutUser = async () => {
    try {
      await signOut(auth);
      navigate.push("/");
    } catch (e) {
      console.error("Error Occured: " + e);
    }
  };
  return (
    <div>
      <div className="p-12 flex flex-col">
        <h1>Daily Activity Report</h1>
        <p className="text-xs">Transaction for this day</p>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2 p-8">
          <div className="grid grid-cols-2">
            <div>
              <StockCard />
            </div>
            <div>
               <NewStockCard/>
               </div>
            <div></div>
          </div>
        </div>
        <div className="col-span-1 p-8"></div>
      </div>
    </div>
  );
}
