import React, { createContext, useState, useContext } from "react";
import {
  FormData,
  initialState,
  ErrorState,
  CampaignContextType,
  initialNewCampaignData,
  campaignProviderProps,
  NewCampaignData,
  Campaigns,
  initialCampaigns,
} from "../types/types";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "@/configurations/axiosConfig";
export const CampaignContext = createContext<CampaignContextType>(
  {} as CampaignContextType
);

export const CampaignProvider = ({ children }: campaignProviderProps) => {
  const [formData, setFormData] = useState<FormData>(initialState);
  const [newformData, setNewFormData] = useState<NewCampaignData>(
    initialNewCampaignData
  );
  const [campaigns, setCampaigns] = useState<Campaigns[]>(initialCampaigns);
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const data = initialNewCampaignData;
  const campaignUrl: string = process.env.REACT_APP_API_BASE_URL || "";

  //code to get campaigns
  const getCampaigns = async () => {
    try {
      const postData = await axiosInstance.get(campaignUrl);
      setCampaigns(postData.data);
    } catch (err) {
      setCampaigns([]);
      toast.error("Unable to get campaigns, please retry");
    }
  };

  //code to post Data
  const handlePostData = async (e: any) => {
    setLoading(true);
    const newData = {
      campaignName: newformData.campaignName,
      campaignDescription: newformData.campaignDescription,
      startDate: newformData.startDate,
      endDate: newformData.endDate,
      LinkedKeywords: newformData.LinkedKeywords,
      digestCampaign: newformData.digestCampaign,
      dailyDigest: newformData.dailyDigest,
      campaignStatus: "Active",
    };
    try {
      const response = await axiosInstance.post(campaignUrl, newData);
      console.log(response);
      console.log("successfully sent");
      setModalMessage(`Campaign successfully created!`);
      setShowModal(true);
      setNewFormData(initialNewCampaignData);
    } catch (error: any) {
      console.error(
        "Error posting data:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  //values to be passed to the context
  const values = {
    handlePostData,
    formData,
    setFormData,
    newformData,
    setNewFormData,
    campaigns,
    setCampaigns,
    getCampaigns,
    isSuccessful,
    setIsSuccessful,
    modalMessage,
    setModalMessage,
    showModal,
    setShowModal,
    loading,
    setLoading,
    campaignUrl,
  };

  return (
    <CampaignContext.Provider value={values}>
      {children}
    </CampaignContext.Provider>
  );
};

//context hook
export const CampaignContextHook = () => {
  const context = useContext(CampaignContext);

  if (context === undefined) {
    throw new Error("useMyContext must be used within a MyProvider");
  }

  return context;
};
