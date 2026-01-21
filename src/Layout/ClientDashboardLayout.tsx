"use client";

import ClientSidebar from "@/pages/clientDashboard/ClientSidebar";
import ClientTopNav from "@/pages/clientDashboard/ClientTopNav";

import { useState } from "react";
import { SocketProvider } from "@/context/SocketContext";

import { Outlet } from "react-router-dom";

export default function ClientDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  //   const { user } = useAuth();
  //   const location = useLocation();

  return (
    <SocketProvider>
      <div className="flex flex-col h-screen bg-gray-50 overflow-hidden px-6 pt-3">
        {/* Top Navigation - Full Width */}
        <ClientTopNav
          onMenuClick={() => setSidebarOpen(true)}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
        />

        {/* Main Container - Flex Sidebar and Content */}
        <div className="flex flex-1 gap-5 overflow-hidden px-6 pt-6">
          {/* Mobile Sidebar overlay is inside ClientSidebar, but desktop persistent sidebar is here */}
          <div className="hidden lg:block lg:shrink-0">
            <ClientSidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="absolute left-0 top-0 h-full w-80 max-w-full">
                <ClientSidebar
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Page Content */}
          <main className="flex-1 overflow-auto">
            <div className="max-w-7x mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SocketProvider>
  );
}
