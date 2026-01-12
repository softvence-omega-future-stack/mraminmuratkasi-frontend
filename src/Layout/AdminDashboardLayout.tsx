"use client";

import React, { useState } from "react";
import AdminSidebar from "@/pages/adminDashboard/AdminSidebar";
import AdminTopNav from "@/pages/adminDashboard/AdminTopNav";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function AdminDashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
      {/* Top Navigation - Full Width */}
      <AdminTopNav
        onMenuClick={() => setSidebarOpen(true)}
        showProfileMenu={showProfileMenu}
        setShowProfileMenu={setShowProfileMenu}
      />

      {/* Main Container - Flex Sidebar and Content */}
      <div className="flex flex-1 overflow-hidden px-6 pt-3">
        <AdminSidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
