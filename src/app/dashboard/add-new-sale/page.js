/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import DirectSaleForm from "../../components/Forms/direct-sale";
import SwapSaleForm from "../../components/Forms/swap-sale";
import BackwardIcon from "@heroicons/react/24/solid/BackwardIcon";
import Link from "next/link";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function page() {
  const [activeTab, setActiveTab] = useState("direct");

  const showSuccessMessage = () => {
    toast.success("success", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
  };
  const showErrorMessage = () => {
    toast.error("error", {
      position: toast.POSITION.TOP_RIGHT,
      theme: "dark",
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="m-8">
      <ToastContainer />
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
          <DirectSaleForm
            showErrorMessage={showErrorMessage}
            showSuccessMessage={showSuccessMessage}
          />
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
