// CaseDetails.tsx
import CommonBorderWrapper from "@/common/CommonBorderWrapper";
import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import Spinner from "@/common/Spinner";
import { useGetSingleCasesQuery } from "@/redux/features/admin/clientAPI";
import { formatDate } from "@/utils/data";
import { formatFileSize } from "@/utils/mb";
import { skipToken } from "@reduxjs/toolkit/query";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { ImAttachment } from "react-icons/im";
import { LuPencilLine } from "react-icons/lu";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import EditOverviewModal from "./modal/EditOverviewModal";
import NoteModal from "./modal/NoteModal";
import TimelineModal from "./modal/TimelineModal";
import UploadDocumentsModal from "./modal/UploadDocumentsModal";

type ModalType =
  | "edit-overview"
  | "edit-note"
  | "upload-docs"
  | "timeline"
  | null;

export default function CaseDetails() {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const openEditOverview = () => setOpenModal("edit-overview");
  const openEditNote = () => setOpenModal("edit-note");
  const openUploadDocs = () => setOpenModal("upload-docs");
  const openAddTimeline = () => setOpenModal("timeline");

  const closeModal = () => setOpenModal(null);

  const { id } = useParams();
  const { data, isLoading } = useGetSingleCasesQuery(id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const singleCase = data?.data.caseOverview;

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const handleDownload = (fileUrl: string) => {
    const downloadUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");

    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = "";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="">
          <CommonBorderWrapper className="">
            <div className=" flex justify-between pb-6">
              <CommonHeader>Alle Falldetails</CommonHeader>
              <CommonButton onClick={handleBack}>Zurück</CommonButton>
            </div>
            <div className="flex flex-col 2xl:flex-row justify-between w-full gap-5">
              <div className="space-y-5 flex-1">
                <div className="rounded-xl  bg-[#F3FAFF] ">
                  <div className="flex items-center justify-between  px-6 py-4">
                    <div className="text-[#1878B5] flex gap-1 items-center">
                      <FaRegFileLines size={20} />
                      <h2 className="text-lg font-semibold ">Fallübersicht</h2>
                    </div>

                    <button
                      onClick={openEditOverview}
                      className="text-[#747C81] cursor-pointer"
                    >
                      <LuPencilLine size={24} />
                    </button>
                  </div>

                  <div className="p-6 space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {singleCase?.caseTitle}
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-6 text-sm">
                      <div>
                        <div className="text-gray-500">Name</div>
                        <div className="font-medium">
                          {singleCase?.clientName}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Typ</div>
                        <div className="font-medium">
                          {singleCase?.caseType}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Status</div>

                        <div className="font-medium">
                          {singleCase?.case_status}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Gerichtstermin</div>
                        <div>{formatDate(singleCase?.coatDate || "")}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">
                          Zuletzt aktualisiert
                        </div>
                        <div>{formatDate(singleCase?.updatedAt || "")}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Erstellt am</div>
                        <div>{formatDate(singleCase?.createdAt || "")}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" rounded-xl border bg-[#F3FAFF] p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[#1878B5] flex gap-1 items-center">
                      <FaRegFileLines size={20} />
                      <h2 className="text-lg font-semibold ">Fallnotiz</h2>
                    </div>

                    <button
                      onClick={openEditNote}
                      className="text-[#747C81] cursor-pointer"
                    >
                      <LuPencilLine size={24} />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {singleCase?.note ||
                      "Keine Notizen für diesen Fall vorhanden."}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#F3FAFF]  flex-1 p-5 ">
                <div className="flex flex-wrap items-center justify-between gap-3  ">
                  <div className="text-[#1878B5] flex gap-1 items-center">
                    <ImAttachment size={20} />
                    <h2 className="text-lg font-semibold ">Falldokumente</h2>
                  </div>

                  <CommonButton
                    onClick={openUploadDocs}
                    className=" bg-[#1878B5]"
                  >
                    Dokumente hochladen
                  </CommonButton>
                </div>
                <h3 className="font-medium text-gray-900 py-4">
                  {singleCase?.caseTitle}
                </h3>
                <div className="space-y-2.5">
                  {singleCase?.assetList_id?.assets?.map((doc, i) => (
                    <div
                      key={i}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-[#E8F2F8] border border-[#B7D5E8] rounded-lg"
                    >
                      {/* Left content */}
                      <div className="flex items-start gap-3 min-w-0">
                        <FileText
                          size={20}
                          className="text-[#1878B5] shrink-0"
                        />

                        <div className="min-w-0">
                          <p className="font-medium text-[#3C3B3B] break-words sm:line-clamp-1">
                            {doc?.assetName}
                          </p>
                          <p className="text-[#747C81] text-xs mt-1">
                            {formatFileSize(doc?.fileSize)}
                          </p>
                        </div>
                      </div>

                      {/* Download button */}
                      <button
                        onClick={() => handleDownload(doc.assetUrl)}
                        className="flex items-center gap-1.5 text-sm text-[#1878B5] cursor-pointer self-start sm:self-center"
                      >
                        <Download size={16} />
                        Herunterladen
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CommonBorderWrapper>

          <CommonBorderWrapper className="my-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Fall-Zeitleiste
                </h2>
                <p className="text-sm text-gray-500">
                  Wichtige Ereignisse und Dokumente für Fall #2024-001 verfolgen
                </p>
              </div>

              <div className="flex gap-3">
                <CommonButton onClick={openAddTimeline}>
                  Zeitleiste hinzufügen
                </CommonButton>
              </div>
            </div>

            <div className="relative">
              <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-4">
                {singleCase?.timeLine_id?.timeLine.map((item, index) => (
                  <div
                    key={index}
                    className="min-w-[280px] sm:min-w-[320px] rounded-[8px] bg-[#F9F9F9] backdrop-blur-[20.1px] p-4 sm:p-5 flex flex-col gap-3"
                  >
                    <RiVerifiedBadgeFill className="w-7 h-7 text-[#1878B5]" />

                    <div className="min-w-0">
                      <p className="text-sm text-gray-600 mb-2 break-words">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 break-words">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 mt-auto">
                      <div className="flex items-center gap-2 text-sm text-gray-500 min-w-0">
                        <span className="truncate">{item.assetName}</span>
                      </div>

                      <span className="px-4 py-1 rounded-full bg-[#C28956] text-white text-xs font-medium whitespace-nowrap">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-medium text-gray-900">
                Fallstatus :{" "}
                <span className="font-semibold">{singleCase?.case_status}</span>
              </p>
              <p className="text-sm text-gray-500">
                Letzte Aktualisierung : Versicherung eingereicht
              </p>
            </div>
          </CommonBorderWrapper>

          {openModal === "edit-overview" && singleCase && (
            <EditOverviewModal onClose={closeModal} singleCase={data} />
          )}

          {openModal === "edit-note" && singleCase && (
            <NoteModal onClose={closeModal} singleCase={data} />
          )}
          {openModal === "upload-docs" && singleCase && (
            <UploadDocumentsModal onClose={closeModal} singleCase={data} />
          )}

          {openModal === "timeline" && singleCase && (
            <TimelineModal onClose={closeModal} singleCase={data} />
          )}
        </div>
      )}
    </>
  );
}
