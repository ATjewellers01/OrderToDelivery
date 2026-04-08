import React, { useState, useMemo } from "react";
import { 
  Search, Filter, RotateCcw, Download, History, Send, 
  ChevronDown, Calendar, Users, Zap, Hash, Inbox,
  PackageCheck, ClipboardCheck, BarChart3, ArrowRight
} from "lucide-react";

// ── Mock Data ───────────────────────────────────────────
const MOCK_RD_DATA = [
  { 
    id: 1, serialNo: "SN-1721", orderNo: "JF-5898", stage: "QC1", status: "QC Okay", 
    type: "Complete", remarks: "-", customer: "Praveen surana", category: "FANCY HMADE BANGLE", 
    melting: "92", weight: "18.490gm - 18.49gm", orderDate: "12/09/2024", deliveryDate: "23/09/2024",
    expectedDeliveryDate: "25/09/2024", leftDays: 12, orderType: "Customer Order", 
    orderStage: "in_process", karigarNotes: "-", karigar: "SK AMIRUL", 
    karigarDeliveryDate: "22/09/2024", finishedJama: "Ghat Jama Flw-up Done"
  },
  { 
    id: 2, serialNo: "SN-1947", orderNo: "JF-5989", stage: "QC2", status: "QC Okay", 
    type: "Complete", remarks: "-", customer: "Atplus mumbai", category: "18K BANGLES", 
    melting: "75", weight: "32gm - 36gm", orderDate: "16/09/2024", deliveryDate: "25/09/2024",
    expectedDeliveryDate: "25/09/2024", leftDays: 7, orderType: "Stock Order", 
    orderStage: "in_process", karigarNotes: "-", karigar: "SK AMIRUL", 
    karigarDeliveryDate: "22/09/2024", finishedJama: "Finished Jama"
  },
];

const MOCK_RD_HISTORY_DATA = [
  { 
    id: 101, serialNo: "SN-1600", orderNo: "JF-5000", stage: "QC2", status: "QC Okay", 
    type: "Complete", remarks: "-", customer: "Old Cust", category: "BANGLE", 
    melting: "92", weight: "10gm", orderDate: "01/09/2024", deliveryDate: "10/09/2024",
    expectedDeliveryDate: "10/09/2024", leftDays: 0, orderType: "Stock Order", 
    orderStage: "delivered", karigarNotes: "-", karigar: "SK AMIRUL", 
    karigarDeliveryDate: "09/09/2024", finishedJama: "Finished Jama",
    receivingType: "By Hand", personName: "John Doe", grossWeight: "10.05", receiptDate: "11/09/2024"
  }
];

export const RD: React.FC = () => {
  // ── States ───────────────────────────────────────────
  const [liveData, setLiveData] = useState(MOCK_RD_DATA);
  const [historyData, setHistoryData] = useState(MOCK_RD_HISTORY_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rowInputs, setRowInputs] = useState<Record<number, { type: string, name: string, weight: string }>>({});
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // ── Filtering Logic ──────────────────────────────────
  const filteredData = useMemo(() => {
    const dataSource = isHistoryOpen ? historyData : liveData;
    return dataSource.filter((row: any) => {
      const typeMatch = selectedType === "All" || row.orderType === selectedType;
      const searchMatch = !searchQuery || 
        row.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.serialNo.toLowerCase().includes(searchQuery.toLowerCase());
      return typeMatch && searchMatch;
    });
  }, [searchQuery, selectedType, isHistoryOpen, liveData, historyData]);

  // ── Stats Calculations ──────────────────────────────
  const stats = useMemo(() => ({
    pending: liveData.length,
    received: selectedRows.length,
    totalWeight: Object.values(rowInputs).reduce((acc, curr) => acc + (parseFloat(curr.weight) || 0), 0)
  }), [liveData, selectedRows, rowInputs]);

  // ── Handlers ────────────────────────────────────────
  const handleSubmit = () => {
    // 1. Identify rows to move
    const rowsToMove = liveData.filter(row => selectedRows.includes(row.id)).map(row => ({
        ...row,
        receivingType: rowInputs[row.id]?.type || "By Hand",
        personName: rowInputs[row.id]?.name || "-",
        grossWeight: rowInputs[row.id]?.weight || "0",
        receiptDate: new Date().toLocaleDateString()
    }));

    // 2. Update States
    setHistoryData(prev => [...rowsToMove, ...prev]);
    setLiveData(prev => prev.filter(row => !selectedRows.includes(row.id)));
    
    // 3. Reset UI
    setSelectedRows([]);
    setRowInputs({});
    setIsHistoryOpen(true);
  };
  const handleSelectRow = (id: number) => {
    setSelectedRows(prev => {
        const isSelected = prev.includes(id);
        if (!isSelected) {
            // Initialize row inputs if not present
            setRowInputs(r => ({ ...r, [id]: { type: "", name: "", weight: "" } }));
            return [...prev, id];
        } else {
            return prev.filter(i => i !== id);
        }
    });
  };

  const updateRowInput = (id: number, field: string, value: string) => {
    setRowInputs(prev => ({
        ...prev,
        [id]: { ...prev[id], [field]: value }
    }));
  };

  return (
    <div className="min-h-screen bg-transparent px-4 lg:px-0 pt-2 space-y-4 animate-in fade-in duration-500">
      
      {/* ── Header Section ──────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 transition-all">
                <Inbox className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-none mb-1">
                  RD Details
              </h1>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
                  Physical receipt verification and inventory intake
              </p>
            </div>
        </div>

        {/* Operational Stats */}
        <div className="flex flex-wrap gap-3">
           {[
             { label: "Pending RD", value: stats.pending, icon: ClipboardCheck, color: "text-slate-900" },
             { label: "Selected", value: stats.received, icon: PackageCheck, color: "text-purple-600" },
             { label: "Gross Weight", value: stats.totalWeight.toFixed(2), icon: BarChart3, color: "text-indigo-600", bg: "bg-indigo-50/50" },
           ].map((card, i) => (
             <div key={i} className={`${card.bg || "bg-white"} px-5 py-3 rounded-xl border border-slate-200 flex flex-col justify-center min-w-[140px] shadow-sm`}>
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide leading-none mb-1.5">{isHistoryOpen ? "Archived Units" : card.label}</span>
                <span className={`text-base font-bold ${card.color} tabular-nums leading-none`}>{isHistoryOpen && i < 2 ? (i === 0 ? MOCK_RD_HISTORY_DATA.length : "0") : card.value}</span>
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
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold outline-none focus:border-purple-400 transition-all"
              />
          </div>

          <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />

          <select 
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700 cursor-pointer outline-none focus:border-purple-400" 
            value={selectedType} 
            onChange={e => setSelectedType(e.target.value)}
          >
              <option value="All">All Types</option>
              <option value="Customer Order">Customer Order</option>
              <option value="Stock Order">Stock Order</option>
              <option value="Urgent Order">Urgent Order</option>
          </select>

          <div className="flex gap-2 ml-auto">
             <button 
                onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                className={`flex items-center gap-1.5 px-4 py-2 ${isHistoryOpen ? "bg-purple-50 text-purple-700 border-purple-200" : "bg-slate-50 text-slate-700 border-slate-200"} border rounded-lg text-[11px] font-bold uppercase transition-all hover:bg-opacity-80`}
             >
                {isHistoryOpen ? <RotateCcw className="w-3.5 h-3.5" /> : <History className="w-3.5 h-3.5" />} 
                {isHistoryOpen ? "Back to RD" : "History"}
             </button>
             
             {!isHistoryOpen && (
               <button 
                  onClick={handleSubmit}
                  className={`flex items-center gap-1.5 px-6 py-2 bg-amber-600 text-white rounded-lg text-[11px] font-bold uppercase transition-all hover:bg-amber-700 disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-amber-100`} 
                  disabled={selectedRows.length === 0}
               >
                  <Send className="w-3.5 h-3.5" /> Submit Receipt
               </button>
             )}
          </div>
      </div>

      {/* ── Table Section ──────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[3200px]">
            <thead>
              <tr className="bg-[#fff7ed] text-[#9a3412] border-b border-amber-200 shadow-sm">
                {[
                  "Serial No.", "Order No.", "Stage", "Status", "Type", "Remarks",
                  "Customer Name", "Category", "Melting", "Weight", "Order Dt.",
                  "Del. Dt.", "Exp. Del. Dt.", "Left Days", "Order Type", 
                  "Order Stage", "Karigar Notes", "Karigar", "Karigar Del. Dt.",
                  "Finished Jama", "Action", "Receiving Type", "Person/Courier Name", "Gross Weight"
                ].map((header, i) => (
                  <th key={header} className={`px-6 py-4 text-[10px] font-black text-center border-r border-amber-100 uppercase tracking-widest whitespace-nowrap 
                    ${i === 1 ? "sticky left-0 bg-[#fff7ed] z-20" : ""} 
                    ${i === 3 ? "sticky left-[120px] bg-[#fff7ed] z-20" : ""}`}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((row: any, idx: number) => {
                const isActive = selectedRows.includes(row.id);
                const inputs = rowInputs[row.id] || { type: "By Hand", name: "", weight: "" };
                
                return (
                  <tr key={row.id} className={`${idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"} hover:bg-amber-50 transition-colors`}>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.serialNo}</td>
                    <td className={`px-6 py-4 text-[11px] font-black text-[#9a3412] text-center border-r border-slate-100 sticky left-0 bg-inherit z-10`}>{row.orderNo}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-indigo-600 text-center border-r border-slate-100 uppercase">{row.stage}</td>
                    <td className="px-6 py-4 text-center border-r border-slate-100 sticky left-[120px] bg-inherit z-10">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${row.status === "QC Okay" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}>
                            {row.status}
                        </span>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.type}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 italic truncate max-w-[120px]">{row.remarks || "-"}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.customer}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100">{row.category}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-900 text-center border-r border-slate-100">{row.melting}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.weight}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 whitespace-nowrap">{row.orderDate}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 whitespace-nowrap">{row.deliveryDate}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 whitespace-nowrap">{row.expectedDeliveryDate}</td>
                    <td className="px-6 py-4 text-center border-r border-slate-100">
                        <span className="text-[11px] font-extrabold text-rose-600">{row.leftDays}</span>
                    </td>
                    <td className="px-6 py-4 text-[11px] font-bold text-indigo-700 text-center border-r border-slate-100 whitespace-nowrap">{row.orderType}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-500 text-center border-r border-slate-100 italic">{row.orderStage}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 truncate max-w-[120px]">{row.karigarNotes || "-"}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-slate-700 text-center border-r border-slate-100">{row.karigar}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-400 text-center border-r border-slate-100 whitespace-nowrap">{row.karigarDeliveryDate}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-emerald-600 font-bold text-center border-r border-slate-100 whitespace-nowrap">{row.finishedJama}</td>
                    
                    {/* Interactive Fields or History Info */}
                    {!isHistoryOpen ? (
                      <>
                        <td className="px-6 py-4 text-center border-r border-slate-100 bg-purple-50/30">
                            <input 
                                type="checkbox" 
                                checked={isActive} 
                                onChange={() => handleSelectRow(row.id)} 
                                className="w-4 h-4 rounded border-purple-300 text-purple-600 cursor-pointer"
                            />
                        </td>
                        <td className="px-4 py-4 text-center border-r border-slate-100">
                            <select 
                                disabled={!isActive}
                                value={inputs.type || ""}
                                onChange={(e) => updateRowInput(row.id, 'type', e.target.value)}
                                className={`w-full px-2 py-1.5 border rounded text-[11px] font-bold transition-all ${isActive ? "border-purple-300 bg-white" : "border-slate-100 bg-slate-50 text-slate-300"}`}
                            >
                                <option value="">Select Type</option>
                                <option value="By Hand">By Hand</option>
                                <option value="Courier">Courier</option>
                            </select>
                        </td>
                        <td className="px-4 py-4 text-center border-r border-slate-100 min-w-[180px]">
                            {isActive && inputs.type && (
                              <input 
                                  type="text"
                                  placeholder={inputs.type === 'Courier' ? "Courier Name" : "Person Name"}
                                  value={inputs.name}
                                  onChange={(e) => updateRowInput(row.id, 'name', e.target.value)}
                                  className="w-full px-3 py-1.5 border border-purple-300 rounded text-[11px] font-bold outline-none focus:border-purple-500 transition-all bg-white"
                              />
                            )}
                        </td>
                        <td className="px-4 py-4 text-center border-r border-slate-100 min-w-[120px]">
                            {isActive && inputs.type && (
                              <input 
                                  type="number"
                                  placeholder="0.00"
                                  value={inputs.weight}
                                  onChange={(e) => updateRowInput(row.id, 'weight', e.target.value)}
                                  className="w-24 px-3 py-1.5 border border-purple-300 rounded text-[11px] font-bold outline-none focus:border-purple-500 transition-all tabular-nums bg-white"
                              />
                            )}
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-center border-r border-slate-100 text-[11px] font-bold text-slate-400 bg-slate-50 italic">Archived</td>
                        <td className="px-6 py-4 text-center border-r border-slate-100 text-[11px] font-bold text-purple-600">{(row as any).receivingType}</td>
                        <td className="px-6 py-4 text-center border-r border-slate-100 text-[11px] font-bold text-slate-700">{(row as any).personName}</td>
                        <td className="px-6 py-4 text-center border-r border-slate-100 text-[11px] font-bold text-indigo-600">{(row as any).grossWeight} g</td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Professional Footer */}
        <div className="px-6 py-2.5 border-t flex items-center justify-between text-slate-500 font-bold uppercase tracking-wider text-[9px] bg-amber-50/50 border-amber-100">
           <div className="flex gap-8">
              <span>{isHistoryOpen ? "Total Archive" : "Receipt Queue"}: <span className="text-slate-900">{filteredData.length} Shipments</span></span>
              <span>{isHistoryOpen ? "Audit Status" : "Pending Action"}: <span className="text-amber-600 underline underline-offset-2">{isHistoryOpen ? "Verified" : `${selectedRows.length} Records`}</span></span>
              <span>{isHistoryOpen ? "Archived Weight" : "Total Intake Weight"}: <span className="text-indigo-600">{isHistoryOpen ? "10.05" : stats.totalWeight.toFixed(2)} g</span></span>
           </div>
           <div className="flex items-center gap-2 font-black text-amber-400 tracking-[0.2em] animate-pulse">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {isHistoryOpen ? "RD History Archive" : "Live RD Station"}
           </div>
        </div>
      </div>
    </div>
  );
};
