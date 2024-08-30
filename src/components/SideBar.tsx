import React from "react";
import icon from "@/assets/png/icon.png";
import { IoSpeedometerOutline } from "react-icons/io5";
import { MdOutlineCampaign } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { CiCircleQuestion } from "react-icons/ci";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
const SideBar = () => {

  const [activeButton, setActiveButton] = useState('overview');

  const handleButtonClick = (buttonName: any) => {
    setActiveButton(buttonName);
  };

  const buttonClass = (buttonName: any) =>
    
    buttonName === activeButton
      ? 'bg-[#FFFF] text-[#247B7B] shadow-sm rounded w-[120px]'
      : 'hover:text-[#247B7B] hover:bg-[#FFFFFF]';

    
  return (
    <div >
      <div className="shadow-md bg-[#F0F4F4] w-[292px] h-[800px] fixed">
        <div className="flex gap-[10px] p-[20px] justify-center items-center ">
        <img src={icon} className="w-10 h-8" />
          <p className="text-[30px] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#247B7B] to-[#3B247B]">
            Scrutz
          </p>
        </div>
        <div className="flex items-center justify-center font-medium">
          <div className="flex mt-[40px] gap-[10px] flex-col">
            <Link to="/new">
              <button  onClick={() => handleButtonClick('new')}
              className= 'bg-[#247B7B] text-white border-[1px] p-[10px] flex items-center  text-xs rounded gap-[10px] w-[150px]'>
                {" "}
                <FaPlus /> New Campaign
              </button>
            </Link>

            <Link to="/">
              <button onClick={() => handleButtonClick('overview')}
              className={`text-xs items-center flex p-[10px] gap-[10px] hover:w-[150px] w-[150px]  hover:rounded ${buttonClass('overview')}`}>
                {" "}
                <IoSpeedometerOutline /> Overview
              </button>
            </Link>
            <Link to="/campaign">
              <button  onClick={() => handleButtonClick('campaign')}
              className={`text-xs items-center flex p-[10px] gap-[10px] hover:w-[150px]  w-[150px] hover:rounded ${buttonClass('campaign')}`}>
                {" "}
                <MdOutlineCampaign /> Campaign
              </button>
            </Link>

            <button className="text-xs hover:w-[150px] w-[150px] justify-center items-center flex hover:text-[#247B7B] hover:bg-[#FFFFFF]  p-[10px]  gap-[10px]   hover:rounded hover:shadow-sm">
              <HiOutlineLightBulb /> Market Intelligence
            </button>
            <button className="text-xs items-center hover:w-[150px] w-[150px]  flex hover:text-[#247B7B] hover:bg-[#FFFFFF]  p-[10px]  gap-[10px]   hover:rounded hover:shadow-sm">
              {" "}
              <IoSettingsOutline /> Account Settings
            </button>
          </div>
        </div>
        <div className="flex items-center  justify-center mt-[20px]">
          <div className="flex justify-center  gap-[10px] items-center flex-col rounded shadow-md bg-[#FFFFFF] w-[200px] h-[180px]">
            <CiCircleQuestion className=" w-[20px] h-[20px] font-medium text-[#247B7B]" />
            <p className="text-xs bg-clip-text font-medium text-transparent bg-gradient-to-r from-[#247B7B] to-[#3B247B]">
              Need help?
            </p>
            <p className="text-center text-[10px]">
              We are readily available to <br /> provide help
            </p>
            <button className="text-center w-[80px] h-[30px] flex items-center justify-center text-[#247B7B] border-[2px] border-red-500   p-[10px] text-[10px] rounded hover:text-white hover:bg-[#247B7B] cursor-pointer hover:shadow-lg">
              Get help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
