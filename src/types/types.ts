export interface Campaigns {
  id: number;
  campaignName: string;
  campaignDescription: string;
  startDate: string;
  endDate: string;
  linkedKeywords: string;
  digestCampaign: boolean;
  dailyDigest: string;
  campaignStatus: 'Active' | 'Inactive' | 'All';
  }

  export const initialCampaigns: Campaigns[] = [
    {
      id: 1,
      campaignName: '',
      campaignDescription: '',
      startDate: '',
      endDate: '',
      linkedKeywords: '',
      digestCampaign: false,
      dailyDigest: '',
      campaignStatus: 'Active'
    }
  ]

  export interface CampaignContextType {
    handlePostData: (e: any) => Promise<void>;
    getCampaigns: () => Promise<void>;
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    newformData: NewCampaignData;
    setNewFormData: React.Dispatch<React.SetStateAction<NewCampaignData>>,
    campaigns: Campaigns[],
    setCampaigns: React.Dispatch<React.SetStateAction<Campaigns[]>>,
    isSuccessful: boolean, 
    setIsSuccessful: React.Dispatch<React.SetStateAction<boolean>>
    modalMessage: string,
    setModalMessage:React.Dispatch<React.SetStateAction<string>>,
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>
    loading: boolean,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    campaignUrl: any
  }


  export interface campaignProviderProps {
    children: React.ReactNode;
  }
export interface FormData {
    campaignName: string;
    campaignDescription: string;
    startDate: string;
    endDate: string;
    linkedKeywords: string;
    digestCampaign: boolean;
    dailyDigest: string;
    campaignStatus:  'Active' | 'Inactive' | 'All';
  }

  export const initialState: FormData = {
    campaignName: '',
    campaignDescription: '',
    startDate: '',
    endDate: '',
    linkedKeywords: '',
    digestCampaign: false,
    dailyDigest: '',
    campaignStatus: 'Active'
  };

  export interface NewCampaignData {
    campaignName: string;
    campaignDescription: string;
    startDate: string;
    endDate: string;
    digestCampaign: boolean;
    dailyDigest: string;
    LinkedKeywords: string[];
    campaignStatus: "Active" | "Inactive";

  }

  export const initialNewCampaignData: NewCampaignData = {
    campaignName: '',
    campaignDescription: '',
    startDate: '',
    endDate: '',
    digestCampaign: false,
    dailyDigest: '',
    LinkedKeywords: [],
    campaignStatus: "Active",
  }

  export enum ErrorState {
    OK = 200,                          
    CREATED = 201,                   
    ACCEPTED = 202,                   
    NO_CONTENT = 204,                 
    BAD_REQUEST = 400,               
    UNAUTHORIZED = 401,              
    FORBIDDEN = 403,                 
    NOT_FOUND = 404,                  
    INTERNAL_SERVER_ERROR = 500,       
    SERVICE_UNAVAILABLE = 503   
  }