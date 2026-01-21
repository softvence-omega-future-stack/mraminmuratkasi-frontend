// ===== Root Response =====
export interface AllCasesResponse {
  status: "success" | "error";
  message: string;
  data: CasesData;
}

// ===== Pagination Wrapper =====
export interface CasesData {
  cases: Case[];
  total: number;
  page: number;
  limit: number;
}

// ===== Case =====
export interface Case {
  _id: string;
  user_id: string;
  client_user_id: string;
  clientName: string;
  caseTitle: string;
  caseType: string;
  case_status: string;
  coatDate: string; // ISO date string
  note: string;
  vehicleNumber: string;
  isMailSent: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  caseNumber: string;
  __v: number;
  timeLine_id: TimeLineContainer;
  assetList_id: AssetList;
}

// ===== Timeline =====
export interface TimeLineContainer {
  _id: string;
  timeLine: TimeLineItem[];
}

export interface TimeLineItem {
  _id: string;
  title: string;
  description: string;
  date: string; // ISO string or yyyy-mm-dd
  assetUrl: string[];
  assetName?: string;
  fileSize?: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

// ===== Assets =====
export interface AssetList {
  _id: string;
  assets: Asset[];
}

export interface Asset {
  _id: string;
  assetUrl: string;
  assetName: string;
  fileSize: number;
  uploadDate: string;
  createdAt: string;
  updatedAt: string;
}
