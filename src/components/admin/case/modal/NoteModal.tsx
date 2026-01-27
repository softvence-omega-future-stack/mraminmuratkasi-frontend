import CommonButton from "@/common/CommonButton";
import { useUpdateCasesMutation } from "@/redux/features/admin/clientAPI";
import { GetCaseDetailsResponse } from "@/redux/features/admin/singleCase";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const inputClass = {
  input:
    "w-full rounded-[10px] border border-[#D4D6D8] px-3 py-2 text-base text-[#BFC3C5] outline-none ",
  label: "block text-base font-medium text-[#313436] mb-2",
  error: "text-red-500 text-sm mt-1",
};

// Zod schema
const caseSchema = z.object({
  note: z.string().min(1, "Note is required"),
});

type CaseFormValues = z.infer<typeof caseSchema>;
interface CreateCaseModalProps {
  onClose: () => void;
  singleCase: GetCaseDetailsResponse;
}

const NoteModal: React.FC<CreateCaseModalProps> = ({ onClose, singleCase }) => {
  const [overviewUpdate, { isLoading }] = useUpdateCasesMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CaseFormValues>({
    resolver: zodResolver(caseSchema),
    defaultValues: {
      note: singleCase.data.caseOverview.note || "",
    },
  });
  const onSubmit: SubmitHandler<CaseFormValues> = async (data) => {
    try {
      if (!singleCase.data.caseOverview._id) return;
      const response = await overviewUpdate({
        id: singleCase.data.caseOverview._id,
        data: data,
      }).unwrap();
      toast.success(response.message);

      onClose();
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-2xl p-6 ">
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <div className="flex justify-end gap-3 pt-4">
            <CommonButton onClick={onClose} variant="secondary" type="button">
              Cancel
            </CommonButton>
            <CommonButton type="submit" disabled={isLoading}>
              Update Note
            </CommonButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
