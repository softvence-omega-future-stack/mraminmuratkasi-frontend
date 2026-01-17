import CommonBorderWrapper from "@/common/CommonBorderWrapper";
import CreateCaseModal from "@/components/admin/case/CreateCaseModal";
import {
  ChevronRight,
  MoreVertical,
  Plus,
  Settings,
  UserCog,
} from "lucide-react";
import React, { useState } from "react";

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
    { label: "Total Clients", count: 18, icon: "👥" },
    { label: "Total Cases", count: 59, icon: "📋" },
    { label: "Active Cases", count: 8, icon: "⚖️" },
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
  return (
    <div className=" space-y-5 pb-5">
      <div className="flex  gap-5 w-full">
        <CommonBorderWrapper>
          <p className="text-blue-600 text-sm mb-4">
            Welcome to your admin control center. Here's an overview of your
            system.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-[#0D4264] rounded-2xl p-6 text-white"
              >
                <div className="text-5xl font-bold mb-2">{stat.count}</div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{stat.icon}</div>
                </div>
                <div className="flex items-center space-x-2 mt-4">
                  <span className="text-xs opacity-90">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>
        </CommonBorderWrapper>

        <CommonBorderWrapper>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full flex items-center justify-between p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Plus size={20} className="text-white" />
                </div>
                <span
                  onClick={() => setIsCaseModalOpen(true)}
                  className="font-medium text-gray-900"
                >
                  Create New Case
                </span>
              </div>
              <ChevronRight
                size={20}
                className="text-gray-400 group-hover:text-blue-600"
              />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <UserCog size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">
                  Client Management
                </span>
              </div>
              <ChevronRight
                size={20}
                className="text-gray-400 group-hover:text-blue-600"
              />
            </button>
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors group">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Settings size={20} className="text-white" />
                </div>
                <span className="font-medium text-gray-900">Settings</span>
              </div>
              <ChevronRight
                size={20}
                className="text-gray-400 group-hover:text-blue-600"
              />
            </button>
          </div>
        </CommonBorderWrapper>
      </div>

      <CommonBorderWrapper>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activities
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <span
                className={`inline-block px-2 py-1 rounded text-xs font-medium mb-2 ${getStatusColor(
                  activity.status
                )}`}
              >
                {activity.status}
              </span>
              <p className="text-sm text-gray-900 font-medium mb-2">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500">Case : {activity.caseNo}</p>
            </div>
          ))}
        </div>
      </CommonBorderWrapper>

      <CommonBorderWrapper>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">All Cases</h3>
          <button className="text-blue-600 text-sm hover:underline">
            See all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                  Case No:
                </th>
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
