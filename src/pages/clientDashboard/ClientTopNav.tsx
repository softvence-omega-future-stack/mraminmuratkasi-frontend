import { useNavigate, useLocation } from "react-router-dom";
import { useGetProfileQuery } from "@/redux/api/authApi";
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
  UserRound,
  AlertTriangle,
} from "lucide-react";
import NotificationModal from "@/common/NotificationModal";
import { useGetAllNotificationsQuery, useGetNotificationForBellQuery, useDeleteNotificationMutation, useViewSpecificNotificationMutation } from "@/redux/api/notificationApi";
import { Switch } from "@/components/ui/switch";
import { useToggleNotificationMutation, useSelfDestructMutation } from "@/redux/api/authApi";
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selfDestruct, { isLoading: isDeletingAccount }] = useSelfDestructMutation();

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
      await toggleNotification({ notificationsEnabled: checked }).unwrap();
    } catch (error) {
      console.error("Failed to toggle notification:", error);
    }
  };

  const isActiveRoute = (path: string) => {
    if (path === "/client/cases") {
      return (
        location.pathname === "/client/cases" ||
        location.pathname.startsWith("/client/case/")
      );
    }
    return location.pathname === path;
  };

  const handleDeleteAccount = async () => {
    try {
      await selfDestruct(undefined).unwrap();
      dispatch(logout());
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Account deletion failed:", err);
    } finally {
      setShowDeleteModal(false);
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
            className={`flex items-center space-x-2 px-4.5 py-2 rounded-full transition-all cursor-pointer ${isActiveRoute("/client")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
              }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Heim</span>
          </button>
          <button
            onClick={() => navigate("/client/cases")}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all cursor-pointer ${isActiveRoute("/client/cases")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
              }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Fälle</span>
          </button>
          <button
            onClick={() => navigate("/client/chat")}
            className={`relative flex items-center space-x-2 px-6 py-2 rounded-full transition-all cursor-pointer ${isActiveRoute("/client/chat")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
              }`}
          >
            <MessageCircleMore className="w-4 h-4" />
            <span className="font-medium">Chatten</span>
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
          {user?.user_id?.notificationsEnabled && (
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
          )}

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
                      <span>Profil bearbeiten</span>
                    </button>
                    <button
                      onClick={() => navigate("/change-password")}
                      className="w-full flex items-center space-x-2 px-3 py-4 text-sm text-gray-900 hover:bg-gray-50 rounded transition-colors border-t border-t-gray-50 cursor-pointer"
                    >
                      <LockKeyhole className="w-4 h-4" />
                      <span>Passwort zurücksetzen</span>
                    </button>
                    <div className="w-full flex items-center justify-between px-3 py-4 text-sm text-gray-900 border-t border-t-gray-50">
                      <div className="flex items-center space-x-2">
                        <MessageSquareDot className="w-4 h-4" />
                        <span>Push Mitteilungen erlauben</span>
                      </div>

                      <Switch
                        checked={user?.user_id?.notificationsEnabled}
                        onCheckedChange={handleToggleNotification}
                      />
                    </div>
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setShowAccountMenu(false);
                      }}
                      className="w-full flex items-center space-x-2 px-3 py-4 text-sm text-[#FE1B1B] hover:bg-gray-50 rounded transition-colors border-t border-t-gray-50 cursor-pointer font-medium"
                    >
                      <UserRound className="w-4 h-4" />
                      <span>Account löschen</span>
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

      {/* Delete Account Warning Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Delete Account?
              </h3>
              <p className="text-gray-500 mb-8">
                Are you sure you want to delete your account? This action is permanent and all your data will be lost.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  disabled={isDeletingAccount}
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-6 py-3 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
                  disabled={isDeletingAccount}
                >
                  {isDeletingAccount ? "Deleting..." : "Delete Permanently"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
