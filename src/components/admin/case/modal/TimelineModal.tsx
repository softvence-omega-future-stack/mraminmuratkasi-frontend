import CommonButton from "@/common/CommonButton";
import CommonHeader from "@/common/CommonHeader";
import { useCreateCaseMutation } from "@/redux/features/admin/clientAPI";
import { GetCaseDetailsResponse } from "@/redux/features/admin/singleCase";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const inputClass = {
  input:
    "w-full rounded-[10px] border border-[#D4D6D8] px-3 py-2 text-base text-[#BFC3C5] outline-none ",
  label: "block text-base font-medium text-[#313436] mb-2",
  error: "text-red-500 text-sm mt-1",
};

// Zod schema matching backend requirements
const timelineSchema = z.object({
  title: z.string().min(3, "Titel ist erforderlich"),
  description: z.string().min(10, "Beschreibung ist erforderlich"),
  date: z.string().nonempty("Datum ist erforderlich"),
});

type TimelineFormValues = z.infer<typeof timelineSchema>;

interface TimelineModalProps {
  onClose: () => void;
  singleCase: GetCaseDetailsResponse;
}

const TimelineModal: React.FC<TimelineModalProps> = ({
  onClose,
  singleCase,
}) => {
  const [updateTimeline, { isLoading }] = useCreateCaseMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TimelineFormValues>({
    resolver: zodResolver(timelineSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
    },
  });

  const onSubmit: SubmitHandler<TimelineFormValues> = async (data) => {
    const payload = {
      caseOverviewId: singleCase.data.caseOverview._id,
      timelineData: {
        title: data.title,
        description: data.description,
        date: data.date,
      },
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(payload));

    try {
      const response = await updateTimeline(formData).unwrap();
      toast.success(response.message || "Timeline erfolgreich hinzugefügt");
      onClose();
    } catch (err: any) {
      toast.error(
        err?.data?.message || "Timeline konnte nicht hinzugefügt werden",
      );
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl overflow-y-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <CommonHeader size="xl" className="text-[#0F1010]">
            Timeline hinzufügen
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
          {/* Title */}
          <div>
            <label className={inputClass.label}>Titel der Timeline</label>
            <input
              type="text"
              placeholder="Titel der Timeline eingeben"
              {...register("title")}
              className={inputClass.input}
            />
            {errors.title && (
              <p className={inputClass.error}>{errors.title.message}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className={inputClass.label}>Beschreibung</label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Beschreibung der Timeline eingeben"
              className={inputClass.input}
            />
            {errors.description && (
              <p className={inputClass.error}>{errors.description.message}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className={inputClass.label}>Datum</label>
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
              Abbrechen
            </CommonButton>
            <CommonButton type="submit" disabled={isLoading}>
              {isLoading ? "Senden..." : "Timeline hinzufügen"}
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TimelineModal;
