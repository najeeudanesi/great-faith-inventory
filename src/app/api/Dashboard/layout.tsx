"use client";
import Sidebar from "@/app/components/sidebar";
import Topbar from "@/app/components/topbar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-1">
        <Sidebar />
      </div>
      <div className="col-span-4">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
