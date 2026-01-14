"use client";

import { useState, useRef } from "react";
import { X, Upload, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (document: { name: string; type: string; size: string }) => void;
}

interface UploadedFile {
  file: File;
  name: string;
  type: string;
  size: string;
  status: "uploading" | "success" | "error";
}

export default function DocumentUploadModal({ open, onClose, onUpload }: DocumentUploadModalProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const getFileType = (filename: string): string => {
    const extension = filename.split('.').pop()?.toLowerCase();
    const typeMap: { [key: string]: string } = {
      'pdf': 'PDF',
      'doc': 'DOC',
      'docx': 'DOCX',
      'jpg': 'JPG',
      'jpeg': 'JPEG',
      'png': 'PNG',
      'txt': 'TXT'
    };
    return typeMap[extension || ''] || 'FILE';
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newFiles: UploadedFile[] = Array.from(files).map(file => ({
      file,
      name: file.name,
      type: getFileType(file.name),
      size: formatFileSize(file.size),
      status: "uploading"
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload process
    newFiles.forEach((fileObj, index) => {
      setTimeout(() => {
        setUploadedFiles(prev => {
          const updated = [...prev];
          const fileIndex = prev.findIndex(f => f.name === fileObj.name);
          if (fileIndex !== -1) {
            updated[fileIndex] = {
              ...fileObj,
              status: Math.random() > 0.1 ? "success" : "error"
            };
          }
          return updated;
        });
      }, 1000 + index * 500);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleUpload = () => {
    const successfulFiles = uploadedFiles.filter(f => f.status === "success");
    successfulFiles.forEach(file => {
      onUpload({
        name: file.name,
        type: file.type,
        size: file.size
      });
    });
    setUploadedFiles([]);
    onClose();
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = () => {
    return <FileText className="w-5 h-5 text-blue-600" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      case "uploading":
        return <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default:
        return null;
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="w-6 h-6 text-blue-600" />
            </div>
            
            <p className="text-gray-900 font-medium mb-2">
              Drag and drop your files here
            </p>
            <p className="text-gray-500 text-sm mb-4">
              or click to browse from your computer
            </p>
            
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="text-[#1878B5] border-[#1878B5] hover:bg-[#1878B5] hover:text-white"
            >
              Choose Files
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              multiple
              onChange={handleFileInputChange}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
            />
            
            <p className="text-xs text-gray-400 mt-4">
              Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT (Max 10MB per file)
            </p>
          </div>

          {/* Uploaded Files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Uploaded Files ({uploadedFiles.length})
              </h3>
              
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      {getFileIcon()}
                      <div>
                        <p className="text-sm font-medium text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">
                          {file.type} • {file.size}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(file.status)}
                      {file.status !== "uploading" && (
                        <button
                          onClick={() => removeFile(index)}
                          className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-600">
            {uploadedFiles.length > 0 && (
              <>
                {uploadedFiles.filter(f => f.status === "success").length} of {uploadedFiles.length} files ready
              </>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            
            <Button
              onClick={handleUpload}
              disabled={uploadedFiles.filter(f => f.status === "success").length === 0}
              className="bg-[#1878B5] hover:bg-[#1878D9] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload {uploadedFiles.filter(f => f.status === "success").length} Files
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
