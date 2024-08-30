import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { CiExport } from "react-icons/ci";
import { Link } from 'react-router-dom';
import search from "@/assets/svg/search.svg";

export default function Overview() {
  return (
    
    <div className='flex items-center justify-center flex-col'>
    <div className=' w-full flex justify-center items-center p-[20px]'>
    <div className="mt-[80px] ml-[25%] w-[100vw] p-[20px] flex justify-between">
      <p className="font-bold text-[#247B7B]">Overview</p>

      <div className="flex gap-[10px]">
        <div className="border-[1px] w-[250px] flex gap-[10px] items-center p-[10px] text-[10px]">
          <FaRegCalendarAlt />
          <p>Date Range</p>
          <p>Nov 1, 2022 - Nov 7, 2022</p>
          <IoIosArrowDown />
        </div>

        <div className="bg-[#F0F4F4] gap-[10px] w-[100px] text-center flex items-center justify-center">
          <CiExport className="text-[#247B7B]" />
          <p className="text-[#247B7B] text-[10px]">Export</p>
        </div>
      </div>
    </div>
    </div>
 

    <div className="flex ml-[20%]  justify-center p-[20px] mt-[-34px] items-center  flex-col">
      <img src={search} className='w-[20rem]' />
      <p className="text-center text-[10px] p-[30px] font-bold">
        No activty yet. Create a new campaign to get started.
      </p>
      <Link to="/new">
        <button className="bg-[#247B7B] mt-[20px] w-[150px] gap-[10px] text-white border-[1px] p-[10px] flex items-center justify-center text-xs rounded">
          {" "}
          <FaPlus /> New Campaign
        </button>
      </Link>
    </div>
  </div>
  )
}
