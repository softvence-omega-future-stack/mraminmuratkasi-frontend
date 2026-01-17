import CommonBorderWrapper from "@/common/CommonBorderWrapper";
import CommonHeader from "@/common/CommonHeader";
import CreateCaseModal from "@/components/admin/case/CreateCaseModal";
import { MoreVertical, Settings } from "lucide-react";
import React, { useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsArrowRight, BsFileEarmarkCheck } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { TbFileText } from "react-icons/tb";

interface Case {
  caseNo: string;
  name: string;
  type: string;
  created: string;
  courtDate: string;
  status: "InProgress" | "Closed";
}

interface Activity {
  status: "Created" | "Updated" | "Closed";
  title: string;
  caseNo: string;
}

const HomePage: React.FC = () => {
  const stats = [
    { label: "Total Clients", count: 18, icon: <FiUsers /> },
    { label: "Total Cases", count: 59, icon: <TbFileText /> },
    { label: "Active Cases", count: 8, icon: <BsFileEarmarkCheck /> },
  ];

  const activities: Activity[] = [
    {
      status: "Created",
      title: "New Case created for Johnson Electronics",
      caseNo: "CASE-2024-001",
    },
    {
      status: "Updated",
      title: "New Case Updated to InProgress",
      caseNo: "CASE-2024-001",
    },
    {
      status: "Closed",
      title: "Case Successfully closed",
      caseNo: "CASE-2024-001",
    },
    {
      status: "Updated",
      title: "New Case Updated to InProgress",
      caseNo: "CASE-2024-001",
    },
    {
      status: "Created",
      title: "New Case created for Johnson Electronics",
      caseNo: "CASE-2024-001",
    },
    {
      status: "Closed",
      title: "Case Successfully closed",
      caseNo: "CASE-2024-001",
    },
  ];

  const cases: Case[] = [
    {
      caseNo: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "InProgress",
    },
    {
      caseNo: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "InProgress",
    },
    {
      caseNo: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "InProgress",
    },
    {
      caseNo: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "InProgress",
    },
    {
      caseNo: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "InProgress",
    },
    {
      caseNo: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "InProgress",
    },
  ];
  const clients = [
    { id: 1, name: "Client 1", avatar: "https://i.pravatar.cc/150?img=12" },
    { id: 2, name: "Client 2", avatar: "https://i.pravatar.cc/150?img=45" },
    { id: 3, name: "Client 3", avatar: "https://i.pravatar.cc/150?img=33" },
  ];
  const getStatusColor = (status: string): string => {
    switch (status) {
      case "Created":
        return "bg-green-100 text-green-700";
      case "Updated":
        return "bg-blue-100 text-blue-700";
      case "Closed":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const buttons = [
    {
      title: "Create New Case",
      icon: <AiOutlineFileAdd size={20} className="text-white" />,
      bgColor: "bg-blue-600",
      onClick: (setIsCaseModalOpen: (val: boolean) => void) =>
        setIsCaseModalOpen(true),
      bgButton: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "Client Management",
      icon: <FiUsers size={20} className="text-white" />,
      bgColor: "bg-blue-600",
      onClick: undefined, // no click handler
      bgButton: "bg-gray-50 hover:bg-gray-100",
    },
    {
      title: "Settings",
      icon: <Settings size={20} className="text-white" />,
      bgColor: "bg-blue-600",
      onClick: undefined, // no click handler
      bgButton: "bg-gray-50 hover:bg-gray-100",
    },
  ];
  return (
    <div className=" space-y-5 pb-5 ">
      <div className="flex  gap-5 w-full">
        <CommonBorderWrapper>
          <p className="text-main text-base mb-4  ">
            Welcome to your admin control center. Here's an overview of your
            system.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
          <CommonHeader>Quick Actions</CommonHeader>

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
        <CommonHeader> Recent Activities</CommonHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5 pt-4">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-[#F6F6F6]"
            >
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium mb-2 ${getStatusColor(
                  activity.status,
                )}`}
              >
                {activity.status}
              </span>
              <CommonHeader size="sm" className="text-[#0F1010]!">
                {activity.title}
              </CommonHeader>
              <CommonHeader size="sm" className="text-[#747C81]!">
                Case : {activity.caseNo}
              </CommonHeader>
            </div>
          ))}
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper>
        <div className="flex items-center justify-between mb-4">
          <CommonHeader>Recent Cases</CommonHeader>

          <button className="text-blue-600 text-sm hover:underline">
            See all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <CommonHeader size="sm" className="text-[#747C81]!">
                  Case No:
                </CommonHeader>

                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Type
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Created
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Court Date
                </th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Status
                </th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {cases.map((caseItem, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {caseItem.caseNo}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {caseItem.name}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {caseItem.type}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {caseItem.created}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-900">
                    {caseItem.courtDate}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CommonBorderWrapper>
      {isCaseModalOpen && (
        <CreateCaseModal onClose={() => setIsCaseModalOpen(false)} />
      )}
    </div>
  );
};

export default HomePage;
