import { MoreVertical } from "lucide-react";
import { getStatusStyles } from "../clientDashboard/ClientCasesPage";
import activeCaseIcon from "/public/images/activeCaseIcon.png";
import icon1 from "/public/images/icon1.png";
import icon2 from "/public/images/icon2.png";
import icon3 from "/public/images/icon3.png";
import { Link, useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "@/redux/api/authApi";

export default function ClientDashboard() {
  const navigate = useNavigate();
  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userCases = profileData?.data?.case_ids || [];

  const handleCaseClick = (caseId: string) => {
    navigate(`/client/case/${caseId}`, { state: { from: "/client" } });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Logic for Active Cases: "Pending", "InProgress", "Reviewing" etc. 
  // User asked for "in_progress", sample has "Pending". 
  // I'll treat non-completed as active.
  const activeCasesData = userCases.filter((c: any) => {
     const status = c.case_status?.toLowerCase();
     return status !== "complete" && status !== "completed" && status !== "closed";
  }).slice(0, 3);

  const displayCases = userCases.slice(0, 5);

  const recentUpdates = [
    {
      id: 1,
      title: "Accident Report Filed",
      date: "2024-01-15",
      icon: icon1, // <FileText className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      id: 2,
      title: "Court Date Scheduled",
      date: "2024-03-21",
      icon: icon2, //<Calendar className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      id: 3,
      title: "Additional Documents Needed",
      date: "2024-01-12",
      icon: icon3, //<AlertCircle className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="space-y-6 font-inter">
      {/* Top Row: Active Cases & Recent Updates */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Active Cases */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-black mb-4">
            Active Cases
          </h3>

          <div className="flex flex-wrap gap-4">
            {isLoading ? (
               <p className="text-gray-500 text-sm">Loading...</p>
            ) : activeCasesData.length === 0 ? (
               <p className="text-gray-500 text-sm">No active cases found.</p>
            ) : (
            activeCasesData.map((item: any, index: number) => (
              <div
                key={item._id || index}
                className="bg-[#EAF4FB] rounded-xl p-4 max-w-[190px] cursor-pointer hover:bg-[#D4E8F8] transition-colors"
                onClick={() => handleCaseClick(item._id)}
              >
                <img src={activeCaseIcon} alt="" className="w-12 h-12 mb-8" />

                <p className="text-sm text-[#3C3B3B] font-normal mb-1">
                  CASE: {item.caseNumber}
                </p>

                <h4 className="text-lg font-semibold text-[#3C3B3B] leading-snug truncate w-full" title={item.caseTitle}>
                  {item.caseTitle}
                </h4>

                <p className="text-[11px] text-gray-600 font-normal mt-1">
                  Last Updated : {formatDate(item.updatedAt)}
                </p>

                <span className="inline-block px-3 py-1 text-[11px] text-white bg-[#1878B5] font-normal rounded-full mt-8">
                  {item.case_status}
                </span>
              </div>
            )))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-black">Recent Updates</h3>
          </div>

          <div className="space-y-3">
            {recentUpdates.map((update) => (
              <div
                key={update.id}
                className="flex items-start gap-3 p-3 rounded-xl bg-[#F6F6F6] border border-gray-100 hover:bg-gray-50 transition"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                  {/* {update.icon} */}
                  <img src={update.icon} alt="" />
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {update.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{update.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 bg-white rounded-[24px] font-inter">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900">All Cases</h3>
          <Link to="/client/cases">
            <button className="text-[#1878B5] cursor-pointer text-sm font-semibold hover:underline mr-2">
              See all
            </button>
          </Link>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse">
              <thead className="bg-[#FDFDFD]">
                <tr className="text-left text-sm font-medium text-gray-500 ">
                  <th className="px-6 py-4">Case No</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Court Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-4 py-4 w-10"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 bg-[#F0FAFF] text-gray-900 font-inter">
                {isLoading ? (
                   <tr><td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">Loading cases...</td></tr>
                ) : displayCases.length === 0 ? (
                   <tr><td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">No cases found.</td></tr>
                ) : (displayCases.map((item: any, index: number) => (
                  <tr
                    key={item._id || index}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => handleCaseClick(item._id)}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {item.caseNumber || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 max-w-[320px] truncate">
                      {item.caseTitle}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.caseType}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(item.createdAt)}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {formatDate(item.coatDate)}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                          item.case_status
                        )}`}
                      >
                        {item.case_status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                )))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
