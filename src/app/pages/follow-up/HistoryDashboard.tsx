import React from "react";
import { Search, RotateCcw, Clock, Hash, User } from "lucide-react";

// Dummy data for History
const historyDummyData = [
  { id: "1", orderNumber: "JF-01", timestamp: "29-11-2024", status: "Work Started", remarks: "Botivate Demo", nextDate: "10-07-2024", karigar: "RK", deliveryDate: "15-07-2024", expectedDeliveryDate: "20-07-2024" },
  { id: "2", orderNumber: "JF-3891", timestamp: "27-06-2024", status: "Flw Up Done", remarks: "He says He Will Give Tmrw On Time", nextDate: "", karigar: "SP", deliveryDate: "", expectedDeliveryDate: "05-07-2024" },
  { id: "3", orderNumber: "JF-4131", timestamp: "08-07-2024", status: "Not Started", remarks: "test", nextDate: "10-07-2024", karigar: "SKS", deliveryDate: "12-07-2024", expectedDeliveryDate: "18-07-2024" },
];

export const HistoryDashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      {/* --- Desktop Layout: Original History Search --- */}
      <div className="hidden lg:block bg-white rounded-xl border-t-4 border-amber-600 shadow-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-black text-gray-800 uppercase tracking-wider">History Search</h3>
            </div>
            <div className="px-3 py-1 bg-amber-500 rounded-full">
              <span className="text-[10px] font-black text-white uppercase tracking-widest">14,598 Records</span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-[9px] font-black text-amber-600 hover:bg-amber-50 rounded-lg border border-amber-200 uppercase tracking-widest transition-colors shadow-sm">
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
        
        <div className="p-4 bg-gray-50/30">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-8 space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Search Anything</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Enter order no, client, or any keyword... 🔍" 
                  className="w-full h-11 px-5 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all shadow-sm"
                />
              </div>
            </div>
            
            <div className="col-span-4 space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-1">Order Number</label>
              <div className="relative">
                <select className="w-full h-11 px-4 bg-white border border-gray-200 rounded-xl text-sm font-medium outline-none appearance-none cursor-pointer">
                  <option>All Order Numbers</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <RotateCcw className="w-3 h-3 text-gray-400 rotate-90" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Mobile Layout Dash --- */}
      <div className="lg:hidden space-y-4 px-2">
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Total History</span>
                  <div className="text-4xl font-black mt-1 uppercase tracking-tight">14,598</div>
                  <p className="text-[10px] mt-2 opacity-90 font-bold uppercase tracking-wider">Archived records</p>
                </div>
                <Search className="w-12 h-12 opacity-20" />
            </div>
        </div>
        
        <div className="bg-white rounded-3xl p-5 shadow-lg border border-gray-100">
            <input 
                type="text" 
                placeholder="Search history... 🔍" 
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl text-xs font-medium focus:ring-2 focus:ring-amber-500/20 focus:bg-white outline-none transition-all"
            />
        </div>
      </div>

      {/* ── Data section ───────────────────────────────────── */}
      <div className="space-y-4">
        {/* Desktop View Table */}
        <div className="hidden lg:block bg-white rounded-xl border-t-4 border-amber-800 shadow-2xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1400px]">
                    <thead>
                        <tr className="bg-[#fff7ed] text-[#9a3412] uppercase tracking-widest border-b border-amber-200">
                            <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30">Order Number</th>
                            <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30">Timestamp</th>
                            <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30">Remarks</th>
                            <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30">Next Date of Flw-up</th>
                            <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30">Karigar Name</th>
                            <th className="px-6 py-4 text-[10px] font-black border-r border-amber-100/30">Karigar Delivery Date</th>
                            <th className="px-6 py-4 text-[10px] font-black">Expected Delivery Date</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                        {historyDummyData.map((row, idx) => (
                            <tr key={row.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-colors group cursor-default shadow-sm hover:shadow-md`}>
                                <td className="px-6 py-4 text-[11px] font-black text-[#9a3412] border-r border-slate-100">{row.orderNumber}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-500 border-r border-slate-100">{row.timestamp}</td>
                                <td className="px-6 py-4 border-r border-slate-100 text-center">
                                    <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-black rounded-lg border border-amber-200 uppercase tracking-tighter">{row.status}</span>
                                </td>
                                <td className="px-6 py-4 text-[11px] text-slate-600 border-r border-slate-100 italic">{row.remarks}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-slate-400 border-r border-slate-100">{row.nextDate || "---"}</td>
                                <td className="px-6 py-4 text-[11px] font-black text-slate-700 border-r border-slate-100">{row.karigar}</td>
                                <td className="px-6 py-4 text-[11px] font-bold text-amber-600 italic tracking-tight border-r border-slate-100">{row.deliveryDate || "---"}</td>
                                <td className="px-6 py-4 text-[11px] font-black text-indigo-600 tabular-nums">{row.expectedDeliveryDate || "---"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 px-2">
            {historyDummyData.map(row => (
                <div key={row.id} className="bg-white rounded-3xl border border-gray-100 p-5 shadow-lg border-b-4 border-b-amber-500">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-black text-amber-800">{row.orderNumber}</span>
                        <span className="text-[10px] font-black text-gray-400 uppercase">{row.timestamp}</span>
                    </div>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2">
                            <Clock className="w-3.5 h-3.5 text-amber-500" />
                            <span className="text-xs font-black text-gray-700 uppercase tracking-tighter">{row.status}</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <User className="w-3.5 h-3.5 text-gray-400" />
                            <span className="text-xs font-bold text-gray-600">Karigar: {row.karigar}</span>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-2xl text-[10px] font-medium text-gray-500 italic">
                            "{row.remarks}"
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};
