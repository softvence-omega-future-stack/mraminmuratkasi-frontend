import { useState, useRef } from "react";
import { X, CloudUpload, Trash2, PauseCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (document: { name: string; type: string; size: string }) => void;
}

interface UploadedFile {
  file?: File;
  name: string;
  type: string;
  size: string;
  status: "uploading" | "completed" | "error";
  progress: number;
}

export default function DocumentUploadModal({ open, onClose, onUpload }: DocumentUploadModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      name: "Evidence.jpg",
      type: "JPG",
      size: "2.4 MB",
      status: "completed",
      progress: 100,
    },
    {
      name: "Uploading...",
      type: "FILE",
      size: "0 MB",
      status: "uploading",
      progress: 65,
    }
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;
    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      file,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
      size: (file.size / (1024 * 1024)).toFixed(1) + " MB",
      status: "uploading",
      progress: 0
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
    // Mock upload progress
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

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/20 flex items-center justify-center p-4 z-[999]"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-[40px] shadow-2xl w-full max-w-[560px] overflow-hidden p-10 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 leading-tight">Upload Document</h2>
            <p className="text-gray-400 text-base mt-1">Add your documents here</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Drag & Drop Area */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
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

        {/* Files List */}
        <div className="space-y-4 mb-10 max-h-[300px] overflow-y-auto no-scrollbar">
          {uploadedFiles.map((file, idx) => (
            <div key={idx} className="border border-gray-100 rounded-[20px] p-5 bg-white shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E8F2F8] rounded-xl flex items-center justify-center relative overflow-hidden">
                     <span className="text-[10px] font-black text-[#1878B5] bg-white absolute bottom-1 px-1 rounded-[2px] shadow-sm">{file.type}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-bold text-gray-900 leading-tight">{file.name}</span>
                    <div className="flex items-center gap-2 mt-1">
                      {file.status === "completed" ? (
                        <span className="text-[13px] font-medium text-[#22C55E]">Completed</span>
                      ) : (
                        <span className="text-[13px] font-normal text-gray-500">
                          {file.progress}% • 30 seconds remaining
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {file.status === "completed" ? (
                    <button className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400">
                        <PauseCircle className="w-5 h-5" />
                      </button>
                      <button className="text-[#FE4F4F]">
                        <XCircle className="w-5 h-5 fill-[#FE4F4F] text-white" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 ${file.status === "completed" ? "bg-[#1878B5]" : "bg-[#1878B5]"}`}
                  style={{ width: `${file.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex gap-4">
          <Button
            onClick={onClose}
            className="flex-1 h-14 rounded-full bg-[#EEEEEE] hover:bg-gray-200 text-gray-600 font-bold text-lg"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
                onUpload({ name: "Document.pdf", type: "PDF", size: "2.5 MB" });
                onClose();
            }}
            className="flex-1 h-14 rounded-full bg-[#1878B5] hover:bg-[#146499] text-white font-bold text-lg"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
