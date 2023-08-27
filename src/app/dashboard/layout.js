"use client";
import Sidebar from "../components/sidebar";
import SmallSidebar from "../components/smallSidebar";
import Topbar from "../components/topbar";
import { auth } from "../config/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) return router.push("/");
  }, [user, loading, router]);
  return (
    <div className="fixed w-full">
      {user && (
        <div className="grid grid-cols-5">
          <div className="lg:hidden col-span-1">
            <SmallSidebar />
          </div>
          <div className="hidden lg:block col-span-1 ">
            <Sidebar />
          </div>
          <div className="col-span-4">
            <div className="overflow-y-auto max-h-screen">
              <div className="w-full">
                <Topbar />
              </div>
              {children}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
