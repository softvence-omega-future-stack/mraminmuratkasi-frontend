import AlertDialogBox from "@/common/asdflkjsad";
import CommonBorderWrapper from "@/common/CommonBorderWrapper";
import CommonHeader from "@/common/CommonHeader";
import DashboardCardSkeleton from "@/common/DashboardCardSkeleton";
import LoadingStatus from "@/common/LoadingStatus";
import { statusStyles } from "@/components/admin/case/AdminCasesPage";
import CreateCaseModal from "@/components/admin/case/modal/CreateCaseModal";
import { useDeleteCaseMutation } from "@/redux/api/caseApi";
import {
  useGetAlCasesQuery,
  useGetAllUserQuery,
} from "@/redux/features/admin/clientAPI";
import { formatDate } from "@/utils/data";
import { MoreVertical, Settings } from "lucide-react";
import React, { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsArrowRight, BsFileEarmarkCheck } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { TbFileText } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const HomePage: React.FC = () => {
  const { data, isLoading } = useGetAlCasesQuery();
  const { data: userData } = useGetAllUserQuery();
  const totalCases = data?.data?.cases.length || 0;
  const totalClients = userData?.data?.length || 0;
  const activeClass =
    userData?.data?.filter((user) => !user.isBlocked).length ?? 0;

  const stats = [
    {
      label: "Gesamtanzahl Kunden",
      count: totalClients,
      icon: <FiUsers />,
    },
    { label: "Gesamtanzahl Fälle", count: totalCases, icon: <TbFileText /> },
    { label: "Aktive Fälle", count: activeClass, icon: <BsFileEarmarkCheck /> },
  ];

  console.log("totalCases", data?.data);
  const clients = [
    {
      id: 1,
      name: userData?.data[0].name,
      avatar:
        userData?.data[0].profile.img || "https://i.pravatar.cc/150?img=12",
    },

    {
      id: 2,
      name: userData?.data[1].name,
      avatar:
        userData?.data[1].profile.img || "https://i.pravatar.cc/150?img=12",
    },
    {
      id: 3,
      name: userData?.data[2].name,
      avatar:
        userData?.data[2].profile.img || "https://i.pravatar.cc/150?img=12",
    },
  ];
  const navigate = useNavigate();
  const handleClient = () => {
    navigate("/admin/client");
  };
  const handleChangePassword = () => {
    navigate("/admin/change-password");
  };

  const buttons = [
    {
      title: "Neuen Fall erstellen",
      icon: <AiOutlineFileAdd size={20} className="text-white" />,
      bgColor: "bg-blue-600",
      onClick: (setIsCaseModalOpen: (val: boolean) => void) =>
        setIsCaseModalOpen(true),
      bgButton: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "Kundenverwaltung",
      icon: <FiUsers size={20} className="text-white" />,
      bgColor: "bg-blue-600",
      onClick: handleClient,
      bgButton: "bg-gray-50 hover:bg-gray-100",
    },
    {
      title: "Einstellungen",
      icon: <Settings size={20} className="text-white" />,
      bgColor: "bg-blue-600",
      onClick: handleChangePassword,
      bgButton: "bg-gray-50 hover:bg-gray-100",
    },
  ];
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);

  const cases = data?.data?.cases ?? [];

  const [showAll, setShowAll] = useState(false);

  const paginatedData = showAll ? cases : cases.slice(0, 5);

  const [deleteCase, { isLoading: isDeleting }] = useDeleteCaseMutation();

  const handleDelete = async (id: string) => {
    const res = await deleteCase(id);
    toast.success(res.data.message || "Fall erfolgreich gelöscht");
  };
  return (
    <div className=" space-y-5 pb-5 ">
      <div className="flex flex-col xl:flex-row gap-5 w-full">
        <CommonBorderWrapper>
          <p className="text-main text-base mb-4  ">
            Willkommen im Admin-Bereich. Hier ist eine Übersicht Ihres Systems.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#0D4264] rounded-2xl p-6 text-white flex flex-col items-center justify-between gap-2"
              >
                <div className="text-6xl font-bold mb-2">{stat.count}</div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{stat.icon}</div>
                </div>
                <div className="flex -space-x-3">
                  {clients.map((client, index) => (
                    <div
                      key={client.id}
                      className="relative"
                      style={{ zIndex: clients.length - index }}
                    >
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-8 h-8 rounded-full border-4 border-[#124e66] object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center  py-2 px-4 mt-4 bg-[#1878B5] rounded-full">
                  <span className="text-sm text-white">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper>
          <CommonHeader>Schnellaktionen</CommonHeader>

          <div className="space-y-4 pt-4">
            {buttons.map((btn, index) => (
              <button
                key={index}
                className={`w-full flex items-center justify-between p-4 bg-[#E8F2F8] rounded-lg transition-colors group cursor-pointer`}
                onClick={() => btn.onClick?.(setIsCaseModalOpen)}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 bg-[#1878B5] rounded-lg flex items-center justify-center`}
                  >
                    {btn.icon}
                  </div>
                  <span
                    onClick={() => btn.onClick?.(setIsCaseModalOpen)}
                    className="font-medium text-gray-900"
                  >
                    {btn.title}
                  </span>
                </div>
                <BsArrowRight
                  size={20}
                  className="text-gray-400 group-hover:text-blue-600"
                />
              </button>
            ))}
          </div>
        </CommonBorderWrapper>
      </div>

      <CommonBorderWrapper>
        <CommonHeader>Letzte Aktivitäten</CommonHeader>
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 pt-4">
            {new Array(6).fill(0).map((_, index) => (
              <DashboardCardSkeleton key={index} />
            ))}
          </div>
        )}
        {!isLoading && data && paginatedData.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 pt-4">
            {data?.data?.cases.slice(0, 6).map((activity, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 bg-[#F6F6F6]"
              >
                <div
                  className={` px-2 py-1 rounded-full text-xs font-medium mb-2 line-clamp-1   ${
                    statusStyles[activity.case_status] ||
                    "bg-gray-100 text-gray-800"
                  }`}
                >
                  {activity.case_status}
                </div>
                <CommonHeader
                  size="sm"
                  className="text-[#0F1010]! line-clamp-1"
                >
                  {activity.caseTitle}
                </CommonHeader>
                <CommonHeader size="sm" className="text-[#747C81]!">
                  Fall : {activity.caseNumber}
                </CommonHeader>
              </div>
            ))}
          </div>
        )}
      </CommonBorderWrapper>

      <LoadingStatus
        isLoading={isLoading}
        items={paginatedData}
        itemName="Fälle"
      />
      {!isLoading && data && paginatedData.length > 0 && (
        <CommonBorderWrapper>
          <div className="flex items-center justify-between mb-4">
            <CommonHeader>Letzte Fälle</CommonHeader>

            {cases.length > 10 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-primary underline  cursor-pointer"
              >
                {showAll ? "Weniger anzeigen" : "Alle anzeigen"}
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Fall-Nr.:
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Fall
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Erstellt am
                  </th>
                  {/* <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Gerichtstermin
                  </th> */}
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    Status
                  </th>
                  <th className="py-3 px-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200  text-gray-900 font-inter">
                {paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <Link to={`/admin/cases/${item._id}`}>
                        {item.caseNumber}
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 max-w-[320px] truncate">
                      {item.clientName}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.caseTitle}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(item.createdAt)}
                    </td>

                    {/* <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(item.coatDate)}
                    </td> */}

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium  ${
                          statusStyles[item.case_status] ||
                          "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.case_status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <AlertDialogBox
                        action={() => handleDelete(item._id)}
                        isLoading={isDeleting}
                        trigger={
                          <button className="text-gray-500 hover:text-gray-700 cursor-pointer">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CommonBorderWrapper>
      )}
      {isCaseModalOpen && (
        <CreateCaseModal
          isOpen={isCaseModalOpen}
          onClose={() => setIsCaseModalOpen(false)}
        />
      )}
    </div>
  );
};

export default HomePage;
