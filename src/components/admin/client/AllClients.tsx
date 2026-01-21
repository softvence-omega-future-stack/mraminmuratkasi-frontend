// AllCases.tsx
import CommonBorderWrapper from "@/common/CommonBorderWrapper";
import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import LoadingStatus from "@/common/LoadingStatus";
import Pagination from "@/common/Pagination";
import { useGetAllUserQuery } from "@/redux/features/admin/clientAPI";
import { getLastActiveTime } from "@/utils/data";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ClientDetailsModal from "./ClientDetailsModal";

const AllClients = () => {
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  const { data, isLoading } = useGetAllUserQuery();
  //pagination
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = data?.data?.length || 0;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const paginatedData = useMemo(() => {
    if (!data?.data) return [];
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return data.data.slice(start, end);
  }, [data, currentPage]);
  return (
    <div className="">
      <CommonBorderWrapper className="">
        <div className="mb-6">
          <CommonHeader>All Cases</CommonHeader>
        </div>

        <LoadingStatus
          isLoading={isLoading}
          items={paginatedData}
          itemName="Client"
        />
        {!isLoading && data && paginatedData.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="grid grid-cols-6 gap-4 border-b bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-700">
              <div className="col-span-2">Name</div>
              <div>Type</div>
              <div>Active Cases</div>
              <div>Last Login</div>
              <div className="text-right">Action</div>
            </div>

            <div className="divide-y divide-gray-100">
              {paginatedData.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors"
                >
                  <div
                    onClick={() => setIsClientModalOpen(true)}
                    className="col-span-2 flex items-center gap-3 cursor-pointer"
                  >
                    <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden border border-gray-200">
                      <img
                        src={
                          item.profile.img ||
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
                      <div className="mt-0.5 text-sm text-gray-500">
                        {item.email}
                      </div>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="flex items-center">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.isBlocked
                          ? "bg-red-800 text-white"
                          : "bg-green-800 text-white"
                      }`}
                    >
                      {item.isBlocked ? "Blocked" : "Active"}
                    </span>
                  </div>

                  <div className="flex items-center text-gray-900">
                    {item.caseCount}
                  </div>

                  <div className="flex items-center text-sm text-gray-600">
                    Last Login: {getLastActiveTime(item.lastLogin)}
                  </div>

                  <Link
                    to="/admin/chat"
                    className="flex items-center justify-end gap-2"
                  >
                    <CommonButton>Message</CommonButton>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </CommonBorderWrapper>

      {paginatedData.length > 0 && (
        <div className="py-5">
          <Pagination
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
            currentPage={currentPage}
          />
        </div>
      )}
      {isClientModalOpen && (
        <ClientDetailsModal setIsClientModalOpen={setIsClientModalOpen} />
      )}
    </div>
  );
};

export default AllClients;
