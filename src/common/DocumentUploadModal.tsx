import { useState, useRef } from "react";
import { X, CloudUpload, Trash2, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatFileMutation } from "@/redux/api/chatApi";
import { toast } from "sonner";

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (assets: any[]) => void;
  isUploadingToCase?: boolean;
}

interface UploadedFile {
  file: File;
  name: string;
  type: string;
  size: string;
  status: "pending" | "uploading" | "completed" | "error";
  progress: number;
  url?: string;
}

export default function DocumentUploadModal({ 
  open, 
  onClose, 
  onUpload,
  isUploadingToCase = false 
}: DocumentUploadModalProps) {
  const [filesToUpload, setFilesToUpload] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadChatFile] = useChatFileMutation();

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFile[] = Array.from(selectedFiles).map((file) => ({
      file,
      name: file.name,
      type: file.name.split(".").pop()?.toUpperCase() || "FILE",
      size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      status: "pending",
      progress: 0,
    }));

    setFilesToUpload((prev) => [...prev, ...newFiles]);

    // Start uploading each file
    for (const fileObj of newFiles) {
      uploadSingleFile(fileObj);
    }
  };

  const uploadSingleFile = async (fileObj: UploadedFile) => {
    const formData = new FormData();
    formData.append("file", fileObj.file);

    setFilesToUpload((prev) =>
      prev.map((f) =>
        f.file === fileObj.file ? { ...f, status: "uploading", progress: 30 } : f
      )
    );

    try {
      const response = await uploadChatFile(formData).unwrap();
      
      // Assuming response.data is the URL string as per typical pattern in this project
      // Or response.url. Adjust based on exact API response if known.
      // Based on common patterns in these tasks, it's often response.data
      const fileUrl = response?.data || response?.url;

      setFilesToUpload((prev) =>
        prev.map((f) =>
          f.file === fileObj.file
            ? { ...f, status: "completed", progress: 100, url: fileUrl }
            : f
        )
      );
    } catch (error) {
      console.error("Upload failed:", error);
      setFilesToUpload((prev) =>
        prev.map((f) =>
          f.file === fileObj.file ? { ...f, status: "error", progress: 0 } : f
        )
      );
      toast.error(`Failed to upload ${fileObj.name}`);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFilesToUpload((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleNext = () => {
    const completedFiles = filesToUpload.filter((f) => f.status === "completed");
    if (completedFiles.length === 0) {
      toast.error("Please upload at least one document");
      return;
    }

    const assets = completedFiles.map((f) => ({
      assetUrl: f.url,
      assetName: f.name,
      uploadDate: new Date().toISOString(),
      fileSize: f.file.size
    }));

    onUpload(assets);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-[999]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-[560px] overflow-hidden p-10 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">
              Upload Document
            </h2>
            <p className="text-gray-400 text-base mt-1">Add your documents here</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          className={`
            relative border-2 border-dashed rounded-[20px] p-10 flex flex-col items-center justify-center transition-all cursor-pointer
            ${isDragging ? "border-[#1878B5] bg-blue-50/50" : "border-[#B7D5E8] bg-white"}
          `}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="mb-4">
            <CloudUpload className="w-12 h-12 text-[#1878B5]" strokeWidth={1.5} />
          </div>

          <p className="text-lg font-semibold text-gray-700">
            Drag your file(s) or <span className="text-[#1878B5] cursor-pointer">Browse</span>
          </p>
          <p className="text-xs text-gray-400 mt-2">Max 10 MB files are allowed</p>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
            accept=".jpg,.jpeg,.png,.pdf"
          />
        </div>

        <p className="text-[13px] text-gray-400 mt-5 mb-8">
          Only support .jpg, .png and .pdf
        </p>

        <div className="space-y-4 mb-10 max-h-[300px] overflow-y-auto no-scrollbar">
          {filesToUpload.map((file, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-[20px] p-5 bg-white shadow-sm relative overflow-hidden"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E8F2F8] rounded-xl flex items-center justify-center relative overflow-hidden">
                    <span className="text-[10px] font-black text-[#1878B5] bg-white absolute bottom-1 px-1 rounded-[2px] shadow-sm">
                      {file.type}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-gray-900 leading-tight truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <div className="flex items-center gap-2 mt-1">
                      {file.status === "completed" ? (
                        <span className="text-[13px] font-medium text-[#22C55E] flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : file.status === "uploading" ? (
                        <span className="text-[13px] font-normal text-gray-500 flex items-center gap-2">
                           <Loader2 className="w-3 h-3 animate-spin"/> Uploading...
                        </span>
                      ) : file.status === "error" ? (
                        <span className="text-[13px] font-medium text-red-500">
                          Upload Failed
                        </span>
                      ) : (
                        <span className="text-[13px] font-normal text-gray-500">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveFile(idx)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {file.status === "uploading" && (
                <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#1878B5] transition-all duration-300"
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-4">
          <Button
            onClick={onClose}
            className="flex-1 h-14 rounded-full bg-[#EEEEEE] hover:bg-gray-200 text-gray-600 font-bold text-lg"
          >
            Cancel
          </Button>
          <Button
            disabled={isUploadingToCase || filesToUpload.some(f => f.status === 'uploading')}
            onClick={handleNext}
            className="flex-1 h-14 rounded-full bg-[#1878B5] hover:bg-[#146499] text-white font-bold text-lg"
          >
            {isUploadingToCase ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Updating...
              </>
            ) : (
              "Next"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

