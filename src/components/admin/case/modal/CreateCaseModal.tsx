import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import CommonSelect from "@/common/CommonSelect";
import { useCreateCaseMutation } from "@/redux/features/admin/case/caseApi";
import { useGetAlCasesQuery } from "@/redux/features/admin/clientAPI";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2, UploadCloud, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CASE_STATUSES = [
  "In Bearbeitung",
  "Fall bei der Versicherung eingereicht",
  "Fall abgeschlossen",
  "Entscheidung der Versicherung noch ausstehend",
  "Vorschadenproblematik",
  "Ermittlungsakte wurde angefordert",
  "Versicherungsnehmer hat Schaden noch nicht gemeldet",
] as const;
export const caseSchema = z.object({
  clientName: z.string().min(1, "Client name is required"),
  client_user_id: z.string().min(1, "Client user ID is required"),
  caseTitle: z.string().min(1, "Case title is required"),
  caseStatus: z.enum(CASE_STATUSES),
  coatDate: z.string().min(1, "Court date is required"),
  note: z.string().min(1, "Note is required"),
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
});

export type CaseFormData = z.infer<typeof caseSchema>;

const inputClass = {
  input:
    "w-full rounded-[10px] border border-[#D4D6D8] px-3 py-2 text-base outline-none",
  label: "block text-base font-medium text-[#313436] mb-2",
  error: "text-red-500 text-sm mt-1",
};

interface UploadedFile {
  id: string;
  file: File;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCaseModal = ({ isOpen, onClose }: Props) => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [createCase, { isLoading }] = useCreateCaseMutation();

  /* -------- BACKEND DATA (LIKE wwwwwwCreateCaseModal) -------- */
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
  } = useForm<CaseFormData>({
    resolver: zodResolver(caseSchema),
  });

  if (!isOpen) return null;

  /* ---------------- FILE HANDLING ---------------- */

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      file,
    }));

    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  /* ---------------- SUBMIT ---------------- */

  const onSubmit = async (data: CaseFormData) => {
    const payload = {
      clientName: data.clientName,
      client_user_id: data.client_user_id,
      caseTitle: data.caseTitle,
      caseStatus: data.caseStatus,
      coatDate: data.coatDate,
      note: data.note,
      vehicleNumber: data.vehicleNumber,
      assetListData: files.map((f) => ({
        assetName: f.file.name,
        uploadDate: new Date().toISOString(),
      })),
    };

    const formData = new FormData();
    files.forEach((f) => formData.append("files", f.file));
    formData.append("data", JSON.stringify(payload));

    try {
      const res = await createCase(formData).unwrap();
      toast.success(res?.message || "Case created successfully");
      onClose();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to create case");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <CommonHeader size="xl">Create New Case</CommonHeader>
          <button onClick={onClose}>
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-5">
          {/* Case Title */}
          <div>
            <label className={inputClass.label}>Case Title</label>
            <input {...register("caseTitle")} className={inputClass.input} />
            {errors.caseTitle && (
              <p className={inputClass.error}>{errors.caseTitle.message}</p>
            )}
          </div>

          {/* Client Name */}
          <div>
            <label className={inputClass.label}>Client Name</label>
            <input {...register("clientName")} className={inputClass.input} />
            {errors.clientName && (
              <p className={inputClass.error}>{errors.clientName.message}</p>
            )}
          </div>

          {/* Client User ID (FROM BACKEND) */}
          <div>
            <label className={inputClass.label}>Select Client</label>
            <Controller
              name="client_user_id"
              control={control}
              render={({ field }) => (
                <CommonSelect
                  value={field.value}
                  onValueChange={field.onChange}
                  item={clientsOptions}
                  className="w-full"
                />
              )}
            />
            {errors.client_user_id && (
              <p className={inputClass.error}>
                {errors.client_user_id.message}
              </p>
            )}
          </div>

          {/* Case Status (FROM BACKEND STYLE) */}
          <div>
            <label className={inputClass.label}>Case Status</label>
            <Controller
              name="caseStatus"
              control={control}
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
            {errors.caseStatus && (
              <p className={inputClass.error}>{errors.caseStatus.message}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className={inputClass.label}>Court Date</label>
            <input
              type="datetime-local"
              {...register("coatDate")}
              className={inputClass.input}
            />
            {errors.coatDate && (
              <p className={inputClass.error}>{errors.coatDate.message}</p>
            )}
          </div>

          {/* Vehicle Number */}
          <div>
            <label className={inputClass.label}>Vehicle Number</label>
            <input
              {...register("vehicleNumber")}
              className={inputClass.input}
            />
            {errors.vehicleNumber && (
              <p className={inputClass.error}>{errors.vehicleNumber.message}</p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <label className={inputClass.label}>Upload Documents</label>

            <div className="rounded-lg border-2 border-dashed border-[#1878B5] p-6 text-center">
              <UploadCloud className="mx-auto h-8 w-8 text-gray-400" />
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="mt-3 inline-block cursor-pointer rounded bg-[#1878B5] px-4 py-2 text-white"
              >
                Choose Files
              </label>
            </div>

            {files.length > 0 && (
              <div className="mt-3 space-y-2">
                {files.map((f) => (
                  <div
                    key={f.id}
                    className="flex items-center justify-between border rounded px-3 py-2"
                  >
                    <span className="truncate text-sm">{f.file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(f.id)}
                      className="text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Note */}
          <div>
            <label className={inputClass.label}>Note</label>
            <textarea {...register("note")} className={inputClass.input} />
            {errors.note && (
              <p className={inputClass.error}>{errors.note.message}</p>
            )}
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <CommonButton variant="secondary" type="button" onClick={onClose}>
              Cancel
            </CommonButton>
            <CommonButton type="submit" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit"}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCaseModal;
