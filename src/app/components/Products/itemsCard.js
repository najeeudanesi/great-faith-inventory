/* eslint-disable @next/next/no-img-element */
"use client"
import React from 'react';


const ItemsCard = ({ image, name, condition, imeiNumber}) => {

  return (
    <div className="flex items-center bg-none  outline outline-1  outline-gray-700  shadow-md px-16 py-4 ">
      <img src={image} alt="Item" className="w-20 h-20 rounded-md mr-4" />

      <div className="flex flex-col flex-grow">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="text-lg">{name}</div>
           
          </div>
          <div className="flex flex-row gap-12 items-center " >
            <label htmlFor="quantity" className="mr-2">
              IMEI Number: {imeiNumber}
            </label>
           
            <div>
          <label htmlFor="condition" className="mr-2">
            Condition: {condition}
          </label>
        
          </div>
         
          </div>
        </div>
        
      </div>
    </div>
  
  );
};

export default ItemsCard;
