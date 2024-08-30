import React, { useEffect, useState, useContext } from "react";
import Navbar from "@/components/SideBar";
import { Link } from "react-router-dom";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { GoEye } from "react-icons/go";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSearch } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import "@/styles/Campaign.css";
import "@/styles/Overview.css";

import axios from "axios";
import { Campaigns } from "../types/types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CampaignContextHook } from "@/context/CampaignContext";
const Campaign: React.FC = () => {
  const { campaigns, getCampaigns } = CampaignContextHook();

  // handles the list of campaigns shown per page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // number of campaigns that will show per page
  const itemsPerPage: number = 10;
  const [filterType, setFilterType] = useState<string>('All')

  // handles the rendering of the campaigns from the backend api
  useEffect(() => {
    getCampaigns();
  }, []);

  // this function is incharge of deleting any selected campaign that matches an id
  const deleteCampaign = async (id: any): Promise<void> => {
    // confirm if you want to delete the clicked campaign
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this campaign?"
    );
    if (isConfirmed) {
      try {
        const res = await axios.delete(
          `https://infinion-test-int-test.azurewebsites.net/api/Campaign/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 204) {
          toast.success("Campaign has been deleted.");
          getCampaigns();
        }
      } catch (err) {
        toast.error("Unable to delete campaign");
      }
    }
  };

  // this handles the number of campaigns that will be shown per page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCampaigns = campaigns.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(campaigns.length / itemsPerPage);

  // handles the pagination also
  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers: number[] = [];
  for (let i: number = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  // filters and displays the number of active and inactive campaigns
  const activeCampaignsCount = campaigns.filter(
    (campaign: Campaigns) => campaign.campaignStatus === "Active"
  ).length;
  const inactiveCampaignsCount = campaigns.filter(
    (campaign: Campaigns) => campaign.campaignStatus !== "Active"
  ).length;

  const filteredCampaigns = campaigns.filter((campaign: any) => {
    if (filterType === "All") return true;
    if (filterType === "Active") return campaign.campaignStatus === "Active";
    if (filterType === "Inactive") return campaign.campaignStatus !== "Active";
    return false;
  });



  return (
    <div className=" ml-[5%] bigContainer flex justify-center flex-col p-[20px] mt-[100px]  items-center">
      <div className=" w-full  ">
        <div className="ml-[-570px]">
          <h3 className=" font-bold text-[#2A9D8F]">All Campaigns</h3>
        </div>
      </div>

      <div className=" w-[100vw] ml-[200px] flex justify-center items-center flex-col">
        <div className="flex justify-around items-center gap-[50px] mb-[20px] ">
          <div className="flex  gap-[20px] mt-[20px]">
             <button
              className={`border-[2px] btnHolder rounded text-[10px] p-[10px] w-[70px] ${
                filterType === "All" ? "bg-[#2A9D8F] text-white border-white" : "text-[#2A9D8F] border-[#2A9D8F]"
              }`}
              onClick={() => setFilterType("All")}
            >
              All
            </button>
            <button
              className={`border-[2px] btnHolder rounded text-[10px] p-[10px] w-[70px] ${
                filterType === "Inactive" ? "bg-[#2A9D8F] text-white border-white" : "text-[#2A9D8F] border-[#2A9D8F]"
              }`}
              onClick={() => setFilterType("Inactive")}
            >
              Inactive
            </button>
            <button
              className={`border-[2px] btnHolder rounded text-[10px] p-[10px] w-[70px] ${
                filterType === "Active" ? "bg-[#2A9D8F] border-white text-white" : "text-[#2A9D8F] border-[#2A9D8F]"
              }`}
              onClick={() => setFilterType("Active")}
            >
              Active
            </button>
          </div>

          <div className="flex justify-center rounded  gap-[5px] searchContainer h-[40px] items-center border-[1px] border-slate-500  ">
            <input
              type="text"
              className=" w-[250px] border-white mt-[10px] p-[5px] text-xs rounded"
              placeholder="Search..."
            />
            <CiSearch />
          </div>
          <div className=" flex justify-center rounded  gap-[5px] searchContainer h-[40px] items-center border-[1px] border-slate-500  ">
          <input
            type="text"
            className=" w-[200px] p-[5px] border-white mt-[20px] text-xs rounded"
            placeholder="Filter by date..."
          />
          <IoIosArrowDown />
        </div>
        </div>
        <div className="">
          <div className=" ">
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>Campaign Name</th>
                  <th>Start Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentCampaigns.map((campaign: any, index: number) => {
                  return (
                    <tr key={campaign.id} className=" text-xs border-b-[1px]">
                      <td>{indexOfFirstItem + index + 1}.</td>
                      <td>{campaign.campaignName}</td>
                      <td>{campaign.startDate.slice(0, 10)}</td>
                      <td
                        className={
                          campaign.campaignStatus === "Active"
                            ? "text-green-500"
                            : "text-red-500"
                        }
                      >
                        {campaign.campaignStatus.toUpperCase()}
                      </td>
                      <td className="btn-td">
                        <Link
                          to={`/edit-campaign/${campaign.id}?${campaign.id}`}
                        >
                          <button className="eye-btn">
                            <GoEye />
                          </button>
                        </Link>
                        <Link
                          to={`/edit-campaign/${campaign.id}`}
                        >
                          <button className="edit-btn">
                            <FiEdit />
                          </button>
                        </Link>
                        <button
                          onClick={() => deleteCampaign(campaign.id)}
                          className="delete-btn"
                        >
                          <RiDeleteBin6Line />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="campaign-number-cont">
            <p className="campaign-number">
              {currentPage > 1 && (
                <span onClick={() => handlePageClick(currentPage - 1)}>
                  <IoIosArrowBack className="arrow-back" />
                </span>
              )}
              {pageNumbers.map((number) => {
                if (
                  number === 1 ||
                  number === totalPages ||
                  (number >= currentPage - 2 && number <= currentPage + 2)
                ) {
                  return (
                    <span
                      key={number}
                      className={`page-number ${
                        currentPage === number ? "num-two" : ""
                      }`}
                      onClick={() => handlePageClick(number)}
                    >
                      {number}
                    </span>
                  );
                } else if (
                  (number === currentPage - 7 && number > 1) ||
                  (number === currentPage + 7 && number < totalPages)
                ) {
                  return <span key={number}>...</span>;
                } else {
                  return null;
                }
              })}
              {currentPage < totalPages && (
                <span onClick={() => handlePageClick(currentPage + 1)}>
                  <IoIosArrowForward className="arrow-forward" />
                </span>
              )}
            </p>
            <p className="campaign-bottom-text">
              Showing {currentCampaigns.length} of {campaigns.length} results
            </p>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};
export default Campaign;
