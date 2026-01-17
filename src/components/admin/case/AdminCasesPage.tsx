import CommonHeader from "@/common/CommonHeader";
import Pagination from "@/common/Pagination";
import { MoreVertical } from "lucide-react";
import { Link } from "react-router-dom";

interface CaseItem {
  caseNo: string;
  name: string;
  type: string;
  created: string;
  courtDate: string;
  status: "InProgress" | "Complete";
}

export const cases: CaseItem[] = Array.from({ length: 9 }).map((_, i) => ({
  caseNo: "CASE-2024-001",
  name: "Speeding Violation 85mph in 55mph",
  type: "Reckless Driving",
  created: "Jan 20, 2024",
  courtDate: "Not Scheduled",
  status: i < 6 ? "InProgress" : "Complete",
}));

export const getStatusStyles = (status: CaseItem["status"]) => {
  switch (status) {
    case "Complete":
      return "bg-green-100 text-green-700";
    default:
      return "bg-blue-100 text-blue-700";
  }
};

const AdminCasesPage = () => {
  return (
    <>
      <div className="p-4 sm:p-6 bg-white rounded-[24px] font-inter">
        {/* Header */}
        <div className="mb-6">
          <CommonHeader>All Cases</CommonHeader>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full border-collapse">
              <thead className="bg-[#FDFDFD]">
                <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200 ">
                  <th className="px-6 py-4">Case No</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Court Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-4 py-4 w-10"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200  text-gray-900 font-inter">
                {cases.map((item, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      <Link to={`/admin/cases/${item.caseNo}`}>
                        {item.caseNo}
                      </Link>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700 max-w-[320px] truncate">
                      {item.name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.type}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.created}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-700">
                      {item.courtDate}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusStyles(
                          item.status,
                        )}`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="px-4 py-4 text-right">
                      <button className="text-gray-500 hover:text-gray-700">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="pt-5">
        <Pagination currentPage={1} totalPages={3} onPageChange={() => {}} />
      </div>
    </>
  );
};
export default AdminCasesPage;
