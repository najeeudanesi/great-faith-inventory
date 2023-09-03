/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MakeRefund from "../../../components/Forms/make-refund";

export default function page() {
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
  return (
    <div className="m-8">
      <ToastContainer />
      <div className="col-span-5 py-16">
        <span className="text-3xl">Make Refund</span>
      </div>
      <div className="container pb-48">
        <MakeRefund
          showErrorMessage={showErrorMessage}
          showSuccessMessage={showSuccessMessage}
        />
      </div>
    </div>
  );
}
