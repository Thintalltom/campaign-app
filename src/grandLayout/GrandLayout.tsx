import React from "react";
import Dashboard from "@/screens/Overview";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import SideBar from "@/components/SideBar";

interface GrandLayout{
  children: React.ReactNode
}


const GrandLayout:React.FC<GrandLayout> = ({children}) => {
  return (
    <div className=" ">
      <div className="flex flex-row gap-[290px]">
        
          <SideBar />
        <div className=" flex flex-col  ">
          <Navbar />
        </div>
      </div>

      <div className="">
        {children}
      </div>
    </div>
  );
};

export default GrandLayout;
