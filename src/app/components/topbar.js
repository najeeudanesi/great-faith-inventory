import React from 'react';
import {ArrowLongRightIcon, ArrowRightOnRectangleIcon, BellIcon} from "@heroicons/react/24/solid"
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
const Topbar = () => {

  const logOut = () =>{
    signOut(auth)
  }

  return (
    <div className="flex justify-between items-center bg-none text-white outline outline-1 outline-pink-950 w-full h-32 p-12">
        <div>
        <h1 className="text-3xl font-semibold text-pink-600">Welcome Back</h1>
      <p className='text-xs' >Keep up with all the activities on the platform</p>
        </div>
      
      <div className='flex items-center'>
        <button className="bg-transparent text-white p-2 rounded-full hover:bg-gray-700">
         <BellIcon className='h-6 w-6'/>
        </button>

        <ArrowRightOnRectangleIcon className='h-6 w-6 cursor-pointer' onClick={logOut}/>
      </div>
    </div>
  );
};

export default Topbar;
