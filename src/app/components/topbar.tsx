import React from 'react';
import { Notifications } from '@mui/icons-material';

const Topbar = () => {
  return (
    <div className="flex justify-between items-center bg-none text-white outline outline-1 outline-pink-950 w-full h-32">
        <div>
        <h1 className="text-xl font-bold text-pink-600">Welcome Back</h1>
      <p className='text-xs' >Keep up with all the activities on the platform</p>
        </div>
      
      <div>
        <button className="bg-transparent text-white p-2 rounded-full hover:bg-gray-700">
          <Notifications className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Topbar;
