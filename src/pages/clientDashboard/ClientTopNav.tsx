import { useNavigate, useLocation } from "react-router-dom";
import { useGetProfileQuery, useLogOutMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useState } from "react";
import {
  Menu,
  Bell,
  Home,
  FileText,
  MessageCircleMore,
  SquarePen,
  LockKeyhole,
  MessageSquareDot,
  LogOut,
} from "lucide-react";
import NotificationModal from "@/common/NotificationModal";
import { useGetAllNotificationsQuery, useGetNotificationForBellQuery, useDeleteNotificationMutation, useViewSpecificNotificationMutation } from "@/redux/api/notificationApi";
import { Switch } from "@/components/ui/switch";
import { useToggleNotificationMutation } from "@/redux/api/authApi";
import { useSocket } from "@/context/SocketContext";

interface ClientTopNavProps {
  onMenuClick: () => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
}

export default function ClientTopNav({
  onMenuClick,
}: ClientTopNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { data: profileData } = useGetProfileQuery(undefined);
  const user = profileData?.data;

  // Fetch notifications
  const { data: notificationData } = useGetAllNotificationsQuery(undefined);
  const { data: bellNotificationData } = useGetNotificationForBellQuery(undefined);
  const [deleteNotification] = useDeleteNotificationMutation();
  const [toggleNotification] = useToggleNotificationMutation();
  const [viewNotification] = useViewSpecificNotificationMutation();

  const { totalUnseenCount } = useSocket();

  const notificationsList = notificationData?.data?.notificationList || [];
  const newNotificationCount = bellNotificationData?.data?.newNotification || 0;

  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [open, setOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | number | null>(null);
  const [viewingId, setViewingId] = useState<string | number | null>(null);

  const handleDeleteNotification = async (id: string | number) => {
    try {
      setDeletingId(id);
      await deleteNotification(id).unwrap();
    } catch (error) {
      console.error("Failed to delete notification:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleViewNotification = async (notif: any) => {
    try {
      setViewingId(notif.id);
      // Mark as read
      await viewNotification(notif.id).unwrap();
      
      // Close modal
      setOpen(false);

      // Redirect logic
      const message = notif.message.toLowerCase();
      if (message.includes("message") || message.includes("chat") || message.includes("sent")) {
        navigate("/client/chat");
      } else if (message.includes("case") || message.includes("document")) {
        navigate("/client/cases");
      } else {
        // Fallback or other specific routes
        navigate("/client");
      }
    } catch (error) {
      console.error("Failed to view notification:", error);
    } finally {
      setViewingId(null);
    }
  };

  const handleToggleNotification = async (checked: boolean) => {
    try {
      await toggleNotification({ enabled: checked }).unwrap();
    } catch (error) {
      console.error("Failed to toggle notification:", error);
    }
  };

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

  const [logOut] = useLogOutMutation();

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

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const notifications = notificationsList.map((notif: any) => ({
    id: notif._id,
    message: notif.notificationDetail,
    time: formatTime(notif.createdAt),
    unread: !notif.isSeen,
    avatar: notif.Profile_id?.img || "/images/navProfile.png",
  }));

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-30 rounded-[60px]">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
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

        {/* Center: Navigation Pills (Desktop) */}
        <div className="md:h-[52px] hidden md:flex items-center bg-gray-100 rounded-full p-1 space-x-3">
          <button
            onClick={() => navigate("/client")}
            className={`flex items-center space-x-2 px-4.5 py-2 rounded-full transition-all cursor-pointer ${
              isActiveRoute("/client")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </button>
          <button
            onClick={() => navigate("/client/cases")}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all cursor-pointer ${
              isActiveRoute("/client/cases")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Cases</span>
          </button>
          <button
            onClick={() => navigate("/client/chat")}
            className={`relative flex items-center space-x-2 px-6 py-2 rounded-full transition-all cursor-pointer ${
              isActiveRoute("/client/chat")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
            }`}
          >
            <MessageCircleMore className="w-4 h-4" />
            <span className="font-medium">Chat</span>
            {totalUnseenCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white px-1">
                {totalUnseenCount}
              </span>
            )}
          </button>
        </div>

        {/* Right: Notifications & Profile */}
        <div className="flex items-center space-x-4">
          {/* Bell Button */}
          <button
            onClick={() => setOpen(true)}
            className="relative p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            {newNotificationCount > 0 && (
              <span className="absolute top-1 right-1 min-w-4.5 h-4.5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white px-1">
                {newNotificationCount}
              </span>
            )}
          </button>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center space-x-3 bg-[#E8F2F8] rounded-full pl-1 pr-2 py-2 hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <img
                src={user?.img || "https://media.istockphoto.com/id/2235903620/photo/happy-50-years-old-business-man-in-suit-standing-in-office-headshot-portrait.webp?a=1&b=1&s=612x612&w=0&k=20&c=2say2ge83Ytw-k3YPSCweS8BcXoira3VoIiZjwGzghQ="}
                alt="Profile"
                className="w-8 h-8 rounded-full bg-white object-cover"
              />
              <span className="hidden sm:block text-xs font-medium text-gray-900">
                {user?.name || "User"}
              </span>
              <span className="text-gray-400 text-xs text-center items-center justify-center flex">▼</span>
            </button>

            {/* Account Menu Dropdown */}
            {showAccountMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                {/* Same dropdown content as before */}
                <div className="p-4 border-b border-gray-200">
                  {/* <h4 className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Account
                  </h4> */}
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        navigate("/edit-profile");
                        setShowAccountMenu(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm font-normal text-gray-900 hover:bg-gray-50 rounded transition-colors cursor-pointer"
                    >
                      <SquarePen className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={() => navigate("/change-password")}
                      className="w-full flex items-center space-x-2 px-3 py-4 text-sm text-gray-900 hover:bg-gray-50 rounded transition-colors border-t border-t-gray-50 cursor-pointer"
                    >
                      <LockKeyhole className="w-4 h-4" />
                      <span>Change Password</span>
                    </button>
                    <div className="w-full flex items-center justify-between px-3 py-4 text-sm text-gray-900 border-t border-t-gray-50">
                      <div className="flex items-center space-x-2">
                        <MessageSquareDot className="w-4 h-4" />
                        <span>Push Notification</span>
                      </div>
                      
                      <Switch 
                        checked={user?.notification}
                        onCheckedChange={handleToggleNotification}
                      />
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-4 text-sm text-[#FE1B1B] hover:bg-gray-50 rounded transition-colors border-t border-t-gray-50 cursor-pointer font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modal */}
      <NotificationModal
        open={open}
        onClose={() => setOpen(false)}
        notifications={notifications}
        onDelete={handleDeleteNotification}
        onView={handleViewNotification}
        deletingId={deletingId}
        viewingId={viewingId}
      />
    </div>
  );
}
