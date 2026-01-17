// EditNoteModal.tsx
import { X } from "lucide-react";
import { useState } from "react";

export function EditNoteModal({
  note,
  onClose,
}: {
  note: string;
  onClose: () => void;
}) {
  const [value, setValue] = useState(note);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Edit Note</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={8}
          className="w-full rounded-lg border px-4 py-3 text-sm resize-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />

        <div className="mt-6 flex gap-3 justify-end">
          <button onClick={onClose} className="px-5 py-2.5 border rounded-lg">
            Cancel
          </button>
          <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
