import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ProfilePic from '../assets/R.jpg';
import './sidebar.css';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Dashboard from '@mui/icons-material/Dashboard';
import Money from '@mui/icons-material/Money';
import Tag from '@mui/icons-material/Tag';

const Sidebar = () => {
  const pathname = usePathname();

  const isActive = (route: string) => {
    return pathname === route ? 'bg-pink-700' : '';
  };

  return (
    <div className="flex flex-col items-center h-screen py-12 text-white pr-6 outline outline-1 outline-pink-950">
      <Image
        className="h-24 rounded-full mr-2"
        src={ProfilePic}
        alt="Profile"
        width={80}
        height={40}
      />
      <div className="text-center items-center p-4 mb-12">
        <div>
          <p className="text-sm">john.doe@example.com</p>
        </div>
      </div>
      <nav className="flex flex-col flex-grow px-4 py-2">
        <Link href="/api/Dashboard"
           className={`nav-link ${isActive('/api/Dashboard')}`}>
            <Dashboard /> Dashboard
          
        </Link>
        <Link href="/api/Dashboard/products"
          className={`nav-link ${isActive('/api/Dashboard/products')}`}>
            <Tag /> Products
          
        </Link>
        <Link href="api/Dashboard/sales"
           className={`nav-link ${isActive('api/Dashboard/sales')}`}>
            <Money /> Sales
          
        </Link>
        <Link href="/api/Dashboard/settings"
           className={`nav-link ${isActive('/api/Dashboard/settings')}`}>
            <Settings /> Settings
        
        </Link>
        <Link href="/api/Dashboard/logout"
           className={`nav-link ${isActive('/api/Dashboard/logout')}`}>
            <Logout /> Logout
          
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
