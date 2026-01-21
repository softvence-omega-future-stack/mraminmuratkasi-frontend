// CaseDetails.tsx
import CommonBorderWrapper from "@/common/CommonBorderWrapper";
import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import { useGetSingleCasesQuery } from "@/redux/features/admin/clientAPI";
import { formatDate } from "@/utils/data";
import { skipToken } from "@reduxjs/toolkit/query";
import { Download, FileText, Plus } from "lucide-react";
import { useState } from "react";
import { FaRegFileLines } from "react-icons/fa6";
import { ImAttachment } from "react-icons/im";
import { LuPencilLine } from "react-icons/lu";
import { useParams } from "react-router-dom";
import { EditNoteModal } from "./modal/EditNoteModal";
import { EditOverviewModal } from "./modal/EditOverviewModal";
import { TimelineModal } from "./modal/TimelineModal";
import { UploadDocumentsModal } from "./modal/UploadDocumentsModal";

type ModalType =
  | "edit-overview"
  | "edit-note"
  | "upload-docs"
  | "timeline"
  | null;

export default function CaseDetails() {
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [editingTimelineId, setEditingTimelineId] = useState<string | null>(
    null,
  );

  const openEditOverview = () => setOpenModal("edit-overview");
  const openEditNote = () => setOpenModal("edit-note");
  const openUploadDocs = () => setOpenModal("upload-docs");
  const openAddTimeline = () => {
    setEditingTimelineId(null);
    setOpenModal("timeline");
  };
  const openEditTimeline = (id: string) => {
    setEditingTimelineId(id);
    setOpenModal("timeline");
  };

  const closeModal = () => setOpenModal(null);

  const { id } = useParams();
  console.log("id", id);

  const { data, isLoading } = useGetSingleCasesQuery(id ?? skipToken, {
    refetchOnMountOrArgChange: true,
  });
  const singleCase = data?.data.caseOverview;

  return (
    <div className="">
      <CommonBorderWrapper className="">
        <div className=" flex justify-between pb-6">
          <CommonHeader>All Cases Details</CommonHeader>
          <CommonButton>Back</CommonButton>
        </div>
        <div
          className="flex justify-between w-full gap-5
 "
        >
          <div className="space-y-5 flex-1">
            <div className="rounded-xl  bg-[#F3FAFF] ">
              <div className="flex items-center justify-between  px-6 py-4">
                <div className="text-[#1878B5] flex gap-1 items-center">
                  <FaRegFileLines size={20} />
                  <h2 className="text-lg font-semibold ">Case Overview</h2>
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
                  {/* <p className="mt-1 text-sm text-gray-600">
                    Speeding Violation 85mph in 55mph
                  </p> */}
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-gray-500">Name</div>
                    <div className="font-medium">{singleCase?.clientName}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Type</div>
                    <div className="font-medium">{singleCase?.caseType}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Status</div>
                    <select
                      value={singleCase?.case_status}
                      className="mt-1 block w-full rounded border-gray-300 py-1.5 text-sm"
                      disabled
                    >
                      <option value="inprogress">In Progress</option>
                    </select>
                  </div>
                  <div>
                    <div className="text-gray-500">Court Date</div>
                    <div>{formatDate(singleCase?.coatDate) || "—"}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Last Updated</div>
                    <div>{formatDate(singleCase?.updatedAt)}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Created</div>
                    <div>{formatDate(singleCase?.createdAt)}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" rounded-xl border bg-[#F3FAFF] p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Case Note</h3>

                <button
                  onClick={openEditNote}
                  className="text-[#747C81] cursor-pointer"
                >
                  <LuPencilLine size={24} />
                </button>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                {singleCase?.note}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#F3FAFF]  flex-1 p-5 ">
            <div className="flex items-center justify-between  ">
              <div className="text-[#1878B5] flex gap-1 items-center">
                <ImAttachment size={20} />
                <h2 className="text-lg font-semibold ">Case Documents</h2>
              </div>

              <CommonButton onClick={openUploadDocs} className=" bg-[#1878B5]">
                Upload Documents
              </CommonButton>
            </div>
            <h3 className="font-medium text-gray-900 py-4">
              {singleCase?.caseTitle}
            </h3>
            <div className="space-y-2.5 ">
              {singleCase?.timeLine_id.timeLine.map((doc, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-6 bg-[#E8F2F8] border-[#B7D5E8] rounded-lg  "
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-[#1878B5]" />
                    <span className="font-medium text-gray-900">
                      {doc.assetName}
                    </span>
                  </div>
                  <button className="flex items-center gap-1.5 text-sm text-[#1878B5]">
                    <Download size={16} /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CommonBorderWrapper>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Overview + Note */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case Overview Card */}

          {/* Case Timeline */}
          <div className="rounded-xl border bg-white shadow-sm">
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2 className="text-lg font-semibold">Case Timeline</h2>
              <button
                onClick={openAddTimeline}
                className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                <Plus size={16} /> Add Timeline
              </button>
            </div>

            <div className="p-6 space-y-6">
              {singleCase?.timeLine_id.timeLine.map((event) => (
                <div key={event._id} className="relative pl-10">
                  <div className="absolute left-3 top-1.5 h-4 w-4 rounded-full border-4 border-indigo-600 bg-white" />
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {event.title}
                      </h4>
                      <p className="mt-1 text-sm text-gray-600">
                        {event.description}
                      </p>
                      <p className="mt-2 text-xs text-gray-500">{event.date}</p>
                    </div>
                    <button
                      onClick={() => openEditTimeline(event._id)}
                      className="text-sm text-indigo-600 hover:text-indigo-800"
                    >
                      Edit
                    </button>
                  </div>

                  {singleCase?.timeLine_id.timeLine.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {singleCase?.timeLine_id.timeLine.map((d, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-1.5 rounded bg-gray-100 px-2.5 py-1 text-xs"
                        >
                          <FileText size={14} /> {d.assetName}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {openModal === "edit-overview" && (
        <EditOverviewModal caseData={singleCase} onClose={closeModal} />
      )}

      {openModal === "edit-note" && (
        <EditNoteModal note={singleCase?.note} onClose={closeModal} />
      )}

      {openModal === "upload-docs" && (
        <UploadDocumentsModal caseData={singleCase} onClose={closeModal} />
      )}

      {openModal === "timeline" && (
        <TimelineModal
          isEdit={!!editingTimelineId}
          initialData={
            editingTimelineId
              ? singleCase?.timeLine_id.timeLine.find(
                  (t) => t._id === editingTimelineId,
                )
              : undefined
          }
          onClose={closeModal}
        />
      )}
    </div>
  );
}
