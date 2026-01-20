// import ClientDashboardLayout from "@/Layout/ClientDashboardLayout";
// import { ChevronRight } from "lucide-react";

// interface Case {
//   id: string;
//   title: string;
//   description: string;
//   status: string;
//   created: string;
//   updated: string;
//   type: string;
// }

// const activeCases: Case[] = [
//   {
//     id: "CASE-2024-001",
//     title: "Traffic Violation",
//     description: "Speeding Violation & Images in Straigh",
//     status: "Reviewing Evidence & Images",
//     created: "Jan 15, 2024",
//     updated: "Jan 20, 2024",
//     type: "Traffic",
//   },
//   {
//     id: "CASE-2024-002",
//     title: "Document Case",
//     description: "Missing Vehicle Violation in Straigh",
//     status: "Reckless Driving",
//     created: "Jan 10, 2024",
//     updated: "Jan 19, 2024",
//     type: "Vehicle",
//   },
//   {
//     id: "CASE-2024-003",
//     title: "Traffic Violation",
//     description: "Speeding Violation & Images in Straigh",
//     status: "Not Scheduled",
//     created: "Jan 05, 2024",
//     updated: "Jan 18, 2024",
//     type: "Traffic",
//   },
//   {
//     id: "CASE-2024-004",
//     title: "Traffic Violation",
//     description: "Speeding Violation & Images in Straigh",
//     status: "Not Scheduled",
//     created: "Jan 01, 2024",
//     updated: "Jan 17, 2024",
//     type: "Traffic",
//   },
// ];

// export default function ClientCasesPage() {
//   const getStatusColor = (status: string) => {
//     if (status.includes("Scheduled")) return "bg-red-100 text-red-700";
//     if (status.includes("Reviewing")) return "bg-blue-100 text-blue-700";
//     if (status.includes("Reckless")) return "bg-yellow-100 text-yellow-700";
//     return "bg-gray-100 text-gray-700";
//   };

//   return (
//     <ClientDashboardLayout>
//       <div className="p-6">
//         <div className="mb-8">
//           <h2 className="text-lg font-semibold text-black mb-6 font-inter">
//             All Cases{" "}
//           </h2>
//           <p className="text-gray-600 mt-2">
//             Manage and track your legal cases
//           </p>
//         </div>

//         {/* Cases Table */}
//         <div className="bg-white rounded-lg shadow overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gray-50 border-b border-gray-200">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                     Case ID
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                     Title
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                     Type
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                     Status
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                     Created
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                     Updated
//                   </th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
//                     Action
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {activeCases.map((caseItem) => (
//                   <tr
//                     key={caseItem.id}
//                     className="hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="px-6 py-4 text-sm font-medium text-blue-600">
//                       {caseItem.id}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-900">
//                       {caseItem.title}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {caseItem.type}
//                     </td>
//                     <td className="px-6 py-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
//                           caseItem.status
//                         )}`}
//                       >
//                         {caseItem.status}
//                       </span>
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {caseItem.created}
//                     </td>
//                     <td className="px-6 py-4 text-sm text-gray-600">
//                       {caseItem.updated}
//                     </td>
//                     <td className="px-6 py-4">
//                       <button className="text-blue-600 hover:text-blue-700 transition-colors">
//                         <ChevronRight className="w-5 h-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </ClientDashboardLayout>
//   );
// }

import ClientDashboardLayout from "@/Layout/ClientDashboardLayout";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery } from "@/redux/api/authApi";



export const getStatusStyles = (status: string) => {
  const normalizedStatus = status.toLowerCase();
  if (normalizedStatus === "complete" || normalizedStatus === "completed") {
    return "bg-green-100 text-green-700";
  }
  if (normalizedStatus === "pending" || normalizedStatus === "inprogress" || normalizedStatus === "in progress") {
    return "bg-blue-100 text-blue-700";
  }
  return "bg-gray-100 text-gray-700";
};

export default function ClientCasesPage() {
  const navigate = useNavigate();
  const { data: profileData, isLoading } = useGetProfileQuery(undefined);
  const userCases = profileData?.data?.case_ids || [];

  const handleCaseClick = (caseId: string) => {
    navigate(`/client/case/${caseId}`, { state: { from: "/client/cases" } });
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <ClientDashboardLayout>
      <div className="p-4 sm:p-6 bg-white rounded-[24px] font-inter">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900">All Cases</h2>
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
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                      Loading cases...
                    </td>
                  </tr>
                ) : userCases.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                      No cases found.
                    </td>
                  </tr>
                ) : (
                  userCases.map((item: any) => (
                    <tr
                      key={item._id}
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ClientDashboardLayout>
  );
}
