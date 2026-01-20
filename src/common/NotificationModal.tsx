import { X, Trash2 } from "lucide-react";

interface Notification {
  id: string | number;
  message: string;
  time: string;
  unread?: boolean;
  avatar: string;
}

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
  onDelete: (id: string | number) => void;
}

export default function NotificationModal({
  open,
  onClose,
  notifications,
  onDelete,
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
             <div className="p-5 text-center text-gray-500">No notifications</div>
          ) : (
            notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition cursor-pointer group"
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={notif.avatar || "/images/navProfile.png"}
                  alt=""
                  className="w-10 h-10 rounded-full object-cover"
                />
                {notif.unread && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[10px] flex items-center justify-center bg-orange-500 text-white rounded-full">
                    {notif.unread ? "•" : ""}
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
                className="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )))}
        </div>
      </div>
    </div>
  );
}
