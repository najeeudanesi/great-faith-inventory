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
import { auth } from "../config/firebase";

const Sidebar = () => {
  const pathname = usePathname();
  const [user, setUser] = useRecoilState(userState);

  const isActive = (route) => {
    return pathname === route ? "bg-pink-700" : "";
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
  }, []);

  return (
    <div className=" bg-black  h-screen  text-white pt-6 pr-6 outline outline-1 outline-pink-950">
      <div className="flex flex-col mt-8 items-center">
        <img
          className="h-24  w-24 rounded-full object-cover"
          src={user?.profileImg}
          alt="Profile"
        />
        <div className="text-center items-center p-4 mb-6">
          <div>
            <p className="text-sm">{user?.email}</p>
          </div>
        </div>
        <nav className="flex flex-col flex-grow px-4 py-2">
          <Link
            href="/dashboard"
            className={`nav-link ${isActive("/dashboard")}`}
          >
            <div className="flex">
              <Squares2X2Icon className="icon" /> Dashboard
            </div>
          </Link>

          <Link
            href="/dashboard/sales"
            className={`nav-link ${isActive("/dashboard/sales")}`}
          >
            <div className="flex">
              <CurrencyDollarIcon className="icon" />
              Sales
            </div>
          </Link>

          <Link
            href="/dashboard/products"
            className={`nav-link ${isActive("/dashboard/products")}`}
          >
            <div className="flex">
              <SwatchIcon className="icon" /> Products
            </div>
          </Link>

          {/* <Link
            href="/dashboard/credit"
            className={`nav-link ${isActive("/dashboard/credit")}`}
          >
            <div className="flex">
              <InformationCircleIcon className="icon" /> Credit
            </div>
          </Link> */}
          {/* <Link
            href="/dashboard/categories"
            className={`nav-link ${isActive("/dashboard/categories")}`}
          >
            {" "}
            <div className="flex">
              {" "}
              <CircleStackIcon className="icon" /> Categories
            </div>
          </Link> */}

          <Link
            href="dashboard/settings"
            className={`nav-link ${isActive("/dashboard/settings")}`}
          >
            <div className="flex">
              <WrenchScrewdriverIcon className="icon" />
              Settings
            </div>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
