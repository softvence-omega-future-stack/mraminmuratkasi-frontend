import { X, MoreVertical } from "lucide-react";

interface Notification {
  id: number;
  message: string;
  time: string;
  unread?: boolean;
  avatar: string;
}

interface NotificationModalProps {
  open: boolean;
  onClose: () => void;
  notifications: Notification[];
}

export default function NotificationModal({
  open,
  onClose,
  notifications,
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
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start gap-4 px-5 py-4 hover:bg-gray-50 transition cursor-pointer"
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={"/images/navProfile.png"}
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

              {/* Kebab Menu */}
              <button className="p-1 rounded-full hover:bg-gray-200">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
