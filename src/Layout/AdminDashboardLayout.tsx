import AdminNavBar from "@/components/admin/AdminNavBar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { SocketProvider } from "@/context/SocketContext";

import { useState } from "react";
import { Outlet } from "react-router-dom";

const AdminDashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <SocketProvider>
      <div
        className="flex flex-col  h-screen
      g-gray-50 overflow-hidden px-6 pt-3"
      >
        <AdminNavBar
          onMenuClick={() => setSidebarOpen(true)}
          showProfileMenu={showProfileMenu}
          setShowProfileMenu={setShowProfileMenu}
        />

        <div className="flex flex-1 gap-6 overflow-hidden sm:px-6 pt-6">
          <div className="hidden lg:block lg:shrink-0">
            <AdminSidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>

          {sidebarOpen && (
            <div className="fixed inset-0 z-40 lg:hidden">
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="absolute left-0 top-0 h-full w-80 max-w-full">
                <AdminSidebar
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
              </div>
            </div>
          )}

          <main className="flex-1 overflow-auto scrollbar-hide">
            <div className="max-w-7x mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SocketProvider>
  );
};

export default AdminDashboardLayout;
