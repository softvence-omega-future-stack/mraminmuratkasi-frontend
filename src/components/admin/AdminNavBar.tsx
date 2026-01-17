import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NotificationModal from "@/common/NotificationModal";
import { useGetProfileQuery, useLogOutMutation } from "@/redux/api/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import {
  Bell,
  FileText,
  Home,
  LockKeyhole,
  Menu,
  MessageCircleMore,
  MessageSquareDot,
  SquarePen,
  User,
} from "lucide-react";

interface ClientTopNavProps {
  onMenuClick: () => void;
  showProfileMenu: boolean;
  setShowProfileMenu: (show: boolean) => void;
}

const AdminNavBar = ({
  onMenuClick,
}: //   showProfileMenu,
//   setShowProfileMenu,
ClientTopNavProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logOut] = useLogOutMutation();
  const { data: profileData } = useGetProfileQuery(undefined);
  const user = profileData?.data;

  const location = useLocation();
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };

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

  const notifications = [
    {
      id: 1,
      message: "You have received a new message regarding your traffic case.",
      time: "9:01am",
      unread: true,
      avatar: "/avatars/user1.png",
    },
    {
      id: 2,
      message: "You have received a new message regarding your traffic case.",
      time: "9:01am",
      unread: true,
      avatar: "/avatars/user2.png",
    },
    {
      id: 3,
      message: "You have received a new message regarding your traffic case.",
      time: "9:01am",
      unread: false,
      avatar: "/avatars/user3.png",
    },
  ];

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
            onClick={() => navigate("/admin")}
            className={`flex items-center space-x-2 px-4.5 py-2 rounded-full transition-all cursor-pointer ${
              isActiveRoute("/admin")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">Home</span>
          </button>
          <button
            onClick={() => navigate("/admin/cases")}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all cursor-pointer ${
              isActiveRoute("/admin/cases")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="font-medium">Cases</span>
          </button>
          <button
            onClick={() => navigate("/admin/client")}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all cursor-pointer ${
              isActiveRoute("/admin/client")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
            }`}
          >
            <MessageCircleMore className="w-4 h-4" />
            <span className="font-medium">Clients</span>
          </button>
          <button
            onClick={() => navigate("/admin/chat")}
            className={`flex items-center space-x-2 px-6 py-2 rounded-full transition-all cursor-pointer ${
              isActiveRoute("/admin/chat")
                ? "bg-[#1878B5] text-white shadow-sm"
                : "text-gray-500 hover:bg-[#1878B5] hover:text-white"
            }`}
          >
            <MessageCircleMore className="w-4 h-4" />
            <span className="font-medium">Chat</span>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setOpen(true)}
            className="relative p-3 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition cursor-pointer"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
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
                className="w-8 h-8 rounded-full bg-white"
              />
              <span className="hidden sm:block text-xs font-medium text-gray-900">
                {user?.name || "Admin"}
              </span>
              <span className="text-gray-400 text-xs">▼</span>
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
                      {/* <Toggle
                        pressed={pushNotificationsEnabled}
                        onPressedChange={setPushNotificationsEnabled}
                        className="data-[state=on]:bg-[#1878B5] data-[state=off]:bg-gray-300 border-0 rounded-full w-12 h-6 relative"
                      /> */}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3 py-4 text-sm text-[#FE1B1B] hover:bg-gray-50 rounded transition-colors border-t border-t-gray-50 cursor-pointer"
                    >
                      <User className="w-4 h-4" />
                      <span>Delete Account</span>
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
      />
    </div>
  );
};

export default AdminNavBar;
