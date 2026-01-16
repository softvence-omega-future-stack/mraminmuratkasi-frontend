"use client";

import { Edit, Sun, Moon, PenLine } from "lucide-react";
import Logo from "/public/images/authLogo.png";
import { useGetProfileQuery, useLogOutMutation } from "@/redux/api/authApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logOut] = useLogOutMutation();
  const { data: profileData } = useGetProfileQuery(undefined);
  const user = profileData?.data;

  const [greeting, setGreeting] = useState({ text: "", icon: <Sun className="w-5 h-5 text-[#F4B402]" /> });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting({ text: "Good Morning", icon: <Sun className="w-5 h-5 text-[#F4B402]" /> });
    } else if (hour < 18) {
      setGreeting({ text: "Good Afternoon", icon: <Sun className="w-5 h-5 text-[#F4B402]" /> });
    } else {
      setGreeting({ text: "Good Evening", icon: <Moon className="w-5 h-5 text-[#1878B5]" /> });
    }
  }, []);

  const handleLogout = async () => {
    try {
      await logOut(undefined).unwrap();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar / Profile Card Column */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-[300px] h-screen bg-gray-50 md:bg-transparent z-40 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center h-full flex flex-col items-center border border-gray-100 md:border-none overflow-y-auto">
          <div className="md:hidden self-start mb-6">
            <img src={Logo} alt="Logo" className="h-8" />
          </div>

          <div className="relative mb-4 mt-4">
            <div className="w-32 h-32 rounded-full p-1 border-2 border-blue-100 overflow-hidden">
              <img
                src={user?.img || "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"}
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Hi, {user?.name || "Admin"}
          </h2>
          <p className="text-[#1878B5] flex items-center justify-center gap-1 mt-1 text-sm font-medium">
            <span>{greeting.icon}</span> {greeting.text}
          </p>

          <button 
            onClick={() => navigate("/edit-profile")}
            className="mt-4 flex items-center gap-2 text-[#1878B5] bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors w-full justify-center cursor-pointer"
          >
            <PenLine className="w-4 h-4" />
            Edit Profile
          </button>

          <div className="mt-8 w-full bg-[#1A73E8] rounded-2xl p-6 text-white text-left overflow-hidden relative">
            <div className="flex justify-between items-center relative z-10">
              <div>
                <h3 className="text-3xl font-bold">142</h3>
                <p className="text-blue-100 text-[10px] mt-1 uppercase tracking-wider">
                  Total Users
                </p>
              </div>
              <div className="w-px h-10 bg-blue-400"></div>
              <div>
                <h3 className="text-3xl font-bold">12</h3>
                <p className="text-blue-100 text-[10px] mt-1 uppercase tracking-wider">
                  Reports
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto w-full pt-6">
            <button 
              onClick={handleLogout}
              className="w-full py-3 bg-gray-50 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden text-gray-400"
          >
            <Edit className="w-6 h-6 rotate-45" />
          </button>
        </div>
      </div>
    </>
  );
}
