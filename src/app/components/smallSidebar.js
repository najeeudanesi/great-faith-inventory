/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import userState from "../../../atoms/atom";
import "./sidebar.css";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  Squares2X2Icon,
  SwatchIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  CircleStackIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../config/firebase";

const SmallSidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useRecoilState(userState);

  const isActive = (route) => {
    return pathname === route ? "bg-pink-700 rounded-md p-4" : "";
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const loggedInUser = {
          email: user.email,
          uid: user.uid,
          username: user.displayName,
          profileImg: user.photoURL,
        };
        setUser(loggedInUser);
      }

      return () => {
        unsubscribe();
      };
    });
  }, [db]);

  return (
    <div className=" bg-black  h-screen  text-white pt-6 outline outline-1 outline-pink-950">
      <div className="flex flex-col mt-8 items-center">
        <img
          className="h-16  w-16 rounded-full object-cover"
          src={user?.profileImg}
          alt="Profile"
        />
        <div className="text-center items-center p-4 mb-6">
          <div>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
        <nav className="flex flex-col items-center px-4 py-2 gap-8">
          <Link href="/dashboard" className={`  ${isActive("/dashboard")}`}>
            <Squares2X2Icon className="icon" />
          </Link>

          <Link
            href="/dashboard/sales"
            className={` ${isActive("/dashboard/sales")}`}
          >
            <CurrencyDollarIcon className="icon" />
          </Link>

          <Link
            href="/dashboard/refunds"
            className={` ${isActive("/dashboard/refunds")}`}
          >
            <CurrencyDollarIcon className="icon" />
          </Link>

          <Link
            href="/dashboard/products"
            className={` ${isActive("/dashboard/products")}`}
          >
            <SwatchIcon className="icon" />
          </Link>
          <Link
            href="dashboard/settings"
            className={`${isActive("/dashboard/settings")}`}
          >
            <WrenchScrewdriverIcon className="icon" />
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SmallSidebar;
