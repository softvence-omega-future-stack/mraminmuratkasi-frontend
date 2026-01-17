// CreateCaseModal.tsx
import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import CommonSelect from "@/common/CommonSelect";
import { Pause, SquareX, Trash2, UploadCloud, X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";

interface UploadedFile {
  id: string;
  name: string;
  status: "uploading" | "completed" | "error";
  progress?: number;
}

interface CreateCaseModalProps {
  onClose: () => void;
}
const CreateCaseModal: React.FC<CreateCaseModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    clientName: "",
    caseType: "",
    status: "",
    date: "2026-01-02",
    note: "",
  });

  const [files, setFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "Evidence.jpg",
      status: "completed",
      progress: 100,
    },
    {
      id: "2",
      name: "Contract.pdf",
      status: "uploading",
      progress: 65,
    },
  ]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // In real app → upload logic here
      console.log("Selected files:", Array.from(e.target.files));
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Submitting case:", formData, files);
    // API call here
  };
  const inputClass = {
    input:
      "w-full rounded-[10px] border border-[#D4D6D8] px-3 py-2 text-base text-[#BFC3C5] outline-none ",
    label: "block text-base font-medium text-[#313436] mb-2",
    error: "text-red-500 text-sm mt-1",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4  ">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4 ">
          <CommonHeader size="xl" className="text-[#0F1010]">
            Create New Case
          </CommonHeader>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 cursor-pointer"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Two column fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={inputClass.label}>Case Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter case title"
                className={inputClass.input}
              />
            </div>

            <div>
              <label className={inputClass.label}>Client Name</label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Enter client name"
                className={inputClass.input}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={inputClass.label}>Case Type</label>
              <CommonSelect
                value={formData.caseType}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, caseType: val }))
                }
                item={[
                  { label: "InProgress", value: "InProgress" },
                  {
                    label: "Letter sent to insurance",
                    value: "Letter sent to insurance",
                  },
                  { label: "Set Court Date", value: "Set Court Date" },
                ]}
                className="w-full"
              />
            </div>

            <div>
              <label className={inputClass.label}>Case Status</label>
              <CommonSelect
                value={formData.status}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, status: val }))
                }
                item={[
                  { label: "Traffic Violation", value: "Traffic Violation" },
                  { label: "license Suspension", value: "License Suspension" },
                  { label: "Reckless Driving", value: "Reckless Driving" },
                  { label: "Hit and Run", value: "Hit and Run" },
                  {
                    label: "Driving without license",
                    value: "Parking Violation ",
                  },
                  { label: "Hit and Run", value: "Hit and Run" },
                ]}
                className="w-full"
              />
            </div>
          </div>

          {/* Date */}
          <div>
            <label className={inputClass.label}>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className={inputClass.input}
            />
          </div>

          {/* File Upload */}
          <div>
            <label className={inputClass.label}>Upload Documents</label>

            <div className="rounded-lg border-2 border-dashed border-[#1878B5] p-8 text-center  transition-colors cursor-pointer">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-3 text-sm text-gray-600">
                <span className="font-medium text-[#1878B5] cursor-pointer">
                  Browse
                </span>{" "}
                or drag your file(s) here
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Max 10 files • jpg, png, pdf • 10 MB max per file
              </p>
              <input
                type="file"
                multiple
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="mt-4 inline-flex cursor-pointer rounded-md bg-[#1878B5] px-4 py-2 text-sm font-medium text-white "
              >
                Select Files
              </label>
            </div>

            {/* Uploaded files preview */}
            {files.length > 0 && (
              <div className="mt-4 space-y-3">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {file.name}
                        </p>
                        {file.status === "completed" && (
                          <span className="text-xs font-medium text-green-700">
                            Completed
                          </span>
                        )}
                      </div>

                      {file.status === "uploading" &&
                        file.progress !== undefined && (
                          <div className="mt-2">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                              <div
                                className="h-full bg-[#1878B5] transition-all duration-300"
                                style={{ width: `${file.progress}%` }}
                              />
                            </div>
                            <div className="mt-1 flex items-center justify-between text-xs text-gray-500">
                              <span>{file.progress}%</span>
                              <span>~30 seconds remaining</span>
                            </div>
                          </div>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                      {file.status === "uploading" && (
                        <>
                          <button
                            type="button"
                            className="p-1 text-gray-500 hover:text-gray-700"
                          >
                            <Pause size={18} />
                          </button>
                          <button
                            type="button"
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <SquareX size={18} />
                          </button>
                        </>
                      )}
                      <button
                        type="button"
                        onClick={() => removeFile(file.id)}
                        className="p-1 text-gray-500 hover:text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Note */}
          <div>
            <label className={inputClass.label}>Note</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              rows={4}
              placeholder="Add note"
              className={inputClass.input}
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 ">
            <CommonButton variant="secondary" type="button">
              Cancel
            </CommonButton>
            <CommonButton type="submit">Submit</CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCaseModal;
