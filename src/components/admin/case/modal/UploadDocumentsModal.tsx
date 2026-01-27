import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import { useCreateCaseMutation } from "@/redux/features/admin/clientAPI";
import { GetCaseDetailsResponse } from "@/redux/features/admin/singleCase";
import { Pause, SquareX, Trash2, UploadCloud, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface UploadedFile {
  id: string;
  name: string;
  file: File;
  status: "uploading" | "completed" | "error";
  progress?: number;
}

interface CreateCaseModalProps {
  onClose: () => void;
  singleCase: GetCaseDetailsResponse;
}

const UploadDocumentsModal: React.FC<CreateCaseModalProps> = ({
  onClose,
  singleCase,
}) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploadDocument, { isLoading }] = useCreateCaseMutation();
  const singleCaseData = singleCase?.data.caseOverview;

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles: UploadedFile[] = Array.from(e.target.files).map(
        (file) => ({
          id: crypto.randomUUID(),
          name: file.name,
          file,
          status: "uploading",
          progress: 0,
        }),
      );

      setFiles((prev) => [...prev, ...newFiles]);

      newFiles.forEach((file) => {
        setInterval(() => {
          setFiles((prev) =>
            prev.map((f) =>
              f.id === file.id
                ? {
                    ...f,
                    progress: f.progress! + 10 > 100 ? 100 : f.progress! + 10,
                    status: f.progress! + 10 >= 100 ? "completed" : "uploading",
                  }
                : f,
            ),
          );
        }, 200);
      });
    }
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f.file));
    formData.append(
      "data",
      JSON.stringify({
        caseOverviewId: singleCaseData._id,
        assetListData: [
          {
            assetName: files[0].name,
            uploadDate: new Date().toISOString(),
          },
        ],
      }),
    );

    try {
      const response = await uploadDocument(formData).unwrap();
      toast.success(response.message);

      onClose();
    } catch (err: any) {
      toast.error(err?.message || "Failed to upload document");

      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between  px-6 py-4">
          <CommonHeader size="xl" className="text-[#0F1010]">
            Upload Document
          </CommonHeader>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 hover:bg-gray-100 cursor-pointer"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <form className="p-6 space-y-6">
          {/* File Upload */}
          <div>
            <div className="rounded-lg border-2 border-dashed border-[#1878B5] p-8 text-center transition-colors cursor-pointer">
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

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <CommonButton onClick={onClose} variant="secondary" type="button">
              Cancel
            </CommonButton>
            <CommonButton onClick={handleUpload} disabled={isLoading}>
              Upload Documents
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadDocumentsModal;
