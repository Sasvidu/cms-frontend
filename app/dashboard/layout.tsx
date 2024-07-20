import React from "react";
import { AuthProvider } from "../context/AuthProvider";
import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <div className='flex'>
        <Sidebar />
        <div className='flex-1'>
          <Header />
          <main className='p-4'>{children}</main>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Layout;
