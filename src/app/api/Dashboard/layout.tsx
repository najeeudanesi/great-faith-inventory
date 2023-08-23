"use client";
import Sidebar from "@/app/components/sidebar";
import Topbar from "@/app/components/topbar";
import { auth } from "@/app/config/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
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
      <div className="grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-4">
          <div className="w-full">
            <Topbar />
          </div>
          <div className="overflow-y-auto max-h-screen"> {children}</div>
        </div>
      </div>
    </div>
  );
}
