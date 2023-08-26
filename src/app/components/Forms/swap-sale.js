"use client"
import React, { useState } from 'react'
function SwapSaleForm() {
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [storage, setStorage] = useState('');
    const [color, setColor] = useState('');

    const [swapBrand, setSwapBrand] = useState('');
    const [swapCategory, setSwapCategory] = useState('');
    const [swapStorage, setSwapStorage] = useState('');
    const [swapColor, setSwapColor] = useState('');
    const [swapImeiNum, setSwapImeiNum] = useState('');
    const [swapIssues, setSwapIssues] = useState('');
  
    const handleCustomerNameChange = (e) => {
      setCustomerName(e.target.value);
    };
  
    const handlePhoneNumberChange = (e) => {
      setPhoneNumber(e.target.value);
    };
  
    const handleBrandChange = (e) => {
      setBrand(e.target.value);
    };
  
    const handleCategoryChange = (e) => {
      setCategory(e.target.value);
    };
  
    const handleStorageChange = (e) => {
      setStorage(e.target.value);
    };
  
    const handleColorChange = (e) => {
      setColor(e.target.value);
    };
    const handleSwapBrandChange = (e) => {
      setSwapBrand(e.target.value);
    };
  
    const handleSwapCategoryChange = (e) => {
      setSwapCategory(e.target.value);
    };
  
    const handleSwapStorageChange = (e) => {
      setSwapStorage(e.target.value);
    };
  
    const handleSwapColorChange = (e) => {
      setSwapColor(e.target.value);
    };
    const handleSwapImeiChange = (e) => {
      setSwapImeiNum(e.target.value);
    };
    const handleSwapIssuesChange = (e) => {
      setSwapIssues(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Perform submit logic or API call here
      console.log('Submitted');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="customerName" className="label">
              Customer Name:
            </label>
            <input
              type="text"
              id="customerName"
              className="input input-decoration"
              value={customerName}
              onChange={handleCustomerNameChange}
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="phoneNumber" className="label">
              Phone Number:
            </label>
            <input
              type="text"
              id="phoneNumber"
              className="input input-decoration"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
          </div>
        </div>
        <div className='text-2xl py-4'>Enter swap Product Details</div>
        <div className='grid grid-cols-2 gap-4 mb-12'>
     
          <div className="w-full">
            <label htmlFor="brand" className="label">
              Brand:
            </label>
            <select
              id="brand"
              className="input input-decoration"
              value={swapBrand}
              onChange={handleSwapBrandChange}
            >
              <option value="">Select Brand</option>
              {/* Add brand options here */}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="category" className="label">
              Category:
            </label>
            <select
              id="category"
              className="input input-decoration"
              value={swapCategory}
              onChange={handleSwapCategoryChange}
            >
              <option value="">Select Category</option>
              {/* Add category options here */}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="storage" className="label">
              Storage:
            </label>
            <select
              id="storage"
              className="input input-decoration"
              value={swapStorage}
              onChange={handleSwapStorageChange}
            >
              <option value="">Select Storage</option>
              {/* Add storage options here */}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="color" className="label">
              Color:
            </label>
            <select
              id="color"
              className="input input-decoration"
              value={swapColor}
              onChange={handleSwapColorChange}
            >
              <option value="">Select Color</option>
              {/* Add color options here */}
            </select>
          </div>
        
          <div className="w-full">
            <label htmlFor="customerName" className="label">
              IMEI No:
            </label>
            <input
              type="text"
              id="swapImeiNum"
              className="input input-decoration"
              value={swapImeiNum}
              onChange={handleSwapImeiChange}
            />
          </div>
          <div className="w-full">
            <label htmlFor="customerName" className="label">
              Issues:
            </label>
            <input
              type="text"
              id="swapIssues"
              className="input input-decoration"
              value={swapIssues}
              onChange={handleSwapIssuesChange}
            />
          </div>
        </div>

        <div className='text-2xl py-4'>Enter new Product Details</div>
        <div className='grid grid-cols-2 gap-4'>
     
          <div className="w-full">
            <label htmlFor="brand" className="label">
              Brand:
            </label>
            <select
              id="brand"
              className="input input-decoration"
              value={brand}
              onChange={handleBrandChange}
            >
              <option value="">Select Brand</option>
              {/* Add brand options here */}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="category" className="label">
              Category:
            </label>
            <select
              id="category"
              className="input input-decoration"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select Category</option>
              {/* Add category options here */}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="storage" className="label">
              Storage:
            </label>
            <select
              id="storage"
              className="input input-decoration"
              value={storage}
              onChange={handleStorageChange}
            >
              <option value="">Select Storage</option>
              {/* Add storage options here */}
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="color" className="label">
              Color:
            </label>
            <select
              id="color"
              className="input input-decoration"
              value={color}
              onChange={handleColorChange}
            >
              <option value="">Select Color</option>
              {/* Add color options here */}
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="btn-pad rounded-md font-semibold bg-green-700"
          >
            Save & Print
          </button>
        </div>
      </form>
    );
}

export default SwapSaleForm