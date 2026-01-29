"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  FileText,
  Download,
  NotepadText,
  Paperclip,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UploadDocumentsModal from "@/components/admin/case/modal/UploadDocumentsModal";
import { useGetCaseDetailsQuery } from "@/redux/api/caseApi";
import { getStatusStyles } from "./ClientCasesPage";
import star from "/images/star.png";
import Loader from "@/components/ui/Loader";



export default function CaseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [fromPage, setFromPage] = useState<string>("/client/dashboard");

  const { data: caseResponse, isLoading } = useGetCaseDetailsQuery(id);
  const caseData = caseResponse?.data?.caseOverview;

  useEffect(() => {
    // Track where user came from for proper back navigation
    if (location.state?.from) {
      setFromPage(location.state.from);
    }
  }, [location.state]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleBack = () => {
    navigate(fromPage);
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#F7F9FC]">
        <Loader />
      </div>
    );
  }

  if (!caseData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <p className="text-gray-500 mb-4">Case not found</p>
        <Button onClick={handleBack}>Go Back</Button>
      </div>
    );
  }

  const documents = caseData.assetList_id?.assets || [];
  const timeline = caseData.timeLine_id?.timeLine || [];

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <div className="pb-5">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-black">Falleinzelheiten</h2>
            {/* Back */}
            <Button
              onClick={handleBack}
              variant="ghost"
              className="mb-4 text-sm text-[#1878B5] bg-[#F3FAFF] hover:text-gray-900 hover:bg-gray-100 rounded-full px-5 py-2"
            >
              {/* <ArrowLeft className="w-4 h-4 mr-2" /> */}
              Zurück
            </Button>
          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              {/* Case Overview */}
              <div className="bg-[#F3FAFF] rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <NotepadText className="w-6 h-6 text-[#1878B5]" />
                  <h3 className="font-medium text-[#1878B5]">Fallübersicht</h3>
                </div>

                <p className="text-lg font-semibold text-gray-900 mb-2">
                  {caseData.caseTitle}
                </p>
                <p className="text-xs text-gray-400 mb-4">{caseData.caseNumber}</p>

                <div className="space-y-3">
                  <Info label="Type" value={caseData.caseType} />
                  <Info label="Status">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusStyles(
                        caseData.case_status
                      )}`}
                    >
                      {caseData.case_status}
                    </span>
                  </Info>
                  <Info label="Court Date" value={formatDate(caseData.coatDate)} />
                  <Info label="Created" value={formatDate(caseData.createdAt)} />
                  <Info label="Last Updated" value={formatDate(caseData.updatedAt)} />
                </div>
              </div>

              <div className="bg-[#F3FAFF] rounded-xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-6 h-6 text-[#1878B5]" />
                  <h3 className="font-medium text-[#1878B5]">Zusammenfassung des Falles</h3>
                </div>

                <p className="text-xs text-gray-900 font-normal mb-4 border-l-[3px] py-2 border-l-[#1878B5] pl-2.5 rounded-[6px] whitespace-pre-wrap">
                  {caseData.note || "No notes provided for this case."}
                </p>
              </div>
            </div>

            {/* Case Documents */}
            <div className="bg-[#F3FAFF] rounded-xl shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-5 h-5 text-[#1878B5]" />
                  <h3 className="text-sm font-semibold text-[#1878B5]">
                    Falldokumente
                  </h3>
                </div>
                <Button
                  size="sm"
                  className="bg-[#1878B5] text-white"
                  onClick={() => setShowUploadModal(true)}
                >
                  Dokumente hochladen
                </Button>
              </div>

              <p className="text-lg font-semibold text-gray-900">
                {caseData.caseTitle}
              </p>
              <p className="text-xs text-gray-400 mb-4">{caseData.caseNumber}</p>

              <div className="space-y-3">
                {documents.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">No documents uploaded</p>
                ) : (
                  documents.map((doc: any) => (
                    <div
                      key={doc._id}
                      className="flex items-center justify-between border border-[#B7D5E8] rounded-lg p-3 bg-[#E8F2F8]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center">
                          <FileText className="w-4 h-4 text-[#1878B5]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]" title={doc.assetName}>
                            {doc.assetName}
                          </p>
                          <p className="text-xs text-gray-500">{formatFileSize(doc.fileSize)}</p>
                        </div>
                      </div>

                      <a
                        href={doc.assetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-[#1878B5] hover:text-[#146499] transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span className="text-sm font-medium">Download</span>
                      </a>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mt-8 bg-white rounded-[24px] shadow-sm p-8 pb-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Sachstand-Zeitstrahl
              </h3>
              <p className="text-sm font-normal text-gray-500">
                Hier finden Sie die wichtigsten Informationen zu diesem Fall #{caseData.caseNumber}
              </p>
            </div>
            {/* <div className="flex gap-3">
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
            </div> */}
          </div>

          {/* Cards Container */}
          <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide no-scrollbar -mx-2 px-2">
            {timeline.length === 0 ? (
              <p className="text-sm text-gray-500 w-full text-center py-8">No timeline updates yet</p>
            ) : (
              timeline.map((event: any, i: number) => (
                <div
                  key={event._id || i}
                  className="min-w-[320px] bg-[#F9FAFB] rounded-[20px] p-6 flex flex-col hover:shadow-md transition-shadow duration-200 border border-transparent hover:border-blue-100"
                >
                  <img className="mb-5" src={star} alt="star" width={40} height={40} />
                  <h4 className="text-[#1878B5] font-bold text-[17px] mb-2 leading-tight">
                    {event.title}
                  </h4>
                  <p className="text-gray-500 text-[13px] leading-relaxed mb-6 font-normal">
                    {event.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between">
                    {event.assetUrl && event.assetUrl.length > 0 ? (
                      <div className="flex items-center gap-2 px-2 py-1.5 bg-[#E8F2F8] rounded-md transition-colors hover:bg-blue-100 cursor-pointer">
                        <span className="text-[11px] font-medium text-gray-500">
                          Attachment Available
                        </span>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    <div className="bg-[#C48C57] text-white text-[11px] font-bold px-4 py-1.5 rounded-lg shadow-sm">
                      {formatDate(event.date)}
                    </div>
                  </div>
                </div>
              )))}
          </div>

          {/* Progress Bar & Status Footer */}
          <div className="mt-8 border-t border-gray-100 pt-8">
            {/* <div className="w-full bg-[#E5E7EB] h-1.5 rounded-full overflow-hidden mb-6">
              <div className="bg-[#1878B5] h-full w-[40px] rounded-full"></div>
            </div> */}

            <div className="space-y-1">
              <h4 className="text-gray-900 font-bold text-base">
                Fallstatus : <span className="text-gray-700 font-semibold">{caseData.case_status}</span>
              </h4>
              <p className="text-gray-400 text-xs font-normal">
                Letzte Aktualisierung : {formatDate(caseData.updatedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {showUploadModal && caseResponse && (
        <UploadDocumentsModal
          onClose={() => setShowUploadModal(false)}
          singleCase={caseResponse}
        />
      )}
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
