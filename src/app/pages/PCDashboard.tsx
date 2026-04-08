import React, { useState } from "react";
import { 
  Search, Filter, Calendar, User, 
  ClipboardList, ArrowRight, Download,
  ChevronDown, LogOut
} from "lucide-react";

// ── Dummy Data ───────────────────────────────────────────

const pcData = [
  { id: "JF-9755", client: "Jl Padmini Jew", type: "Customer Order", stage: "Complete", orderDate: "25/07/2023", expDelDate: "04/08/2023", person: "" },
  { id: "JF-9752", client: "Atw Vijit Baradia", type: "Stock Order", stage: "Metal Issue", orderDate: "25/07/2023", expDelDate: "04/08/2023", person: "" },
  { id: "JF-9615", client: "New Lado Jew", type: "Customer Order", stage: "Complete", orderDate: "10/07/2023", expDelDate: "21/07/2023", person: "" },
  { id: "JF-13577", client: "Atw Sai Ram Jew Jharsugunda", type: "Urgent Order", stage: "Metal Issue", orderDate: "06/04/2024", expDelDate: "16/04/2024", person: "Prashant" },
  { id: "JF-13576", client: "K K Jew Champa", type: "Customer Order", stage: "Metal Issue", orderDate: "06/04/2024", expDelDate: "17/04/2024", person: "Prashant" },
  { id: "JF-13575", client: "K K Jew Champa", type: "Customer Order", stage: "Metal Issue", orderDate: "06/04/2024", expDelDate: "17/04/2024", person: "Prashant" },
  { id: "JF-13574", client: "Cke", type: "Customer Order", stage: "Metal Issue", orderDate: "06/04/2024", expDelDate: "17/04/2024", person: "Prashant" },
  { id: "JF-13573", client: "Atw Deep Jewellers", type: "Customer Order", stage: "Metal Issue", orderDate: "06/04/2024", expDelDate: "17/04/2024", person: "Prashant" },
  { id: "JF-13572", client: "Atw Deep Jewellers", type: "Customer Order", stage: "Metal Issue", orderDate: "06/04/2024", expDelDate: "17/04/2024", person: "Prashant" },
  { id: "JF-13571", client: "Jf Shree Shyam Jewellers", type: "Customer Order", stage: "Metal Issue", orderDate: "06/04/2024", expDelDate: "17/04/2024", person: "Prashant" },
  { id: "JF-13570", client: "Atw Prakash Jew Pali Korba", type: "Customer Order", stage: "Metal Issue", orderDate: "06/04/2024", expDelDate: "17/04/2024", person: "Prashant" },
];

export const PCDashboard: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-transparent space-y-4 pt-1 px-2 pb-10">
      
      {/* ── Page Header ─────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
            <User className="w-5 h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-800 leading-tight">Ismail</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">System Controller</p>
          </div>
        </div>
      </div>

      {/* ── Filters Panel ───────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Order Number", placeholder: "Search order numbers..." },
            { label: "Client Name", placeholder: "Search client names..." },
            { label: "Order Type", placeholder: "Search order types..." },
            { label: "Stage Name", placeholder: "Search stage names..." },
          ].map((f) => (
            <div key={f.label} className="space-y-1.5">
              <label className="text-[11px] font-black text-slate-800 tracking-tight block">{f.label}</label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder={f.placeholder}
                  className="w-full h-11 pl-4 pr-10 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-50 transition-all placeholder:text-slate-300" 
                />
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-amber-500 transition-colors" />
              </div>
              <p className="text-[10px] font-bold text-slate-400 pl-1 select-none">0 selected</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main Data Table ─────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="overflow-x-auto max-h-[70vh] custom-scrollbar">
          <table className="w-full text-left border-collapse relative">
            <thead className="sticky top-0 z-20">
              <tr className="bg-[#fff7ed] text-[#9a3412] uppercase tracking-widest border-b border-amber-200">
                <th className="px-6 py-4 text-[10px] font-black whitespace-nowrap text-center border-r border-amber-100/30">Order Number</th>
                <th className="px-6 py-4 text-[10px] font-black whitespace-nowrap text-center border-r border-amber-100/30">Client Name</th>
                <th className="px-6 py-4 text-[10px] font-black whitespace-nowrap text-center border-r border-amber-100/30">Order Type</th>
                <th className="px-6 py-4 text-[10px] font-black whitespace-nowrap text-center border-r border-amber-100/30">Stage Name</th>
                <th className="px-6 py-4 text-[10px] font-black whitespace-nowrap text-center border-r border-amber-100/30">Order Date</th>
                <th className="px-6 py-4 text-[10px] font-black whitespace-nowrap text-center border-r border-amber-100/30">Expected Delivery Date</th>
                <th className="px-6 py-4 text-[10px] font-black whitespace-nowrap text-center">Person Name</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {pcData.map((row, idx) => (
                <tr key={idx} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-all group`}>
                  <td className="px-6 py-4 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100">{row.id}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.client}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-500 text-center border-r border-slate-100">{row.type}</td>
                  <td className="px-6 py-4 text-[11px] font-black text-amber-600 text-center uppercase tracking-tighter border-r border-slate-100">{row.stage}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100">{row.orderDate}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100">{row.expDelDate}</td>
                  <td className="px-6 py-4 text-[11px] font-black text-slate-800 text-center">{row.person}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="p-6 flex flex-col items-center gap-4 bg-slate-50/30">
          <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] italic">
            Showing {pcData.length * 124} records
          </div>
          <div className="flex items-center gap-1.5 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
            <span className="text-[10px] font-bold text-slate-400">Powered By</span>
            <span className="text-[11px] font-black text-blue-500 uppercase tracking-tighter">Botivate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
