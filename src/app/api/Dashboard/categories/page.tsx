"use client"
import DeviceTypeTable from '@/app/components/Categories/device';
import StorageTable from '@/app/components/Categories/storage';
import ColorTable from '@/app/components/Categories/color';
import BrandTable from '@/app/components/Categories/brand';
import Link from 'next/link';
import React, { useState } from 'react'

function page() {
  const [activeTab, setActiveTab] = useState('Device');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className='m-8'>

      <div className="flex mb-4 gap-8">
        <button
          className={`btn-pad bg-transparent ${
            activeTab === 'Device' ? 'border-b border-pink-500' : 'outline-none'
          }`}
          onClick={() => handleTabChange('Device')}
        >
          Device
        </button>
        <button
          className={`btn-pad bg-transparent ${
            activeTab === 'Brand' ? 'border-b border-pink-500' : 'outline-none'
          }`}
          onClick={() => handleTabChange('Brand')}
        >
          Brand
        </button>
        <button
          className={`btn-pad bg-transparent ${
            activeTab === 'Storage' ? 'border-b border-pink-500' : 'outline-none'
          }`}
          onClick={() => handleTabChange('Storage')}
        >
          Storage
        </button>
        <button
          className={`btn-pad bg-transparent ${
            activeTab === 'Color' ? 'border-b border-pink-500' : 'outline-none'
          }`}
          onClick={() => handleTabChange('Color')}
        >
          Color
        </button>
      </div>
      {activeTab === 'Device' && (
        <div className='container pb-48'>
         <DeviceTypeTable/>
        </div>
      )}
      {activeTab === 'Brand' && (
        <div className='container pb-48'>
          <BrandTable/>
        </div>
      )}
      {activeTab === 'Storage' && (
        <div className='container pb-48'>
          <StorageTable/>
        </div>
      )}
      {activeTab === 'Color' && (
        <div className='container pb-48'>
          <ColorTable/>
        </div>
      )}
    </div>
  );
}

export default page