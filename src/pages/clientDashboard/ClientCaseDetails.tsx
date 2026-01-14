"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, FileText, Clock, Download } from "lucide-react";
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

export default function ClientCaseDetails() {
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

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "Complete":
//         return "bg-green-100 text-green-700";
//       case "In Progress":
//         return "bg-blue-100 text-blue-700";
//       case "Pending":
//         return "bg-yellow-100 text-yellow-700";
//       default:
//         return "bg-gray-100 text-gray-700";
//     }
//   };

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
          {/* Back */}
          <Button
            onClick={handleBack}
            variant="ghost"
            className="mb-4 text-sm text-gray-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Top Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Case Overview */}
            <div className="bg-[#F3FAFF] rounded-xl shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                Case Overview
              </h3>

              <p className="text-sm font-medium text-gray-900 mb-2">
                {caseDetails.title}
              </p>
              <p className="text-xs text-gray-500 mb-4">{caseDetails.id}</p>

              <div className="space-y-3">
                {/* <Info label="Type" value={caseDetails.type} />
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
                <Info label="Last Updated" value={caseDetails.updated} /> */}
              </div>
            </div>

            {/* Case Documents */}
            <div className="bg-[#F3FAFF] rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Case Documents
                </h3>
                <Button
                  size="sm"
                  className="bg-[#1878B5] text-white"
                  onClick={() => setShowUploadModal(true)}
                >
                  Upload Documents
                </Button>
              </div>

              <div className="space-y-3">
                {caseDetails.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between border border-gray-200 rounded-lg p-3"
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

                    <button className="text-gray-400 hover:text-gray-600">
                      <Download className="w-4 h-4" />
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
            <h3 className="text-sm font-semibold text-gray-900">
              Case Timeline
            </h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                Export
              </Button>
              <Button size="sm" variant="outline">
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

  //   return (
  //     <div className="min-h-screen bg-gray-50 font-inter">
  //       <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
  //         {/* Header */}
  //         <div className="mb-6">
  //           <Button
  //             onClick={handleBack}
  //             variant="ghost"
  //             className="mb-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100"
  //           >
  //             <ArrowLeft className="w-4 h-4 mr-2" />
  //             Back
  //           </Button>

  //           <div className="bg-white rounded-2xl shadow-sm p-6">
  //             <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
  //               <div>
  //                 <h1 className="text-2xl font-bold text-gray-900 mb-2">
  //                   {caseDetails.title}
  //                 </h1>
  //                 <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
  //                   <span className="font-medium">Case ID: {caseDetails.id}</span>
  //                   <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(caseDetails.status)}`}>
  //                     {caseDetails.status}
  //                   </span>
  //                 </div>
  //               </div>

  //               <Button
  //                 onClick={() => setShowUploadModal(true)}
  //                 className="bg-[#1878B5] hover:bg-[#1878D9] text-white"
  //               >
  //                 <Upload className="w-4 h-4 mr-2" />
  //                 Upload Document
  //               </Button>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Main Content */}
  //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  //           {/* Case Information */}
  //           <div className="lg:col-span-2 space-y-6">
  //             {/* Case Details */}
  //             <div className="bg-white rounded-2xl shadow-sm p-6">
  //               <h2 className="text-lg font-semibold text-gray-900 mb-4">Case Details</h2>

  //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  //                 <div className="space-y-4">
  //                   <div>
  //                     <p className="text-sm text-gray-500 mb-1">Case Type</p>
  //                     <p className="text-gray-900 font-medium">{caseDetails.type}</p>
  //                   </div>

  //                   <div>
  //                     <p className="text-sm text-gray-500 mb-1">Created Date</p>
  //                     <div className="flex items-center text-gray-900">
  //                       <Calendar className="w-4 h-4 mr-2 text-gray-400" />
  //                       <span>{caseDetails.created}</span>
  //                     </div>
  //                   </div>

  //                   <div>
  //                     <p className="text-sm text-gray-500 mb-1">Last Updated</p>
  //                     <div className="flex items-center text-gray-900">
  //                       <Clock className="w-4 h-4 mr-2 text-gray-400" />
  //                       <span>{caseDetails.updated}</span>
  //                     </div>
  //                   </div>
  //                 </div>

  //                 <div className="space-y-4">
  //                   <div>
  //                     <p className="text-sm text-gray-500 mb-1">Court Date</p>
  //                     <div className="flex items-center text-gray-900">
  //                       <Calendar className="w-4 h-4 mr-2 text-gray-400" />
  //                       <span>{caseDetails.courtDate}</span>
  //                     </div>
  //                   </div>

  //                   <div>
  //                     <p className="text-sm text-gray-500 mb-1">Client Name</p>
  //                     <div className="flex items-center text-gray-900">
  //                       <User className="w-4 h-4 mr-2 text-gray-400" />
  //                       <span>{caseDetails.clientName}</span>
  //                     </div>
  //                   </div>

  //                   <div>
  //                     <p className="text-sm text-gray-500 mb-1">Assigned Lawyer</p>
  //                     <div className="flex items-center text-gray-900">
  //                       <User className="w-4 h-4 mr-2 text-gray-400" />
  //                       <span>{caseDetails.lawyerName}</span>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className="mt-6 pt-6 border-t border-gray-200">
  //                 <p className="text-sm text-gray-500 mb-2">Description</p>
  //                 <p className="text-gray-900 leading-relaxed">{caseDetails.description}</p>
  //               </div>
  //             </div>

  //             {/* Documents Section */}
  //             <div className="bg-white rounded-2xl shadow-sm p-6">
  //               <div className="flex items-center justify-between mb-4">
  //                 <h2 className="text-lg font-semibold text-gray-900">Documents</h2>
  //                 <span className="text-sm text-gray-500">
  //                   {caseDetails.documents.length} files
  //                 </span>
  //               </div>

  //               <div className="space-y-3">
  //                 {caseDetails.documents.map((doc) => (
  //                   <div
  //                     key={doc.id}
  //                     className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
  //                   >
  //                     <div className="flex items-center space-x-4">
  //                       <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
  //                         <FileText className="w-5 h-5 text-blue-600" />
  //                       </div>
  //                       <div>
  //                         <p className="font-medium text-gray-900">{doc.name}</p>
  //                         <div className="flex items-center space-x-3 text-sm text-gray-500">
  //                           <span>{doc.type}</span>
  //                           <span>•</span>
  //                           <span>{doc.size}</span>
  //                           <span>•</span>
  //                           <span>{doc.uploadDate}</span>
  //                         </div>
  //                       </div>
  //                     </div>

  //                     <div className="flex items-center space-x-2">
  //                       <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDocumentStatusColor(doc.status)}`}>
  //                         {doc.status}
  //                       </span>
  //                       <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
  //                         <Eye className="w-4 h-4" />
  //                       </button>
  //                       <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
  //                         <Download className="w-4 h-4" />
  //                       </button>
  //                     </div>
  //                   </div>
  //                 ))}

  //                 {caseDetails.documents.length === 0 && (
  //                   <div className="text-center py-8">
  //                     <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
  //                       <FileText className="w-6 h-6 text-gray-400" />
  //                     </div>
  //                     <p className="text-gray-500 mb-4">No documents uploaded yet</p>
  //                     <Button
  //                       onClick={() => setShowUploadModal(true)}
  //                       variant="outline"
  //                       className="text-[#1878B5] border-[#1878B5] hover:bg-[#1878B5] hover:text-white"
  //                     >
  //                       <Plus className="w-4 h-4 mr-2" />
  //                       Upload First Document
  //                     </Button>
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //           </div>

  //           {/* Sidebar */}
  //           <div className="space-y-6">
  //             {/* Quick Actions */}
  //             <div className="bg-white rounded-2xl shadow-sm p-6">
  //               <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
  //               <div className="space-y-3">
  //                 <Button
  //                   onClick={() => setShowUploadModal(true)}
  //                   variant="outline"
  //                   className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
  //                 >
  //                   <Upload className="w-4 h-4 mr-2" />
  //                   Upload Document
  //                 </Button>
  //                 <Button
  //                   variant="outline"
  //                   className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
  //                 >
  //                   <FileText className="w-4 h-4 mr-2" />
  //                   Download All Documents
  //                 </Button>
  //                 <Button
  //                   variant="outline"
  //                   className="w-full justify-start text-gray-700 border-gray-200 hover:bg-gray-50"
  //                 >
  //                   <User className="w-4 h-4 mr-2" />
  //                   Contact Lawyer
  //                 </Button>
  //               </div>
  //             </div>

  //             {/* Case Timeline */}
  //             <div className="bg-white rounded-2xl shadow-sm p-6">
  //               <h3 className="text-lg font-semibold text-gray-900 mb-4">Case Timeline</h3>
  //               <div className="space-y-4">
  //                 <div className="flex items-start space-x-3">
  //                   <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
  //                   <div className="flex-1">
  //                     <p className="text-sm font-medium text-gray-900">Case Created</p>
  //                     <p className="text-xs text-gray-500">Jan 20, 2024</p>
  //                   </div>
  //                 </div>
  //                 <div className="flex items-start space-x-3">
  //                   <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
  //                   <div className="flex-1">
  //                     <p className="text-sm font-medium text-gray-900">Documents Uploaded</p>
  //                     <p className="text-xs text-gray-500">Jan 22, 2024</p>
  //                   </div>
  //                 </div>
  //                 <div className="flex items-start space-x-3">
  //                   <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
  //                   <div className="flex-1">
  //                     <p className="text-sm font-medium text-gray-900">Court Date Scheduled</p>
  //                     <p className="text-xs text-gray-500">Feb 15, 2024</p>
  //                   </div>
  //                 </div>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>

  //       {/* Document Upload Modal */}
  //       <DocumentUploadModal
  //         open={showUploadModal}
  //         onClose={() => setShowUploadModal(false)}
  //         onUpload={handleDocumentUpload}
  //       />
  //     </div>
  //   );
}
