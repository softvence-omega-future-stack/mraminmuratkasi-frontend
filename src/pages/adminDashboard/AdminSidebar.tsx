"use client";

import { Edit } from "lucide-react";
import Logo from "/public/images/authLogo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: SidebarProps) {
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
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center h-full flex flex-col items-center border border-gray-100 md:border-none">
          <div className="md:hidden self-start mb-6">
            <img src={Logo} alt="Logo" className="h-8" />
          </div>

          <div className="relative mb-4 mt-4">
            <div className="w-32 h-32 rounded-full p-1 border-2 border-blue-100 overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900">Admin Panel</h2>
          <p className="text-blue-500 flex items-center justify-center gap-1 mt-1 text-sm font-medium">
            Active System
          </p>

          <button className="mt-4 flex items-center gap-2 text-blue-500 bg-blue-50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors w-full justify-center">
            <Edit className="w-4 h-4" />
            Admin Settings
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
            <button className="w-full py-3 bg-gray-50 text-gray-600 font-medium rounded-xl hover:bg-gray-100 transition-colors">
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
