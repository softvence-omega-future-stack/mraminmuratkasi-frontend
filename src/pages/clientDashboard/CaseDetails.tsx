"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FileText,
  Download,
  NotepadText,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DocumentUploadModal from "@/common/DocumentUploadModal";
import ClientDashboardLayout from "@/Layout/ClientDashboardLayout";
// import star from "/public/images/star.png";
// import DocumentUploadModal from "@/common/DocumentUploadModal";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "uploaded" | "processing" | "approved";
}

interface CaseDetails {
  id: string;
  title: string;
  type: string;
  status: "In Progress" | "Complete" | "Pending";
  created: string;
  updated: string;
  courtDate: string;
  description: string;
  clientName: string;
  lawyerName: string;
  documents: Document[];
}

const mockCaseDetails: CaseDetails = {
  id: "CASE-2024-001",
  title: "Speeding Violation 85mph in 55mph",
  type: "Reckless Driving",
  status: "In Progress",
  created: "Jan 20, 2024",
  updated: "Jan 25, 2024",
  courtDate: "Feb 15, 2024",
  description:
    "Client was cited for driving 85 mph in a 55 mph zone on Highway 101. The incident occurred during clear weather conditions and light traffic. Client maintains they were not exceeding the speed limit and requests contestation of the citation.",
  clientName: "John Doe",
  lawyerName: "Sarah Johnson",
  documents: [
    {
      id: "1",
      name: "Traffic Citation Copy",
      type: "PDF",
      size: "2.4 MB",
      uploadDate: "Jan 20, 2024",
      status: "approved",
    },
    {
      id: "2",
      name: "Driving License",
      type: "PDF",
      size: "1.2 MB",
      uploadDate: "Jan 21, 2024",
      status: "approved",
    },
    {
      id: "3",
      name: "Insurance Policy",
      type: "PDF",
      size: "3.8 MB",
      uploadDate: "Jan 22, 2024",
      status: "processing",
    },
  ],
};

export default function CaseDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [caseDetails, setCaseDetails] = useState<CaseDetails>(mockCaseDetails);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fromPage, setFromPage] = useState<string>("/client/dashboard");

  useEffect(() => {
    // Track where user came from for proper back navigation
    if (location.state?.from) {
      setFromPage(location.state.from);
    }
  }, [location.state]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  //   const getDocumentStatusColor = (status: string) => {
  //     switch (status) {
  //       case "approved":
  //         return "bg-green-100 text-green-700";
  //       case "processing":
  //         return "bg-yellow-100 text-yellow-700";
  //       case "uploaded":
  //         return "bg-blue-100 text-blue-700";
  //       default:
  //         return "bg-gray-100 text-gray-700";
  //     }
  //   };

  const handleBack = () => {
    navigate(fromPage);
  };

  const handleDocumentUpload = (
    newDocument: Omit<Document, "id" | "uploadDate" | "status">
  ) => {
    const document: Document = {
      ...newDocument,
      id: Date.now().toString(),
      uploadDate: new Date().toLocaleDateString(),
      status: "uploaded",
    };

    setCaseDetails((prev) => ({
      ...prev,
      documents: [...prev.documents, document],
    }));

    setShowUploadModal(false);
  };

  return (
    <ClientDashboardLayout>
      <div className="min-h-screen bg-[#F7F9FC]">
        <div className="pb-5">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">Case Details</h2>
            {/* Back */}
            <Button
              onClick={handleBack}
              variant="ghost"
              className="mb-4 text-sm text-[#1878B5] bg-[#F3FAFF] hover:text-gray-900 hover:bg-gray-100 rounded-full px-5 py-2"
            >
              {/* <ArrowLeft className="w-4 h-4 mr-2" /> */}
              Back
            </Button>
          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              {/* Case Overview */}
              <div className="bg-[#F3FAFF] rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <NotepadText className="w-6 h-6 text-[#1878B5]" />
                  <h3 className="font-medium text-[#1878B5]">Case Overview</h3>
                </div>

                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {caseDetails.title}
                </p>
                <p className="text-xs text-gray-400 mb-4">{caseDetails.id}</p>

                <div className="space-y-3">
                  <Info label="Type" value={caseDetails.type} />
                  <Info label="Status">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs ${getStatusColor(
                        caseDetails.status
                      )}`}
                    >
                      {caseDetails.status}
                    </span>
                  </Info>
                  <Info label="Court Date" value={caseDetails.courtDate} />
                  <Info label="Created" value={caseDetails.created} />
                  <Info label="Last Updated" value={caseDetails.updated} />
                </div>
              </div>

              <div className="bg-[#F3FAFF] rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <NotepadText className="w-6 h-6 text-[#1878B5]" />
                  <h3 className="font-medium text-[#1878B5]">Case Overview</h3>
                </div>

                <p className="text-xs text-gray-900 font-normal mb-4 border-l-[3px] py-2 border-l-[#1878B5] pl-2.5 rounded-[6px]">
                  First-time DUI offense. Client was cooperative at traffic
                  stop. BAC was 0.09%. Need to review dash cam footage and
                  explore plea options.
                </p>
              </div>
            </div>

            {/* Case Documents */}
            <div className="bg-[#F3FAFF] rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-5 h-5 text-[#1878B5]" />
                  <h3 className="text-sm font-semibold text-[#1878B5]">
                    Case Documents
                  </h3>
                </div>
                <Button
                  size="sm"
                  className="bg-[#1878B5] text-white"
                  onClick={() => setShowUploadModal(true)}
                >
                  Upload Documents
                </Button>
              </div>

              <p className="text-lg font-semibold text-gray-900">
                {caseDetails.title}
              </p>
              <p className="text-xs text-gray-400 mb-4">{caseDetails.id}</p>

              <div className="space-y-3">
                {caseDetails.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between border border-[#B7D5E8] rounded-lg p-3 bg-[#E8F2F8]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-[#1878B5]" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </p>
                        <p className="text-xs text-gray-500">{doc.size}</p>
                      </div>
                    </div>

                    <button className="flex items-center gap-1.5 text-[#1878B5] hover:text-gray-600">
                      <Download className="w-4 h-4" />
                      <p>Download</p>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-8 bg-white rounded-[24px] shadow-sm p-8 pb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Case Timeline
              </h3>
              <p className="text-sm font-normal text-gray-500">
                Track important events and documents for case #{caseDetails.id}
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                size="sm"
                className="bg-[#1878B5] hover:bg-[#146499] text-white rounded-2xl h-11 px-8 font-semibold transition-all shadow-md"
              >
                Export
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#1878B5] text-[#1878B5] bg-[#E8F2F8] hover:bg-[#D1E5F2] rounded-2xl h-11 px-8 font-semibold transition-all"
              >
                Share
              </Button>
            </div>
          </div>

          {/* Cards Container */}
          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide no-scrollbar -mx-2 px-2">
            {[
              {
                title: "Court Hearing Scheduled",
                description: "A court hearing has been scheduled for 20/11/2025.",
                date: "20-Jan-2025",
                file: "Evidence.jpg",
              },
              {
                title: "Insurance Response Received",
                description:
                  "The insurance company requested additional documents to process the claim.",
                date: "20-Jan-2025",
                file: "Insurance.jpg",
              },
              {
                title: "Insurance Response Received",
                description:
                  "The insurance company requested additional documents to process the claim.",
                date: "20-Jan-2025",
                file: "Evidence.jpg",
              },
              {
                title: "Insurance Response Received",
                description:
                  "The insurance company requested additional documents to process the claim.",
                date: "20-Jan-2025",
                file: "Evidence.jpg",
              },
              {
                title: "Insurance Response Received",
                description:
                  "The insurance company requested additional documents to process the claim.",
                date: "20-Jan-2025",
                file: "Evidence.jpg",
              },
            ].map((event, i) => (
              <div
                key={i}
                className="min-w-[320px] bg-[#F9FAFB] rounded-[20px] p-6 flex flex-col hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-blue-100"
              >
                {/* <div className="w-10 h-10 bg-[#1878B5] rounded-full flex items-center justify-center mb-5 shadow-sm"> */}
                  {/* <Check className="w-6 h-6 text-white" /> */}
                  <img className="mb-5" src="../../../public/images/star.png" alt="star" width={40} height={40}/>
                {/* </div> */}
                <h4 className="text-[#1878B5] font-bold text-[17px] mb-2 leading-tight">
                  {event.title}
                </h4>
                <p className="text-gray-500 text-[13px] leading-relaxed mb-6 font-normal">
                  {event.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 px-2 py-1.5 bg-[#E8F2F8] rounded-md transition-colors hover:bg-blue-100 cursor-pointer">
                    {/* <div className="bg-[#4169E1] p-0.5 rounded-[2px]">
                      <span className="text-[6px] text-white font-black uppercase">jpg</span>
                    </div> */}
                    <span className="text-[11px] font-medium text-gray-500">
                      {event.file}
                    </span>
                  </div>
                  <div className="bg-[#C48C57] text-white text-[11px] font-bold px-4 py-1.5 rounded-lg shadow-sm">
                    {event.date}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar & Status Footer */}
          <div className="mt-8 border-t border-gray-100 pt-8">
            <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden mb-6">
              <div className="bg-[#1878B5] h-full w-[40px] rounded-full"></div>
            </div>
            
            <div className="space-y-1">
              <h4 className="text-gray-900 font-bold text-base">
                Case Status : <span className="text-gray-700 font-semibold">{caseDetails.status}</span>
              </h4>
              <p className="text-gray-400 text-xs font-normal">
                Last Update : Insurance claim filed
              </p>
            </div>
          </div>
        </div>
      </div>

      <DocumentUploadModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleDocumentUpload}
      />
    </div>
    </ClientDashboardLayout>
  );
}

type InfoProps = {
  label: string;
  value?: React.ReactNode;
  children?: React.ReactNode;
};

const Info: React.FC<InfoProps> = ({ label, value, children }) => {
  return (
    <div className="flex items-center text-sm">
      <span className="w-32 font-medium text-gray-900">{label}:</span>
      <span className=" text-gray-500">{children ?? value}</span>
    </div>
  );
};
// font-medium text-gray-900
// "w-32 text-gray-500
