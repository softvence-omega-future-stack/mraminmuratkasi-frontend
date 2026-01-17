// CaseDetails.tsx
import {
  ArrowLeft,
  Download,
  Edit2,
  FileText,
  FileUp,
  Pencil,
  Plus,
} from "lucide-react";
import { useState } from "react";
import { EditNoteModal } from "./modal/EditNoteModal";
import { EditOverviewModal } from "./modal/EditOverviewModal";
import { TimelineModal } from "./modal/TimelineModal";
import { UploadDocumentsModal } from "./modal/UploadDocumentsModal";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  documents: { name: string; type: string }[];
  status?: "completed" | "pending";
}

interface Case {
  id: string;
  title: string;
  clientName: string;
  type: string;
  status: "new" | "inprogress" | "closed";
  courtDate?: string;
  created: string;
  lastUpdated: string;
  note: string;
  documents: { name: string; type: string }[];
  timeline: TimelineEvent[];
}

const mockCase: Case = {
  id: "CASE-001",
  title: "Speeding Violation 85mph in 55mph",
  clientName: "Robert Fox",
  type: "Reckless Driving",
  status: "inprogress",
  courtDate: "Mar 15, 2024",
  created: "Jan 20, 2024",
  lastUpdated: "Jun 10, 2024",
  note: "First-time DUI offense. Client was cooperative at traffic stop. BAC 0.09%. Need to review dash cam footage and explore plea options.",
  documents: [
    { name: "Police_Report.pdf", type: "pdf" },
    { name: "Insurance_Report.pdf", type: "pdf" },
    { name: "Dash_Cam_Footage.jpg", type: "jpg" },
    { name: "Dash_Cam_Cam.jpg", type: "jpg" },
  ],
  timeline: [
    {
      id: "1",
      title: "Court Hearing Scheduled",
      date: "30-Jan-2025",
      description: "Court hearing has been scheduled for 20/02/2025",
      documents: [{ name: "Evidence.jpg", type: "jpg" }],
    },
    {
      id: "2",
      title: "Insurance Response Received",
      date: "20-Jan-2025",
      description:
        "The insurance company requested additional documents to process the claim.",
      documents: [{ name: "insurance.jpg", type: "jpg" }],
    },
    // ...
  ],
};

type ModalType =
  | "edit-overview"
  | "edit-note"
  | "upload-docs"
  | "timeline"
  | null;

export default function CaseDetails() {
  const [caseData] = useState<Case>(mockCase);
  const [openModal, setOpenModal] = useState<ModalType>(null);
  const [editingTimelineId, setEditingTimelineId] = useState<string | null>(
    null
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

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <button className="rounded-full p-2 hover:bg-gray-200">
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Case Details</h1>
          </div>
          <span className="text-sm text-gray-500">Back</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Overview + Note */}
          <div className="lg:col-span-2 space-y-6">
            {/* Case Overview Card */}
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Case Overview</h2>
                <button
                  onClick={openEditOverview}
                  className="flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                >
                  <Edit2 size={16} /> Edit
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-medium text-gray-900">
                    {caseData.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Speeding Violation 85mph in 55mph
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6 text-sm">
                  <div>
                    <div className="text-gray-500">Name</div>
                    <div className="font-medium">{caseData.clientName}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Type</div>
                    <div className="font-medium">{caseData.type}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Status</div>
                    <select
                      value={caseData.status}
                      className="mt-1 block w-full rounded border-gray-300 py-1.5 text-sm"
                      disabled
                    >
                      <option value="inprogress">In Progress</option>
                    </select>
                  </div>
                  <div>
                    <div className="text-gray-500">Court Date</div>
                    <div>{caseData.courtDate || "—"}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Last Updated</div>
                    <div>{caseData.lastUpdated}</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Created</div>
                    <div>{caseData.created}</div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium">Case Note</h3>
                    <button
                      onClick={openEditNote}
                      className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                    >
                      <Pencil size={14} /> Edit Note
                    </button>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                    {caseData.note}
                  </p>
                </div>
              </div>
            </div>

            {/* Case Documents */}
            <div className="rounded-xl border bg-white shadow-sm">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold">Case Documents</h2>
                <button
                  onClick={openUploadDocs}
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  <FileUp size={16} /> Upload Documents
                </button>
              </div>

              <div className="divide-y">
                {caseData.documents.map((doc, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-3">
                      <FileText size={20} className="text-gray-500" />
                      <span className="font-medium text-gray-900">
                        {doc.name}
                      </span>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800">
                      <Download size={16} /> Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

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
                {caseData.timeline.map((event) => (
                  <div key={event.id} className="relative pl-10">
                    <div className="absolute left-3 top-1.5 h-4 w-4 rounded-full border-4 border-indigo-600 bg-white" />
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {event.title}
                        </h4>
                        <p className="mt-1 text-sm text-gray-600">
                          {event.description}
                        </p>
                        <p className="mt-2 text-xs text-gray-500">
                          {event.date}
                        </p>
                      </div>
                      <button
                        onClick={() => openEditTimeline(event.id)}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Edit
                      </button>
                    </div>

                    {event.documents.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {event.documents.map((d, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-1.5 rounded bg-gray-100 px-2.5 py-1 text-xs"
                          >
                            <FileText size={14} /> {d.name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Status Summary */}
          <div className="space-y-6">
            <div className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold">Case Status</h3>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-1.5 text-sm font-medium text-green-800">
                In Progress
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Last update: {caseData.lastUpdated}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {openModal === "edit-overview" && (
        <EditOverviewModal caseData={caseData} onClose={closeModal} />
      )}

      {openModal === "edit-note" && (
        <EditNoteModal note={caseData.note} onClose={closeModal} />
      )}

      {openModal === "upload-docs" && (
        <UploadDocumentsModal caseData={caseData} onClose={closeModal} />
      )}

      {openModal === "timeline" && (
        <TimelineModal
          isEdit={!!editingTimelineId}
          initialData={
            editingTimelineId
              ? caseData.timeline.find((t) => t.id === editingTimelineId)
              : undefined
          }
          onClose={closeModal}
        />
      )}
    </div>
  );
}
