import AddNewStockForm from "../../../components/Forms/add-new-stock";
import { BackwardIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";

function page() {
  return (
    <div className="container mx-auto bg-transparent mb-56">
      <div className="mx-12 my-4 flex gap-12 items-center">
        <Link href="/api/dashboard/products" className="flex text-pink-500">
          {" "}
          <BackwardIcon className="icon" /> Back
        </Link>{" "}
        <span className="text-2xl">Add new stock</span>
      </div>

      <div className="container grid grid-cols-3">
        <div className="col-span-2 m-12">
          <AddNewStockForm />
        </div>
      </div>
    </div>
  );
}

export default page;
