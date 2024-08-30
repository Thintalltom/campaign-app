import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  ButtonHTMLAttributes,
} from "react";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import "@/styles/NewCampaign.css";
import { Link } from "react-router-dom";
import { CampaignContextHook } from "@/context/CampaignContext";
import { IoCheckmarkCircle } from "react-icons/io5";

export default function NewCampaign() {
  const {
    newformData,
    setNewFormData,
    handlePostData,
    showModal,
    modalMessage,
    setShowModal,
    loading, setLoading
  } = CampaignContextHook();
  const [toggle, setToggle] = useState<boolean>(false);
  const [selectVal, setSelectVal] = useState<string>('hourly');
  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setNewFormData((prevnewformData: any) => ({
      ...prevnewformData,
      [name]: value,
     
    }));
  };


  const changeToggle = (e: any) => {
    setToggle(!toggle);
    setNewFormData((prevnewformData: any) => ({
      ...prevnewformData,
      digestCampaign: !toggle,
    }));
  };

  const handleSelected = (e: any) => {
    setSelectVal(e.target.value);
    setNewFormData((prevnewformData: any) => ({
      ...prevnewformData,
      dailyDigest: selectVal,
   
    }));
  };
 const [linkedKeywords, setLinkedKeywords] = useState<string[]>([])

  const removeKeyword = (index: number) => {
    const updatedKeywords = linkedKeywords.filter((_, i) => i !== index);
    setLinkedKeywords(updatedKeywords);
  };

  const[inputValue, setInputValue] = useState('')
  const handleInputChanges = (e: any) => {
    setInputValue(e.target.value);
  };

  
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newKeyword = inputValue.trim();
      if (newKeyword !== "") {
        // Update linkedKeywords and then update newformData
        setLinkedKeywords((prevKeywords) => {
          const updatedKeywords = [...prevKeywords, newKeyword];
          
          // Update the newformData with the updated linkedKeywords
          setNewFormData((prevnewformData: any) => ({
            ...prevnewformData,
            LinkedKeywords: updatedKeywords,
          }));
  
          return updatedKeywords;
        });
        setInputValue("");
      }
    }
  };
  



  return (
    <div className="p-[30px] mt-[60px] ml-[25%]">
      <div className="font-bold text-[#247B7B] mb-[10px] ml-[-85%]">
        {" "}
        Create New Campaign
      </div>
     
      <form className="mt-[5px]">
        <div className="">
          <div className="hidden">
            Campaign Status: {newformData.campaignName ? "Active" : "Not Active"}
          </div>
          <label className="text-[10px] flex items-center">
            Campaign Name
            <span className="text-red-500 ml-1">*</span>
          </label>
          <br />
          <input
            type="text"
            required
            placeholder="e.g the future is now"
            className="text-[10px] w-[500px] border-[1px] h-[30px] p-[10px] mt-[-25px]"
            name="campaignName"
            value={newformData.campaignName}
            onChange={handleInputChange}
          />
        </div>

        <div className="mt-[-10px]">
          <label className="text-[10px] flex items-center">
            Campaign Description
            <span className="text-red-500 ml-1">*</span>
          </label>
          <br />
          <textarea
            required
            placeholder="Please add a description to your campaign"
            className="text-[10px] w-[500px] h-[50px] border-[1px] p-[10px] mt-[-20px]"
            name="campaignDescription"
            value={newformData.campaignDescription}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-row gap-[20px] mt-[10px]">
          <div className="mt-[-20px]">
            <label className="text-[10px] flex items-center">
              Start Date
              <span className="text-red-500 ml-1">*</span>
            </label>
            <br />
            <input
              type="date"
              required
              placeholder="e.g the future is now"
              name="startDate"
              className="text-[10px] w-[250px] h-[50px] border-[1px] p-[10px] mt-[-20px]"
              value={newformData.startDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-[-20px]">
            <label className="text-[10px] flex items-center">
              End Date
              <span className="text-red-500 ml-1">*</span>
            </label>
            <br />
            <input
              type="date"
              required
              placeholder="e.g the future is now"
              name="endDate"
              className="text-[10px] w-[250px] h-[50px] border-[1px] p-[10px] mt-[-20px]"
              value={newformData.endDate}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between mt-[-20px]   w-[500px] p-[10px]">
          <p className="text-[10px]">
            Want to recieve daily digest about the campaign ?{" "}
          </p>
          <button name="digestCampaign" onClick={changeToggle}>
            {toggle ? <BsToggleOn /> : <BsToggleOff />}
          </button>
        </div>

        <div className="mt-[10px] ">
          <label className="text-[10px] flex items-center">
            Linked Keyword
            <span className="text-red-500 ml-1">*</span>
          </label>
          <br />
          <div className="border-[1px] w-[500px] h-[100px]">
          <div className="flex flex-row gap-[10px] p-[10px]">
              {linkedKeywords.map((keyword, index) => (
                <div
                  key={index}
                  className="flex flex-row items-center text-[10px]  gap-[5px] border-[1px] p-[5px] bg-[#247B7B] text-white "
                >
                  {" "}
                  <span>{keyword}</span>
                  <button onClick={() => removeKeyword(index)}>
                    {" "}
                    &times;{" "}
                  </button>
                </div>
              ))}
            </div>
            
            <input
              required
              placeholder="Press enter after typing...."
              className="text-[10px] w-[500px] h-[40px]  p-[10px] border-white "
              value={inputValue}
              name="linkedKeywords"
              onChange={handleInputChanges}
              onKeyDown={handleKeyDown}
            />
          
          </div>
        </div>

        <div>
          <p className="text-[10px] mt-[5px]">
            Kindly select how often you want to receive the daily digest
          </p>
          <select
            value={selectVal}
            name="select value"
            className="text-[10px] w-[200px] border-[1px] p-[10px] mt-[20px]"
            onChange={handleSelected}
            required
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        <div className="flex flex-row justify-between  w-[500px] mt-[10px]">
          <Link to="/">
            <button className="text-[10px]  text-[#247B7B] btn-style border-[#247B7B] rounded w-[200px] p-[10px] ">
              Cancel
            </button>
          </Link>

          <button
            onClick={handlePostData}
            className="text-[10px] text-center border-[1px] bg-[#247B7B] text-white rounded w-[200px] p-[10px] "
          >
            {loading ? "Loading.." : "Create Campaign"}
          </button>
        </div>
      </form>

      {showModal && 
      <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm">
      <div className="flex  h-[100vh] justify-center items-center flex-col">
        <div className="bg-gray-50 shadow-md text-center w-[350px] flex justify-center text-[10px] items-center gap-[20px] flex-col h-[250px] rounded">
          <IoCheckmarkCircle className="text-[60px] text-[#247B7B]" />
          <p className="text-[10px]">{modalMessage}</p>
          <Link to="/campaign">
            <button
              className="text-white bg-[#247B7B] p-[10px] rounded w-[170px]"
              onClick={() => setShowModal(false)}
            >
              Go back to campaign List
            </button>
          </Link>
        </div>
      </div>
    </div>
    }
    </div>
  );
}
