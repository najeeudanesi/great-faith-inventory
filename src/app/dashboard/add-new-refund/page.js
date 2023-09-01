/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import DirectSaleForm from "../../components/Forms/direct-sale";
import SwapSaleForm from "../../components/Forms/swap-sale";
import BackwardIcon from "@heroicons/react/24/solid/BackwardIcon";
import Link from "next/link";
import React, { useState } from "react";

export default function page() {
  const [activeTab, setActiveTab] = useState("direct");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="m-8">
      <div className="flex mb-4 gap-8"></div>
    </div>
  );
}
