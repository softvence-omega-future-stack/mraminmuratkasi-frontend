// EditOverviewModal.tsx
import { X } from "lucide-react";

export function EditOverviewModal({
  caseData,
  onClose,
}: {
  caseData: any;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Edit Case Overview</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Case Title
            </label>
            <input
              defaultValue={caseData.title}
              className="w-full rounded-lg border px-4 py-2.5"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Client Name
            </label>
            <input
              defaultValue={caseData.clientName}
              className="w-full rounded-lg border px-4 py-2.5"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Case Type
              </label>
              <select
                defaultValue={caseData.type}
                className="w-full rounded-lg border px-4 py-2.5"
              >
                <option>Reckless Driving</option>
                <option>Traffic Violation</option>
                {/* ... */}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Status</label>
              <select
                defaultValue={caseData.status}
                className="w-full rounded-lg border px-4 py-2.5"
              >
                <option value="new">New</option>
                <option value="inprogress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">
              Court Date
            </label>
            <input
              type="date"
              defaultValue="2024-03-15"
              className="w-full rounded-lg border px-4 py-2.5"
            />
          </div>
        </div>

        <div className="mt-8 flex gap-3 justify-end">
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
