// CreateCaseModal.tsx
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
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4  ">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Create New Case
          </h2>
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
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Case Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter case title"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Client Name
              </label>
              <input
                type="text"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Enter client name"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Case Type
              </label>
              <select
                name="caseType"
                value={formData.caseType}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition bg-white"
              >
                <option value="" disabled>
                  Select case type
                </option>
                <option value="civil">Civil</option>
                <option value="criminal">Criminal</option>
                <option value="family">Family</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Case Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition bg-white"
              >
                <option value="" disabled>
                  Select status
                </option>
                <option value="new">New</option>
                <option value="in-progress">In Progress</option>
                <option value="pending">Pending</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Date */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            />
          </div>

          {/* File Upload */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Upload Documents
            </label>

            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center hover:border-indigo-400 transition-colors">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-3 text-sm text-gray-600">
                <span className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer">
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
                className="mt-4 inline-flex cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
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
                                className="h-full bg-indigo-600 transition-all duration-300"
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
            <label className="mb-1.5 block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleInputChange}
              rows={4}
              placeholder="Add note"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCaseModal;
