// CreateCaseModal.tsx
import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import CommonSelect from "@/common/CommonSelect";
import { useCreateCaseMutation } from "@/redux/features/admin/case/caseApi";
import { useGetAlCasesQuery } from "@/redux/features/admin/clientAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pause, SquareX, Trash2, UploadCloud, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const inputClass = {
  input:
    "w-full rounded-[10px] border border-[#D4D6D8] px-3 py-2 text-base text-[#BFC3C5] outline-none ",
  label: "block text-base font-medium text-[#313436] mb-2",
  error: "text-red-500 text-sm mt-1",
};

const CASE_STATUSES = [
  "In Bearbeitung",
  "Fall bei der Versicherung eingereicht",
  "Fall abgeschlossen",
  "Entscheidung der Versicherung noch ausstehend",
  "Vorschadenproblematik",
  "Ermittlungsakte wurde angefordert",
  "Versicherungsnehmer hat Schaden noch nicht gemeldet",
] as const;

// Zod schema
const caseSchema = z.object({
  title: z.string().min(3, "Title is required"),
  client_user_id: z.string().min(2, "Client is required"),
  clientName: z.string().min(2, "Client Name is required"),
  status: z.enum(CASE_STATUSES),
  date: z.string().nonempty("Date is required"),
  note: z.string().optional(),
});

type CaseFormValues = z.infer<typeof caseSchema>;

interface UploadedFile {
  id: string;
  name: string;
  file: File;
  status: "uploading" | "completed" | "error";
  progress?: number;
}

interface CreateCaseModalProps {
  onClose: () => void;
}

const wwwwwwCreateCaseModal: React.FC<CreateCaseModalProps> = ({ onClose }) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [createCase, { isLoading: isCreating }] = useCreateCaseMutation();
  const { data } = useGetAlCasesQuery();

  const clientsOptions =
    data?.data.cases.map((client) => ({
      label: client.clientName,
      value: client.client_user_id,
    })) || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      title: "",
      clientName: "",
      status: "In Bearbeitung",
      date: "",
      note: "",
    },
  });

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

  const onSubmit: SubmitHandler<CaseFormValues> = async (data) => {
    const payload = {
      client_user_id: data.client_user_id,
      clientName: data.clientName,
      caseTitle: data.title,
      caseStatus: data.status,
      coatDate: data.date,
      note: data.note,
      vehicleNumber: "ABC123",
      assetListData: files.map((f) => ({
        assetName: f.name,
        uploadDate: new Date().toISOString(),
      })),
    };
    // FormData for file upload
    const formData = new FormData();
    files.forEach((f) => formData.append("files", f.file));
    formData.append("data", JSON.stringify(payload));

    try {
      const response = await createCase(formData).unwrap();
      toast.success(response.message);

      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
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
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Two column fields */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={inputClass.label}>Case Title</label>
              <input
                type="text"
                placeholder="Enter case title"
                {...register("title")}
                className={inputClass.input}
              />
              {errors.title && (
                <p className={inputClass.error}>{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className={inputClass.label}>Client Name</label>
              <input
                type="text"
                placeholder="Enter client name"
                {...register("clientName")}
                className={inputClass.input}
              />
              {errors.clientName && (
                <p className={inputClass.error}>{errors.clientName.message}</p>
              )}
            </div>
          </div>

          {/* Case Status */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className={inputClass.label}>Select Client</label>
              <Controller
                control={control}
                name="client_user_id"
                render={({ field }) => (
                  <CommonSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    item={clientsOptions}
                    className="w-full"
                  />
                )}
              />
              {errors.status && (
                <p className={inputClass.error}>{errors.status.message}</p>
              )}
            </div>
            <div>
              <label className={inputClass.label}>Case Status</label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CommonSelect
                    value={field.value}
                    onValueChange={field.onChange}
                    item={CASE_STATUSES.map((status) => ({
                      label: status,
                      value: status,
                    }))}
                    className="w-full"
                  />
                )}
              />
              {errors.status && (
                <p className={inputClass.error}>{errors.status.message}</p>
              )}
            </div>
          </div>

          {/* Date */}
          <div>
            <label className={inputClass.label}>Date</label>
            <input
              type="date"
              {...register("date")}
              className={inputClass.input}
            />
            {errors.date && (
              <p className={inputClass.error}>{errors.date.message}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className={inputClass.label}>Upload Documents</label>

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

          {/* Note */}
          <div>
            <label className={inputClass.label}>Note</label>
            <textarea
              {...register("note")}
              rows={4}
              placeholder="Add note"
              className={inputClass.input}
            />
            {errors.note && (
              <p className={inputClass.error}>{errors.note.message}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <CommonButton onClick={onClose} variant="secondary" type="button">
              Cancel
            </CommonButton>
            <CommonButton type="submit" disabled={isCreating}>
              Submit
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default wwwwwwCreateCaseModal;
