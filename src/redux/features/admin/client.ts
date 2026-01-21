export type UserProfile = {
  _id: string;
  name: string;
  phone: string;
  email: string;
  img: string;
  emailNotification: boolean;
  user_id: string;
  case_ids: string[];
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type User = {
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
  data: User[];
  success: boolean;
  message: string;
};
