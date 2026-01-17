import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import { X } from "lucide-react";
import { useState } from "react";

interface ClientDetailsModalProps {
  setIsClientModalOpen: (isOpen: boolean) => void;
}
const ClientDetailsModal: React.FC<ClientDetailsModalProps> = ({
  setIsClientModalOpen,
}) => {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const clientData = {
    name: "Robert Fox",
    status: "Active",
    avatar: "https://i.pravatar.cc/150?img=13",
    email: "robert.fox@gmail.com",
    phone: "+1 (555) 123-4567",
    lastLogin: "2024-01-15",
    case: {
      title: "Speeding Violation 85mph in 55mph",
      caseNumber: "CASE-2024-001",
      type: "Reckless Driving",
      status: "InProgress",
      courtDate: "Mar 15, 2024",
      created: "Jan 20, 2024",
    },
  };

  const handleConfirmSuspend = () => {
    setShowConfirmModal(false);
    // Add your suspend logic here
  };

  const handleCancelSuspend = () => {
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
          <CommonButton className="w-64!">Message</CommonButton>
          <CommonButton
            onClick={() => setShowConfirmModal(true)}
            className="w-64! bg-orange-100! text-orange-600! "
          >
            Suspend Account
          </CommonButton>
        </div>

        {/* Cases Section */}
        <div className="mb-6">
          <CommonHeader>Cases</CommonHeader>

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
                onClick={handleCancelSuspend}
                className="border-2 border-orange-500 text-orange-600 font-semibold text-lg px-10 py-3 rounded-full hover:bg-orange-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSuspend}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg px-10 py-3 rounded-full transition-colors shadow-lg cursor-pointer"
              >
                Suspend
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ClientDetailsModal;
