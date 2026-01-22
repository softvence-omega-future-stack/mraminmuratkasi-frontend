import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import Spinner from "@/common/Spinner";
import { SingleUser } from "@/redux/features/admin/client";
import {
  useBlockUserMutation,
  useGetSingleCasesQuery,
  useUnBlockUserMutation,
} from "@/redux/features/admin/clientAPI";
import { formatDate } from "@/utils/data";
import { skipToken } from "@reduxjs/toolkit/query";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface ClientDetailsModalProps {
  setIsClientModalOpen: (isOpen: boolean) => void;
  setSelectClient: (client: SingleUser | null) => void;
  selectClient: SingleUser | null;
}
const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  setIsClientModalOpen,
  selectClient,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { data: singleCease, isLoading } = useGetSingleCasesQuery(
    selectClient?.profile?.case_ids[0]?._id ?? skipToken,
    {
      refetchOnMountOrArgChange: true,
    },
  );
  console.log("datssssssssssssssssa", singleCease);

  const [blockUser, { isLoading: blockLoading }] = useBlockUserMutation();
  const [unBlockUser, { isLoading: unBlockLoading }] = useUnBlockUserMutation();

  const clientData = {
    name: selectClient?.name,
    status: selectClient?.profile.name,
    avatar: selectClient?.profile.img,
    email: selectClient?.profile.email,
    phone: selectClient?.profile.phone,
    lastLogin: formatDate(selectClient?.loggedOutTime || ""),
    case: {
      title: singleCease?.data.caseOverview.caseTitle,
      caseNumber: singleCease?.data.caseOverview.caseNumber,
      type: singleCease?.data.caseOverview.caseType,
      status: singleCease?.data.caseOverview.case_status,
      courtDate: formatDate(singleCease?.data.caseOverview.coatDate || ""),
      created: formatDate(singleCease?.data.caseOverview.createdAt || ""),
    },
  };

  const handleBlockUser = async () => {
    if (!selectClient?._id) return;

    try {
      if (selectClient?.isBlocked) {
        const response = await unBlockUser(selectClient._id).unwrap();
        toast.success(response.message);
      } else {
        const response = await blockUser(selectClient._id).unwrap();
        toast.success(response.message);
      }
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Failed to update user block status:", error);
    }
  };

  const handleClose = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 p-4 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full p-8 md:p-12 relative overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <CommonHeader>Client Details</CommonHeader>

          <button
            onClick={() => setIsClientModalOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X size={32} className="text-gray-900" />
          </button>
        </div>
        {/* Profile Section */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={clientData.avatar}
            alt={clientData.name}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover mb-4"
          />
          <CommonHeader size="md" className="">
            {clientData.name}
          </CommonHeader>
          <span className="text-green-500 text-xl font-medium">
            {clientData.status}
          </span>
        </div>
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-[#E8F2F8] rounded-2xl p-6">
            <p className="text-gray-500 text-sm md:text-base mb-2">Email</p>
            <p className="text-gray-900 font-semibold text-base md:text-lg break-all">
              {clientData.email}
            </p>
          </div>
          <div className="bg-[#E8F2F8] rounded-2xl p-6">
            <p className="text-gray-500 text-sm md:text-base mb-2">Phone</p>
            <p className="text-gray-900 font-semibold text-base md:text-lg">
              {clientData.phone}
            </p>
          </div>
          <div className="bg-[#E8F2F8] rounded-2xl p-6">
            <p className="text-gray-500 text-sm md:text-base mb-2">
              Last Login
            </p>
            <p className="text-gray-900 font-semibold text-base md:text-lg">
              {clientData.lastLogin}
            </p>
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to={`/admin/chat`}>
            <CommonButton className="w-64!">Message</CommonButton>
          </Link>
          <CommonButton
            onClick={() => setShowConfirmModal(true)}
            className="w-64! bg-orange-100! text-orange-600! "
          >
            {selectClient?.isBlocked ? "Unblock" : "Block"} User
          </CommonButton>
        </div>
        {isLoading ? (
          <Spinner />
        ) : singleCease ? (
          <div className="mb-6">
            <CommonHeader className="pb-2">Cases</CommonHeader>

            <div className="bg-[#F9F9F9] backdrop-blur-[20.1px] border-2 border-gray-100 rounded-2xl p-6">
              <CommonHeader size="md">{clientData.case.title}</CommonHeader>

              <p className="text-gray-500 mb-6">{clientData.case.caseNumber}</p>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-lg">Type :</span>
                  <span className="text-gray-900 font-medium text-lg">
                    {clientData.case.type}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-lg">Status :</span>
                  <span className="text-[#1878B5] font-medium text-lg">
                    {clientData.case.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-lg">Court Date :</span>
                  <span className="text-gray-900 font-medium text-lg">
                    {clientData.case.courtDate}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 text-lg">Created :</span>
                  <span className="text-gray-900 font-medium text-lg">
                    {clientData.case.created}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center">No Cases found</p>
        )}
      </div>

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">
              Confirm Action
            </h2>
            <p className="text-gray-600 text-center text-lg mb-8">
              Are you sure you want to suspend Robert fox's account ?
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleClose}
                className="border-2 border-orange-500 text-orange-600 font-semibold text-lg px-10 py-3 rounded-full hover:bg-orange-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={blockLoading || unBlockLoading}
                onClick={handleBlockUser}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-10 py-3 rounded-full transition-colors shadow-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed  disabled:bg-gray-400"
              >
                {selectClient?.isBlocked ? "UnBlock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ClientDetailsModal;
