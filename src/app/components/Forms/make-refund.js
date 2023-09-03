/* eslint-disable @next/next/no-img-element */
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import { db } from "../../config/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function MakeRefund({ showSuccessMessage, showErrorMessage }) {
  const [imeiNumber, setImeiNumber] = useState("");
  const [reason, setReason] = useState("");
  const [item, setItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const refundItem = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // Create a new stock document in the Firestore collection
      const stockDocRef = await addDoc(collection(db, "refunds"), {
        category: item?.category || "",
        device: item?.device,
        image: item?.image,
        color: item?.color,
        storage: item?.storage,
        condition: item?.condition,
        price: item?.price,
        customerName: item?.customerName,
        customerPhoneNumber: item?.customerPhoneNumber,
        imeiNumber: item?.imeiNumber,
        reason: reason,
        date: serverTimestamp(),
      }).then(() => {
        showSuccessMessage();
      });
      setLoading(false);

      // Get the stock documents with the specified imeiNumber
      await getDocs(
        query(collection(db, "sales"), where("imeiNumber", "==", imeiNumber))
      ).then((res) => {
        res.forEach((stockDoc) => {
          deleteDoc(doc(db, "sales", stockDoc.id));
        });

        showSuccessMessage();
      });
      // Delete the stock document with the specified imeiNumber (assuming only one document matches the condition)

      setLoading(false);
      setModalOpen(false);
      router.push("/dashboard/refunds");
    } catch (e) {
      console.error(e);
      setLoading(false);
      setModalOpen(false);
      showErrorMessage();
    }
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    try {
      onSnapshot(
        query(collection(db, "sales"), where("imeiNumber", "==", imeiNumber)),
        (snapshot) => {
          if (snapshot.docs.length > 0) setItem(snapshot.docs[0].data());
          else {
            setItem(null);
          }

          setModalOpen(true);
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const router = useRouter();
  return (
    <div>
      <form onSubmit={handleConfirm}>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="imeiNumber" className="label">
              IMEI Number:
            </label>
            <input
              type="text"
              id="imeiNumber"
              className="input input-decoration"
              value={imeiNumber}
              onChange={(e) => setImeiNumber(e.target.value)}
              required
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="reason" className="label">
              Reason for refund
            </label>
            <input
              type="text"
              id="reason"
              className="input input-decoration"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
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
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gray-950 w-96 rounded-md p-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2">Item Details</h2>
              {item ? (
                <>
                  <img
                    src={item.image}
                    alt="Item"
                    className="w-32 h-32 rounded-md"
                  />
                  <p>
                    Device: {item.device} - Color: {item.color}
                  </p>
                  <p>IMEI Number: {item.imeiNumber}</p>
                  <p>Price: NGN {item.price}</p>

                  <p className="font-semibold text-lg text-center  my-6">
                    refund {item.customerName}
                  </p>

                  <p className="font-bold text-xl text-center my-6">
                    Are You sure?
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      className="btn-pad rounded-md font-semibold bg-red-700"
                      onClick={handleModalClose}
                    >
                      Close
                    </button>
                    <button
                      className="btn-pad rounded-md font-semibold bg-green-700"
                      onClick={() => refundItem()}
                    >
                      {loading ? (
                        <div className="flex gap-1">
                          <ArrowPathIcon className="animate-spin h-5 w-5" />
                          waiting
                        </div>
                      ) : (
                        <div> Confirm</div>
                      )}
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
    </div>
  );
}

export default MakeRefund;
