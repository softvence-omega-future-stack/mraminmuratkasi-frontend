import { useSocket } from "@/context/SocketContext";
import { useGetProfileQuery } from "@/redux/api/authApi";
import {
  useDeleteNotificationForAdminMutation,
  useGetAllNotificationsQuery,
  useGetNotificationForBellQuery,
} from "@/redux/api/notificationApi";
import { formatDate } from "@/utils/data";
import {
  Bell,
  FileText,
  Home,
  LockKeyhole,
  Menu,
  MessageCircleMore,
  SquarePen,
} from "lucide-react";
import { useState } from "react";
import { FaUserFriends } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import { toast } from "sonner";
import NotificationModalForAdmin from "./case/modal/NotificationModalForAdmin";

interface ClientTopNavProps {
  onMenuClick: () => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
}

const AdminNavBar = ({ onMenuClick }: ClientTopNavProps) => {
  const navigate = useNavigate();
  const { data: profileData } = useGetProfileQuery(undefined);
  const user = profileData?.data;

  const location = useLocation();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const { data: notificationData } = useGetAllNotificationsQuery(undefined);
  const { data: bellNotificationData } =
    useGetNotificationForBellQuery(undefined);
  const [deleteNotification] = useDeleteNotificationForAdminMutation();

  const notificationsList = notificationData?.data?.notificationList || [];
  const newNotificationCount = bellNotificationData?.data?.newNotification || 0;

  const notifications = notificationsList.map((notif: any) => ({
    id: notif._id,
    message: notif.notificationDetail,
    time: formatDate(notif.createdAt),
    unread: !notif.isSeen,
    avatar: notif.Profile_id?.img || "/images/navProfile.png",
    userId: notif?.user_id,
  }));

  const handleDeleteNotification = async (id: string | number) => {
    try {
      await deleteNotification(id).unwrap();
      toast.success("Benachrichtigung erfolgreich gelöscht");
    } catch (error) {
      console.error("Löschen der Benachrichtigung fehlgeschlagen:", error);
    }
  };

  const accountMenuItems = [
    {
      label: "Profil bearbeiten",
      icon: SquarePen,
      onClick: () => navigate("/admin/edit-profile"),
      danger: false,
    },
    {
      label: "Passwort ändern",
      icon: LockKeyhole,
      onClick: () => navigate("/admin/change-password"),
      danger: false,
    },
  ];

  const navItems = [
    {
      label: "Startseite",
      path: "/admin",
      icon: Home,
      padding: "px-4.5",
    },
    {
      label: "Fälle",
      path: "/admin/cases",
      icon: FileText,
      padding: "px-6",
    },
    {
      label: "Kunden",
      path: "/admin/client",
      icon: FaUserFriends,
      padding: "px-6",
    },
    {
      label: "Chat",
      path: "/admin/chat",
      icon: MessageCircleMore,
      padding: "px-6",
    },
  ];

  const isActiveRoute = (path: string) => {
    const currentPath = location.pathname;
    if (path === "/admin") {
      return currentPath === "/admin";
    }
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const { totalUnseenCount } = useSocket();

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-30 rounded-[60px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu className="w-5 h-5" />
          </button>
          <img
            src="/images/authLogo.png"
            alt="Logo"
            className="w-12 h-16 md:h-10"
          />
        </div>

        <div className="md:h-13 hidden md:flex items-center bg-gray-100 rounded-full p-1 space-x-3">
          {navItems.map(({ label, path, icon: Icon, padding }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex items-center space-x-2 ${padding} py-2 rounded-full transition-all cursor-pointer relative ${
                isActiveRoute(path)
                  ? "bg-[#1878B5] text-white shadow-sm"
                  : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{label}</span>
              {totalUnseenCount > 0 && path === "/admin/chat" && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white px-1">
                  {totalUnseenCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setOpen(true)}
            className="relative p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {newNotificationCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white px-1">
                {newNotificationCount}
              </span>
            )}
          </button>

          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center space-x-3 bg-[#E8F2F8] rounded-full pl-1 pr-2 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <img
                src={
                  user?.img ||
                  "https://media.istockphoto.com/id/2235903620/photo/happy-50-years-old-business-man-in-suit-standing-in-office-headshot-portrait.webp?a=1&b=1&s=612x612&w=0&k=20&c=2say2ge83Ytw-k3YPSCweS8BcXoira3VoIiZjwGzghQ="
                }
                alt="Profil"
                className="w-8 h-8 rounded-full bg-white"
              />
              <span className="hidden sm:block text-xs font-medium text-gray-900">
                {user?.name || "Admin"}
              </span>
              <span className="text-gray-400 text-xs">▼</span>
            </button>

            {showAccountMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-gray-200 space-y-2">
                  {accountMenuItems.map(
                    ({ label, icon: Icon, onClick, danger }, _index) => (
                      <button
                        key={label}
                        onClick={() => {
                          onClick();
                          setShowAccountMenu(false);
                        }}
                        className={`w-full flex items-center space-x-2 px-3 py-4 text-sm rounded transition-colors border-t border-t-gray-50 cursor-pointer ${
                          danger
                            ? "text-[#FE1B1B] hover:bg-gray-50"
                            : "text-gray-900 hover:bg-gray-50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{label}</span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      <NotificationModalForAdmin
        open={open}
        onClose={() => setOpen(false)}
        notifications={notifications}
        onDelete={handleDeleteNotification}
      />
    </div>
  );
};

export default AdminNavBar;
