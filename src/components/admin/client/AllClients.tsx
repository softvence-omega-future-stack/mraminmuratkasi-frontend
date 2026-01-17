// AllCases.tsx
import CommonBorderWrapper from "@/common/CommonBorderWrapper";
import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import Pagination from "@/common/Pagination";
import { useState } from "react";
import ClientDetailsModal from "./ClientDetailsModal";

type CaseStatus = "Active" | "Pending" | "Closed";

interface Case {
  id: string;
  caseNo: string;
  name: string;
  email: string;
  avatarUrl?: string;
  type: CaseStatus;
  activeCases: number;
  lastLogin: string;
}

const mockCases: Case[] = [
  {
    id: "1",
    caseNo: "CASE-001",
    name: "Robert Fox",
    email: "robert.fox@gmail.com",
    avatarUrl: "https://i.pravatar.cc/40?u=robert1",
    type: "Active",
    activeCases: 1,
    lastLogin: "2024-01-15",
  },
  {
    id: "2",
    caseNo: "CASE-002",
    name: "Guy Hawkins",
    email: "guy.hawkins@example.com",
    avatarUrl: "https://i.pravatar.cc/40?u=guy",
    type: "Active",
    activeCases: 1,
    lastLogin: "2024-01-15",
  },
  {
    id: "3",
    caseNo: "CASE-003",
    name: "Robert Fox",
    email: "robert.fox@gmail.com",
    avatarUrl: "https://i.pravatar.cc/40?u=robert2",
    type: "Active",
    activeCases: 1,
    lastLogin: "2024-01-15",
  },
  // Add more as needed
];

const AllClients = () => {
  const [cases] = useState<Case[]>(mockCases);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);

  return (
    <div className="">
      <CommonBorderWrapper className="">
        {/* Header */}
        <div className="mb-6">
          <CommonHeader>All Cases</CommonHeader>
        </div>

        {/* Card wrapper */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {/* Table header */}
          <div className="grid grid-cols-6 gap-4 border-b bg-gray-50 px-6 py-4 text-left text-sm font-semibold text-gray-700">
            <div className="col-span-2">Name</div>
            <div>Type</div>
            <div>Active Cases</div>
            <div>Last Login</div>
            <div className="text-right">Action</div>
          </div>

          {/* Table body */}
          <div className="divide-y divide-gray-100">
            {cases.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-6 gap-4 px-6 py-4 hover:bg-gray-50/70 transition-colors"
              >
                {/* Name + avatar + email */}
                <div
                  onClick={() => setIsClientModalOpen(true)}
                  className="col-span-2 flex items-center gap-3 cursor-pointer"
                >
                  <div className="h-10 w-10 flex-shrink-0 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={
                        item.avatarUrl ||
                        `https://i.pravatar.cc/40?u=${item.id}`
                      }
                      alt={item.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="mt-0.5 text-sm text-gray-500">
                      {item.email}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      item.type === "Active"
                        ? "bg-green-100 text-green-800"
                        : item.type === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                {/* Active Cases count */}
                <div className="flex items-center text-gray-900">
                  {item.activeCases}
                </div>

                {/* Last Login */}
                <div className="flex items-center text-sm text-gray-600">
                  Last Login: {item.lastLogin}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <CommonButton>Message</CommonButton>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state (optional) */}
          {cases.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-gray-500">No cases found</p>
            </div>
          )}
        </div>
      </CommonBorderWrapper>{" "}
      <div className="py-5">
        <Pagination totalPages={5} onPageChange={() => {}} currentPage={1} />
      </div>
      {isClientModalOpen && (
        <ClientDetailsModal setIsClientModalOpen={setIsClientModalOpen} />
      )}
    </div>
  );
};

export default AllClients;
