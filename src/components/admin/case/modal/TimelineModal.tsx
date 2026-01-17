// TimelineModal.tsx  ← unified for add + edit
import { UploadCloud, X } from "lucide-react";
import { useState } from "react";

interface TimelineForm {
  title: string;
  date: string;
  description: string;
}

export function TimelineModal({
  isEdit = false,
  initialData,
  onClose,
}: {
  isEdit?: boolean;
  initialData?: any;
  onClose: () => void;
}) {
  const [form, setForm] = useState<TimelineForm>({
    title: initialData?.title || "",
    date: initialData?.date || "2026-02-01",
    description: initialData?.description || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">
            {isEdit ? "Update Timeline" : "Add New Timeline"}
          </h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter event title"
              className="w-full rounded-lg border px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full rounded-lg border px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Write here..."
              className="w-full rounded-lg border px-4 py-2.5 resize-none"
            />
          </div>

          {/* Upload area – same as before */}
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Attach Documents
            </label>
            <div className="rounded-lg border-2 border-dashed border-gray-300 p-8 text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">
                Drag your file(s) or{" "}
                <span className="text-indigo-600">Browse</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                jpg, png, pdf • Max 10 MB
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 border rounded-lg">
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            {isEdit ? "Update" : "Add"} Timeline
          </button>
        </div>
      </div>
    </div>
  );
}
