import React, { useState, useMemo, useEffect } from "react";
import { 
  Search, Filter, RotateCcw, Download, Send, 
  Calendar, Truck, BarChart3, PackageCheck, ClipboardCheck
} from "lucide-react";

// ── Mock Data ───────────────────────────────────────────
const MOCK_DISPATCH_DATA = [
  { 
    id: 1, serialNo: "SN-1001", voucherNo: "V-9921", type: "Urgent", remarks: "Final Polish Done", 
    orderNo: "JF-12001", pcs: 5, customer: "ABC Jewelers", category: "Bangle", 
    polishWeight: 45.20, melting: "92", weight: 98.50, karigar: "SK", 
    orderDate: "01/04/2026", karigarDeliveryDate: "05/04/2026", deliveryDate: "07/04/2026", 
    expectedDeliveryDate: "08/04/2026", orderType: "Retail" 
  },
  { 
    id: 2, serialNo: "SN-1002", voucherNo: "V-9922", type: "Regular", remarks: "Ready", 
    orderNo: "JF-12002", pcs: 2, customer: "XYZ Gems", category: "Ring", 
    polishWeight: 12.10, melting: "84", weight: 28.30, karigar: "PK", 
    orderDate: "02/04/2026", karigarDeliveryDate: "06/04/2026", deliveryDate: "07/04/2026", 
    expectedDeliveryDate: "09/04/2026", orderType: "Stock" 
  },
];

export const ReadyForDispatch: React.FC = () => {
  // ── States ───────────────────────────────────────────
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('readyForDispatchData');
    return saved ? JSON.parse(saved) : MOCK_DISPATCH_DATA;
  });

  useEffect(() => {
    localStorage.setItem('readyForDispatchData', JSON.stringify(data));
  }, [data]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  // ── Filtering Logic ──────────────────────────────────
  const filteredData = useMemo(() => {
    return data.filter((row: any) => {
      const searchMatch = !searchQuery || 
        row.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (row.serialNo && row.serialNo.toLowerCase().includes(searchQuery.toLowerCase()));
      const categoryMatch = selectedCategory === "All" || row.category === selectedCategory;
      return searchMatch && categoryMatch;
    });
  }, [searchQuery, selectedCategory, data]);

  // ── Stats Calculations ──────────────────────────────
  const stats = useMemo(() => ({
    totalPcs: filteredData.reduce((acc: number, row: any) => acc + row.pcs, 0),
    totalWeight: filteredData.reduce((acc: number, row: any) => acc + row.weight, 0),
    activeShipments: filteredData.length
  }), [filteredData]);

  // ── Handlers ────────────────────────────────────────
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedRows(filteredData.map((r: any) => r.id));
    else setSelectedRows([]);
  };

  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleDispatch = () => {
    setData((prev: any) => prev.filter((row: any) => !selectedRows.includes(row.id)));
    setSelectedRows([]);
  };

  return (
    <div className="min-h-screen bg-transparent px-2 lg:px-0 pt-2 space-y-4 animate-in fade-in duration-500">
      
      {/* ── Header Section ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 transition-all">
                <Truck className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">
                  Ready for Dispatch
              </h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                  Final shipping queue and package verification
              </p>
            </div>
        </div>

        {/* Dashboard Stats */}
        <div className="flex flex-wrap gap-3">
           {[
             { label: "Total Pieces", value: stats.totalPcs, icon: PackageCheck, color: "text-blue-600" },
             { label: "Total Weight", value: stats.totalWeight.toFixed(2), icon: BarChart3, color: "text-indigo-600" },
             { label: "Active Queue", value: stats.activeShipments, icon: ClipboardCheck, color: "text-slate-900" },
           ].map((card, i) => (
             <div key={i} className="bg-white px-5 py-3 rounded-xl border border-slate-200 flex flex-col justify-center min-w-[150px] shadow-sm">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-1.5">{card.label}</span>
                <span className={`text-base font-bold ${card.color} tabular-nums leading-none`}>{card.value}</span>
             </div>
           ))}
        </div>
      </div>

      {/* ── Toolbar ────────────────────────────────────── */}
      <div className="bg-white px-5 py-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center gap-3">
          
          <div className="flex-1 relative min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
              <input 
                  type="text" 
                  placeholder="Search by Order, Customer, or Serial No..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-blue-400 transition-all"
              />
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />

          <select className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 cursor-pointer" value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
              <option value="All">All Categories</option>
              <option value="Bangle">Bangle</option>
              <option value="Ring">Ring</option>
          </select>

          <div className="flex gap-2 ml-auto">
             <button className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-[11px] font-bold uppercase transition-all hover:bg-slate-100">
                <Download className="w-3.5 h-3.5" /> Export
             </button>
             
             <button 
                onClick={handleDispatch}
                className={`flex items-center gap-1.5 px-6 py-2 bg-[#9a3412] text-white rounded-lg text-[11px] font-black uppercase transition-all hover:bg-amber-800 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-amber-100`} 
                disabled={selectedRows.length === 0}
             >
                <Send className="w-3.5 h-3.5" /> Dispatch Selected
             </button>
          </div>
      </div>

      {/* ── Table Section ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[2400px]">
            <thead>
              <tr className="bg-[#fff7ed] text-[#9a3412] border-b border-amber-200 shadow-sm">
                <th className="px-6 py-4 text-[10px] font-black text-center border-r border-amber-100 w-12 sticky left-0 bg-[#fff7ed] z-20">
                    <input type="checkbox" checked={selectedRows.length === filteredData.length && filteredData.length > 0} onChange={handleSelectAll} className="w-4 h-4 rounded border-amber-300 cursor-pointer" />
                </th>
                {[
                  "Serial No.", "Voucher No.", "Type", "Remarks", "Order No.",
                  "Pcs", "Customer Name", "Category", "Polish Wt.", 
                  "Melting", "Actual Wt.", "Karigar", "Order Dt.",
                  "Karigar Dt.", "Del. Dt.", "Exp. Dt.", "Order Type"
                ].map((header, i) => (
                  <th key={header} className={`px-6 py-4 text-[10px] font-black text-center border-r border-amber-100 uppercase tracking-widest whitespace-nowrap ${(i === 4) ? "sticky left-12 bg-[#fff7ed] z-20" : ""}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row: any, idx: number) => (
                <tr key={row.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-colors`}>
                  <td className="px-6 py-4 text-center border-r border-slate-100 sticky left-0 bg-inherit z-10">
                      <input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => handleSelectRow(row.id)} className="w-4 h-4 rounded border-amber-300 cursor-pointer" />
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.serialNo}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.voucherNo}</td>
                  <td className="px-6 py-4 text-[11px] text-center border-r border-slate-100">
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${row.type === "Urgent" ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-600"}`}>{row.type}</span>
                  </td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 italic truncate max-w-[150px]">{row.remarks}</td>
                  <td className={`px-6 py-4 text-[11px] font-black text-[#9a3412] mx-auto text-center border-r border-slate-100 bg-inherit z-10 sticky left-12`}>{row.orderNo}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-center border-r border-slate-100 bg-amber-50/50 text-amber-700">{row.pcs}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.customer}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.category}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-indigo-600 text-center border-r border-slate-100">{row.polishWeight.toFixed(2)}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.melting}</td>
                  <td className="px-6 py-4 text-[11px] font-bold text-amber-600 text-center border-r border-slate-100">{row.weight.toFixed(2)}</td>
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
        <div className="px-6 py-2.5 border-t flex items-center justify-between text-slate-500 font-bold uppercase tracking-wider text-[9px] bg-amber-50/50 border-amber-100">
           <div className="flex gap-8">
              <span>Ready for Shipping: <span className="text-slate-900">{filteredData.length} Orders</span></span>
              <span>Total Weight: <span className="text-slate-900">{stats.totalWeight.toFixed(2)} g</span></span>
              <span>Selected for Dispatch: <span className="text-amber-600 underline underline-offset-2">{selectedRows.length} Items</span></span>
           </div>
           <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                Live Logistics Monitor
           </div>
        </div>
      </div>
    </div>
  );
};
