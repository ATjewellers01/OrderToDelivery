import React, { useState, useMemo } from "react";
import { 
  Search, Filter, RotateCcw, Download, History, 
  Calendar, Truck, BarChart3, PackageCheck, ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router";

// ── Mock Data ───────────────────────────────────────────
const MOCK_HISTORY_DATA = [
  { 
    id: 1, dispatchDate: "06/04/2026", serialNo: "SN-7356", voucherNo: "V-7356", type: "Complete", remarks: "-", 
    orderNo: "JF-13274", pcs: 2, customer: "ATW Deep Jewelers", category: "NATH / NOSE RING", 
    polishWeight: 0, melting: "92", weight: "2 gm - 2.25gm", karigar: "SKS", 
    orderDate: "13/03/2026", karigarDeliveryDate: "20/03/2026", deliveryDate: "23/03/2026", 
    expectedDeliveryDate: "23/04/2026", orderType: "Customer order" 
  },
  { 
    id: 2, dispatchDate: "06/04/2026", serialNo: "SN-7421", voucherNo: "V-7421", type: "Complete", remarks: "-", 
    orderNo: "JF-13350", pcs: 2, customer: "ATW PRAKASH JEW PALI", category: "TOPS", 
    polishWeight: 3.69, melting: "92", weight: "3.5 gm - 4gm", karigar: "SP", 
    orderDate: "17/03/2026", karigarDeliveryDate: "25/03/2026", deliveryDate: "28/03/2026", 
    expectedDeliveryDate: "28/04/2026", orderType: "Customer order" 
  },
];

export const DispatchHistory: React.FC = () => {
  const navigate = useNavigate();
  // ── States ───────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // ── Filtering Logic ──────────────────────────────────
  const filteredData = useMemo(() => {
    return MOCK_HISTORY_DATA.filter(row => {
      const searchMatch = !searchQuery || 
        row.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.karigar.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.serialNo && row.serialNo.toLowerCase().includes(searchQuery.toLowerCase()));
      const dateMatch = !selectedDate || row.dispatchDate === selectedDate;
      return searchMatch && dateMatch;
    });
  }, [searchQuery, selectedDate]);

  // ── Stats Calculations ──────────────────────────────
  const stats = useMemo(() => ({
    totalPcs: filteredData.reduce((acc, row) => acc + row.pcs, 0),
    totalShipped: filteredData.length,
    successRate: 100
  }), [filteredData]);

  return (
    <div className="min-h-screen bg-transparent px-2 lg:px-0 pt-2 space-y-4 animate-in fade-in duration-500">
      
      {/* ── Header Section ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 transition-all">
                <History className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">
                  Dispatch History
              </h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                  Audit archive of finalized factory shipments
              </p>
            </div>
        </div>

        {/* Audit Stats */}
        <div className="flex flex-wrap gap-3">
           {[
             { label: "Completed Pcs", value: stats.totalPcs, icon: PackageCheck, color: "text-indigo-600" },
             { label: "Total Shipments", value: stats.totalShipped, icon: Truck, color: "text-slate-900" },
             { label: "Success Rate", value: `${stats.successRate}%`, icon: BarChart3, color: "text-emerald-600", bg: "bg-emerald-50/50" },
           ].map((card, i) => (
             <div key={i} className={`${card.bg || "bg-white"} px-5 py-3 rounded-xl border border-slate-200 flex flex-col justify-center min-w-[150px] shadow-sm`}>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-1.5">{card.label}</span>
                <span className={`text-base font-bold ${card.color} tabular-nums leading-none`}>{card.value}</span>
             </div>
           ))}
        </div>
      </div>

      {/* ── Toolbar ────────────────────────────────────── */}
      <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
          
          <button 
            onClick={() => navigate("/ready-for-dispatch")}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg text-[11px] font-bold uppercase transition-all hover:bg-slate-800 shadow-lg shadow-slate-200"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dispatch
          </button>

          <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block" />

          <div className="flex-1 relative min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                  type="text" 
                  placeholder="Search by Order, Customer, Karigar, or Serial No..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-indigo-400 transition-all"
              />
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />

          <div className="flex items-center gap-2 bg-indigo-50/50 border border-indigo-100 rounded-lg px-3 py-1.5">
             <Calendar className="w-3.5 h-3.5 text-indigo-500" />
             <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="bg-transparent text-[11px] font-bold text-indigo-700 outline-none w-28" />
          </div>

          <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold uppercase transition-all hover:bg-slate-100 ml-auto">
             <Download className="w-3.5 h-3.5" /> Export Logs
          </button>
      </div>

      {/* ── Table Section ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[2500px]">
            <thead>
              <tr className="bg-[#fff7ed] text-[#9a3412] border-b border-amber-200">
                {[
                  "Dispatch Dt.", "Serial No.", "Voucher No.", "Type", "Remarks", "Order No.",
                  "Pcs", "Customer Name", "Category", "Polish Wt.", 
                  "Melting", "Actual Wt.", "Karigar", "Order Dt.",
                  "Karigar Dt.", "Del. Dt.", "Exp. Dt.", "Order Type"
                ].map((header, i) => (
                  <th key={header} className={`px-6 py-4 text-[10px] font-black text-center border-r border-amber-100 uppercase tracking-widest whitespace-nowrap 
                    ${(i === 0) ? "sticky left-0 bg-[#fff7ed] z-20" : ""} 
                    ${(i === 5) ? "sticky left-[120px] bg-[#fff7ed] z-20" : ""}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row, idx) => (
                <tr key={row.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-colors`}>
                  <td className="px-6 py-4 text-[11px] font-bold text-indigo-700 text-center border-r border-slate-100 sticky left-0 bg-inherit z-10">{row.dispatchDate}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.serialNo}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.voucherNo}</td>
                  <td className="px-6 py-4 text-[11px] text-center border-r border-slate-100">
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-100">{row.type}</span>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 truncate max-w-[150px]">{row.remarks}</td>
                  <td className="px-6 py-4 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100 sticky left-[120px] bg-inherit z-10">{row.orderNo}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-center border-r border-slate-100 text-amber-700">{row.pcs}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.customer}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.category}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-indigo-600 text-center border-r border-slate-100">{row.polishWeight.toFixed(2)}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.melting}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.weight}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.karigar}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 whitespace-nowrap">{row.orderDate}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 whitespace-nowrap">{row.karigarDeliveryDate}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 whitespace-nowrap">{row.deliveryDate}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 whitespace-nowrap">{row.expectedDeliveryDate}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-indigo-700 text-center border-r border-slate-100">{row.orderType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Professional Footer */}
        <div className="px-6 py-2.5 border-t flex items-center justify-between text-slate-500 font-bold uppercase tracking-wider text-[9px] bg-amber-50/50 border-amber-200">
           <div className="flex gap-8">
              <span>Historical Archive: <span className="text-slate-900">{filteredData.length} Dispatches</span></span>
              <span>Total Volume: <span className="text-slate-900">{stats.totalPcs} Items</span></span>
              <span className="flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                 Verified Logs
              </span>
           </div>
           <div className="text-[10px] font-black text-amber-400 tracking-[0.2em]">
                Dispatch Audit Stream
           </div>
        </div>
      </div>
    </div>
  );
};
