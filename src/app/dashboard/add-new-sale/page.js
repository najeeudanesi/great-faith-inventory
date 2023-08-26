/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import DirectSaleForm from "@/app/components/Forms/direct-sale";
import SwapSaleForm from "@/app/components/Forms/swap-sale";
import BackwardIcon from "@heroicons/react/24/solid/BackwardIcon";
import Link from "next/link";
import React, { useState } from "react";

function page() {
  const [activeTab, setActiveTab] = useState("direct");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="m-8">
      <div className="mx-2 my-4 flex gap-12 items-center">
        <Link href="/api/dashboard" className="flex text-pink-500">
          {" "}
          <BackwardIcon className="icon" /> Back
        </Link>{" "}
      </div>
      <div className="flex mb-4 gap-8">
        <button
          className={`btn-pad bg-transparent ${
            activeTab === "direct" ? "border-b border-pink-500" : "outline-none"
          }`}
          onClick={() => handleTabChange("direct")}
        >
          Direct Sale
        </button>
        <button
          className={`btn-pad bg-transparent ${
            activeTab === "swap" ? "border-b border-pink-500" : "outline-none"
          }`}
          onClick={() => handleTabChange("swap")}
        >
          Swap Sale
        </button>
      </div>
      {activeTab === "direct" && (
        <div className="container pb-48">
          <DirectSaleForm />
        </div>
      )}
      {activeTab === "swap" && (
        <div className="container pb-48">
          <SwapSaleForm />
        </div>
      )}
    </div>
  );
}

export default page;
