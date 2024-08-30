import React from "react";
import { CiSearch } from "react-icons/ci";
import { CiBellOn } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { IoMdContact } from "react-icons/io";

const Navbar = () => {
  return (
    <div >
      <div className=" bg-white flex-row flex items-center shadow-sm border-b-[0.5px]  w-[62rem] p-[15px] h-[90px] ml-[10px] fixed ">
        <div className="flex justify-between p-[20px] w-full">
          <div className="flex  justify-center items-center w-[250px] h-[40px]  border-[1px] rounded-sm  ">
            <input
              type="text"
              className="border-transparent w-[250px] mt-[5px] p-[5px] text-xs rounded"
              placeholder="Search..."
            />
            
          </div>

          <div className="flex justify-center items-center gap-[10px]">
            <CiBellOn />

            <IoMdContact />
            <p className="text-xs">BigTech</p>
            <IoIosArrowDown />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
