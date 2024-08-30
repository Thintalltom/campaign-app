import React, { useEffect, useState, useContext } from "react";
import { IoMdArrowBack } from "react-icons/io";
import {
  Link,
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/EditCampaign.css";
import "@/styles/NewCampaign.css";
import axiosInstance from "@/configurations/axiosConfig";
import { FormData, initialState, ErrorState } from "../types/types";
import { CampaignContextHook } from "@/context/CampaignContext";

export default function Edit() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const { formData, setFormData, campaignUrl, campaigns } =
    CampaignContextHook();

  //to get data of the campaign to be edited
  const getCampaign = async () => {
    try {
      const postData = await axios.get(`${campaignUrl}/${id}`);
      const campaignData = postData.data;
      campaignData.startDate = formatDate(campaignData.startDate);
      campaignData.endDate = formatDate(campaignData.endDate);
      setFormData(campaignData);
      console.log(postData.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCampaign();
  }, []);

  const formatDate = (dateString: string | number) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month: any = date.getMonth() + 1;
    let day: any = date.getDate();

    if (month < 10) {
      month = `0${month}`;
    }

    if (day < 10) {
      day = `0${day}`;
    }

    return `${year}-${month}-${day}`;
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
  
    const updatedData = {
      campaignName: formData.campaignName,
      startDate: formData.startDate,
      endDate: formData.endDate,
      linkedKeywords: formData.linkedKeywords,
      digestCampaign: formData.digestCampaign,
      dailyDigest: formData.dailyDigest,
      campaignStatus: formData.campaignStatus,
    };
    try {
      const response = await axiosInstance.put(`${campaignUrl}/${id}`, updatedData);
      console.log(response);
      console.log("Campaign has been updated.");
      navigate("/campaign");
    } catch (err) {
      console.log(err);
      console.log("Unable to update campaign");
    }
  };

  const [deleteCampaign, setDeleteCampaign] = useState(false);

  const stopCampaign = async () => {
    setFormData({ ...formData, campaignStatus: "Inactive" });
    if (formData.campaignStatus === "Inactive") {
      setDeleteCampaign(true);
    }
  };

  return (
    <div>
      <div className=" ml-[27%] mt-[90px] text-left w-[60%] ">
        <Link to="/campaign">
          <p className="back text-sm">
            <IoMdArrowBack className="arrow-back" />
            Back
          </p>
        </Link>
        <div className="flex justify-between">
          <h3 className=" text-green-700">Campaign Information</h3>
          <p className="">
            Campaign Status <span className="demac">|</span>{" "}
            <span
              className={
                formData.campaignStatus === "Active"
                  ? "text-green-500"
                  : "text-red-500"
              }
            >
              {formData.campaignStatus}
            </span>
          </p>
        </div>
        <div className="mt-[10px]">
          <form onSubmit={handleEdit}>
            <div className="name edit-name">
              <label className="text-xs">Campaign Name</label>
              <input
                type="text"
                required
                name="campaignName"
                value={formData.campaignName}
                onChange={(e) =>
                  setFormData({ ...formData, campaignName: e.target.value })
                }
              />
            </div>

            <div className="flex flex-row gap-[30px]">
              <div className="">
                <label className="text-xs">
                  Start Date<span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-[325px] text-xs h-[40px] border-[1px] p-[5px] rounded"
                />
              </div>
              <div className="edit-end-date-cont">
                <label className="text-xs">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-[325px] text-xs h-[40px] border-[1px] p-[5px] rounded"
                />
              </div>
            </div>
            <div>
              <label className="text-xs">Linked Keywords*</label>
              <textarea
                name="linkedKeywords"
                onChange={(e) =>
                  setFormData({ ...formData, linkedKeywords: e.target.value })
                }
                value={formData.linkedKeywords}
              />
            </div>
            <div>
              <label className="text-xs">
                Want to receive daily digest about the campaign?
              </label>
              <select
                className=" text-xs addnew-select-input edit-daily digest"
                name="digestCampaign"
                value={formData.digestCampaign ? "Yes" : "No"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    digestCampaign: e.target.value === "Yes",
                  })
                }
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="text-xs">
                Kindly select how often you want to receive daily digest
              </label>
              <select
                className=" text-xs addnew-select-input edit-daily"
                name="dailyDigest"
                value={formData.dailyDigest}
                onChange={(e) =>
                  setFormData({ ...formData, dailyDigest: e.target.value })
                }
              >
                <option value="Monthly">Monthly</option>
                <option value="Weekly">Weekly</option>
              </select>
            </div>
            <div className="gap-[20px] p-[20px] flex flex-row  mt-[10px]">
              <Link to="">
                <button className="bg-red-500 w-[200px] text-white  h-[40px] rounded   ">
                  Stop Campaign
                </button>
              </Link>
              <button
                onClick={handleEdit}
                type="submit"
                className="bg-green-800 w-[200px] text-white border-[1px]   h-[40px] rounded   "
              >
                Edit Information
              </button>
            </div>
          </form>
        </div>
      </div>
      {deleteCampaign && (
        <div className="fixed inset-0 bg-opacity-30 backdrop-blur-sm">
          <div className="flex  h-[100vh] justify-center items-center flex-col">
            <div className="bg-gray-50 shadow-md text-center w-[350px] flex justify-center text-[10px] items-center gap-[20px] flex-col h-[250px] rounded">
              {" "}
              <p className="text-center font-medium text-[10px]">
                Stop Campaign
              </p>
              <p>{formData.campaignName}</p>
              <button
                onClick={() => navigate("/campaign")}
                className="mt-4 bg-[#247B7B] text-[10px] w-[150px] text-white p-2 rounded"
              >
                Go back to campaign List
              </button>{" "}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
