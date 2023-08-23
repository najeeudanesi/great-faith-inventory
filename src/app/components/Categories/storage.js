import React, { useState } from 'react';

function StorageTable() {
  const [storages, setStorages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newStorage, setNewStorage] = useState('');

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewStorage('');
  };

  const handleChange = (e) => {
    setNewStorage(e.target.value);
  };

  const addStorage = () => {
    if (newStorage) {
      setStorages((prevStorages) => [...prevStorages, newStorage]);
      closeModal();
    }
  };

  return (
    <div>
    <div className="p-4">
        <div className='flex justify-end'>
        <div
        className="bg-black cursor-pointer text-pink-500 font-semibold py-2 px-4 mt-4"
        onClick={openModal}
      >
       + Add New
      </div>
        </div>
     
      <h2 className="text-2xl font-semibold mb-4">Storage Table</h2>
      <ol className="list-disc pl-4">
        {storages.map((storage, index) => (
          <li key={index} className="text-gray-300 h-8 py-2 ">{storage}</li>
        ))}
      </ol>

      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center rounded-md justify-center">
          <div className="bg-gray-950 w-96 p-4 rounded-md shadow">
            <h3 className="text-lg font-bold mb-2">Add New Storage</h3>
            <input
              type="text"
              value={newStorage}
              onChange={handleChange}
              className="input input-decoration"
            />
            <div className="flex justify-end">
              <button
                className="bg-green-700 w-20 rounded-md hover:bg-green-700 btn-pad mr-2"
                onClick={addStorage}
              >
                Add
              </button>
              <button
                className="bg-red-700 w-20  rounded-md hover:bg-red-700 btn-pad"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StorageTable;
