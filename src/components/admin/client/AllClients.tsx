import CommonBorderWrapper from "@/common/CommonBorderWrapper";
import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import LoadingStatus from "@/common/LoadingStatus";
import Pagination from "@/common/Pagination";
import { SingleUser } from "@/redux/features/admin/client";
import { useGetAllUserQuery } from "@/redux/features/admin/clientAPI";
import { getLastActiveTime } from "@/utils/data";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ClientDetailsModal from "./ClientDetailsModal";

const AllClients = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const { data, isLoading } = useGetAllUserQuery();
  //pagination
  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    if (!data?.data) return [];
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return data.data.slice(start, end);
  }, [data, currentPage]);

  const [selectClient, setSelectClient] = useState<SingleUser | null>(null);
  const handleClick = (client: SingleUser) => {
    setSelectClient(client);
    setIsClientModalOpen(true);
  };
  return (
    <div className="">
      <CommonBorderWrapper className="">
        <div className="mb-6">
          <CommonHeader>Alle Fälle</CommonHeader>
        </div>

        <LoadingStatus
          isLoading={isLoading}
          items={paginatedData}
          itemName="Kunde"
        />
        {!isLoading && data && paginatedData.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full lg:min-w-[900px] border-collapse">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr className="text-left text-sm font-semibold text-gray-700">
                    <th className="px-6 py-4">Name</th>
                    <th className="px-6 py-4">Typ</th>
                    <th className="px-6 py-4">Aktive Fälle</th>
                    <th className="px-6 py-4">Letzte Anmeldung</th>
                    <th className="px-6 py-4 text-right">Aktion</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {paginatedData.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {/* Name */}
                      <td
                        className="px-6 py-4 cursor-pointer"
                        onClick={() => handleClick(item)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200 shrink-0">
                            <img
                              src={
                                item.profile?.img ||
                                `https://i.pravatar.cc/40?u=${item._id}`
                              }
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {item.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                            item.isBlocked
                              ? "bg-red-800 text-white"
                              : "bg-green-800 text-white"
                          }`}
                        >
                          {item.isBlocked ? "Gesperrt" : "Aktiv"}
                        </span>
                      </td>

                      {/* Active Cases */}
                      <td className="px-6 py-4 text-gray-900">
                        {item.caseCount}
                      </td>

                      {/* Last Login */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {getLastActiveTime(item.lastLogin)}
                      </td>

                      {/* Action */}
                      <td className="px-6 py-4 text-right">
                        <Link to="/admin/chat">
                          <CommonButton>Nachricht</CommonButton>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CommonBorderWrapper>

      {paginatedData.length > 0 && (
        <div className="py-5 ">
          <Pagination
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            currentPage={currentPage}
          />
        </div>
      )}
      {isClientModalOpen && selectClient && (
        <ClientDetailsModal
          setIsClientModalOpen={setIsClientModalOpen}
          selectClient={selectClient}
          setSelectClient={setSelectClient}
        />
      )}
    </div>
  );
};

export default AllClients;
