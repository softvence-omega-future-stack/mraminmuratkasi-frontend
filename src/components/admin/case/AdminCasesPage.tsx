import AlertDialogBox from "@/common/asdflkjsad";
import CommonHeader from "@/common/CommonHeader";
import LoadingStatus from "@/common/LoadingStatus";
import Pagination from "@/common/Pagination";
import { useDeleteCaseMutation } from "@/redux/api/caseApi";
import { useGetAlCasesQuery } from "@/redux/features/admin/clientAPI";
import { formatDate } from "@/utils/data";
import { MoreVertical } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

// Status badge colors
export const statusStyles: Record<string, string> = {
  "In Bearbeitung": "bg-blue-100 text-blue-800",
  "Fall bei der Versicherung eingereicht": "bg-purple-100 text-purple-800",
  "Fall abgeschlossen": "bg-green-100 text-green-800",
  "Entscheidung der Versicherung noch ausstehend":
    "bg-yellow-100 text-yellow-800",
  Vorschadenproblematik: "bg-red-100 text-red-800",
  "Ermittlungsakte wurde angefordert": "bg-orange-100 text-orange-800",
  "Versicherungsnehmer hat Schaden noch nicht gemeldet":
    "bg-gray-100 text-gray-800",
};
const AdminCasesPage = () => {
  const { data, isLoading } = useGetAlCasesQuery();
  const cases = data?.data.cases;
  const [deleteCase, { isLoading: isDeleting }] = useDeleteCaseMutation();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCase(id).unwrap();
      toast.success(res.message || "Fall erfolgreich gelöscht");
    } catch (err: any) {
      toast.error(err?.data?.message || "Fehler beim Löschen des Falls");
    }
  };

  // Pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = cases?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    if (!cases) return [];
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return cases.slice(start, end);
  }, [cases, currentPage]);

  return (
    <>
      <div className="p-4 sm:p-6 bg-white rounded-[24px] font-inter">
        {/* Header */}
        <div className="mb-6">
          <CommonHeader>Alle Fälle</CommonHeader>
        </div>

        <LoadingStatus
          isLoading={isLoading}
          items={paginatedData}
          itemName="Fall"
        />

        {!isLoading && cases && cases.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-[900px] w-full border-collapse">
                <thead className="bg-[#FDFDFD]">
                  <tr className="text-left text-sm font-medium text-gray-500 border-b border-gray-200 ">
                    <th className="px-6 py-4">Fall-Nr.</th>
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Typ</th>
                    <th className="px-6 py-4">Erstellt am</th>
                    <th className="px-6 py-4">Gerichtstermin</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-4 py-4 w-10"></th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 text-gray-900 font-inter">
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
                        <Link to={`/admin/cases/${item._id}`}>
                          {item.clientName}
                        </Link>
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
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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
          </div>
        )}
      </div>

      {paginatedData.length > 0 && (
        <div className="py-5">
          <Pagination
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
            currentPage={currentPage}
          />
        </div>
      )}
    </>
  );
};

export default AdminCasesPage;
