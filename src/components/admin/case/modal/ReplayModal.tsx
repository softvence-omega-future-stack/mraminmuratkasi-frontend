import { usePostNotificationFromAdminMutation } from "@/redux/api/notificationApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
export const notificationSchema = z.object({
  notificationMessage: z
    .string()
    .min(5, "Message must be at least 5 characters"),
});

export type NotificationFormValues = z.infer<typeof notificationSchema>;

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
}

const ReplayModal = ({ isOpen, onClose, userId }: NotificationModalProps) => {
  const [postNotification, { isLoading }] =
    usePostNotificationFromAdminMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      notificationMessage: "",
    },
  });

  const onSubmit = async (data: NotificationFormValues) => {
    try {
      if (!userId) return;
      await postNotification({
        receiverList: [userId],
        notificationMessage: data.notificationMessage,
      }).unwrap();

      toast.success(
        data.notificationMessage || "Notification sent successfully!",
      );

      reset();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Send Notification</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-500 cursor-pointer" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Message */}
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea
              rows={4}
              className="w-full border rounded-md p-2 text-sm resize-none"
              placeholder="Enter your message..."
              {...register("notificationMessage")}
            />
            {errors.notificationMessage && (
              <p className="text-xs text-red-500 mt-1">
                {errors.notificationMessage.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm border rounded-md cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-black text-white rounded-md disabled:opacity-50 cursor-pointer"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReplayModal;
