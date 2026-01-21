// ===== Root API Response =====
export interface GetCaseDetailsResponse {
  status: "success" | "error";
  message: string;
  data: {
    caseOverview: CaseOverview;
  };
}

// ===== Case Overview =====
export interface CaseOverview {
  _id: string;
  user_id: string;
  client_user_id: string;
  clientName: string;
  caseTitle: string;
  caseType: string;
  case_status: "Pending" | "Approved" | "Closed" | string;
  coatDate: string; // ISO date string
  note: string;
  vehicleNumber: string;
  isMailSent: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  caseNumber: string;
  __v: number;
  timeLine_id: TimeLine;
  assetList_id: AssetList;
}

// ===== Timeline =====
export interface TimeLine {
  _id: string;
  timeLine: TimeLineItem[];
}

export interface TimeLineItem {
  _id: string;
  title: string;
  description: string;
  date: string; // ISO date or YYYY-MM-DD
  isDeleted: boolean;
  assetUrl: string[];
  assetName?: string;
  fileSize?: number;
  createdAt: string;
  updatedAt: string;
}

// ===== Asset List =====
export interface AssetList {
  _id: string;
  assets: AssetItem[];
}

export interface AssetItem {
  _id: string;
  assetUrl: string;
  assetName: string;
  fileSize: number;
  uploadDate: string;
  createdAt: string;
  updatedAt: string;
}
