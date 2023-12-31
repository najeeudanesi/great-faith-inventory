"use client"
import { db, storage} from '@/app/config/firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';
import React, {useRef , useState } from 'react';

const AddNewStockForm = () => {
  const [device, setDevice] = useState('');
  const [color, setColor] = useState('black');
  // const [model, setModel] = useState('');
  const [storageSize, setStorageSize] = useState('16gb');
  const [condition, setCondition] = useState('new');
  const [imeiNumber, setImeiNumber] = useState('');

  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const captionRef = useRef(null);
 const router = useRouter();

  const handleDeviceChange = (e) => {
    setDevice(e.target.value);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // const handleModelChange = (e) => {
  //   setModel(e.target.value);
  // };

  const handleStorageChange = (e) => {
    setStorageSize(e.target.value);
  };

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  // const handleNumberOfDevicesChange = (e) => {
    
  // };

  const handleImeiChange = (e) => {
    setImeiNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform submit logic or API call here
    console.log('Submitted');
  };

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  }
  const UploadPost = async () => {
    if (loading) return;

    setLoading(true);

    try {
      // Create a new stock document in the Firestore collection
      const stockDocRef = await addDoc(collection(db, 'stocks'), {
        device: device,
        color: color,
        storage: storageSize,
        condition: condition,
        imeiNumber: imeiNumber,
        timestamp: serverTimestamp(),
      });

      console.log('New stock document added with ID:', stockDocRef.id);

      // Upload the image to Firebase storage
      const imageRef = ref(storage, `${device}/image/${stockDocRef.id}`);
      await uploadString(imageRef, selectedFile, 'data_url');
      console.log('Image uploaded');
      // Get the image download URL and update the stock document with it
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'stocks', stockDocRef.id), {
        image: downloadURL,
      });

      console.log('Image URL added to stock document.');

      setLoading(false);
      setSelectedFile(null);
      router.push('api/dashboard/products');
    } catch (error) {
      console.error('Error adding stock:', error);
      setLoading(false);
    }
  };




  return (
    <form onSubmit={handleSubmit} className='pb-42'>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
          id='selectedFile'
          type='file'
          onChange={addImageToPost}
          />
        </div>
        <div>
          <label htmlFor="brand" className="label">
            device
          </label>
          <input
            id="brand"
            className="input input-decoration"
            value={device}
            onChange={handleDeviceChange}
          />
        </div>
        <div>
          <label htmlFor="color" className="label">
            Color
          </label>
          <select
            id="color"
            className="input input-decoration"
            value={color}
            onChange={handleColorChange}
          >
            <option value="black" className='option'>Black</option>
            <option value="gold" className='option'>Gold</option>
            <option value="red" className='option'>Red</option>
            <option value="blue" className='option'>Blue</option>
            <option value="silver" className='option'>Silver</option>
            <option value="yellow" className='option'>Yellow</option>
            {/* Add color options here */}
          </select>
        </div>
        {/* <div>
          <label htmlFor="model" className="label">
            Model
          </label>
          <select
            id="model"
            className="input input-decoration"
            value={model}
            onChange={handleModelChange}
          >
            <option value="">Select Model</option>
           
          </select>
        </div> */}
        <div>
          <label htmlFor="storage" className="label">
            Storage
          </label>
          <select
            id="storageSize"
            className="input input-decoration"
            value={storageSize}
            onChange={handleStorageChange}
          >
            <option value="16gb" className='option'>16GB</option>
            <option value="64gb" className='option'>64GB</option>
            <option value="128gb" className='option'>128GB</option>
            <option value="256gb" className='option'>256GB</option>
            {/* Add storage options here */}
          </select>
        </div>
        <div>
          <label htmlFor="condition" className="label">
            Condition
          </label>
          <select
            id="condition"
            className="input input-decoration  flex justify-between"
            value={condition}
            onChange={handleConditionChange}
          >
            
            <option value="new"  className='option'>New</option>
            <option value="used"  className='option'>Used</option>
          </select>
        </div>
    
        <div className="col-span-2">
          <label className="label">IMEI Numbers</label>
        
            <input
            
              type="text"
              className="input input-decoration"
              value= {imeiNumber}
              onChange={handleImeiChange}
              placeholder={"IMEI Number"}
            />

        </div>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          className="btn-pad bg-pink-600 rounded-md"
          onClick={UploadPost}
        >
          Add Stock
        </button>
      </div>
    </form>
  );
};

export default AddNewStockForm;
