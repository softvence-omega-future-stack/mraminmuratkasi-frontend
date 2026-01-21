import { X, Trash2, Loader2 } from "lucide-react";

interface Notification {
  id: string | number;
  message: string;
  time: string;
  unread?: boolean;
  avatar: string;
  type?: "message" | "other"; // Added type for redirection logic
}

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  onDelete: (id: string | number) => void;
  onView?: (notif: Notification) => void;
  deletingId?: string | number | null; // Added
  viewingId?: string | number | null; // Added
}

export default function NotificationModal({
  open,
  onClose,
  notifications,
  onDelete,
  onView,
  deletingId,
  viewingId,
}: NotificationModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      {/* Modal Dropdown */}
      <div
        className="absolute right-[190px] top-[90px] w-[420px] max-h-[520px] bg-white rounded-2xl shadow-xl border overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Notification List */}
        <div className="overflow-y-auto max-h-[440px]">
          {notifications.length === 0 ? (
            <div className="p-5 text-center text-gray-500">
              No notifications
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => !viewingId && !deletingId && onView?.(notif)}
                className={`flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition cursor-pointer group ${
                  viewingId === notif.id || deletingId === notif.id
                    ? "opacity-60 pointer-events-none"
                    : ""
                }`}
              >
                {/* Avatar */}
                <div className="relative">
                  {viewingId === notif.id ? (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                    </div>
                  ) : (
                    <img
                      src={notif.avatar || "/images/navProfile.png"}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  )}
                  {notif.unread && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center bg-orange-500 text-white rounded-full">
                      •
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm text-gray-800 leading-snug">
                    {notif.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(notif.id);
                  }}
                  disabled={!!deletingId || !!viewingId}
                  className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  title="Delete"
                >
                  {deletingId === notif.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
