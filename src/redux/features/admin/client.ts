export interface CaseAsset {
  _id: string;
  assetUrl: string;
  assetName: string;
  fileSize: number;
  uploadDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CaseTimelineItem {
  _id: string;
  title: string;
  description: string;
  date: string;
  assetUrl: string[];
  assetName?: string;
  fileSize?: number;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CaseTimeline {
  _id: string;
  caseOverview_id: string;
  client_user_id: string;
  caseTitle: string;
  timeLine: CaseTimelineItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CaseAssetList {
  _id: string;
  client_user_id: string;
  caseOverview_id: string;
  assets: CaseAsset[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CaseOverview {
  _id: string;
  user_id: string;
  client_user_id: string;
  clientName: string;
  caseTitle: string;
  caseType: string;
  case_status: string;
  coatDate: string;
  note: string;
  vehicleNumber: string;
  isMailSent: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  caseNumber: string;
  __v: number;
  timeLine_id: CaseTimeline;
  assetList_id?: CaseAssetList;
}

export type UserProfile = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  img: string;
  emailNotification: boolean;
  user_id: string;
  case_ids: CaseOverview[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type SingleUser = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  agreedToTerms: boolean;
  role: "user" | "admin";
  allowPasswordChange: boolean;
  OTPVerified: boolean;
  isDeleted: boolean;
  isBlocked: boolean;
  isLoggedIn: boolean;
  fcmToken: string;
  notificationsEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  lastLogin: string;
  sentOTP: string;
  loggedOutTime: string;
  profile: UserProfile;
  caseCount: number;
};

export type AllClient = {
  data: SingleUser[];
  success: boolean;
  message: string;
};
