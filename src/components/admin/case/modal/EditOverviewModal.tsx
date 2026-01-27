// CreateCaseModal.tsx
import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import CommonSelect from "@/common/CommonSelect";
import {
  useGetAllUserQuery,
  useUpdateCasesMutation,
} from "@/redux/features/admin/clientAPI";
import { GetCaseDetailsResponse } from "@/redux/features/admin/singleCase";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
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
});

type CaseFormValues = z.infer<typeof caseSchema>;

interface CreateCaseModalProps {
  onClose: () => void;
  singleCase: GetCaseDetailsResponse;
}

const EditOverviewModal: React.FC<CreateCaseModalProps> = ({
  onClose,
  singleCase,
}) => {
  const [overviewUpdate, { isLoading }] = useUpdateCasesMutation();
  const { data: userData } = useGetAllUserQuery();

  const clientsOptions =
    userData?.data.map((client) => ({
      label: client.name,
      value: client._id,
    })) || [];

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      title: singleCase.data.caseOverview.caseTitle || "",
      clientName: singleCase.data.caseOverview.clientName || "",
      status: singleCase.data.caseOverview.case_status || "In Bearbeitung",
      date: singleCase.data.caseOverview.coatDate || "",
    },
  });

  const onSubmit: SubmitHandler<CaseFormValues> = async (data) => {
    const payload = {
      clientName: data.clientName,
      caseTitle: data.title,
      caseStatus: data.status,
      coatDate: data.date,
    };

    try {
      const response = await overviewUpdate({
        id: singleCase.data.caseOverview._id,
        data: payload,
      }).unwrap();
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
            Edit Case Overview
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

          {/* Footer */}
          <div className="flex justify-end gap-3 pt-4">
            <CommonButton onClick={onClose} variant="secondary" type="button">
              Cancel
            </CommonButton>
            <CommonButton type="submit" disabled={isLoading}>
              Update Overview
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOverviewModal;
