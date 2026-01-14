import { Edit, PenLine, Home, FileText, MessageCircleMore, Sun } from "lucide-react";
import Logo from "/public/images/authLogo.png";
// import Logo from "../../../public/images/authLogo.png";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ClientSidebar({ isOpen, onClose }: SidebarProps) {
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
            <img
              src={Logo}
              alt="Logo"
              className="h-8"
            />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex justify-around w-full border-t border-gray-200 bg-white">
            <button
              onClick={() => {
                // Navigate to home
                onClose();
                window.location.href = "/client";
              }}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-[#1878B5] transition-colors"
            >
              <Home className="w-5 h-5 mb-1" />
              <span className="text-xs">Home</span>
            </button>
            <button
              onClick={() => {
                // Navigate to cases
                onClose();
                window.location.href = "/client/cases";
              }}
              className="flex flex-col items-center p-2 text-gray-600 hover:text-[#1878B5] transition-colors"
            >
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
                // src="/public/images/sidebarProfile.png"
                src="https://media.istockphoto.com/id/2235903620/photo/happy-50-years-old-business-man-in-suit-standing-in-office-headshot-portrait.webp?a=1&b=1&s=612x612&w=0&k=20&c=2say2ge83Ytw-k3YPSCweS8BcXoira3VoIiZjwGzghQ="
                alt="Profile"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>

          <h2 className="text-[22px] font-semibold text-gray-900">
            Hi, Wade Warren
          </h2>
          <p className="text-gray-700 flex items-center justify-center gap-1 mt-1 font-normal">
            <span><Sun className="w-5 h-5 text-[#F4B402]" /></span> Good Morning
          </p>

          <button className="mt-4 flex items-center gap-2 text-[#1878B5] bg-[#F6F6F6] px-7 py-3 rounded-[30px] text-sm font-semibold hover:bg-blue-100 transition-colors justify-center cursor-pointer">
            <PenLine className="w-4 h-4 mb-1" />
            Edit Profile
          </button>

          {/* <div className="mt-8 w-full bg-[#1878B5] rounded-2xl px-16 py-3 text-white text-left overflow-hidden relative">
            <div className="flex justify-between items-center relative z-10">
              <div className="text-center">
                <h3 className="text-4xl font-semibold">24</h3>
                <p className="text-[#B7D5E8] text-sm font-normal mt-1 capitalize">
                  Total Cases
                </p>
              </div>
              <div className="w-[2px] h-10 bg-[#4693C4]"></div>
              <div className="text-center">
                <h3 className="text-4xl font-semibold">3</h3>
                <p className="text-[#B7D5E8] text-sm font-normal mt-1 capitalize">
                  In Progress
                </p>
              </div>
            </div>
          </div> */}

          <div
            className="
    mt-6 w-full bg-[#1878B5] rounded-2xl
    px-6 py-4
    text-white overflow-hidden relative
    h-auto
    max-h-[140px]
    min-h-[100px]
  "
          >
            <div
              className="
      flex items-center justify-between
      gap-4
      h-full
      relative z-10

      max-[650px]:flex-col
      max-[650px]:justify-center
    "
            >
              {/* Total Cases */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                  24
                </h3>
                <p className="text-[#B7D5E8] text-xs md:text-sm mt-1 capitalize">
                  Total Cases
                </p>
              </div>

              {/* Divider */}
              <div
                className="
        bg-[#4693C4]
        w-[2px] h-8
        max-[650px]:w-14
        max-[650px]:h-[2px]
      "
              />

              {/* In Progress */}
              <div className="text-center">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold">
                  3
                </h3>
                <p className="text-[#B7D5E8] text-xs md:text-sm mt-1 capitalize">
                  In Progress
                </p>
              </div>
            </div>
          </div>

          <div className="mt-auto w-full pt-6">
            <button className="w-full py-3 bg-[#E8F2F8] text-[#1878B5] text-lg font-semibold rounded-[40px] hover:bg-gray-100 transition-colors cursor-pointer">
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
}
