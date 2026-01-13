/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"
import { ShieldCheck, Users } from "lucide-react";
import Logo from "../../public/images/authLogo.png";

export default function RoleSelection() {
  const navigate = useNavigate();
  // const { setUserRole } = useAuth()

  const handleAdminClick = () => {
    // setUserRole("admin")
    navigate("/admin/signin");
  };

  const handleClientClick = () => {
    // setUserRole("client")
    navigate("/admin/signin");
  };

  return (
    <div className="min-h-screen bg-[#1878B5] flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-8 rounded-lg p-12 max-w-xl w-full">
        <div className="flex justify-center">
          <img src={Logo} alt="" />
        </div>
        <h1 className="text-2xl font-bold text-center text-white mb-2">
          Welcome to Unfall Update
        </h1>

        <div className="flex flex-col md:flex-row gap-4">
          <AdminCardButton handleAdminClick={handleAdminClick} />
          <ClientCardButton handleClientClick={handleClientClick} />
        </div>
      </div>
    </div>
  );
}

const AdminCardButton = ({ handleAdminClick }: any) => {
  return (
    <button
      onClick={handleAdminClick}
      className="
        flex flex-col items-center justify-center
        w-full max-w-xs
        rounded-2xl
        border border-blue-200
        bg-white
        px-6 py-8
        text-center
        shadow-sm
        transition
        hover:shadow-md
        hover:border-blue-400
        focus:outline-none
        cursor-pointer
      "
    >
      {/* Icon Circle */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
        <ShieldCheck className="h-7 w-7 text-blue-600" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900">Admin</h3>

      {/* Subtitle */}
      <p className="mt-1 text-sm text-gray-500">
        Manage users and system settings
      </p>
    </button>
  );
};

const ClientCardButton = ({ handleClientClick }: any) => {
  return (
    <button
      onClick={handleClientClick}
      className="
        flex flex-col items-center justify-center
        w-full max-w-xs
        rounded-2xl
        border border-blue-200
        bg-white
        px-6 py-8
        text-center
        shadow-sm
        transition
        hover:shadow-md
        hover:border-blue-400
        focus:outline-none 
        cursor-pointer
      "
    >
      {/* Icon Circle */}
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
        <Users className="h-7 w-7 text-blue-600" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900">Client</h3>

      {/* Subtitle */}
      <p className="mt-1 text-sm text-gray-500">
        Access services and manage account{" "}
      </p>
    </button>
  );
};
