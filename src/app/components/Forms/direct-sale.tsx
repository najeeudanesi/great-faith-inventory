/* eslint-disable @next/next/no-img-element */
"use client"
import { db } from '@/app/config/firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, query, serverTimestamp, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const DirectSaleForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [item, setItem] = useState(null);
  const [imeiNumber, setImeiNumber] = useState('');
  const [price, setPrice] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCustomerNameChange = (e) => {
    setCustomerName(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  const makeSale = async () => {
    if (loading) return;
  
    setLoading(true);
  
    try {
      // Create a new stock document in the Firestore collection
      const stockDocRef = await addDoc(collection(db, 'sales'), {
        device: item?.device,
        image: item?.image,
        color: item?.color,
        storage: item?.storage,
        condition: item?.condition,
        price: price,
        customerName: customerName,
        customerPhoneNumber: phoneNumber,
        imeiNumber: imeiNumber,
        date: serverTimestamp(), 
      });
  
      setLoading(false);
      setModalOpen(false);
      console.log('Document successfully written!');
  
      // Get the stock documents with the specified imeiNumber
      const stockQuerySnapshot = await getDocs(query(collection(db, 'stocks'), where('imeiNumber', '==', imeiNumber)));
  
      // Delete the stock document with the specified imeiNumber (assuming only one document matches the condition)
      stockQuerySnapshot.forEach((stockDoc) => {
        deleteDoc(doc(db, 'stocks', stockDoc.id));
        console.log('Stock document with IMEI Number:', imeiNumber, 'deleted successfully!');
      });
  
      router.push("/api/dashboard");
    } catch (e) {
      console.error(e);
      setLoading(false);
      setModalOpen(false);
    }

  }

  const handleConfirm = (e) => {
    e.preventDefault();
    try{
    onSnapshot(query(collection(db,'stocks'), where('imeiNumber',"==", imeiNumber)), (snapshot) => {
     if(snapshot.docs.length>0)setItem(snapshot.docs[0].data());
      else{setItem(null)}

      setModalOpen(true);
    })
  }catch(e){
    
    console.error(e)
  }  
    
  };


 const handleModalClose = () => {
    setModalOpen(false); // Close the modal
  };


  return (
    <form onSubmit={handleConfirm}>
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
      <div className='text-2xl py-4'>Enter new Product Details</div>
        <div className='grid grid-cols-2 gap-4'>
     
          <div className="w-full">
            <label htmlFor="brand" className="label">
              IMEI Number:
            </label>
            <input
            type="text"
            id="imeiNumber"
            className="input input-decoration"
            value={imeiNumber}
            onChange={(e) => setImeiNumber(e.target.value)}
          />
          </div>
          <div className="w-full">
            <label htmlFor="category" className="label">
              Price NGN:
            </label>
            <input
            type="text"
            id="price"
            className="input input-decoration"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            className="btn-pad rounded-md font-semibold bg-green-700"
          >
            Confirm
          </button>
        </div>
   
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-950 w-96 rounded-md p-4 flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-2">Item Details</h2>
            {item ? (
              <>

              <img src={item.image} alt="Item" className="w-32 h-32 rounded-md" />
                <p>
                  Device: {item.device} - Color: {item.color}
                </p>
                <p>IMEI Number: {item.imeiNumber}</p>
                <p>Price: NGN {price}</p>

                <p className='font-semibold text-lg text-center  my-6'>Sell to {customerName}</p>

                <p className='font-bold text-xl text-center my-6'>Are You sure?</p>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="btn-pad rounded-md font-semibold bg-red-700"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                  <button
                    className="btn-pad rounded-md font-semibold bg-green-700"
                    onClick={() => makeSale()}
                  >
                    Confirm
                  </button>
                </div>
              </>
            ) : (
              <>
              <p>No item found with the provided IMEI Number.</p>
              <div className="mt-4 flex justify-end gap-2">
                  <button
                    className="btn-pad rounded-md font-semibold bg-red-700"
                    onClick={handleModalClose}
                  >
                    Close
                  </button>
                </div>
                </>
            )}
          </div>
        </div>
      )}
     
    </form>
  );
};

export default DirectSaleForm;
