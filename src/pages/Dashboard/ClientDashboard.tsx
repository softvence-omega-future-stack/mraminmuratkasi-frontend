import { FileText, Calendar, AlertCircle } from "lucide-react";

export default function ClientDashboard() {
  const activeCases = [
    {
      id: "2024-001",
      title: "Traffic Violation Case",
      updated: "20/01/2024",
      status: "In progress",
    },
    {
      id: "2024-001",
      title: "Traffic Violation Case",
      updated: "20/01/2024",
      status: "In progress",
    },
    {
      id: "2024-001",
      title: "Traffic Violation Case",
      updated: "20/01/2024",
      status: "In progress",
    },
  ];

  const recentUpdates = [
    {
      id: 1,
      title: "Accident Report Filed",
      date: "2024-01-15",
      icon: <FileText className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      id: 2,
      title: "Court Date Scheduled",
      date: "2024-03-21",
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      id: 3,
      title: "Additional Documents Needed",
      date: "2024-01-12",
      icon: <AlertCircle className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
  ];

  const allCases = [
    {
      no: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "In Progress",
    },
    {
      no: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "In Progress",
    },
    {
      no: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "In Progress",
    },
    {
      no: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "In Progress",
    },
    {
      no: "CASE-2024-001",
      name: "Speeding Violation 85mph in 55mph",
      type: "Reckless Driving",
      created: "Jan 20, 2024",
      courtDate: "Not Scheduled",
      status: "In Progress",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Row: Active Cases & Recent Updates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Cases */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-4">Active Cases</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeCases.map((item, index) => (
              <div
                key={index}
                className="bg-blue-50 rounded-xl p-4 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mb-3 shadow-sm text-blue-500">
                  <FileText className="w-6 h-6" />
                </div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  CASE: {item.id}
                </p>
                <h4 className="font-bold text-gray-900 mt-1 mb-2 text-sm leading-tight">
                  {item.title}
                </h4>
                <p className="text-[10px] text-gray-400 mb-3">
                  Last Updated : {item.updated}
                </p>
                <span className="px-3 py-1 bg-[#1A73E8] text-white text-[10px] font-medium rounded-full">
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-900">Recent Updates</h3>
            <button className="text-blue-500 text-xs font-semibold hover:underline">
              See all
            </button>
          </div>
          <div className="space-y-3">
            {recentUpdates.map((update) => (
              <div
                key={update.id}
                className="flex items-start gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div
                  className={`w-8 h-8 ${update.bg} rounded-lg flex items-center justify-center shrink-0`}
                >
                  {update.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {update.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{update.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Cases Table */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-gray-900">All Cases</h3>
          <button className="text-blue-500 text-xs font-semibold hover:underline">
            See all
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium pl-2">Case No:</th>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Created</th>
                <th className="pb-3 font-medium">Court Date</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {allCases.map((row, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 pl-2 text-gray-600">{row.no}</td>
                  <td className="py-4 font-medium text-gray-900">{row.name}</td>
                  <td className="py-4 text-gray-600">{row.type}</td>
                  <td className="py-4 text-gray-600">{row.created}</td>
                  <td className="py-4 text-gray-600">{row.courtDate}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                      {row.status}
                    </span>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      ⋮
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
