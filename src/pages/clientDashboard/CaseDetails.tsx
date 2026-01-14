"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FileText,
  Clock,
  Download,
  NotepadText,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DocumentUploadModal from "@/common/DocumentUploadModal";
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
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="max-w-7xl mx-auto px-6 py-6">
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

        {/* Timeline */}
        <div className="mt-6 bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Case Timeline
              </h3>
              <p className="text-sm font-normal text-gray-500">Track important events and documents for case #2024-001</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="bg-[#1878B5] text-white rounded-full px-5 py-3"
              >
                Export
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-[#1878B5] text-[#1878B5] bg-[#E8F2F8] rounded-full px-5 py-3"
              >
                Share
              </Button>
            </div>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2">
            {[
              "Court Hearing Scheduled",
              "Insurance Response Received",
              "Documents Reviewed",
              "Case In Progress",
            ].map((title, i) => (
              <div
                key={i}
                className="min-w-[260px] border border-gray-200 rounded-lg p-4"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Clock className="w-4 h-4 text-[#1878B5]" />
                </div>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {title}
                </p>
                <span className="inline-block mt-2 text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded-full">
                  Jan 2024
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <DocumentUploadModal
        open={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUpload={handleDocumentUpload}
      />
    </div>
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
