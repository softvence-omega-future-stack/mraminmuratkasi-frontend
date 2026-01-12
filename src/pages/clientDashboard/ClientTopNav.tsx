"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import {
  Menu,
  Bell,
  LogOut,
  Settings,
  Home,
  FileText,
  MessageCircleMore,
} from "lucide-react";

interface ClientTopNavProps {
  onMenuClick: () => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
}

export default function ClientTopNav({
  onMenuClick,
}: //   showProfileMenu,
//   setShowProfileMenu,
ClientTopNavProps) {
  //   const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);

  const handleLogout = () => {
    // logout();
    navigate("/");
  };

  const notifications = [
    {
      id: 1,
      message: "You have received a new message regarding your traffic case",
      time: "2 hours ago",
    },
    {
      id: 2,
      message: "You have received a new message regarding your traffic case",
      time: "4 hours ago",
    },
    {
      id: 3,
      message: "You have received a new message regarding your traffic case",
      time: "6 hours ago",
    },
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-30 rounded-[60px]">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <img
            src="/images/authLogo.png"
            alt="Logo"
            className="w-12 h-16 md:h-10"
          />
        </div>

        {/* Center: Navigation Pills (Desktop) */}
        <div className="md:h-[52px] hidden md:flex items-center bg-gray-100 rounded-full p-1 space-x-3">
          <button
            onClick={() => navigate("/client")}
            className="flex items-center space-x-2 px-4.5 py-2 rounded-full bg-[#1878B5] text-white shadow-sm transition-all hover:bg-[#1878D9] cursor-pointer"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </button>
          <button
            onClick={() => navigate("/client/cases")}
            className="flex items-center space-x-2 px-6 py-2 rounded-full text-gray-500 hover:bg-[#1878B5] hover:text-white transition-all hover:bg-[#1878D9] cursor-pointer"
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Cases</span>
          </button>
          <button
            onClick={() => navigate("/client/chat")}
            className="flex items-center space-x-2 px-6 py-2 rounded-full text-gray-500 hover:bg-[#1878B5] hover:text-white transition-all hover:bg-[#1878D9] cursor-pointer"
          >
            <MessageCircleMore className="w-4 h-4" />
            <span className="font-medium">Chat</span>
          </button>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors p-3 cursor-pointer"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                <div className="p-4 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center space-x-3 bg-[#E8F2F8] rounded-full pl-1 pr-2 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <img
                src="/public/images/navProfile.png"
                alt="Profile"
                className="w-8 h-8 rounded-full bg-white"
              />
              <span className="hidden sm:block text-xs font-medium text-gray-900">
                Wade Warren
              </span>
              <span className="text-gray-400 text-xs">▼</span>
            </button>

            {/* Account Menu Dropdown */}
            {showAccountMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {/* Same dropdown content as before */}
                <div className="p-4 border-b border-gray-200">
                  <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Account
                  </h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate("/client/profile");
                        setShowAccountMenu(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
