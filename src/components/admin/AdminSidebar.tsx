import { useGetProfileQuery, useLogOutMutation } from "@/redux/api/authApi";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import {
  Edit,
  FileText,
  Home,
  MessageCircleMore,
  Moon,
  PenLine,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "/public/images/authLogo.png";
// import Logo from "../../../public/images/authLogo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [logOut] = useLogOutMutation();
  const { data: profileData } = useGetProfileQuery(undefined);
  const user = profileData?.data;

  const [greeting, setGreeting] = useState({
    text: "",
    icon: <Sun className="w-5 h-5 text-[#F4B402]" />,
  });

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting({
        text: "Good Morning",
        icon: <Sun className="w-5 h-5 text-[#F4B402]" />,
      });
    } else if (hour < 18) {
      setGreeting({
        text: "Good Afternoon",
        icon: <Sun className="w-5 h-5 text-[#F4B402]" />,
      });
    } else {
      setGreeting({
        text: "Good Evening",
        icon: <Moon className="w-5 h-5 text-[#1878B5]" />,
      });
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
          className="fixed inset-0 bg-black/20 bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar / Profile Card Column */}
      <div
        className={`fixed md:static inset-y-0 left-0 w-[400px] bg-gray-50 md:bg-transparent z-40 transform transition-transform duration-200 ease-in-out h-full ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center flex flex-col items-center border border-gray-100 md:border-none h-full overflow-y-auto">
          {/* Logo only on mobile for sidebar if needed, but usually redundant if TopNav has it. 
              However, the image shows it in top nav. Let's keep it clean. */}
          <div className="md:hidden self-start mb-6">
            <img src={Logo} alt="Logo" className="h-8" />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-around w-full border-t border-gray-200 bg-white">
            <button
              onClick={() => {
                // Navigate to home
                onClose();
              }}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-[#1878B5] transition-colors"
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">Home</span>
            </button>
            <button className="flex flex-col items-center p-2 text-gray-600 hover:text-[#1878B5] transition-colors">
              <FileText className="w-5 h-5 mb-1" />
              <span className="text-xs">Cases</span>
            </button>
            <button
              onClick={() => {
                // Navigate to chat
                onClose();
                window.location.href = "/client/chat";
              }}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-[#1878B5] transition-colors"
            >
              <MessageCircleMore className="w-5 h-5 mb-1" />
              <span className="text-xs">Chat</span>
            </button>
          </div>

          <div className="relative mb-4 mt-4">
            <div className="w-[150px] md:w-[340px] md:h-[340px] rounded-full p-1 border-2 border-[#E8F2F8] overflow-hidden">
              <img
                src={
                  user?.img ||
                  "https://media.istockphoto.com/id/2235903620/photo/happy-50-years-old-business-man-in-suit-standing-in-office-headshot-portrait.webp?a=1&b=1&s=612x612&w=0&k=20&c=2say2ge83Ytw-k3YPSCweS8BcXoira3VoIiZjwGzghQ="
                }
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="inline-block px-3 py-1 bg-[#0A324C] text-white text-xs rounded-full mt-4 mb-2">
              Admin
            </span>
          </div>

          <h2 className="text-[22px] font-semibold text-gray-900">
            Hi, {user?.name || "Admin"}
          </h2>
          <p className="text-gray-700 flex items-center justify-center gap-1 mt-1 font-normal">
            <span>{greeting.icon}</span> {greeting.text}
          </p>

          <Link
            to="/admin/edit-profile"
            className="mt-4 flex items-center gap-2 text-[#1878B5] bg-[#F6F6F6] px-7 py-3 rounded-[30px] text-sm font-semibold hover:bg-blue-100 transition-colors justify-center cursor-pointer"
          >
            <PenLine className="w-4 h-4 mb-1" />
            Edit Profile
          </Link>

          <div className="mt-auto w-full pt-6">
            <button
              onClick={handleLogout}
              className="w-full py-3 bg-[#E8F2F8] text-[#1878B5] text-lg font-semibold rounded-[40px] hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>

          {/* Close button for mobile */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:hidden text-gray-400"
          >
            <Edit className="w-6 h-6 rotate-45" />{" "}
            {/* Using rotate as a hack for X if not imported, or just use text */}
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
